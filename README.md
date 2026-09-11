# AI-Powered CV Screening and Recommendation System - Frontend

 

1. Project Decision Summary

The frontend will use React with Vite and React Router. The application will use one shared sidebar for authenticated pages. Each team member should build only the main content of the page assigned to them. The sidebar must not be copied into every page.
• Navigation style: Sidebar only. No top navigation bar is required in the agreed frontend structure.
• Page organization: UI screens are kept inside the pages folder. A separate components folder is not required for this project.
• Shared layout: One MainLayout.jsx file wraps all authenticated pages and displays the shared Sidebar plus the current page through React Router's Outlet.
• Authentication storage: The current frontend does not use localStorage. The preferred integration is JWT authentication handled by the backend through an HttpOnly cookie.
• Backend communication: All API calls are kept inside the services folder.
• AI Microservice technologies such as FastAPI, PyPDF2/pdfplumber, CrewAI/LangGraph and OpenAI/Gemini are not frontend dependencies.
• Only pages supported by the SRS, UI testing document and Team A4 scope are included.

2. Final Frontend File Structure

The team should use the following structure as the common frontend structure:

cv-screening-frontend/
|
+-- public/
|
+-- src/
| |
| +-- assets/
| | +-- images/
| | +-- icons/
| | +-- logos/
| |
| +-- layouts/
| | +-- MainLayout.jsx
| | +-- Sidebar.jsx
| |
| +-- pages/
| | |
| | +-- auth/
| | | +-- LoginPage.jsx
| | | +-- RegisterPage.jsx
| | | +-- ForgotPasswordPage.jsx
| | |
| | +-- dashboard/
| | | +-- UserDashboardPage.jsx
| | |
| | +-- jobs/
| | | +-- JobPostingsPage.jsx
| | | +-- CreateJobPage.jsx
| | |
| | +-- cv/
| | | +-- CVUploadPage.jsx
| | | +-- ProcessingStatusPage.jsx
| | |
| | +-- candidates/
| | | +-- CandidateResultsPage.jsx
| | | +-- CandidateDetailsPage.jsx
| | | +-- CandidateRankingPage.jsx
| | | +-- CandidateEvaluationPage.jsx
| | | +-- CandidateComparisonPage.jsx
| | | +-- MatchAnalysisPage.jsx
| | |
| | +-- reports/
| | | +-- ReportsPage.jsx
| | | +-- ExportReportPage.jsx
| | |
| | +-- admin/
| | | +-- AdminDashboardPage.jsx
| | | +-- UserManagementPage.jsx
| | |
| | +-- profile/
| | +-- ProfileSettingsPage.jsx
| |
| +-- routes/
| | +-- router.jsx
| | +-- ProtectedRoute.jsx
| |
| +-- services/
| | +-- api.js
| | +-- authService.js
| | +-- jobService.js
| | +-- cvService.js
| | +-- candidateService.js
| | +-- reportService.js
| |
| +-- App.jsx
| +-- main.jsx
| +-- index.css
|
+-- .env
+-- .env.example
+-- .gitignore
+-- package.json
+-- vite.config.js
+-- tailwind.config.js
+-- postcss.config.js
+-- README.md

3. How the Shared Sidebar and Main Layout Work

The most important rule for the team is that the sidebar is created once and reused. Team members should not place the sidebar inside their individual page files.

3.1 MainLayout.jsx

MainLayout.jsx provides the common screen structure for authenticated pages:
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function MainLayout() {
return (
<div className="flex min-h-screen">
<Sidebar />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>

);
}

The Outlet is the position where React Router displays the selected page. For example, when the user opens /reports, ReportsPage.jsx is rendered inside the main content area while the Sidebar remains unchanged.

3.2 Sidebar.jsx

Sidebar.jsx contains the common navigation links. It should be edited centrally. If the name, icon, route or order of a sidebar item changes, change it in Sidebar.jsx instead of editing every page.
Team rule: A page file should contain the page's main content only. It must not contain another sidebar.

3.3 What a Team Member Should Build

A normal page should look like this:

export default function ReportsPage() {
return (
<section>
<h1>Reports</h1>

      {/* Reports page content only */}
    </section>

);
}

Do not write this inside a page:
<Sidebar />
<ReportsContent />

The shared MainLayout already handles the Sidebar.

4. Page Folders and Their Purpose

Folder Pages Purpose

pages/auth Login, Register, Forgot Password Public authentication screens.
pages/dashboard User Dashboard Main HR/Recruiter overview.
pages/jobs Job Postings, Create Job Job management UI.
pages/cv CV Upload, Processing Status PDF upload and AI processing progress.
pages/candidates Results, Details, Ranking, Evaluation, Comparison, Match Analysis Candidate screening and AI result views.
pages/reports Reports, CSV/PDF Export Reporting and export screens.
pages/admin Admin Dashboard, User Management Administrator-only screens.
pages/profile Profile / Settings Combined user profile and settings screen.

