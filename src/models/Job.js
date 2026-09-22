import mongoose from "mongoose";

const aiScreeningSchema = new mongoose.Schema(
  {
    minimumMatchScore: {
      type: Number,
      min: 50,
      max: 100,
      default: 70,
    },

    autoShortlistTop: {
      type: Number,
      min: 1,
      default: 10,
    },

    biasDetection: {
      type: Boolean,
      default: true,
    },

    shortlistEmailAlerts: {
      type: Boolean,
      default: true,
    },

    autoRejectBelowThreshold: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

const salaryRangeSchema = new mongoose.Schema(
  {
    min: {
      type: Number,
      default: null,
    },

    max: {
      type: Number,
      default: null,
    },

    displayOnListing: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },

    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    employmentType: {
      type: String,
      trim: true,
      default: "Full-time",
    },

    experienceLevel: {
      type: String,
      trim: true,
      default: "",
    },

    description: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
    },

    requiredSkills: {
      type: [String],
      default: [],
    },

    aiScreening: {
      type: aiScreeningSchema,
      default: () => ({}),
    },

    salaryRange: {
      type: salaryRangeSchema,
      default: () => ({}),
    },

    status: {
      type: String,
      enum: ["Active", "Draft", "Closed", "Inactive"],
      default: "Active",
    },

    applicantCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    postedAt: {
      type: Date,
      default: null,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Job", jobSchema);
