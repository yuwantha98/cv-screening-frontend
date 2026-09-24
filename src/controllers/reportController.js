import Candidate from "../models/Candidate.js";
import Job from "../models/Job.js";
import PDFDocument from "pdfkit";
import { Parser } from "json2csv";

// 1. Reports API (Obtaining standard reports)
export const getReports = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Reports API working" });
  } catch (error) {
    if (typeof next === "function") return next(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 2. Ranked Candidate Report Data (Retrieving AI-ranked data)
export const getRankedCandidateReport = async (req, res, next) => {
  try {
    const candidates = await Candidate.find().sort({ aiRankingScore: -1 }).populate("jobId", "title");
    res.status(200).json({ success: true, data: candidates });
  } catch (error) {
    if (typeof next === "function") return next(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 3. Report Filtering API (Filtering reports by Job or Date)
export const filterReports = async (req, res, next) => {
  try {
    const { jobId, status } = req.query;
    let query = {};
    if (jobId) query.jobId = jobId;
    if (status) query.status = status;

    const filteredData = await Candidate.find(query);
    res.status(200).json({ success: true, count: filteredData.length, data: filteredData });
  } catch (error) {
    if (typeof next === "function") return next(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 4. Candidate Evaluation Summary API
export const getEvaluationSummary = async (req, res, next) => {
  try {
    const totalCandidates = await Candidate.countDocuments();
    const shortlisted = await Candidate.countDocuments({ status: "Shortlisted" });
    
    res.status(200).json({ 
      success: true, 
      summary: { totalCandidates, shortlisted } 
    });
  } catch (error) {
    if (typeof next === "function") return next(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 5. CSV Export API
export const exportCSV = async (req, res, next) => {
  try {
    const candidates = await Candidate.find().lean();
    
    const fields = ["name", "email", "status", "aiRankingScore", "experienceYears"];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(candidates);

    res.header("Content-Type", "text/csv");
    res.attachment("candidates_report.csv");
    return res.send(csv);
  } catch (error) {
    if (typeof next === "function") return next(error);
    res.status(500).json({ message: "Error generating CSV", error: error.message });
  }
};

// 6. PDF Export API
export const exportPDF = async (req, res, next) => {
  try {
    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="report.pdf"');
    
    doc.pipe(res);
    doc.fontSize(20).text("Candidate Evaluation Report", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text("This is an auto-generated PDF report from the CV Screening System.");
    doc.end();
  } catch (error) {
    if (typeof next === "function") return next(error);
    res.status(500).json({ message: "Error generating PDF", error: error.message });
  }
};