import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateJobPage() {
  const navigate = useNavigate();

  const [skills, setSkills] = useState(["React", "TypeScript", "Node.js"]);

  const [skillInput, setSkillInput] = useState("");
  const [matchScore, setMatchScore] = useState(70);

  const [formData, setFormData] = useState({
    jobTitle: "",
    department: "",
    location: "",
    employmentType: "Full-time",
    experienceLevel: "Senior (5+ years)",
    jobDescription:
      "We're looking for a driven Senior Frontend Engineer to join our growing product team. You will own the architecture and implementation of key user-facing features, collaborating closely with design and backend teams...",
    autoShortlist: "Top 10 candidates",
    biasDetection: true,
    shortlistEmailAlerts: true,
    autoReject: false,
    minSalary: "80,000",
    maxSalary: "130,000",
    displaySalary: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addSkill = () => {
    const value = skillInput.trim();

    if (!value) return;

    if (!skills.includes(value)) {
      setSkills((previous) => [...previous, value]);
    }

    setSkillInput("");
  };

  const removeSkill = (skill) => {
    setSkills((previous) => previous.filter((item) => item !== skill));
  };

  const handleSkillKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addSkill();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const jobData = {
      ...formData,
      requiredSkills: skills,
      minimumMatchScore: matchScore,
    };

    console.log("Job data:", jobData);

    // Backend connection will be added later.
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Page description */}
      <div>
        <h2 className="text-2xl font-bold text-[#12395f]">
          Create New Job Posting
        </h2>

        <p className="mt-1 text-xs font-medium text-[#7b7b7b]">
          Fill in the details and publish to start AI-powered screening.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.65fr_1fr]">
        {/* LEFT */}
        <div className="space-y-6">
          {/* Basic Information */}
          <section className="rounded-xl border border-[#8da1c3] bg-white p-5">
            <h3 className="mb-5 text-base font-bold text-[#12395f]">
              Basic Information
            </h3>

            <div>
              <label className="mb-2 block text-xs font-semibold text-[#12395f]">
                Job Title *
              </label>

              <input
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="e.g. Senior Frontend Engineer"
                className="h-10 w-full rounded-xl border border-[#a8b7d1] px-4 text-sm outline-none placeholder:text-[#a4b0c5] focus:border-[#405b91]"
              />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold text-[#12395f]">
                  Department *
                </label>

                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="h-10 w-full rounded-xl border border-[#a8b7d1] bg-white px-4 text-sm text-[#405b91] outline-none"
                >
                  <option value="">Select department</option>
                  <option>Engineering</option>
                  <option>Product</option>
                  <option>Analytics</option>
                  <option>Design</option>
                  <option>Infrastructure</option>
                  <option>Marketing</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-[#12395f]">
                  Location
                </label>

                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Remote, New York, NY"
                  className="h-10 w-full rounded-xl border border-[#a8b7d1] px-4 text-sm outline-none placeholder:text-[#a4b0c5]"
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold text-[#12395f]">
                  Employment Type
                </label>

                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  className="h-10 w-full rounded-xl border border-[#a8b7d1] bg-white px-4 text-sm text-[#405b91] outline-none"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-[#12395f]">
                  Experience Level
                </label>

                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="h-10 w-full rounded-xl border border-[#a8b7d1] bg-white px-4 text-sm text-[#405b91] outline-none"
                >
                  <option>Entry Level</option>
                  <option>Mid Level</option>
                  <option>Senior (5+ years)</option>
                </select>
              </div>
            </div>
          </section>

          {/* Description */}
          <section className="rounded-xl border border-[#8da1c3] bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-[#12395f]">
                  Job Description *
                </h3>

                <p className="mt-1 text-[10px] text-[#7184a1]">
                  Used by AI to match and rank candidates. Include
                  responsibilities, qualifications, and team context.
                </p>
              </div>

              <span className="text-[10px] text-[#aab5c7]">
                {
                  formData.jobDescription.trim().split(/\s+/).filter(Boolean)
                    .length
                }{" "}
                words
              </span>
            </div>

            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              className="mt-4 h-44 w-full resize-none rounded-xl border border-[#a8b7d1] p-4 text-xs leading-6 text-[#7184a1] outline-none focus:border-[#405b91]"
            />

            <p className="mt-2 text-[9px] text-[#a4b0c5]">
              Minimum 100 words recommended for better AI matching accuracy.
            </p>
          </section>

          {/* Skills */}
          <section className="rounded-xl border border-[#8da1c3] bg-white p-5">
            <h3 className="text-sm font-bold text-[#12395f]">
              Required Skills
            </h3>

            <p className="mt-1 text-[10px] text-[#7184a1]">
              Skills added here are used by the AI to score and rank incoming
              CVs.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="rounded-full bg-[#eef0ff] px-4 py-2 text-[11px] font-medium text-[#405b91]"
                >
                  {skill}
                  <span className="ml-2">×</span>
                </button>
              ))}
            </div>

            <div className="mt-4 flex gap-3">
              <input
                value={skillInput}
                onChange={(event) => setSkillInput(event.target.value)}
                onKeyDown={handleSkillKeyDown}
                placeholder="Type a skill and press Enter or Add..."
                className="h-10 min-w-0 flex-1 rounded-xl border border-[#a8b7d1] px-4 text-xs outline-none placeholder:text-[#9eacc3]"
              />

              <button
                type="button"
                onClick={addSkill}
                className="rounded-xl border border-[#a8b7d1] bg-[#eef0ff] px-5 text-xs font-semibold text-[#405b91]"
              >
                Add
              </button>
            </div>
          </section>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* AI Settings */}
          <section className="rounded-xl border border-[#8da1c3] bg-white p-5">
            <h3 className="text-lg font-bold text-[#12395f]">
              AI Screening Settings
            </h3>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-[#12395f]">
                  Minimum Match Score
                </label>

                <span className="rounded-full bg-[#efefff] px-4 py-1 text-sm font-semibold text-[#405b91]">
                  {matchScore}%
                </span>
              </div>

              <input
                type="range"
                min="50"
                max="100"
                value={matchScore}
                onChange={(event) => setMatchScore(Number(event.target.value))}
                className="mt-3 w-full accent-[#405b91]"
              />

              <div className="flex justify-between text-xs text-[#a0aec2]">
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-[#12395f]">
                Auto-shortlist Top
              </label>

              <select
                name="autoShortlist"
                value={formData.autoShortlist}
                onChange={handleChange}
                className="h-11 w-full rounded-xl border border-[#a8b7d1] bg-white px-4 text-sm text-[#405b91] outline-none"
              >
                <option>Top 5 candidates</option>
                <option>Top 10 candidates</option>
                <option>Top 20 candidates</option>
              </select>
            </div>

            <div className="mt-5 space-y-3">
              <label className="flex items-center gap-3 text-sm font-semibold text-[#12395f]">
                <input
                  type="checkbox"
                  name="biasDetection"
                  checked={formData.biasDetection}
                  onChange={handleChange}
                  className="h-4 w-4 accent-[#405b91]"
                />
                Enable AI bias detection
              </label>

              <label className="flex items-center gap-3 text-sm font-semibold text-[#12395f]">
                <input
                  type="checkbox"
                  name="shortlistEmailAlerts"
                  checked={formData.shortlistEmailAlerts}
                  onChange={handleChange}
                  className="h-4 w-4 accent-[#405b91]"
                />
                Send shortlist email alerts
              </label>

              <label className="flex items-center gap-3 text-sm font-semibold text-[#12395f]">
                <input
                  type="checkbox"
                  name="autoReject"
                  checked={formData.autoReject}
                  onChange={handleChange}
                  className="h-4 w-4 accent-[#405b91]"
                />
                Auto-reject below threshold
              </label>
            </div>
          </section>

          {/* Salary */}
          <section className="rounded-xl border border-[#8da1c3] bg-white p-6">
            <h3 className="text-lg font-bold text-[#12395f]">Salary Range</h3>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-xs font-medium text-[#12395f]">
                  Min (USD)
                </label>

                <input
                  name="minSalary"
                  value={formData.minSalary}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-[#a8b7d1] px-4 text-base text-[#8b9dbb] outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-[#12395f]">
                  Max (USD)
                </label>

                <input
                  name="maxSalary"
                  value={formData.maxSalary}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-[#a8b7d1] px-4 text-base text-[#8b9dbb] outline-none"
                />
              </div>
            </div>

            <label className="mt-5 flex items-center gap-3 text-xs font-medium text-[#405b91]">
              <input
                type="checkbox"
                name="displaySalary"
                checked={formData.displaySalary}
                onChange={handleChange}
                className="h-4 w-4 accent-[#405b91]"
              />
              Display salary range on listing
            </label>
          </section>

          {/* Buttons */}
          <div className="space-y-4">
            <button
              type="submit"
              className="h-12 w-full rounded-lg bg-[#405b91] text-lg font-semibold text-white hover:bg-[#354f81]"
            >
              Publish Job
            </button>

            <button
              type="button"
              className="h-12 w-full rounded-lg border border-[#8398ba] bg-white text-lg font-semibold text-[#405b91]"
            >
              Save as Draft
            </button>

            <button
              type="button"
              onClick={() => navigate("/jobs")}
              className="w-full text-center text-base font-medium text-[#818181]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
