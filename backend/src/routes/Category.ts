import express from "express";
import { authenticate } from "../utils/auth/authenticate";
import {
  createSingleCategory,
  deleteCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
} from "../controllers";

const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategory);
categoryRouter.get("/:id", getSingleCategory);
categoryRouter.post("/", authenticate, createSingleCategory);
categoryRouter.put("/:id", authenticate, updateCategory);
categoryRouter.delete("/:id", authenticate, deleteCategory);

export default categoryRouter;