4.1 CandidateDetailsPage.jsx

The AI Recommendation Display does not need a separate page in the current structure. CandidateDetailsPage.jsx can contain the candidate information together with Match Percentage, Matching Skills, Missing Skills, Recommendation Status and Recommendation Justification.

4.2 MatchAnalysisPage.jsx

Match Analysis is kept as a separate page/view because it appears as an explicit UI testing screen. It can display Match Percentage, Matching Skills, Missing Skills and the recommendation status.

5. React Router - How Pages Are Connected

All route definitions must be controlled from src/routes/router.jsx. Team members should not create a second router file inside their page folders.

Route Page Access

/login LoginPage.jsx Public
/register RegisterPage.jsx Public
/forgot-password ForgotPasswordPage.jsx Public
/dashboard UserDashboardPage.jsx HR / Admin
/jobs JobPostingsPage.jsx HR / Admin
/jobs/create CreateJobPage.jsx HR / Admin
/cv-upload CVUploadPage.jsx HR / Admin
/processing ProcessingStatusPage.jsx HR / Admin
/candidates CandidateResultsPage.jsx HR / Admin
/candidates/:candidateId CandidateDetailsPage.jsx HR / Admin
/candidate-ranking CandidateRankingPage.jsx HR / Admin
/candidate-evaluation/:candidateId CandidateEvaluationPage.jsx HR / Admin
/candidate-comparison CandidateComparisonPage.jsx HR / Admin
/match-analysis/:candidateId MatchAnalysisPage.jsx HR / Admin
/reports ReportsPage.jsx HR / Admin
/reports/export ExportReportPage.jsx HR / Admin
/profile-settings ProfileSettingsPage.jsx HR / Admin
/admin AdminDashboardPage.jsx Admin
/admin/users UserManagementPage.jsx Admin

5.1 Adding a New Route

1. Create the page file in the correct pages subfolder.
2. Import the page at the top of src/routes/router.jsx.
3. Add the route under the correct ProtectedRoute and MainLayout section.
4. If the page needs a sidebar link, add that link once in src/layouts/Sidebar.jsx.
5. Run the project and confirm the route loads inside the shared layout.

6. ProtectedRoute and Authentication

The SRS requires JWT authentication, session management and role-based access control. The current frontend does not use localStorage. The preferred approach is for the Node/Express backend to store the JWT in an HttpOnly cookie.
6.1 Recommended Login Flow
React Login Page
|
| POST /api/auth/login
v
Node / Express Backend
|
| creates JWT
| sets HttpOnly cookie
v
Browser stores cookie automatically
|
| GET /api/auth/me
v
ProtectedRoute checks the logged-in user

The frontend Axios instance uses withCredentials: true so cookies can be sent to the backend. The browser handles the HttpOnly cookie; React does not need to read the token directly.

6.2 Why localStorage Is Not Used Now

• The team has not finalized a requirement that the JWT must be stored in localStorage.
• An HttpOnly cookie keeps the authentication token out of normal frontend JavaScript access.
• It keeps token handling centralized in the backend.
• The same frontend project can still be changed later if the backend team chooses a different authentication contract.

6.3 If the Backend Team Chooses a Different JWT Method

If the backend team decides to return the token in the login JSON response instead of setting an HttpOnly cookie, the frontend authentication strategy must be changed as a team decision.
The main files that would need review are:
File What may change
src/services/api.js How the token is attached to requests.
src/services/authService.js How login/logout/current-user endpoints work.
src/routes/ProtectedRoute.jsx How the frontend determines whether the user is authenticated.

7. Backend Service Files

Page files should not contain repeated Axios setup. API communication is separated into the services folder so the backend endpoint names can be changed in one place.
Service file Responsibility
api.js Creates the Axios instance and stores the common backend base URL and withCredentials setting.
authService.js Login, registration, forgot password, logout and current-user requests.
jobService.js Get jobs and create job requests.
cvService.js CV upload and processing-status requests.
candidateService.js Candidate results, details, ranking, evaluation, comparison and match analysis requests.
reportService.js Reports and CSV/PDF export requests.

7.1 Backend URL

The backend base URL is stored in the frontend environment file:
VITE_API_BASE_URL=http://localhost:5000/api

If the backend port, domain or deployment URL changes, change the environment value instead of editing every service file.

7.2 Important Endpoint Note

The SRS does not define the final REST endpoint URLs. Therefore, the endpoint names currently placed in the service files are starter names. When the backend team finalizes the API contract, update the corresponding service file.

8. Exact Places to Change Common Things

