import { useMemo, useState } from "react";
import { Circle, Download, Search, Star } from "lucide-react";

const screeningResults = [
  {
    name: "Sarah Jenkins",
    email: "sarah.j@techcorp.com",
    position: "Senior Software Engineer",
    score: 94,
    status: "Highly Recommended",
    date: "May 31, 2025",
  },
  {
    name: "Alex Rodriguez",
    email: "alex.r@devmail.org",
    position: "Senior Software Engineer",
    score: 88,
    status: "Highly Recommended",
    date: "May 31, 2025",
  },
  {
    name: "Michael Chen",
    email: "m.chen@frontend.io",
    position: "Backend Engineer",
    score: 76,
    status: "Recommended",
    date: "May 30, 2025",
  },
  {
    name: "Elena Rostova",
    email: "e.rost@systems.net",
    position: "Frontend Engineer",
    score: 52,
    status: "Not Recommended",
    date: "May 30, 2025",
  },
  {
    name: "David Kim",
    email: "d@cloudinfra.com",
    position: "DevOps Engineer",
    score: 81,
    status: "Highly Recommended",
    date: "May 29, 2025",
  },
];

const performance = [
  {
    position: "Senior Software Engineer",
    applications: 342,
    shortlisted: 78,
    score: 82,
    status: "Open",
  },
  {
    position: "Product Manager",
    applications: 198,
    shortlisted: 45,
    score: 76,
    status: "Open",
  },
  {
    position: "Senior DevOps Architect",
    applications: 120,
    shortlisted: 22,
    score: 68,
    status: "Closed",
  },
  {
    position: "UX/UI Designer",
    applications: 280,
    shortlisted: 55,
    score: 85,
    status: "Open",
  },
];

const statusClass = {
  "Highly Recommended": "bg-[#e9f7ea] text-[#328540]",
  Recommended: "bg-[#eaf2ff] text-[#2270cb]",
  "Not Recommended": "bg-[#ffe9ec] text-[#df3038]",
};

