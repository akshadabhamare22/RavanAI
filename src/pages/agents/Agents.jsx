// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Search,
//   LayoutGrid,
//   List,
//   HelpCircle,
//   Plus,
//   Cpu,
//   Mic,
//   Bot,
//   Clock,
//   Calendar,
//   Pause,
//   MoreHorizontal,
//   Pencil,
//   Trash2,
// } from "lucide-react";

// import AgentDetails from "./AgentDetails";
// import EditAgent from "./EditAgent";
// import DeleteAgent from "./DeleteAgent";

// const initialAgents = [
//   {
//     id: "1",
//     name: "Unnamed Agent",
//     initials: "UA",
//     type: "Single Prompt",
//     description:
//       "No description yet. Add a prompt to define this agent's behavior.",
//     model: "Agni Premium Lite",
//     voice: "Demo",
//     status: "Live",
//     updated: "Sep 23, 2026 • 2:49 PM",
//     created: "Sep 23, 2026 • 2:49 PM",
//   },
// ];

// export default function Agents() {
//   const navigate = useNavigate();

//   const [agents, setAgents] = useState(initialAgents);
//   const [activeTab, setActiveTab] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [viewMode, setViewMode] = useState("grid");

//   const [detailsAgent, setDetailsAgent] = useState(null);
//   const [editAgent, setEditAgent] = useState(null);
//   const [deleteAgent, setDeleteAgent] = useState(null);

//   // per-card dropdown open state
//   const [openMenuId, setOpenMenuId] = useState(null);

//   const filteredAgents = agents.filter((agent) => {
//     const matchesTab =
//       activeTab === "All" ||
//       (activeTab === "Active" && agent.status === "Live") ||
//       (activeTab === "Inactive" && agent.status !== "Live");
//     const matchesSearch = agent.name
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     return matchesTab && matchesSearch;
//   });

//   const handleEdit = (updatedAgent) => {
//     setAgents((prev) =>
//       prev.map((a) => (a.id === updatedAgent.id ? updatedAgent : a))
//     );
//     setEditAgent(null);
//   };

//   const handleDelete = (id) => {
//     setAgents((prev) => prev.filter((a) => a.id !== id));
//     setDeleteAgent(null);
//   };

//   // Close menus on any click outside
//   React.useEffect(() => {
//     const close = () => setOpenMenuId(null);
//     window.addEventListener("click", close);
//     return () => window.removeEventListener("click", close);
//   }, []);

//   return (
//     <div className="min-h-screen  bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
//       <main className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-7">
//         {/* Header */}
//         <section>
//           <div className="flex flex-wrap items-center gap-2">
//             <h1 className="text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
//               Agents
//             </h1>
//             <HelpCircle size={15} className="text-zinc-400" />
//           </div>

//           <div className="mt-1.5 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-500">
//             <span>
//               <span className="font-semibold text-zinc-900 dark:text-zinc-200">
//                 {agents.length}
//               </span>{" "}
//               total agents
//             </span>
//             <span>•</span>
//             <span className="font-mono text-xs"># 012854ee...681e</span>
//           </div>
//         </section>

//         {/* Tabs + Search */}
//         <section className="flex flex-wrap items-center justify-between gap-3">
//           <div className="flex rounded-lg border border-black/[0.08] bg-white p-1 dark:border-white/[0.08] dark:bg-[#101012]">
//             {["All", "Active", "Inactive"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
//                   activeTab === tab
//                     ? "bg-cyan-500/15 font-semibold text-cyan-600 dark:text-cyan-300"
//                     : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           <div className="flex items-center gap-2">
//             <div className="flex h-9 w-64 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-sm text-zinc-500 dark:border-white/[0.08] dark:bg-[#101012]">
//               <Search size={15} />
//               <input
//                 type="text"
//                 placeholder="Search agents..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="min-w-0 flex-1 bg-transparent text-[13px] text-zinc-800 outline-none placeholder:text-zinc-500 dark:text-zinc-200"
//               />
//             </div>

//             <div className="flex items-center gap-0.5 rounded-lg border border-black/[0.08] bg-white p-0.5 dark:border-white/[0.08] dark:bg-[#101012]">
//               <button
//                 onClick={() => setViewMode("grid")}
//                 className={`rounded-md p-1.5 transition ${
//                   viewMode === "grid"
//                     ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400"
//                     : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
//                 }`}
//               >
//                 <LayoutGrid size={15} />
//               </button>
//               <button
//                 onClick={() => setViewMode("list")}
//                 className={`rounded-md p-1.5 transition ${
//                   viewMode === "list"
//                     ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400"
//                     : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
//                 }`}
//               >
//                 <List size={15} />
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* Grid */}
//         <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
//           {/* New Agent */}
//           <button
//             onClick={() => navigate("/agents/create")}
//             className="group flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-black/[0.15] bg-zinc-50 p-5 transition hover:border-cyan-500/40 hover:bg-cyan-50 dark:border-white/[0.10] dark:bg-white/[0.02] dark:hover:border-cyan-400/40 dark:hover:bg-cyan-500/[0.03]"
//           >
//             <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-zinc-500 transition group-hover:bg-cyan-500/10 group-hover:text-cyan-600 dark:bg-white/[0.05] dark:group-hover:text-cyan-400">
//               <Plus size={20} />
//             </div>
//             <div className="text-center">
//               <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
//                 New Agent
//               </p>
//               <p className="mt-0.5 text-xs text-zinc-500">
//                 Create AI assistant
//               </p>
//             </div>
//           </button>

