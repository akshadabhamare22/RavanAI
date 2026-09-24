import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  LayoutGrid,
  List,
  HelpCircle,
  Plus,
  Cpu,
  Mic,
  Bot,
  Clock,
  Calendar,
  Pause,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import AgentDetails from "./AgentDetails";
import EditAgent from "./EditAgent";
import DeleteAgent from "./DeleteAgent";

const initialAgents = [
  {
    id: "1",
    name: "Unnamed Agent",
    initials: "UA",
    type: "Single Prompt",
    description:
      "No description yet. Add a prompt to define this agent's behavior.",
    model: "Agni Premium Lite",
    voice: "Demo",
    status: "Live",
    updated: "Sep 23, 2026 • 2:49 PM",
    created: "Sep 23, 2026 • 2:49 PM",
  },
];

export default function Agents() {
  const navigate = useNavigate();

  const [agents, setAgents] = useState(initialAgents);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const [detailsAgent, setDetailsAgent] = useState(null);
  const [editAgent, setEditAgent] = useState(null);
  const [deleteAgent, setDeleteAgent] = useState(null);

  // per-card dropdown open state
  const [openMenuId, setOpenMenuId] = useState(null);

  const filteredAgents = agents.filter((agent) => {
    const matchesTab =
      activeTab === "All" ||
      (activeTab === "Active" && agent.status === "Live") ||
      (activeTab === "Inactive" && agent.status !== "Live");
    const matchesSearch = agent.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleEdit = (updatedAgent) => {
    setAgents((prev) =>
      prev.map((a) => (a.id === updatedAgent.id ? updatedAgent : a))
    );
    setEditAgent(null);
  };

  const handleDelete = (id) => {
    setAgents((prev) => prev.filter((a) => a.id !== id));
    setDeleteAgent(null);
  };

  // Close menus on any click outside
  React.useEffect(() => {
    const close = () => setOpenMenuId(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <div className="min-h-screen  bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
      <main className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-7">
        {/* Header */}
        <section>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
              Agents
            </h1>
            <HelpCircle size={15} className="text-zinc-400" />
          </div>

          <div className="mt-1.5 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-500">
            <span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                {agents.length}
              </span>{" "}
              total agents
            </span>
            <span>•</span>
            <span className="font-mono text-xs"># 012854ee...681e</span>
          </div>
        </section>

        {/* Tabs + Search */}
        <section className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex rounded-lg border border-black/[0.08] bg-white p-1 dark:border-white/[0.08] dark:bg-[#101012]">
            {["All", "Active", "Inactive"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-cyan-500/15 font-semibold text-cyan-600 dark:text-cyan-300"
                    : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-64 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-sm text-zinc-500 dark:border-white/[0.08] dark:bg-[#101012]">
              <Search size={15} />
              <input
                type="text"
                placeholder="Search agents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="min-w-0 flex-1 bg-transparent text-[13px] text-zinc-800 outline-none placeholder:text-zinc-500 dark:text-zinc-200"
              />
            </div>

            <div className="flex items-center gap-0.5 rounded-lg border border-black/[0.08] bg-white p-0.5 dark:border-white/[0.08] dark:bg-[#101012]">
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded-md p-1.5 transition ${
                  viewMode === "grid"
                    ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400"
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
              >
                <LayoutGrid size={15} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`rounded-md p-1.5 transition ${
                  viewMode === "list"
                    ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400"
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
              >
                <List size={15} />
              </button>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {/* New Agent */}
          <button
            onClick={() => navigate("/agents/create")}
            className="group flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-black/[0.15] bg-zinc-50 p-5 transition hover:border-cyan-500/40 hover:bg-cyan-50 dark:border-white/[0.10] dark:bg-white/[0.02] dark:hover:border-cyan-400/40 dark:hover:bg-cyan-500/[0.03]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-zinc-500 transition group-hover:bg-cyan-500/10 group-hover:text-cyan-600 dark:bg-white/[0.05] dark:group-hover:text-cyan-400">
              <Plus size={20} />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                New Agent
              </p>
              <p className="mt-0.5 text-xs text-zinc-500">
                Create AI assistant
              </p>
            </div>
          </button>

          {/* Agent cards */}
          {filteredAgents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              isMenuOpen={openMenuId === agent.id}
              onToggleMenu={(e) => {
                e.stopPropagation();
                setOpenMenuId(openMenuId === agent.id ? null : agent.id);
              }}
              onOpen={() => setDetailsAgent(agent)}
              onEdit={(e) => {
                e?.stopPropagation?.();
                setOpenMenuId(null);
                setEditAgent(agent);
              }}
              onDelete={(e) => {
                e?.stopPropagation?.();
                setOpenMenuId(null);
                setDeleteAgent(agent);
              }}
            />
          ))}
        </section>

        {filteredAgents.length === 0 && (
          <div className="rounded-2xl border border-black/[0.06] bg-zinc-50 p-12 text-center dark:border-white/[0.08] dark:bg-[#101012]">
            <p className="text-sm text-zinc-500">No agents found</p>
          </div>
        )}
      </main>

      {/* Modals */}
      <AgentDetails
        agent={detailsAgent}
        onClose={() => setDetailsAgent(null)}
        onEdit={(a) => {
          setDetailsAgent(null);
          setEditAgent(a);
        }}
        onDelete={(a) => {
          setDetailsAgent(null);
          setDeleteAgent(a);
        }}
      />

      <EditAgent
        agent={editAgent}
        onClose={() => setEditAgent(null)}
        onSave={handleEdit}
        onDelete={(a) => {
          setEditAgent(null);
          setDeleteAgent(a);
        }}
      />

      <DeleteAgent
        agent={deleteAgent}
        onClose={() => setDeleteAgent(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

// ============================================================
// AGENT CARD
// ============================================================

function AgentCard({
  agent,
  isMenuOpen,
  onToggleMenu,
  onOpen,
  onEdit,
  onDelete,
}) {
  return (
    <div
      onClick={onOpen}
      className="group relative cursor-pointer rounded-2xl border border-black/[0.06] bg-zinc-50 p-5 transition hover:border-cyan-500/30 hover:shadow-md dark:border-white/[0.08] dark:bg-[#101012] dark:hover:border-cyan-400/30"
    >
      {/* Row 1: avatar + name + live */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/[0.08] text-[13px] font-bold text-cyan-600 dark:text-cyan-400">
            {agent.initials}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
              {agent.name}
            </h3>
            <p className="mt-0.5 text-xs text-zinc-500">{agent.type}</p>
          </div>
        </div>

        {agent.status === "Live" && (
          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/[0.08] px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Live
          </span>
        )}
      </div>

      {/* Row 2: description */}
      <p className="mt-4 line-clamp-2 text-[13px] leading-relaxed text-zinc-500">
        {agent.description}
      </p>

      {/* Row 3: meta box */}
      <div className="mt-4 space-y-2 rounded-lg border border-black/[0.05] bg-white p-3.5 dark:border-white/[0.05] dark:bg-white/[0.02]">
        <MetaRow icon={Cpu} label="Model" value={agent.model} />
        <MetaRow icon={Mic} label="Voice" value={agent.voice} />
        <MetaRow icon={Bot} label="Agent name" value={agent.name} />
      </div>

      {/* Row 4: timestamps */}
      <div className="mt-4 space-y-1.5 text-xs text-zinc-500">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Clock size={12} />
            Updated
          </span>
          <span className="text-zinc-700 dark:text-zinc-300">
            {agent.updated}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Calendar size={12} />
            Created
          </span>
          <span className="text-zinc-700 dark:text-zinc-300">
            {agent.created}
          </span>
        </div>
      </div>

      {/* Row 5: actions */}
      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={(e) => e.stopPropagation()}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-black/[0.08] bg-white py-2.5 text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-300 dark:hover:bg-white/[0.04]"
        >
          <Pause size={12} />
          Pause
        </button>

        {/* ⋯ dropdown trigger */}
        <div className="relative">
          <button
            onClick={onToggleMenu}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-zinc-600 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-400 dark:hover:bg-white/[0.04]"
          >
            <MoreHorizontal size={16} />
          </button>

          {/* Dropdown menu */}
          {isMenuOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-full z-20 mt-1 w-40 overflow-hidden rounded-lg border border-black/[0.08] bg-white shadow-xl dark:border-white/[0.08] dark:bg-[#15161a]"
            >
              <button
                onClick={onEdit}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.04] dark:text-zinc-300 dark:hover:bg-white/[0.05]"
              >
                <Pencil size={13} />
                Edit Agent
              </button>
              <button
                onClick={onDelete}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] font-medium text-red-500 transition hover:bg-red-500/[0.08] dark:text-red-400"
              >
                <Trash2 size={13} />
                Delete Agent
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// META ROW
// ============================================================

function MetaRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 text-[13px]">
      <span className="flex items-center gap-2 text-zinc-500">
        <Icon size={13} />
        {label}
      </span>
      <span className="font-medium text-zinc-800 dark:text-zinc-200">
        {value}
      </span>
    </div>
  );
}