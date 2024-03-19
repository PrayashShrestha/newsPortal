import { NextFunction, Request, Response } from "express";
import { prisma } from "../config";
import { isEmptyObject } from "../utils/checkEmptyObject";

export const getAllNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const news = await prisma.news.findMany();
    res.status(200).json(news);
  } catch (error) {
    next(error);
  }
};

export const getSingleNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const news = await prisma.news.findUnique({ where: { id: Number(id) } });
    res.status(200).json(news);
  } catch (error) {
    next(error);
  }
};

export const createSingleNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, content, featuredImage, status, authorId, categoryId } =
      req.body;
    const news = await prisma.news.create({
      data: {
        title,
        content,
        featuredImage,
        status,
        authorId,
        categoryId,
      },
    });
    res.status(200).json(news);
  } catch (error) {
    next(error);
  }
};

export const updateNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const newsRetrived = await prisma.news.findUnique({
      where: { id: Number(id) },
    });

    if (isEmptyObject(newsRetrived)) {
      const { title, content, featuredImage, status, authorId, categoryId } =
        req.body;

      const news = await prisma.news.update({
        where: { id: Number(id) },
        data: {
          title:
            title == newsRetrived?.title && newsRetrived?.title.trim() != ""
              ? title
              : newsRetrived?.title,

          content:
            content == newsRetrived?.content &&
            newsRetrived?.content.trim() != ""
              ? content
              : newsRetrived?.content,

          featuredImage:
            featuredImage == newsRetrived?.featuredImage
              ? featuredImage
              : newsRetrived?.featuredImage,

          status:
            status == newsRetrived?.status && newsRetrived?.status.trim() != ""
              ? status
              : newsRetrived?.status,

          authorId:
            authorId == newsRetrived?.authorId &&
            newsRetrived?.authorId != undefined
              ? authorId
              : newsRetrived?.authorId,

          categoryId:
            categoryId == newsRetrived?.categoryId &&
            newsRetrived?.categoryId != undefined
              ? categoryId
              : newsRetrived?.categoryId,
        },
      });
      res.status(200).json(news);
    } else {
      next({ message: "News Not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await prisma.news.delete({ where: { id: Number(id) } });
    res.status(200).json({ status: "success" });
  } catch (error) {
    next(error);
  }
};
