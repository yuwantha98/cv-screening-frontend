import { useMemo, useState } from "react";
import { Download, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const candidates = [
  {
    id: 1,
    rank: 1,
    name: "Sarah Jenkins",
    score: 94,
    status: "Highly Recommended",
    description:
      "Outstanding alignment. Strong background architecting microservices on AWS and leading TypeScript backend teams. Demonstrated deep experience with distributed database performance optimization.",
    matchedSkills: ["React", "Node.js", "TypeScript", "AWS", "System Design"],
    missingSkills: ["Docker"],
  },
  {
    id: 2,
    rank: 2,
    name: "Alex Rodriguez",
    score: 88,
    status: "Highly Recommended",
    description:
      "Exceptional engineering expertise with high-scale system design and container orchestration. Extensive experience with developer-focused API tools and modern frontend workflows.",
    matchedSkills: [
      "React",
      "Node.js",
      "System Design",
      "Docker",
      "Kubernetes",
    ],
    missingSkills: ["TypeScript"],
  },
  {
    id: 3,
    rank: 3,
    name: "Michael Chen",
    score: 76,
    status: "Recommended",
    description:
      "Capable full-stack developer with sound core engineering principles. Highly proficient in TypeScript/Node and serverless architectures. Lacks explicit complex infrastructure leadership.",
    matchedSkills: ["TypeScript", "AWS", "Docker"],
    missingSkills: ["System Design", "Kubernetes"],
  },
  {
    id: 4,
    rank: 4,
    name: "Elena Rostova",
    score: 52,
    status: "Not Recommended",
    description:
      "Primarily a frontend specialist. Lacks backend experience and the distributed system capabilities required for this senior software engineering scope.",
    matchedSkills: ["React", "TypeScript"],
    missingSkills: ["Node.js", "System Design", "AWS", "Docker"],
  },
];

const statusStyle = {
  "Highly Recommended": "bg-[#e8f7ea] text-[#258338]",
  Recommended: "bg-[#fff4df] text-[#ef7200]",
  "Not Recommended": "bg-[#ffe8eb] text-[#df2f37]",
};

const scoreColor = (score) => {
  if (score >= 80) {
    return "#2e8b3c";
  }

  if (score >= 60) {
    return "#f27600";
  }

  return "#df3038";
};

export default function CandidateResultsPage() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("All");

  const [sort, setSort] = useState("Match Score");

  const filteredCandidates = useMemo(() => {
    let result =
      filter === "All"
        ? [...candidates]
        : candidates.filter((candidate) => candidate.status === filter);

    if (sort === "Match Score") {
      result.sort((a, b) => b.score - a.score);
    }

    if (sort === "Name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [filter, sort]);

  const filterButtons = [
    {
      label: "All",
      count: 8,
    },
    {
      label: "Highly Recommended",
      count: 3,
    },
    {
      label: "Recommended",
      count: 3,
    },
    {
      label: "Not Recommended",
      count: 2,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h2 className="text-xl font-bold text-[#0b315d]">Candidate Results</h2>

        <p className="mt-1 text-xs text-[#526782]">
          Senior Software Engineer (ID: SSE-2024)
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="TOTAL CANDIDATES"
          value="8"
          text="Evaluated by AI engine"
        />

        <SummaryCard
          title="AVERAGE MATCH"
          value="72%"
          text="Consistent with job profile"
        />

        <SummaryCard
          title="HIGHLY RECOMMENDED"
          value="3"
          text="Scores above 80%"
        />

        <SummaryCard
          title="SHORTLISTED"
          value="0"
          text="No candidates marked"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col justify-between gap-4 rounded-xl border border-[#d7e0ec] bg-white p-4 lg:flex-row lg:items-center">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-semibold text-[#52627a]">
            Filters:
          </span>

          {filterButtons.map((item) => {
            const active = filter === item.label;

            let classes = "border-[#123b67] text-[#123b67]";

            if (item.label === "Highly Recommended") {
              classes = "border-[#2f9446] text-[#2f8440]";
            }

            if (item.label === "Recommended") {
              classes = "border-[#f27a00] text-[#ef7200]";
            }

            if (item.label === "Not Recommended") {
              classes = "border-[#e63b45] text-[#dc3039]";
            }

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setFilter(item.label)}
                className={`rounded-full border px-4 py-1.5 text-[11px] font-semibold ${
                  active
                    ? item.label === "All"
                      ? "bg-[#073865] text-white"
                      : "bg-slate-50"
                    : classes
                }`}
              >
                {item.label} ({item.count})
              </button>
            );
          })}
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          className="h-9 rounded-lg border border-[#d7e0ec] bg-white px-4 text-xs text-[#425673] outline-none"
        >
          <option value="Match Score">Sort by: Match Score</option>

          <option value="Name">Sort by: Name</option>
        </select>
      </div>

      {/* Candidate Cards */}
      <div className="space-y-4">
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            onClick={() => navigate(`/candidates/${candidate.id}`)}
            className="grid cursor-pointer grid-cols-1 items-center gap-6 rounded-xl border border-[#d8e0eb] bg-white p-6 transition duration-200 hover:border-[#9cb0cc] hover:shadow-md lg:grid-cols-[55px_80px_1.15fr_1.5fr_auto]"
          >
            {/* Rank */}
            <div className="text-xl font-bold text-[#59677e]">
              #{candidate.rank}
            </div>

            {/* Match Percentage */}
            <MatchCircle score={candidate.score} />

            {/* Candidate Details */}
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-base font-bold text-[#073865]">
                  {candidate.name}
                </h3>

                <span
                  className={`rounded-md px-3 py-1 text-[10px] font-semibold ${
                    statusStyle[candidate.status]
                  }`}
                >
                  {candidate.status}
                </span>
              </div>

              <p className="mt-3 max-w-md text-xs leading-5 text-[#536884]">
                {candidate.description}
              </p>
            </div>

            {/* Skills */}
            <div className="space-y-4">
              {/* Matched Skills */}
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase text-[#2d883e]">
                  Matched Skills
                </p>

                <div className="flex flex-wrap gap-2">
                  {candidate.matchedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-[#eef0ff] px-3 py-1 text-[10px] text-[#39558b]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase text-[#e1373d]">
                  Missing Skills
                </p>

                <div className="flex flex-wrap gap-2">
                  {candidate.missingSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-[#ffe8eb] px-3 py-1 text-[10px] text-[#df3038]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-end gap-3">
              {/* Favourite Button */}
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();

                  console.log("Shortlist candidate:", candidate.id);
                }}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#d9e1ec] text-[#526783] transition hover:bg-[#f3f6fa]"
              >
                <Star size={17} />
              </button>

              {/* Download CV */}
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();

                  console.log("Download CV:", candidate.id);
                }}
                className="flex items-center gap-2 rounded-lg border border-[#d5deea] px-4 py-2 text-xs font-semibold text-[#52627a] transition hover:bg-[#f3f6fa]"
              >
                <Download size={14} />
                Download CV
              </button>

              {/* View Full Report */}
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();

                  navigate(`/candidates/${candidate.id}`);
                }}
                className="rounded-lg bg-[#063765] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#0a477f]"
              >
                View Full Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------
   Summary Card
---------------------------------- */

function SummaryCard({ title, value, text }) {
  return (
    <div className="rounded-xl border border-[#d8e0eb] bg-white p-5">
      <p className="text-[10px] font-bold text-[#5b6981]">{title}</p>

      <p className="mt-2 text-2xl font-bold text-[#063765]">{value}</p>

      <p className="mt-2 text-[10px] text-[#64738b]">{text}</p>
    </div>
  );
}

/* ---------------------------------
   Match Percentage Circle
---------------------------------- */

function MatchCircle({ score }) {
  const color = scoreColor(score);

  return (
    <div
      className="flex h-16 w-16 items-center justify-center rounded-full p-[5px]"
      style={{
        background: `conic-gradient(
          ${color} ${score}%,
          #edf0f4 ${score}% 100%
        )`,
      }}
    >
      <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-white">
        <span
          className="text-base font-bold"
          style={{
            color,
          }}
        >
          {score}%
        </span>

        <span className="text-[7px] font-semibold text-[#67778f]">MATCH</span>
      </div>
    </div>
  );
}
