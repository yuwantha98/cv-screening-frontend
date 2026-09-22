import { Router } from "express";
import { uploadCVs } from "../controllers/cvController.js";
import { uploadCVFiles } from "../middleware/uploadMiddleware.js";

const cvRouter = Router();

cvRouter.post("/upload", uploadCVFiles, uploadCVs);

export default cvRouter;