import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Validate empty fields
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required!");
      return;
    }
    
    // Validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    
    // Clear errors if validation passes
    setError("");
    console.log("Register submitted:", { name, email, password });
    
    // TODO: Add API call here via authService.js once the backend is ready
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Create an Account</h2>
        
        {/* Styled Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-6 rounded-r-md text-sm font-medium">
            {error}
          </div>
        )}
        
        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-bold text-gray-700">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your name"
            />
          </div>

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
              placeholder="Create a password"
            />
          </div>
          
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-bold text-gray-700">Confirm Password</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Confirm your password"
            />
          </div>
          
          {/* Blue Submit Button */}
          <button 
            type="submit" 
            className="bg-blue-600 text-white font-bold p-3 rounded-lg mt-4 hover:bg-blue-700 hover:shadow-md transition-all duration-200"
          >
            Register
          </button>
        </form>

        {/* Login Link placed outside the form */}
        <p className="mt-8 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-800 font-bold hover:underline transition-colors">
            Log In
          </Link>
        </p>

      </div>
    </div>
  );
}