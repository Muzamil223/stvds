import React, { useState, useRef } from "react";
import { Radio, CameraOff, Info, HardHat, Users, Smartphone, Eye } from "lucide-react";

const BASE = import.meta.env.VITE_API_URL;

const STREAM_URL = `${BASE}/live/stream`;
const LEGEND = [
  { color: "bg-green-500", label: "Person (normal)" },
  { color: "bg-red-500",   label: "Violation detected" },
  { color: "bg-yellow-400",label: "Motorcycle" },
];

const DETECTS = [
  { icon: Users,      label: "Triple Riding",   desc: "3+ persons in proximity" },
  { icon: Smartphone, label: "Phone Usage",      desc: "Cell phone near driver" },
  { icon: HardHat,    label: "No Helmet",        desc: "Rider without helmet" },
];

export default function LiveCamera() {
  const [streaming, setStreaming] = useState(false);
  const [error,     setError]     = useState(null);
  const imgRef = useRef();

  const startStream = () => {
    setError(null);
    setStreaming(true);
  };

  const stopStream = () => {
    if (imgRef.current) imgRef.current.src = "";
    setStreaming(false);
  };

  const handleImgError = () => {
    setError("Could not connect to the camera stream. Make sure the backend is running and a webcam is available.");
    setStreaming(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="section-title">Real-time Detection</div>
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Radio size={22} className={`${streaming ? "text-red-500 animate-pulse" : "text-gray-400"}`} />
          Live Camera Feed
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Real-time object detection via YOLOv8 running on your device's webcam.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Stream panel */}
        <div className="lg:col-span-2 space-y-4">
          {/* Video frame */}
          <div className="card overflow-hidden bg-gray-900 aspect-video relative">
            {streaming ? (
              <img
                ref={imgRef}
                src={`${STREAM_URL}?t=${Date.now()}`}
                alt="Live STVDS Camera Feed"
                className="w-full h-full object-contain"
                onError={handleImgError}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                  <CameraOff size={28} className="text-gray-600" />
                </div>
                <div className="text-sm text-gray-400">Camera stream inactive</div>
                <div className="text-xs text-gray-600">Click Start to begin detection</div>
              </div>
            )}

            {/* Live badge */}
            {streaming && (
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-600 text-white text-xs px-2 py-1 rounded">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                LIVE
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex gap-3">
            {!streaming ? (
              <button onClick={startStream} className="btn-primary flex-1 justify-center py-3">
                <Eye size={16} /> Start Live Detection
              </button>
            ) : (
              <button onClick={stopStream}
                className="flex-1 justify-center py-3 inline-flex items-center gap-2 bg-gray-800 text-white text-sm font-medium rounded hover:bg-gray-700 transition-colors">
                <Radio size={16} /> Stop Stream
              </button>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
              <CameraOff size={15} className="flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Tech note */}
          <div className="flex items-start gap-2 p-3 bg-gov-light border border-gov-border rounded text-xs text-gray-600">
            <Info size={13} className="flex-shrink-0 mt-0.5 text-gov-blue" />
            <span>
              The stream is an MJPEG feed from the Flask backend running on <code className="font-mono bg-white px-1 rounded">localhost:5000</code>.
              YOLOv8 annotates each frame with bounding boxes before serving it. Requires a connected webcam.
            </span>
          </div>
        </div>

        {/* Info sidebar */}
        <div className="space-y-4">
          {/* Legend */}
          <div className="card p-4">
            <div className="section-title mb-3">Bounding Box Legend</div>
            <div className="space-y-2">
              {LEGEND.map(({ color, label }) => (
                <div key={label} className="flex items-center gap-2 text-xs text-gray-600">
                  <div className={`w-3 h-3 rounded-sm flex-shrink-0 ${color}`} />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* What it detects */}
          <div className="card p-4">
            <div className="section-title mb-3">Live Detections</div>
            <div className="space-y-3">
              {DETECTS.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex items-start gap-2.5">
                  <div className="w-7 h-7 bg-gov-light rounded flex items-center justify-center flex-shrink-0">
                    <Icon size={14} className="text-gov-blue" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-700">{label}</div>
                    <div className="text-[11px] text-gray-400">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div className="card p-4">
            <div className="section-title mb-3">Requirements</div>
            <ul className="space-y-1.5 text-xs text-gray-500">
              {[
                "Flask backend running on port 5000",
                "Webcam connected to server machine",
                "YOLOv8 model loaded (auto-downloads)",
                "Browser must allow mixed content or use localhost",
              ].map((r) => (
                <li key={r} className="flex items-start gap-1.5">
                  <span className="text-gov-blue mt-0.5">•</span> {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
