import Elysia, { t } from "elysia";

import { authService, collectionService } from "@/applications/instance";
import { AuthorizationError } from "@/infrastructure/errors";

export const collectionRoutes = new Elysia({ prefix: "/collections", tags: ["collections"] })
  // Derive
  .derive(async ({ headers }) => {
    const session = headers.authorization?.split(" ")[1];
    if (!session) {
      throw new AuthorizationError("Unauthorized");
    }
    return authService.decodeSession(session);
  })
  // Routes
  .get("/", async ({ user }) => {
    const collections = await collectionService.getAll(user.id);
    return {
      success: true,
      data: collections,
    };
  })
  .post(
    "/",
    async ({ body, user }) => {
      const newCollection = await collectionService.create(user.id, body);
      return {
        success: true,
        data: newCollection,
      };
    },
    {
      body: t.Object({
        name: t.String({ minLength: 1, error: "Invalid name" }),
      }),
    }
  )
  .get("/:id", async ({ params, user }) => {
    const collection = await collectionService.getOne(params.id, user.id);
    return {
      success: true,
      data: collection,
    };
  })
  .patch(
    "/:id",
    async ({ params, body, user }) => {
      const updatedCollection = await collectionService.update(params.id, user.id, body);
      return {
        success: true,
        data: updatedCollection,
      };
    },
    {
      body: t.Object({
        name: t.String({ minLength: 1, error: "Invalid name" }),
      }),
    }
  )
  .delete("/:id", async ({ params, user }) => {
    await collectionService.delete(params.id, user.id);
    return {
      success: true,
    };
  });
