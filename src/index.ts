import { Elysia } from "elysia";

const config = {
  host: process.env.HOST ?? "localhost",
  port: process.env.PORT ?? 4000,
} as const;

const app = new Elysia().get("/", () => "Hello Pointhread!").listen(config.port);

console.log(
  `🦊 Elysia is running at${app.server?.hostname ?? config.host}:${String(
    app.server?.port ?? config.port
  )}`
);
