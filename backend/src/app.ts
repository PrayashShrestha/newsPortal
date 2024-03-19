import swaggerUi from "swagger-ui-express";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import morgan from "morgan";

import { routes } from "./routes/";
import { config } from "./config";
import { errorHandler } from "./middlewares/ErrorHandlers";

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

/* Routers */
app.use("/api", routes);

/* Swagger docs */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.use(errorHandler);
export default app;
