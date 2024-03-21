import { getNewsByUser, getNewsByUsers } from "./../controllers/User";
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
userRouter.put("/update-password/:id", updateUserPassword);
userRouter.post("/forgot-password", forgotUserPassword);
userRouter.get("/get-user-news", getNewsByUsers);
userRouter.get("/get-user-news/:id", getNewsByUser);
userRouter.get("/:id", authenticate, getUser);
userRouter.post("/", authenticate, createUser);
userRouter.put("/:id", authenticate, updateUser);
userRouter.delete("/:id", authenticate, deleteUser);

export default userRouter;
