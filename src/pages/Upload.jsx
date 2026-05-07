import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, FileVideo, X, CheckCircle, AlertCircle, Loader2, Info, HardDrive } from "lucide-react";
import { useApi } from "../hooks/useApi";

const ACCEPTED_TYPES = ["video/mp4", "video/avi", "video/quicktime", "video/x-matroska", "video/webm"];
const MAX_SIZE_MB = 500;

function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDuration(secs) {
  const m = Math.floor(secs / 60);
  const s = Math.round(secs % 60);
  return `${m}m ${s}s`;
}

const STAGES = [
  { id: "upload",   label: "Uploading video" },
  { id: "queue",    label: "Queued for processing" },
  { id: "extract",  label: "Extracting frames" },
  { id: "detect",   label: "Running YOLOv8 detection" },
  { id: "report",   label: "Generating report" },
  { id: "done",     label: "Complete" },
];

function getStageFromProgress(progress) {
  if (progress < 20)  return 0;
  if (progress < 30)  return 1;
  if (progress < 55)  return 2;
  if (progress < 80)  return 3;
  if (progress < 95)  return 4;
  return 5;
}

export default function UploadPage() {
  const navigate   = useNavigate();
  const { upload, process, pollStatus, loading, error: apiError } = useApi();

  const [file,       setFile]       = useState(null);
  const [dragging,   setDragging]   = useState(false);
  const [uploadPct,  setUploadPct]  = useState(0);
  const [phase,      setPhase]      = useState("idle"); // idle | uploading | processing | done | error
  const [progress,   setProgress]   = useState(0);
  const [statusMsg,  setStatusMsg]  = useState("");
  const [errMsg,     setErrMsg]     = useState("");
  const [metadata,   setMetadata]   = useState(null);

  const inputRef = useRef();

  // ── File validation ──────────────────────────────────────────────────────
  const validateFile = (f) => {
    if (!ACCEPTED_TYPES.includes(f.type) && !f.name.match(/\.(mp4|avi|mov|mkv|webm)$/i)) {
      return "Unsupported format. Please upload MP4, AVI, MOV, MKV, or WebM.";
    }
    if (f.size > MAX_SIZE_MB * 1024 * 1024) {
      return `File too large. Maximum size is ${MAX_SIZE_MB} MB.`;
    }
    return null;
  };

  const handleFile = (f) => {
    const err = validateFile(f);
    if (err) { setErrMsg(err); return; }
    setErrMsg("");
    setFile(f);
    setPhase("idle");
    setProgress(0);
  };

  // ── Drag handlers ────────────────────────────────────────────────────────
  const onDrop = useCallback((e) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, []);

  const onDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!file) return;
    setErrMsg("");

    try {
      // 1. Upload
      setPhase("uploading");
      setStatusMsg("Uploading video to server...");
      const uploadRes = await upload(file, (pct) => setUploadPct(pct));
      const jobId = uploadRes.job_id;
      setMetadata(uploadRes.metadata);

      // 2. Trigger processing
      setPhase("processing");
      setStatusMsg("Processing started...");
      await process(jobId);

      // 3. Poll status
      const poll = async () => {
        const status = await pollStatus(jobId);
        setProgress(status.progress || 0);
        setStatusMsg(STAGES[getStageFromProgress(status.progress || 0)]?.label || "");

        if (status.status === "completed") {
          setPhase("done");
          setProgress(100);
          setTimeout(() => navigate(`/results/${jobId}`), 800);
        } else if (status.status === "failed") {
          setPhase("error");
          setErrMsg(status.error || "Processing failed.");
        } else {
          setTimeout(poll, 1500);
        }
      };
      poll();

    } catch (e) {
      setPhase("error");
      setErrMsg(e.response?.data?.error || e.message || "An error occurred.");
    }
  };

  const reset = () => {
    setFile(null); setPhase("idle"); setProgress(0);
    setUploadPct(0); setErrMsg(""); setMetadata(null);
  };

  const stageIdx = getStageFromProgress(progress);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="section-title">Video Analysis</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Upload Traffic Footage</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Upload a video file and our AI system will automatically detect and analyze all traffic violations.
          </p>
        </div>

        {/* Drop zone */}
        {phase === "idle" && (
          <div className="space-y-6">
            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onClick={() => inputRef.current?.click()}
              className={`relative card p-12 border-2 border-dashed cursor-pointer text-center transition-all duration-300 overflow-hidden
                ${dragging 
                  ? "border-gov-blue bg-gov-light shadow-lg scale-[1.01]" 
                  : "border-gray-300 hover:border-gov-blue hover:bg-gray-50"}`}
            >
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{backgroundImage: "radial-gradient(circle at 20% 50%, currentColor 0.5px, transparent 0.5px)", backgroundSize: "40px 40px"}}></div>
              
              <input
                ref={inputRef} type="file" accept=".mp4,.avi,.mov,.mkv,.webm" hidden
                onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
              />
              
              {file ? (
                <div className="flex flex-col items-center gap-4 relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-gov-light to-gov-border rounded-xl flex items-center justify-center">
                    <FileVideo size={32} className="text-gov-blue" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg text-gray-900 mb-2">{file.name}</div>
                    <div className="text-sm text-gray-500 flex items-center justify-center gap-1">
                      <HardDrive size={14} />
                      {formatBytes(file.size)}
                    </div>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); reset(); }}
                    className="mt-2 inline-flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X size={16} /> Remove File
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-gov-light to-gov-border rounded-2xl flex items-center justify-center">
                    <Upload size={40} className="text-gov-blue" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">Drop video here or <span className="text-gov-blue">browse</span></p>
                    <p className="text-sm text-gray-500 mt-2">Supported: MP4, AVI, MOV, MKV, WebM • Max 500 MB</p>
                  </div>
                </div>
              )}
            </div>

            {/* Info boxes */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Info size={18} className="text-gov-blue flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <div className="font-semibold mb-1">Processing Time</div>
                  <p>Typically 30–120 seconds for a 1-minute video</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-green-900">
                  <div className="font-semibold mb-1">Secure Upload</div>
                  <p>Your data is encrypted and securely processed</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {(errMsg || apiError) && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-slide-in-up">
            <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-red-700">
              <div className="font-semibold mb-1">Error</div>
              <p>{errMsg || apiError}</p>
            </div>
          </div>
        )}

        {/* Submit button */}
        {phase === "idle" && file && (
          <button 
            onClick={handleSubmit} 
            className="btn-primary w-full justify-center py-4 text-lg font-bold mt-6 shadow-lg hover:shadow-xl"
          >
            <Upload size={20} /> Start Violation Detection
          </button>
        )}

        {/* Progress state */}
        {(phase === "uploading" || phase === "processing") && (
          <div className="card p-8 mt-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gov-light rounded-xl flex items-center justify-center">
                <Loader2 size={24} className="text-gov-blue animate-spin" />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">{statusMsg}</div>
                <div className="text-sm text-gray-500 mt-1">Please keep this tab open</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">Overall Progress</span>
                <span className="text-sm font-bold text-gov-blue">{phase === "uploading" ? uploadPct : progress}%</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-gov-blue to-gov-mid transition-all duration-500 rounded-full shadow-lg"
                  style={{ width: `${phase === "uploading" ? uploadPct : progress}%` }}
                />
              </div>
            </div>

            {/* Stages */}
            {phase === "processing" && (
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="text-sm font-semibold text-gray-600 mb-4">Processing Stages</div>
                {STAGES.map((s, i) => (
                  <div 
                    key={s.id} 
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                      i < stageIdx 
                        ? "bg-green-50 text-green-700" 
                        : i === stageIdx 
                        ? "bg-gov-light text-gov-blue font-medium" 
                        : "bg-gray-50 text-gray-400"
                    }`}
                  >
                    {i < stageIdx
                      ? <CheckCircle size={16} />
                      : i === stageIdx
                      ? <Loader2 size={16} className="animate-spin" />
                      : <div className="w-4 h-4 rounded-full border-2 border-current" />}
                    <span className="text-sm">{s.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Done state */}
        {phase === "done" && (
          <div className="card p-12 mt-8 flex flex-col items-center gap-4 text-center bg-gradient-to-br from-green-50 to-green-100 border-green-200 animate-slide-in-up">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle size={40} className="text-green-500" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">Analysis Complete!</div>
              <p className="text-gray-600 mt-2">Redirecting to results page...</p>
            </div>
          </div>
        )}

        {/* Metadata preview */}
        {metadata && phase !== "idle" && (
          <div className="card p-6 mt-8 bg-gradient-to-br from-gray-50 to-white">
            <p className="section-title mb-4">Video Metadata</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Resolution", value: metadata.resolution },
                { label: "Duration", value: formatDuration(metadata.duration_seconds) },
                { label: "FPS", value: metadata.fps },
                { label: "Total Frames", value: metadata.total_frames },
              ].map(({ label, value }) => (
                <div key={label} className="p-3 bg-white rounded-lg border border-gray-100">
                  <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide">{label}</div>
                  <div className="text-lg font-bold text-gray-900 mt-2">{value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
