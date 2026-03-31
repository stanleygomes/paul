const {
  APP_PUBLIC_BASE_URL,
  APP_CORS_ORIGIN,
  NODE_ENV,
  SERVER_URL,
  SERVER_PATH,
  SERVER_PORT,
  SWAGGER_PATH,
  GOOGLE_AI_STUDIO_API_KEY,
  GOOGLE_AI_STUDIO_MODEL,
  DATABASE_URL,
  DATABASE_AUTH_TOKEN,
  DATABASE_MIGRATIONS_FOLDER,
  LOG_LEVEL,
  LOG_TRANSPORT,
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
      allowedOrigin: string;
      allowedMethods: string;
      allowedHeaders: string;
    };
    env?: string;
  };
  logger: {
    level: string;
    transport?: string;
  };
  services: {
    googleAiStudio: {
      apiKey: string;
      model: string;
    };
  };
  database: {
    url: string;
    authToken?: string;
    migrationsFolder: string;
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
      allowedOrigin: APP_CORS_ORIGIN || "*localhost*",
      allowedMethods: "GET,POST,PUT,DELETE,OPTIONS",
      allowedHeaders: "Content-Type,Authorization",
    },
    env: NODE_ENV,
  },
  logger: {
    level: LOG_LEVEL || "info",
    transport: LOG_TRANSPORT || "pino-pretty",
  },
  services: {
    googleAiStudio: {
      apiKey: GOOGLE_AI_STUDIO_API_KEY || "",
      model: GOOGLE_AI_STUDIO_MODEL || "gemini-2.0-flash",
    },
  },
  database: {
    url: DATABASE_URL || "file:./.docker/core-ai.db",
    authToken: DATABASE_AUTH_TOKEN,
    migrationsFolder: DATABASE_MIGRATIONS_FOLDER || "./src/database/migrations",
  },
};
