import React from "react";
import { AlertTriangle } from "lucide-react";

export default function DeleteAgent({ agent, onClose, onConfirm }) {
  if (!agent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-2xl dark:border-white/[0.08] dark:bg-[#101012]">
        <div className="p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
            <AlertTriangle
              size={22}
              className="text-red-500 dark:text-red-400"
            />
          </div>

          <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Delete agent
          </h3>

          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Are you sure you want to delete{" "}
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              "{agent.name}"
            </span>
            ? This action cannot be undone.
          </p>
        </div>

        <div className="flex items-center gap-2 border-t border-black/[0.06] p-4 dark:border-white/[0.06]">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-black/[0.08] py-2.5 text-sm font-medium text-zinc-700 dark:border-white/[0.08] dark:text-zinc-300"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(agent.id)}
            className="flex-1 rounded-lg bg-red-500 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}