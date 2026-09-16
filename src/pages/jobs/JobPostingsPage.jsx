import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Eye, MapPin, Search, UsersRound } from "lucide-react";

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Colombo 03",
    posted: "Aug 28, 2026",
    applicants: 142,
    status: "Active",
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    location: "Remote",
    posted: "Aug 25, 2026",
    applicants: 89,
    status: "Active",
  },
  {
    id: 3,
    title: "Data Scientist",
    department: "Analytics",
    location: "Colombo 07",
    posted: "Aug 22, 2026",
    applicants: 203,
    status: "Active",
  },
  {
    id: 4,
    title: "UX Designer",
    department: "Design",
    location: "Kandy",
    posted: "Aug 19, 2026",
    applicants: 76,
    status: "Active",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Remote",
    posted: "Aug 18, 2026",
    applicants: 58,
    status: "Active",
  },
  {
    id: 6,
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Malabe",
    posted: "Aug 10, 2026",
    applicants: 121,
    status: "Active",
  },
];

export default function JobPostingsPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Department");
  const [status, setStatus] = useState("All Status");

  const departments = [
    "All Department",
    ...new Set(jobs.map((job) => job.department)),
  ];

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        job.title.toLowerCase().includes(searchValue) ||
        job.location.toLowerCase().includes(searchValue);

      const matchesDepartment =
        department === "All Department" || job.department === department;

      const matchesStatus = status === "All Status" || job.status === status;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [search, department, status]);

  return (
    <div className="space-y-8">
      {/* Top Area */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold text-[#12395f]">Job Postings</h2>

        <button
          type="button"
          onClick={() => navigate("/jobs/create")}
          className="rounded-lg bg-[#405b91] px-6 py-3 text-sm font-semibold text-white hover:bg-[#354f81]"
        >
          + Create New Job
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-6">
        <div className="relative w-full sm:w-60">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#111827]"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search Jobs..."
            className="h-11 w-full rounded-lg border border-[#8ca0c2] bg-white pl-10 pr-4 text-sm outline-none placeholder:text-[#8da0c1] focus:border-[#405b91]"
          />
        </div>

        <select
          value={department}
          onChange={(event) => setDepartment(event.target.value)}
          className="h-11 w-full rounded-lg border border-[#8ca0c2] bg-white px-5 text-sm text-[#8da0c1] outline-none sm:w-56"
        >
          {departments.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="h-11 w-full rounded-lg border border-[#8ca0c2] bg-white px-5 text-sm text-[#8da0c1] outline-none sm:w-48"
        >
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-x-12 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="flex min-h-[250px] flex-col rounded-xl border border-[#9aaed0] bg-white"
          >
            <div className="flex-1 p-4">
              <div className="flex justify-between gap-3">
                <div>
                  <h3 className="text-xs font-semibold text-[#294d83]">
                    {job.title}
                  </h3>

                  <p className="text-[10px] text-[#737373]">{job.department}</p>
                </div>

                <span className="h-fit rounded-full bg-[#dce8ff] px-4 py-1 text-[8px] text-[#405b91]">
                  {job.status}
                </span>
              </div>

              <div className="mt-8 space-y-3 text-[10px] text-[#555]">
                <div className="flex items-center gap-3">
                  <MapPin size={14} />
                  {job.location}
                </div>

                <div className="flex items-center gap-3">
                  <CalendarDays size={14} />
                  Posted {job.posted}
                </div>

                <div className="flex items-center gap-3">
                  <UsersRound size={14} />
                  {job.applicants} applicants
                </div>
              </div>
            </div>

            <div className="mx-4 border-t border-[#dce1e8] py-4">
              <button
                type="button"
                className="flex h-9 w-full items-center justify-center gap-3 rounded-xl bg-[#405b91] text-[10px] text-white hover:bg-[#354f81]"
              >
                <Eye size={14} />
                View Application
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="rounded-xl border border-dashed border-[#b7c3d4] bg-white py-14 text-center text-sm text-[#7a899c]">
          No jobs found.
        </div>
      )}
    </div>
  );
}
