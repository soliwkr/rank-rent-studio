import type { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import connectPg from "connect-pg-simple";
import bcrypt from "bcryptjs";
import { pool } from "../db";

const PgSession = connectPg(session);

export async function setupAuth(app: Express): Promise<void> {
  app.use(
    session({
      store: new PgSession({
        pool,
        tableName: "user_sessions",
        createTableIfMissing: false,
      }),
      secret: process.env.SESSION_SECRET || "rank-rent-secret-change-in-prod",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        const result = await pool.query(
          "SELECT id, email, first_name, last_name, profile_image_url, plan, password_hash FROM users WHERE email = $1 LIMIT 1",
          [email]
        );
        const user = result.rows[0];
        if (!user || !user.password_hash) {
          return done(null, false, { message: "Invalid credentials" });
        }
        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) {
          return done(null, false, { message: "Invalid credentials" });
        }
        return done(null, {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          profileImageUrl: user.profile_image_url,
          plan: user.plan,
        });
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const result = await pool.query(
        "SELECT id, email, first_name, last_name, profile_image_url, plan FROM users WHERE id = $1 LIMIT 1",
        [id]
      );
      const user = result.rows[0];
      if (!user) return done(null, false);
      done(null, {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        profileImageUrl: user.profile_image_url,
        plan: user.plan,
      });
    } catch (err) {
      done(err);
    }
  });
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: "Unauthorized" });
}

export function registerAuthRoutes(app: Express): void {
  app.get("/api/auth/session", (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ authenticated: true, user: req.user });
    } else {
      res.json({ authenticated: false, user: null });
    }
  });

  app.get("/api/auth/setup-status", async (_req, res) => {
    try {
      const result = await pool.query(
        "SELECT id FROM users WHERE password_hash IS NOT NULL LIMIT 1"
      );
      res.json({ needsSetup: result.rowCount === 0 });
    } catch {
      res.status(500).json({ error: "DB error" });
    }
  });

  app.post("/api/auth/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ error: info?.message || "Invalid credentials" });
      req.logIn(user, (loginErr) => {
        if (loginErr) return next(loginErr);
        res.json({ success: true, user });
      });
    })(req, res, next);
  });

  app.post("/api/auth/register", async (req, res) => {
    try {
      const check = await pool.query(
        "SELECT id FROM users WHERE password_hash IS NOT NULL LIMIT 1"
      );
      if (check.rowCount !== 0) {
        return res.status(403).json({ error: "Setup already completed" });
      }
      const { email, password, firstName, lastName } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
      }
      const hash = await bcrypt.hash(password, 12);
      await pool.query(
        `INSERT INTO users (email, first_name, last_name, password_hash, plan)
         VALUES ($1, $2, $3, $4, 'professional')
         ON CONFLICT (email) DO UPDATE SET password_hash = $4, first_name = $2, last_name = $3`,
        [email, firstName || "", lastName || "", hash]
      );
      res.json({ success: true });
    } catch (err) {
      console.error("[auth] register error:", err);
      res.status(500).json({ error: "Registration failed" });
    }
  });

  app.post("/api/auth/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.json({ success: true });
    });
  });
}
