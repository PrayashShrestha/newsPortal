import { Request, Response } from "express";
import { prisma } from "../config";
import { clearToken, generateToken } from "../utils/auth/jwt";

const authenticateUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    console.log(user);
    if (user != null && user.password === password) {
      generateToken(res, username);
      const responseObj = {
        username: user.username,
        name: user.name,
        role: user.password,
      };
      res.status(200).json(responseObj);
    } else {
      res.status(400).json({ message: "No user Found" });
    }
  } catch (error) {
    res.status(400).json({ message: JSON.stringify(error) });
  }
};

const logoutUser = (req: Request, res: Response) => {
  clearToken(res);
  res.status(200).json({ message: "User logged out." });
};

export { authenticateUser, logoutUser };
