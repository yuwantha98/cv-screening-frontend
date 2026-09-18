import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required!");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError("");
    console.log("Register submitted:", { name, email, password });
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
              Join the future. <br />
              <span className="text-blue-200">Screen smarter.</span>
            </h2>
            <p className="text-xs text-blue-200/80 mb-10 leading-relaxed">
              Create your HR account to manage job postings, analyze candidate resumes with AI, and export professional reports.
            </p>
          </div>

          <div className="mt-12 pt-6 border-t border-blue-900/60 text-[11px] text-blue-300/60">
            <span>TalentScreen AI • Enterprise HR Module</span>
          </div>
        </div>

        {/* Right Register Form Section */}
        <div className="p-8 lg:p-12 flex flex-col justify-center bg-white text-gray-900 rounded-r-3xl">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">HR Workspace</span>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 mt-1">Create an account</h2>
            <p className="text-xs text-gray-500 mt-1">Enter your details to get started with TalentScreen AI.</p>
          </div>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded-r-md text-xs font-medium">
              {error}
            </div>
          )}
          
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="mb-1.5 text-xs font-bold text-gray-700">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-200 bg-gray-50/50 p-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800"
                placeholder="Enter your name"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1.5 text-xs font-bold text-gray-700">Email address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-200 bg-gray-50/50 p-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800"
                placeholder="name@company.com"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="mb-1.5 text-xs font-bold text-gray-700">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-200 bg-gray-50/50 p-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800"
                placeholder="Create a password"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1.5 text-xs font-bold text-gray-700">Confirm Password</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border border-gray-200 bg-gray-50/50 p-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800"
                placeholder="Confirm your password"
              />
            </div>
            
            <button 
              type="submit" 
              className="bg-[#0B2149] text-white font-bold py-3 px-4 rounded-xl mt-2 hover:bg-blue-900 transition-all text-xs cursor-pointer"
            >
              → Register
            </button>
          </form>

          {/* Log In Link directing back to Login Page */}
          <p className="mt-6 text-xs text-center text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-700 hover:text-blue-900 font-bold hover:underline transition-colors">
              Log In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}