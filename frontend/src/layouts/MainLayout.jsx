import { useState } from "react";
import { Bell, Download, Menu, Search, X } from "lucide-react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const pageTitle = location.pathname === "/sidebar-preview" ? "Candidate Results" : location.pathname.includes("profile") ? "Profile & Settings" : "TalentScreen AI";

  return (
    <div className="min-h-screen bg-[#f3f6fb]">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#dfe6ef] bg-white px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button type="button" aria-label="Open navigation" onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"><Menu size={21} /></button>
          <div className="flex items-center gap-2 lg:hidden"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#062f5e] text-sm font-bold text-white">T</span><span className="font-semibold text-[#17395f]">TalentScreen</span></div>
          <div className="hidden sm:block"><h1 className="text-sm font-bold text-[#17395f]">{pageTitle}</h1><p className="text-[10px] text-[#74859c]">HR intelligence workspace</p></div>
          <div className="relative hidden w-56 md:block"><Search className="absolute left-3 top-2.5 text-[#7c8da5]" size={15} /><input className="h-9 w-full rounded-md border border-[#e0e7f0] bg-[#f5f7fb] pl-9 pr-3 text-xs outline-none focus:border-[#315b91] focus:ring-2 focus:ring-[#d9e5f5]" placeholder="Search candidates..." /></div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3"><button type="button" className="hidden items-center gap-2 rounded-md border border-[#0b3767] px-3 py-2 text-[10px] font-semibold text-[#0b3767] hover:bg-[#edf3fa] sm:flex"><Download size={14} /> Export CSV/PDF</button><button type="button" aria-label="Notifications" className="relative rounded-lg p-2 text-[#24466d] hover:bg-[#edf2f8]"><Bell size={19} /><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#ef7b18] ring-2 ring-white" /></button><div className="hidden h-7 w-px bg-[#dfe6ef] sm:block" /><div className="flex items-center gap-2"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dce8f5] text-xs font-semibold text-[#123d6c]">JD</div><div className="hidden text-left sm:block"><p className="text-xs font-semibold text-[#17395f]">Jordan Davis</p><p className="text-[10px] text-[#71829a]">HR Manager</p></div></div></div>
      </header>

      <div className="flex min-h-[calc(100vh-4rem)]">
        {sidebarOpen && <button aria-label="Close navigation overlay" onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-30 bg-slate-900/30 lg:hidden" />}
        <div className={`fixed inset-y-0 left-0 z-40 transform lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-200`}><div className="relative flex h-full"><Sidebar onNavigate={() => setSidebarOpen(false)} /><button type="button" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} className="absolute right-3 top-3 rounded-lg p-2 text-slate-400 hover:bg-slate-100 lg:hidden"><X size={18} /></button></div></div>

      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
      </div>
    </div>
  );
}
