
import React from "react";
import {
  X,
  ShieldCheck,
  CalendarDays,
  User,
  Building2,
  FileText,
  Hash,
  Activity,
} from "lucide-react";

const formatDate = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "—";

  return parsedDate.toLocaleString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

const formatDetails = (details) => {
  if (details === null || details === undefined) {
    return "No additional details available.";
  }

  if (typeof details === "string") {
    try {
      return JSON.stringify(JSON.parse(details), null, 2);
    } catch {
      return details;
    }
  }

  try {
    return JSON.stringify(details, null, 2);
  } catch {
    return String(details);
  }
};

const DetailItem = ({ icon: Icon, label, value, mono = false }) => (
  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-zinc-800 dark:bg-[#191C1F]">
    <div className="mb-2 flex items-center gap-2 text-slate-500 dark:text-zinc-400">
      <Icon size={15} />
      <span className="text-xs font-medium">{label}</span>
    </div>

    <p
      className={`break-all text-sm font-medium text-slate-800 dark:text-zinc-100 ${
        mono ? "font-mono text-xs" : ""
      }`}
    >
      {value || "—"}
    </p>
  </div>
);

const ViewAuditLog = ({ log, onClose }) => {
  if (!log) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-5"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-[#111315]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-[#111315]">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#275982]/10 p-2.5 text-[#275982] dark:bg-[#275982]/20 dark:text-blue-300">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-100">
                Audit Log Details
              </h2>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-zinc-400">
                Complete record information
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-[#191C1F] dark:hover:text-white"
            aria-label="Close details"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 p-5">

          {/* Action */}
          <div className="rounded-xl border border-[#275982]/20 bg-[#275982]/5 p-4 dark:bg-[#275982]/10">
            <div className="flex items-center gap-2 text-[#275982] dark:text-blue-300">
              <Activity size={17} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Recorded Action
              </span>
            </div>

            <h3 className="mt-2 break-all text-xl font-bold text-slate-900 dark:text-zinc-100">
              {log.action || "Unknown action"}
            </h3>
          </div>

          {/* Details grid */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-800 dark:text-zinc-200">
              Record Information
            </h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <DetailItem
                icon={Hash}
                label="Audit Log ID"
                value={log.id}
                mono
              />

              <DetailItem
                icon={CalendarDays}
                label="Created At"
                value={formatDate(log.created_at)}
              />

              <DetailItem
                icon={User}
                label="Actor ID"
                value={log.actor_id}
                mono
              />

              <DetailItem
                icon={Building2}
                label="Organization ID"
                value={log.client_id || "Platform-level action"}
                mono
              />

              <DetailItem
                icon={FileText}
                label="Target Type"
                value={log.target_type}
              />

              <DetailItem
                icon={Hash}
                label="Target ID"
                value={log.target_id}
                mono
              />
            </div>
          </div>

          {/* Additional details */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <FileText size={17} className="text-[#275982]" />
              <h3 className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                Additional Details
              </h3>
            </div>

            <pre className="max-h-80 overflow-auto whitespace-pre-wrap break-words rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs leading-6 text-slate-700 dark:border-zinc-800 dark:bg-[#191C1F] dark:text-zinc-300">
              {formatDetails(log.details)}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-200 p-5 dark:border-zinc-800">
          <button
            onClick={onClose}
            className="rounded-lg bg-[#275982] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1f486b]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAuditLog;
