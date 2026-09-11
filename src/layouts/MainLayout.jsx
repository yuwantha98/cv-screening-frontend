import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-h-screen flex-1 p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
