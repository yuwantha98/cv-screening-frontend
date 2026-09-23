import fs from "fs";
import axios from "axios";
import FormData from "form-data";

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://127.0.0.1:8000";

export async function analyzeCandidateWithAI({ cvPath, job }) {
  try {
    if (!cvPath) {
      throw new Error("CV file path is required");
    }

    if (!job) {
      throw new Error("Job data is required");
    }

    if (!fs.existsSync(cvPath)) {
      throw new Error(`CV file not found: ${cvPath}`);
    }

    const form = new FormData();

    form.append("cv", fs.createReadStream(cvPath));

    form.append(
      "job_json",
      JSON.stringify({
        title: job.title,

        description: job.description,

        requiredSkills: job.requiredSkills || [],

        minimumMatchScore:
          job.aiScreening?.minimumMatchScore ?? job.minimumMatchScore ?? 70,
      }),
    );

    const response = await axios.post(`${AI_SERVICE_URL}/analyze`, form, {
      headers: {
        ...form.getHeaders(),
      },

      timeout: 120000,
    });

    return response.data;
  } catch (error) {
    console.error("AI Service Error:", error.response?.data || error.message);

    const message =
      error.response?.data?.detail ||
      error.message ||
      "AI service request failed";

    throw new Error(message);
  }
}