What you want to change File / location to edit
Change sidebar link name/icon/order src/layouts/Sidebar.jsx
Change the common page wrapper src/layouts/MainLayout.jsx
Add/remove/change a route src/routes/router.jsx
Change authentication/session checking src/routes/ProtectedRoute.jsx
Change backend base URL .env / .env.example
Change common Axios options src/services/api.js
Change login API endpoints src/services/authService.js
Change job API endpoints src/services/jobService.js
Change CV upload/processing API endpoints src/services/cvService.js
Change candidate API endpoints src/services/candidateService.js
Change reports/export API endpoints src/services/reportService.js
Add images/icons/logos src/assets/
Change global CSS/Tailwind rules src/index.css
Change one screen's UI Only that page file inside src/pages/...

9. How a Team Member Should Add Their Page

Use the following workflow for every screen:

1.  Pull the latest frontend branch before starting.
2.  Open the correct file inside src/pages/. If the placeholder already exists, edit that file rather than creating a duplicate.
3.  Build only the main content area. Do not add another Sidebar or MainLayout inside the page.
4.  Use the existing route from router.jsx. If a route must change, communicate the change before editing the central router.
5.  Keep page-specific state and UI logic inside the page while the project is still simple.
6.  When backend integration starts, import the correct function from src/services/ instead of creating a new Axios base URL inside the page.
7.  Test the page by navigating through the route.
8.  Commit only the files related to the task when possible.

9.1 Example: Reports Page

import { useEffect, useState } from "react";
import { getReports } from "../../services/reportService";

export default function ReportsPage() {
const [reports, setReports] = useState([]);

useEffect(() => {
// Connect after backend endpoint is ready.
// getReports().then((response) => setReports(response.data));
}, []);

return (
<section>
<h1>Reports</h1>

      {/* Build only the Reports main content here */}
    </section>

);
}

10. Sidebar Rules

• There must be only one shared Sidebar.jsx file.
• Do not copy sidebar code into individual pages.
• Do not create a separate sidebar for Reports, Candidates or Admin unless the approved UI is changed by the team.
• Use NavLink so the current route can be visually highlighted.
• If role-specific menu visibility is required later, implement it centrally in Sidebar.jsx after the backend role response is finalized.
• The Admin Dashboard and User Management pages are protected as Admin routes even if their links are visible during early UI development.

11. Git and Team Workflow

11.1 get the project

Git clone “URL”

11.2 Merge Conflict Prevention

• Do not let several members edit router.jsx at the same time unless necessary.
• Do not let several members redesign Sidebar.jsx independently.
• Page developers should mostly work inside their own pages subfolder.
• Pull the latest changes before opening a pull request.
• If router/sidebar changes are needed, make a small focused commit so conflicts are easier to resolve.

12. Running the Project

After downloading/cloning the project:
npm install
npm run dev

Set up .env
Please rename .env.example to .env

Vite will normally provide a local development URL such as:
http://localhost:5173

Production Build Check
npm run build

Every member should confirm the project builds successfully before merging significant frontend changes.

13. Environment and Security Rules

• Do not commit the real .env file to Git.
• Commit .env.example so every member knows which environment variables are required.
• Do not put OpenAI, Gemini or other private AI API keys in the React frontend.
• AI provider keys belong to the backend/AI microservice environment.
• Do not place passwords or test secrets directly in React source files.
• Do not expose JWT secrets in VITE\_ environment variables because Vite frontend variables are visible to the client.

14. What Not to Do

Avoid Correct approach
Duplicate Sidebar inside every page Use MainLayout.jsx + Sidebar.jsx once.
Create a second router file for one page Add the route to src/routes/router.jsx.
Create a different Axios instance on every page Use src/services/api.js and the correct service file.
Add localStorage authentication independently Agree on the backend authentication contract first.
Put AI provider keys in React .env Keep them in backend/AI microservice environment variables.
Add extra pages because they seem useful Confirm they are part of the approved project scope.
Change common sidebar style in one page Change Sidebar.jsx so the application remains consistent.

15. Quick Change Guide

Use this section when the team wants to modify the project later.
Requested change Where / how to change it
Add a new page Create it under src/pages/<category>/, import it in router.jsx, add a route, and add a Sidebar link only if needed.
Remove a page Remove its route first, remove its Sidebar link if present, remove unused service calls, then delete the page file.
Rename a route Change router.jsx and update every NavLink/useNavigate/Link that points to the old route.
Change Sidebar design Edit only src/layouts/Sidebar.jsx.
Add a top navbar later First agree on the UI change; then add the shared navbar to MainLayout.jsx, not to every page.
Change backend port Change VITE_API_BASE_URL in .env.
Change API endpoint names Edit the relevant file inside src/services/.
Switch authentication method Review api.js, authService.js and ProtectedRoute.jsx together as one team change.
Add Redux/Context later Only add it when shared application state actually requires it; it is not necessary for the initial folder setup.
# cv-screening-frontend
