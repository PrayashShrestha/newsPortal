import express, { Request, Response, NextFunction } from "express";
const editorsRouter = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();

const upload = multer({ dest: "uploads/" });

editorsRouter.post(
  "/",
  upload.single("image"),
  function (req: Request, res: Response, next: NextFunction) {
    try {
      const image = req.file;
      const content = req.body.content;

      res.send({ success: true });
    } catch (error) {
      next(error);
    }
  }
);

editorsRouter.get(
  "/",
  function (req: Request, res: Response, next: NextFunction) {}
);
export default editorsRouter;
