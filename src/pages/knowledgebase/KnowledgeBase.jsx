import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HelpCircle, Plus, Database, Folder, Clock, X } from "lucide-react";

export default function KnowledgeBase() {
  const navigate = useNavigate();
  const [bases, setBases] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [toast, setToast] = useState(null);

  // Load existing bases
  useEffect(() => {
    try {
      const raw = localStorage.getItem("ravanai_knowledge_bases");
      const parsed = raw ? JSON.parse(raw) : [];
      setBases(Array.isArray(parsed) ? parsed : []);
    } catch {
      setBases([]);
    }
  }, []);

  // ============================================================
  // CREATE HANDLER — save + navigate + auto-open Add Source
  // ============================================================
  const handleCreate = (payload) => {
    const newBase = {
      id:
        payload.name.toLowerCase().replace(/\s+/g, "-") +
        "-" +
        Date.now().toString().slice(-6),
      name: payload.name,
      uuid: generateUUID(),
      status: "READY",
      sourcesCount: 0,
      updatedAt: "Just now",
    };

    // Save to localStorage
    let existing = [];
    try {
      const raw = localStorage.getItem("ravanai_knowledge_bases");
      existing = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(existing)) existing = [];
    } catch {
      existing = [];
    }

    const updated = [newBase, ...existing];
    try {
      localStorage.setItem(
        "ravanai_knowledge_bases",
        JSON.stringify(updated)
      );
    } catch (e) {
      console.error("localStorage error:", e);
    }

    setBases(updated);
    setShowCreate(false);

    setToast("Knowledge base created");
    setTimeout(() => setToast(null), 3000);

    // ✅ Navigate with flag to auto-open Add Source modal
    setTimeout(() => {
      navigate(`/knowledge-base/${newBase.id}?addSource=true`);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
      {/* Toast */}
      {toast && (
        <div className="fixed right-6 top-6 z-[100] flex min-w-[280px] items-center gap-3 overflow-hidden rounded-xl border border-emerald-500/30 bg-white shadow-xl dark:bg-[#101012]">
          <div className="flex flex-1 items-center gap-3 px-4 py-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              {toast}
            </span>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-7">
        {/* ============ HEADER ============ */}
        <section>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
              Knowledge Base
            </h1>
            <HelpCircle size={15} className="text-zinc-400" />
          </div>

          <div className="mt-1.5 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-500">
            <span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                {bases.length}
              </span>{" "}
              knowledge base{bases.length !== 1 ? "s" : ""}
            </span>
            <span>•</span>
            <span className="font-mono text-xs"># 012854ee...681e</span>
          </div>
        </section>

        {/* ============ GRID ============ */}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {/* Create Card */}
          <button
            type="button"
            onClick={() => setShowCreate(true)}
            className="group flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-black/[0.15] bg-zinc-50 p-5 transition hover:border-cyan-500/40 hover:bg-cyan-50 dark:border-white/[0.10] dark:bg-white/[0.02] dark:hover:border-cyan-400/40 dark:hover:bg-cyan-500/[0.03]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-zinc-500 transition group-hover:bg-cyan-500/10 group-hover:text-cyan-600 dark:bg-white/[0.05] dark:group-hover:text-cyan-400">
              <Plus size={20} />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Create Knowledge Base
              </p>
              <p className="mt-0.5 text-xs text-zinc-500">
                Add sources for agents
              </p>
            </div>
          </button>

          {/* KB Cards */}
          {bases.map((base) => (
            <div
              key={base.id}
              onClick={() => navigate(`/knowledge-base/${base.id}`)}
              className="group flex min-h-[280px] cursor-pointer flex-col rounded-2xl border border-black/[0.06] bg-white p-5 transition hover:border-cyan-500/30 hover:shadow-md dark:border-white/[0.08] dark:bg-[#101012] dark:hover:border-cyan-400/30"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-500/25 bg-cyan-500/[0.06]">
                  <Database
                    size={16}
                    className="text-cyan-600 dark:text-cyan-400"
                  />
                </div>

                {base.status === "READY" && (
                  <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/[0.08] px-2 py-0.5 text-[10px] font-bold tracking-wider text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    READY
                  </span>
                )}
              </div>

              <h3 className="mt-4 truncate text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
                {base.name}
              </h3>

              <p className="mt-1 truncate font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
                {base.uuid}
              </p>

              <div className="mt-4 border-t border-black/[0.06] dark:border-white/[0.06]" />

              <div className="mt-auto flex items-center justify-between pt-4">
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                  <Folder size={12} />
                  <span>
                    {base.sourcesCount || 0} source
                    {base.sourcesCount !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-500">
                  <Clock size={11} />
                  <span>{base.updatedAt}</span>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Create Modal */}
      {showCreate && (
        <CreateKnowledgeBaseModal
          onClose={() => setShowCreate(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}

// ============================================================
// CREATE MODAL
// ============================================================

function CreateKnowledgeBaseModal({ onClose, onCreate }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate({ name: name.trim() });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-[560px] overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-2xl dark:border-white/[0.08] dark:bg-[#101012]">
        <div className="flex items-start justify-between gap-4 px-6 pt-6">
          <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Create Knowledge Base
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="mt-0.5 rounded-md p-1 text-zinc-500 transition hover:bg-black/[0.05] hover:text-zinc-800 dark:hover:bg-white/[0.06]"
          >
            <X size={16} />
          </button>
        </div>

        <p className="mt-2 px-6 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          A knowledge base stores information your AI agents can reference
          during calls.
        </p>

        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-5">
          <label
            htmlFor="kb-name"
            className="mb-1.5 block text-[12px] font-medium text-zinc-700 dark:text-zinc-300"
          >
            Name
          </label>
          <input
            id="kb-name"
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Product Support KB"
            required
            className="h-10 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-cyan-400"
          />

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-black/[0.04] dark:text-zinc-300 dark:hover:bg-white/[0.05]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-cyan-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-cyan-400 active:scale-[0.98] dark:bg-cyan-400 dark:text-slate-950"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================================
// HELPER
// ============================================================

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}