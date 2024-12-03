import { BaseError } from "@/errors/base.error";

export class AuthenticationError extends BaseError {
  constructor(message: string, code = 401) {
    super(message, code);
  }
}

export class InvalidCredentialsError extends AuthenticationError {
  constructor() {
    super("Invalid credentials", 400);
  }
}

export class SessionNotFoundError extends AuthenticationError {
  constructor() {
    super("Session not found", 404);
  }
}
