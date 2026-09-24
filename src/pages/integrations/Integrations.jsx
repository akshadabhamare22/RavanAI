import React, { useState } from "react";
import {
  HelpCircle,
  Link2,
  LayoutGrid,
  Activity,
  Search,
  ChevronDown,
  Grid3X3,
  List,
  Shield,
  RefreshCw,
  Plug,
  Webhook,
  Headphones,
  ExternalLink,
  Info,
} from "lucide-react";

// ============================================================
// INTEGRATIONS DATA
// ============================================================

const INITIAL_INTEGRATIONS = [
  {
    id: "gohighlevel",
    name: "GoHighLevel",
    category: "CRM & Marketing Automation",
    description: "Manage CRM contacts, sync calendars, and automate appointments with GHL.",
    status: "Not Connected",
    color: "cyan",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    category: "CRM",
    description: "Sync contacts, deals, and appointments with your Salesforce org via OAuth.",
    status: "Not Connected",
    color: "blue",
  },
  {
    id: "calcom",
    name: "Cal.com",
    category: "Scheduling & Booking",
    description: "Sync booking pages and let agents handle appointment scheduling directly.",
    status: "Not Connected",
    color: "violet",
  },
];

// ============================================================
// MAIN PAGE
// ============================================================

export default function Integrations() {
  const [integrations] = useState(INITIAL_INTEGRATIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [viewMode, setViewMode] = useState("grid");

  const connectedCount = integrations.filter(
    (i) => i.status === "Connected"
  ).length;
  const availableCount = integrations.length;
  const syncStatus = connectedCount > 0 ? "Syncing" : "Idle";

  const filteredIntegrations = integrations.filter((i) => {
    const q = searchQuery.toLowerCase();
    return (
      i.name.toLowerCase().includes(q) ||
      i.category.toLowerCase().includes(q) ||
      i.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
      <main className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-7">
        {/* ============ TOP ROW: SEARCH ============ */}
        <section className="flex justify-end">
          <div className="flex h-10 w-full max-w-xs items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 dark:border-white/[0.08] dark:bg-[#101012]">
            <Search size={14} className="text-zinc-400" />
            <input
              type="text"
              placeholder="Search integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="min-w-0 flex-1 bg-transparent text-[13px] text-zinc-800 outline-none placeholder:text-zinc-500 dark:text-zinc-200"
            />
            <kbd className="rounded border border-black/10 px-1.5 py-0.5 text-[10px] text-zinc-500 dark:border-white/10">
              ⌘K
            </kbd>
          </div>
        </section>

        {/* ============ SUMMARY CARDS ============ */}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Connected */}
          <div className="rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
            <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-500/25 bg-cyan-500/[0.06]">
              <Link2
                size={16}
                className="text-cyan-600 dark:text-cyan-400"
              />
            </div>
            <h3 className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
              Connected Integrations
            </h3>
            <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {connectedCount}
            </p>
            <p className="mt-1 text-[11px] text-zinc-500">
              {connectedCount === 0
                ? "None connected"
                : `${connectedCount} connected`}
            </p>
          </div>

          {/* Available */}
          <div className="rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
            <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-lg border border-violet-500/25 bg-violet-500/[0.06]">
              <LayoutGrid
                size={16}
                className="text-violet-600 dark:text-violet-400"
              />
            </div>
            <h3 className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
              Available Integrations
            </h3>
            <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {availableCount}
            </p>
            <p className="mt-1 text-[11px] text-zinc-500">
              Ready to connect
            </p>
          </div>

          {/* Sync Status */}
          <div className="rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
            <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.06] bg-zinc-50 dark:border-white/[0.08] dark:bg-white/[0.02]">
              <Activity
                size={16}
                className="text-zinc-500 dark:text-zinc-400"
              />
            </div>
            <h3 className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
              Sync Status
            </h3>
            <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {syncStatus}
            </p>
            <p className="mt-1 text-[11px] text-zinc-500">
              {connectedCount === 0
                ? "No integrations connected yet"
                : "All systems operational"}
            </p>
          </div>
        </section>

        {/* ============ ALL INTEGRATIONS ============ */}
        <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">
          {/* Header row */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.06] px-5 py-4 dark:border-white/[0.06]">
            <div className="flex items-center gap-2">
              <h2 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
                All Integrations
              </h2>
              <Info size={13} className="text-zinc-400" />
            </div>

            <div className="flex items-center gap-2">
              {/* Status filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-9 appearance-none rounded-lg border border-black/[0.08] bg-white pl-3 pr-8 text-[13px] text-zinc-700 outline-none transition hover:bg-black/[0.02] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
                >
                  <option>All Status</option>
                  <option>Connected</option>
                  <option>Not Connected</option>
                </select>
                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400"
                />
              </div>

              {/* View toggle */}
              <div className="flex items-center gap-0.5 rounded-lg border border-black/[0.08] bg-white p-0.5 dark:border-white/[0.08] dark:bg-[#101012]">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`rounded-md p-1.5 transition ${
                    viewMode === "grid"
                      ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400"
                      : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid3X3 size={14} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`rounded-md p-1.5 transition ${
                    viewMode === "list"
                      ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400"
                      : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}
                  aria-label="List view"
                >
                  <List size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="p-5">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {filteredIntegrations.map((integration) => (
                <IntegrationCard
                  key={integration.id}
                  integration={integration}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ============ HELP CARD ============ */}
        <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-500/25 bg-cyan-500/[0.06]">
                <Headphones
                  size={16}
                  className="text-cyan-600 dark:text-cyan-400"
                />
              </div>
              <div>
                <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
                  Need help connecting an integration?
                </h3>
                <p className="mt-0.5 text-[12px] text-zinc-500">
                  Need help in integration check out our documentation or contact us at{" "}
                  <a
                    href="mailto:Info@ravan.ai"
                    className="text-cyan-600 hover:underline dark:text-cyan-400"
                  >
                    Info@ravan.ai
                  </a>
                  .
                </p>
              </div>
            </div>

            <button className="flex h-10 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-4 text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300">
              <ExternalLink size={13} />
              View Docs
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

// ============================================================
// INTEGRATION CARD
// ============================================================

function IntegrationCard({ integration }) {
  const colorMap = {
    cyan: {
      bg: "bg-cyan-500/[0.06]",
      border: "border-cyan-500/25",
      text: "text-cyan-600 dark:text-cyan-400",
    },
    blue: {
      bg: "bg-blue-500/[0.06]",
      border: "border-blue-500/25",
      text: "text-blue-600 dark:text-blue-400",
    },
    violet: {
      bg: "bg-violet-500/[0.06]",
      border: "border-violet-500/25",
      text: "text-violet-600 dark:text-violet-400",
    },
  };
  const c = colorMap[integration.color] || colorMap.cyan;

  return (
    <div className="rounded-2xl border border-black/[0.06] bg-zinc-50 p-5 dark:border-white/[0.08] dark:bg-[#0e0f12]">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${c.border} ${c.bg}`}
          >
            <Plug size={16} className={c.text} />
          </div>
          <div className="min-w-0">
            <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
              {integration.name}
            </h3>
            <p className="mt-0.5 text-[11px] text-zinc-500">
              {integration.category}
            </p>
          </div>
        </div>

        <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-2.5 py-1 text-[10px] font-semibold text-zinc-600 dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-400">
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
          {integration.status}
        </span>
      </div>

      {/* Description */}
      <p className="mt-4 text-[12px] leading-relaxed text-zinc-500">
        {integration.description}
      </p>

      {/* Details box */}
      <div className="mt-4 space-y-2 rounded-lg border border-black/[0.06] bg-white p-4 dark:border-white/[0.08] dark:bg-[#101012]">
        <DetailRow icon={Shield} label="Status" value={integration.status} />
        <DetailRow icon={RefreshCw} label="Last Sync" value="—" />
        <DetailRow icon={Plug} label="Connected Account" value="—" />
        <DetailRow icon={Webhook} label="Webhooks" value="—" />
      </div>

      {/* Connect button */}
      <button
        type="button"
        className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/[0.06] text-[13px] font-semibold text-cyan-700 transition hover:bg-cyan-500/[0.10] dark:text-cyan-400"
      >
        <Link2 size={14} />
        Connect
      </button>
    </div>
  );
}

// ============================================================
// DETAIL ROW
// ============================================================

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between text-[12px]">
      <span className="flex items-center gap-2 text-zinc-500">
        <Icon size={12} />
        {label}
      </span>
      <span className="text-zinc-700 dark:text-zinc-300">{value}</span>
    </div>
  );
}