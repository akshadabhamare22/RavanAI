import React, { useState } from "react";
import {
  HelpCircle,
  Phone,
  CheckCircle2,
  XCircle,
  Loader2,
  Search,
  Calendar,
  ArrowUpDown,
  SlidersHorizontal,
  Video,
  RefreshCw,
  Download,
} from "lucide-react";

// ============================================================
// STAT CARD
// ============================================================

function StatCard({ icon: Icon, label, value, dotColor, accent = false }) {
  return (
    <div
      className={`
        relative rounded-2xl border p-4 transition
        ${
          accent
            ? "border-cyan-500/25 bg-cyan-500/[0.04]"
            : "border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]"
        }
      `}
    >
      {/* Status dot top-right */}
      {dotColor && (
        <span
          className={`absolute right-4 top-4 h-1.5 w-1.5 rounded-full ${dotColor}`}
        />
      )}

      <div className="mb-5">
        <div
          className={`
            flex h-8 w-8 items-center justify-center rounded-lg
            ${
              accent
                ? "bg-cyan-500/[0.12] text-cyan-600 dark:text-cyan-400"
                : "bg-black/[0.04] text-zinc-500 dark:bg-white/[0.05] dark:text-zinc-400"
            }
          `}
        >
          <Icon size={15} strokeWidth={1.8} />
        </div>
      </div>

      <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
        {label}
      </p>

      <p
        className={`text-2xl font-bold ${
          accent ? "text-cyan-600 dark:text-cyan-400" : "text-zinc-900 dark:text-zinc-100"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================

export default function CallsHistory() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter] = useState("All Time");
  const [calls] = useState([]);

  const stats = {
    total: 0,
    completed: 0,
    failed: 0,
    inProgress: 0,
  };

  const tabs = ["All", "Web", "Inbound", "Outbound"];

  const filteredCalls = calls.filter((c) => {
    const matchesTab = activeTab === "All" || c.channel === activeTab;
    const matchesSearch = (c.caller || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
      <main className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-7">
        {/* ============ PAGE HEADER ============ */}
        <section>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
                  All Calls History
                </h1>
                <HelpCircle size={15} className="text-zinc-400" />
              </div>

              <div className="mt-1.5 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-500">
                <span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                    {calls.length}
                  </span>{" "}
                  calls total
                </span>
                <span>•</span>
                <span className="font-mono text-xs"># 012854ee...681e</span>
              </div>
            </div>

            {/* Refresh + Export */}
            <div className="flex items-center gap-2">
              <button className="flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300">
                <RefreshCw size={14} />
                Refresh
              </button>
              <button className="flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300">
                <Download size={14} />
                Export
              </button>
            </div>
          </div>
        </section>

        {/* ============ STATS ROW ============ */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Phone}
            label="Total Calls"
            value={stats.total}
          />
          <StatCard
            icon={CheckCircle2}
            label="Completed"
            value={stats.completed}
            dotColor="bg-emerald-500"
          />
          <StatCard
            icon={XCircle}
            label="Failed"
            value={stats.failed}
            dotColor="bg-red-500"
          />
          <StatCard
            icon={Loader2}
            label="In Progress"
            value={stats.inProgress}
            dotColor="bg-cyan-500"
            accent
          />
        </section>

        {/* ============ TABS + FILTERS ============ */}
        <section className="flex flex-wrap items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex rounded-lg border border-black/[0.08] bg-white p-1 dark:border-white/[0.08] dark:bg-[#101012]">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-md px-3.5 py-1.5 text-[12px] font-medium transition ${
                  activeTab === tab
                    ? "bg-zinc-100 font-semibold text-zinc-900 dark:bg-[#1c1d22] dark:text-white"
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="flex h-10 w-full max-w-xs items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-sm text-zinc-500 dark:border-white/[0.08] dark:bg-[#101012]">
              <Search size={14} />
              <input
                type="text"
                placeholder="Search calls..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="min-w-0 flex-1 bg-transparent text-[13px] text-zinc-800 outline-none placeholder:text-zinc-500 dark:text-zinc-200"
              />
            </div>

            {/* All Time */}
            <button className="flex h-10 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300">
              <Calendar size={14} />
              <span className="hidden sm:inline">{timeFilter}</span>
            </button>

            {/* Sort */}
            <button className="flex h-10 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300">
              <ArrowUpDown size={14} />
              <span className="hidden sm:inline">Sort</span>
            </button>

            {/* Filters */}
            <button className="flex h-10 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300">
              <SlidersHorizontal size={14} />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </section>

        {/* ============ TABLE ============ */}
        <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">
          {/* Table header */}
          <div className="grid grid-cols-8 border-b border-black/[0.06] px-5 py-3 dark:border-white/[0.06]">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Caller
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Status
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Channel
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Duration
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Sentiment
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Agent
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Model
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Time
            </span>
          </div>

          {/* Empty state */}
          {filteredCalls.length === 0 ? (
            <div className="py-24 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center">
                <Video
                  size={36}
                  className="text-zinc-300 dark:text-zinc-600"
                />
              </div>

              <p className="mt-4 text-[13px] text-zinc-500">
                No call sessions found
              </p>
            </div>
          ) : (
            <div>
              {filteredCalls.map((call) => (
                <div
                  key={call.id}
                  className="grid grid-cols-8 border-b border-black/[0.04] px-5 py-4 last:border-0 dark:border-white/[0.04]"
                >
                  <span className="text-[13px] text-zinc-900 dark:text-zinc-100">
                    {call.caller}
                  </span>
                  <span className="text-[13px] text-zinc-700 dark:text-zinc-300">
                    {call.status}
                  </span>
                  <span className="text-[13px] text-zinc-700 dark:text-zinc-300">
                    {call.channel}
                  </span>
                  <span className="text-[13px] text-zinc-700 dark:text-zinc-300">
                    {call.duration}
                  </span>
                  <span className="text-[13px] text-zinc-700 dark:text-zinc-300">
                    {call.sentiment}
                  </span>
                  <span className="text-[13px] text-zinc-700 dark:text-zinc-300">
                    {call.agent}
                  </span>
                  <span className="text-[13px] text-zinc-700 dark:text-zinc-300">
                    {call.model}
                  </span>
                  <span className="text-[13px] text-zinc-500">
                    {call.time}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}