//           {/* Agent cards */}
//           {filteredAgents.map((agent) => (
//             <AgentCard
//               key={agent.id}
//               agent={agent}
//               isMenuOpen={openMenuId === agent.id}
//               onToggleMenu={(e) => {
//                 e.stopPropagation();
//                 setOpenMenuId(openMenuId === agent.id ? null : agent.id);
//               }}
//               onOpen={() => setDetailsAgent(agent)}
//               onEdit={(e) => {
//                 e?.stopPropagation?.();
//                 setOpenMenuId(null);
//                 setEditAgent(agent);
//               }}
//               onDelete={(e) => {
//                 e?.stopPropagation?.();
//                 setOpenMenuId(null);
//                 setDeleteAgent(agent);
//               }}
//             />
//           ))}
//         </section>

//         {filteredAgents.length === 0 && (
//           <div className="rounded-2xl border border-black/[0.06] bg-zinc-50 p-12 text-center dark:border-white/[0.08] dark:bg-[#101012]">
//             <p className="text-sm text-zinc-500">No agents found</p>
//           </div>
//         )}
//       </main>

//       {/* Modals */}
//       <AgentDetails
//         agent={detailsAgent}
//         onClose={() => setDetailsAgent(null)}
//         onEdit={(a) => {
//           setDetailsAgent(null);
//           setEditAgent(a);
//         }}
//         onDelete={(a) => {
//           setDetailsAgent(null);
//           setDeleteAgent(a);
//         }}
//       />

//       <EditAgent
//         agent={editAgent}
//         onClose={() => setEditAgent(null)}
//         onSave={handleEdit}
//         onDelete={(a) => {
//           setEditAgent(null);
//           setDeleteAgent(a);
//         }}
//       />

//       <DeleteAgent
//         agent={deleteAgent}
//         onClose={() => setDeleteAgent(null)}
//         onConfirm={handleDelete}
//       />
//     </div>
//   );
// }

// // ============================================================
// // AGENT CARD
// // ============================================================

// function AgentCard({
//   agent,
//   isMenuOpen,
//   onToggleMenu,
//   onOpen,
//   onEdit,
//   onDelete,
// }) {
//   return (
//     <div
//       onClick={onOpen}
//       className="group relative cursor-pointer rounded-2xl border border-black/[0.06] bg-zinc-50 p-5 transition hover:border-cyan-500/30 hover:shadow-md dark:border-white/[0.08] dark:bg-[#101012] dark:hover:border-cyan-400/30"
//     >
//       {/* Row 1: avatar + name + live */}
//       <div className="flex items-start justify-between gap-3">
//         <div className="flex items-center gap-3">
//           <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/[0.08] text-[13px] font-bold text-cyan-600 dark:text-cyan-400">
//             {agent.initials}
//           </div>
//           <div className="min-w-0">
//             <h3 className="truncate text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
//               {agent.name}
//             </h3>
//             <p className="mt-0.5 text-xs text-zinc-500">{agent.type}</p>
//           </div>
//         </div>

//         {agent.status === "Live" && (
//           <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/[0.08] px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
//             <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
//             Live
//           </span>
//         )}
//       </div>

//       {/* Row 2: description */}
//       <p className="mt-4 line-clamp-2 text-[13px] leading-relaxed text-zinc-500">
//         {agent.description}
//       </p>

//       {/* Row 3: meta box */}
//       <div className="mt-4 space-y-2 rounded-lg border border-black/[0.05] bg-white p-3.5 dark:border-white/[0.05] dark:bg-white/[0.02]">
//         <MetaRow icon={Cpu} label="Model" value={agent.model} />
//         <MetaRow icon={Mic} label="Voice" value={agent.voice} />
//         <MetaRow icon={Bot} label="Agent name" value={agent.name} />
//       </div>

//       {/* Row 4: timestamps */}
//       <div className="mt-4 space-y-1.5 text-xs text-zinc-500">
//         <div className="flex items-center justify-between">
//           <span className="flex items-center gap-1.5">
//             <Clock size={12} />
//             Updated
//           </span>
//           <span className="text-zinc-700 dark:text-zinc-300">
//             {agent.updated}
//           </span>
//         </div>
//         <div className="flex items-center justify-between">
//           <span className="flex items-center gap-1.5">
//             <Calendar size={12} />
//             Created
//           </span>
//           <span className="text-zinc-700 dark:text-zinc-300">
//             {agent.created}
//           </span>
//         </div>
//       </div>

