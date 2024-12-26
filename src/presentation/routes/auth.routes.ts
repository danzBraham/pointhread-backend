import { Elysia, t } from "elysia";

import { authService } from "@/applications/instance";

export const authRoutes = new Elysia({ prefix: "/auth", tags: ["auth"] })
  // Routes
  .post(
    "/register",
    async ({ body, set }) => {
      set.status = 201;
      const registeredUser = await authService.register(body);
      return {
        success: true,
        data: registeredUser,
      };
    },
    {
      body: t.Object(
        {
          username: t.String({ minLength: 1, maxLength: 50, error: "Invalid username" }),
          email: t.String({ format: "email", error: "Invalid email" }),
          password: t.String({ minLength: 8, error: "Invalid password" }),
        },
        { additionalProperties: false, maxProperties: 3 }
      ),
    }
  )
  .post(
    "/login",
    async ({ body }) => {
      const loggedInUser = await authService.login(body);
      return {
        success: true,
        data: loggedInUser,
      };
    },
    {
      body: t.Object(
        {
          email: t.String({ format: "email", error: "Invalid email" }),
          password: t.String({ minLength: 8, error: "Invalid password" }),
        },
        { additionalProperties: false, maxProperties: 3 }
      ),
    }
  )
  .post("/logout", async ({ headers }) => {
    const session = headers.authorization?.split(" ")[1];
    await authService.logout(session);
    return {
      success: true,
      message: "User logged out successfully",
    };
  })
  .post(
    "/session",
    async ({ body }) => {
      await authService.verifySession(body.sessionId);
      return {
        success: true,
      };
    },
    {
      body: t.Object({
        sessionId: t.String(),
      }),
    }
  );
