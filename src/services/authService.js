import api from "./api";

// Endpoint names are starter assumptions.
// Change them to match the backend team's final API routes.

export const login = (data) => api.post("/auth/login", data);

export const register = (data) => api.post("/auth/register", data);

export const forgotPassword = (data) =>
  api.post("/auth/forgot-password", data);

export const getCurrentUser = () => api.get("/auth/me");

export const logout = () => api.post("/auth/logout");
