import React, { useEffect, useState } from "react";
import { X, LoaderCircle, Pencil, Trash2, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";
import agentsApi from "./agentsApi";

const pretty = (value) => {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  return String(value);
};

export default function AgentDetails({ agent, onClose, onEdit, onDelete }) {
  const [details, setDetails] = useState(agent || null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!agent?.id) return;
    setLoading(true);
    try {
      const result = await agentsApi.getById(agent.id);
      setDetails(result);
    } catch (error) {
      toast.error(error?.response?.data?.detail || error?.response?.data?.message || "Could not load agent details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { setDetails(agent || null); load(); /* load when selected agent changes */ }, [agent?.id]);

  if (!agent) return null;
  const data = details || agent;
  const rows = [
    ["Agent ID", data.id], ["Status", data.status], ["Client ID", data.client_id],
    ["Model", data.llm_model || data.model?.id || data.agent_metadata?.builder?.model_name],
    ["Voice", data.voice?.id || data.voice || data.agent_metadata?.builder?.voice_name],
    ["Timezone", data.timezone], ["Welcome message", data.welcome_message],
    ["Memory enabled", data.memory_enabled], ["Emotion", data.emotion], ["Accent", data.accent],
    ["Total calls", data.total_calls], ["Created", data.created_at], ["Updated", data.updated_at],
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose?.(); }}>
      <section className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-zinc-200 bg-white text-zinc-900 shadow-2xl dark:border-zinc-700 dark:bg-[#111114] dark:text-zinc-100">
        <header className="flex items-center justify-between border-b border-zinc-200 p-5 dark:border-zinc-800">
          <div><h2 className="text-lg font-semibold">{data.name || "Agent details"}</h2><p className="mt-1 text-xs text-zinc-500">Full details loaded from GET /agents/{'{agent_id}'}</p></div>
          <div className="flex gap-2">
            <button onClick={load} disabled={loading} className="rounded-lg border p-2 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800" title="Refresh"><RefreshCw size={16} className={loading ? "animate-spin" : ""}/></button>
            <button onClick={onClose} className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800" aria-label="Close"><X size={18}/></button>
          </div>
        </header>
        <div className="max-h-[65vh] overflow-y-auto p-5">
          {loading && <p className="mb-3 flex items-center gap-2 text-sm text-zinc-500"><LoaderCircle size={16} className="animate-spin"/>Loading latest details…</p>}
          <div className="grid gap-3 sm:grid-cols-2">
            {rows.map(([label, value]) => <div key={label} className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800"><p className="mb-1 text-xs text-zinc-500">{label}</p><p className="break-words text-sm">{pretty(value)}</p></div>)}
          </div>
          <div className="mt-4 rounded-xl border border-zinc-200 p-3 dark:border-zinc-800"><p className="mb-2 text-xs text-zinc-500">System prompt</p><pre className="whitespace-pre-wrap break-words text-sm">{pretty(data.system_prompt)}</pre></div>
        </div>
        <footer className="flex justify-end gap-2 border-t border-zinc-200 p-4 dark:border-zinc-800">
          <button onClick={() => onDelete?.(data)} className="inline-flex items-center gap-2 rounded-lg border border-red-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50"><Trash2 size={15}/>Delete</button>
          <button onClick={() => onEdit?.(data)} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"><Pencil size={15}/>Edit agent</button>
        </footer>
      </section>
    </div>
  );
}
