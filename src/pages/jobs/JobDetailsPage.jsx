import { useState } from "react";

export default function JobDetailsPage() {
  const [isEditing, setIsEditing] = useState(false);

  // Job data state
  const [job, setJob] = useState({
    title: "Senior Frontend Engineer",
    jobId: "SSE-2024",
    department: "Engineering",
    location: "Colombo 03 (Hybrid)",
    type: "Full-time",
    experience: "Senior (5+ years)",
    salaryMin: "80,000",
    salaryMax: "130,000",
    postedDate: "Aug 28, 2026",
    applicantsCount: 142,
    status: "Active",
    description: "We're looking for a driven Senior Frontend Engineer to join our growing product team. You will own the architecture and implementation of key user-facing features, collaborating closely with design and backend teams to deliver seamless user experiences.",
    requirements: [
      "5+ years of experience in React, TypeScript, and modern frontend architecture.",
      "Strong proficiency in Tailwind CSS and responsive web design.",
      "Experience with state management libraries and RESTful API integrations.",
      "Bachelor’s degree in Computer Science or equivalent practical experience."
    ],
    skills: ["React", "TypeScript", "Node.js", "Tailwind CSS", "Redux"]
  });

  // Temporary inputs for Edit form state
  const [formData, setFormData] = useState({ ...job });

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setJob({ ...formData });
    setIsEditing(false); // Go back to Details view after saving
  };

  // If "Edit Job" is clicked, show the Edit Job Form view
  if (isEditing) {
    return (
      <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Job Posting</h1>
            <p className="text-xs text-gray-500 mt-1">Update the job details and save changes.</p>
          </div>
          <button 
            type="button" 
            onClick={() => setIsEditing(false)}
            className="text-xs font-semibold text-gray-600 hover:text-gray-900 bg-white border border-gray-300 px-4 py-2 rounded-xl"
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSaveEdit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider">Basic Information</h3>
              
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Job Title *</label>
                  <input 
                    type="text" 
                    value={formData.title} 
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Department *</label>
                    <input 
                      type="text" 
                      value={formData.department} 
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Location</label>
                    <input 
                      type="text" 
                      value={formData.location} 
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">Job Description *</label>
              <textarea 
                rows="5"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 leading-relaxed"
              ></textarea>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 mb-4 uppercase tracking-wider">Salary Range (USD)</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-[11px] text-gray-500 mb-1">Min</label>
                  <input 
                    type="text" 
                    value={formData.salaryMin}
                    onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-lg p-2 text-sm focus:outline-none border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-500 mb-1">Max</label>
                  <input 
                    type="text" 
                    value={formData.salaryMax}
                    onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-lg p-2 text-sm focus:outline-none border-gray-300"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                type="submit" 
                className="w-full bg-[#0B2149] text-white text-sm font-semibold py-3 rounded-xl hover:bg-blue-900 transition shadow-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  // Default View: Job Details Page
  return (
    <div className="p-8 max-w-5xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            {job.department}
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 mt-2">{job.title}</h1>
          <p className="text-xs text-gray-500 mt-1">Job ID: {job.jobId} • Posted on {job.postedDate}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsEditing(true)}
            className="bg-[#0B2149] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-900 transition shadow-sm cursor-pointer"
          >
            Edit Job
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-400 font-medium">Location</p>
          <p className="text-sm font-bold text-gray-800 mt-1">{job.location}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-400 font-medium">Total Applicants</p>
          <p className="text-sm font-bold text-blue-600 mt-1">{job.applicantsCount} candidates</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-400 font-medium">Salary Range</p>
          <p className="text-sm font-bold text-gray-800 mt-1">${job.salaryMin} - ${job.salaryMax} / year</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-400 font-medium">Status</p>
          <p className="text-sm font-bold text-green-600 mt-1">{job.status}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">Job Description</h3>
        <p className="text-gray-600 leading-relaxed text-sm">{job.description}</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">Requirements & Responsibilities</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm">
          {job.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">Required Skills for AI Screening</h3>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill, index) => (
            <span key={index} className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-blue-200">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}