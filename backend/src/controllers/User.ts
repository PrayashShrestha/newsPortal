import { Request, Response } from "express";
import { prisma } from "../config";
import { isEmptyObject } from "../utils/checkEmptyObject";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
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
    res.status(400).json({ message: JSON.stringify(error) });
  }
};

export const createUser = async (req: Request, res: Response) => {
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
    res.status(400).json({ message: JSON.stringify(error) });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userRetrived = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (isEmptyObject(userRetrived)) {
      const { name, email, password } = req.body;
      const user = await prisma.user.update({
        where: { id: Number(id) },
        data: {},
      });
      res.status(200).json(user);
    } else {
      res.status(204).json({});
    }
  } catch (error) {
    res.status(400).json({ message: JSON.stringify(error) });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id: Number(id) } });
    res.status(200).send();
  } catch (error) {
    res.status(400).json({ message: JSON.stringify(error) });
  }
};