export default function ReportsPage() {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");

  const [position, setPosition] = useState("All");

  const positions = [
    "All",
    ...new Set(screeningResults.map((item) => item.position)),
  ];

  const filteredResults = useMemo(() => {
    const searchValue = search.toLowerCase();

    return screeningResults.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchValue) ||
        item.email.toLowerCase().includes(searchValue) ||
        item.position.toLowerCase().includes(searchValue);

      const matchesStatus = status === "All" || item.status === status;

      const matchesPosition = position === "All" || item.position === position;

      return matchesSearch && matchesStatus && matchesPosition;
    });
  }, [search, status, position]);

  const exportCSV = () => {
    const headers = [
      "Candidate Name",
      "Email",
      "Position",
      "Match Score",
      "Status",
      "Date",
    ];

    const rows = filteredResults.map((item) => [
      item.name,
      item.email,
      item.position,
      `${item.score}%`,
      item.status,
      item.date,
    ]);

    const escapeCSV = (value) => `"${String(value).replace(/"/g, '""')}"`;

    const csvContent = [
      headers.map(escapeCSV).join(","),
      ...rows.map((row) => row.map(escapeCSV).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "candidate-screening-report.csv");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#0b315d]">Reports</h2>

          <p className="mt-1 text-xs text-[#526782]">
            Senior Software Engineer (SE-SSE-2024)
          </p>
        </div>

        {/* Search + CSV Export */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#697990]"
            />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search candidates..."
              className="h-10 w-60 rounded-lg border border-[#d7e0eb] bg-white pl-9 pr-3 text-xs outline-none"
            />
          </div>

          <button
            type="button"
            onClick={exportCSV}
            className="flex h-10 items-center gap-2 rounded-lg border-2 border-[#063765] bg-white px-5 text-xs font-semibold text-[#063765]"
          >
            <Download size={15} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Report Filtering */}
      <div className="flex flex-wrap items-center gap-4 rounded-xl border border-[#d8e1ec] bg-white p-4">
        <span className="text-xs font-semibold text-[#53627a]">
          Filter Reports:
        </span>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="h-9 rounded-lg border border-[#d5deea] bg-white px-4 text-xs text-[#53627a] outline-none"
        >
          <option value="All">All Status</option>

          <option>Highly Recommended</option>

          <option>Recommended</option>

          <option>Not Recommended</option>
        </select>

        <select
          value={position}
          onChange={(event) => setPosition(event.target.value)}
          className="h-9 rounded-lg border border-[#d5deea] bg-white px-4 text-xs text-[#53627a] outline-none"
        >
          {positions.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All Positions" : item}
            </option>
          ))}
        </select>

        {(status !== "All" || position !== "All" || search) && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setStatus("All");
              setPosition("All");
            }}
            className="text-xs font-semibold text-[#2c67ac]"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <ReportCard
          value="1,243"
          title="TOTAL CANDIDATES"
          text="Active applications database"
          color="blue"
        />

        <ReportCard
          value="1,188"
          title="TOTAL INTERVIEWS"
          text="95.5% completed screening"
          color="green"
        />

        <ReportCard
          value="200"
          title="SHORTLISTED"
          text="Highly rated profiles"
          color="orange"
        />

        <ReportCard
          value="79.4%"
          title="SUCCESS RATE"
          text="Average pass threshold"
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
        {/* LEFT */}
        <div className="space-y-6">
          {/* Recent Results */}
          <section className="rounded-xl border border-[#d8e1eb] bg-white p-5">
            <div className="flex justify-between">
              <h3 className="font-bold text-[#0b315d]">
                Recent Screening Results
              </h3>

              <button className="text-xs font-semibold text-[#2577ff]">
                View All
              </button>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[650px] text-left">
                <thead className="bg-[#f1f4f9] text-[10px] font-semibold text-[#586982]">
                  <tr>
                    <th className="px-4 py-3">CANDIDATE NAME</th>

                    <th className="px-4 py-3">POSITION</th>

                    <th className="px-4 py-3">MATCH SCORE</th>

                    <th className="px-4 py-3">STATUS</th>

                    <th className="px-4 py-3">DATE</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredResults.map((item) => (
                    <tr key={item.email} className="border-b border-[#dde4ec]">
                      <td className="px-4 py-4">
                        <p className="text-xs font-bold text-[#123b67]">
                          {item.name}
                        </p>

                        <p className="text-[9px] text-[#64748b]">
                          {item.email}
                        </p>
                      </td>

                      <td className="max-w-[130px] truncate px-4 py-4 text-xs text-[#536884]">
                        {item.position}
                      </td>

                      <td className="px-4 py-4">
                        <SmallScoreCircle score={item.score} />
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`rounded-md px-3 py-1.5 text-[9px] font-semibold ${
                            statusClass[item.status]
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-xs text-[#536884]">
                        {item.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredResults.length === 0 && (
              <p className="py-8 text-center text-sm text-[#7b899d]">
                No report results found.
              </p>
            )}

            <div className="mt-4 flex justify-between text-[10px] text-[#64748b]">
              <span>Average: 8.5 of 10 results</span>

              <span>
                Showing {filteredResults.length} of {screeningResults.length}{" "}
                results
              </span>
            </div>
          </section>

          {/* Screening Performance */}
          <section className="rounded-xl border border-[#d8e1eb] bg-white p-5">
            <div className="flex justify-between">
              <h3 className="font-bold text-[#0b315d]">
                Screening Performance by Position
              </h3>

              <button className="text-xs font-semibold text-[#2577ff]">
                View Report
              </button>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[650px] text-left">
                <thead className="bg-[#f1f4f9] text-[10px] text-[#586982]">
                  <tr>
                    <th className="px-4 py-3">POSITION</th>

                    <th className="px-4 py-3">APPLICATIONS</th>

                    <th className="px-4 py-3">SHORTLISTED</th>

                    <th className="px-4 py-3">AVG SCORE</th>

                    <th className="px-4 py-3">STATUS</th>
                  </tr>
                </thead>

                <tbody>
                  {performance.map((item) => (
                    <tr
                      key={item.position}
                      className="border-b border-[#dde4ec]"
                    >
                      <td className="px-4 py-4 text-xs font-semibold text-[#123b67]">
                        {item.position}
                      </td>

                      <td className="px-4 py-4 text-xs text-[#536884]">
                        {item.applications}
                      </td>

                      <td className="px-4 py-4 text-xs text-[#536884]">
                        {item.shortlisted}
                      </td>

                      <td className="px-4 py-4">
                        <div className="w-32">
                          <div className="h-2 rounded-full bg-[#edf0f4]">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${item.score}%`,
                                backgroundColor:
                                  item.score >= 80 ? "#318a3b" : "#ed6d00",
                              }}
                            />
                          </div>

                          <p className="mt-1 text-xs font-bold text-[#123b67]">
                            {item.score}%
                          </p>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`rounded-md px-3 py-1 text-[9px] font-semibold ${
                            item.status === "Open"
                              ? "bg-[#e9f7ea] text-[#328540]"
                              : "bg-[#ffe9ec] text-[#df3038]"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* Score Breakdown */}
          <section className="rounded-xl border border-[#d8e1eb] bg-white p-6">
            <h3 className="font-bold text-[#0b315d]">
              Overall Score Breakdown
            </h3>

            <div className="my-8 flex justify-center">
              <div className="flex h-44 w-44 items-center justify-center rounded-full bg-[conic-gradient(#7c3aed_0_30%,transparent_30%_35%,#318a3b_35%_68%,transparent_68%_73%,#ed6d00_73%_93%,transparent_93%)]">
                <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white">
                  <span className="text-3xl font-bold text-[#123b67]">76%</span>

                  <span className="text-[9px] font-semibold text-[#65758c]">
                    AVG MATCH
                  </span>
                </div>
              </div>
            </div>

            <ScoreLegend color="#7c3aed" label="Technical Fit" value="84%" />

            <ScoreLegend color="#318a3b" label="Experience Match" value="75%" />

            <ScoreLegend
              color="#ed6d00"
              label="Communication Fit"
              value="61%"
            />
          </section>

          {/* AI Insight */}
          <section className="rounded-xl bg-[#063765] p-6 text-white">
            <h3 className="font-bold">AI Screening Insight</h3>

            <p className="mt-5 text-xs leading-6 text-[#c3d5e8]">
              The current pool displays outstanding TypeScript backend
              capabilities. However, Containerization and orchestration skills
              (Docker/Kubernetes) remain the most frequent missing components
              under recommended guidelines.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

function ReportCard({ value, title, text, color }) {
  const colors = {
    blue: "bg-[#edf4ff] text-[#2676fa]",
    green: "bg-[#eaf7eb] text-[#2b8b3a]",
    orange: "bg-[#fff3df] text-[#ed7100]",
    purple: "bg-[#f2eeff] text-[#7c3aed]",
  };

  return (
    <div className="flex items-center gap-4 rounded-xl border border-[#d8e1eb] bg-white p-5">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${colors[color]}`}
      >
        {color === "orange" ? (
          <Star size={20} fill="currentColor" />
        ) : (
          <Circle size={10} fill="currentColor" />
        )}
      </div>

      <div>
        <p className="text-[9px] font-bold text-[#5d6c82]">{title}</p>

        <p className="text-2xl font-bold text-[#063765]">{value}</p>

        <p className="mt-1 text-[9px] text-[#65758d]">{text}</p>
      </div>
    </div>
  );
}

function SmallScoreCircle({ score }) {
  const color = score >= 80 ? "#318a3b" : score >= 60 ? "#ed7100" : "#df3038";

  return (
    <div
      className="flex h-10 w-10 items-center justify-center rounded-full p-[4px]"
      style={{
        background: `conic-gradient(${color} ${score}%, #edf0f4 ${score}% 100%)`,
      }}
    >
      <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-[10px] font-bold">
        {score}%
      </div>
    </div>
  );
}

function ScoreLegend({ color, label, value }) {
  return (
    <div className="mt-4 flex items-center justify-between text-xs">
      <div className="flex items-center gap-3">
        <span
          className="h-3 w-3 rounded-sm"
          style={{
            backgroundColor: color,
          }}
        />

        <span className="font-semibold text-[#123b67]">{label}</span>
      </div>

      <span className="font-bold text-[#123b67]">{value}</span>
    </div>
  );
}
