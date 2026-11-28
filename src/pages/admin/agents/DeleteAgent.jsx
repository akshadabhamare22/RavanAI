// import React, { useState } from "react";
// import { AlertTriangle, LoaderCircle, Trash2, X } from "lucide-react";

// export default function DeleteAgent({ agent, onClose, onConfirm }) {
//   const [deleting, setDeleting] = useState(false);
//   if (!agent) return null;
//   const confirm = async () => {
//     setDeleting(true);
//     try { await onConfirm?.(agent.id); }
//     finally { setDeleting(false); }
//   };
//   return <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4" onMouseDown={(e) => { if (e.target === e.currentTarget && !deleting) onClose?.(); }}>
//     <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-900 shadow-2xl dark:border-zinc-700 dark:bg-[#111114] dark:text-zinc-100">
//       <div className="mb-4 flex items-start justify-between"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100 text-red-600"><AlertTriangle size={22}/></div><button onClick={onClose} disabled={deleting} className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"><X size={18}/></button></div>
//       <h2 className="text-lg font-semibold">Delete agent?</h2>
//       <p className="mt-2 text-sm text-zinc-500">This permanently deletes <strong className="text-zinc-800 dark:text-zinc-200">{agent.name || "this agent"}</strong> from the server. This action cannot be undone.</p>
//       <div className="mt-6 flex justify-end gap-2"><button onClick={onClose} disabled={deleting} className="rounded-lg border px-4 py-2 text-sm dark:border-zinc-700">Cancel</button><button onClick={confirm} disabled={deleting} className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60">{deleting ? <LoaderCircle size={15} className="animate-spin"/> : <Trash2 size={15}/>}Delete permanently</button></div>
//     </section>
//   </div>;
// }



import React from "react";
import { AlertTriangle, Loader2, X, Trash2 } from "lucide-react";

const DeleteAgent = ({ agent, loading = false, onClose, onConfirm }) => {
  if (!agent) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-[420px] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#151619]">
        <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4 dark:border-white/[0.07]">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
              <AlertTriangle size={18} />
            </div>
            <h2 className="text-sm font-bold">Delete Agent</h2>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 disabled:opacity-50 dark:hover:bg-white/5"
          >
            <X size={17} />
          </button>
        </div>

        <div className="px-5 py-5">
          <p className="text-sm text-zinc-600 dark:text-zinc-300">
            Are you sure you want to delete{" "}
            <strong className="text-zinc-900 dark:text-white">
              {agent.name || "this agent"}
            </strong>
            ?
          </p>

          <p className="mt-2 text-xs leading-relaxed text-zinc-500">
            This action cannot be undone. The backend may prevent deletion if
            this agent already has call history.
          </p>
        </div>

        <div className="flex justify-end gap-2 border-t border-zinc-100 px-5 py-4 dark:border-white/[0.07]">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-zinc-200 px-4 py-2.5 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 disabled:opacity-50 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/5"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-xs font-semibold text-white hover:bg-red-400 disabled:opacity-60"
          >
            {loading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Trash2 size={14} />
            )}
            {loading ? "Deleting..." : "Delete Agent"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAgent;
