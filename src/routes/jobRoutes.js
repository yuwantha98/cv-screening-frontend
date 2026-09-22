import { Router } from "express";

import {
  createJob,
  getAllJobs,
  getJobById,
} from "../controllers/jobController.js";

const jobRouter = Router();

/*
|--------------------------------------------------------------------------
| GET ALL JOBS
|--------------------------------------------------------------------------
*/

jobRouter.get("/", getAllJobs);

jobRouter.post("/", createJob);

/*
|--------------------------------------------------------------------------
| GET JOB BY ID
|--------------------------------------------------------------------------
*/

jobRouter.get("/:jobId", getJobById);

export default jobRouter;
