import swaggerUi from "swagger-ui-express";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import morgan from "morgan";

import { routes } from "./routes/";
import { config } from "./config";
import { config as dotenvConfig } from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { errorHandler } from "./middlewares/ErrorHandlers";

import path from "path";

const swaggerOutput = require("./routes/swagger_output.json");

const app = express();
dotenvConfig();

/* Pre middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: `http://localhost:${config.port}`,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
/* Routers */
app.use("/api", routes);

/* Swagger docs */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.use(errorHandler);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_CLOUD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export default app;
