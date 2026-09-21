import { createBrowserRouter, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";

import UserDashboardPage from "../pages/dashboard/UserDashboardPage";

import JobPostingsPage from "../pages/jobs/JobPostingsPage";
import CreateJobPage from "../pages/jobs/CreateJobPage";

import CVUploadPage from "../pages/cv/CVUploadPage";
import ProcessingStatusPage from "../pages/cv/ProcessingStatusPage";

import CandidateResultsPage from "../pages/candidates/CandidateResultsPage";
import CandidateDetailsPage from "../pages/candidates/CandidateDetailsPage";
import CandidateRankingPage from "../pages/candidates/CandidateRankingPage";
import CandidateEvaluationPage from "../pages/candidates/CandidateEvaluationPage";
import CandidateComparisonPage from "../pages/candidates/CandidateComparisonPage";
import MatchAnalysisPage from "../pages/candidates/MatchAnalysisPage";

import ReportsPage from "../pages/reports/ReportsPage";
import ExportReportPage from "../pages/reports/ExportReportPage";

import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import UserManagementPage from "../pages/admin/UserManagementPage";

import ProfileSettingsPage from "../pages/profile/ProfileSettingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  // Public authentication pages
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },

  // Public UI preview while the authentication backend is unavailable.
  {
    element: <MainLayout />,
    children: [
      {
        path: "/sidebar-preview",
        element: <UserDashboardPage />,
      },
    ],
  },

  // Logged-in HR / Admin pages
  {
    element: <ProtectedRoute allowedRoles={["HR", "ADMIN"]} />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/dashboard",
            element: <UserDashboardPage />,
          },
          {
            path: "/jobs",
            element: <JobPostingsPage />,
          },
          {
            path: "/jobs/create",
            element: <CreateJobPage />,
          },
          {
            path: "/cv-upload",
            element: <CVUploadPage />,
          },
          {
            path: "/processing",
            element: <ProcessingStatusPage />,
          },
          {
            path: "/candidates",
            element: <CandidateResultsPage />,
          },
          {
            path: "/candidates/:candidateId",
            element: <CandidateDetailsPage />,
          },
          {
            path: "/candidate-ranking",
            element: <CandidateRankingPage />,
          },
          {
            path: "/candidate-evaluation/:candidateId",
            element: <CandidateEvaluationPage />,
          },
          {
            path: "/candidate-comparison",
            element: <CandidateComparisonPage />,
          },
          {
            path: "/match-analysis/:candidateId",
            element: <MatchAnalysisPage />,
          },
          {
            path: "/reports",
            element: <ReportsPage />,
          },
          {
            path: "/reports/export",
            element: <ExportReportPage />,
          },
          {
            path: "/profile-settings",
            element: <ProfileSettingsPage />,
          },
        ],
      },
    ],
  },

  // Admin-only pages
  {
    element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/admin",
            element: <AdminDashboardPage />,
          },
          {
            path: "/admin/users",
            element: <UserManagementPage />,
          },
        ],
      },
    ],
  },

  // No extra NotFound page is created.
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