//       {/* Row 5: actions */}
//       <div className="mt-4 flex items-center gap-2">
//         <button
//           onClick={(e) => e.stopPropagation()}
//           className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-black/[0.08] bg-white py-2.5 text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-300 dark:hover:bg-white/[0.04]"
//         >
//           <Pause size={12} />
//           Pause
//         </button>

//         {/* ⋯ dropdown trigger */}
//         <div className="relative">
//           <button
//             onClick={onToggleMenu}
//             className="flex h-10 w-10 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-zinc-600 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-400 dark:hover:bg-white/[0.04]"
//           >
//             <MoreHorizontal size={16} />
//           </button>

//           {/* Dropdown menu */}
//           {isMenuOpen && (
//             <div
//               onClick={(e) => e.stopPropagation()}
//               className="absolute right-0 top-full z-20 mt-1 w-40 overflow-hidden rounded-lg border border-black/[0.08] bg-white shadow-xl dark:border-white/[0.08] dark:bg-[#15161a]"
//             >
//               <button
//                 onClick={onEdit}
//                 className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.04] dark:text-zinc-300 dark:hover:bg-white/[0.05]"
//               >
//                 <Pencil size={13} />
//                 Edit Agent
//               </button>
//               <button
//                 onClick={onDelete}
//                 className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] font-medium text-red-500 transition hover:bg-red-500/[0.08] dark:text-red-400"
//               >
//                 <Trash2 size={13} />
//                 Delete Agent
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ============================================================
// // META ROW
// // ============================================================

// function MetaRow({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-center justify-between gap-3 text-[13px]">
//       <span className="flex items-center gap-2 text-zinc-500">
//         <Icon size={13} />
//         {label}
//       </span>
//       <span className="font-medium text-zinc-800 dark:text-zinc-200">
//         {value}
//       </span>
//     </div>
//   );
// // }

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Search, LayoutGrid, List, HelpCircle, Plus, Cpu, Mic, Bot,
//   Clock, Calendar, MoreHorizontal, Pencil, Trash2, Play,Pause,
//   Bell, Settings, ChevronDown,
// } from "lucide-react";

// import AgentDetails from "./AgentDetails";
// import EditAgent from "./EditAgent";
// import DeleteAgent from "./DeleteAgent";

// const initialAgents = [
//   {
//     id: "1",
//     name: "Unnamed Agent",
//     initials: "UA",
//     type: "Single Prompt",
//     description:
//       "No description yet. Add a prompt to define this agent's behavior.",
//     model: "Agni Premium",
//     voice: "Iris",
//     status: "Paused", // ⭐ matches screenshot
//     updated: "Oct 8, 2026 • 6:09 PM",
//     created: "Oct 7, 2026 • 3:31 PM",
//   },
// ];

// export default function Agents() {
//   const navigate = useNavigate();

//   const [agents, setAgents] = useState(initialAgents);
//   const [activeTab, setActiveTab] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [viewMode, setViewMode] = useState("grid");

//   const [detailsAgent, setDetailsAgent] = useState(null);
//   const [editAgent, setEditAgent] = useState(null);
//   const [deleteAgent, setDeleteAgent] = useState(null);

//   const [openMenuId, setOpenMenuId] = useState(null);

//   const filteredAgents = agents.filter((agent) => {
//     const matchesTab =
//       activeTab === "All" ||
//       (activeTab === "Active" && agent.status === "Live") ||
//       (activeTab === "Inactive" && agent.status !== "Live");
//     const matchesSearch = agent.name
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     return matchesTab && matchesSearch;
//   });

//   const handleEdit = (updatedAgent) => {
//     setAgents((prev) =>
//       prev.map((a) => (a.id === updatedAgent.id ? updatedAgent : a))
//     );
//     setEditAgent(null);
//   };

//   const handleDelete = (id) => {
//     setAgents((prev) => prev.filter((a) => a.id !== id));
//     setDeleteAgent(null);
//   };

//   // Toggle between Live <-> Paused
//   const handleToggleStatus = (id) => {
//     setAgents((prev) =>
//       prev.map((a) =>
//         a.id === id
//           ? { ...a, status: a.status === "Live" ? "Paused" : "Live" }
//           : a
//       )
//     );
//   };

//   React.useEffect(() => {
//     const close = () => setOpenMenuId(null);
//     window.addEventListener("click", close);
//     return () => window.removeEventListener("click", close);
//   }, []);

//   return (
//     <div className="min-h-screen bg-white text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
    

//       {/* ============================================================
//           MAIN CONTENT
//           ============================================================ */}
//       <main className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-7">
//         {/* Tabs + Search + View toggle */}
//         <section className="flex flex-wrap items-center justify-between gap-3">
//           {/* Tabs */}
//           <div className="flex items-center gap-1 rounded-lg bg-zinc-100 p-1 dark:bg-white/[0.04]">
//             {["All", "Active", "Inactive"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`rounded-md px-3.5 py-1.5 text-[12px] font-medium transition-all ${
//                   activeTab === tab
//                     ? "bg-white font-semibold text-zinc-900 shadow-sm dark:bg-[#1a1a1d] dark:text-zinc-100"
//                     : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           <div className="flex items-center gap-2">
//             {/* Search agents */}
//             <div className="flex h-9 w-[240px] items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-sm dark:border-white/[0.08] dark:bg-[#101012]">
//               <Search size={14} className="text-zinc-400" />
//               <input
//                 type="text"
//                 placeholder="Search agents..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="min-w-0 flex-1 bg-transparent text-[12px] text-zinc-800 outline-none placeholder:text-zinc-400 dark:text-zinc-200"
//               />
//             </div>

