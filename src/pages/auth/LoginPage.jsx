import { useState } from "react";
import { Link } from "react-router-dom"; 

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Basic form validation for empty fields
    if (!email || !password) {
      setError("Email and Password are required!");
      return;
    }
    
    // Clear errors if validation passes
    setError("");
    console.log("Login submitted:", { email, password });
    
    // TODO: Add API call here via authService.js once the backend is ready
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Login</h2>
        
        {/* Styled Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-6 rounded-r-md text-sm font-medium">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-bold text-gray-700">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your email"
            />
          </div>
          
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-bold text-gray-700">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your password"
            />
          </div>
          
          <button 
            type="submit" 
            className="bg-blue-600 text-white font-bold p-3 rounded-lg mt-4 hover:bg-blue-700 hover:shadow-md transition-all duration-200"
          >
            Sign In
          </button>
        </form>

        {/* Registration Link placed outside the form */}
        <p className="mt-8 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:text-blue-800 font-bold hover:underline transition-colors">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}