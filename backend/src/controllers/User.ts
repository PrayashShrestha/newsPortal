import { NextFunction, Request, Response } from "express";
import { config, prisma } from "../config";
import { isEmptyObject } from "../utils/checkEmptyObject";

import bcrypt from "bcrypt";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        role: true,
      },
    });
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
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        role: true,
      },
    });
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

    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.saltRounds)
    );
    const user = await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: hashedPassword,
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
      const { name, email, role } = req.body;
      const user = await prisma.user.update({
        where: { id: Number(id) },
        data: {
          name: name || userRetrived?.name,
          email: email || userRetrived?.email,
          role: role || userRetrived?.role,
        },
      });
      res.status(200).json({ message: "Successfully Updated" });
    } else {
      next({ message: "User Not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const updateUserPassword = async (
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
      const { password } = req.body;
      const user = await prisma.user.update({
        where: { id: Number(id) },
        data: { password },
      });
      res.status(200).json({ message: "Password Updated Successfully" });
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
    res.status(200).json({ message: "User deleted Successfully" });
  } catch (error) {
    next(error);
  }
};
