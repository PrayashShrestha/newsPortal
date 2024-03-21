import { NextFunction, Request, Response } from "express";
import { prisma } from "../config";

export const getAllNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const news = await prisma.news.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [
        {
          publishedAt: "desc",
        },
      ],
    });
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
        status: "Published",
        authorId,
        categoryId,
      },
    });
    res.status(200).json(news);
  } catch (error) {
    next(error);
  }
};
// export const updateNews = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { id } = req.params;
//     const newsRetrived = await prisma.news.findUnique({
//       where: { id: Number(id) },
//     });

//     if (isEmptyObject(newsRetrived)) {
//       const { title, content, featuredImage, status, authorId, categoryId } =
//         req.body;

//       const news = await prisma.news.update({
//         where: { id: Number(id) },
//         data: {
//           title:
//             title == newsRetrived?.title && newsRetrived?.title.trim() != ""
//               ? title
//               : newsRetrived?.title,

//           content:
//             content == newsRetrived?.content &&
//             newsRetrived?.content.trim() != ""
//               ? content
//               : newsRetrived?.content,

//           featuredImage:
//             featuredImage == newsRetrived?.featuredImage
//               ? featuredImage
//               : newsRetrived?.featuredImage,

//           status:
//             status == newsRetrived?.status && newsRetrived?.status.trim() != ""
//               ? status
//               : newsRetrived?.status,

//           authorId:
//             authorId == newsRetrived?.authorId &&
//             newsRetrived?.authorId != undefined
//               ? authorId
//               : newsRetrived?.authorId,

//           categoryId:
//             categoryId == newsRetrived?.categoryId &&
//             newsRetrived?.categoryId != undefined
//               ? categoryId
//               : newsRetrived?.categoryId,
//         },
//       });
//       res.status(200).json(news);
//     } else {
//       next({ message: "News Not found" });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteNews = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { id } = req.params;
//     await prisma.news.delete({ where: { id: Number(id) } });
//     res.status(200).json({ message: "News Deleted Successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

export const getAllNewsByCategoryFilter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId, status } = req.params;
  console.log("show: " + categoryId, status);
  try {
    const news = await prisma.news.findMany({
      where: { categoryId: Number(categoryId), status },
      include: {
        author: {
          select: {
            name: true,
            role: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [
        {
          publishedAt: "desc",
        },
      ],
    });
    res.status(200).json(news);
  } catch (error) {
    next(error);
  }
};

export const getRandomNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newsCount = await prisma.news.count();

    const randomIndices: number[] = [];
    while (randomIndices.length < 6) {
      const randomIndex = Math.floor(Math.random() * newsCount);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }

    const randomNews = await Promise.all(
      randomIndices.map(async (index) => {
        return await prisma.news.findFirst({
          skip: index,
          include: {
            author: true,
            category: true,
          },
        });
      })
    );

    res.status(200).json(randomNews);
  } catch (error) {
    next(error);
  }
};

export const getCategoriesBasedNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Entered");

  try {
    const categories = await prisma.category.findMany({
      include: {
        News: {
          take: 10,
          orderBy: {
            publishedAt: "desc",
          },
          select: {
            id: true,
            title: true,
            content: true,
            publishedAt: true,
            featuredImage: true,
            status: true,
            author: true,
            category: true,
          },
        },
      },
    });
    console.log(categories);
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};
