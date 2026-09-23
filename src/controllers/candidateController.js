import Candidate from "../models/Candidate.js";

// 1. Get all candidates 
export const getCandidates = async (req, res, next) => {
  try {
    const candidates = await Candidate.find().populate("jobId", "title department");
    res.status(200).json({ success: true, count: candidates.length, data: candidates });
  } catch (error) {
    if (typeof next === "function") return next(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 2. Get candidate by ID 
export const getCandidateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const candidate = await Candidate.findById(id).populate("jobId", "title department");

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json({ success: true, data: candidate });
  } catch (error) {
    if (typeof next === "function") return next(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 3. Search / Filter Candidates 
export const searchCandidates = async (req, res, next) => {
  try {
    const { jobId, status, skill } = req.query;
    let query = {};

    if (jobId) query.jobId = jobId;
    if (status) query.status = status;
    if (skill) query.skills = { $regex: skill, $options: "i" }; 

    const candidates = await Candidate.find(query).populate("jobId", "title");
    
    res.status(200).json({ success: true, count: candidates.length, data: candidates });
  } catch (error) {
    if (typeof next === "function") return next(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};