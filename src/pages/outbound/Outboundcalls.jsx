import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HelpCircle,
  Users,
  PhoneCall,
  TrendingUp,
  PlayCircle,
  Calendar,
  Search,
  Info,
} from "lucide-react";

// ============================================================
// STAT CARD
// ============================================================

function StatCard({ icon: Icon, label, value, accent = false, success = false }) {
  return (
    <div
      className={`
        rounded-2xl border p-4
        transition
        ${
          accent
            ? "border-cyan-500/25 bg-cyan-500/[0.04]"
            : "border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]"
        }
      `}
    >
      <div className="mb-5 flex items-center justify-between">
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
          success
            ? "text-emerald-600 dark:text-emerald-400"
            : accent
              ? "text-cyan-600 dark:text-cyan-400"
              : "text-zinc-900 dark:text-zinc-100"
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

export default function OutboundCalls() {
  const navigate = useNavigate();
  const [campaigns] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const stats = {
    totalCalls: 0,
    runningCalls: 0,
    avgSuccess: "0%",
    active: 0,
    scheduled: 0,
  };

  const tabs = ["All", "Active", "Scheduled", "Paused"];

  const filteredCampaigns = campaigns.filter((c) => {
    const matchesTab = activeTab === "All" || c.status === activeTab;
    const matchesSearch = c.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
      <main className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-7">
        {/* ============ PAGE HEADER ============ */}
        <section>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
              Campaigns
            </h1>
            <HelpCircle size={15} className="text-zinc-400" />
          </div>

          <div className="mt-1.5 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-500">
            <span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                {campaigns.length}
              </span>{" "}
              total campaign{campaigns.length !== 1 ? "s" : ""}
            </span>
            <span>•</span>
            <span className="font-mono text-xs"># 012854ee...681e</span>
          </div>
        </section>

        {/* ============ STATS ROW ============ */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard icon={Users} label="Total Calls" value={stats.totalCalls} />
          <StatCard
            icon={PhoneCall}
            label="Running Calls"
            value={stats.runningCalls}
            accent
          />
          <StatCard
            icon={TrendingUp}
            label="Avg Success"
            value={stats.avgSuccess}
            success
          />
          <StatCard icon={PlayCircle} label="Active" value={stats.active} />
          <StatCard
            icon={Calendar}
            label="Scheduled"
            value={stats.scheduled}
          />
        </section>

        {/* ============ TABS + SEARCH ============ */}
        <section className="flex flex-wrap items-center justify-between gap-3">
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

          <div className="flex h-10 w-full max-w-md items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-sm text-zinc-500 dark:border-white/[0.08] dark:bg-[#101012]">
            <Search size={14} />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="min-w-0 flex-1 bg-transparent text-[13px] text-zinc-800 outline-none placeholder:text-zinc-500 dark:text-zinc-200"
            />
          </div>
        </section>

        {/* ============ EMPTY STATE / LIST ============ */}
        <section>
          {filteredCampaigns.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-black/[0.10] bg-white py-24 text-center dark:border-white/[0.08] dark:bg-[#101012]">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-black/[0.06] bg-zinc-50 dark:border-white/[0.08] dark:bg-white/[0.02]">
                <Search
                  size={26}
                  className="text-zinc-400 dark:text-zinc-500"
                />
              </div>

              <h3 className="mt-5 text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
                No campaigns found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-zinc-500">
                We couldn't find any campaigns matching your current filters or
                search query.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => {
                    setActiveTab("All");
                    setSearchQuery("");
                  }}
                  className="rounded-lg border border-black/[0.08] bg-white px-4 py-2 text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-300 dark:hover:bg-white/[0.04]"
                >
                  Clear all filters
                </button>
                <button
                  onClick={() => navigate("/outbound/new")}
                  className="rounded-lg bg-cyan-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-cyan-400 dark:bg-cyan-400 dark:text-slate-950"
                >
                  Create first campaign
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredCampaigns.map((c) => (
                <div
                  key={c.id}
                  className="rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]"
                >
                  <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
                    {c.name}
                  </h3>
                  <p className="mt-1 text-[12px] text-zinc-500">
                    {c.status}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}