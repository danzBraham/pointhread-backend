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
        message: "User registered successfully",
        data: registeredUser,
      };
    },
    {
      body: t.Object(
        {
          username: t.String({ minLength: 1, maxLength: 50, error: "Invalid username" }),
          email: t.String({ format: "email", error: "Invalid email" }),
          password: t.String({ minLength: 6, maxLength: 16, error: "Invalid password" }),
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
        message: "User logged in successfully",
        data: loggedInUser,
      };
    },
    {
      body: t.Object(
        {
          email: t.String({ format: "email", error: "Invalid email" }),
          password: t.String({ minLength: 6, maxLength: 16, error: "Invalid password" }),
        },
        { additionalProperties: false, maxProperties: 3 }
      ),
    }
  )
  .post("/logout", async ({ cookie: { session } }) => {
    await authService.logout(session.value);
    return {
      success: true,
      message: "User logged out successfully",
    };
  });
