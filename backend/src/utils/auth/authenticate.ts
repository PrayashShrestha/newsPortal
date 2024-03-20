import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config, prisma } from "../../config";
import { isEmptyObject } from "../checkEmptyObject";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.cookies.jwt;

    if (!token) {
      res.status(400).send("Token not found");
    }

    const jwtSecret = config.jwtSecret;
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    console.log("Decoded: " + JSON.stringify(decoded));

    if (!decoded) {
      res.status(400).send(`UserId not found in ${decoded}`);
    }

    const user = await prisma.user.findUnique({
      where: { email: decoded.userId },
    });
    if (!user) {
      res.status(400).send(`User not found in with ${decoded}`);
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(400).send("Invalid Token");
  }
};

export { authenticate };
