import { CustomError } from "./CustomError";

export class InternalServerError extends CustomError {
  statusCode = 500;

  constructor(public message: string = "Internal Server Error") {
    super(message);

    Object.setPrototypeOf(this, InternalServerError);
  }
  serializeError() {
    return [{ message: this.message }];
  }
}
