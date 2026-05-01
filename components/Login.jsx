"use client";

import { useState } from "react";
import { X, Lock, User } from "lucide-react";

const Login = ({ close }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    fetch(`/api/admin-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("admin", "true");
          setError("");
          setTimeout(() => {
            close();
            window.location.reload();
          }, 500);
        } else {
          setError("Invalid credentials");
        }
      })
      .catch((err) => {
        console.log("Login error: ", err);
        setError("Login failed. Please try again.");
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-[100] p-4 backdrop-blur-md">
      <div className="bg-[#FDF8F1] border border-red-900/10 rounded-[3rem] w-full max-w-md p-6 md:p-10 relative overflow-hidden shadow-2xl animate-fadeInScale">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/10 blur-3xl rounded-full"></div>
        
        <div className="flex justify-between items-center mb-8 relative">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-red-900 rounded-lg flex items-center justify-center text-white">
                <Lock size={20} />
             </div>
             <h2 className="text-[#5D1E1E] text-3xl font-serif font-bold">Admin Portal</h2>
          </div>
          <button onClick={close} className="text-red-900/40 hover:text-red-900 transition-colors p-2 hover:bg-red-900/5 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6 relative">
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-900 rounded-xl p-3 text-center font-medium">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <label className="text-[#6B5D5D] text-sm font-bold ml-4">Username</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white border border-red-300/30 rounded-2xl p-4 pl-12 text-red-900 font-medium focus:ring-4 focus:ring-amber-500/10 transition-all outline-none"
              />
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-red-900/30" size={20} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[#6B5D5D] text-sm font-bold ml-4">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-red-300/30 rounded-2xl p-4 pl-12 text-red-900 font-medium focus:ring-4 focus:ring-amber-500/10 transition-all outline-none"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-red-900/30" size={20} />
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-red-900 text-white font-bold py-4 rounded-full shadow-lg shadow-red-900/20 hover:bg-red-800 transition-all mt-4"
          >
            Access Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
