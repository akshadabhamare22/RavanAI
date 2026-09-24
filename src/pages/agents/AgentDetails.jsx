import React from "react";
import { Pencil, Trash2, X } from "lucide-react";

export default function AgentDetails({ agent, onClose, onEdit, onDelete }) {
  if (!agent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-2xl dark:border-white/[0.08] dark:bg-[#101012]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-4 dark:border-white/[0.06]">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Agent Details
          </h3>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-zinc-500 transition hover:bg-black/[0.05] dark:hover:bg-white/[0.06]"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/[0.08] text-sm font-bold text-cyan-600 dark:text-cyan-400">
              {agent.initials}
            </div>
            <div>
              <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {agent.name}
              </h4>
              <p className="text-xs text-zinc-500">{agent.type}</p>
            </div>
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {agent.description}
          </p>

          <div className="grid grid-cols-2 gap-3 rounded-lg border border-black/[0.06] bg-zinc-50/50 p-4 text-xs dark:border-white/[0.06] dark:bg-white/[0.02]">
            <DetailRow label="Model" value={agent.model} />
            <DetailRow label="Voice" value={agent.voice} />
            <DetailRow label="Status" value={agent.status} />
            <DetailRow label="Type" value={agent.type} />
            <DetailRow label="Updated" value={agent.updated} />
            <DetailRow label="Created" value={agent.created} />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 border-t border-black/[0.06] px-5 py-4 dark:border-white/[0.06]">
          <button
            onClick={() => onDelete(agent)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500/[0.08] dark:text-red-400"
          >
            <Trash2 size={14} />
            Delete
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="rounded-lg border border-black/[0.08] px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:text-zinc-300 dark:hover:bg-white/[0.04]"
            >
              Close
            </button>
            <button
              onClick={() => onEdit(agent)}
              className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-400 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
            >
              <Pencil size={14} />
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-wide text-zinc-500">
        {label}
      </p>
      <p className="mt-1 text-xs font-medium text-zinc-800 dark:text-zinc-200">
        {value}
      </p>
    </div>
  );
}