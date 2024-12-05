import { Elysia } from "elysia";

import { BaseError } from "@/errors";

export function errorMiddleware() {
  return (
    new Elysia({ name: "errorMiddleware" })
      // Error handling middleware
      .onError(({ code, error, set }) => {
        // Log the error for debugging (you might want to use a proper logger in production)
        console.error(`[${new Date().toISOString()}] Error occurred:`, {
          name: error.name,
          message: error.message,
          stack: error.stack,
        });

        // Handle our custom BaseError instances
        if (error instanceof BaseError) {
          set.status = error.code;
          return {
            success: false,
            error: error.name,
            message: error.message,
          };
        }

        // Handle Elysia's built-in validation errors
        if (code === "VALIDATION") {
          set.status = 400;
          return {
            success: false,
            error: "ValidationError",
            message: error.message,
            details: error.all[0]?.summary ?? "Unknown validation error",
          };
        }

        // Handle Not Found errors
        if (code === "NOT_FOUND") {
          set.status = 404;
          return {
            success: false,
            error: "NotFoundError",
            message: "Resource not found",
          };
        }

        // Handle PARSE errors (invalid JSON, etc.)
        if (code === "PARSE") {
          set.status = 400;
          return {
            success: false,
            error: "ParseError",
            message: "Invalid request format",
          };
        }

        // Handle any other unknown errors
        set.status = 500;
        return {
          success: false,
          error: "InternalServerError",
          message:
            process.env.NODE_ENV === "production" ? "An unexpected error occurred" : error.message,
        };
      })
  );
}
