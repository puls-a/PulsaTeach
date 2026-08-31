import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

const isProduction = process.env.NODE_ENV === "production" || Boolean(process.env.VERCEL);
const localOrigins = [
  "http://127.0.0.1:5173",
  "http://127.0.0.1:4173",
  "http://127.0.0.1:5188",
  "http://127.0.0.1:5190",
  "http://localhost:5173",
  "http://localhost:4173",
  "http://localhost:5188",
  "http://localhost:5190"
];
const configuredOrigins = String(process.env.PULSATEACH_ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = new Set(isProduction ? configuredOrigins : [...localOrigins, ...configuredOrigins]);

export const localIdentityEnabled = process.env.PULSATEACH_ALLOW_LOCAL_IDENTITY === "true" && !isProduction;

export function applySecurity(app) {
  app.disable("x-powered-by");
  app.set("etag", "strong");
  if (isProduction) app.set("trust proxy", 1);

  app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'none'"],
        baseUri: ["'none'"],
        frameAncestors: ["'none'"],
        formAction: ["'none'"],
        objectSrc: ["'none'"]
      }
    },
    crossOriginOpenerPolicy: { policy: "same-origin" },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    strictTransportSecurity: isProduction
      ? { maxAge: 63_072_000, includeSubDomains: true, preload: true }
      : false
  }));

  app.use((request, response, next) => {
    response.setHeader("Cache-Control", "no-store");
    response.setHeader("Pragma", "no-cache");
    response.setHeader("X-Robots-Tag", request.path.startsWith("/api/") ? "noindex, nofollow" : "noindex");
    next();
  });

  app.use(cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }
      callback(Object.assign(new Error("Origin not allowed by CORS."), { status: 403, code: "CORS_ORIGIN_DENIED" }));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Cache-Control", "Content-Type", "Pragma", "X-Request-Id", "X-PulsaTeach-Admin-Key", "X-PulsaTeach-User-Id"],
    maxAge: 86400
  }));

  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: Number(process.env.PULSATEACH_RATE_LIMIT || 300),
    standardHeaders: "draft-8",
    legacyHeaders: false,
    skip: (request) => process.env.NODE_ENV === "test" || request.path.startsWith("/api/discord/progression/"),
    handler: (request, response) => response.status(429).json({
      error: {
        code: "RATE_LIMITED",
        message: "Too many requests. Please try again later."
      },
      requestId: request.requestId
    })
  }));
}

export function sensitiveRateLimit(limit = 30) {
  return rateLimit({
    windowMs: 15 * 60 * 1000,
    limit,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    skip: () => process.env.NODE_ENV === "test",
    handler: (request, response) => response.status(429).json({
      error: {
        code: "RATE_LIMITED",
        message: "Too many sensitive operations. Please try again later."
      },
      requestId: request.requestId
    })
  });
}

export function pulsaBotRateLimit() {
  return rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: Number(process.env.PULSABOT_RATE_LIMIT || 3000),
    standardHeaders: "draft-8",
    legacyHeaders: false,
    skip: () => process.env.NODE_ENV === "test",
    handler: (request, response) => response.status(429).json({
      error: { code: "RATE_LIMITED", message: "Too many PulsaBot requests. Please try again later." },
      requestId: request.requestId
    })
  });
}
