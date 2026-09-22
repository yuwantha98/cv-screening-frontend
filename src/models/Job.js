import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
    location: {
      type: String,
      default: "Remote",
    },
    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
      default: "Full-time",
    },
    requirements: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["Draft", "Open", "Closed"],
      default: "Open",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Adding an index for the title and description to improve search performance
jobSchema.index({ title: "text", description: "text" });

const Job = mongoose.model("Job", jobSchema);

export default Job;