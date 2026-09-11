import { useState } from "react";
import { Bell, Menu, Search, X } from "lucide-react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button type="button" aria-label="Open navigation" onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"><Menu size={21} /></button>
          <div className="flex items-center gap-2 lg:hidden"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">T</span><span className="font-semibold text-slate-900">TalentScreen</span></div>
          <div className="relative hidden w-72 md:block"><Search className="absolute left-3 top-2.5 text-slate-400" size={17} /><input className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="Search candidates, jobs..." /></div>
        </div>
        <div className="flex items-center gap-3"><button type="button" aria-label="Notifications" className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100"><Bell size={20} /><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" /></button><div className="hidden h-7 w-px bg-slate-200 sm:block" /><div className="flex items-center gap-2"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">JD</div><div className="hidden text-left sm:block"><p className="text-sm font-semibold text-slate-800">Jordan Davis</p><p className="text-xs text-slate-500">HR Manager</p></div></div></div>
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