//             {/* Grid / List */}
//             <div className="flex items-center gap-0.5 rounded-lg border border-black/[0.08] bg-white p-0.5 dark:border-white/[0.08] dark:bg-[#101012]">
//               <button
//                 onClick={() => setViewMode("grid")}
//                 className={`rounded-md p-1.5 transition ${
//                   viewMode === "grid"
//                     ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400"
//                     : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
//                 }`}
//               >
//                 <LayoutGrid size={15} />
//               </button>
//               <button
//                 onClick={() => setViewMode("list")}
//                 className={`rounded-md p-1.5 transition ${
//                   viewMode === "list"
//                     ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400"
//                     : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
//                 }`}
//               >
//                 <List size={15} />
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* Grid */}
//         <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
//           {/* New Agent card */}
//           <button
//             onClick={() => navigate("/agents/create")}
//             className="group flex min-h-[340px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-black/[0.15] bg-zinc-50 p-5 transition hover:border-cyan-500/40 hover:bg-cyan-50 dark:border-white/[0.10] dark:bg-white/[0.02] dark:hover:border-cyan-400/40 dark:hover:bg-cyan-500/[0.03]"
//           >
//             <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-zinc-500 shadow-sm transition group-hover:bg-cyan-500/10 group-hover:text-cyan-600 dark:bg-white/[0.05] dark:group-hover:text-cyan-400">
//               <Plus size={20} />
//             </div>
//             <div className="text-center">
//               <p className="text-[14px] font-semibold text-zinc-800 dark:text-zinc-200">
//                 New Agent
//               </p>
//               <p className="mt-0.5 text-[12px] text-zinc-500">
//                 Create AI assistant
//               </p>
//             </div>
//           </button>

//           {/* Agent cards */}
//           {filteredAgents.map((agent) => (
//             <AgentCard
//               key={agent.id}
//               agent={agent}
//               isMenuOpen={openMenuId === agent.id}
//               onToggleMenu={(e) => {
//                 e.stopPropagation();
//                 setOpenMenuId(openMenuId === agent.id ? null : agent.id);
//               }}
//               onOpen={() => setDetailsAgent(agent)}
//               onToggleStatus={(e) => {
//                 e.stopPropagation();
//                 handleToggleStatus(agent.id);
//               }}
//               onEdit={(e) => {
//                 e?.stopPropagation?.();
//                 setOpenMenuId(null);
//                 setEditAgent(agent);
//               }}
//               onDelete={(e) => {
//                 e?.stopPropagation?.();
//                 setOpenMenuId(null);
//                 setDeleteAgent(agent);
//               }}
//             />
//           ))}
//         </section>

//         {filteredAgents.length === 0 && (
//           <div className="rounded-2xl border border-black/[0.06] bg-zinc-50 p-12 text-center dark:border-white/[0.08] dark:bg-[#101012]">
//             <p className="text-sm text-zinc-500">No agents found</p>
//           </div>
//         )}
//       </main>

//       {/* Modals */}
//       <AgentDetails
//         agent={detailsAgent}
//         onClose={() => setDetailsAgent(null)}
//         onEdit={(a) => {
//           setDetailsAgent(null);
//           setEditAgent(a);
//         }}
//         onDelete={(a) => {
//           setDetailsAgent(null);
//           setDeleteAgent(a);
//         }}
//       />

//       <EditAgent
//         agent={editAgent}
//         onClose={() => setEditAgent(null)}
//         onSave={handleEdit}
//         onDelete={(a) => {
//           setEditAgent(null);
//           setDeleteAgent(a);
//         }}
//       />

//       <DeleteAgent
//         agent={deleteAgent}
//         onClose={() => setDeleteAgent(null)}
//         onConfirm={handleDelete}
//       />
//     </div>
//   );
// }

// // ============================================================
// // AGENT CARD
// // ============================================================

// function AgentCard({
//   agent,
//   isMenuOpen,
//   onToggleMenu,
//   onOpen,
//   onToggleStatus,
//   onEdit,
//   onDelete,
// }) {
//   const isLive = agent.status === "Live";
//   const isPaused = agent.status === "Paused";

//   return (
//     <div
//       onClick={onOpen}
//       className="group relative cursor-pointer rounded-2xl border border-black/[0.06] bg-white p-5 transition hover:border-cyan-500/30 hover:shadow-md dark:border-white/[0.08] dark:bg-[#101012] dark:hover:border-cyan-400/30"
//     >
//       {/* Row 1: avatar + name + status badge */}
//       <div className="flex items-start justify-between gap-3">
//         <div className="flex items-center gap-3">
//           {/* White avatar (matches screenshot) */}
//           <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-black/[0.08] bg-white text-[13px] font-bold text-zinc-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-zinc-300">
//             {agent.initials}
//           </div>
//           <div className="min-w-0">
//             <h3 className="truncate text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
//               {agent.name}
//             </h3>
//             <p className="mt-0.5 text-[12px] text-zinc-500">{agent.type}</p>
//           </div>
//         </div>

