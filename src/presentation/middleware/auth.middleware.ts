import { Context } from "elysia";

import { authService } from "@/applications/instance";
import { AuthenticationError } from "@/errors";

export async function authMiddleware({ cookie: { session } }: Context) {
  if (!session.value) throw new AuthenticationError("Unauthorized");
  const { userId } = await authService.getSession(session.value);
  if (!userId) throw new AuthenticationError("Unauthorized");
}
