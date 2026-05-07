import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AlertTriangle, HardHat, Smartphone, Users, FileText, Download, Loader2, ChevronLeft, CheckCircle } from "lucide-react";
import ViolationCard from "../components/ViolationCard";
import StatCard from "../components/StatCard";
import { useApi } from "../hooks/useApi";

function downloadJSON(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

export default function Results() {
  const { jobId }                   = useParams();
  const { getResults }              = useApi();
  const [report,   setReport]       = useState(null);
  const [loading,  setLoading]      = useState(true);
  const [error,    setError]        = useState(null);
  const [filter,   setFilter]       = useState("All");

  useEffect(() => {
    setLoading(true);
    getResults(jobId)
      .then((r) => { setReport(r); setLoading(false); })
      .catch((e) => { setError(e.response?.data?.error || e.message); setLoading(false); });
  }, [jobId]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
      <Loader2 size={32} className="animate-spin text-gov-blue" />
      <span className="text-sm">Loading report…</span>
    </div>
  );

  if (error) return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <AlertTriangle size={36} className="text-red-400 mx-auto mb-3" />
      <div className="text-sm font-medium text-gray-700 mb-1">Report not found</div>
      <div className="text-xs text-gray-400 mb-6">{error}</div>
      <Link to="/upload" className="btn-primary">← Upload New Video</Link>
    </div>
  );

  const { summary, records, generated_at } = report;
  const FILTERS = ["All", "No Helmet", "Triple Riding", "Mobile Phone Usage"];

  const filtered = filter === "All"
    ? records
    : records.filter((r) => r.violations.some((v) => v.type === filter));

  const isClean = summary.total_violations === 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <Link to="/upload" className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gov-blue mb-6">
        <ChevronLeft size={13} /> New Analysis
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="section-title">Violation Report</div>
          <h1 className="text-2xl font-bold text-gray-800">Analysis Results</h1>
          <p className="text-xs text-gray-400 mt-1 font-mono">
            Job ID: {jobId} · Generated: {new Date(generated_at).toLocaleString()}
          </p>
        </div>
        <button
          onClick={() => downloadJSON(report, `stvds_report_${jobId.slice(0, 8)}.json`)}
          className="btn-outline text-xs self-start"
        >
          <Download size={14} /> Export JSON
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total Violations"    value={summary.total_violations}    icon={AlertTriangle} color="text-red-500" />
        <StatCard label="No Helmet"           value={summary.no_helmet_count}     icon={HardHat}       color="text-red-500" />
        <StatCard label="Triple Riding"       value={summary.triple_riding_count} icon={Users}         color="text-red-500" />
        <StatCard label="Phone Usage"         value={summary.phone_usage_count}   icon={Smartphone}    color="text-amber-500" />
      </div>

      {/* Clean report */}
      {isClean ? (
        <div className="card p-12 flex flex-col items-center gap-3 text-center">
          <CheckCircle size={40} className="text-green-500" />
          <h3 className="text-lg font-semibold text-gray-800">No Violations Detected</h3>
          <p className="text-sm text-gray-400 max-w-xs">
            The analyzed footage appears compliant. No helmet, triple riding, or phone usage violations were found.
          </p>
        </div>
      ) : (
        <>
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors
                  ${filter === f
                    ? "bg-gov-navy text-white border-gov-navy"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gov-blue hover:text-gov-blue"}`}
              >
                {f}
                {f !== "All" && (
                  <span className="ml-1.5 opacity-60">
                    ({records.filter((r) => r.violations.some((v) => v.type === f)).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Violation cards grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-sm">No records match this filter.</div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {filtered.map((record, i) => (
                <ViolationCard key={record.frame_index} record={record} jobId={jobId} index={i} />
              ))}
            </div>
          )}

          {/* Summary footer */}
          <div className="mt-8 card p-4 flex items-center gap-3 bg-gray-50/80">
            <FileText size={16} className="text-gray-400" />
            <div className="text-xs text-gray-500">
              Analyzed <strong>{summary.total_violation_frames}</strong> violation frames out of total extracted frames.
              Model: <span className="font-mono">YOLOv8n</span> · Confidence threshold: 0.40
            </div>
          </div>
        </>
      )}
    </div>
  );
}
