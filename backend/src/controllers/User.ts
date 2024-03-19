import { NextFunction, Request, Response } from "express";
import { prisma } from "../config";
import { isEmptyObject } from "../utils/checkEmptyObject";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUsersByRole = async (req: Request, res: Response) => {
  try {
    const { role } = req.body;
    const users = await prisma.user.findMany({ where: { role: role } });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: JSON.stringify(error) });
  }
};


export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, username, role } = req.body;
    const user = await prisma.user.create({
      data: {
        name,
        email,
        username,
        password,
        role,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userRetrived = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (isEmptyObject(userRetrived)) {
      const { name, email, password, role } = req.body;
      const user = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email, password, role },
      });
      res.status(200).json(user);
    } else {
      next({ message: "User Not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id: Number(id) } });
    res.status(200).json({ status: "success" });
  } catch (error) {
    next(error);
  }
};
