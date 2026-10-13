import React, { useState } from "react";
import { AlertTriangle, LoaderCircle, Trash2, X } from "lucide-react";

export default function DeleteAgent({ agent, onClose, onConfirm }) {
  const [deleting, setDeleting] = useState(false);
  if (!agent) return null;
  const confirm = async () => {
    setDeleting(true);
    try { await onConfirm?.(agent.id); }
    finally { setDeleting(false); }
  };
  return <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4" onMouseDown={(e) => { if (e.target === e.currentTarget && !deleting) onClose?.(); }}>
    <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-900 shadow-2xl dark:border-zinc-700 dark:bg-[#111114] dark:text-zinc-100">
      <div className="mb-4 flex items-start justify-between"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100 text-red-600"><AlertTriangle size={22}/></div><button onClick={onClose} disabled={deleting} className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"><X size={18}/></button></div>
      <h2 className="text-lg font-semibold">Delete agent?</h2>
      <p className="mt-2 text-sm text-zinc-500">This permanently deletes <strong className="text-zinc-800 dark:text-zinc-200">{agent.name || "this agent"}</strong> from the server. This action cannot be undone.</p>
      <div className="mt-6 flex justify-end gap-2"><button onClick={onClose} disabled={deleting} className="rounded-lg border px-4 py-2 text-sm dark:border-zinc-700">Cancel</button><button onClick={confirm} disabled={deleting} className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60">{deleting ? <LoaderCircle size={15} className="animate-spin"/> : <Trash2 size={15}/>}Delete permanently</button></div>
    </section>
  </div>;
}
