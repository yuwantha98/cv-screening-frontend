import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";

import healthRouter from "./routes/healthRoutes.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js"; 
import { errorHandler, notFound } from "./middleware/errorHandler.js";

import jobRouter from "./routes/jobRoutes.js";

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

/*
YUWANTHA - COMPLETED BACKEND TASKS
- Register API
- Login API
- Password Hashing
- User Validation
*/
app.use("/api/auth", authRouter);

/*
ME - COMPLETED USER PROFILE & ROLE TASKS
- User Profile API (/api/users/profile)
- Update Profile API (/api/users/profile)
- Admin Protected Route (/api/users/admin-dashboard)
*/
app.use("/api/users", userRouter);
app.use("/api/jobs", jobRouter);

/*
TODO - OTHER TEAM MEMBERS
app.use("/api/jobs", jobRouter);
app.use("/api/cv", cvRouter);
app.use("/api/candidates", candidateRouter);
app.use("/api/reports", reportRouter);
app.use("/api/admin", adminRouter);
*/

app.use(notFound);
app.use(errorHandler);

export default app;