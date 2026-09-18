import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* මුලින්ම /login වෙත යොමු කරයි */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Login Page */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Register Page */}
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}