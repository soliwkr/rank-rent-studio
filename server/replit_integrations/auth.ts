import type { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { db, pool } from "../db";
import { users } from "@shared/schema";
import { eq, isNotNull, sql } from "drizzle-orm";

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string | null;
      firstName: string | null;
      lastName: string | null;
      plan: string;
    }
  }
}

const PgSession = connectPgSimple(session);

export function setupAuth(app: Express): void {
  app.use(
    session({
      store: new PgSession({ pool, tableName: "user_sessions", createTableIfMissing: true }),
      secret: process.env.SESSION_SECRET || "rank-rent-change-me-in-prod",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        sameSite: "lax",
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
        if (!user || !user.passwordHash) return done(null, false, { message: "Credenziali non valide" });
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return done(null, false, { message: "Credenziali non valide" });
        return done(null, { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, plan: user.plan });
      } catch (e) {
        return done(e);
      }
    })
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: string, done) => {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
      if (!user) return done(null, false);
      done(null, { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, plan: user.plan });
    } catch (e) {
      done(e);
    }
  });
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: "Non autenticato" });
}

export function registerAuthRoutes(app: Express): void {
  // Check if any user with a password exists (first-run setup)
  app.get("/api/auth/setup-status", async (_req, res) => {
    const result = await pool.query("SELECT id FROM users WHERE password_hash IS NOT NULL LIMIT 1");
    res.json({ needsSetup: result.rowCount === 0 });
  });

  // First-time admin registration (only if no user with password exists)
  app.post("/api/auth/register", async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email e password obbligatorie" });

    const existing = await pool.query("SELECT id FROM users WHERE password_hash IS NOT NULL LIMIT 1");
    if ((existing.rowCount ?? 0) > 0) return res.status(403).json({ error: "Setup già completato" });

    const passwordHash = await bcrypt.hash(password, 12);
    const [user] = await db.insert(users).values({
      email,
      passwordHash,
      firstName: firstName || null,
      lastName: lastName || null,
      plan: "white_label",
    }).returning();

    req.login({ id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, plan: user.plan }, (err) => {
      if (err) return res.status(500).json({ error: "Login post-registrazione fallito" });
      res.json({ success: true, user: { id: user.id, email: user.email, firstName: user.firstName, plan: user.plan } });
    });
  });

  app.get("/api/auth/session", (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ authenticated: true, user: req.user });
    } else {
      res.json({ authenticated: false, user: null });
    }
  });

  app.post("/api/auth/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: Express.User | false, info: { message: string } | undefined) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ error: info?.message || "Credenziali non valide" });
      req.login(user, (err) => {
        if (err) return next(err);
        res.json({ success: true, user });
      });
    })(req, res, next);
  });

  app.post("/api/auth/logout", (req, res) => {
    req.logout(() => res.json({ success: true }));
  });
}
