import { BaseError } from "@/errors/base.error";

export class CollectionError extends BaseError {
  constructor(message: string, code = 400) {
    super(message, code);
  }
}

export class CollectionNotFoundError extends CollectionError {
  constructor() {
    super("Collection not found", 404);
  }
}

export class CollectionDuplicateError extends CollectionError {
  constructor() {
    super("Collection already exists", 409);
  }
}
