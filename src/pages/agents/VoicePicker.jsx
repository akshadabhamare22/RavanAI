import React, { useState } from "react";
import { X, Search, Play } from "lucide-react";

const VOICES = [
  { name: "Priya", gender: "Female", color: "from-rose-400 to-pink-500" },
  { name: "Anika", gender: "Female", color: "from-orange-400 to-red-500" },
  { name: "Yash", gender: "Male", color: "from-blue-400 to-indigo-500" },
  { name: "Varun", gender: "Male", color: "from-emerald-400 to-teal-500" },
  { name: "Sameer", gender: "Male", color: "from-purple-400 to-pink-500" },
  { name: "Reyansh", gender: "Male", color: "from-amber-400 to-orange-500" },
  { name: "Nikhil", gender: "Male", color: "from-sky-400 to-blue-500" },
  { name: "Kunal", gender: "Male", color: "from-indigo-400 to-violet-500" },
  { name: "Ishaan", gender: "Male", color: "from-cyan-400 to-blue-500" },
  { name: "Dev", gender: "Male", color: "from-teal-400 to-emerald-500" },
  { name: "Aarav", gender: "Male", color: "from-yellow-400 to-orange-500" },
  { name: "Vihaan", gender: "Male", color: "from-fuchsia-400 to-purple-500" },
];

export default function VoicePicker({ current, onClose, onSelect }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = VOICES.filter((v) => {
    const matchesQuery = v.name.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filter === "All" || v.gender === filter;
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-2xl dark:border-white/[0.08] dark:bg-[#101012]">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-black/[0.06] px-6 py-5 dark:border-white/[0.06]">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Choose a Voice
            </h3>
            <p className="mt-1 text-xs text-zinc-500">
              {VOICES.length} voices available
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-zinc-500 transition hover:bg-black/[0.05] dark:hover:bg-white/[0.06]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 border-b border-black/[0.06] px-6 py-4 dark:border-white/[0.06]">
          <div className="flex h-9 flex-1 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-sm text-zinc-500 dark:border-white/[0.08] dark:bg-[#0e0f12]">
            <Search size={14} />
            <input
              type="text"
              placeholder="Search voices..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-w-0 flex-1 bg-transparent text-[13px] text-zinc-800 outline-none placeholder:text-zinc-500 dark:text-zinc-200"
            />
          </div>

          <div className="flex rounded-lg border border-black/[0.08] bg-white p-1 dark:border-white/[0.08] dark:bg-[#0e0f12]">
            {["All", "Female", "Male"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition ${
                  filter === f
                    ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-300"
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((v) => (
              <div
                key={v.name}
                className={`flex flex-col gap-3 rounded-xl border p-4 transition ${
                  current === v.name
                    ? "border-cyan-500/50 bg-cyan-500/[0.04]"
                    : "border-black/[0.06] bg-zinc-50 hover:border-cyan-500/30 dark:border-white/[0.08] dark:bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${v.color} text-[12px] font-bold text-white`}
                  >
                    {v.name[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {v.name}
                    </p>
                    <p className="text-[11px] text-zinc-500">{v.gender}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelect(v.name);
                    onClose();
                  }}
                  className="flex items-center justify-center gap-2 rounded-lg border border-black/[0.08] bg-white py-2 text-[12px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-300 dark:hover:bg-white/[0.04]"
                >
                  <Play size={11} />
                  Preview
                </button>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm text-zinc-500">
              No voices found
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-black/[0.06] px-6 py-4 dark:border-white/[0.06]">
          <span className="text-xs text-zinc-500">{filtered.length} results</span>
          <button
            onClick={onClose}
            className="rounded-lg border border-black/[0.08] bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-300 dark:hover:bg-white/[0.04]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}