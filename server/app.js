import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import adminRouter from "./routes/adminRoutes.js";
import cvRouter from "./routes/cvRoutes.js";
import healthRouter from "./routes/healthRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

const app = express();
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

app.use(helmet());
app.use(cors({ origin: clientUrl, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (_request, response) => {
  response.json({ message: "CV Screening API" });
});

app.use("/api/health", healthRouter);
app.use("/api/cv", cvRouter);
app.use("/api/admin", adminRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
