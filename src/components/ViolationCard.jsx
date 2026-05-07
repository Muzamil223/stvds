import React, { useState } from "react";
import { Clock, AlertTriangle, Smartphone, Users, HardHat, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

const VIOLATION_META = {
  "No Helmet":          { icon: HardHat,      color: "text-red-600",   bg: "bg-red-50",   border: "border-red-200" },
  "Triple Riding":      { icon: Users,        color: "text-red-600",   bg: "bg-red-50",   border: "border-red-200" },
  "Mobile Phone Usage": { icon: Smartphone,   color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
};

function SeverityBadge({ severity }) {
  if (severity === "High")
    return <span className="badge-high">High</span>;
  if (severity === "Medium")
    return <span className="badge-medium">Medium</span>;
  return <span className="badge-low">Low</span>;
}

export default function ViolationCard({ record, jobId, index }) {
  const [expanded, setExpanded] = useState(false);

  const imageUrl = `http://localhost:5000/api/results/${jobId}/images/${record.evidence_image}`;

  return (
    <div className={`card overflow-hidden transition-shadow hover:shadow-md`}>
      {/* Header row */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/60">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <AlertTriangle size={15} className="text-red-500" />
          <span>Incident #{String(index + 1).padStart(3, "0")}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock size={12} />
          <span className="font-mono">{record.timestamp}</span>
          <SeverityBadge severity={record.max_severity} />
        </div>
      </div>

      {/* Violations list */}
      <div className="px-4 py-3 space-y-2">
        {record.violations.map((v, i) => {
          const meta = VIOLATION_META[v.type] || { icon: AlertTriangle, color: "text-gray-600", bg: "bg-gray-50", border: "border-gray-200" };
          const Icon = meta.icon;
          return (
            <div key={i} className={`flex items-start gap-3 p-2.5 rounded border ${meta.bg} ${meta.border}`}>
              <Icon size={16} className={`mt-0.5 flex-shrink-0 ${meta.color}`} />
              <div>
                <div className={`text-sm font-semibold ${meta.color}`}>{v.type}</div>
                {v.detail && <div className="text-xs text-gray-500 mt-0.5">{v.detail}</div>}
              </div>
              <SeverityBadge severity={v.severity} />
            </div>
          );
        })}
      </div>

      {/* Evidence toggle */}
      <div className="px-4 pb-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs font-medium text-gov-blue hover:text-gov-mid transition-colors"
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {expanded ? "Hide evidence" : "View evidence image"}
        </button>

        {expanded && (
          <div className="mt-3 space-y-2">
            <img
              src={imageUrl}
              alt={`Evidence frame ${record.frame_index}`}
              className="w-full rounded border border-gray-200 object-contain max-h-72"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-gov-blue hover:underline"
            >
              <ExternalLink size={11} /> Open full image
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
