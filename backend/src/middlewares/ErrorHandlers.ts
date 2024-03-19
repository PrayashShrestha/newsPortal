import { NextFunction, Response } from "express";
import { Request } from "express";
import { CustomError } from "../utils/errors/CustomError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    console.log(err);
    return res.status(err.statusCode).json({ errors: err.serializeError() });
  }
  return res.status(500).json({
    errors: [{ message: "Internal Server Error" }, { errorInfo: err }],
  });
};
