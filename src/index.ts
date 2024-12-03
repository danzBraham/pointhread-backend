import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";

import { BaseError } from "./errors";
import { authRoutes } from "./presentation/routes/auth.routes";

const config = {
  host: process.env.HOST ?? "localhost",
  port: process.env.PORT ?? 4000,
} as const;

const app = new Elysia()
  // Plugins
  .use(cors())
  .use(
    swagger({
      path: "/docs",
      autoDarkMode: true,
      documentation: {
        info: {
          title: "Pointhread API",
          version: "1.0.0",
          description: "This is an API for Pointhread",
        },
      },
    })
  )

  // Errors
  .onError(({ code, error, set }) => {
    if (error instanceof BaseError) {
      set.status = error.code;
      return { success: false, error: error.name, message: error.message };
    }

    if (code === "VALIDATION") {
      set.status = error.status;
      return {
        success: false,
        error: "ValidationError",
        message: `${error.message}: ${error.all[0].summary ?? "Unknown error"}`,
      };
    }

    set.status = 500;
    return { success: false, error: error.name, message: error.message };
  })

  // Routes
  .get("/", () => ({ message: "Hello Pointhread!" }))
  .group("/api/v1", (app) => app.use(authRoutes))

  // Port
  .listen(config.port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname ?? config.host}:${String(
    app.server?.port ?? config.port
  )}`
);
