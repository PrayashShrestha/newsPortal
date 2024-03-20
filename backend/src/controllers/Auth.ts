import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../config";
import { clearToken, generateToken } from "../utils/auth/jwt";

const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user != null && (await bcrypt.compare(password, user?.password))) {
      generateToken(res, email);
      const responseObj = {
        email: user.email,
        name: user.name,
        role: user.role,
        userId: user.id,
      };
      res.status(200).json(responseObj);
    } else {
      res.status(400).json({ message: "No user Found" });
    }
  } catch (error) {
    next(error);
  }
};

const logoutUser = (req: Request, res: Response) => {
  clearToken(res);
  res.status(200).json({ message: "User logged out." });
};

export { authenticateUser, logoutUser };
