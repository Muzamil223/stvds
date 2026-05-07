import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Upload,
  Radio,
  FileText,
  HardHat,
  Smartphone,
  Users,
  ChevronRight,
  Cpu,
  Eye,
  AlertTriangle,
  Zap,
  BarChart3,
  Lock,
  ArrowUpRight,
  Fingerprint
} from "lucide-react";

// --- Data Objects ---
const VIOLATIONS = [
  {
    icon: HardHat,
    title: "Helmet Compliance",
    desc: "AI-driven detection of non-compliant riders using head-region neural analysis.",
    severity: "CRITICAL",
    color: "border-red-200 bg-red-50/50",
    accent: "bg-red-600"
  },
  {
    icon: Users,
    title: "Occupancy Limit",
    desc: "Spatial clustering algorithms to identify triple-riding on two-wheelers.",
    severity: "HIGH",
    color: "border-orange-200 bg-orange-50/50",
    accent: "bg-orange-600"
  },
  {
    icon: Smartphone,
    title: "Distracted Driving",
    desc: "YOLOv8-based monitoring for mobile device usage during vehicle operation.",
    severity: "MODERATE",
    color: "border-blue-200 bg-blue-50/50",
    accent: "bg-blue-600"
  },
];

const STEPS = [
  { icon: Upload, label: "Ingestion", sub: "Video/Stream" },
  { icon: Cpu, label: "Processing", sub: "Frame Analysis" },
  { icon: Eye, label: "Detection", sub: "Neural Network" },
  { icon: AlertTriangle, label: "Validation", sub: "Rule Engine" },
  { icon: FileText, label: "Reporting", sub: "Evidence Log" },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      
      {/* ── HERO SECTION ────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center bg-[#001529] overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center py-20">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase">
              <Fingerprint size={14} />
              Secure Portal v4.0.2
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
              Enforcing Road <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                Safety Through AI
              </span>
            </h1>

            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              The Intelligent Traffic Management System (ITMS) utilizes deep learning 
              to provide real-time surveillance and automated violation logging for 
              modern metropolitan jurisdictions.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/upload" className="group flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-sm transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                <Upload size={18} />
                UPLOADER SYSTEM
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/live" className="group flex items-center gap-3 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-sm border border-slate-700 transition-all">
                <Radio size={18} className="text-red-500 animate-pulse" />
                LIVE FEED
              </Link>
            </div>

            {/* Quick Stats Dashboard */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800">
              <div>
                <div className="text-2xl font-bold text-white tracking-tight">99.2%</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Detection Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white tracking-tight">&lt; 200ms</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Inference Latency</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white tracking-tight">YOLOv10</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Current Engine</div>
              </div>
            </div>
          </div>

          {/* Hero Visual Component */}
          <div className="hidden lg:block relative">
            <div className="relative z-10 bg-slate-900 border border-slate-700 rounded-lg p-2 shadow-2xl">
              <div className="bg-slate-950 rounded-md overflow-hidden aspect-video flex items-center justify-center relative">
                <div className="absolute top-4 left-4 flex gap-2">
                   <div className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_red]" />
                   <div className="text-[10px] text-white/50 font-mono tracking-tighter uppercase">Rec: Cam_04_Downtown</div>
                </div>
                {/* Visual placeholder for AI Scanning */}
                <div className="absolute inset-0 border-2 border-blue-500/20 m-12 flex items-center justify-center">
                   <div className="w-full h-[1px] bg-blue-400 shadow-[0_0_15px_#60a5fa] animate-[scan_3s_ease-in-out_infinite]" />
                </div>
                <Cpu size={48} className="text-slate-800" />
              </div>
            </div>
            {/* Decoration */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl" />
          </div>
        </div>
      </section>

      {/* ── PIPELINE FLOW ──────────────────────────────────────────────── */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-between items-center gap-8">
            {STEPS.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 group">
                <div className="p-3 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                  <item.icon className="text-slate-400 group-hover:text-blue-600 transition-colors" size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400">{item.label}</div>
                  <div className="text-sm font-semibold text-slate-700">{item.sub}</div>
                </div>
                {idx !== STEPS.length - 1 && (
                  <ChevronRight size={16} className="ml-8 text-slate-200 hidden xl:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE CAPABILITIES ───────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-blue-600" /> System Protocols
              </h2>
              <p className="text-4xl font-bold text-slate-900 leading-tight">
                Automated Detection Modules for Traffic Law Enforcement.
              </p>
            </div>
            <p className="text-slate-500 max-w-sm pb-1">
              Standardized detection algorithms calibrated for Indian road conditions and vehicle densities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {VIOLATIONS.map((v, i) => (
              <div key={i} className={`relative group p-8 rounded-xl border-2 transition-all duration-500 hover:shadow-2xl ${v.color}`}>
                <div className={`absolute top-0 right-0 w-16 h-1 w-full ${v.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="mb-8 inline-flex p-4 bg-white rounded-lg shadow-sm">
                  <v.icon size={28} className="text-slate-800" />
                </div>
                <div className="mb-2 flex items-center gap-2">
                   <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Status: Operational</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{v.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-8">{v.desc}</p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-200/50">
                  <span className="text-[10px] font-bold px-2 py-1 bg-slate-900 text-white rounded uppercase">{v.severity}</span>
                  <ArrowUpRight size={18} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECURITY SECTION ────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Enterprise Infrastructure</h2>
            <div className="space-y-4">
              {[
                { title: "End-to-End Encryption", desc: "All video streams are encrypted using AES-256 standards during transit.", icon: Lock },
                { title: "Immutable Evidence Log", desc: "Violations are stored with cryptographic hashes to ensure non-repudiation.", icon: ShieldCheck },
                { title: "Real-Time Cloud Analytics", desc: "Deep analytics across all camera points for traffic flow optimization.", icon: BarChart3 }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="mt-1"><item.icon size={20} className="text-blue-400" /></div>
                  <div>
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-full flex items-center justify-center p-12">
               <div className="w-full h-full border border-white/10 rounded-full animate-spin-slow flex items-center justify-center">
                  <Zap size={60} className="text-blue-500" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-slate-900 rounded-sm flex items-center justify-center">
                <ShieldCheck className="text-white" size={20} />
             </div>
             <div>
                <div className="text-sm font-bold tracking-tight">NATIONAL TRAFFIC AI</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest">Department of Transportation</div>
             </div>
          </div>
          <div className="flex gap-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">API Documentation</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}