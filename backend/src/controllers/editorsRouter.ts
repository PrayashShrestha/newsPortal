import express, { Request, Response, NextFunction } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import { prisma } from "../config";

const editorsRouter = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}.jpg`);
  },
});
const upload = multer({ storage: storage });

editorsRouter.post(
  "/",
  upload.single("image"),
  async (req: Request, res: Response, next: NextFunction) => {
    const cont = JSON.parse(req.body.content);
    const { title, content, status, categoryId } = cont;
    const file = req.file;
    const cookieUser = JSON.parse(req.cookies.user);
    const authorId = cookieUser.userId;
    // const dir = path.join(__dirname)
    // `${dir.replace(/\\/g, '/')}/uploads/${file?.filename}`,

    try {
      const post = await prisma.news.create({
        data: {
          title,
          content,
          status: "pending",
          authorId,
          categoryId,
          featuredImage: `http://localhost:4000/uploads/${file?.filename}`,
        },
      });
      res.status(200).json(post);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
);

editorsRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const news = await prisma.news.findMany({
        include: {
          author: true,
        },
      });
      res.status(200).json(news);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default editorsRouter;