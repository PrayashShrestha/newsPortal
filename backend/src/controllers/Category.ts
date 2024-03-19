import { NextFunction, Request, Response } from "express";
import { prisma } from "../config";
import { isEmptyObject } from "../utils/checkEmptyObject";

export const getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const getSingleCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const createSingleCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const category = await prisma.category.create({
      data: { name },
    });
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const categoryRetrived = await prisma.category.findUnique({
      where: { id: Number(id) },
    });

    if (isEmptyObject(categoryRetrived)) {
      const { name } = req.body;

      const category = await prisma.category.update({
        where: { id: Number(id) },
        data: { name },
      });
      res.status(200).json(category);
    } else {
      next({ message: "Category Not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: "Category Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};
