import express from "express";
import { 
  getReports, 
  getRankedCandidateReport, 
  filterReports, 
  getEvaluationSummary, 
  exportCSV, 
  exportPDF 
} from "../controllers/reportController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getReports);
router.get("/ranked", verifyToken, getRankedCandidateReport);
router.get("/filter", verifyToken, filterReports);
router.get("/summary", verifyToken, getEvaluationSummary);
router.get("/export/csv", verifyToken, exportCSV);
router.get("/export/pdf", verifyToken, exportPDF);

export default router;