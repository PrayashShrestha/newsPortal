import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/index";

import express from "express";
import { authenticate } from "../utils/auth/authenticate";

const userRouter = express.Router();

userRouter.get("/", authenticate, getUsers);
userRouter.get("/:id", getUser);
userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
