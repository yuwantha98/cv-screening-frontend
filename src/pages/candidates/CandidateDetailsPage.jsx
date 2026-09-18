import {
  ArrowLeft,
  Award,
  BookOpen,
  BriefcaseBusiness,
  Check,
  Download,
  FileText,
  Info,
  Mail,
  MapPin,
  Star,
  Zap,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

/* =========================================================
   TEMPORARY FRONTEND DATA

   Later, when backend is ready, remove this mock data and use:
   GET /api/candidates/:candidateId
========================================================= */

const candidateData = {
  1: {
    id: 1,
    initials: "SJ",
    name: "Sarah Jenkins",
    email: "sarah.j@techcorp.com",
    location: "San Francisco, CA",

    position: "Senior Software Engineer",
    positionCode: "SE-506-2026",

    experience: "6+ Years",
    experienceType: "Software Development",

    matchScore: 94,
    recommendation: "Highly Recommended",

    recommendationText:
      "Sarah Jenkins is an excellent match for the Senior Software Engineer position based on her strong background in core frameworks, proven experience scaling products, and communication alignment.",

    justification:
      "Sarah Jenkins is highly recommended for this position due to her robust technical foundations, relevant enterprise experience, and excellent leadership indicators. Her profile matches all high-priority technical needs for the team.",

    reasons: [
      "Strong technical fit with core skills in TypeScript, React, Node.js, and cloud technologies.",
      "6+ years of relevant experience in building and scaling complex web applications.",
      "Clear and effective communication skills in both written and verbal formats.",
      "Demonstrated strong cultural alignment through collaborative team lead history.",
    ],

    warning:
      "Minor gap in Kubernetes infrastructure orchestration, but carries solid Docker foundation.",

    matchedSkills: [
      "TypeScript",
      "React",
      "Node.js",
      "JavaScript",
      "Docker",
      "AWS",
      "REST APIs",
      "Git",
    ],

    missingSkills: ["Kubernetes", "GraphQL"],

    scores: [
      {
        label: "Technical Fit",
        score: 96,
        color: "#10b981",
      },
      {
        label: "Experience Match",
        score: 92,
        color: "#10b981",
      },
      {
        label: "Communication Fit",
        score: 88,
        color: "#f97316",
      },
      {
        label: "Culture Fit",
        score: 78,
        color: "#3b82f6",
      },
    ],

    totalExperience: "6+ Years",
    similarRole: "3 Years",
    companies: "4 Co.",

    education: "B.Sc. in Computer Science",
    university: "Stanford University",
    educationYear: "Class of 2018",

    strengths: [
      "Problem Solving",
      "Clean Code",
      "Team Collaboration",
      "Quick Learner",
      "Product Mindset",
      "Leadership Potential",
    ],

    availability: "2 Weeks (Immediate)",
    salary: "$140,000 - $160,000",
    jobType: "Full-time (Hybrid)",
  },

  2: {
    id: 2,
    initials: "AR",
    name: "Alex Rodriguez",
    email: "alex.r@devmail.org",
    location: "Remote",

    position: "Senior Software Engineer",
    positionCode: "SE-506-2026",

    experience: "7+ Years",
    experienceType: "Software Engineering",

    matchScore: 88,
    recommendation: "Highly Recommended",

    recommendationText:
      "Alex Rodriguez is a strong match for the Senior Software Engineer position with extensive experience in scalable system design, container orchestration, backend APIs, and modern development workflows.",

    justification:
      "Alex Rodriguez demonstrates strong engineering experience across scalable backend systems, APIs, Docker, Kubernetes, and system architecture. His technical background closely matches the position requirements.",

    reasons: [
      "Strong knowledge of React, Node.js and modern API development.",
      "Advanced experience with Docker and Kubernetes environments.",
      "Strong system design and scalable architecture experience.",
      "Good experience working with modern engineering teams.",
    ],

    warning:
      "TypeScript experience is present but not as strong as other core technical areas.",

    matchedSkills: [
      "React",
      "Node.js",
      "System Design",
      "Docker",
      "Kubernetes",
      "REST APIs",
    ],

    missingSkills: ["TypeScript"],

    scores: [
      {
        label: "Technical Fit",
        score: 91,
        color: "#10b981",
      },
      {
        label: "Experience Match",
        score: 94,
        color: "#10b981",
      },
      {
        label: "Communication Fit",
        score: 84,
        color: "#f97316",
      },
      {
        label: "Culture Fit",
        score: 83,
        color: "#3b82f6",
      },
    ],

    totalExperience: "7+ Years",
    similarRole: "4 Years",
    companies: "5 Co.",

    education: "B.Sc. in Software Engineering",
    university: "State University",
    educationYear: "Class of 2017",

    strengths: [
      "System Design",
      "API Development",
      "Docker",
      "Kubernetes",
      "Problem Solving",
      "Team Collaboration",
    ],

    availability: "3 Weeks",
    salary: "$135,000 - $155,000",
    jobType: "Full-time (Remote)",
  },

  3: {
    id: 3,
    initials: "MC",
    name: "Michael Chen",
    email: "m.chen@frontend.io",
    location: "Remote",

    position: "Senior Software Engineer",
    positionCode: "SE-506-2026",

    experience: "5+ Years",
    experienceType: "Full-stack Development",

    matchScore: 76,
    recommendation: "Recommended",

    recommendationText:
      "Michael Chen is a good match for the position with solid full-stack development experience and strong TypeScript, AWS and Docker knowledge. Additional system design experience would strengthen his fit.",

    justification:
      "Michael Chen demonstrates good software development fundamentals and relevant technical experience. His profile satisfies many of the role requirements, although some senior infrastructure and system design capabilities are missing.",

    reasons: [
      "Strong TypeScript development experience.",
      "Good AWS and Docker knowledge.",
      "Relevant full-stack development experience.",
      "Good software engineering fundamentals.",
    ],

    warning:
      "Needs stronger experience in Kubernetes and advanced system design.",

    matchedSkills: ["TypeScript", "AWS", "Docker", "Node.js", "JavaScript"],

    missingSkills: ["System Design", "Kubernetes"],

    scores: [
      {
        label: "Technical Fit",
        score: 80,
        color: "#10b981",
      },
      {
        label: "Experience Match",
        score: 77,
        color: "#10b981",
      },
      {
        label: "Communication Fit",
        score: 76,
        color: "#f97316",
      },
      {
        label: "Culture Fit",
        score: 72,
        color: "#3b82f6",
      },
    ],

    totalExperience: "5+ Years",
    similarRole: "2 Years",
    companies: "3 Co.",

    education: "B.Sc. in Information Technology",
    university: "Technology University",
    educationYear: "Class of 2020",

    strengths: [
      "TypeScript",
      "Cloud Development",
      "Full-stack Development",
      "Docker",
      "Quick Learner",
    ],

    availability: "2 Weeks",
    salary: "$110,000 - $130,000",
    jobType: "Full-time",
  },

  4: {
    id: 4,
    initials: "ER",
    name: "Elena Rostova",
    email: "e.rost@systems.net",
    location: "Remote",

    position: "Senior Software Engineer",
    positionCode: "SE-506-2026",

    experience: "4+ Years",
    experienceType: "Frontend Development",

    matchScore: 52,
    recommendation: "Not Recommended",

    recommendationText:
      "Elena Rostova has strong frontend experience, but the current profile does not sufficiently match the backend, cloud and distributed system requirements of the Senior Software Engineer position.",

    justification:
      "Elena Rostova demonstrates useful frontend capabilities in React and TypeScript. However, important backend, cloud, system design and containerization requirements are missing for this senior engineering role.",

    reasons: [
      "Strong React frontend development experience.",
      "Good TypeScript knowledge.",
      "Relevant user interface development experience.",
    ],

    warning:
      "Significant gaps exist in Node.js, AWS, Docker and distributed system design.",

    matchedSkills: ["React", "TypeScript", "JavaScript"],

    missingSkills: ["Node.js", "System Design", "AWS", "Docker", "Kubernetes"],

    scores: [
      {
        label: "Technical Fit",
        score: 55,
        color: "#ef4444",
      },
      {
        label: "Experience Match",
        score: 61,
        color: "#f97316",
      },
      {
        label: "Communication Fit",
        score: 74,
        color: "#f97316",
      },
      {
        label: "Culture Fit",
        score: 70,
        color: "#3b82f6",
      },
    ],

    totalExperience: "4+ Years",
    similarRole: "1 Year",
    companies: "3 Co.",

    education: "B.Sc. in Computer Science",
    university: "National University",
    educationYear: "Class of 2021",

    strengths: [
      "React",
      "UI Development",
      "TypeScript",
      "Communication",
      "Team Collaboration",
    ],

    availability: "Immediate",
    salary: "$90,000 - $110,000",
    jobType: "Full-time",
  },
};

/* =========================================================
   COMPONENT
========================================================= */

export default function CandidateDetailsPage() {
  const navigate = useNavigate();

  const { candidateId } = useParams();

  const candidate = candidateData[candidateId];

  /* Candidate ID not found */
  if (!candidate) {
    return (
      <div className="rounded-xl border border-[#d8e1eb] bg-white p-10 text-center">
        <h2 className="text-xl font-bold text-[#0b315d]">
          Candidate not found
        </h2>

        <p className="mt-2 text-sm text-[#64748b]">
          No candidate exists for ID: {candidateId}
        </p>

        <button
          type="button"
          onClick={() => navigate("/candidates")}
          className="mt-5 rounded-lg bg-[#063765] px-5 py-2.5 text-sm font-semibold text-white"
        >
          Back to Candidates
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* =====================================
          TOP BREADCRUMB
      ===================================== */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#485d77]">
          <BriefcaseBusiness size={15} />

          <span>
            {candidate.position} ({candidate.positionCode})
          </span>

          <span className="text-[#a1aec0]">/</span>

          <span className="font-normal text-[#91a0b6]">Candidate Details</span>
        </div>

        <button
          type="button"
          onClick={() => navigate("/candidates")}
          className="flex items-center gap-2 rounded-lg border border-[#d7e0eb] bg-white px-4 py-2 text-xs font-semibold text-[#485d77]"
        >
          <ArrowLeft size={15} />
          Back to Candidates
        </button>
      </div>

      {/* =====================================
          CANDIDATE HEADER
      ===================================== */}

      <section className="grid grid-cols-1 gap-6 rounded-xl border border-[#d9e1ec] bg-white p-6 lg:grid-cols-[1.5fr_1fr_1fr_auto] lg:items-center">
        {/* Candidate */}
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#dbe7f5] text-xl font-bold text-[#17426f]">
            {candidate.initials}
          </div>

          <div>
            <h1 className="text-xl font-bold text-[#0b315d]">
              {candidate.name}
            </h1>

            <div className="mt-2 flex flex-wrap gap-4 text-[11px] text-[#536884]">
              <span className="flex items-center gap-1">
                <Mail size={13} />

                {candidate.email}
              </span>

              <span className="flex items-center gap-1">
                <MapPin size={13} />

                {candidate.location}
              </span>
            </div>
          </div>
        </div>

        {/* Position */}
        <InfoBlock
          icon={BriefcaseBusiness}
          label="POSITION APPLIED"
          value={candidate.position}
          sub={`(${candidate.positionCode})`}
        />

        {/* Experience */}
        <InfoBlock
          icon={Award}
          label="EXPERIENCE"
          value={candidate.experience}
          sub={candidate.experienceType}
        />

        {/* Actions */}
        <div className="space-y-2">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#edf4ff] px-5 py-2.5 text-xs font-semibold text-[#377cf6]"
          >
            <FileText size={15} />
            View CV
          </button>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#d7e0eb] px-5 py-2.5 text-xs font-semibold text-[#53627a]"
          >
            <Download size={15} />
            Download Report
          </button>
        </div>
      </section>

      {/* =====================================
          PAGE GRID
      ===================================== */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.65fr_1fr]">
        {/* =====================================
            LEFT SIDE
        ===================================== */}

        <div className="space-y-6">
          {/* =====================================
              AI RECOMMENDATION
          ===================================== */}

          <section className="rounded-xl border border-[#d8e1eb] bg-white p-6">
            <div className="flex items-center gap-2">
              <Zap size={19} className="text-[#3280ff]" />

              <h2 className="font-bold text-[#17263d]">AI Recommendation</h2>
            </div>

            <div className="mt-6 grid grid-cols-1 items-center gap-6 md:grid-cols-[130px_1fr]">
              <MatchCircle score={candidate.matchScore} />

              <div>
                <RecommendationBadge
                  recommendation={candidate.recommendation}
                />

                <p className="mt-4 text-sm leading-6 text-[#536884]">
                  {candidate.recommendationText}
                </p>
              </div>
            </div>

            {/* Recommendation Status */}
            <div className="mt-6 grid grid-cols-1 gap-3 border-t border-[#d9e1eb] pt-4 sm:grid-cols-3">
              <StatusBox text="Highly Recommended" type="green" />

              <StatusBox text="Recommended" type="blue" />

              <StatusBox text="Not Recommended" type="red" />
            </div>
          </section>

          {/* =====================================
              JUSTIFICATION
          ===================================== */}

          <section className="rounded-xl border border-[#d8e1eb] bg-white p-6">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-[#3280ff]" />

              <h2 className="font-bold text-[#17263d]">
                Recommendation Justification
              </h2>
            </div>

            <p className="mt-5 text-sm leading-6 text-[#536884]">
              {candidate.justification}
            </p>

            <div className="mt-5 space-y-4">
              {candidate.reasons.map((reason) => (
                <Reason key={reason}>{reason}</Reason>
              ))}

              <Reason info>{candidate.warning}</Reason>
            </div>
          </section>

          {/* =====================================
              MATCHED + MISSING SKILLS
          ===================================== */}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <SkillCard
              title="Matched Skills"
              skills={candidate.matchedSkills}
              matched
            />

            <SkillCard
              title="Missing Skills"
              skills={candidate.missingSkills}
            />
          </div>
        </div>

        {/* =====================================
            RIGHT SIDE
        ===================================== */}

        <div className="space-y-6">
          {/* Score Breakdown */}

          <section className="rounded-xl border border-[#d8e1eb] bg-white p-5">
            <h2 className="font-bold text-[#17263d]">Score Breakdown</h2>

            <div className="mt-5 space-y-5">
              {candidate.scores.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex justify-between text-xs font-semibold">
                    <span className="text-[#27364e]">{item.label}</span>

                    <span>{item.score}%</span>
                  </div>

                  <div className="h-1.5 rounded-full bg-[#e5eaf0]">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${item.score}%`,

                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experience Summary */}

          <section className="rounded-xl border border-[#d8e1eb] bg-white p-5">
            <h2 className="font-bold text-[#17263d]">Experience Summary</h2>

            <div className="mt-5 grid grid-cols-3 divide-x text-center">
              <Stat value={candidate.totalExperience} label="Total Exp" />

              <Stat value={candidate.similarRole} label="In Similar Role" />

              <Stat value={candidate.companies} label="Work History" />
            </div>
          </section>

          {/* Education */}

          <section className="rounded-xl border border-[#d8e1eb] bg-white p-5">
            <h2 className="flex items-center gap-2 font-bold text-[#17263d]">
              <BookOpen size={17} className="text-[#3280ff]" />
              Education
            </h2>

            <div className="mt-5">
              <p className="text-sm font-bold">{candidate.education}</p>

              <p className="text-xs text-[#536884]">{candidate.university}</p>

              <p className="text-[10px] text-[#91a0b4]">
                {candidate.educationYear}
              </p>
            </div>
          </section>

          {/* Strengths */}

          <section className="rounded-xl border border-[#d8e1eb] bg-white p-5">
            <h2 className="font-bold text-[#17263d]">Key Strengths</h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {candidate.strengths.map((strength) => (
                <span
                  key={strength}
                  className="rounded-md border border-[#d5deea] bg-[#f4f7fa] px-3 py-1.5 text-[10px] text-[#52627a]"
                >
                  {strength}
                </span>
              ))}
            </div>
          </section>

          {/* Additional Information */}

          <section className="rounded-xl border border-[#d8e1eb] bg-white p-5">
            <h2 className="font-bold text-[#17263d]">Additional Information</h2>

            <div className="mt-4 divide-y text-xs">
              <InformationRow
                label="Availability"
                value={candidate.availability}
              />

              <InformationRow
                label="Expected Salary"
                value={candidate.salary}
              />

              <InformationRow label="Job Type" value={candidate.jobType} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function InfoBlock({ icon: Icon, label, value, sub }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eef4ff] text-[#377cf6]">
        <Icon size={18} />
      </div>

      <div>
        <p className="text-[9px] font-semibold text-[#91a0b5]">{label}</p>

        <p className="text-sm font-bold">{value}</p>

        <p className="text-[10px] text-[#536884]">{sub}</p>
      </div>
    </div>
  );
}

/* Match Circle */

function MatchCircle({ score }) {
  const color = score >= 80 ? "#18b77d" : score >= 60 ? "#f97316" : "#ef4444";

  return (
    <div
      className="flex h-28 w-28 items-center justify-center rounded-full p-[9px]"
      style={{
        background: `conic-gradient(
            ${color} ${score}%,
            #e5ecef ${score}% 100%
          )`,
      }}
    >
      <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-white">
        <span className="text-3xl font-bold text-[#27364e]">{score}%</span>

        <span className="text-[9px] font-semibold text-[#8493a9]">
          MATCH SCORE
        </span>
      </div>
    </div>
  );
}

/* Recommendation Badge */

function RecommendationBadge({ recommendation }) {
  let className = "border-[#66d9a5] bg-[#ecfff6] text-[#117d58]";

  if (recommendation === "Recommended") {
    className = "border-[#93c5fd] bg-[#eff6ff] text-[#2563eb]";
  }

  if (recommendation === "Not Recommended") {
    className = "border-[#fda4af] bg-[#fff1f2] text-[#dc2626]";
  }

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold ${className}`}
    >
      <Star size={15} />

      {recommendation}
    </div>
  );
}

/* Status */

function StatusBox({ text, type }) {
  const classes = {
    green: "border-[#7ddcb4] bg-[#effff7] text-[#117d58]",

    blue: "border-[#b5d2ff] bg-[#f0f6ff] text-[#285fae]",

    red: "border-[#ff9da4] bg-[#fff1f2] text-[#bd3037]",
  };

  return (
    <div
      className={`rounded-lg border px-3 py-2 text-center text-[11px] font-semibold ${classes[type]}`}
    >
      {text}
    </div>
  );
}

/* Reason */

function Reason({ children, info }) {
  return (
    <div className="flex gap-3 text-sm text-[#536884]">
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
          info ? "bg-[#edf1f5] text-[#59718d]" : "bg-[#dff9ec] text-[#18b77d]"
        }`}
      >
        {info ? <Info size={12} /> : <Check size={12} />}
      </span>

      <p>{children}</p>
    </div>
  );
}

/* Skills */

function SkillCard({ title, skills, matched }) {
  return (
    <section className="rounded-xl border border-[#d8e1eb] bg-white p-5">
      <h2 className="font-bold text-[#17263d]">{title}</h2>

      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className={`rounded-md border px-3 py-1.5 text-[11px] font-semibold ${
              matched
                ? "border-[#81deb8] bg-[#eafff5] text-[#117d58]"
                : "border-[#ff9ca3] bg-[#fff0f1] text-[#c4353d]"
            }`}
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

/* Statistics */

function Stat({ value, label }) {
  return (
    <div>
      <p className="text-lg font-bold text-[#17263d]">{value}</p>

      <p className="mt-1 text-[9px] text-[#9aa8ba]">{label}</p>
    </div>
  );
}

/* Additional Information */

function InformationRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4 py-3">
      <span className="text-[#536884]">{label}</span>

      <span className="font-semibold text-[#27364e]">{value}</span>
    </div>
  );
}
