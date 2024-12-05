import { BaseError } from "@/errors/base.error";

export class UserError extends BaseError {
  constructor(message: string, code = 400) {
    super(message, code);
  }
}

export class UserNotFoundError extends UserError {
  constructor() {
    super("User not found", 404);
  }
}

export class UserDuplicateError extends UserError {
  constructor() {
    super("User already exists", 409);
  }
}
