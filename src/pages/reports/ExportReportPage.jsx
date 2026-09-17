import { useState } from "react";

export default function ExportReportPage() {
  const [format, setFormat] = useState("CSV");
  const [jobPosition, setJobPosition] = useState("All Job Positions");
  const [startDate, setStartDate] = useState("2025-05-01");
  const [endDate, setEndDate] = useState("2025-05-31");
  const [recommendation, setRecommendation] = useState("All Recommendations");

  // Checkboxes state
  const [options, setOptions] = useState({
    candidateDetails: true,
    matchScores: true,
    skillsAnalysis: true,
    missingSkills: true,
    aiRecommendations: true,
    processingDate: true,
  });

  const handleCheckboxChange = (key) => {
    setOptions({ ...options, [key]: !options[key] });
  };

  const handleExportNow = () => {
    alert(`Successfully exported screening report in ${format} format!`);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Top Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Export Report</h1>
        <p className="text-xs text-gray-500 mt-1">
          Home &gt; Reports &gt; <span className="text-blue-600 font-medium">Export</span>
        </p>
      </div>

      <p className="text-xs text-gray-500 mb-6">
        Export candidate screening results to CSV or PDF format.
      </p>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Left Card: Select Export Format */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
              <div>
                <h3 className="text-sm font-bold text-gray-900">Select Export Format</h3>
                <p className="text-[11px] text-gray-400">Choose the format you want to export</p>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              {/* CSV Option */}
              <div 
                onClick={() => setFormat("CSV")}
                className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition ${format === 'CSV' ? 'border-blue-600 bg-blue-50/30 ring-2 ring-blue-500/20' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-50 text-blue-700 rounded-lg text-lg">📄</div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">CSV</p>
                    <p className="text-xs text-gray-500">Export data in CSV format. Best for data analysis in Excel.</p>
                  </div>
                </div>
                <input type="radio" checked={format === 'CSV'} onChange={() => setFormat("CSV")} className="accent-blue-600 w-4 h-4" />
              </div>

              {/* PDF Option */}
              <div 
                onClick={() => setFormat("PDF")}
                className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition ${format === 'PDF' ? 'border-blue-600 bg-blue-50/30 ring-2 ring-blue-500/20' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-red-50 text-red-600 rounded-lg text-lg">📑</div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">PDF</p>
                    <p className="text-xs text-gray-500">Export data in PDF format. Best for sharing and printing.</p>
                  </div>
                </div>
                <input type="radio" checked={format === 'PDF'} onChange={() => setFormat("PDF")} className="accent-blue-600 w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Customize Export */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Customize Export</h3>
              <p className="text-[11px] text-gray-400">Choose data and filters for your export</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Job Position Dropdown */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Job Position</label>
              <select 
                value={jobPosition} 
                onChange={(e) => setJobPosition(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl p-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Job Positions</option>
                <option>Senior Frontend Engineer</option>
                <option>Product Manager</option>
                <option>Data Scientist</option>
              </select>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Date Range</label>
              <div className="grid grid-cols-2 gap-2 items-center">
                <input 
                  type="date" 
                  value={startDate} 
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-white border border-gray-200 rounded-xl p-2 text-xs text-gray-800 focus:outline-none" 
                />
                <input 
                  type="date" 
                  value={endDate} 
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-white border border-gray-200 rounded-xl p-2 text-xs text-gray-800 focus:outline-none" 
                />
              </div>
            </div>

            {/* Recommendation Dropdown */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Recommendation</label>
              <select 
                value={recommendation} 
                onChange={(e) => setRecommendation(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl p-2.5 text-xs text-gray-800 focus:outline-none"
              >
                <option>All Recommendations</option>
                <option>Shortlisted</option>
                <option>Rejected</option>
              </select>
            </div>

            {/* Include in Export Checkboxes */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">Include in Export</label>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={options.candidateDetails} onChange={() => handleCheckboxChange("candidateDetails")} className="accent-blue-600 rounded" />
                  Candidate Details
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={options.missingSkills} onChange={() => handleCheckboxChange("missingSkills")} className="accent-blue-600 rounded" />
                  Missing Skills
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={options.matchScores} onChange={() => handleCheckboxChange("matchScores")} className="accent-blue-600 rounded" />
                  Match Scores
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={options.aiRecommendations} onChange={() => handleCheckboxChange("aiRecommendations")} className="accent-blue-600 rounded" />
                  AI Recommendations
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={options.skillsAnalysis} onChange={() => handleCheckboxChange("skillsAnalysis")} className="accent-blue-600 rounded" />
                  Skills Analysis
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={options.processingDate} onChange={() => handleCheckboxChange("processingDate")} className="accent-blue-600 rounded" />
                  Processing Date
                </label>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Summary & Export Action Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="w-full md:w-auto">
          <h3 className="text-sm font-bold text-gray-900 mb-2">Export Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
            <div>
              <p className="text-gray-400">Job Position</p>
              <p className="font-bold text-gray-800 mt-0.5">{jobPosition}</p>
            </div>
            <div>
              <p className="text-gray-400">Date Range</p>
              <p className="font-bold text-gray-800 mt-0.5">{startDate} - {endDate}</p>
            </div>
            <div>
              <p className="text-gray-400">Total Candidates</p>
              <p className="font-bold text-gray-800 mt-0.5">1,188</p>
            </div>
            <div>
              <p className="text-gray-400">Format</p>
              <p className="font-bold text-blue-600 mt-0.5">{format}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button 
            onClick={() => alert("Cancelled")}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button 
            onClick={handleExportNow}
            className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#0B2149] hover:bg-blue-900 transition shadow-sm"
          >
            Export Now
          </button>
        </div>
      </div>

    </div>
  );
}