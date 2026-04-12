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
        token: { type: "string" },
        refreshToken: { type: "string" },
      },
      required: ["message", "token", "refreshToken"],
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
        token: { type: "string" },
        refreshToken: { type: "string" },
      },
      required: ["message", "token", "refreshToken"],
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
        token: { type: "string" },
        refreshToken: { type: "string" },
      },
      required: ["message", "token", "refreshToken"],
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
        token: { type: "string" },
        refreshToken: { type: "string" },
      },
      required: ["message", "token", "refreshToken"],
    },
  },
};
