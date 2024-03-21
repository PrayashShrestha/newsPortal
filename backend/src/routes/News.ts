import express from "express";
import { authenticate } from "../utils/auth/authenticate";
import {
  createSingleNews,
  // deleteNews,
  getAllNews,
  getAllNewsByCategoryFilter,
  getCategoriesBasedNews,
  getRandomNews,
  getSingleNews,
  updateNewsStatus
  // updateNews,
} from "../controllers/News";

const newsRouter = express.Router();

newsRouter.get("/", getAllNews);
newsRouter.post("/", authenticate, createSingleNews);
newsRouter.put("/", authenticate, updateNewsStatus);
newsRouter.get("/category-based-news", getCategoriesBasedNews);
newsRouter.get("/get-recommend-news", getRandomNews);

// newsRouter.put("/:id", authenticate, updateNews);
// newsRouter.delete("/:id", authenticate, deleteNews);


newsRouter.get("/:id", getSingleNews);
newsRouter.get("/:status/:categoryId", getAllNewsByCategoryFilter);

export default newsRouter;
