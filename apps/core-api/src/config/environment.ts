const {
  APP_PUBLIC_BASE_URL,
  APP_CORS_ORIGIN,
  NODE_ENV,
  SERVER_URL,
  SERVER_PATH,
  SERVER_PORT,
  SWAGGER_PATH,
  RESEND_API_KEY,
  RESEND_FROM_EMAIL,
  JWT_PRIVATE_KEY,
  JWT_PUBLIC_KEY,
  JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
  DATABASE_URL,
  DATABASE_MIGRATIONS_FOLDER,
  LOG_LEVEL,
  LOG_TRANSPORT,
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_MS,
  AUTH_PEPPER,
  GOOGLE_AI_STUDIO_API_KEY,
  GOOGLE_AI_STUDIO_MODEL,
} = process.env;

export interface Environment {
  app: {
    server: {
      url?: string;
      path?: string;
      port?: string;
    };
    docs: {
      path?: string;
    };
    web: {
      baseUrl?: string;
    };
    cors: {
      allowedOrigin: string | string[];
      allowedMethods: string;
      allowedHeaders: string;
    };
    env?: string;
    rateLimit: {
      max: number;
      timeWindow: number;
    };
    cookie: {
      httpOnly: boolean;
      secure: boolean;
      sameSite: "lax" | "strict" | "none";
      path: string;
      maxAge: {
        accessToken: number;
        refreshToken: number;
      };
    };
  };
  logger: {
    level: string;
    transport?: string;
  };
  auth: {
    jwtPrivateKey: string;
    jwtPublicKey: string;
    accessTokenExpiresIn: string;
    refreshTokenExpiresIn: string;
    pepper: string;
  };
  database: {
    url: string;
    migrationsFolder: string;
  };
  services: {
    resend: {
      apiKey: string;
      fromEmail: string;
    };
    googleAiStudio: {
      apiKey: string;
      model: string;
    };
    ai: {
      url: string;
    };
  };
}

export const config: Environment = {
  app: {
    server: {
      url: SERVER_URL,
      path: SERVER_PATH,
      port: SERVER_PORT,
    },
    docs: {
      path: SWAGGER_PATH,
    },
    web: {
      baseUrl: APP_PUBLIC_BASE_URL,
    },
    cors: {
      allowedOrigin: (APP_CORS_ORIGIN || "*localhost*").split(","),
      allowedMethods: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      allowedHeaders: "Content-Type,Authorization",
    },
    env: NODE_ENV,
    rateLimit: {
      max: Number(RATE_LIMIT_MAX) || (NODE_ENV === "development" ? 10000 : 100),
      timeWindow: Number(RATE_LIMIT_WINDOW_MS) || 60 * 1000,
    },
    cookie: {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: {
        accessToken: 3600, // 1 hour (fallback)
        refreshToken: 30 * 24 * 60 * 60, // 30 days
      },
    },
  },
  logger: {
    level: LOG_LEVEL || "info",
    transport: NODE_ENV === "production" ? undefined : LOG_TRANSPORT,
  },
  auth: {
    jwtPrivateKey: (JWT_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    jwtPublicKey: (JWT_PUBLIC_KEY || "").replace(/\\n/g, "\n"),
    accessTokenExpiresIn: JWT_ACCESS_EXPIRES_IN || "1h",
    refreshTokenExpiresIn: JWT_REFRESH_EXPIRES_IN || "30d",
    pepper: AUTH_PEPPER || "",
  },
  database: {
    url:
      DATABASE_URL ||
      "postgres://database_user:database_password@localhost:5432/database_name",
    migrationsFolder: DATABASE_MIGRATIONS_FOLDER || "./src/database/migrations",
  },
  services: {
    resend: {
      apiKey: RESEND_API_KEY || "",
      fromEmail: RESEND_FROM_EMAIL || "noreply@example.com",
    },
    googleAiStudio: {
      apiKey: GOOGLE_AI_STUDIO_API_KEY || "",
      model: GOOGLE_AI_STUDIO_MODEL || "gemini-2.0-flash",
    },
    ai: {
      url: "http://localhost:5003/api",
    },
  },
};
