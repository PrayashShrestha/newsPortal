import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUsersByRole,
} from "../controllers/index";

import express from "express";
import { authenticate } from "../utils/auth/authenticate";

const userRouter = express.Router();

userRouter.get("/", authenticate, getUsers);
userRouter.get("/role", getUsersByRole);
userRouter.get("/:id", getUser);
userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
