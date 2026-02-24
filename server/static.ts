import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { Transform } from "stream";
import { routeMeta, injectMeta } from "./ssr-meta";

const SSR_PUBLIC_PREFIXES = [
  "/founder-statement", "/how-it-works", "/pricing", "/contact",
  "/book-demo", "/faq", "/portfolio", "/templates", "/blog", "/privacy",
  "/terms", "/docs", "/testimonials", "/case-studies", "/locations",
  "/solutions/", "/platform/", "/comparisons/", "/features/", "/services/",
  "/home-archive",
];

function shouldSSR(url: string): boolean {
  const pathname = url.split("?")[0];
  if (pathname === "/") return true;
  return SSR_PUBLIC_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix),
  );
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  let ssrRender: any = null;
  const ssrModulePath = path.resolve(__dirname, "ssr", "entry-server.js");
  if (fs.existsSync(ssrModulePath)) {
    try {
      const ssrModule = require(ssrModulePath);
      ssrRender = ssrModule.render;
    } catch (err) {
      console.error("[SSR] Failed to load SSR module:", err);
    }
  }

  const templatePath = path.resolve(distPath, "index.html");
  let rawTemplate = fs.readFileSync(templatePath, "utf-8");

  app.use("/{*path}", (req, res) => {
    const url = req.originalUrl;
    const urlPath = url.split("?")[0].replace(/\/$/, "") || "/";

    let template = rawTemplate;
    const meta = routeMeta[urlPath];
    if (meta) {
      template = injectMeta(template, meta);
    }

    if (!ssrRender || !shouldSSR(url)) {
      res.status(200).set({ "Content-Type": "text/html" }).end(template);
      return;
    }

    const [head, tail] = template.split("<!--ssr-outlet-->");
    if (!tail) {
      res.status(200).set({ "Content-Type": "text/html" }).end(template);
      return;
    }

    let didError = false;
    try {
      const stream = ssrRender(url, {
        onAllReady() {
          res.status(didError ? 500 : 200).set({ "Content-Type": "text/html" });
          res.write(head);

          const transform = new Transform({
            transform(chunk, _encoding, callback) {
              callback(null, chunk);
            },
            flush(callback) {
              this.push(tail);
              callback();
            },
          });

          transform.pipe(res);
          stream.pipe(transform);
        },
        onShellReady() {},
        onShellError(err: unknown) {
          console.error("[SSR] Shell error:", err);
          res.status(200).set({ "Content-Type": "text/html" }).end(head + tail);
        },
        onError(err: unknown) {
          didError = true;
          console.error("[SSR] Render error:", err);
        },
      });

      res.on("close", () => {
        stream.abort();
      });
    } catch (err) {
      console.error("[SSR] Critical error:", err);
      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    }
  });
}
