import jwt from "jsonwebtoken";

import { Response } from "express";
import { config } from "../../config";

const generateToken = (res: Response, userId: string) => {
  const jwtSecret = config.jwtSecret;
  const token = jwt.sign({ userId }, jwtSecret, {
    expiresIn: "2h",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: config.env !== "development",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
  });
};

const clearToken = (res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
};

export { generateToken, clearToken };
