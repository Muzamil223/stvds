import React from "react";
import {
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gov-navy text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gov-light rounded-lg flex items-center justify-center">
                <ShieldCheck size={24} className="text-gov-blue" />
              </div>
              <div>
                <div className="font-bold text-lg">STVDS</div>
                <div className="text-xs text-white/60">Traffic Detection</div>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Leveraging YOLOv8 AI technology for intelligent traffic monitoring
              and safety improvement.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wide text-gov-light">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/"
                  className="text-white/70 hover:text-white transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/upload"
                  className="text-white/70 hover:text-white transition"
                >
                  Upload & Analyze
                </a>
              </li>
              <li>
                <a
                  href="/live"
                  className="text-white/70 hover:text-white transition"
                >
                  Live Camera
                </a>
              </li>
              <li>
                <a
                  href="/results"
                  className="text-white/70 hover:text-white transition"
                >
                  Results
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wide text-gov-light">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-white/70 hover:text-white transition">
                <Mail size={16} className="text-gov-light" />
                <span>support@stvds.gov</span>
              </li>
              <li className="flex items-center gap-2 text-white/70 hover:text-white transition">
                <Phone size={16} className="text-gov-light" />
                <span>+92 (0) 51-9000000</span>
              </li>
              <li className="flex items-center gap-2 text-white/70 hover:text-white transition">
                <MapPin size={16} className="text-gov-light" />
                <span>Islamabad, Pakistan</span>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wide text-gov-light">
              Resources
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition"
                >
                  API Reference
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-white transition"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 py-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm text-white/60">
            <p>
              © {currentYear} Smart Traffic Violation Detection System. All
              rights reserved.
            </p>
            <p className="mt-2">
              Official Government System • Powered by YOLOv8 • Built with React
              & Flask
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition"
            >
              <Github size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Government Bar */}
      <div className="bg-black/20 backdrop-blur-sm border-t border-white/10 px-4 py-3 text-center text-xs text-white/60">
        <p>Government of Pakistan — Traffic Safety Authority | v1.0.0</p>
      </div>
    </footer>
  );
}
