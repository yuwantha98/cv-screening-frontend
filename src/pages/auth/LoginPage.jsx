import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and Password are required!");
      return;
    }

    try {
      setLoading(true);

      // Backend Login API call
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password
      });

      if (response.data?.token) {
      
        localStorage.setItem("token", response.data.token);
        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-900 font-sans text-gray-100 items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-[#0B2149] rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-blue-900">
        
        {/* Left Brand Section */}
        <div className="p-10 lg:p-12 flex flex-col justify-between bg-gradient-to-b from-[#0B2149] to-[#071630] border-r border-blue-900">
          <div>
            <div className="flex items-center gap-2 mb-12">
              <div className="bg-blue-600 text-white p-2.5 rounded-xl flex items-center justify-center font-bold shadow-md">
                ⚡
              </div>
              <div>
                <h1 className="text-white font-extrabold tracking-wider text-base">TalentScreen AI</h1>
                <p className="text-[10px] tracking-widest text-blue-300 uppercase">HR INTELLIGENCE</p>
              </div>
            </div>

            <p className="text-xs uppercase tracking-widest text-blue-400 font-bold mb-3">SMART RECRUITMENT WORKSPACE</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-4">
              AI-Powered <br />
              <span className="text-blue-200">CV Screening.</span>
            </h2>
            <p className="text-xs text-blue-200/80 mb-10 leading-relaxed">
              Automate resume parsing, evaluate candidates against job descriptions, and rank top talent seamlessly.
            </p>
          </div>

          <div className="mt-12 pt-6 border-t border-blue-900/60 text-[11px] text-blue-300/60">
            <span>TalentScreen AI • Enterprise HR Module</span>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="p-8 lg:p-12 flex flex-col justify-center bg-white text-gray-900 rounded-r-3xl">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">HR Workspace</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-1">Welcome back</h2>
            <p className="text-xs text-gray-500 mt-1">Sign in with your company account to continue.</p>
          </div>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-6 rounded-r-md text-sm font-medium">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label className="mb-2 text-xs font-bold text-gray-700">Email address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-200 bg-gray-50/50 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800"
                placeholder="name@company.com"
                required
              />
            </div>
            
            <div className="flex flex-col">
              <label className="mb-2 text-xs font-bold text-gray-700">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-200 bg-gray-50/50 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="bg-[#0B2149] text-white font-bold py-3.5 px-4 rounded-xl mt-4 hover:bg-blue-900 transition-all text-sm cursor-pointer disabled:opacity-50"
            >
              {loading ? "Signing in..." : "→ Sign in"}
            </button>
          </form>

          {/* Create an Account Link directing to Register Page */}
          <p className="mt-8 text-xs text-center text-gray-500">
            New to TalentScreen AI?{" "}
            <Link to="/register" className="text-blue-700 hover:text-blue-900 font-bold hover:underline transition-colors">
              Create an account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}