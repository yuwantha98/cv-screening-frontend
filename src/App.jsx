import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

// Dashboard Pages
import UserDashboardPage from "./pages/dashboard/UserDashboardPage";

// Admin Pages
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import UserManagementPage from "./pages/admin/UserManagementPage";

// Candidates Pages
import CandidateComparisonPage from "./pages/candidates/CandidateComparisonPage";
import CandidateDetailsPage from "./pages/candidates/CandidateDetailsPage";
import CandidateEvaluationPage from "./pages/candidates/CandidateEvaluationPage";
import CandidateRankingPage from "./pages/candidates/CandidateRankingPage";
import CandidateResultsPage from "./pages/candidates/CandidateResultsPage";
import MatchAnalysisPage from "./pages/candidates/MatchAnalysisPage";

// CV Pages
import CVUploadPage from "./pages/cv/CVUploadPage";
import ProcessingStatusPage from "./pages/cv/ProcessingStatusPage";

// Jobs Pages
import CreateJobPage from "./pages/jobs/CreateJobPage";
import JobDetailsPage from "./pages/jobs/JobDetailsPage";
import JobPostingsPage from "./pages/jobs/JobPostingsPage";

// Profile Pages
import ProfileSettingsPage from "./pages/profile/ProfileSettingsPage";

// Reports Pages
import ExportReportPage from "./pages/reports/ExportReportPage";
import ReportsPage from "./pages/reports/ReportsPage";

// Route Guards (Protected Route)
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Root Redirect to Dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Protected Routes using MainLayout */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboards */}
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<UserManagementPage />} />

          {/* Candidates */}
          <Route path="/candidates/compare" element={<CandidateComparisonPage />} />
          <Route path="/candidates/:id" element={<CandidateDetailsPage />} />
          <Route path="/candidates/evaluation" element={<CandidateEvaluationPage />} />
          <Route path="/candidates/ranking" element={<CandidateRankingPage />} />
          <Route path="/candidates/results" element={<CandidateResultsPage />} />
          <Route path="/candidates/match-analysis" element={<MatchAnalysisPage />} />

          {/* CV */}
          <Route path="/cv/upload" element={<CVUploadPage />} />
          <Route path="/cv/status" element={<ProcessingStatusPage />} />

          {/* Jobs */}
          <Route path="/jobs" element={<JobPostingsPage />} />
          <Route path="/jobs/create" element={<CreateJobPage />} />
          <Route path="/jobs/:id" element={<JobDetailsPage />} />

          {/* Profile */}
          <Route path="/profile" element={<ProfileSettingsPage />} />

          {/* Reports */}
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/reports/export" element={<ExportReportPage />} />
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;