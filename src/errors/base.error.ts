export class BaseError extends Error {
  constructor(public message: string, public code = 500) {
    super(message);
    this.code = code;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
