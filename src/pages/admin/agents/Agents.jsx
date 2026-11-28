


// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {
//   Search,
//   LayoutGrid,
//   List,
//   Plus,
//   Cpu,
//   Mic,
//   Bot,
//   Clock,
//   Calendar,
//   MoreHorizontal,
//   Pencil,
//   Trash2,
//   Play,
//   Pause,
//   AlertCircle,
//   Compass,
// } from "lucide-react";
// import { toast } from "react-toastify";
// import DeleteAgent from "./DeleteAgent";
// import config from "../../../config/Config";
// import agentsApi from "./agentsApi";

// const getAccessToken = () =>
//   localStorage.getItem("access_token") || localStorage.getItem("accessToken");

// // Display format: "Oct 9, 2026 · 1:18 PM"
// const formatDate = (value) => {
//   if (!value) return "—";
//   const date = new Date(value);
//   if (Number.isNaN(date.getTime())) return "—";
//   const day = new Intl.DateTimeFormat("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   }).format(date);
//   const time = new Intl.DateTimeFormat("en-US", {
//     hour: "numeric",
//     minute: "2-digit",
//   }).format(date);
//   return `${day} · ${time}`;
// };

// const normalizeStatus = (status) => {
//   const value = String(status || "inactive").toLowerCase();
//   return ["active", "live", "running", "enabled"].includes(value)
//     ? "Live"
//     : "Paused";
// };

// const normalizeAgent = (agent) => {
//   const name = agent?.name || "Unnamed Agent";
//   const builder = agent?.agent_metadata?.builder || agent?.metadata?.builder || {};
//   return {
//     ...agent,
//     id: agent?.id,
//     name,
//     initials: name
//       .trim()
//       .split(/\s+/)
//       .filter(Boolean)
//       .slice(0, 2)
//       .map((part) => part[0]?.toUpperCase() || "")
//       .join("") || "A",
//     type: agent?.type || agent?.agent_type || "AI Agent",
//     description:
//       agent?.description ||
//       agent?.system_prompt?.instruction ||
//       agent?.system_prompt ||
//       "No description available for this agent.",
//     model:
//       agent?.llm_model ||
//       agent?.model?.name ||
//       builder?.model_name ||
//       "Not specified",
//     voice:
//       agent?.voice?.name ||
//       (typeof agent?.voice === "string" ? agent.voice : "") ||
//       builder?.voice_name ||
//       "Not specified",
//     status: normalizeStatus(agent?.status),
//     updated: formatDate(agent?.updated_at),
//     created: formatDate(agent?.created_at),
//     rawStatus: agent?.status || "inactive",
//   };
// };

// export default function Agents() {
//   const navigate = useNavigate();
//   const [agents, setAgents] = useState([]);
//   const [activeTab, setActiveTab] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [viewMode, setViewMode] = useState("grid");
//   const [deleteAgent, setDeleteAgent] = useState(null);
//   const [openMenuId, setOpenMenuId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [total, setTotal] = useState(0);

//   const fetchAgents = useCallback(async ({ silent = false } = {}) => {
//     if (silent) setRefreshing(true);
//     else setLoading(true);
//     setErrorMessage("");

//     try {
//       const token = getAccessToken();
//       const response = await axios.get(`${config.BASE_URL}/agents`, {
//         headers: {
//           Accept: "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//       });

//       // API response format: { items: [...], total: number }
//       const data = response?.data;
//       const items = Array.isArray(data) ? data : data?.items;
//       if (!Array.isArray(items)) {
//         throw new Error("Unexpected response from the agents API. Expected an items array.");
//       }
//       setAgents(items.map(normalizeAgent));
//       setTotal(Number.isFinite(data?.total) ? data.total : items.length);
//     } catch (error) {
//       console.error("Failed to fetch agents:", error);
//       const status = error?.response?.status;
//       const detail = error?.response?.data?.detail;
//       const message = Array.isArray(detail)
//         ? detail.map((item) => item?.msg).filter(Boolean).join(", ")
//         : typeof detail === "string"
//           ? detail
//           : error?.response?.data?.message || error?.response?.data?.error || error?.message;
//       const friendlyMessage = status === 401 || status === 403
//         ? "You are not authorized to view agents. Please sign in again."
//         : message || "Unable to load agents. Please try again.";
//       setErrorMessage(friendlyMessage);
//       if (silent) toast.error(friendlyMessage);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchAgents();
//   }, [fetchAgents]);

//   useEffect(() => {
//     const closeMenu = () => setOpenMenuId(null);
//     window.addEventListener("click", closeMenu);
//     return () => window.removeEventListener("click", closeMenu);
//   }, []);

//   // Tell the Header how many agents there are ("1 total agents")
//   useEffect(() => {
//     if (loading) return;
//     window.__agentsMeta = { total };
//     window.dispatchEvent(new CustomEvent("agents-meta", { detail: { total } }));
//   }, [total, loading]);

//   const filteredAgents = useMemo(() => {
//     const query = searchQuery.trim().toLowerCase();
//     return agents.filter((agent) => {
//       const isActive = agent.status === "Live";
//       const matchesTab =
//         activeTab === "All" ||
//         (activeTab === "Active" && isActive) ||
//         (activeTab === "Inactive" && !isActive);
//       const matchesSearch =
//         !query ||
//         [agent.name, agent.description, agent.model, agent.voice, agent.id]
//           .filter(Boolean)
//           .some((value) => String(value).toLowerCase().includes(query));
//       return matchesTab && matchesSearch;
//     });
//   }, [agents, activeTab, searchQuery]);

// const handleToggleStatus = async (id) => {
//   const current = agents.find((item) => item.id === id);

//   if (!current) {
//     toast.error("Agent not found.");
//     return;
//   }

//   console.log("Pause button clicked:", current.id);
//   console.log("Current API status:", current.rawStatus);

