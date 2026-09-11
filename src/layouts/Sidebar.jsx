import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Upload,
  Users,
  BarChart3,
  FileText,
  Download,
  ShieldCheck,
  UserCog,
  Settings,
} from "lucide-react";

const mainLinks = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Job Postings", path: "/jobs", icon: BriefcaseBusiness },
  { label: "CV Upload", path: "/cv-upload", icon: Upload },
  { label: "Candidates", path: "/candidates", icon: Users },
  { label: "Candidate Ranking", path: "/candidate-ranking", icon: BarChart3 },
  { label: "Reports", path: "/reports", icon: FileText },
  { label: "Export Reports", path: "/reports/export", icon: Download },
  { label: "Profile / Settings", path: "/profile-settings", icon: Settings },
];

const adminLinks = [
  { label: "Admin Dashboard", path: "/admin", icon: ShieldCheck },
  { label: "User Management", path: "/admin/users", icon: UserCog },
];

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
    isActive
      ? "bg-blue-600 text-white"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  }`;

export default function Sidebar() {
  return (
    <aside className="min-h-screen w-64 shrink-0 border-r border-slate-200 bg-white p-4">
      <div className="mb-8 px-2">
        <h1 className="text-xl font-bold text-slate-900">TalentScreen AI</h1>
        <p className="mt-1 text-xs text-slate-500">CV Screening System</p>
      </div>

      <nav className="space-y-1">
        {mainLinks.map(({ label, path, icon: Icon }) => (
          <NavLink key={path} to={path} className={linkClass}>
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="my-5 border-t border-slate-200" />

      <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Admin
      </p>

      <nav className="space-y-1">
        {adminLinks.map(({ label, path, icon: Icon }) => (
          <NavLink key={path} to={path} className={linkClass}>
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
