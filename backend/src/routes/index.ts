import express from "express";
import userRouter from "./User";
import authRouter from "./Auth";
import newsRouter from "./News";
import editorsRouter from "../controllers/editorsRouter";
import categoryRouter from "./Category";

export const routes = express.Router();

routes.use("/user", userRouter);
routes.use("/auth", authRouter);
routes.use("/news", newsRouter);
routes.use("/editor", editorsRouter);
routes.use("/category", categoryRouter);
