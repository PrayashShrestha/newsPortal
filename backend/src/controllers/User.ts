import { NextFunction, Request, Response } from "express";
import { config, prisma } from "../config";
import { isEmptyObject } from "../utils/checkEmptyObject";

import bcrypt from "bcrypt";
import { forgetEmail, welcomeEmail } from "../utils/Mailer";

import generator from "generate-password";

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

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    if (user) {
      welcomeEmail(user, password);
    }
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
    const { password, newPassword } = req.body;

    if (
      userRetrived &&
      (await bcrypt.compare(password, userRetrived?.password))
    ) {
      const user = await prisma.user.update({
        where: { id: Number(id) },
        data: { password: newPassword },
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

export const forgotUserPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const userRetrived = await prisma.user.findUnique({
      where: { email: email },
    });

    if (userRetrived) {
      const password = generator.generate({
        length: 10,
        numbers: true,
      });

      const hashedPassword = await bcrypt.hash(
        password,
        Number(config.saltRounds)
      );

      const user = await prisma.user.update({
        where: { id: userRetrived.id },
        data: { password: hashedPassword },
      });
      if (user) {
        forgetEmail(user, password);
      }
    }

    res.status(200).json({ message: "New password sent to your email." });
  } catch (error) {
    next(error);
  }
};

export const getNewsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
        News: {
          select: {
            id: true,
            title: true,
            content: true,
            publishedAt: true,
            featuredImage: true,
            status: true,
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getNewsByUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany();

    const newsByUser = await Promise.all(
      users.map(async (user) => {
        const newsCount = await prisma.news.count({
          where: {
            authorId: user.id,
          },
        });
        return {
          userId: user.id,
          name: user.name,
          newsCount: newsCount,
        };
      })
    );

    res.status(200).json(newsByUser);
  } catch (error) {
    next(error);
  }
};
