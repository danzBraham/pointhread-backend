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

export class DuplicateUserError extends UserError {
  constructor() {
    super("User already exists", 409);
  }
}

export class UserValidationError extends UserError {
  constructor(message: string) {
    super(message, 400);
  }
}
