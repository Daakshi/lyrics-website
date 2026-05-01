"use client";

import { useState } from "react";
import { X, Lock, Key, CheckCircle2 } from "lucide-react";

const ChangePassword = ({ close }) => {
  const [step, setStep] = useState(1); // Step 1: Verify, Step 2: Change
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = () => {
    setLoading(true);
    setError("");
    fetch(`/api/verify-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: oldPassword })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStep(2);
        } else {
          setError("Incorrect current password");
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Verification failed");
      })
      .finally(() => setLoading(false));
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match!");
      return;
    }

    if (newPassword.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    setLoading(true);
    setError("");
    fetch(`/api/change-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword, newPassword })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          close();
        } else {
          setError(data.message || "Error updating password");
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Update failed");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[100] p-4 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#FDF8F1] border border-red-900/10 rounded-[3rem] w-full max-w-md p-6 md:p-10 relative shadow-2xl animate-fadeInScale my-auto">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/10 blur-3xl rounded-full"></div>
        
        <div className="flex justify-between items-center mb-10 relative">
          <div className="flex items-center gap-3">
             <div className={`w-12 h-12 ${step === 1 ? 'bg-red-900' : 'bg-green-600'} rounded-2xl flex items-center justify-center text-white transition-colors duration-500`}>
                {step === 1 ? <Key size={24} /> : <CheckCircle2 size={24} />}
             </div>
             <div>
               <h2 className="text-[#5D1E1E] text-2xl font-serif font-black">Change Password</h2>
               <p className="text-[#C07A2B] text-xs font-bold tracking-widest uppercase mt-1">Step {step} of 2</p>
             </div>
          </div>
          <button onClick={close} className="text-red-900/40 hover:text-red-900 transition-colors p-2 hover:bg-red-900/5 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-8 relative">
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-900 rounded-xl p-3 text-center font-medium">
              {error}
            </div>
          )}
          {step === 1 ? (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-2">
                <label className="text-[#6B5D5D] text-sm font-bold ml-4">Current Password</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter current password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full bg-white border border-red-300/30 rounded-2xl p-5 pl-14 text-red-900 font-medium focus:ring-4 focus:ring-amber-500/10 transition-all outline-none"
                  />
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-red-900/30" size={20} />
                </div>
              </div>
              <button
                onClick={handleVerify}
                disabled={loading || !oldPassword}
                className="w-full bg-red-900 text-white font-bold py-5 rounded-full shadow-lg shadow-red-900/20 hover:bg-red-800 transition-all disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify Current Password"}
              </button>
            </div>
          ) : (
            <div className="space-y-6 animate-slideIn">
              <div className="space-y-2">
                <label className="text-[#6B5D5D] text-sm font-bold ml-4">New Password</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-white border border-red-300/30 rounded-2xl p-5 pl-14 text-red-900 font-medium focus:ring-4 focus:ring-amber-500/10 transition-all outline-none"
                  />
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-red-900/30" size={20} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[#6B5D5D] text-sm font-bold ml-4">Confirm New Password</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-white border border-red-300/30 rounded-2xl p-5 pl-14 text-red-900 font-medium focus:ring-4 focus:ring-amber-500/10 transition-all outline-none"
                  />
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-red-900/30" size={20} />
                </div>
              </div>

              <button
                onClick={handleChangePassword}
                disabled={loading || !newPassword || !confirmPassword}
                className="w-full bg-amber-600 text-white font-bold py-5 rounded-full shadow-lg shadow-amber-600/20 hover:bg-amber-700 transition-all disabled:opacity-50"
              >
                {loading ? "Updating..." : "Set New Password"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