//   const nextStatus =
//     String(current.rawStatus).toLowerCase() === "active"
//       ? "inactive"
//       : "active";

//   try {
//     const result = await agentsApi.update(id, {
//       name: current.name,
//       status: nextStatus,
//       client_id: current.client_id,
//     });

//     console.log("Status update response:", result);

//     toast.success("Agent status updated.");
//     await fetchAgents({ silent: true });
//   } catch (error) {
//     console.error("Pause API failed:", {
//       status: error.response ? error.response.status : null,
//       response: error.response ? error.response.data : null,
//     });

//     toast.error(
//       error.response?.data?.detail ||
//         "Unable to update agent status."
//     );
//   }
// };



// const handleDelete = async (agentOrId) => {
//   const id =
//     typeof agentOrId === "string"
//       ? agentOrId
//       : agentOrId?.id;

//   if (!id) {
//     toast.error("Agent ID not found.");
//     return;
//   }

//   try {
//     // DELETE /api/v1/agents/{agent_id}
//     await agentsApi.delete(id);

//     // Update the UI only after successful API deletion
//     setAgents((previous) =>
//       previous.filter((agent) => agent.id !== id)
//     );

//     setTotal((previous) => Math.max(0, previous - 1));

//     setDeleteAgent(null);

//     toast.success("Agent deleted successfully!");
//   } catch (error) {
//     console.error("Delete Agent API Error:", {
//       status: error?.response?.status,
//       response: error?.response?.data || error?.message,
//     });

//     const responseData = error?.response?.data;
//     const detail = responseData?.detail;

//     const message =
//       typeof detail === "string"
//         ? detail
//         : typeof responseData?.message === "string"
//           ? responseData.message
//           : "Failed to delete agent. Please try again.";

//     toast.error(message);
//   }
// };

//   const isGrid = viewMode === "grid";

//   // Edit opens the same builder page as "New Agent", in edit mode
//   const goEdit = (agent) => {
//     if (!agent?.id) {
//       toast.error("Agent ID not found.");
//       return;
//     }
//     navigate(`/agents/create?edit=${agent.id}`, {
//       state: { mode: "edit", agentId: agent.id, agent },
//     });
//   };

//   return (
//     <div
//       aria-busy={refreshing}
//       className="min-h-full bg-zinc-50 text-zinc-900 transition-colors duration-300 dark:bg-[#08090B] dark:text-zinc-100"
//     >
//       <main className="mx-auto max-w-[1600px] space-y-[26px] px-4 pb-8 pt-[30px] sm:px-[30px]">
//         {/* ================= TOOLBAR ================= */}
//         <section className="flex flex-wrap items-center justify-between gap-3">
//           <div className="flex items-center gap-0.5 rounded-[10px] border border-black/[0.08] bg-white p-[5px] dark:border-white/[0.09] dark:bg-[#0D0F12]">
//             {["All", "Active", "Inactive"].map((tab) => (
//               <button
//                 key={tab}
//                 type="button"
//                 onClick={() => setActiveTab(tab)}
//                 className={`h-[41px] rounded-lg px-[15px] text-[14px] leading-none transition-colors ${
//                   activeTab === tab
//                     ? "bg-cyan-500/15 font-semibold text-cyan-600 dark:text-cyan-400"
//                     : "font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           <div className="flex items-center gap-[11px]">
//             <div className="flex h-[45px] w-full min-w-[200px] items-center gap-[11px] rounded-[10px] border border-black/[0.08] bg-white px-[17px] focus-within:border-cyan-500/40 sm:w-[319px] dark:border-white/[0.09] dark:bg-[#0D0F12]">
//               <Search size={17} className="shrink-0 text-zinc-400" />
//               <input
//                 type="text"
//                 placeholder="Search agents..."
//                 value={searchQuery}
//                 onChange={(event) => setSearchQuery(event.target.value)}
//                 className="min-w-0 flex-1 bg-transparent text-[15px] text-zinc-800 outline-none placeholder:text-zinc-400 dark:text-zinc-200"
//               />
//             </div>

//             <div className="flex h-[45px] items-center gap-px rounded-[10px] border border-black/[0.08] bg-white p-[5px] dark:border-white/[0.09] dark:bg-[#0D0F12]">
//               <button
//                 type="button"
//                 aria-label="Grid view"
//                 onClick={() => setViewMode("grid")}
//                 className={`flex h-[35px] w-[35px] items-center justify-center rounded-md transition ${
//                   isGrid
//                     ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400"
//                     : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
//                 }`}
//               >
//                 <LayoutGrid size={17} />
//               </button>
//               <button
//                 type="button"
//                 aria-label="List view"
//                 onClick={() => setViewMode("list")}
//                 className={`flex h-[35px] w-[35px] items-center justify-center rounded-md transition ${
//                   !isGrid
//                     ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400"
//                     : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
//                 }`}
//               >
//                 <List size={17} />
//               </button>
//             </div>

//             <button
//               type="button"
//               aria-label="Guide me"
//               onClick={() =>
//                 window.dispatchEvent(
//                   new CustomEvent("start-tour", { detail: { path: "/agents" } })
//                 )
//               }
//               className="-ml-[3px] flex h-9 w-9 items-center justify-center rounded-lg text-cyan-500 transition hover:bg-cyan-500/10"
//             >
//               <Compass size={18} />
//             </button>
//           </div>
//         </section>

//         {/* ================= ERROR ================= */}
//         {errorMessage && (
//           <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.06] p-4 text-sm text-red-600 dark:text-red-400">
//             <span className="flex items-center gap-2"><AlertCircle size={16} /> {errorMessage}</span>
//             <button type="button" onClick={() => fetchAgents()} className="rounded-lg border border-red-500/30 px-3 py-1.5 text-xs font-semibold hover:bg-red-500/10">Try again</button>
//           </div>
//         )}

