export class DBError extends Error {
  public status: number;
  public code: "DB_ERROR";

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = 500;
    this.code = "DB_ERROR";
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends Error {
  public status: number;
  public code: "BADREQUEST_ERROR";

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = 400;
    this.code = "BADREQUEST_ERROR";
    Error.captureStackTrace(this, this.constructor);
  }
}

export class AuthorizationError extends Error {
  public status: number;
  public code: "AUTHORIZATION_ERROR";

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = 401;
    this.code = "AUTHORIZATION_ERROR";
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends Error {
  public status: number;
  public code: "NOTFOUND_ERROR";

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = 404;
    this.code = "NOTFOUND_ERROR";
    Error.captureStackTrace(this, this.constructor);
  }
}

export class DuplicateError extends Error {
  public status: number;
  public code: "DUPLICATE_ERROR";

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = 409;
    this.code = "DUPLICATE_ERROR";
    Error.captureStackTrace(this, this.constructor);
  }
}
