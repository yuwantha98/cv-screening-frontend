import express from "express";
import { getCandidates, getCandidateById, searchCandidates } from "../controllers/candidateController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

// The Search/Filter must come first (before :id)
router.get("/search", verifyToken, searchCandidates);

router.get("/", verifyToken, getCandidates);
router.get("/:id", verifyToken, getCandidateById);

export default router;