//         {/* ================= CONTENT ================= */}
//         {loading ? (
//           <div className={`grid grid-cols-1 gap-[15px] ${isGrid ? "md:grid-cols-2 xl:grid-cols-3" : ""}`}>
//             {[1, 2, 3].slice(0, isGrid ? 3 : 1).map((item) => (
//               <div
//                 key={item}
//                 className="h-[429px] animate-pulse rounded-[20px] border border-black/[0.06] bg-zinc-100 dark:border-white/[0.08] dark:bg-white/[0.03]"
//               />
//             ))}
//           </div>
//         ) : (
//           <section
//             className={`grid grid-cols-1 gap-[15px] ${isGrid ? "md:grid-cols-2 xl:grid-cols-3" : ""}`}
//           >
//             {/* New Agent tile — grid view only */}
//             {isGrid && (
//               <button
//                 type="button"
//                 onClick={() => navigate("/agents/create")}
//                 className="group flex min-h-[300px] flex-col items-center justify-center rounded-[20px] border border-black/[0.08] bg-white p-6 text-center transition hover:border-cyan-500/30 dark:border-white/[0.09] dark:bg-[#0C0D10] dark:hover:border-cyan-400/25"
//               >
//                 <span className="flex h-[60px] w-[60px] items-center justify-center rounded-xl border border-black/[0.1] bg-zinc-50 text-zinc-600 transition group-hover:border-cyan-500/30 group-hover:text-cyan-500 dark:border-white/[0.13] dark:bg-[#0F1013] dark:text-zinc-300 dark:group-hover:text-cyan-400">
//                   <Plus size={22} strokeWidth={1.8} />
//                 </span>
//                 <span className="mt-4 block text-[18px] font-bold leading-6 text-zinc-900 dark:text-zinc-50">
//                   New Agent
//                 </span>
//                 <span className="mt-[9px] block text-[14px] leading-5 text-zinc-500 dark:text-zinc-400">
//                   Create AI assistant
//                 </span>
//               </button>
//             )}

//             {filteredAgents.map((agent) => (
//               <AgentCard
//                 key={agent.id}
//                 agent={agent}
//                 isMenuOpen={openMenuId === agent.id}
//                 onToggleMenu={(event) => {
//                   event.stopPropagation();
//                   setOpenMenuId((current) => current === agent.id ? null : agent.id);
//                 }}
//                 onOpen={() => goEdit(agent)}
//                 onToggleStatus={(event) => { event.stopPropagation(); handleToggleStatus(agent.id); }}
//                 onEdit={(event) => { event?.stopPropagation?.(); setOpenMenuId(null); goEdit(agent); }}
//                 onDelete={(event) => { event?.stopPropagation?.(); setOpenMenuId(null); setDeleteAgent(agent); }}
//               />
//             ))}
//           </section>
//         )}

//         {/* ================= EMPTY STATE ================= */}
//         {!loading && !errorMessage && filteredAgents.length === 0 && (
//           <div className="rounded-[20px] border border-dashed border-black/[0.12] px-6 py-12 text-center dark:border-white/[0.1]">
//             <p className="text-[16px] font-semibold text-zinc-900 dark:text-zinc-50">
//               No agents found
//             </p>
//             <p className="mt-1.5 text-[14px] text-zinc-500 dark:text-zinc-400">
//               Try a different search query or filter.
//             </p>
//           </div>
//         )}
//       </main>

//       <DeleteAgent
//         agent={deleteAgent}
//         onClose={() => setDeleteAgent(null)}
//         onConfirm={handleDelete}
//       />
//     </div>
//   );
// }

// function AgentCard({ agent, isMenuOpen, onToggleMenu, onOpen, onToggleStatus, onEdit, onDelete }) {
//   const isLive = agent.status === "Live";

//   return (
//     <article
//       onClick={onOpen}
//       className={`group relative flex cursor-pointer flex-col rounded-[20px] border bg-white p-[25px] transition dark:bg-[#0C0D10] ${
//         isLive
//           ? "border-cyan-500/60 dark:border-cyan-400/70"
//           : "border-black/[0.08] hover:border-cyan-500/30 dark:border-white/[0.09] dark:hover:border-cyan-400/25"
//       }`}
//     >
//       {/* HEADER */}
//       <div className="flex min-w-0 items-start justify-between gap-3">
//         <div className="flex min-w-0 items-center gap-4">
//           <div className={`flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-xl border text-[15px] font-semibold ${
//               isLive
//                 ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-600 dark:border-cyan-400/40 dark:bg-cyan-400/10 dark:text-cyan-400"
//                 : "border-black/[0.08] bg-zinc-50 text-zinc-700 dark:border-white/[0.1] dark:bg-[#0F1013] dark:text-zinc-200"
//             }`}>
//             {agent.initials}
//           </div>
//           <div className="min-w-0">
//             <h3 className={`truncate text-[18px] font-bold leading-[22px] ${
//                 isLive ? "text-cyan-600 dark:text-cyan-400" : "text-zinc-900 dark:text-zinc-50"
//               }`}>
//               {agent.name}
//             </h3>
//             <p className="mt-[11px] text-[13px] leading-[18px] text-zinc-500 dark:text-zinc-300">
//               {agent.type}
//             </p>
//           </div>
//         </div>

//         <span
//           className={`inline-flex h-[26px] shrink-0 items-center gap-1.5 rounded-full border px-3 text-[12px] font-bold ${
//             isLive
//               ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-600 dark:text-emerald-400"
//               : "border-amber-400/40 bg-amber-400/10 text-amber-600 dark:text-amber-400"
//           }`}
//         >
//           <span className={`h-1.5 w-1.5 rounded-full ${isLive ? "bg-emerald-500" : "bg-amber-400"}`} />
//           {agent.status}
//         </span>
//       </div>

