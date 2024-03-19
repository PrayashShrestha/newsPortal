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
      console.error("Error processing image and text upload", error);
      res
        .status(500)
        .send({ error: "Failed to process image and text upload" });
    }
  }
);

editorsRouter.get(
  "/",
  function (req: Request, res: Response, next: NextFunction) {}
);
export default editorsRouter;
