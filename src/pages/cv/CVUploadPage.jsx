import { useState } from "react";

export default function CVUploadPage() {
  const [selectedJob, setSelectedJob] = useState("Senior Software Engineer (ID: SSE-2024)");
  const [files, setFiles] = useState([
    { name: "Sarah_Jenkins_CV.pdf", size: "2.4 MB", status: "Uploaded" },
    { name: "Alex_Rodriguez_Resume.pdf", size: "1.8 MB", status: "Uploaded" },
    { name: "Michael_Chen_CV.docx", size: "3.1 MB", status: "Pending Upload" },
    { name: "John_Doe_Portfolio_Heavy.pdf", size: "12.5 MB", status: "Failed", error: "File size exceeds maximum limit of 10MB" }
  ]);
  const [isDragging, setIsDragging] = useState(false);

  // Handle Drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFile = e.dataTransfer.files[0];
      addNewFileToList(newFile);
    }
  };

  // Handle file browse input
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFile = e.target.files[0];
      addNewFileToList(newFile);
    }
  };

  // Helper to add files and check validation UI (File size & format check)
  const addNewFileToList = (file) => {
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
    let status = "Uploaded";
    let errorMsg = "";

    // File Validation UI logic based on design
    if (file.size > 10 * 1024 * 1024) {
      status = "Failed";
      errorMsg = "File size exceeds maximum limit of 10MB";
    }

    const newEntry = {
      name: file.name,
      size: `${fileSizeMB} MB`,
      status: status,
      error: errorMsg
    };

    setFiles([newEntry, ...files]);
  };

  // Delete file from list
  const handleDelete = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Top Header & Search/Icons */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Upload Resumes</h1>
        <div className="flex items-center gap-4">
          <input 
            type="text" 
            placeholder="Search candidate or job..." 
            className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Select Targeted Job Posting Box */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mb-6">
        <h3 className="text-sm font-bold text-gray-800 mb-1">Select Targeted Job Posting</h3>
        <p className="text-xs text-gray-500 mb-3">AI will evaluate and rank candidates specifically tailored to the selected job criteria.</p>
        
        <select 
          value={selectedJob} 
          onChange={(e) => setSelectedJob(e.target.value)}
          className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Senior Software Engineer (ID: SSE-2024)</option>
          <option>Full Stack Developer (ID: FSD-2024)</option>
          <option>UI/UX Designer (ID: UID-2024)</option>
        </select>
      </div>

      {/* Drag & Drop PDF Upload UI Box */}
      <div 
        className={`w-full p-10 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all mb-8 ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-indigo-200 bg-gray-50/50 hover:bg-gray-50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 text-blue-600 border border-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <p className="text-gray-800 font-bold mb-1">Drag and drop PDF files here</p>
          <p className="text-xs text-gray-500 mb-4">Support up to 50 files. PDF or DOCX format only, max 10MB per file.</p>
          
          <label className="bg-[#0B2149] text-white text-sm font-medium px-5 py-2.5 rounded-lg cursor-pointer hover:bg-blue-900 transition shadow-sm">
            Browse Files
            <input 
              type="file" 
              accept=".pdf,.docx" 
              className="hidden" 
              onChange={handleFileChange} 
            />
          </label>
        </div>
      </div>

      {/* Uploaded Files Section */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800 text-base">Uploaded Files ({files.length})</h3>
        <button onClick={() => setFiles([])} className="text-xs font-semibold text-gray-500 hover:text-red-600">Clear All</button>
      </div>

      <div className="flex flex-col gap-3 mb-8">
        {files.map((file, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-xl border flex items-center justify-between bg-white shadow-sm transition-all ${
              file.status === "Failed" ? "border-red-300 bg-red-50/20" : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-gray-500">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-800">{file.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{file.size}</span>
                  {file.status === "Failed" && (
                    <span className="text-xs font-medium text-red-600">{file.error}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {file.status === "Uploaded" && (
                <span className="text-xs font-semibold bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-200">Uploaded</span>
              )}
              {file.status === "Pending Upload" && (
                <span className="text-xs font-semibold bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-200">Pending Upload</span>
              )}
              {file.status === "Failed" && (
                <span className="text-xs font-semibold bg-red-50 text-red-700 px-3 py-1 rounded-full border border-red-200">Failed</span>
              )}
              
              <button onClick={() => handleDelete(index)} className="text-gray-400 hover:text-red-600 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Footer Action */}
      <div className="flex justify-between items-center border-t border-gray-200 pt-5">
        <p className="text-xs text-gray-500 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
          3 of 4 files ready for parsing and AI-ranking.
        </p>
        <button className="bg-[#0B2149] text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-blue-900 transition flex items-center gap-2 shadow-md">
          <span>Start AI Screening</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}