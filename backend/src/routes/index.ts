import express from "express";
import userRouter from "./User";
import authRouter from "./Auth";
import editorsRouter from "../controllers/editorsRouter";

export const routes = express.Router();

routes.use("/user", userRouter);
routes.use("/auth", authRouter);
routes.use("/editor", editorsRouter);
