import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { 
  ShieldCheck, 
  Menu, 
  X, 
  Radio, 
  ChevronRight, 
  Activity, 
  Lock,
  ExternalLink
} from "lucide-react";

const NAV_LINKS = [
  { to: "/", label: "Dashboard" },
  { to: "/upload", label: "Neural Analysis" },
  { to: "/results", label: "Archives" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll for glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-[100] w-full">
      {/* ── TOP UTILITY BAR ────────────────────────────────────────────── */}
      <div className="bg-[#000d1a] text-white/60 text-[10px] font-bold py-1.5 px-6 flex items-center justify-between border-b border-white/5 tracking-[0.15em] uppercase">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-blue-400">
            <Lock size={10} /> Secure Connection Established
          </span>
          <span className="hidden md:inline-block opacity-40">|</span>
          <span className="hidden md:inline-block">Gov. of Pakistan • ITMS Division</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Activity size={10} className="text-green-500" /> 
            System Status: <span className="text-green-500 underline decoration-green-500/30">Optimal</span>
          </span>
        </div>
      </div>

      {/* ── MAIN NAVIGATION ────────────────────────────────────────────── */}
      <nav 
        className={`transition-all duration-300 border-b ${
          scrolled 
          ? "bg-white/80 backdrop-blur-md border-slate-200 py-2 shadow-sm" 
          : "bg-white border-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-12">
            
            {/* Logo Group */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-11 h-11 bg-[#001529] rounded-sm flex items-center justify-center shadow-lg group-hover:bg-blue-700 transition-colors duration-500">
                  <ShieldCheck size={24} className="text-white" />
                </div>
                {/* Decorative dot */}
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <div className="text-lg font-black text-[#001529] leading-none tracking-tighter uppercase">
                  STVDS <span className="text-blue-600">AI</span>
                </div>
                <div className="text-[9px] font-bold text-slate-400 leading-none mt-1 uppercase tracking-widest">
                  Infrastructure Node
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 ml-12">
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) => `
                    relative px-5 py-2 text-[13px] font-bold uppercase tracking-wider transition-all duration-300
                    ${isActive 
                      ? "text-blue-600" 
                      : "text-slate-500 hover:text-[#001529] hover:bg-slate-50"
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      {isActive && (
                        <span className="absolute bottom-0 left-5 right-5 h-0.5 bg-blue-600 rounded-full" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
              <Link
                to="/live"
                className="group flex items-center gap-2.5 px-5 py-2.5 bg-[#001529] text-white text-xs font-black rounded-sm hover:bg-blue-700 transition-all shadow-md active:scale-95"
              >
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" />
                LIVE TRACKING
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 rounded-md bg-slate-100 text-[#001529] hover:bg-slate-200 transition-colors"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ── MOBILE OVERLAY ────────────────────────────────────────────── */}
        <div className={`
          lg:hidden fixed inset-x-0 top-[100px] bg-white border-b border-slate-200 shadow-2xl transition-all duration-300 ease-in-out
          ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
        `}>
          <div className="p-6 space-y-2">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `
                  flex items-center justify-between px-4 py-4 rounded-md text-sm font-bold uppercase tracking-widest
                  ${isActive ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"}
                `}
              >
                {label}
                <ChevronRight size={14} className={location.pathname === to ? "text-blue-600" : "text-slate-300"} />
              </NavLink>
            ))}
            
            <div className="pt-4 border-t border-slate-100 mt-4">
              <Link
                to="/live"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-3 w-full py-4 bg-[#001529] text-white text-sm font-black rounded-sm"
              >
                <Radio size={18} className="text-red-500 animate-pulse" />
                INITIATE LIVE FEED
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}