//         {/* Live badge (green) */}
//         {isLive && (
//           <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/[0.08] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
//             <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
//             Live
//           </span>
//         )}

//         {/* Paused badge (amber) — matches screenshot */}
//         {isPaused && (
//           <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/[0.08] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
//             <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
//             Paused
//           </span>
//         )}
//       </div>

//       {/* Row 2: description */}
//       <p className="mt-4 line-clamp-2 text-[13px] leading-relaxed text-zinc-500">
//         {agent.description}
//       </p>

//       {/* Row 3: meta box */}
//       <div className="mt-4 space-y-2.5 rounded-lg border border-black/[0.05] bg-zinc-50/50 p-3.5 dark:border-white/[0.05] dark:bg-white/[0.02]">
//         <MetaRow icon={Cpu} label="Model" value={agent.model} />
//         <MetaRow icon={Mic} label="Voice" value={agent.voice} />
//         <MetaRow icon={Bot} label="Agent name" value={agent.name} />
//       </div>

//       {/* Row 4: timestamps */}
//       <div className="mt-4 space-y-1.5 text-[12px] text-zinc-500">
//         <div className="flex items-center justify-between">
//           <span className="flex items-center gap-1.5">
//             <Clock size={12} />
//             Updated
//           </span>
//           <span className="text-zinc-700 dark:text-zinc-300">
//             {agent.updated}
//           </span>
//         </div>
//         <div className="flex items-center justify-between">
//           <span className="flex items-center gap-1.5">
//             <Calendar size={12} />
//             Created
//           </span>
//           <span className="text-zinc-700 dark:text-zinc-300">
//             {agent.created}
//           </span>
//         </div>
//       </div>

//       {/* Row 5: actions — "Activate" when paused, "Pause" when live */}
//       <div className="mt-4 flex items-center gap-2">
//         <button
//           onClick={onToggleStatus}
//           className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-[13px] font-semibold transition ${
//             isPaused
//               ? "bg-cyan-500 text-white hover:bg-cyan-400 dark:bg-cyan-400 dark:text-slate-950"
//               : "border border-black/[0.08] bg-white text-zinc-700 hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-300 dark:hover:bg-white/[0.04]"
//           }`}
//         >
//           {isPaused ? (
//             <>
//               <Play size={12} />
//               Activate
//             </>
//           ) : (
//             <>
//               <Pause size={12} />
//               Pause
//             </>
//           )}
//         </button>

//         {/* ⋯ dropdown trigger */}
//         <div className="relative">
//           <button
//             onClick={onToggleMenu}
//             className="flex h-10 w-10 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-zinc-600 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-400 dark:hover:bg-white/[0.04]"
//           >
//             <MoreHorizontal size={16} />
//           </button>

//           {isMenuOpen && (
//             <div
//               onClick={(e) => e.stopPropagation()}
//               className="absolute right-0 top-full z-20 mt-1 w-40 overflow-hidden rounded-lg border border-black/[0.08] bg-white shadow-xl dark:border-white/[0.08] dark:bg-[#15161a]"
//             >
//               <button
//                 onClick={onEdit}
//                 className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.04] dark:text-zinc-300 dark:hover:bg-white/[0.05]"
//               >
//                 <Pencil size={13} />
//                 Edit Agent
//               </button>
//               <button
//                 onClick={onDelete}
//                 className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] font-medium text-red-500 transition hover:bg-red-500/[0.08] dark:text-red-400"
//               >
//                 <Trash2 size={13} />
//                 Delete Agent
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ============================================================
// // META ROW
// // ============================================================

// function MetaRow({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-center justify-between gap-3 text-[13px]">
//       <span className="flex items-center gap-2 text-zinc-500">
//         <Icon size={13} />
//         {label}
//       </span>
//       <span className="font-medium text-zinc-800 dark:text-zinc-200">
//         {value}
//       </span>
//     </div>
//   );
// }


import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Search,
  LayoutGrid,
  List,
  Plus,
  Cpu,
  Mic,
  Bot,
  Clock,
  Calendar,
  MoreHorizontal,
  Pencil,
  Trash2,
  Play,
  Pause,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import AgentDetails from "./AgentDetails";
import EditAgent from "./EditAgent";
import DeleteAgent from "./DeleteAgent";
import config from "../../config/Config";
import agentsApi from "./agentsApi";

const getAccessToken = () =>
  localStorage.getItem("access_token") || localStorage.getItem("accessToken");

const formatDate = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};

const normalizeStatus = (status) => {
  const value = String(status || "inactive").toLowerCase();
  return ["active", "live", "running", "enabled"].includes(value)
    ? "Live"
    : "Paused";
};

