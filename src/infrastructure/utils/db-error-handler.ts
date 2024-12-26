import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { DBError } from "@/infrastructure/errors";

export function handleDBError(error: unknown, message: string): never {
  if (error instanceof DBError) {
    throw error;
  }

  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        throw new DBError("Unique constraint violation");
      case "P2025":
        throw new DBError("Record not found");
      case "P2003":
        throw new DBError("Foreign key constraint violation");
      default:
        throw new DBError(message);
    }
  }

  throw new DBError("Unexpected database error occured");
}
