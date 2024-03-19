import express from "express";
import { authenticate } from "../utils/auth/authenticate";
import {
  createSingleNews,
  deleteNews,
  getSingleNews,
  updateNews,
} from "../controllers/News";

const newsRouter = express.Router();

newsRouter.get("/", getSingleNews);
newsRouter.get("/:id", getSingleNews);
newsRouter.post("/", authenticate, createSingleNews);
newsRouter.put("/:id", authenticate, updateNews);
newsRouter.delete("/:id", authenticate, deleteNews);

export default newsRouter;
