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
  `flex items-center gap-3 rounded-md px-3 py-2.5 text-xs font-medium transition ${
    isActive
      ? "bg-[#405b91] text-white"
      : "text-[#b9cbe0] hover:bg-[#173f6d] hover:text-white"
  }`;

export default function Sidebar({ onNavigate }) {
  return (
    <aside className="min-h-screen w-64 shrink-0 bg-[#062f5e] p-4">
      <div className="mb-8 flex items-center gap-2 px-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-xs font-bold text-[#062f5e]">TS</span>
        <div><h1 className="text-sm font-bold text-white">TalentScreen AI</h1><p className="mt-0.5 text-[9px] uppercase tracking-wide text-[#a9bfd8]">HR intelligence</p></div>
      </div>

      <nav className="space-y-1">
        {mainLinks.map(({ label, path, icon: Icon }) => (
          <NavLink key={path} to={path} className={linkClass} onClick={onNavigate}>
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="my-5 border-t border-[#174578]" />

      <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-[#7898bd]">
        Admin
      </p>

      <nav className="space-y-1">
        {adminLinks.map(({ label, path, icon: Icon }) => (
          <NavLink key={path} to={path} className={linkClass} onClick={onNavigate}>
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