//       {/* DESCRIPTION */}
//       <p className="mt-6 line-clamp-2 text-[14px] leading-5 text-zinc-500">
//         {agent.description}
//       </p>

//       {/* META BOX */}
//       <div className="mt-[22px] space-y-[14px] rounded-xl border border-black/[0.06] bg-zinc-50/60 px-5 py-4 dark:border-white/[0.08] dark:bg-white/[0.02]">
//         <MetaRow icon={Cpu} label="Model" value={agent.model} />
//         <MetaRow icon={Mic} label="Voice" value={agent.voice} />
//         <MetaRow icon={Bot} label="Agent name" value={agent.name} />
//       </div>

//       {/* DATES */}
//       <div className="mt-5 space-y-[7px] border-t border-black/[0.06] pt-[17px] text-[13px] leading-[18px] dark:border-white/[0.08]">
//         <div className="flex items-center justify-between gap-3">
//           <span className="flex items-center gap-3.5 text-zinc-500 dark:text-zinc-400">
//             <Clock size={16} strokeWidth={1.6} />
//             Updated
//           </span>
//           <span className="text-right font-medium text-zinc-700 dark:text-zinc-300">{agent.updated}</span>
//         </div>
//         <div className="flex items-center justify-between gap-3">
//           <span className="flex items-center gap-3.5 text-zinc-500 dark:text-zinc-400">
//             <Calendar size={16} strokeWidth={1.6} />
//             Created
//           </span>
//           <span className="text-right font-medium text-zinc-700 dark:text-zinc-300">{agent.created}</span>
//         </div>
//       </div>

//       {/* ACTIONS */}
//       <div className="mt-auto flex items-center gap-2.5 pt-[22px]">
//         <button
//           type="button"
//           onClick={onToggleStatus}
//           className={`flex h-10 flex-1 items-center justify-center gap-2 rounded-lg text-[14px] font-semibold transition ${
//             !isLive
//               ? "bg-cyan-400 text-slate-950 hover:bg-cyan-300"
//               : "border border-amber-500/50 bg-amber-500/10 text-amber-600 hover:bg-amber-500/15 dark:border-amber-500/45 dark:text-amber-400"
//           }`}
//         >
//           {isLive ? (
//             <>
//               <Pause size={14} />
//               Pause
//             </>
//           ) : (
//             <>
//               <Play size={14} />
//               Activate
//             </>
//           )}
//         </button>

//         <div className="relative">
//           <button
//             type="button"
//             aria-label="Agent actions"
//             onClick={onToggleMenu}
//             className="flex h-10 w-10 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-zinc-600 transition hover:bg-black/[0.03] dark:border-white/[0.1] dark:bg-white/[0.03] dark:text-zinc-400 dark:hover:bg-white/[0.06]"
//           >
//             <MoreHorizontal size={16} />
//           </button>

//           {isMenuOpen && (
//             <div
//               onClick={(event) => event.stopPropagation()}
//               className="absolute bottom-full right-0 z-20 mb-1 w-40 overflow-hidden rounded-lg border border-black/[0.08] bg-white shadow-xl dark:border-white/[0.08] dark:bg-[#15161a]"
//             >
//               <button
//                 type="button"
//                 onClick={onEdit}
//                 className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.04] dark:text-zinc-300 dark:hover:bg-white/[0.05]"
//               >
//                 <Pencil size={13} />
//                 Edit Agent
//               </button>
//               <button
//                 type="button"
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
//     </article>
//   );
// }

// function MetaRow({ icon: Icon, label, value }) {
//   return (
//     <div className="flex items-center justify-between gap-3 text-[14px] leading-[18px]">
//       <span className="flex items-center gap-3.5 text-zinc-500 dark:text-zinc-400">
//         <Icon size={16} strokeWidth={1.6} />
//         {label}
//       </span>
//       <span
//         className="max-w-[65%] truncate text-right font-bold text-zinc-900 dark:text-zinc-50"
//         title={String(value || "")}
//       >
//         {value || "—"}
//       </span>
//     </div>
//   );
// }


// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Plus,
//   Search,
//   RefreshCw,
//   Bot,
//   Pencil,
//   Trash2,
//   Eye,
//   Power,
//   Loader2,
//   AlertCircle,
//   X,
// } from "lucide-react";
// import { toast } from "react-toastify";

// import ThemeToggle from "../../../components/ThemeToggle";
// import agentsApi, { getApiError } from "./agentsApi";
// import DeleteAgent from "./DeleteAgent";
// import ViewAgent from "./ViewAgent";
// const Agents = () => {
//   const navigate = useNavigate();

//   const [agents, setAgents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("all");
//   const [view, setView] = useState("grid");
//   const [deleteAgent, setDeleteAgent] = useState(null);
//   const [deleting, setDeleting] = useState(false);
//   const [statusUpdating, setStatusUpdating] = useState(null);
//   const [viewingAgentId, setViewingAgentId] = useState(null);

//   // const fetchAgents = useCallback(async (showLoader = true) => {
//   //   if (showLoader) setLoading(true);
//   //   setError("");

//   //   try {
//   //     const params = {};

//   //     if (filter === "active") params.status = "active";
//   //     if (filter === "inactive") params.status = "inactive";

//   //     const data = await agentsApi.getAll(params);
//   //     const records = Array.isArray(data) ? data : data?.items || [];

//   //     setAgents(records);
//   //   } catch (err) {
//   //     const message = getApiError(err);
//   //     setError(message);
//   //     toast.error(message);
//   //   } finally {
//   //     setLoading(false);
//   //     setRefreshing(false);
//   //   }
//   // }, [filter]);


  
// const fetchAgents = useCallback(async (showLoader = true) => {
//     if (showLoader) setLoading(true);
//     setError("");

