import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Candidate name is required"],
    },
    email: {
      type: String,
      required: [true, "Candidate email is required"],
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    resumeUrl: {
      type: String,
      default: "",
    },
    skills: {
      type: [String],
      default: [],
    },
    experienceYears: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Applied", "Under Review", "Shortlisted", "Rejected"],
      default: "Applied",
    },
    aiRankingScore: {
      type: Number,
      default: 0, 
    },
  },
  {
    timestamps: true,
  }
);

const Candidate = mongoose.model("Candidate", candidateSchema);

export default Candidate;