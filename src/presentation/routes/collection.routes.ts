import { Elysia, t } from "elysia";

import { collectionService } from "@/applications/instance";

import { authMiddleware } from "../middleware/auth.middleware";

export const collectionRoutes = new Elysia({ prefix: "/collection", tags: ["collection"] })
  // Middleware
  .derive(authMiddleware)

  // Routes
  .get("/", async ({ userId }) => {
    const collections = await collectionService.getAll(userId);
    return {
      success: true,
      message: "Collections fetched successfully",
      data: collections,
    };
  })
  .post(
    "/",
    async ({ userId, body }) => {
      const collection = await collectionService.create(userId, body);
      return {
        success: true,
        message: "Collection created successfully",
        data: collection,
      };
    },
    {
      body: t.Object({
        name: t.String({
          minLength: 1,
          maxLength: 50,
          error: "Name must be between 1 and 50 characters",
        }),
      }),
    }
  )
  .put(
    "/:id",
    async ({ userId, params, body }) => {
      const collection = await collectionService.update(params.id, userId, body);
      return {
        success: true,
        message: "Collection updated successfully",
        data: collection,
      };
    },
    {
      body: t.Object({
        name: t.String({ minLength: 1, maxLength: 50, error: "Invalid name" }),
      }),
    }
  )
  .delete("/:id", async ({ userId, params }) => {
    const collection = await collectionService.delete(params.id, userId);
    return {
      success: true,
      message: "Collection deleted successfully",
      data: collection,
    };
  });