//     try {
//         const params = {};

//         if (filter === "active") params.status = "active";
//         if (filter === "inactive") params.status = "inactive";

//         const data = await agentsApi.getAll(params);

//         const records = Array.isArray(data)
//             ? data
//             : data && Array.isArray(data.items)
//                 ? data.items
//                 : [];

//         // The list endpoint returns summary fields.
//         // Fetch full details to display model and voice.
//         const detailedRecords = await Promise.all(
//             records.map(async function (agent) {
//                 try {
//                     return await agentsApi.getById(agent.id);
//                 } catch (detailError) {
//                     console.error(
//                         "Unable to load agent details:",
//                         agent.id,
//                         detailError
//                     );

//                     return agent;
//                 }
//             })
//         );

//         setAgents(detailedRecords);
//     } catch (err) {
//         const message = getApiError(err);
//         setError(message);
//         toast.error(message);
//     } finally {
//         setLoading(false);
//         setRefreshing(false);
//     }
// }, [filter]);



//   useEffect(() => {
//     fetchAgents();
//   }, [fetchAgents]);

//   const filteredAgents = useMemo(() => {
//     const query = search.trim().toLowerCase();

//     if (!query) return agents;

//     return agents.filter((agent) =>
//       [
//         agent.name,
//         agent.id,
//         agent.status,
//         agent.llm_model,
//         agent.voice,
//         agent.system_prompt,
//       ]
//         .filter(Boolean)
//         .join(" ")
//         .toLowerCase()
//         .includes(query)
//     );
//   }, [agents, search]);

//   const handleRefresh = () => {
//     setRefreshing(true);
//     fetchAgents(false);
//   };

//   const handleStatusToggle = async (agent) => {
//     const nextStatus =
//       String(agent.status).toLowerCase() === "active"
//         ? "inactive"
//         : "active";

//     setStatusUpdating(agent.id);

//     try {
//       await agentsApi.updateStatus(agent.id, nextStatus);

//       setAgents((previous) =>
//         previous.map((item) =>
//           item.id === agent.id
//             ? { ...item, status: nextStatus }
//             : item
//         )
//       );

//       toast.success(
//         nextStatus === "active"
//           ? "Agent activated successfully"
//           : "Agent paused successfully"
//       );
//     } catch (err) {
//       toast.error(getApiError(err));
//     } finally {
//       setStatusUpdating(null);
//     }
//   };

//   const handleDelete = async () => {
//     if (!deleteAgent?.id) return;

//     setDeleting(true);

//     try {
//       await agentsApi.delete(deleteAgent.id);

//       setAgents((previous) =>
//         previous.filter((agent) => agent.id !== deleteAgent.id)
//       );

//       toast.success("Agent deleted successfully");
//       setDeleteAgent(null);
//     } catch (err) {
//       toast.error(getApiError(err));
//     } finally {
//       setDeleting(false);
//     }
//   };

//   const isActive = (status) =>
//     String(status).toLowerCase() === "active";

//   return (
//     <div className="min-h-screen bg-zinc-50 px-4 py-5 text-zinc-900 dark:bg-[#08090B] dark:text-zinc-100 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-[1500px]">
//         <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//           <div>
//             <div className="flex items-center gap-2">
//               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
//                 <Bot size={21} />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
//                   AI Agents
//                 </h1>
//                 <p className="mt-0.5 text-xs text-zinc-500">
//                   Create, manage and monitor your AI agents
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* <div className="flex items-center gap-2">
//             <ThemeToggle />
//             <button
//               onClick={handleRefresh}
//               disabled={refreshing}
//               className="flex h-10 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 text-xs font-semibold hover:bg-zinc-50 disabled:opacity-50 dark:border-white/10 dark:bg-[#111315] dark:hover:bg-white/5"
//             >
//               <RefreshCw
//                 size={14}
//                 className={refreshing ? "animate-spin" : ""}
//               />
//               Refresh
//             </button>

//             <button
//               onClick={() => navigate("/agents/create")}
//               className="flex h-10 items-center gap-2 rounded-lg bg-cyan-500 px-4 text-xs font-semibold text-white transition hover:bg-cyan-400"
//             >
//               <Plus size={15} />
//               Create Agent
//             </button>
//           </div> */}
//         </div>

//         <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
//           {[
//             {
//               label: "Agents loaded",
//               value: agents.length,
//             },
//             {
//               label: "Active",
//               value: agents.filter((a) => isActive(a.status)).length,
//             },
//             {
//               label: "Inactive",
//               value: agents.filter((a) => !isActive(a.status)).length,
//             },
//           ].map((item) => (
//             <div
//               key={item.label}
//               className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/[0.07] dark:bg-[#111315]"
//             >
//               <p className="text-xs text-zinc-500">{item.label}</p>
//               <p className="mt-2 text-2xl font-bold tabular-nums">
//                 {item.value}
//               </p>
//             </div>
//           ))}
//         </div>

//         <div className="mb-5 flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-3 dark:border-white/[0.07] dark:bg-[#111315] sm:flex-row sm:items-center">
//           <div className="relative flex-1">
//             <Search
//               size={15}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
//             />
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search by name, ID, model or voice..."
//               className="h-10 w-full rounded-lg border border-zinc-200 bg-zinc-50 pl-9 pr-9 text-xs outline-none focus:border-cyan-500 dark:border-white/10 dark:bg-[#0b0c0e]"
//             />
//             {search && (
//               <button
//                 onClick={() => setSearch("")}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
//               >
//                 <X size={14} />
//               </button>
//             )}
//           </div>

