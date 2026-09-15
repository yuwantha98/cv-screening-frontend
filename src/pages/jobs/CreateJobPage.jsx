import { useState } from "react";

export default function EditJobPage() {
  const [jobTitle, setJobTitle] = useState("Senior Frontend Engineer");
  const [department, setDepartment] = useState("Engineering");
  const [location, setLocation] = useState("Remote, New York, NY");
  const [employmentType, setEmploymentType] = useState("Full-time");
  const [experienceLevel, setExperienceLevel] = useState("Senior (5+ years)");
  const [description, setDescription] = useState(
    "We're looking for a driven Senior Frontend Engineer to join our growing product team. You will own the architecture and implementation of key user-facing features, collaborating closely with design and backend teams..."
  );
  
  // Required Skills state
  const [skills, setSkills] = useState(["React", "TypeScript", "Node.js"]);
  const [newSkill, setNewSkill] = useState("");

  // AI Screening Settings state
  const [matchScore, setMatchScore] = useState(70);
  const [topCandidates, setTopCandidates] = useState("Top 10 candidates");
  const [enableBiasDetection, setEnableBiasDetection] = useState(true);
  const [sendEmailAlerts, setSendEmailAlerts] = useState(true);
  const [autoReject, setAutoReject] = useState(false);

  // Salary Range state
  const [minSalary, setMinSalary] = useState("80,000");
  const [maxSalary, setMaxSalary] = useState("130,000");
  const [displaySalary, setDisplaySalary] = useState(false);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Job Updated/Saved:", {
      jobTitle,
      department,
      location,
      employmentType,
      experienceLevel,
      description,
      skills,
      matchScore,
      salary: { minSalary, maxSalary }
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Job Posting</h1>
        <p className="text-xs text-gray-500 mt-1">Fill in the details and publish to start AI-powered screening.</p>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left & Center Columns (Basic Info, Description, Skills) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Basic Information Box */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">Basic Information</h3>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Job Title *</label>
                <input 
                  type="text" 
                  value={jobTitle} 
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Department *</label>
                  <select 
                    value={department} 
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                  >
                    <option>Engineering</option>
                    <option>Product</option>
                    <option>Design</option>
                    <option>Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Location</label>
                  <input 
                    type="text" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Employment Type</label>
                  <select 
                    value={employmentType} 
                    onChange={(e) => setEmploymentType(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Experience Level</label>
                  <select 
                    value={experienceLevel} 
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                  >
                    <option>Senior (5+ years)</option>
                    <option>Mid-level (3-5 years)</option>
                    <option>Junior (1-3 years)</option>
                    <option>Entry Level</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Job Description Box */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">Job Description *</label>
              <span className="text-xs text-gray-400">0 words</span>
            </div>
            <p className="text-xs text-gray-500 mb-3">Used by AI to match and rank candidates. Include responsibilities, qualifications, and team context.</p>
            
            <textarea 
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 leading-relaxed"
            ></textarea>
            <p className="text-[11px] text-gray-400 mt-1">Minimum 100 words recommended for better AI matching accuracy.</p>
          </div>

          {/* Required Skills Box */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-xs font-bold text-gray-800 mb-1 uppercase tracking-wider">Required Skills</h3>
            <p className="text-xs text-gray-500 mb-4">Skills added here are used by the AI to score and rank incoming CVs.</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill, index) => (
                <span key={index} className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-blue-200 flex items-center gap-2">
                  {skill}
                  <button type="button" onClick={() => handleRemoveSkill(skill)} className="text-blue-400 hover:text-red-600 font-bold">×</button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Type a skill and press Enter or Add..." 
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button 
                type="button" 
                onClick={handleAddSkill}
                className="bg-gray-100 text-gray-700 border border-gray-300 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition"
              >
                Add
              </button>
            </div>
          </div>

        </div>

        {/* Right Column (AI Screening Settings & Salary Range) */}
        <div className="flex flex-col gap-6">
          
          {/* AI Screening Settings */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-xs font-bold text-gray-800 mb-4 uppercase tracking-wider">AI Screening Settings</h3>
            
            <div className="mb-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-gray-700">Minimum Match Score</span>
                <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">{matchScore}%</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="100" 
                value={matchScore} 
                onChange={(e) => setMatchScore(e.target.value)}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-700 mb-1">Auto-shortlist Top</label>
              <select 
                value={topCandidates}
                onChange={(e) => setTopCandidates(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
              >
                <option>Top 10 candidates</option>
                <option>Top 20 candidates</option>
                <option>Top 5 candidates</option>
              </select>
            </div>

            <div className="flex flex-col gap-3 pt-2 border-t border-gray-100">
              <label className="flex items-center gap-2.5 text-xs font-medium text-gray-700 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={enableBiasDetection}
                  onChange={(e) => setEnableBiasDetection(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 accent-blue-600"
                />
                Enable AI bias detection
              </label>

              <label className="flex items-center gap-2.5 text-xs font-medium text-gray-700 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={sendEmailAlerts}
                  onChange={(e) => setSendEmailAlerts(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 accent-blue-600"
                />
                Send shortlist email alerts
              </label>

              <label className="flex items-center gap-2.5 text-xs font-medium text-gray-700 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={autoReject}
                  onChange={(e) => setAutoReject(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 accent-blue-600"
                />
                Auto-reject below threshold
              </label>
            </div>
          </div>

          {/* Salary Range */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-xs font-bold text-gray-800 mb-4 uppercase tracking-wider">Salary Range</h3>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">Min (USD)</label>
                <input 
                  type="text" 
                  value={minSalary}
                  onChange={(e) => setMinSalary(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-gray-500 mb-1">Max (USD)</label>
                <input 
                  type="text" 
                  value={maxSalary}
                  onChange={(e) => setMaxSalary(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
              <input 
                type="checkbox" 
                checked={displaySalary}
                onChange={(e) => setDisplaySalary(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 accent-blue-600"
              />
              Display salary range on listing
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button 
              type="submit" 
              className="w-full bg-[#0B2149] text-white text-sm font-semibold py-3 rounded-xl hover:bg-blue-900 transition shadow-md"
            >
              Publish Job
            </button>
            <button 
              type="button" 
              className="w-full bg-white text-gray-700 border border-gray-300 text-sm font-semibold py-3 rounded-xl hover:bg-gray-50 transition shadow-sm"
            >
              Save as Draft
            </button>
            <button 
              type="button" 
              className="w-full text-gray-500 text-sm font-medium py-2 hover:text-gray-700 transition"
            >
              Cancel
            </button>
          </div>

        </div>

      </form>
    </div>
  );
}