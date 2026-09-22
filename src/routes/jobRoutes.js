import express from "express";
import { getJobs, updateJob, deleteJob } from "../controllers/jobController.js";
import verifyToken from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import { validateJobUpdate } from "../middleware/jobValidation.js";

const router = express.Router();

// Search & Filter Jobs (Any authenticated HR / Admin or public)
router.get("/", verifyToken, getJobs);

// Update Job (Only Admin or HR Manager)
router.put("/:id", verifyToken, authorizeRoles("Admin", "HR Manager"), validateJobUpdate, updateJob);

// Delete Job (Only Admin)
router.delete("/:id", verifyToken, authorizeRoles("Admin"), deleteJob);

export default router;