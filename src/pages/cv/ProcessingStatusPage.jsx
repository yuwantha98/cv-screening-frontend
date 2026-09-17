import { useState } from "react";

export default function ProcessingStatusPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const candidates = [
    {
      name: "Sarah Jenkins",
      email: "sarah.j@example.com",
      progress: 100,
      status: "Evaluated",
      eta: "Complete",
      statusColor: "bg-green-100 text-green-700",
      barColor: "bg-green-700"
    },
    {
      name: "Alex Rodriguez",
      email: "alex.r@example.com",
      progress: 60,
      status: "Evaluating",
      eta: "~30s left",
      statusColor: "bg-blue-100 text-blue-700",
      barColor: "bg-blue-600"
    },
    {
      name: "Michael Chen",
      email: "m.chen@example.com",
      progress: 40,
      status: "Evaluating",
      eta: "~50s left",
      statusColor: "bg-blue-100 text-blue-700",
      barColor: "bg-blue-600"
    },
    {
      name: "Elena Rostova",
      email: "elena.r@example.com",
      progress: 10,
      status: "Queued",
      eta: "~1m 20s left",
      statusColor: "bg-gray-100 text-gray-600",
      barColor: "bg-gray-400"
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Top Header with Search, Notification & Help Icons */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Processing Status</h1>
        
        <div className="flex items-center gap-3">
          {/* Search Box with Magnifying Glass Icon & Focus State */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
              🔍
            </span>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidate or job..." 
              className="bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition"
            />
          </div>

          {/* Notification Button */}
          <button className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-50 transition shadow-sm relative">
            🔔
            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full"></span>
          </button>

          {/* Help Button */}
          <button className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-50 transition shadow-sm font-bold text-sm">
            ?
          </button>
        </div>
      </div>

      {/* Top Job & Steps Progress Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-blue-50 text-blue-700 rounded-lg">💼</span>
              <h3 className="font-bold text-gray-900 text-base">Senior Software Engineer</h3>
            </div>
            <p className="text-xs text-gray-500 mt-1">Currently processing 8 candidate resumes</p>
          </div>
          <div className="text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
            ⏱ Estimated time left: ~2 mins
          </div>
        </div>

        {/* 3 Step Process Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-green-50/50 border border-green-200 p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-green-800">1. Text Extraction</p>
              <p className="text-[11px] text-green-600 mt-0.5">Completed (8/8 CVs)</p>
            </div>
            <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</span>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex items-center justify-between ring-2 ring-blue-500/20">
            <div>
              <p className="text-xs font-bold text-blue-900">2. AI Evaluation</p>
              <p className="text-[11px] text-blue-700 mt-0.5">Processing (4/8 Evaluated)</p>
            </div>
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold animate-spin">⚙</span>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex items-center justify-between opacity-75">
            <div>
              <p className="text-xs font-bold text-gray-700">3. Ranking & Recommendation</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Queued</p>
            </div>
            <span className="w-6 h-6 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          </div>
        </div>
      </div>

      {/* Candidates Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6">
        <div className="grid grid-cols-4 px-6 py-3.5 bg-gray-50/75 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
          <span>Candidate</span>
          <span>Overall Status</span>
          <span>Current Stage</span>
          <span>ETA</span>
        </div>

        <div className="divide-y divide-gray-100">
          {candidates.map((candidate, idx) => (
            <div key={idx} className="grid grid-cols-4 px-6 py-4 items-center hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                  {candidate.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{candidate.name}</p>
                  <p className="text-xs text-gray-400">{candidate.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pr-8">
                <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className={`h-2 rounded-full ${candidate.barColor}`} style={{ width: `${candidate.progress}%` }}></div>
                </div>
                <span className="text-xs font-bold text-gray-700 w-9 text-right">{candidate.progress}%</span>
              </div>

              <div>
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${candidate.statusColor}`}>
                  {candidate.status}
                </span>
              </div>

              <div className="text-xs font-medium text-gray-500">
                {candidate.eta}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Info & Cancel Button */}
      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-500 flex items-center gap-1.5">
          <span>💡</span> System automatically saves intermediate progress even if processing is interrupted.
        </p>
        <button className="bg-white text-red-600 border border-red-300 text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-red-50 transition shadow-sm">
          Cancel Screening
        </button>
      </div>
    </div>
  );
}