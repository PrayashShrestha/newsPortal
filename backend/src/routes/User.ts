import { getNewsByUser } from "./../controllers/User";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUsersByRole,
  updateUserPassword,
  forgotUserPassword,
} from "../controllers/index";

import express from "express";
import { authenticate } from "../utils/auth/authenticate";

const userRouter = express.Router();

userRouter.get("/", authenticate, getUsers);
userRouter.post("/role", authenticate, getUsersByRole);
userRouter.get("/:id", authenticate, getUser);
userRouter.post("/", authenticate, createUser);
userRouter.put("/:id", authenticate, updateUser);
userRouter.put("/update-password/:id", updateUserPassword);
userRouter.delete("/:id", authenticate, deleteUser);
userRouter.post("/forgot-password/:id", forgotUserPassword);
userRouter.get("/get-user-news/:id", getNewsByUser);

export default userRouter;
