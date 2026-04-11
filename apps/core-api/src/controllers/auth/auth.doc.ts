export const sendCodeSchema = {
  description: "Send verification code to email",
  tags: ["Auth"],
  body: {
    type: "object",
    required: ["email"],
    properties: {
      email: { type: "string", format: "email" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
        isRegistered: { type: "boolean" },
      },
      required: ["message", "isRegistered"],
    },
  },
};

export const checkEmailSchema = {
  description: "Check if an email is registered",
  tags: ["Auth"],
  body: {
    type: "object",
    required: ["email"],
    properties: {
      email: { type: "string", format: "email" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        isRegistered: { type: "boolean" },
      },
      required: ["isRegistered"],
    },
  },
};

export const loginPasswordSchema = {
  description: "Login with email and password",
  tags: ["Auth"],
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string", format: "email" },
      password: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
      required: ["message"],
    },
  },
};

export const registerSchema = {
  description: "Register a new user",
  tags: ["Auth"],
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string", format: "email" },
      password: { type: "string" },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
      required: ["message"],
    },
  },
};

export const resetPasswordSchema = {
  description: "Reset password using email code",
  tags: ["Auth"],
  body: {
    type: "object",
    required: ["email", "code", "newPassword"],
    properties: {
      email: { type: "string", format: "email" },
      code: { type: "string" },
      newPassword: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
      required: ["message"],
    },
  },
};

export const verifyCodeSchema = {
  description: "Verify email code and get tokens",
  tags: ["Auth"],
  body: {
    type: "object",
    required: ["email", "code"],
    properties: {
      email: { type: "string", format: "email" },
      code: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
      required: ["message"],
    },
  },
};

export const refreshTokenSchema = {
  description: "Refresh access token using refresh token",
  tags: ["Auth"],
  body: {
    type: "object",
    properties: {
      refreshToken: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
      required: ["message"],
    },
  },
};

export const tokenSchema = {
  description:
    "OAuth 2.0 client credentials grant — exchange client_id and client_secret for an access token",
  tags: ["Auth"],
  body: {
    type: "object",
    required: ["grant_type", "client_id", "client_secret"],
    properties: {
      grant_type: { type: "string", enum: ["client_credentials"] },
      client_id: { type: "string" },
      client_secret: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        access_token: { type: "string" },
        token_type: { type: "string" },
        expires_in: { type: "number" },
      },
    },
  },
};

export const createClientSchema = {
  description:
    "Create a new OAuth API client — returns client_id and client_secret (shown once)",
  tags: ["Auth"],
  body: {
    type: "object",
    required: ["name"],
    properties: {
      name: { type: "string" },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        client_id: { type: "string" },
        client_secret: { type: "string" },
      },
    },
  },
};

export const getProfileSchema = {
  description: "Get authenticated user profile",
  tags: ["Auth"],
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "string" },
        email: { type: "string", format: "email" },
        name: { type: "string", nullable: true },
        created_at: { type: "string", format: "date-time", nullable: true },
        updated_at: { type: "string", format: "date-time", nullable: true },
      },
    },
  },
};

export const updateProfileSchema = {
  description: "Update authenticated user profile",
  tags: ["Auth"],
  body: {
    type: "object",
    required: ["name"],
    properties: {
      name: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "string" },
        email: { type: "string", format: "email" },
        name: { type: "string", nullable: true },
        created_at: { type: "string", format: "date-time", nullable: true },
        updated_at: { type: "string", format: "date-time", nullable: true },
      },
    },
  },
};
