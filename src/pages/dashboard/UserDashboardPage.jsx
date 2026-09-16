import { BriefcaseBusiness, Star, TrendingUp, UsersRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  {
    icon: BriefcaseBusiness,
    value: "48",
    label: "Total Jobs",
    note: "+3 posted this week",
    increase: "+6.3%",
  },
  {
    icon: UsersRound,
    value: "1,284",
    label: "Candidates Processed",
    note: "+127 this month",
    increase: "+10.9%",
  },
  {
    icon: Star,
    value: "78.4%",
    label: "Avg. Match Score",
    note: "Above 75% target",
    increase: "+2.1%",
  },
];

const recentJobs = [
  {
    title: "Senior Frontend Engineer",
    department: "Engineering",
    date: "Aug 28, 2026",
    applicants: 142,
  },
  {
    title: "Product Manager",
    department: "Product",
    date: "Aug 25, 2026",
    applicants: 89,
  },
  {
    title: "Data Scientist",
    department: "Analytics",
    date: "Aug 22, 2026",
    applicants: 203,
  },
  {
    title: "UX Designer",
    department: "Design",
    date: "Aug 19, 2026",
    applicants: 76,
  },
  {
    title: "DevOps Engineer",
    department: "Infrastructure",
    date: "Aug 15, 2026",
    applicants: 58,
  },
  {
    title: "Marketing Specialist",
    department: "Marketing",
    date: "Aug 10, 2026",
    applicants: 121,
  },
];

const topCandidates = [
  {
    initials: "SJ",
    name: "Sarah Jenkins",
    role: "Senior Frontend Eng.",
    score: 96,
  },
  {
    initials: "AR",
    name: "Alex Rodriguez",
    role: "Data Scientist",
    score: 93,
  },
  {
    initials: "MC",
    name: "Michael Chen",
    role: "Product Manager",
    score: 91,
  },
  {
    initials: "ER",
    name: "Elena Rostova",
    role: "DevOps Engineer",
    score: 87,
  },
  {
    initials: "DK",
    name: "David Kim",
    role: "UX Designer",
    score: 85,
  },
];

export default function UserDashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-[#12395f]">Dashboard</h2>

        <p className="mt-1 text-xs text-[#7a899c]">
          Welcome back, Nadun. Here's what's happening today.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-[#8098bb] bg-white p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dce8ff] text-[#405b91]">
                  <Icon size={20} />
                </div>

                <div className="flex items-center gap-1 rounded-full bg-[#f0efff] px-3 py-1 text-xs font-semibold text-[#405b91]">
                  <TrendingUp size={13} />
                  {stat.increase}
                </div>
              </div>

              <p className="mt-7 text-2xl font-semibold text-[#405b91]">
                {stat.value}
              </p>

              <p className="mt-4 text-sm font-medium text-[#111827]">
                {stat.label}
              </p>

              <p className="text-[11px] text-[#808080]">{stat.note}</p>
            </div>
          );
        })}
      </div>

      {/* Bottom Area */}
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.4fr_1fr]">
        {/* Recent Job Postings */}
        <div className="overflow-hidden rounded-xl border border-[#8098bb] bg-white">
          <div className="flex items-center justify-between px-5 py-5">
            <h3 className="text-sm font-semibold text-[#405b91]">
              Recent Job Postings
            </h3>

            <button
              type="button"
              onClick={() => navigate("/jobs")}
              className="text-[11px] font-medium text-[#405b91] hover:underline"
            >
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead className="bg-[#edf2fc] text-[11px] text-[#111827]">
                <tr>
                  <th className="px-4 py-4 font-medium">Job Title</th>
                  <th className="px-4 py-4 font-medium">Department</th>
                  <th className="px-4 py-4 font-medium">Date Posted</th>
                  <th className="px-4 py-4 font-medium">Applicants</th>
                </tr>
              </thead>

              <tbody>
                {recentJobs.map((job) => (
                  <tr key={job.title} className="border-t border-[#d5dce7]">
                    <td className="px-4 py-4 text-[10px] text-[#294d83]">
                      {job.title}
                    </td>

                    <td className="px-4 py-4">
                      <span className="rounded-full bg-[#dae6ff] px-3 py-1 text-[10px] text-[#405b91]">
                        {job.department}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-[10px] text-[#405b91]">
                      {job.date}
                    </td>

                    <td className="px-4 py-4 text-[10px] text-[#405b91]">
                      {job.applicants}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Candidates */}
        <div className="rounded-xl border border-[#8098bb] bg-white p-5">
          <div className="flex items-center justify-between pb-4">
            <h3 className="text-sm font-medium text-[#405b91]">
              Top Candidates
            </h3>

            <span className="rounded-lg bg-[#dae6ff] px-4 py-1.5 text-[10px] text-[#405b91]">
              AI Ranked
            </span>
          </div>

          <div>
            {topCandidates.map((candidate) => (
              <div
                key={candidate.name}
                className="grid grid-cols-[42px_1fr_80px] items-center border-t border-[#d9dee7] py-3"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#173c69] text-xs font-semibold text-white">
                  {candidate.initials}
                </div>

                <div>
                  <p className="text-sm font-medium text-[#111827]">
                    {candidate.name}
                  </p>

                  <p className="text-[11px] text-[#777]">{candidate.role}</p>
                </div>

                <div>
                  <p className="mb-1 text-right text-xs font-semibold text-[#17395f]">
                    {candidate.score}%
                  </p>

                  <div className="h-1.5 rounded-full bg-[#e2e6ed]">
                    <div
                      className="h-full rounded-full bg-[#173c69]"
                      style={{
                        width: `${candidate.score}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
