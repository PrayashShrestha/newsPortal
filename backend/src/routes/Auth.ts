import express from "express";
import { authenticateUser, logoutUser } from "../controllers/";

const authRouter = express.Router();

authRouter.post("/login", authenticateUser);
authRouter.post("/logout", logoutUser);

export default authRouter;
