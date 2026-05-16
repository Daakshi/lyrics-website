"use client";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import YoutubeIcon from "./YoutubeIcon";
import { useEffect, useState, useRef } from "react";
import Login from "./Login";
import AddSong from "./AddSong";
import ChangePassword from "./ChangePassword";

const Navbar = ({ search, setSearch }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddSong, setShowAddSong] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const logoContainerRef = useRef(null);
  const logoTextRef1 = useRef(null);
  const logoTextRef2 = useRef(null);

  const handleLogoMouseMove = (e) => {
    if (window.innerWidth < 1024) return;
    if (logoContainerRef.current && logoTextRef1.current && logoTextRef2.current) {
      const rect = logoContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const mask1 = `radial-gradient(circle 80px at ${x}px ${y}px, transparent 0%, black 100%)`;
      const mask2 = `radial-gradient(circle 80px at ${x}px ${y}px, black 0%, transparent 100%)`;
      
      logoTextRef1.current.style.WebkitMaskImage = mask1;
      logoTextRef1.current.style.maskImage = mask1;
      
      logoTextRef2.current.style.WebkitMaskImage = mask2;
      logoTextRef2.current.style.maskImage = mask2;
      logoTextRef2.current.style.opacity = 1;
    }
  };

  const handleLogoMouseLeave = () => {
    if (logoTextRef1.current && logoTextRef2.current) {
      logoTextRef1.current.style.WebkitMaskImage = 'none';
      logoTextRef1.current.style.maskImage = 'none';
      
      logoTextRef2.current.style.WebkitMaskImage = 'none';
      logoTextRef2.current.style.maskImage = 'none';
      logoTextRef2.current.style.opacity = 0;
    }
  };

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (admin === "true") {
      setIsAdmin(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    setIsAdmin(false);
    window.location.reload();
  };

  return (
    <>
      <nav className="bg-[#FDF8F1]/80 backdrop-blur-md border-b border-red-900/10 w-full sticky top-0 z-50 transition-all duration-500">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center px-8 lg:h-28">

          {/* Logo */}
          <div className="flex w-full lg:w-auto justify-between items-center py-6 lg:py-0">
            <Link
              href="/"
              className="relative cursor-pointer select-none"
              ref={logoContainerRef}
              onMouseMove={handleLogoMouseMove}
              onMouseLeave={handleLogoMouseLeave}
            >
              {/* Sharp Logo (hides where mouse is) */}
              <h1
                ref={logoTextRef1}
                className="text-4xl font-serif font-bold tracking-tight text-[#5D1E1E] flex items-center gap-3 transition-all duration-75 whitespace-nowrap"
              >
                <span className="w-10 h-10 bg-red-900 rounded-lg flex items-center justify-center text-white text-2xl font-serif shrink-0">V</span>
                <span>Vibe with <span className="text-[#C07A2B]">Krishna</span></span>
              </h1>

              {/* Blurred Logo (appears where mouse is) */}
              <h1
                ref={logoTextRef2}
                className="absolute top-0 left-0 text-4xl font-serif font-bold tracking-tight text-[#5D1E1E] flex items-center gap-3 pointer-events-none blur-[4px] transition-all duration-75 whitespace-nowrap opacity-0"
                aria-hidden="true"
              >
                <span className="w-10 h-10 bg-red-900 rounded-lg flex items-center justify-center text-white text-2xl font-serif shrink-0">V</span>
                <span>Vibe with <span className="text-[#C07A2B]">Krishna</span></span>
              </h1>
            </Link>

            <div
              className="lg:hidden text-red-900 hover:text-red-700 transition-all cursor-pointer"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <X size={28} /> : <Menu size={32} />}
            </div>
          </div>

          {/* Search */}
          {setSearch && (
            <div className="w-full lg:max-w-2xl mt-2 lg:mt-0 group px-2 lg:px-10">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search bhajans, lyrics, artists..."
                  value={search || ""}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#EADCC7]/30 border border-red-900/10 rounded-xl h-14 pl-14 pr-6 text-red-900 placeholder-red-900/40 focus:outline-none focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all shadow-inner"
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-red-900/40 w-6 h-6 group-focus-within:text-amber-600 transition-colors" />
              </div>
            </div>
          )}

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-10 items-center h-full">
            <a
              href="https://youtube.com/@vibewithkrishna-z4z"
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-red-900/5 rounded-full hover:bg-red-900/10 transition-all"
            >
              <YoutubeIcon size={28} className="text-red-900" />
            </a>

            <div className="flex items-center gap-6">
              {isAdmin ? (
                <>
                  <button
                    className="bg-red-900 text-white font-bold py-3 px-10 rounded-full shadow-lg shadow-red-900/20 hover:bg-red-800 transition-all whitespace-nowrap"
                    onClick={() => setShowAddSong(true)}
                  >
                    Add Bhajan
                  </button>
                  <button
                    className="bg-amber-600 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-amber-600/20 hover:bg-amber-700 transition-all whitespace-nowrap"
                    onClick={() => setShowChangePassword(true)}
                  >
                    Change Password
                  </button>
                  <button
                    className="text-red-900 font-bold hover:text-red-700 transition-colors whitespace-nowrap"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  className="bg-red-900 text-white font-bold py-3 px-10 rounded-full shadow-lg shadow-red-900/20 hover:bg-red-800 transition-all whitespace-nowrap"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="lg:hidden p-8 space-y-8 bg-[#FDF8F1] border-t border-red-900/10 animate-fadeIn">
            <div className="flex flex-col gap-6">
              {isAdmin ? (
                <>
                  <button className="bg-red-900 text-white font-bold py-4 rounded-2xl w-full" onClick={() => setShowAddSong(true)}>
                    Add New Bhajan
                  </button>
                  <button className="bg-amber-600 text-white font-bold py-4 rounded-2xl w-full" onClick={() => setShowChangePassword(true)}>
                    Change Password
                  </button>
                  <button className="text-red-900 font-bold w-full py-2" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <button className="bg-red-900 text-white font-bold py-4 rounded-2xl w-full" onClick={() => setShowLogin(true)}>
                  Admin Login
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Modals */}
      {showChangePassword && <ChangePassword close={() => setShowChangePassword(false)} />}
      {showLogin && <Login close={() => setShowLogin(false)} />}
      {showAddSong && <AddSong close={() => setShowAddSong(false)} />}
    </>
  );
};

export default Navbar;