//           <div className="flex items-center gap-1 rounded-lg bg-zinc-100 p-1 dark:bg-[#08090B]">
//             {["all", "active", "inactive"].map((item) => (
//               <button
//                 key={item}
//                 onClick={() => setFilter(item)}
//                 className={`rounded-md px-3 py-2 text-[11px] font-semibold capitalize transition ${
//                   filter === item
//                     ? "bg-white text-zinc-900 shadow-sm dark:bg-[#25282c] dark:text-white"
//                     : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
//                 }`}
//               >
//                 {item}
//               </button>
//             ))}
//           </div>

//           <div className="flex rounded-lg bg-zinc-100 p-1 dark:bg-[#08090B]">
//             <button
//               onClick={() => setView("grid")}
//               className={`rounded-md px-3 py-2 text-[11px] ${
//                 view === "grid"
//                   ? "bg-white font-semibold shadow-sm dark:bg-[#25282c]"
//                   : "text-zinc-500"
//               }`}
//             >
//               Grid
//             </button>
//             <button
//               onClick={() => setView("list")}
//               className={`rounded-md px-3 py-2 text-[11px] ${
//                 view === "list"
//                   ? "bg-white font-semibold shadow-sm dark:bg-[#25282c]"
//                   : "text-zinc-500"
//               }`}
//             >
//               List
//             </button>
//           </div>
//         </div>

//         {error && (
//           <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-500">
//             <AlertCircle size={15} className="mt-0.5 shrink-0" />
//             {error}
//           </div>
//         )}

//         {loading ? (
//           <div className="flex min-h-[280px] items-center justify-center gap-2 text-sm text-zinc-500">
//             <Loader2 size={18} className="animate-spin" />
//             Loading agents...
//           </div>
//         ) : filteredAgents.length === 0 ? (
//           <div className="rounded-xl border border-dashed border-zinc-300 px-5 py-16 text-center dark:border-white/10">
//             <Bot size={32} className="mx-auto mb-3 text-zinc-400" />
//             <h3 className="text-sm font-semibold">No agents found</h3>
//             <p className="mt-1 text-xs text-zinc-500">
//               {search
//                 ? "Try another search term."
//                 : "Create your first AI agent to get started."}
//             </p>
//             {!search && (
//               <button
//                 onClick={() => navigate("/agents/create")}
//                 className="mt-4 rounded-lg bg-cyan-500 px-4 py-2.5 text-xs font-semibold text-white"
//               >
//                 Create Agent
//               </button>
//             )}
//           </div>
//         ) : (
//           <div
//             className={
//               view === "grid"
//                 ? "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
//                 : "space-y-3"
//             }
//           >
//             {filteredAgents.map((agent) => (
//               <div
//                 key={agent.id}
//                 className={`rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-cyan-500/30 dark:border-white/[0.07] dark:bg-[#111315] ${
//                   view === "list" ? "flex flex-col gap-4 sm:flex-row sm:items-center" : ""
//                 }`}
//               >
//                 <div className="flex min-w-0 flex-1 items-start gap-3">
//                   <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
//                     <Bot size={20} />
//                   </div>

//                   <div className="min-w-0 flex-1">
//                     <div className="flex flex-wrap items-center gap-2">
//                       <h3 className="truncate text-sm font-bold">
//                         {agent.name || "Unnamed Agent"}
//                       </h3>
//                       <span
//                         className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
//                           isActive(agent.status)
//                             ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
//                             : "bg-zinc-500/10 text-zinc-500"
//                         }`}
//                       >
//                         {agent.status || "unknown"}
//                       </span>
//                     </div>

//                     <p className="mt-1 truncate text-[11px] text-zinc-500">
//                       {agent.llm_model || "Model not specified"}
//                     </p>
//                     <p className="mt-1 truncate text-[11px] text-zinc-500">
//                       Voice: {agent.voice || "Not specified"}
//                     </p>
//                     <p className="mt-2 text-[10px] text-zinc-400">
//                       Calls: {agent.total_calls ?? 0}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-zinc-100 pt-3 dark:border-white/[0.06] sm:mt-0 sm:border-0 sm:pt-0">
//                   <button
//   title="View agent"
//   onClick={() => setViewingAgentId(agent.id)}
//   className="flex h-8 items-center gap-1.5 rounded-lg border border-zinc-200 px-2.5 text-[11px] hover:bg-zinc-50 dark:border-white/10 dark:hover:bg-white/5"
// >
//   <Eye size={13} /> View
// </button>

//                   <button
//                     title="Edit agent"
//                     onClick={() =>
//                       navigate(`/agents/create?edit=${agent.id}`)
//                     }
//                     className="flex h-8 items-center gap-1.5 rounded-lg border border-zinc-200 px-2.5 text-[11px] hover:bg-zinc-50 dark:border-white/10 dark:hover:bg-white/5"
//                   >
//                     <Pencil size={13} /> Edit
//                   </button>

//                   <button
//                     title={isActive(agent.status) ? "Pause agent" : "Activate agent"}
//                     disabled={statusUpdating === agent.id}
//                     onClick={() => handleStatusToggle(agent)}
//                     className="flex h-8 items-center gap-1.5 rounded-lg border border-zinc-200 px-2.5 text-[11px] hover:bg-zinc-50 disabled:opacity-50 dark:border-white/10 dark:hover:bg-white/5"
//                   >
//                     {statusUpdating === agent.id ? (
//                       <Loader2 size={13} className="animate-spin" />
//                     ) : (
//                       <Power size={13} />
//                     )}
//                     {isActive(agent.status) ? "Pause" : "Activate"}
//                   </button>

//                   <button
//                     title="Delete agent"
//                     onClick={() => setDeleteAgent(agent)}
//                     className="flex h-8 items-center gap-1.5 rounded-lg border border-red-500/20 px-2.5 text-[11px] text-red-500 hover:bg-red-500/5"
//                   >
//                     <Trash2 size={13} /> Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {deleteAgent && (
//         <DeleteAgent
//           agent={deleteAgent}
//           loading={deleting}
//           onClose={() => !deleting && setDeleteAgent(null)}
//           onConfirm={handleDelete}
//         />
//       )}
//     </div>
//   );
// };

