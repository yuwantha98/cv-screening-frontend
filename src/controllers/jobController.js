import mongoose from "mongoose";
import Job from "../models/Job.js";

/*
|--------------------------------------------------------------------------
| Helper Functions
|--------------------------------------------------------------------------
*/

function normalizeSkills(skills) {
  if (Array.isArray(skills)) {
    return skills.map((skill) => String(skill).trim()).filter(Boolean);
  }

  if (typeof skills === "string") {
    return skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
  }

  return [];
}

function getShortlistNumber(value) {
  if (value === undefined || value === null) {
    return 10;
  }

  const match = String(value).match(/\d+/);

  if (!match) {
    return 10;
  }

  return Number(match[0]);
}

function getNumber(value) {
  if (value === "" || value === undefined || value === null) {
    return null;
  }

  const number = Number(String(value).replace(/,/g, ""));

  return Number.isFinite(number) ? number : null;
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/*
|--------------------------------------------------------------------------
| CREATE JOB
|--------------------------------------------------------------------------
|
| POST /api/jobs
|
*/

export async function createJob(request, response, next) {
  try {
    const {
      title,
      jobTitle,

      department,
      location,

      employmentType,
      experienceLevel,

      description,
      jobDescription,

      requiredSkills,

      minimumMatchScore = 70,

      autoShortlistTop,
      autoShortlist,

      biasDetection = true,

      shortlistEmailAlerts = true,

      autoRejectBelowThreshold,
      autoReject,

      minSalary,
      maxSalary,

      displaySalary,
      displaySalaryRange,

      status = "Active",
    } = request.body;

    const finalTitle = title || jobTitle;

    const finalDescription = description || jobDescription;

    /*
    |--------------------------------------------------------------------------
    | Required Field Validation
    |--------------------------------------------------------------------------
    */

    if (!finalTitle) {
      return response.status(400).json({
        message: "Job title is required",
      });
    }

    if (!department) {
      return response.status(400).json({
        message: "Department is required",
      });
    }

    if (!finalDescription) {
      return response.status(400).json({
        message: "Job description is required",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Status Validation
    |--------------------------------------------------------------------------
    */

    const allowedStatuses = ["Active", "Draft", "Closed", "Inactive"];

    if (!allowedStatuses.includes(status)) {
      return response.status(400).json({
        message: "Invalid job status",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Match Score Validation
    |--------------------------------------------------------------------------
    */

    const matchScore = Number(minimumMatchScore);

    if (matchScore < 50 || matchScore > 100) {
      return response.status(400).json({
        message: "Minimum match score must be between 50 and 100",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Salary Validation
    |--------------------------------------------------------------------------
    */

    const salaryMin = getNumber(minSalary);

    const salaryMax = getNumber(maxSalary);

    if (salaryMin !== null && salaryMax !== null && salaryMin > salaryMax) {
      return response.status(400).json({
        message: "Minimum salary cannot be greater than maximum salary",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Create Job
    |--------------------------------------------------------------------------
    */

    const job = await Job.create({
      title: finalTitle.trim(),

      department: department.trim(),

      location: location?.trim() || "",

      employmentType: employmentType || "Full-time",

      experienceLevel: experienceLevel || "",

      description: finalDescription.trim(),

      requiredSkills: normalizeSkills(requiredSkills),

      aiScreening: {
        minimumMatchScore: matchScore,

        autoShortlistTop: getShortlistNumber(autoShortlistTop ?? autoShortlist),

        biasDetection: Boolean(biasDetection),

        shortlistEmailAlerts: Boolean(shortlistEmailAlerts),

        autoRejectBelowThreshold: Boolean(
          autoRejectBelowThreshold ?? autoReject ?? false,
        ),
      },

      salaryRange: {
        min: salaryMin,

        max: salaryMax,

        displayOnListing: Boolean(displaySalaryRange ?? displaySalary ?? false),
      },

      status,

      postedAt: status === "Active" ? new Date() : null,

      createdBy: null,
    });

    return response.status(201).json({
      message:
        status === "Draft" ? "Job saved as draft" : "Job created successfully",

      job,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllJobs(request, response, next) {
  try {
    const { search = "", department = "", status = "" } = request.query;

    const query = {};

    /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

    if (search.trim()) {
      const safeSearch = escapeRegex(search.trim());

      query.$or = [
        {
          title: {
            $regex: safeSearch,
            $options: "i",
          },
        },

        {
          location: {
            $regex: safeSearch,
            $options: "i",
          },
        },
      ];
    }

    /*
    |--------------------------------------------------------------------------
    | Department Filter
    |--------------------------------------------------------------------------
    */

    if (department && department !== "All Department") {
      query.department = department;
    }

    /*
    |--------------------------------------------------------------------------
    | Status Filter
    |--------------------------------------------------------------------------
    */

    if (status && status !== "All Status") {
      query.status = status;
    }

    /*
    |--------------------------------------------------------------------------
    | Find Jobs
    |--------------------------------------------------------------------------
    */

    const jobs = await Job.find(query).sort({
      createdAt: -1,
    });

    return response.status(200).json({
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    next(error);
  }
}

/*
|--------------------------------------------------------------------------
| GET JOB BY ID
|--------------------------------------------------------------------------
|
| GET /api/jobs/:jobId
|
*/

export async function getJobById(request, response, next) {
  try {
    const { jobId } = request.params;

    /*
    |--------------------------------------------------------------------------
    | MongoDB Object ID Validation
    |--------------------------------------------------------------------------
    */

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return response.status(400).json({
        message: "Invalid job ID",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return response.status(404).json({
        message: "Job not found",
      });
    }

    return response.status(200).json({
      job,
    });
  } catch (error) {
    next(error);
  }
}
