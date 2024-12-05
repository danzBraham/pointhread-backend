import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";

import { errorMiddleware } from "./presentation/middleware/error.middleware";
import { authRoutes } from "./presentation/routes/auth.routes";
import { collectionRoutes } from "./presentation/routes/collection.routes";

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

  // Middleware
  .use(errorMiddleware)

  // Routes
  .get("/", () => ({ message: "Hello Pointhread!" }))
  .group("/api/v1", (app) => app.use(authRoutes).use(collectionRoutes))

  // Port
  .listen(config.port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname ?? config.host}:${String(
    app.server?.port ?? config.port
  )}`
);
