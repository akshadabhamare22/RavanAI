import React, { useState } from "react";
import {
  HelpCircle,
  Search,
  Upload,
  Trash2,
  Download,
  Plus,
  Tag,
  Circle,
  Clock,
  Calendar,
  Filter,
  X,
} from "lucide-react";

// ============================================================
// MAIN PAGE
// ============================================================

export default function Contacts() {
  const [contacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedLastCalled, setSelectedLastCalled] = useState("");
  const [selectedAdded, setSelectedAdded] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  const filteredContacts = contacts.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      (c.name || "").toLowerCase().includes(q) ||
      (c.phone || "").toLowerCase().includes(q) ||
      (c.email || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
      <main className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-7">
        {/* ============ SEARCH + ACTION BUTTONS ============ */}
        <section className="rounded-2xl border border-black/[0.06] bg-white p-4 dark:border-white/[0.08] dark:bg-[#101012]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Search */}
            <div className="flex h-11 min-w-[280px] flex-1 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 dark:border-white/[0.08] dark:bg-[#0e0f12] lg:max-w-md">
              <Search size={15} className="text-zinc-400" />
              <input
                type="text"
                placeholder="Search by name, phone, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="min-w-0 flex-1 bg-transparent text-[13px] text-zinc-800 outline-none placeholder:text-zinc-500 dark:text-zinc-200"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button className="flex h-10 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3.5 text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300">
                <Upload size={14} />
                Import CSV
              </button>
              <button
                disabled={contacts.length === 0}
                className="flex h-10 items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/[0.04] px-3.5 text-[13px] font-medium text-red-600 transition hover:bg-red-500/[0.08] disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-400"
              >
                <Trash2 size={14} />
                Delete All
              </button>
              <button
                disabled={contacts.length === 0}
                className="flex h-10 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3.5 text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.03] disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
              >
                <Download size={14} />
                Export
              </button>
              <button className="flex h-10 items-center gap-2 rounded-lg bg-cyan-500 px-4 text-[13px] font-semibold text-white transition hover:bg-cyan-400 dark:bg-cyan-400 dark:text-slate-950">
                <Plus size={15} strokeWidth={2.8} />
                Add Contact
              </button>
            </div>
          </div>

          {/* ============ FILTER CHIPS ROW ============ */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowFilters((v) => !v)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
                showFilters
                  ? "border-cyan-500/50 bg-cyan-500/[0.08] text-cyan-600 dark:text-cyan-400"
                  : "border-black/[0.08] bg-white text-zinc-500 hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-400"
              }`}
              aria-label="Filters"
            >
              <Filter size={14} />
            </button>

            <FilterChip
              icon={Tag}
              label="Tags"
              value={selectedTags.join(", ")}
              onClear={() => setSelectedTags([])}
            />

            <FilterChip
              icon={Circle}
              label="Status"
              value={selectedStatus}
              onClear={() => setSelectedStatus("")}
            />

            <FilterChip
              icon={Clock}
              label="Last Called"
              value={selectedLastCalled}
              onClear={() => setSelectedLastCalled("")}
            />

            <FilterChip
              icon={Calendar}
              label="Added"
              value={selectedAdded}
              onClear={() => setSelectedAdded("")}
            />
          </div>
        </section>

        {/* ============ TABLE ============ */}
        <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">
          {/* Table header */}
          <div className="grid grid-cols-[40px_1.5fr_1.5fr_1fr_1fr_1fr_1fr_80px] items-center gap-3 border-b border-black/[0.06] px-5 py-3 dark:border-white/[0.06]">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={(e) => setSelectAll(e.target.checked)}
              className="h-3.5 w-3.5 accent-cyan-500"
            />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Contact Name
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Contact Info
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Status
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Campaigns
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Tags
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Variables
            </span>
            <span className="text-right text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Actions
            </span>
          </div>

          {/* Body */}
          {filteredContacts.length === 0 ? (
            <div className="py-20 text-center">
              {/* Search icon circle */}
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-black/[0.06] bg-zinc-50 dark:border-white/[0.08] dark:bg-white/[0.02]">
                <Search
                  size={26}
                  className="text-zinc-400 dark:text-zinc-500"
                />
              </div>

              <h3 className="mt-5 text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
                No contacts found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-[13px] text-zinc-500">
                Try adjusting your filters or add your first contact
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                <button className="flex h-10 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-4 text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-300 dark:hover:bg-white/[0.04]">
                  <Upload size={14} />
                  Import CSV
                </button>
                <button className="flex h-10 items-center gap-2 rounded-lg bg-cyan-500 px-4 text-[13px] font-semibold text-white transition hover:bg-cyan-400 dark:bg-cyan-400 dark:text-slate-950">
                  <Plus size={15} strokeWidth={2.8} />
                  Add Contact
                </button>
              </div>
            </div>
          ) : (
            <div>
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="grid grid-cols-[40px_1.5fr_1.5fr_1fr_1fr_1fr_1fr_80px] items-center gap-3 border-b border-black/[0.04] px-5 py-4 last:border-0 dark:border-white/[0.04]"
                >
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 accent-cyan-500"
                  />
                  <span className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100">
                    {contact.name}
                  </span>
                  <span className="text-[13px] text-zinc-600 dark:text-zinc-400">
                    {contact.phone}
                  </span>
                  <span className="text-[13px] text-zinc-600 dark:text-zinc-400">
                    {contact.status}
                  </span>
                  <span className="text-[13px] text-zinc-600 dark:text-zinc-400">
                    {contact.campaigns}
                  </span>
                  <span className="text-[13px] text-zinc-600 dark:text-zinc-400">
                    {contact.tags}
                  </span>
                  <span className="text-[13px] text-zinc-600 dark:text-zinc-400">
                    {contact.variables}
                  </span>
                  <span className="text-right">
                    <button className="rounded-md p-1.5 text-zinc-400 transition hover:bg-red-500/[0.08] hover:text-red-500">
                      <Trash2 size={13} />
                    </button>
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* ============ PAGINATION FOOTER ============ */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.06] px-5 py-4 dark:border-white/[0.06]">
            <span className="text-[12px] text-zinc-500">
              Showing{" "}
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                0-0
              </span>{" "}
              of{" "}
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                {contacts.length}
              </span>{" "}
              contacts
            </span>

            <div className="flex items-center gap-2">
              <button className="text-[12px] font-medium text-zinc-500 transition hover:text-zinc-800 dark:hover:text-zinc-200">
                Previous
              </button>
              <span className="text-[12px] font-semibold text-zinc-800 dark:text-zinc-200">
                1/1
              </span>
              <button className="text-[12px] font-medium text-zinc-500 transition hover:text-zinc-800 dark:hover:text-zinc-200">
                Next
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// ============================================================
// FILTER CHIP
// ============================================================

function FilterChip({ icon: Icon, label, value, onClear }) {
  const isActive = Boolean(value);

  return (
    <button
      type="button"
      className={`
        flex h-9 items-center gap-2 rounded-lg border px-3
        text-[12px] font-medium transition
        ${
          isActive
            ? "border-cyan-500/50 bg-cyan-500/[0.08] text-cyan-600 dark:text-cyan-400"
            : "border-black/[0.08] bg-white text-zinc-600 hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-400 dark:hover:bg-white/[0.04]"
        }
      `}
    >
      <Icon size={12} />
      <span>
        {isActive ? value : label}
      </span>
      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-zinc-400"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>

      {isActive && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
          className="ml-0.5 rounded-full p-0.5 text-zinc-400 hover:bg-black/10 dark:hover:bg-white/10"
        >
          <X size={10} />
        </span>
      )}
    </button>
  );
}