// export default Agents;


import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bot,
  Pencil,
  Trash2,
  Eye,
  Power,
  Loader2,
  AlertCircle,
  X,
} from "lucide-react";
import { toast } from "react-toastify";

import agentsApi, { getApiError } from "./agentsApi";
import DeleteAgent from "./DeleteAgent";
import ViewAgent from "./ViewAgent";

const Agents = () => {
  const navigate = useNavigate();

  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("grid");
  const [deleteAgent, setDeleteAgent] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(null);
  const [viewingAgentId, setViewingAgentId] = useState(null);

  // Fetch agents from backend.
  const fetchAgents = useCallback(async (showLoader = true) => {
    if (showLoader) {
      setLoading(true);
    }

    setError("");

    try {
      const params = {};

      if (filter === "active") {
        params.status = "active";
      }

      if (filter === "inactive") {
        params.status = "inactive";
      }

      const data = await agentsApi.getAll(params);

      const records = Array.isArray(data)
        ? data
        : data && Array.isArray(data.items)
          ? data.items
          : [];

      // Fetch complete details for model and voice.
      const detailedRecords = await Promise.all(
        records.map(async (agent) => {
          try {
            const details = await agentsApi.getById(agent.id);

            return details && details.id
              ? details
              : agent;
          } catch (detailError) {
            console.error(
              "Unable to load agent details:",
              agent.id,
              detailError
            );

            return agent;
          }
        })
      );

      setAgents(detailedRecords);
    } catch (err) {
      const message = getApiError(err);

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  // Search agents.
  const filteredAgents = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return agents;
    }

    return agents.filter((agent) => {
      const searchableValues = [
        agent.name,
        agent.id,
        agent.status,
        agent.llm_model,
        agent.voice,
        agent.system_prompt,
      ];

      return searchableValues
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }, [agents, search]);

  // Refresh list.
  const handleRefresh = () => {
    setRefreshing(true);
    fetchAgents(false);
  };

  // Check agent status.
  const isActive = (status) => {
    return String(status).toLowerCase() === "active";
  };

  // Activate / deactivate agent.
  const handleStatusToggle = async (agent) => {
    const nextStatus = isActive(agent.status)
      ? "inactive"
      : "active";

    setStatusUpdating(agent.id);

    try {
      await agentsApi.updateStatus(agent.id, nextStatus);

      setAgents((previous) =>
        previous.map((item) =>
          item.id === agent.id
            ? { ...item, status: nextStatus }
            : item
        )
      );

      toast.success(
        nextStatus === "active"
          ? "Agent activated successfully"
          : "Agent paused successfully"
      );
    } catch (err) {
      toast.error(
        getApiError(err) || "Unable to update agent status"
      );
    } finally {
      setStatusUpdating(null);
    }
  };

  // Delete agent.
const handleDelete = async () => {
  if (!deleteAgent || !deleteAgent.id) {
    return;
  }

  setDeleting(true);

  try {
    await agentsApi.delete(deleteAgent.id);

    setAgents((previous) =>
      previous.filter(
        (agent) => agent.id !== deleteAgent.id
      )
    );

    toast.success("Agent deleted successfully");
    setDeleteAgent(null);

  } catch (err) {
    console.error("Agent delete error:", err);
    console.error("Backend response:", err.response);

    var message = getApiError(err);

    if (
      message.toLowerCase().includes(
        "cannot delete an agent with call history"
      )
    ) {
      toast.error(
        "This agent has call history and cannot be deleted. Please deactivate it instead."
      );
    } else {
      toast.error(message);
    }

  } finally {
    setDeleting(false);
  }
};

  // Open agent details.
  const handleViewAgent = (agent) => {
    if (!agent || !agent.id) {
      toast.error("Agent ID is missing");
      return;
    }

    setViewingAgentId(agent.id);
  };

  // Return from ViewAgent.
  const handleBackFromView = () => {
    setViewingAgentId(null);
  };

  // Render ViewAgent directly.
  if (viewingAgentId) {
    return (
      <ViewAgent
        agentId={viewingAgentId}
        onBack={handleBackFromView}
      />
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-5 text-zinc-900 dark:bg-[#08090B] dark:text-zinc-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">

        {/* Header */}
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <Bot size={21} />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                AI Agents
              </h1>

              <p className="mt-0.5 text-xs text-zinc-500">
                Create, manage and monitor your AI agents
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            {
              label: "Agents loaded",
              value: agents.length,
            },
            {
              label: "Active",
              value: agents.filter((agent) =>
                isActive(agent.status)
              ).length,
            },
            {
              label: "Inactive",
              value: agents.filter(
                (agent) => !isActive(agent.status)
              ).length,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/[0.07] dark:bg-[#111315]"
            >
              <p className="text-xs text-zinc-500">
                {item.label}
              </p>

              <p className="mt-2 text-2xl font-bold tabular-nums">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Search, filters and view options */}
        <div className="mb-5 flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-3 dark:border-white/[0.07] dark:bg-[#111315] sm:flex-row sm:items-center">

          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by name, ID, model or voice..."
              className="h-10 w-full rounded-lg border border-zinc-200 bg-zinc-50 pl-9 pr-9 text-xs outline-none focus:border-cyan-500 dark:border-white/10 dark:bg-[#0b0c0e]"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                title="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-1 rounded-lg bg-zinc-100 p-1 dark:bg-[#08090B]">
            {["all", "active", "inactive"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-md px-3 py-2 text-[11px] font-semibold capitalize transition ${
                  filter === item
                    ? "bg-white text-zinc-900 shadow-sm dark:bg-[#25282c] dark:text-white"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Grid / List */}
          <div className="flex rounded-lg bg-zinc-100 p-1 dark:bg-[#08090B]">
            <button
              onClick={() => setView("grid")}
              className={`rounded-md px-3 py-2 text-[11px] ${
                view === "grid"
                  ? "bg-white font-semibold shadow-sm dark:bg-[#25282c]"
                  : "text-zinc-500"
              }`}
            >
              Grid
            </button>

            <button
              onClick={() => setView("list")}
              className={`rounded-md px-3 py-2 text-[11px] ${
                view === "list"
                  ? "bg-white font-semibold shadow-sm dark:bg-[#25282c]"
                  : "text-zinc-500"
              }`}
            >
              List
            </button>
          </div>

          {/* Refresh */}
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex h-10 items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 text-xs font-semibold hover:bg-zinc-50 disabled:opacity-50 dark:border-white/10 dark:bg-[#111315] dark:hover:bg-white/5"
          >
            <Loader2
              size={14}
              className={refreshing ? "animate-spin" : "hidden"}
            />

            <span className={refreshing ? "hidden" : ""}>
              Refresh
            </span>
          </button>
        </div>

        {/* API error */}
        {error && (
          <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-500">
            <AlertCircle
              size={15}
              className="mt-0.5 shrink-0"
            />
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-[280px] items-center justify-center gap-2 text-sm text-zinc-500">
            <Loader2 size={18} className="animate-spin" />
            Loading agents...
          </div>
        ) : filteredAgents.length === 0 ? (

          /* Empty state */
          <div className="rounded-xl border border-dashed border-zinc-300 px-5 py-16 text-center dark:border-white/10">
            <Bot
              size={32}
              className="mx-auto mb-3 text-zinc-400"
            />

            <h3 className="text-sm font-semibold">
              No agents found
            </h3>

            <p className="mt-1 text-xs text-zinc-500">
              {search
                ? "Try another search term."
                : "Create your first AI agent to get started."}
            </p>

            {!search && (
              <button
                onClick={() => navigate("/agents/create")}
                className="mt-4 rounded-lg bg-cyan-500 px-4 py-2.5 text-xs font-semibold text-white"
              >
                Create Agent
              </button>
            )}
          </div>
        ) : (

          /* Agent cards */
          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
                : "space-y-3"
            }
          >
            {filteredAgents.map((agent) => (
              <div
                key={agent.id}
                className={`rounded-xl border border-zinc-200 bg-white p-4 transition hover:border-cyan-500/30 dark:border-white/[0.07] dark:bg-[#111315] ${
                  view === "list"
                    ? "flex flex-col gap-4 sm:flex-row sm:items-center"
                    : ""
                }`}
              >
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                    <Bot size={20} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-sm font-bold">
                        {agent.name || "Unnamed Agent"}
                      </h3>

                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          isActive(agent.status)
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "bg-zinc-500/10 text-zinc-500"
                        }`}
                      >
                        {agent.status || "unknown"}
                      </span>
                    </div>

                    <p className="mt-1 truncate text-[11px] text-zinc-500">
                      {agent.llm_model || "Model not specified"}
                    </p>

                    <p className="mt-1 truncate text-[11px] text-zinc-500">
                      Voice: {agent.voice || "Not specified"}
                    </p>

                    <p className="mt-2 text-[10px] text-zinc-400">
                      Calls: {agent.total_calls || 0}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-zinc-100 pt-3 dark:border-white/[0.06] sm:mt-0 sm:border-0 sm:pt-0">

                  {/* View */}
                  <button
                    title="View agent"
                    onClick={() => handleViewAgent(agent)}
                    className="flex h-8 items-center gap-1.5 rounded-lg border border-zinc-200 px-2.5 text-[11px] hover:bg-zinc-50 dark:border-white/10 dark:hover:bg-white/5"
                  >
                    <Eye size={13} />
                    View
                  </button>

                  {/* Edit */}
                  <button
                    title="Edit agent"
                    onClick={() =>
                      navigate(
                        `/agents/create?edit=${encodeURIComponent(agent.id)}`
                      )
                    }
                    className="flex h-8 items-center gap-1.5 rounded-lg border border-zinc-200 px-2.5 text-[11px] hover:bg-zinc-50 dark:border-white/10 dark:hover:bg-white/5"
                  >
                    <Pencil size={13} />
                    Edit
                  </button>

                  {/* Activate / Pause */}
                  <button
                    title={
                      isActive(agent.status)
                        ? "Pause agent"
                        : "Activate agent"
                    }
                    disabled={statusUpdating === agent.id}
                    onClick={() => handleStatusToggle(agent)}
                    className="flex h-8 items-center gap-1.5 rounded-lg border border-zinc-200 px-2.5 text-[11px] hover:bg-zinc-50 disabled:opacity-50 dark:border-white/10 dark:hover:bg-white/5"
                  >
                    {statusUpdating === agent.id ? (
                      <Loader2
                        size={13}
                        className="animate-spin"
                      />
                    ) : (
                      <Power size={13} />
                    )}

                    {isActive(agent.status)
                      ? "Pause"
                      : "Activate"}
                  </button>

                  {/* Delete */}
                  <button
                    title={
                      Number(agent.total_calls || 0) > 0
                        ? "Agent has call history and cannot be deleted"
                        : "Delete agent"
                    }
                    onClick={() => setDeleteAgent(agent)}
                    className="flex h-8 items-center gap-1.5 rounded-lg border border-red-500/20 px-2.5 text-[11px] text-red-500 hover:bg-red-500/5"
                  >
                    <Trash2 size={13} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {deleteAgent && (
        <DeleteAgent
          agent={deleteAgent}
          loading={deleting}
          onClose={() => {
            if (!deleting) {
              setDeleteAgent(null);
            }
          }}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default Agents;
