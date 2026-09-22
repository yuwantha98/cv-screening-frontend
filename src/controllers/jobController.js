import Job from "../models/Job.js";

// 1. Search & Filter Jobs (with search query, department, status, & pagination)
export const getJobs = async (req, res, next) => {
  try {
    const { search, department, status, page = 1, limit = 10 } = req.query;

    const query = {};

    // Search by title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // Filter by department
    if (department) {
      query.department = department;
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const totalJobs = await Job.countDocuments(query);
    const jobs = await Job.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    return res.status(200).json({
      success: true,
      count: jobs.length,
      total: totalJobs,
      currentPage: Number(page),
      totalPages: Math.ceil(totalJobs / Number(limit)),
      data: jobs,
    });
  } catch (error) {
    if (typeof next === "function") return next(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 2. Update Job API
export const updateJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob,
    });
  } catch (error) {
    if (typeof next === "function") return next(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 3. Delete Job API
export const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndDelete(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    if (typeof next === "function") return next(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};