import React from "react";

export default function StatCard({ label, value, icon: Icon, color = "text-gov-blue", sub }) {
  return (
    <div className="card p-4 flex items-center gap-4">
      <div className={`p-2.5 rounded-lg bg-gray-100 ${color}`}>
        <Icon size={20} />
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-800">{value}</div>
        <div className="text-xs font-medium text-gray-500">{label}</div>
        {sub && <div className="text-[10px] text-gray-400 mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}