const normalizeAgent = (agent) => {
  const name = agent?.name || "Unnamed Agent";
  const builder = agent?.agent_metadata?.builder || agent?.metadata?.builder || {};
  return {
    ...agent,
    id: agent?.id,
    name,
    initials: name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("") || "A",
    type: agent?.type || agent?.agent_type || "AI Agent",
    description:
      agent?.description ||
      agent?.system_prompt?.instruction ||
      agent?.system_prompt ||
      "No description available for this agent.",
    model:
      agent?.llm_model ||
      agent?.model?.name ||
      builder?.model_name ||
      "Not specified",
    voice:
      agent?.voice?.name ||
      (typeof agent?.voice === "string" ? agent.voice : "") ||
      builder?.voice_name ||
      "Not specified",
    status: normalizeStatus(agent?.status),
    updated: formatDate(agent?.updated_at),
    created: formatDate(agent?.created_at),
    rawStatus: agent?.status || "inactive",
  };
};

export default function Agents() {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [detailsAgent, setDetailsAgent] = useState(null);
  const [editAgent, setEditAgent] = useState(null);
  const [deleteAgent, setDeleteAgent] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [total, setTotal] = useState(0);

  const fetchAgents = useCallback(async ({ silent = false } = {}) => {
    if (silent) setRefreshing(true);
    else setLoading(true);
    setErrorMessage("");

    try {
      const token = getAccessToken();
      const response = await axios.get(`${config.BASE_URL}/agents`, {
        headers: {
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      // API response format: { items: [...], total: number }
      const data = response?.data;
      const items = Array.isArray(data) ? data : data?.items;
      if (!Array.isArray(items)) {
        throw new Error("Unexpected response from the agents API. Expected an items array.");
      }
      setAgents(items.map(normalizeAgent));
      setTotal(Number.isFinite(data?.total) ? data.total : items.length);
    } catch (error) {
      console.error("Failed to fetch agents:", error);
      const status = error?.response?.status;
      const detail = error?.response?.data?.detail;
      const message = Array.isArray(detail)
        ? detail.map((item) => item?.msg).filter(Boolean).join(", ")
        : typeof detail === "string"
          ? detail
          : error?.response?.data?.message || error?.response?.data?.error || error?.message;
      const friendlyMessage = status === 401 || status === 403
        ? "You are not authorized to view agents. Please sign in again."
        : message || "Unable to load agents. Please try again.";
      setErrorMessage(friendlyMessage);
      if (silent) toast.error(friendlyMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  useEffect(() => {
    const closeMenu = () => setOpenMenuId(null);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  const filteredAgents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return agents.filter((agent) => {
      const isActive = agent.status === "Live";
      const matchesTab =
        activeTab === "All" ||
        (activeTab === "Active" && isActive) ||
        (activeTab === "Inactive" && !isActive);
      const matchesSearch =
        !query ||
        [agent.name, agent.description, agent.model, agent.voice, agent.id]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query));
      return matchesTab && matchesSearch;
    });
  }, [agents, activeTab, searchQuery]);

  const handleEdit = (updatedAgent) => {
    setAgents((previous) =>
      previous.map((agent) =>
        agent.id === updatedAgent.id ? normalizeAgent({ ...agent, ...updatedAgent }) : agent
      )
    );
    setEditAgent(null);
    setDetailsAgent(null);
    fetchAgents();
  };


const handleToggleStatus = async (id) => {
  const current = agents.find((item) => item.id === id);

  if (!current) {
    toast.error("Agent not found.");
    return;
  }

  console.log("Pause button clicked:", current.id);
  console.log("Current API status:", current.rawStatus);

  const nextStatus =
    String(current.rawStatus).toLowerCase() === "active"
      ? "inactive"
      : "active";

  try {
    const result = await agentsApi.update(id, {
      name: current.name,
      status: nextStatus,
      client_id: current.client_id,
    });

    console.log("Status update response:", result);

    toast.success("Agent status updated.");
    await fetchAgents({ silent: true });
  } catch (error) {
    console.error("Pause API failed:", {
      status: error.response ? error.response.status : null,
      response: error.response ? error.response.data : null,
    });

    toast.error(
      error.response?.data?.detail ||
        "Unable to update agent status."
    );
  }
};



const handleDelete = async (agentOrId) => {
  const id =
    typeof agentOrId === "string"
      ? agentOrId
      : agentOrId?.id;

  if (!id) {
    toast.error("Agent ID not found.");
    return;
  }

  try {
    // DELETE /api/v1/agents/{agent_id}
    await agentsApi.delete(id);

    // Update the UI only after successful API deletion
    setAgents((previous) =>
      previous.filter((agent) => agent.id !== id)
    );

    setTotal((previous) => Math.max(0, previous - 1));

    setDeleteAgent(null);
    setDetailsAgent(null);
    setEditAgent(null);

    toast.success("Agent deleted successfully!");
  } catch (error) {
    console.error("Delete Agent API Error:", {
      status: error?.response?.status,
      response: error?.response?.data || error?.message,
    });

    const responseData = error?.response?.data;
    const detail = responseData?.detail;

    const message =
      typeof detail === "string"
        ? detail
        : typeof responseData?.message === "string"
          ? responseData.message
          : "Failed to delete agent. Please try again.";

    toast.error(message);
  }
};


  return (
    <div className="min-h-screen bg-white text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
      <main className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-7">
        <section className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold">Agents</h1>
            <p className="mt-1 text-sm text-zinc-500">
              Manage your AI agents{total ? ` · ${total} total` : ""}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => fetchAgents({ silent: true })}
              disabled={refreshing || loading}
              className="flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-xs font-medium text-zinc-700 hover:bg-black/[0.03] disabled:opacity-60 dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300 dark:hover:bg-white/[0.04]"
            >
              <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
              Refresh
            </button>
            
          </div>
        </section>

        <section className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 rounded-lg bg-zinc-100 p-1 dark:bg-white/[0.04]">
            {["All", "Active", "Inactive"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-md px-3.5 py-1.5 text-[12px] font-medium transition-all ${
                  activeTab === tab
                    ? "bg-white font-semibold text-zinc-900 shadow-sm dark:bg-[#1a1a1d] dark:text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-[240px] items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-sm dark:border-white/[0.08] dark:bg-[#101012]">
              <Search size={14} className="text-zinc-400" />
              <input
                type="text"
                placeholder="Search agents..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-[12px] text-zinc-800 outline-none placeholder:text-zinc-400 dark:text-zinc-200"
              />
            </div>
            <div className="flex items-center gap-0.5 rounded-lg border border-black/[0.08] bg-white p-0.5 dark:border-white/[0.08] dark:bg-[#101012]">
              <button
                type="button"
                aria-label="Grid view"
                onClick={() => setViewMode("grid")}
                className={`rounded-md p-1.5 transition ${viewMode === "grid" ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"}`}
              >
                <LayoutGrid size={15} />
              </button>
              <button
                type="button"
                aria-label="List view"
                onClick={() => setViewMode("list")}
                className={`rounded-md p-1.5 transition ${viewMode === "list" ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"}`}
              >
                <List size={15} />
              </button>
            </div>
          </div>
        </section>

        {errorMessage && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.06] p-4 text-sm text-red-600 dark:text-red-400">
            <span className="flex items-center gap-2"><AlertCircle size={16} /> {errorMessage}</span>
            <button type="button" onClick={() => fetchAgents()} className="rounded-lg border border-red-500/30 px-3 py-1.5 text-xs font-semibold hover:bg-red-500/10">Try again</button>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => <div key={item} className="h-[280px] animate-pulse rounded-2xl border border-black/[0.06] bg-zinc-100 dark:border-white/[0.08] dark:bg-white/[0.03]" />)}
          </div>
        ) : (
          <section className={viewMode === "grid" ? "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3" : "space-y-3"}>
            <button
              type="button"
              onClick={() => navigate("/agents/create")}
              className={`group flex items-center justify-center gap-3 rounded-2xl border border-dashed border-black/[0.15] bg-zinc-50 p-5 transition hover:border-cyan-500/40 hover:bg-cyan-50 dark:border-white/[0.10] dark:bg-white/[0.02] dark:hover:border-cyan-400/40 dark:hover:bg-cyan-500/[0.03] ${viewMode === "grid" ? "min-h-[180px] flex-col" : "min-h-[90px]"}`}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-zinc-500 shadow-sm transition group-hover:bg-cyan-500/10 group-hover:text-cyan-600 dark:bg-white/[0.05] dark:group-hover:text-cyan-400"><Plus size={20} /></span>
              <span className="text-center"><span className="block text-[14px] font-semibold text-zinc-800 dark:text-zinc-200">New Agent</span><span className="mt-0.5 block text-[12px] text-zinc-500">Create AI assistant</span></span>
            </button>

            {filteredAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                viewMode={viewMode}
                isMenuOpen={openMenuId === agent.id}
                onToggleMenu={(event) => {
                  event.stopPropagation();
                  setOpenMenuId((current) => current === agent.id ? null : agent.id);
                }}
                onOpen={() => setDetailsAgent(agent)}
                onToggleStatus={(event) => { event.stopPropagation(); handleToggleStatus(agent.id); }}
                onEdit={(event) => { event?.stopPropagation?.(); setOpenMenuId(null); setEditAgent(agent); }}
                onDelete={(event) => { event?.stopPropagation?.(); setOpenMenuId(null); setDeleteAgent(agent); }}
              />
            ))}
          </section>
        )}

        {!loading && !errorMessage && filteredAgents.length === 0 && (
          <div className="rounded-2xl border border-black/[0.06] bg-zinc-50 p-12 text-center dark:border-white/[0.08] dark:bg-[#101012]">
            <p className="text-sm text-zinc-500">No agents found</p>
            <p className="mt-1 text-xs text-zinc-400">Try changing your search or selected tab.</p>
          </div>
        )}
      </main>

      <AgentDetails
        agent={detailsAgent}
        onClose={() => setDetailsAgent(null)}
        onEdit={(agent) => { setDetailsAgent(null); setEditAgent(agent); }}
        onDelete={(agent) => { setDetailsAgent(null); setDeleteAgent(agent); }}
      />
      <EditAgent
        agent={editAgent}
        onClose={() => setEditAgent(null)}
        onSave={handleEdit}
        onDelete={(agent) => { setEditAgent(null); setDeleteAgent(agent); }}
      />
      <DeleteAgent
        agent={deleteAgent}
        onClose={() => setDeleteAgent(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

function AgentCard({ agent, viewMode, isMenuOpen, onToggleMenu, onOpen, onToggleStatus, onEdit, onDelete }) {
  const isLive = agent.status === "Live";
  const isList = viewMode === "list";
  return (
    <article
      onClick={onOpen}
      className={`group relative cursor-pointer rounded-2xl border border-black/[0.06] bg-white p-5 transition hover:border-cyan-500/30 hover:shadow-md dark:border-white/[0.08] dark:bg-[#101012] dark:hover:border-cyan-400/30 ${isList ? "flex flex-wrap items-center gap-5" : ""}`}
    >
      <div className={`flex min-w-0 items-start justify-between gap-3 ${isList ? "flex-1" : ""}`}>
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-black/[0.08] bg-white text-[13px] font-bold text-zinc-700 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-zinc-300">{agent.initials}</div>
          <div className="min-w-0"><h3 className="truncate text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">{agent.name}</h3><p className="mt-0.5 text-[12px] text-zinc-500">{agent.type}</p></div>
        </div>
        <span className={`flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${isLive ? "border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-600 dark:text-emerald-400" : "border-amber-500/30 bg-amber-500/[0.08] text-amber-600 dark:text-amber-400"}`}><span className={`h-1.5 w-1.5 rounded-full ${isLive ? "bg-emerald-500" : "bg-amber-500"}`} />{agent.status}</span>
      </div>

      {!isList && <p className="mt-4 line-clamp-2 min-h-[38px] text-[13px] leading-relaxed text-zinc-500">{agent.description}</p>}
      <div className={`rounded-lg border border-black/[0.05] bg-zinc-50/50 p-3.5 dark:border-white/[0.05] dark:bg-white/[0.02] ${isList ? "flex flex-wrap gap-x-6 gap-y-2" : "mt-4 space-y-2.5"}`}>
        <MetaRow icon={Cpu} label="Model" value={agent.model} />
        <MetaRow icon={Mic} label="Voice" value={agent.voice} />
        <MetaRow icon={Bot} label="Agent name" value={agent.name} />
      </div>
      {!isList && <div className="mt-4 space-y-1.5 text-[12px] text-zinc-500"><div className="flex items-center justify-between gap-3"><span className="flex items-center gap-1.5"><Clock size={12} />Updated</span><span className="text-right text-zinc-700 dark:text-zinc-300">{agent.updated}</span></div><div className="flex items-center justify-between gap-3"><span className="flex items-center gap-1.5"><Calendar size={12} />Created</span><span className="text-right text-zinc-700 dark:text-zinc-300">{agent.created}</span></div></div>}
      <div className={`flex items-center gap-2 ${isList ? "ml-auto" : "mt-4"}`}>
        <button type="button" onClick={onToggleStatus} className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-[13px] font-semibold transition ${!isLive ? "bg-cyan-500 text-white hover:bg-cyan-400 dark:bg-cyan-400 dark:text-slate-950" : "border border-black/[0.08] bg-white text-zinc-700 hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-300 dark:hover:bg-white/[0.04]"}`}>{isLive ? <><Pause size={12} />Pause</> : <><Play size={12} />Activate</>}</button>
        <div className="relative">
          <button type="button" aria-label="Agent actions" onClick={onToggleMenu} className="flex h-10 w-10 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-zinc-600 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-400 dark:hover:bg-white/[0.04]"><MoreHorizontal size={16} /></button>
          {isMenuOpen && <div onClick={(event) => event.stopPropagation()} className="absolute right-0 top-full z-20 mt-1 w-40 overflow-hidden rounded-lg border border-black/[0.08] bg-white shadow-xl dark:border-white/[0.08] dark:bg-[#15161a]"><button type="button" onClick={onEdit} className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.04] dark:text-zinc-300 dark:hover:bg-white/[0.05]"><Pencil size={13} />Edit Agent</button><button type="button" onClick={onDelete} className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] font-medium text-red-500 transition hover:bg-red-500/[0.08] dark:text-red-400"><Trash2 size={13} />Delete Agent</button></div>}
        </div>
      </div>
    </article>
  );
}

function MetaRow({ icon: Icon, label, value }) {
  return <div className="flex items-center justify-between gap-3 text-[13px]"><span className="flex items-center gap-2 text-zinc-500"><Icon size={13} />{label}</span><span className="max-w-[65%] truncate text-right font-medium text-zinc-800 dark:text-zinc-200" title={String(value || "")}>{value || "—"}</span></div>;
}
