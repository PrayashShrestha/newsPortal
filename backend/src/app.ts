import swaggerUi from "swagger-ui-express";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import morgan from "morgan";

import { routes } from "./routes/";
import { config } from "./config";
import { errorHandler } from "./middlewares/ErrorHandlers";

import path from "path";

const swaggerOutput = require("./routes/swagger_output.json");

const app = express();

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

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors({
  origin: 'http://localhost:3000'
}))
/* Routers */
app.use("/api", routes);

/* Swagger docs */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.use(errorHandler);
export default app;
