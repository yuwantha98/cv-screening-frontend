import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

export default function ProtectedRoute({ allowedRoles = [] }) {
  const [status, setStatus] = useState("loading");
  const [user, setUser] = useState(null);

  useEffect(() => {
    let active = true;

    const checkSession = async () => {
      try {
        const response = await getCurrentUser();

        if (!active) return;

        const currentUser = response.data?.user ?? response.data;

        setUser(currentUser);
        setStatus("authenticated");
      } catch {
        if (!active) return;

        setStatus("unauthenticated");
      }
    };

    checkSession();

    return () => {
      active = false;
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-600">Checking session...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user?.role)
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
