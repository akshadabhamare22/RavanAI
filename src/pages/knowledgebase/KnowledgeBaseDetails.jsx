import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Trash2,
  Plus,
  Type,
  Globe,
  Upload,
  X,
  Folder,
  Search,
  Sparkles,
  Send,
} from "lucide-react";

export default function KnowledgeBaseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [kb, setKb] = useState(null);
  const [sources, setSources] = useState([]);
  const [showAddSource, setShowAddSource] = useState(false);
  const [activeTab, setActiveTab] = useState("sources");
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null);
  const [question, setQuestion] = useState("");

  // Load KB + Sources
  useEffect(() => {
    let bases = [];
    try {
      const raw = localStorage.getItem("ravanai_knowledge_bases");
      const parsed = raw ? JSON.parse(raw) : [];
      bases = Array.isArray(parsed) ? parsed : [];
    } catch {
      bases = [];
    }

    const found = bases.find((b) => b.id === id);

    setKb(
      found || {
        id: id || "",
        name: id || "Untitled",
        uuid: id || "",
        status: "READY",
        sourcesCount: 0,
      }
    );

    let storedSources = [];
    try {
      const raw = localStorage.getItem(`ravanai_kb_sources_${id}`);
      const parsed = raw ? JSON.parse(raw) : [];
      storedSources = Array.isArray(parsed) ? parsed : [];
    } catch {
      storedSources = [];
    }

    setSources(storedSources);
  }, [id]);

  // Auto-open Add Source if ?addSource=true
  useEffect(() => {
    if (searchParams.get("addSource") === "true") {
      setShowAddSource(true);
      searchParams.delete("addSource");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  // ============================================================
  // Header events
  // ============================================================
  useEffect(() => {
    const handleAddSource = () => setShowAddSource(true);

    const handleDelete = () => {
      if (
        window.confirm("Are you sure you want to delete this knowledge base?")
      ) {
        try {
          const raw = localStorage.getItem("ravanai_knowledge_bases");
          const bases = JSON.parse(raw || "[]");
          const filtered = Array.isArray(bases)
            ? bases.filter((b) => b.id !== id)
            : [];
          localStorage.setItem(
            "ravanai_knowledge_bases",
            JSON.stringify(filtered)
          );
          localStorage.removeItem(`ravanai_kb_sources_${id}`);
        } catch (e) {
          console.error(e);
        }
        navigate("/knowledge-base");
      }
    };

    const handleRefresh = () => {
      try {
        const raw = localStorage.getItem(`ravanai_kb_sources_${id}`);
        const parsed = raw ? JSON.parse(raw) : [];
        setSources(Array.isArray(parsed) ? parsed : []);
      } catch {
        setSources([]);
      }
      setToast("Refreshed");
      setTimeout(() => setToast(null), 2000);
    };

    const handleClearCache = () => {
      setToast("Cache cleared");
      setTimeout(() => setToast(null), 2000);
    };

    const handleExclusions = () => {
      setToast("Exclusions opened");
      setTimeout(() => setToast(null), 2000);
    };

    window.addEventListener("kb-add-source", handleAddSource);
    window.addEventListener("kb-delete", handleDelete);
    window.addEventListener("kb-refresh", handleRefresh);
    window.addEventListener("kb-clear-cache", handleClearCache);
    window.addEventListener("kb-exclusions", handleExclusions);

    return () => {
      window.removeEventListener("kb-add-source", handleAddSource);
      window.removeEventListener("kb-delete", handleDelete);
      window.removeEventListener("kb-refresh", handleRefresh);
      window.removeEventListener("kb-clear-cache", handleClearCache);
      window.removeEventListener("kb-exclusions", handleExclusions);
    };
  }, [id, navigate]);

  // Sync sources count to parent
  const syncSourcesCount = (count) => {
    try {
      const raw = localStorage.getItem("ravanai_knowledge_bases");
      const bases = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(bases)) return;

      const updated = bases.map((b) =>
        b.id === id ? { ...b, sourcesCount: count, updatedAt: "Just now" } : b
      );

      localStorage.setItem("ravanai_knowledge_bases", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddSources = (newSources) => {
    const updated = [...sources, ...newSources];
    setSources(updated);

    try {
      localStorage.setItem(
        `ravanai_kb_sources_${id}`,
        JSON.stringify(updated)
      );
    } catch (e) {
      console.error(e);
    }

    syncSourcesCount(updated.length);

    setShowAddSource(false);
    setToast("Sources added — indexing starting");
    setTimeout(() => setToast(null), 3000);
  };

  const handleRemoveSource = (sourceId) => {
    const updated = sources.filter((s) => s.id !== sourceId);
    setSources(updated);
    try {
      localStorage.setItem(
        `ravanai_kb_sources_${id}`,
        JSON.stringify(updated)
      );
    } catch (e) {
      console.error(e);
    }
    syncSourcesCount(updated.length);
  };

  const handleAsk = (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    setToast("Playground is a demo — connect to your RAG API");
    setTimeout(() => setToast(null), 3000);
    setQuestion("");
  };

  const filteredSources = sources.filter((s) =>
    (s.title || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const suggestedQuestions = [
    "What services do you offer?",
    "Tell me about pricing",
    "How can I get support?",
  ];

  return (
    <div className="min-h-screen  bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
      {/* Toast */}
      {toast && (
        <div className="fixed right-6 top-24 z-[100] flex min-w-[300px] items-center gap-3 overflow-hidden rounded-xl border border-emerald-500/30 bg-white shadow-xl dark:bg-[#101012]">
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
        {/* BACK LINK + STATUS */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => navigate("/knowledge-base")}
            className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 transition hover:text-zinc-800 dark:hover:text-zinc-300"
          >
            <ArrowLeft size={13} />
            All Knowledge Bases
          </button>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/[0.08] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              READY
            </span>
            <span className="text-zinc-500">
              {sources.length} source{sources.length !== 1 ? "s" : ""}
            </span>
            <span className="text-zinc-400">Updated Just now</span>
          </div>
        </div>

        {/* TABS */}
        <div className="flex items-center gap-1 border-b border-black/[0.06] pb-2 dark:border-white/[0.06]">
          <button
            onClick={() => setActiveTab("sources")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-medium transition ${
              activeTab === "sources"
                ? "bg-white text-zinc-900 shadow-sm dark:bg-[#17171A] dark:text-white"
                : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
          >
            <Folder size={13} />
            Sources
            <span className="rounded bg-black/[0.06] px-1.5 py-0.5 text-[10px] font-semibold dark:bg-white/[0.08]">
              {sources.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("playground")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-medium transition ${
              activeTab === "playground"
                ? "bg-white text-zinc-900 shadow-sm dark:bg-[#17171A] dark:text-white"
                : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
          >
            <Sparkles size={13} />
            Playground
          </button>
        </div>

        {/* SOURCES TAB */}
        {activeTab === "sources" && (
          <section className="space-y-4">
            <div className="flex h-10 w-full max-w-md items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-sm text-zinc-500 dark:border-white/[0.08] dark:bg-[#101012]">
              <Search size={14} />
              <input
                type="text"
                placeholder="Search sources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="min-w-0 flex-1 bg-transparent text-[13px] text-zinc-800 outline-none placeholder:text-zinc-500 dark:text-zinc-200"
              />
            </div>

            <div className="overflow-hidden rounded-xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">
              {filteredSources.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-sm text-zinc-500">
                    No sources added yet.
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">
                    Add text, URLs, or files for your agents to reference.
                  </p>
                  <button
                    onClick={() => setShowAddSource(true)}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-cyan-500 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-cyan-400 dark:bg-cyan-400 dark:text-slate-950"
                  >
                    <Plus size={12} />
                    Add Source
                  </button>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="border-b border-black/[0.06] dark:border-white/[0.06]">
                    <tr>
                      <th className="w-10 px-5 py-3">
                        <input
                          type="checkbox"
                          className="h-3.5 w-3.5 accent-cyan-500"
                        />
                      </th>
                      <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                        Source
                      </th>
                      <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                        Type
                      </th>
                      <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                        Status
                      </th>
                      <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                        Added
                      </th>
                      <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSources.map((source) => (
                      <tr
                        key={source.id}
                        className="border-b border-black/[0.04] last:border-0 dark:border-white/[0.04]"
                      >
                        <td className="px-5 py-4">
                          <input
                            type="checkbox"
                            className="h-3.5 w-3.5 accent-cyan-500"
                          />
                        </td>
                        <td className="px-3 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-cyan-500/[0.08]">
                              {source.type === "text" && (
                                <Type
                                  size={13}
                                  className="text-cyan-600 dark:text-cyan-400"
                                />
                              )}
                              {source.type === "url" && (
                                <Globe
                                  size={13}
                                  className="text-cyan-600 dark:text-cyan-400"
                                />
                              )}
                              {source.type === "file" && (
                                <Upload
                                  size={13}
                                  className="text-cyan-600 dark:text-cyan-400"
                                />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
                                {source.title}
                              </p>
                              <p className="truncate font-mono text-[10px] text-zinc-400">
                                {source.uuid || "-"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-4">
                          <span className="rounded border border-black/[0.08] bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-600 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-zinc-400">
                            {source.type}
                          </span>
                        </td>
                        <td className="px-3 py-4">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/[0.08] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                            COMPLETE
                          </span>
                        </td>
                        <td className="px-3 py-4 text-[12px] text-zinc-500">
                          {source.added}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button
                            onClick={() => handleRemoveSource(source.id)}
                            className="rounded-md p-1.5 text-zinc-400 transition hover:bg-red-500/[0.08] hover:text-red-500"
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        )}

        {/* PLAYGROUND TAB */}
        {activeTab === "playground" && (
          <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">
            <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-4 dark:border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-cyan-500/25 bg-cyan-500/[0.06]">
                  <Sparkles
                    size={14}
                    className="text-cyan-600 dark:text-cyan-400"
                  />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
                    Knowledge Playground
                  </p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-zinc-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {kb?.name || id}
                  </p>
                </div>
              </div>
              <button className="text-[12px] font-medium text-zinc-500 transition hover:text-zinc-800 dark:hover:text-zinc-200">
                Clear
              </button>
            </div>

            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-black/[0.06] bg-zinc-50 dark:border-white/[0.08] dark:bg-white/[0.02]">
                <Sparkles
                  size={26}
                  className="text-zinc-400 dark:text-zinc-500"
                />
              </div>

              <h3 className="mt-5 text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
                Test Your Knowledge Base
              </h3>

              <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-zinc-500">
                This is a RAG query. The testing playground doesn't use any
                agents—it's only meant for quickly checking and understanding
                the information stored in the knowledge base.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuestion(q)}
                    className="rounded-full border border-black/[0.08] bg-white px-3.5 py-1.5 text-[12px] font-medium text-zinc-600 transition hover:border-cyan-500/40 hover:bg-cyan-500/[0.05] hover:text-cyan-600 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-400 dark:hover:text-cyan-400"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <form
              onSubmit={handleAsk}
              className="border-t border-black/[0.06] p-4 dark:border-white/[0.06]"
            >
              <div className="flex items-center gap-2 rounded-xl border border-black/[0.08] bg-white px-4 py-2.5 dark:border-white/[0.08] dark:bg-[#0e0f12]">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask a question..."
                  className="min-w-0 flex-1 bg-transparent text-[13px] text-zinc-900 outline-none placeholder:text-zinc-500 dark:text-zinc-100"
                />
                <button
                  type="submit"
                  disabled={!question.trim()}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500 text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-zinc-300 dark:bg-cyan-400 dark:text-slate-950 dark:disabled:bg-zinc-700"
                >
                  <Send size={13} />
                </button>
              </div>
            </form>
          </section>
        )}
      </main>

      {/* ADD SOURCE MODAL */}
      {showAddSource && (
        <AddSourceModal
          onClose={() => setShowAddSource(false)}
          onSave={handleAddSources}
        />
      )}
    </div>
  );
}

// ============================================================
// ADD SOURCE MODAL
// ============================================================

function AddSourceModal({ onClose, onSave }) {
  const [tab, setTab] = useState("text");
  const [entries, setEntries] = useState([{ id: 1, title: "", content: "" }]);
  const [urlInput, setUrlInput] = useState("");
  const [urls, setUrls] = useState([]);
  const [files, setFiles] = useState([]);

  const addEntry = () => {
    setEntries((prev) => [...prev, { id: Date.now(), title: "", content: "" }]);
  };

  const updateEntry = (id, key, value) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [key]: value } : e))
    );
  };

  const addUrl = () => {
    if (!urlInput.trim()) return;
    setUrls((prev) => [...prev, urlInput.trim()]);
    setUrlInput("");
  };

  const handleFileSelect = (e) => {
    const selected = Array.from(e.target.files || []);
    setFiles((prev) => [
      ...prev,
      ...selected.map((f) => ({ name: f.name, size: f.size })),
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    let newSources = [];

    if (tab === "text") {
      const filled = entries.filter((entry) => entry.title.trim());
      if (filled.length === 0) return;
      newSources = filled.map((entry) => ({
        id: `src-${Date.now()}-${entry.id}`,
        title: entry.title,
        type: "text",
        status: "COMPLETE",
        added: now,
        uuid: generateUUID(),
      }));
    } else if (tab === "url") {
      if (urls.length === 0) return;
      newSources = urls.map((url, i) => ({
        id: `src-${Date.now()}-${i}`,
        title: url.replace(/^https?:\/\//, ""),
        type: "url",
        status: "COMPLETE",
        added: now,
        uuid: generateUUID(),
      }));
    } else if (tab === "file") {
      if (files.length === 0) return;
      newSources = files.map((f, i) => ({
        id: `src-${Date.now()}-${i}`,
        title: f.name,
        type: "file",
        status: "COMPLETE",
        added: now,
        uuid: generateUUID(),
      }));
    }

    onSave(newSources);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative flex max-h-[90vh] w-full max-w-[640px] flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-2xl dark:border-white/[0.08] dark:bg-[#101012]">
        <div className="flex items-start justify-between gap-4 px-6 pt-6">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Add Source
            </h3>
            <p className="mt-1 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              Add content to your knowledge base for AI agent reference.
            </p>
          </div>
          <button
            onClick={onClose}
            className="mt-0.5 rounded-md p-1 text-zinc-500 transition hover:bg-black/[0.05] hover:text-zinc-800 dark:hover:bg-white/[0.06]"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mt-5 px-6">
          <div className="flex rounded-lg border border-black/[0.08] bg-zinc-100 p-1 dark:border-white/[0.08] dark:bg-[#17171A]">
            {[
              { key: "text", label: "Text", icon: Type },
              { key: "url", label: "URL", icon: Globe },
              { key: "file", label: "File", icon: Upload },
            ].map((t) => {
              const Icon = t.icon;
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-[13px] font-medium transition ${
                    active
                      ? "bg-white font-semibold text-zinc-900 shadow-sm dark:bg-[#25262B] dark:text-white"
                      : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                  }`}
                >
                  <Icon size={13} />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="thin-scroll flex-1 overflow-y-auto px-6 py-5"
        >
          {tab === "text" && (
            <div className="space-y-5">
              {entries.map((entry, idx) => (
                <div key={entry.id} className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
                      Title
                    </label>
                    <input
                      type="text"
                      value={entry.title}
                      onChange={(e) =>
                        updateEntry(entry.id, "title", e.target.value)
                      }
                      placeholder="e.g. Company FAQ"
                      className="h-10 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
                      Content
                    </label>
                    <textarea
                      rows={7}
                      value={entry.content}
                      onChange={(e) =>
                        updateEntry(entry.id, "content", e.target.value)
                      }
                      placeholder="Paste your text content here..."
                      className="w-full resize-none rounded-lg border border-black/[0.08] bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-cyan-400"
                    />
                  </div>

                  {idx === entries.length - 1 && (
                    <button
                      type="button"
                      onClick={addEntry}
                      className="flex items-center gap-1.5 rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-[12px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-300 dark:hover:bg-white/[0.04]"
                    >
                      <Plus size={12} />
                      Add Another Text Entry
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {tab === "url" && (
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
                  URL
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex h-10 flex-1 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 dark:border-white/[0.08] dark:bg-[#0e0f12]">
                    <Globe size={14} className="text-zinc-400" />
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://docs.example.com"
                      className="min-w-0 flex-1 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addUrl}
                    className="flex h-10 items-center gap-1.5 rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-300"
                  >
                    <Plus size={12} />
                    Add
                  </button>
                  <button
                    type="button"
                    className="flex h-10 items-center gap-1.5 rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] font-medium text-cyan-600 transition hover:bg-cyan-500/[0.05] dark:border-white/[0.08] dark:bg-transparent dark:text-cyan-400"
                  >
                    <span className="text-cyan-500">⌐</span>
                    Scan
                  </button>
                </div>
              </div>

              {urls.length > 0 && (
                <div className="space-y-2">
                  {urls.map((url, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-2 rounded-lg border border-black/[0.06] bg-zinc-50 px-3 py-2.5 dark:border-white/[0.06] dark:bg-white/[0.02]"
                    >
                      <span className="truncate text-[12px] text-zinc-700 dark:text-zinc-300">
                        {url}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setUrls((prev) => prev.filter((_, idx) => idx !== i))
                        }
                        className="rounded p-1 text-zinc-400 hover:text-red-500"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "file" && (
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
                  Upload File
                </label>
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-black/[0.15] bg-zinc-50 py-10 transition hover:border-cyan-500/40 hover:bg-cyan-50/50 dark:border-white/[0.10] dark:bg-white/[0.02] dark:hover:border-cyan-400/40">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.txt,.docx,.md"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Upload size={20} className="text-zinc-400" />
                  <p className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
                    Click to select a file
                  </p>
                  <p className="text-[11px] text-zinc-500">
                    PDF, TXT, DOCX, or MD
                  </p>
                </label>
              </div>

              {files.length > 0 && (
                <div className="space-y-2">
                  {files.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-2 rounded-lg border border-black/[0.06] bg-zinc-50 px-3 py-2.5 dark:border-white/[0.06] dark:bg-white/[0.02]"
                    >
                      <span className="truncate text-[12px] text-zinc-700 dark:text-zinc-300">
                        {f.name}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setFiles((prev) =>
                            prev.filter((_, idx) => idx !== i)
                          )
                        }
                        className="rounded p-1 text-zinc-400 hover:text-red-500"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="mt-6 flex items-center justify-end gap-3 border-t border-black/[0.06] pt-5 dark:border-white/[0.06]">
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
              Add Sources
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