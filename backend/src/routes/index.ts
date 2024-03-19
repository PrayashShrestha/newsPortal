import express from "express";
import userRouter from "./User";
import authRouter from "./Auth";

export const routes = express.Router();

routes.use("/user", userRouter);
routes.use("/auth", authRouter);
