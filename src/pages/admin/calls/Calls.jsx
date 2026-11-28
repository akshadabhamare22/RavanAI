
// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import {
//   Routes,
//   Route,
//   Navigate,
//   useNavigate,
//   useParams,
// } from "react-router-dom";

// import {
//   HelpCircle,
//   Phone,
//   CheckCircle2,
//   XCircle,
//   Loader2,
//   Search,
//   Calendar,
//   ArrowUpDown,
//   SlidersHorizontal,
//   Video,
//   RefreshCw,
//   Download,
//   ChevronLeft,
//   ChevronRight,
//   X,
//   AlertCircle,
//   ArrowLeft,
//   Brain,
//   FileText,
//   MessageSquare,
//   User,
//   Clock,
//   Play,
//   Headphones,
// } from "lucide-react";

// import callsApi, { getCallsApiError } from "./callsApi";

// // ============================================================
// // HELPERS
// // ============================================================

// const formatDuration = (seconds) => {
//   if (seconds === null || seconds === undefined) return "--";

//   const value = Number(seconds);

//   if (Number.isNaN(value)) return "--";

//   const minutes = Math.floor(value / 60);
//   const remainingSeconds = value % 60;

//   return `${String(minutes).padStart(2, "0")}:${String(
//     remainingSeconds
//   ).padStart(2, "0")}`;
// };

// const formatDate = (value) => {
//   if (!value) return "--";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) return "--";

//   return date.toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// };

// const getStatusStyle = (status) => {
//   switch (status) {
//     case "completed":
//       return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";

//     case "failed":
//       return "bg-red-500/10 text-red-600 dark:text-red-400";

//     case "in_progress":
//       return "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400";

//     default:
//       return "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400";
//   }
// };

// const getSentimentStyle = (sentiment) => {
//   switch (sentiment) {
//     case "positive":
//       return "text-emerald-600 dark:text-emerald-400";

//     case "negative":
//       return "text-red-600 dark:text-red-400";

//     case "neutral":
//       return "text-zinc-500 dark:text-zinc-400";

//     default:
//       return "text-zinc-400";
//   }
// };

// // ============================================================
// // COMMON COMPONENTS
// // ============================================================

// function StatCard({ icon: Icon, label, value, dotColor, accent = false }) {
//   return (
//     <div
//       className={`
//         relative rounded-2xl border p-4 transition
//         ${
//           accent
//             ? "border-cyan-500/25 bg-cyan-500/[0.04]"
//             : "border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]"
//         }
//       `}
//     >
//       {dotColor && (
//         <span
//           className={`absolute right-4 top-4 h-1.5 w-1.5 rounded-full ${dotColor}`}
//         />
//       )}

//       <div className="mb-5">
//         <div
//           className={`
//             flex h-8 w-8 items-center justify-center rounded-lg
//             ${
//               accent
//                 ? "bg-cyan-500/[0.12] text-cyan-600 dark:text-cyan-400"
//                 : "bg-black/[0.04] text-zinc-500 dark:bg-white/[0.05] dark:text-zinc-400"
//             }
//           `}
//         >
//           <Icon size={15} strokeWidth={1.8} />
//         </div>
//       </div>

//       <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
//         {label}
//       </p>

//       <p
//         className={`text-2xl font-bold ${
//           accent
//             ? "text-cyan-600 dark:text-cyan-400"
//             : "text-zinc-900 dark:text-zinc-100"
//         }`}
//       >
//         {value}
//       </p>
//     </div>
//   );
// }

// function FilterSelect({ value, onChange, children, className = "" }) {
//   return (
//     <select
//       value={value}
//       onChange={(event) => onChange(event.target.value)}
//       className={`
//         h-10 rounded-lg border border-black/[0.08] bg-white px-3
//         text-[13px] text-zinc-700 outline-none
//         focus:border-cyan-500/50
//         dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300
//         ${className}
//       `}
//     >
//       {children}
//     </select>
//   );
// }

// function InfoItem({ label, value }) {
//   return (
//     <div>
//       <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-zinc-500">
//         {label}
//       </p>

//       <p className="break-words text-sm font-medium capitalize text-zinc-800 dark:text-zinc-200">
//         {value === null || value === undefined || value === ""
//           ? "--"
//           : String(value)}
//       </p>
//     </div>
//   );
// }

// function PageError({ error, onClose }) {
//   if (!error) return null;

//   return (
//     <div className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.06] p-3 text-sm text-red-600 dark:text-red-400">
//       <AlertCircle size={17} className="mt-0.5 shrink-0" />
//       <span>{error}</span>

//       {onClose && (
//         <button onClick={onClose} className="ml-auto shrink-0">
//           <X size={15} />
//         </button>
//       )}
//     </div>
//   );
// }

// // ============================================================
// // CALLS HISTORY
// // ============================================================

// function CallsHistory() {
//   const navigate = useNavigate();

//   const [activeTab, setActiveTab] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");

//   const [period, setPeriod] = useState("all");
//   const [status, setStatus] = useState("");
//   const [sentiment, setSentiment] = useState("");
//   const [agentId, setAgentId] = useState("");

//   const [sortBy, setSortBy] = useState("time");
//   const [sortOrder, setSortOrder] = useState("desc");

//   const [showFilters, setShowFilters] = useState(false);

//   const [dateFrom, setDateFrom] = useState("");
//   const [dateTo, setDateTo] = useState("");

//   const [agents, setAgents] = useState([]);
//   const [calls, setCalls] = useState([]);

//   const [stats, setStats] = useState({
//     total: 0,
//     completed: 0,
//     failed: 0,
//     in_progress: 0,
//   });

//   const [total, setTotal] = useState(0);
//   const limit = 20;
//   const [offset, setOffset] = useState(0);
//   const [hasMore, setHasMore] = useState(false);

//   const [loading, setLoading] = useState(true);
//   const [exporting, setExporting] = useState(false);
//   const [error, setError] = useState("");

//   // --------------------------------------------------
//   // TAB FILTERS
//   // --------------------------------------------------

//   const tabFilters = useMemo(() => {
//     if (activeTab === "Web") return { channel: "web" };
//     if (activeTab === "Inbound") return { direction: "inbound" };
//     if (activeTab === "Outbound") return { direction: "outbound" };

//     return {};
//   }, [activeTab]);

//   // --------------------------------------------------
//   // API QUERY PARAMS
//   // --------------------------------------------------

//   const queryParams = useMemo(() => {
//     const params = {
//       limit,
//       offset,
//       sort_by: sortBy,
//       order: sortOrder,
//       period,
//       ...tabFilters,
//     };

//     if (searchQuery.trim()) {
//       params.search = searchQuery.trim();
//     }

//     if (status) params.status = status;
//     if (sentiment) params.sentiment = sentiment;
//     if (agentId) params.agent_id = agentId;

//     if (period === "custom") {
//       if (dateFrom) params.date_from = dateFrom;
//       if (dateTo) params.date_to = dateTo;
//     }

//     return params;
//   }, [
//     offset,
//     sortBy,
//     sortOrder,
//     period,
//     tabFilters,
//     searchQuery,
//     status,
//     sentiment,
//     agentId,
//     dateFrom,
//     dateTo,
//   ]);

//   // --------------------------------------------------
//   // FETCH CALLS
//   // --------------------------------------------------

//   const fetchCalls = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await callsApi.getAll(queryParams);

//       const items = response?.items || [];

//       setCalls(items);
//       setTotal(response?.total || 0);
//       setHasMore(Boolean(response?.has_more));

//       setStats({
//         total: response?.stats?.total || 0,
//         completed: response?.stats?.completed || 0,
//         failed: response?.stats?.failed || 0,
//         in_progress: response?.stats?.in_progress || 0,
//       });
//     } catch (err) {
//       setCalls([]);
//       setTotal(0);
//       setHasMore(false);
//       setError(getCallsApiError(err));
//     } finally {
//       setLoading(false);
//     }
//   }, [queryParams]);

//   // --------------------------------------------------
//   // FETCH AGENTS
//   // --------------------------------------------------

//   useEffect(() => {
//     const fetchAgents = async () => {
//       try {
//         const response = await callsApi.getAgents();

//         setAgents(response?.items || []);
//       } catch (err) {
//         console.error(
//           "Agents dropdown error:",
//           getCallsApiError(err)
//         );
//       }
//     };

//     fetchAgents();
//   }, []);

//   useEffect(() => {
//     fetchCalls();
//   }, [fetchCalls]);

//   // --------------------------------------------------
//   // RESET PAGINATION WHEN FILTERS CHANGE
//   // --------------------------------------------------

//   useEffect(() => {
//     setOffset(0);
//   }, [
//     activeTab,
//     searchQuery,
//     period,
//     status,
//     sentiment,
//     agentId,
//     dateFrom,
//     dateTo,
//     sortBy,
//     sortOrder,
//   ]);

//   // --------------------------------------------------
//   // EXPORT CSV
//   // --------------------------------------------------

//   const handleExport = async () => {
//     try {
//       setExporting(true);
//       setError("");

//       const exportParams = { ...queryParams };
//       delete exportParams.offset;
//       delete exportParams.limit;

//       const blob = await callsApi.exportCsv(exportParams);

//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");

//       link.href = url;
//       link.download = `calls-${new Date()
//         .toISOString()
//         .slice(0, 10)}.csv`;

//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       setError(getCallsApiError(err));
//     } finally {
//       setExporting(false);
//     }
//   };

//   // --------------------------------------------------
//   // SORT
//   // --------------------------------------------------

//   const handleSort = () => {
//     setSortOrder((previous) =>
//       previous === "desc" ? "asc" : "desc"
//     );
//   };

//   // --------------------------------------------------
//   // CLEAR FILTERS
//   // --------------------------------------------------

//   const clearFilters = () => {
//     setActiveTab("All");
//     setSearchQuery("");
//     setPeriod("all");
//     setStatus("");
//     setSentiment("");
//     setAgentId("");
//     setDateFrom("");
//     setDateTo("");
//     setSortBy("time");
//     setSortOrder("desc");
//     setOffset(0);
//   };

//   // --------------------------------------------------
//   // RENDER
//   // --------------------------------------------------

//   return (
//     <div className="min-h-screen bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
//       <main className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-7">

//         {/* PAGE HEADER */}

//         <section>
//           <div className="flex flex-wrap items-center justify-between gap-3">
//             <div className="min-w-0">
//               <div className="flex flex-wrap items-center gap-2">
//                 <h1 className="text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
//                   All Calls History
//                 </h1>

//                 <HelpCircle size={15} className="text-zinc-400" />
//               </div>

//               <div className="mt-1.5 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-500">
//                 <span>
//                   <span className="font-semibold text-zinc-900 dark:text-zinc-200">
//                     {total}
//                   </span>{" "}
//                   calls total
//                 </span>

//                 <span>•</span>

//                 <span className="font-mono text-xs">
//                   {loading
//                     ? "Loading..."
//                     : `Showing ${calls.length} records`}
//                 </span>
//               </div>
//             </div>

//             <div className="flex items-center gap-2">
//               <button
//                 onClick={fetchCalls}
//                 disabled={loading}
//                 className="flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.03] disabled:opacity-50 dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
//               >
//                 <RefreshCw
//                   size={14}
//                   className={loading ? "animate-spin" : ""}
//                 />
//                 Refresh
//               </button>

//               <button
//                 onClick={handleExport}
//                 disabled={exporting || total === 0}
//                 className="flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.03] disabled:opacity-50 dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
//               >
//                 {exporting ? (
//                   <Loader2 size={14} className="animate-spin" />
//                 ) : (
//                   <Download size={14} />
//                 )}
//                 Export
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* ERROR */}

//         <PageError error={error} onClose={() => setError("")} />

//         {/* STATS */}

//         <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
//           <StatCard
//             icon={Phone}
//             label="Total Calls"
//             value={stats.total}
//           />

//           <StatCard
//             icon={CheckCircle2}
//             label="Completed"
//             value={stats.completed}
//             dotColor="bg-emerald-500"
//           />

//           <StatCard
//             icon={XCircle}
//             label="Failed"
//             value={stats.failed}
//             dotColor="bg-red-500"
//           />

//           <StatCard
//             icon={Loader2}
//             label="In Progress"
//             value={stats.in_progress}
//             dotColor="bg-cyan-500"
//             accent
//           />
//         </section>

//         {/* TABS + FILTERS */}

//         <section className="flex flex-wrap items-center justify-between gap-3">
//           <div className="flex rounded-lg border border-black/[0.08] bg-white p-1 dark:border-white/[0.08] dark:bg-[#101012]">
//             {["All", "Web", "Inbound", "Outbound"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`rounded-md px-3.5 py-1.5 text-[12px] font-medium transition ${
//                   activeTab === tab
//                     ? "bg-zinc-100 font-semibold text-zinc-900 dark:bg-[#1c1d22] dark:text-white"
//                     : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           <div className="flex flex-wrap items-center gap-2">

//             {/* SEARCH */}

//             <div className="flex h-10 w-full max-w-xs items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-sm text-zinc-500 dark:border-white/[0.08] dark:bg-[#101012]">
//               <Search size={14} />

//               <input
//                 type="text"
//                 placeholder="Search calls..."
//                 value={searchQuery}
//                 onChange={(event) =>
//                   setSearchQuery(event.target.value)
//                 }
//                 className="min-w-0 flex-1 bg-transparent text-[13px] text-zinc-800 outline-none placeholder:text-zinc-500 dark:text-zinc-200"
//               />
//             </div>

//             {/* PERIOD */}

//             <div className="flex h-10 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 dark:border-white/[0.08] dark:bg-[#101012]">
//               <Calendar size={14} className="text-zinc-500" />

//               <FilterSelect
//                 value={period}
//                 onChange={setPeriod}
//                 className="h-8 border-0 bg-transparent px-0"
//               >
//                 <option value="all">All Time</option>
//                 <option value="today">Today</option>
//                 <option value="yesterday">Yesterday</option>
//                 <option value="7d">Last 7 Days</option>
//                 <option value="30d">Last 30 Days</option>
//                 <option value="90d">Last 90 Days</option>
//                 <option value="custom">Custom</option>
//               </FilterSelect>
//             </div>

//             {/* SORT */}

//             <button
//               onClick={handleSort}
//               className="flex h-10 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
//             >
//               <ArrowUpDown size={14} />

//               <span className="hidden sm:inline">
//                 {sortOrder === "desc" ? "Newest" : "Oldest"}
//               </span>
//             </button>

//             {/* FILTER BUTTON */}

//             <button
//               onClick={() =>
//                 setShowFilters((previous) => !previous)
//               }
//               className={`flex h-10 items-center gap-2 rounded-lg border px-3 text-[13px] font-medium transition ${
//                 showFilters
//                   ? "border-cyan-500/30 bg-cyan-500/[0.06] text-cyan-600 dark:text-cyan-400"
//                   : "border-black/[0.08] bg-white text-zinc-700 dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
//               }`}
//             >
//               <SlidersHorizontal size={14} />
//               <span className="hidden sm:inline">Filters</span>
//             </button>
//           </div>
//         </section>

//         {/* ADVANCED FILTERS */}

//         {showFilters && (
//           <section className="rounded-xl border border-black/[0.06] bg-white p-4 dark:border-white/[0.08] dark:bg-[#101012]">
//             <div className="mb-3 flex items-center justify-between">
//               <p className="text-[12px] font-semibold uppercase tracking-wider text-zinc-500">
//                 Advanced Filters
//               </p>

//               <button
//                 onClick={clearFilters}
//                 className="text-xs font-medium text-cyan-600 hover:text-cyan-500 dark:text-cyan-400"
//               >
//                 Clear all
//               </button>
//             </div>

//             <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

//               <FilterSelect value={status} onChange={setStatus}>
//                 <option value="">All Statuses</option>
//                 <option value="completed">Completed</option>
//                 <option value="failed">Failed</option>
//                 <option value="in_progress">In Progress</option>
//               </FilterSelect>

//               <FilterSelect
//                 value={sentiment}
//                 onChange={setSentiment}
//               >
//                 <option value="">All Sentiments</option>
//                 <option value="positive">Positive</option>
//                 <option value="neutral">Neutral</option>
//                 <option value="negative">Negative</option>
//               </FilterSelect>

//               <FilterSelect value={agentId} onChange={setAgentId}>
//                 <option value="">All Agents</option>

//                 {agents.map((agent) => (
//                   <option key={agent.id} value={agent.id}>
//                     {agent.name}
//                   </option>
//                 ))}
//               </FilterSelect>

//               <FilterSelect value={sortBy} onChange={setSortBy}>
//                 <option value="time">Sort by Time</option>
//                 <option value="duration">Sort by Duration</option>
//                 <option value="status">Sort by Status</option>
//                 <option value="caller">Sort by Caller</option>
//                 <option value="agent">Sort by Agent</option>
//                 <option value="model">Sort by Model</option>
//               </FilterSelect>

//               {period === "custom" && (
//                 <>
//                   <div>
//                     <label className="mb-1 block text-xs text-zinc-500">
//                       From Date
//                     </label>

//                     <input
//                       type="date"
//                       value={dateFrom}
//                       onChange={(event) =>
//                         setDateFrom(event.target.value)
//                       }
//                       className="h-10 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-sm text-zinc-700 outline-none dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
//                     />
//                   </div>

//                   <div>
//                     <label className="mb-1 block text-xs text-zinc-500">
//                       To Date
//                     </label>

//                     <input
//                       type="date"
//                       value={dateTo}
//                       onChange={(event) =>
//                         setDateTo(event.target.value)
//                       }
//                       className="h-10 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-sm text-zinc-700 outline-none dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
//                     />
//                   </div>
//                 </>
//               )}
//             </div>
//           </section>
//         )}

//         {/* TABLE */}

//         <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">
//           <div className="overflow-x-auto">
//             <div className="min-w-[1100px]">

//               {/* TABLE HEADER */}

//               <div className="grid grid-cols-8 border-b border-black/[0.06] px-5 py-3 dark:border-white/[0.06]">
//                 {[
//                   "Caller",
//                   "Status",
//                   "Channel",
//                   "Duration",
//                   "Sentiment",
//                   "Agent",
//                   "Model",
//                   "Time",
//                 ].map((heading) => (
//                   <span
//                     key={heading}
//                     className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500"
//                   >
//                     {heading}
//                   </span>
//                 ))}
//               </div>

//               {/* TABLE BODY */}

//               {loading ? (
//                 <div className="flex items-center justify-center gap-2 py-24 text-sm text-zinc-500">
//                   <Loader2 size={18} className="animate-spin" />
//                   Loading calls...
//                 </div>
//               ) : calls.length === 0 ? (
//                 <div className="py-24 text-center">
//                   <div className="mx-auto flex h-16 w-16 items-center justify-center">
//                     <Video
//                       size={36}
//                       className="text-zinc-300 dark:text-zinc-600"
//                     />
//                   </div>

//                   <p className="mt-4 text-[13px] text-zinc-500">
//                     No call sessions found
//                   </p>

//                   <p className="mt-1 text-xs text-zinc-400">
//                     Try changing your search or filters
//                   </p>
//                 </div>
//               ) : (
//                 <div>
//                   {calls.map((call) => (
//                     <button
//                       key={call.id}
//                       onClick={() =>
//                         navigate(`/calls/${call.id}`)
//                       }
//                       className="grid w-full grid-cols-8 border-b border-black/[0.04] px-5 py-4 text-left transition last:border-0 hover:bg-black/[0.02] dark:border-white/[0.04] dark:hover:bg-white/[0.02]"
//                     >
//                       <span className="min-w-0 pr-3">
//                         <span className="block truncate text-[13px] font-medium text-zinc-900 dark:text-zinc-100">
//                           {call.caller_display ||
//                             call.caller_name ||
//                             call.caller_number ||
//                             "Unknown Caller"}
//                         </span>

//                         {call.caller_number && (
//                           <span className="mt-1 block truncate text-[11px] text-zinc-500">
//                             {call.caller_number}
//                           </span>
//                         )}
//                       </span>

//                       <span className="flex items-center">
//                         <span
//                           className={`rounded-md px-2 py-1 text-[10px] font-semibold ${getStatusStyle(
//                             call.status
//                           )}`}
//                         >
//                           {call.status_label || call.status || "--"}
//                         </span>
//                       </span>

//                       <span className="flex items-center text-[13px] capitalize text-zinc-700 dark:text-zinc-300">
//                         {call.channel || "--"}
//                       </span>

//                       <span className="flex items-center font-mono text-[12px] text-zinc-700 dark:text-zinc-300">
//                         {formatDuration(call.duration_seconds)}
//                       </span>

//                       <span
//                         className={`flex items-center text-[12px] capitalize ${getSentimentStyle(
//                           call.sentiment
//                         )}`}
//                       >
//                         {call.sentiment || "--"}
//                       </span>

//                       <span className="flex items-center truncate pr-3 text-[13px] text-zinc-700 dark:text-zinc-300">
//                         {call.agent_name || "--"}
//                       </span>

//                       <span className="flex items-center truncate pr-3 text-[12px] text-zinc-500">
//                         {call.model || "--"}
//                       </span>

//                       <span className="flex items-center text-[11px] text-zinc-500">
//                         {formatDate(call.started_at)}
//                       </span>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* PAGINATION */}

//           <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.06] px-5 py-3 dark:border-white/[0.06]">
//             <p className="text-xs text-zinc-500">
//               Showing {total === 0 ? 0 : offset + 1}-
//               {Math.min(offset + calls.length, total)} of {total} calls
//             </p>

//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() =>
//                   setOffset((previous) =>
//                     Math.max(0, previous - limit)
//                   )
//                 }
//                 disabled={offset === 0 || loading}
//                 className="flex h-8 items-center gap-1 rounded-lg border border-black/[0.08] px-2.5 text-xs text-zinc-600 transition hover:bg-black/[0.03] disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/[0.08] dark:text-zinc-300"
//               >
//                 <ChevronLeft size={14} />
//                 Previous
//               </button>

//               <button
//                 onClick={() =>
//                   setOffset((previous) => previous + limit)
//                 }
//                 disabled={!hasMore || loading}
//                 className="flex h-8 items-center gap-1 rounded-lg border border-black/[0.08] px-2.5 text-xs text-zinc-600 transition hover:bg-black/[0.03] disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/[0.08] dark:text-zinc-300"
//               >
//                 Next
//                 <ChevronRight size={14} />
//               </button>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }

// // ============================================================
// // CALL DETAILS
// // ============================================================

// function CallDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [call, setCall] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [analyzing, setAnalyzing] = useState(false);
//   const [error, setError] = useState("");

//   const fetchCallDetails = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await callsApi.getById(id);
//       setCall(response);
//     } catch (err) {
//       setError(getCallsApiError(err));
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchCallDetails();
//   }, [fetchCallDetails]);

//   const handleAnalyze = async () => {
//     try {
//       setAnalyzing(true);
//       setError("");

//       await callsApi.analyze(id);
//       await fetchCallDetails();
//     } catch (err) {
//       setError(getCallsApiError(err));
//     } finally {
//       setAnalyzing(false);
//     }
//   };

//   const handleDownload = async (format) => {
//     try {
//       const blob = await callsApi.downloadTranscript(id, format);

//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");

//       link.href = url;
//       link.download = `call-${id}-transcript.${format}`;

//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       setError(getCallsApiError(err));
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-zinc-100 text-zinc-500 dark:bg-[#09090B]">
//         <Loader2 className="mr-2 animate-spin" size={20} />
//         Loading call details...
//       </div>
//     );
//   }

//   if (!call) {
//     return (
//       <div className="min-h-screen bg-zinc-100 p-6 dark:bg-[#09090B]">
//         <button
//           onClick={() => navigate("/calls")}
//           className="mb-5 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300"
//         >
//           <ArrowLeft size={16} />
//           Back to Calls
//         </button>

//         <PageError error={error || "Call details not found."} />
//       </div>
//     );
//   }

//   const messages = call.messages || [];

//   return (
//     <div className="min-h-screen bg-zinc-100 text-zinc-900 dark:bg-[#09090B] dark:text-zinc-100">
//       <main className="mx-auto max-w-[1400px] space-y-5 p-4 sm:p-6 lg:p-7">

//         {/* HEADER */}

//         <div className="flex flex-wrap items-center justify-between gap-3">
//           <div>
//             <button
//               onClick={() => navigate("/calls")}
//               className="mb-3 flex items-center gap-2 text-xs text-zinc-500 hover:text-cyan-500"
//             >
//               <ArrowLeft size={15} />
//               Back to Calls History
//             </button>

//             <h1 className="text-2xl font-semibold">
//               Call Details
//             </h1>

//             <p className="mt-1 text-xs text-zinc-500">
//               Call ID: {call.id}
//             </p>
//           </div>

//           <div className="flex flex-wrap gap-2">
//             <button
//               onClick={() => navigate(`/calls/${id}/transcript`)}
//               className="flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-sm dark:border-white/[0.08] dark:bg-[#101012]"
//             >
//               <MessageSquare size={15} />
//               View Transcript
//             </button>

//             <button
//               onClick={handleAnalyze}
//               disabled={analyzing || call.status === "in_progress"}
//               className="flex h-9 items-center gap-2 rounded-lg bg-cyan-600 px-3 text-sm font-medium text-white hover:bg-cyan-700 disabled:opacity-50"
//             >
//               {analyzing ? (
//                 <Loader2 size={15} className="animate-spin" />
//               ) : (
//                 <Brain size={15} />
//               )}
//               Analyze Call
//             </button>
//           </div>
//         </div>

//         <PageError error={error} onClose={() => setError("")} />

//         {/* SUMMARY CARDS */}

//         <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//           {[
//             [
//               "Caller",
//               call.caller_display ||
//                 call.caller_name ||
//                 call.caller_number ||
//                 "Unknown",
//             ],
//             ["Status", call.status_label || call.status || "--"],
//             ["Channel", call.channel || "--"],
//             ["Duration", formatDuration(call.duration_seconds)],
//           ].map(([label, value]) => (
//             <div
//               key={label}
//               className="rounded-xl border border-black/[0.06] bg-white p-4 dark:border-white/[0.08] dark:bg-[#101012]"
//             >
//               <p className="text-xs text-zinc-500">{label}</p>
//               <p className="mt-2 text-lg font-semibold capitalize">
//                 {value}
//               </p>
//             </div>
//           ))}
//         </section>

//         {/* DETAILS */}

//         <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
//           <div className="space-y-5 lg:col-span-2">

//             <div className="rounded-xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
//               <h2 className="mb-5 text-sm font-semibold">
//                 Call Information
//               </h2>

//               <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//                 <InfoItem
//                   label="Caller Name"
//                   value={call.caller_name}
//                 />

//                 <InfoItem
//                   label="Caller Number"
//                   value={call.caller_number}
//                 />

//                 <InfoItem
//                   label="Agent"
//                   value={call.agent_name}
//                 />

//                 <InfoItem
//                   label="Model"
//                   value={call.model}
//                 />

//                 <InfoItem
//                   label="Direction"
//                   value={call.direction}
//                 />

//                 <InfoItem
//                   label="Sentiment"
//                   value={call.sentiment}
//                 />

//                 <InfoItem
//                   label="Started At"
//                   value={formatDate(call.started_at)}
//                 />

//                 <InfoItem
//                   label="Ended At"
//                   value={formatDate(call.ended_at)}
//                 />

//                 <InfoItem
//                   label="End Reason"
//                   value={call.end_reason_label || call.end_reason}
//                 />

//                 <InfoItem
//                   label="Converted"
//                   value={call.converted ? "Yes" : "No"}
//                 />
//               </div>
//             </div>

//             {/* CALL SUMMARY */}

//             <div className="rounded-xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
//               <div className="mb-4 flex items-center justify-between">
//                 <h2 className="text-sm font-semibold">
//                   Call Summary
//                 </h2>

//                 <FileText size={17} className="text-zinc-400" />
//               </div>

//               <p className="whitespace-pre-wrap text-sm leading-7 text-zinc-600 dark:text-zinc-400">
//                 {call.summary || "No call summary available."}
//               </p>
//             </div>

//             {/* TRANSCRIPT PREVIEW */}

//             <div className="rounded-xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
//               <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
//                 <h2 className="text-sm font-semibold">
//                   Transcript Preview
//                 </h2>

//                 <button
//                   onClick={() => navigate(`/calls/${id}/transcript`)}
//                   className="text-xs font-medium text-cyan-600 dark:text-cyan-400"
//                 >
//                   View Full Transcript
//                 </button>
//               </div>

//               {messages.length === 0 ? (
//                 <p className="text-sm text-zinc-500">
//                   No transcript messages available.
//                 </p>
//               ) : (
//                 <div className="space-y-3">
//                   {messages.slice(0, 4).map((message, index) => (
//                     <div
//                       key={message.id || index}
//                       className="rounded-lg bg-zinc-50 p-3 dark:bg-white/[0.03]"
//                     >
//                       <div className="mb-2 flex items-center justify-between gap-3">
//                         <span className="text-xs font-semibold capitalize text-cyan-600 dark:text-cyan-400">
//                           {message.role || "Speaker"}
//                         </span>

//                         <span className="text-[10px] text-zinc-500">
//                           {formatDate(message.created_at)}
//                         </span>
//                       </div>

//                       <p className="whitespace-pre-wrap text-sm leading-6 text-zinc-700 dark:text-zinc-300">
//                         {message.content}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* SIDE PANEL */}

//           <div className="space-y-5">

//             <div className="rounded-xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
//               <div className="mb-4 flex items-center gap-2">
//                 <User size={17} className="text-zinc-400" />

//                 <h2 className="text-sm font-semibold">
//                   Call Information
//                 </h2>
//               </div>

//               <div className="space-y-4">
//                 <InfoItem
//                   label="Call ID"
//                   value={call.id}
//                 />

//                 <InfoItem
//                   label="Agent ID"
//                   value={call.agent_id}
//                 />

//                 <InfoItem
//                   label="Analyzed"
//                   value={call.analyzed ? "Yes" : "No"}
//                 />

//                 <InfoItem
//                   label="Recording Available"
//                   value={call.has_recording ? "Yes" : "No"}
//                 />
//               </div>
//             </div>

//             {/* RECORDING */}

//             <div className="rounded-xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
//               <div className="mb-4 flex items-center gap-2">
//                 <Headphones size={17} className="text-zinc-400" />

//                 <h2 className="text-sm font-semibold">
//                   Call Recording
//                 </h2>
//               </div>

//               {call.recording_url ? (
//                 <audio
//                   controls
//                   className="w-full"
//                   src={call.recording_url}
//                 >
//                   Your browser does not support audio playback.
//                 </audio>
//               ) : (
//                 <p className="text-sm text-zinc-500">
//                   Recording is not available for this call.
//                 </p>
//               )}
//             </div>

//             {/* DOWNLOAD */}

//             <div className="rounded-xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
//               <h2 className="mb-4 text-sm font-semibold">
//                 Download Transcript
//               </h2>

//               <div className="space-y-2">
//                 <button
//                   onClick={() => handleDownload("txt")}
//                   className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-black/[0.08] text-sm text-zinc-700 hover:bg-black/[0.03] dark:border-white/[0.08] dark:text-zinc-300 dark:hover:bg-white/[0.04]"
//                 >
//                   <Download size={15} />
//                   Download TXT
//                 </button>

//                 <button
//                   onClick={() => handleDownload("json")}
//                   className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-black/[0.08] text-sm text-zinc-700 hover:bg-black/[0.03] dark:border-white/[0.08] dark:text-zinc-300 dark:hover:bg-white/[0.04]"
//                 >
//                   <Download size={15} />
//                   Download JSON
//                 </button>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }

// // ============================================================
// // CALL TRANSCRIPT
// // ============================================================

// function CallTranscript() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [call, setCall] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [downloading, setDownloading] = useState("");

//   const fetchTranscript = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await callsApi.getById(id);
//       setCall(response);
//     } catch (err) {
//       setError(getCallsApiError(err));
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchTranscript();
//   }, [fetchTranscript]);

//   const handleDownload = async (format) => {
//     try {
//       setDownloading(format);

//       const blob = await callsApi.downloadTranscript(id, format);

//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");

//       link.href = url;
//       link.download = `call-${id}-transcript.${format}`;

//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       setError(getCallsApiError(err));
//     } finally {
//       setDownloading("");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-zinc-100 text-zinc-500 dark:bg-[#09090B]">
//         <Loader2 size={20} className="mr-2 animate-spin" />
//         Loading transcript...
//       </div>
//     );
//   }

//   if (!call) {
//     return (
//       <div className="min-h-screen bg-zinc-100 p-6 dark:bg-[#09090B]">
//         <button
//           onClick={() => navigate(`/calls/${id}`)}
//           className="mb-5 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300"
//         >
//           <ArrowLeft size={16} />
//           Back to Call Details
//         </button>

//         <PageError error={error || "Transcript not found."} />
//       </div>
//     );
//   }

//   const messages = call.messages || [];

//   return (
//     <div className="min-h-screen bg-zinc-100 text-zinc-900 dark:bg-[#09090B] dark:text-zinc-100">
//       <main className="mx-auto max-w-[1100px] space-y-5 p-4 sm:p-6 lg:p-7">

//         {/* HEADER */}

//         <div className="flex flex-wrap items-center justify-between gap-3">
//           <div>
//             <button
//               onClick={() => navigate(`/calls/${id}`)}
//               className="mb-3 flex items-center gap-2 text-xs text-zinc-500 hover:text-cyan-500"
//             >
//               <ArrowLeft size={15} />
//               Back to Call Details
//             </button>

//             <h1 className="text-2xl font-semibold">
//               Call Transcript
//             </h1>

//             <p className="mt-1 text-xs text-zinc-500">
//               Call ID: {call.id}
//             </p>
//           </div>

//           <div className="flex flex-wrap gap-2">
//             <button
//               onClick={() => handleDownload("txt")}
//               disabled={Boolean(downloading)}
//               className="flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-sm dark:border-white/[0.08] dark:bg-[#101012] disabled:opacity-50"
//             >
//               {downloading === "txt" ? (
//                 <Loader2 size={14} className="animate-spin" />
//               ) : (
//                 <Download size={14} />
//               )}
//               TXT
//             </button>

//             <button
//               onClick={() => handleDownload("json")}
//               disabled={Boolean(downloading)}
//               className="flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-sm dark:border-white/[0.08] dark:bg-[#101012] disabled:opacity-50"
//             >
//               {downloading === "json" ? (
//                 <Loader2 size={14} className="animate-spin" />
//               ) : (
//                 <Download size={14} />
//               )}
//               JSON
//             </button>
//           </div>
//         </div>

//         <PageError error={error} onClose={() => setError("")} />

//         {/* CALL SUMMARY */}

//         <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//           <div className="rounded-xl border border-black/[0.06] bg-white p-4 dark:border-white/[0.08] dark:bg-[#101012]">
//             <p className="text-xs text-zinc-500">Caller</p>

//             <p className="mt-2 text-sm font-semibold">
//               {call.caller_display ||
//                 call.caller_name ||
//                 call.caller_number ||
//                 "Unknown Caller"}
//             </p>
//           </div>

//           <div className="rounded-xl border border-black/[0.06] bg-white p-4 dark:border-white/[0.08] dark:bg-[#101012]">
//             <p className="text-xs text-zinc-500">Agent</p>

//             <p className="mt-2 text-sm font-semibold">
//               {call.agent_name || "--"}
//             </p>
//           </div>

//           <div className="rounded-xl border border-black/[0.06] bg-white p-4 dark:border-white/[0.08] dark:bg-[#101012]">
//             <p className="text-xs text-zinc-500">Duration</p>

//             <p className="mt-2 text-sm font-semibold">
//               {formatDuration(call.duration_seconds)}
//             </p>
//           </div>
//         </section>

//         {/* TRANSCRIPT */}

//         <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">
//           <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.06] px-5 py-4 dark:border-white/[0.06]">
//             <div className="flex items-center gap-2">
//               <MessageSquare
//                 size={17}
//                 className="text-cyan-600 dark:text-cyan-400"
//               />

//               <h2 className="text-sm font-semibold">
//                 Conversation Transcript
//               </h2>
//             </div>

//             <span className="text-xs text-zinc-500">
//               {messages.length} messages
//             </span>
//           </div>

//           {messages.length === 0 ? (
//             <div className="py-20 text-center">
//               <MessageSquare
//                 size={32}
//                 className="mx-auto text-zinc-300 dark:text-zinc-600"
//               />

//               <p className="mt-4 text-sm text-zinc-500">
//                 No transcript messages available
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-4 p-5">
//               {messages.map((message, index) => {
//                 const isAssistant =
//                   message.role === "assistant" ||
//                   message.role === "agent";

//                 return (
//                   <div
//                     key={message.id || index}
//                     className={`flex ${
//                       isAssistant ? "justify-start" : "justify-end"
//                     }`}
//                   >
//                     <div
//                       className={`w-full max-w-[80%] rounded-xl border p-4 ${
//                         isAssistant
//                           ? "border-cyan-500/10 bg-cyan-500/[0.04]"
//                           : "border-black/[0.06] bg-zinc-50 dark:border-white/[0.06] dark:bg-white/[0.03]"
//                       }`}
//                     >
//                       <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
//                         <span
//                           className={`text-xs font-semibold capitalize ${
//                             isAssistant
//                               ? "text-cyan-600 dark:text-cyan-400"
//                               : "text-zinc-600 dark:text-zinc-300"
//                           }`}
//                         >
//                           {message.role || "Speaker"}
//                         </span>

//                         <span className="flex items-center gap-1 text-[10px] text-zinc-500">
//                           <Clock size={11} />
//                           {formatDate(message.created_at)}
//                         </span>
//                       </div>

//                       <p className="whitespace-pre-wrap break-words text-sm leading-7 text-zinc-700 dark:text-zinc-300">
//                         {message.content || ""}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </section>
//       </main>
//     </div>
//   );
// }

// // ============================================================
// // MAIN CALLS ROUTER
// // ============================================================

// export default function Calls() {
//   return (
//     <Routes>
//       <Route index element={<CallsHistory />} />

//       <Route path=":id" element={<CallDetails />} />

//       <Route
//         path=":id/transcript"
//         element={<CallTranscript />}
//       />

//       <Route
//         path="*"
//         element={<Navigate to="/calls" replace />}
//       />
//     </Routes>
//   );
// }


import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";

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
  ChevronLeft,
  ChevronRight,
  X,
  AlertCircle,
  ArrowLeft,
  Brain,
  FileText,
  MessageSquare,
  User,
  Clock,
  Play,
  Headphones,
} from "lucide-react";

import callsApi, { getCallsApiError } from "./callsApi";

// ============================================================
// HELPERS
// ============================================================

const formatDuration = (seconds) => {
  if (seconds === null || seconds === undefined) return "--";

  const value = Number(seconds);

  if (Number.isNaN(value)) return "--";

  const minutes = Math.floor(value / 60);
  const remainingSeconds = value % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};

const formatDate = (value) => {
  if (!value) return "--";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "--";

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusStyle = (status) => {
  switch (status) {
    case "completed":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";

    case "failed":
      return "bg-red-500/10 text-red-600 dark:text-red-400";

    case "in_progress":
      return "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400";

    default:
      return "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400";
  }
};

const getSentimentStyle = (sentiment) => {
  switch (sentiment) {
    case "positive":
      return "text-emerald-600 dark:text-emerald-400";

    case "negative":
      return "text-red-600 dark:text-red-400";

    case "neutral":
      return "text-zinc-500 dark:text-zinc-400";

    default:
      return "text-zinc-400";
  }
};

// ============================================================
// COMMON COMPONENTS
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
          accent
            ? "text-cyan-600 dark:text-cyan-400"
            : "text-zinc-900 dark:text-zinc-100"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function FilterSelect({ value, onChange, children, className = "" }) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={`
        h-10 w-full rounded-lg border border-black/[0.08] bg-white px-3
        text-[13px] text-zinc-700 outline-none
        focus:border-cyan-500/50
        dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300
        ${className}
      `}
    >
      {children}
    </select>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </p>

      <p className="break-words text-sm font-medium capitalize text-zinc-800 dark:text-zinc-200">
        {value === null || value === undefined || value === ""
          ? "--"
          : String(value)}
      </p>
    </div>
  );
}

function PageError({ error, onClose }) {
  if (!error) return null;

  return (
    <div className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.06] p-3 text-sm text-red-600 dark:text-red-400">
      <AlertCircle size={17} className="mt-0.5 shrink-0" />
      <span>{error}</span>

      {onClose && (
        <button onClick={onClose} className="ml-auto shrink-0">
          <X size={15} />
        </button>
      )}
    </div>
  );
}

// ============================================================
// CALLS HISTORY
// ============================================================

function CallsHistory() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [period, setPeriod] = useState("all");
  const [status, setStatus] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [agentId, setAgentId] = useState("");

  const [sortBy, setSortBy] = useState("time");
  const [sortOrder, setSortOrder] = useState("desc");

  const [showFilters, setShowFilters] = useState(false);

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [agents, setAgents] = useState([]);
  const [calls, setCalls] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    failed: 0,
    in_progress: 0,
  });

  const [total, setTotal] = useState(0);
  const limit = 20;
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState("");

  // --------------------------------------------------
  // TAB FILTERS
  // --------------------------------------------------

  const tabFilters = useMemo(() => {
    if (activeTab === "Web") return { channel: "web" };
    if (activeTab === "Inbound") return { direction: "inbound" };
    if (activeTab === "Outbound") return { direction: "outbound" };

    return {};
  }, [activeTab]);

  // --------------------------------------------------
  // API QUERY PARAMS
  // --------------------------------------------------

  const queryParams = useMemo(() => {
    const params = {
      limit,
      offset,
      sort_by: sortBy,
      order: sortOrder,
      period,
      ...tabFilters,
    };

    if (searchQuery.trim()) {
      params.search = searchQuery.trim();
    }

    if (status) params.status = status;
    if (sentiment) params.sentiment = sentiment;
    if (agentId) params.agent_id = agentId;

    if (period === "custom") {
      if (dateFrom) params.date_from = dateFrom;
      if (dateTo) params.date_to = dateTo;
    }

    return params;
  }, [
    offset,
    sortBy,
    sortOrder,
    period,
    tabFilters,
    searchQuery,
    status,
    sentiment,
    agentId,
    dateFrom,
    dateTo,
  ]);

  // --------------------------------------------------
  // FETCH CALLS
  // --------------------------------------------------

  const fetchCalls = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await callsApi.getAll(queryParams);

      const items = response?.items || [];

      setCalls(items);
      setTotal(response?.total || 0);
      setHasMore(Boolean(response?.has_more));

      setStats({
        total: response?.stats?.total || 0,
        completed: response?.stats?.completed || 0,
        failed: response?.stats?.failed || 0,
        in_progress: response?.stats?.in_progress || 0,
      });
    } catch (err) {
      setCalls([]);
      setTotal(0);
      setHasMore(false);
      setError(getCallsApiError(err));
    } finally {
      setLoading(false);
    }
  }, [queryParams]);

  // --------------------------------------------------
  // FETCH AGENTS
  // --------------------------------------------------

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await callsApi.getAgents();

        setAgents(response?.items || []);
      } catch (err) {
        console.error(
          "Agents dropdown error:",
          getCallsApiError(err)
        );
      }
    };

    fetchAgents();
  }, []);

  useEffect(() => {
    fetchCalls();
  }, [fetchCalls]);

  // --------------------------------------------------
  // RESET PAGINATION WHEN FILTERS CHANGE
  // --------------------------------------------------

  useEffect(() => {
    setOffset(0);
  }, [
    activeTab,
    searchQuery,
    period,
    status,
    sentiment,
    agentId,
    dateFrom,
    dateTo,
    sortBy,
    sortOrder,
  ]);

  // --------------------------------------------------
  // EXPORT CSV
  // --------------------------------------------------

  const handleExport = async () => {
    try {
      setExporting(true);
      setError("");

      const exportParams = { ...queryParams };
      delete exportParams.offset;
      delete exportParams.limit;

      const blob = await callsApi.exportCsv(exportParams);

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `calls-${new Date()
        .toISOString()
        .slice(0, 10)}.csv`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(getCallsApiError(err));
    } finally {
      setExporting(false);
    }
  };

  // --------------------------------------------------
  // SORT
  // --------------------------------------------------

  const handleSort = () => {
    setSortOrder((previous) =>
      previous === "desc" ? "asc" : "desc"
    );
  };

  // --------------------------------------------------
  // CLEAR FILTERS
  // --------------------------------------------------

  const clearFilters = () => {
    setActiveTab("All");
    setSearchQuery("");
    setPeriod("all");
    setStatus("");
    setSentiment("");
    setAgentId("");
    setDateFrom("");
    setDateTo("");
    setSortBy("time");
    setSortOrder("desc");
    setOffset(0);
  };

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
      <main className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-7">

        {/* PAGE HEADER */}

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
                    {total}
                  </span>{" "}
                  calls total
                </span>

                <span>•</span>

                <span className="font-mono text-xs">
                  {loading
                    ? "Loading..."
                    : `Showing ${calls.length} records`}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={fetchCalls}
                disabled={loading}
                className="flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.03] disabled:opacity-50 dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
              >
                <RefreshCw
                  size={14}
                  className={loading ? "animate-spin" : ""}
                />
                Refresh
              </button>

              <button
                onClick={handleExport}
                disabled={exporting || total === 0}
                className="flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.03] disabled:opacity-50 dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
              >
                {exporting ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Download size={14} />
                )}
                Export
              </button>
            </div>
          </div>
        </section>

        {/* ERROR */}

        <PageError error={error} onClose={() => setError("")} />

        {/* STATS */}

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
            value={stats.in_progress}
            dotColor="bg-cyan-500"
            accent
          />
        </section>

        {/* TABS + FILTERS */}

        <section className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex rounded-lg border border-black/[0.08] bg-white p-1 dark:border-white/[0.08] dark:bg-[#101012]">
            {["All", "Web", "Inbound", "Outbound"].map((tab) => (
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

          <div className="flex flex-wrap items-center gap-2">

            {/* SEARCH */}

            <div className="flex h-10 w-full max-w-xs items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-sm text-zinc-500 dark:border-white/[0.08] dark:bg-[#101012]">
              <Search size={14} />

              <input
                type="text"
                placeholder="Search calls..."
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                className="min-w-0 flex-1 bg-transparent text-[13px] text-zinc-800 outline-none placeholder:text-zinc-500 dark:text-zinc-200"
              />
            </div>

            {/* PERIOD */}

            <div className="flex h-10 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 dark:border-white/[0.08] dark:bg-[#101012]">
              <Calendar size={14} className="text-zinc-500" />

              <FilterSelect
                value={period}
                onChange={setPeriod}
                className="h-8 border-0 bg-transparent px-0"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="custom">Custom</option>
              </FilterSelect>
            </div>

            {/* SORT */}

            <button
              onClick={handleSort}
              className="flex h-10 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
            >
              <ArrowUpDown size={14} />

              <span className="hidden sm:inline">
                {sortOrder === "desc" ? "Newest" : "Oldest"}
              </span>
            </button>

            {/* FILTER BUTTON */}

            <button
              onClick={() => setShowFilters(true)}
              className={`flex h-10 items-center gap-2 rounded-lg border px-3 text-[13px] font-medium transition ${
                showFilters
                  ? "border-cyan-500/30 bg-cyan-500/[0.06] text-cyan-600 dark:text-cyan-400"
                  : "border-black/[0.08] bg-white text-zinc-700 dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
              }`}
            >
              <SlidersHorizontal size={14} />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </section>

        {/* TABLE */}

        <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">
          <div className="overflow-x-auto">
            <div className="min-w-[1100px]">

              {/* TABLE HEADER */}

              <div className="grid grid-cols-8 border-b border-black/[0.06] px-5 py-3 dark:border-white/[0.06]">
                {[
                  "Caller",
                  "Status",
                  "Channel",
                  "Duration",
                  "Sentiment",
                  "Agent",
                  "Model",
                  "Time",
                ].map((heading) => (
                  <span
                    key={heading}
                    className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500"
                  >
                    {heading}
                  </span>
                ))}
              </div>

              {/* TABLE BODY */}

              {loading ? (
                <div className="flex items-center justify-center gap-2 py-24 text-sm text-zinc-500">
                  <Loader2 size={18} className="animate-spin" />
                  Loading calls...
                </div>
              ) : calls.length === 0 ? (
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

                  <p className="mt-1 text-xs text-zinc-400">
                    Try changing your search or filters
                  </p>
                </div>
              ) : (
                <div>
                  {calls.map((call) => (
                    <button
                      key={call.id}
                      onClick={() =>
                        navigate(`/calls/${call.id}`)
                      }
                      className="grid w-full grid-cols-8 border-b border-black/[0.04] px-5 py-4 text-left transition last:border-0 hover:bg-black/[0.02] dark:border-white/[0.04] dark:hover:bg-white/[0.02]"
                    >
                      <span className="min-w-0 pr-3">
                        <span className="block truncate text-[13px] font-medium text-zinc-900 dark:text-zinc-100">
                          {call.caller_display ||
                            call.caller_name ||
                            call.caller_number ||
                            "Unknown Caller"}
                        </span>

                        {call.caller_number && (
                          <span className="mt-1 block truncate text-[11px] text-zinc-500">
                            {call.caller_number}
                          </span>
                        )}
                      </span>

                      <span className="flex items-center">
                        <span
                          className={`rounded-md px-2 py-1 text-[10px] font-semibold ${getStatusStyle(
                            call.status
                          )}`}
                        >
                          {call.status_label || call.status || "--"}
                        </span>
                      </span>

                      <span className="flex items-center text-[13px] capitalize text-zinc-700 dark:text-zinc-300">
                        {call.channel || "--"}
                      </span>

                      <span className="flex items-center font-mono text-[12px] text-zinc-700 dark:text-zinc-300">
                        {formatDuration(call.duration_seconds)}
                      </span>

                      <span
                        className={`flex items-center text-[12px] capitalize ${getSentimentStyle(
                          call.sentiment
                        )}`}
                      >
                        {call.sentiment || "--"}
                      </span>

                      <span className="flex items-center truncate pr-3 text-[13px] text-zinc-700 dark:text-zinc-300">
                        {call.agent_name || "--"}
                      </span>

                      <span className="flex items-center truncate pr-3 text-[12px] text-zinc-500">
                        {call.model || "--"}
                      </span>

                      <span className="flex items-center text-[11px] text-zinc-500">
                        {formatDate(call.started_at)}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* PAGINATION */}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.06] px-5 py-3 dark:border-white/[0.06]">
            <p className="text-xs text-zinc-500">
              Showing {total === 0 ? 0 : offset + 1}-
              {Math.min(offset + calls.length, total)} of {total} calls
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setOffset((previous) =>
                    Math.max(0, previous - limit)
                  )
                }
                disabled={offset === 0 || loading}
                className="flex h-8 items-center gap-1 rounded-lg border border-black/[0.08] px-2.5 text-xs text-zinc-600 transition hover:bg-black/[0.03] disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/[0.08] dark:text-zinc-300"
              >
                <ChevronLeft size={14} />
                Previous
              </button>

              <button
                onClick={() =>
                  setOffset((previous) => previous + limit)
                }
                disabled={!hasMore || loading}
                className="flex h-8 items-center gap-1 rounded-lg border border-black/[0.08] px-2.5 text-xs text-zinc-600 transition hover:bg-black/[0.03] disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/[0.08] dark:text-zinc-300"
              >
                Next
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ============================================================ */}
      {/* ADVANCED FILTERS DRAWER (SLIDE OVER)                         */}
      {/* ============================================================ */}
      
      {showFilters && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setShowFilters(false)}
          />

          {/* Drawer Panel */}
          <div className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform dark:bg-[#101012]">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-black/[0.06] px-6 py-5 dark:border-white/[0.06]">
              <div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  Advanced Filters
                </h2>
                <p className="mt-1 text-xs text-zinc-500">
                  Narrow down call sessions with detailed filters
                </p>
              </div>
              <button
                onClick={() => setShowFilters(false)}
                className="rounded-full p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-white/[0.05] dark:hover:text-zinc-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  Status
                </label>
                <FilterSelect value={status} onChange={setStatus}>
                  <option value="">All Statuses</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                  <option value="in_progress">In Progress</option>
                </FilterSelect>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  Channel
                </label>
                <FilterSelect value={activeTab} onChange={setActiveTab}>
                  <option value="All">All Channels</option>
                  <option value="Web">Web</option>
                  <option value="Inbound">Inbound</option>
                  <option value="Outbound">Outbound</option>
                </FilterSelect>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  Agent
                </label>
                <FilterSelect value={agentId} onChange={setAgentId}>
                  <option value="">All Agents</option>
                  {agents.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.name}
                    </option>
                  ))}
                </FilterSelect>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  User Sentiment
                </label>
                <FilterSelect value={sentiment} onChange={setSentiment}>
                  <option value="">All Sentiments</option>
                  <option value="positive">Positive</option>
                  <option value="neutral">Neutral</option>
                  <option value="negative">Negative</option>
                </FilterSelect>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  Sort By
                </label>
                <FilterSelect value={sortBy} onChange={setSortBy}>
                  <option value="time">Sort by Time</option>
                  <option value="duration">Sort by Duration</option>
                  <option value="status">Sort by Status</option>
                  <option value="caller">Sort by Caller</option>
                  <option value="agent">Sort by Agent</option>
                  <option value="model">Sort by Model</option>
                </FilterSelect>
              </div>

              {period === "custom" && (
                <div className="space-y-4 rounded-lg border border-black/[0.06] bg-zinc-50 p-4 dark:border-white/[0.06] dark:bg-white/[0.02]">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      From Date
                    </label>
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={(event) => setDateFrom(event.target.value)}
                      className="h-10 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-sm text-zinc-700 outline-none dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      To Date
                    </label>
                    <input
                      type="date"
                      value={dateTo}
                      onChange={(event) => setDateTo(event.target.value)}
                      className="h-10 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-sm text-zinc-700 outline-none dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
                    />
                  </div>
                </div>
              )}

            </div>

            {/* Drawer Footer */}
            <div className="border-t border-black/[0.06] px-6 py-4 dark:border-white/[0.06] flex items-center justify-between gap-3">
              <button
                onClick={clearFilters}
                className="text-xs font-medium text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              >
                Clear all
              </button>
              
              <button
                onClick={() => setShowFilters(false)}
                className="rounded-lg bg-cyan-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-cyan-700"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// CALL DETAILS
// ============================================================

function CallDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [call, setCall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");

  const fetchCallDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await callsApi.getById(id);
      setCall(response);
    } catch (err) {
      setError(getCallsApiError(err));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCallDetails();
  }, [fetchCallDetails]);

  const handleAnalyze = async () => {
    try {
      setAnalyzing(true);
      setError("");

      await callsApi.analyze(id);
      await fetchCallDetails();
    } catch (err) {
      setError(getCallsApiError(err));
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDownload = async (format) => {
    try {
      const blob = await callsApi.downloadTranscript(id, format);

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `call-${id}-transcript.${format}`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(getCallsApiError(err));
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-100 text-zinc-500 dark:bg-[#09090B]">
        <Loader2 className="mr-2 animate-spin" size={20} />
        Loading call details...
      </div>
    );
  }

  if (!call) {
    return (
      <div className="min-h-screen bg-zinc-100 p-6 dark:bg-[#09090B]">
        <button
          onClick={() => navigate("/calls")}
          className="mb-5 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300"
        >
          <ArrowLeft size={16} />
          Back to Calls
        </button>

        <PageError error={error || "Call details not found."} />
      </div>
    );
  }

  const messages = call.messages || [];

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 dark:bg-[#09090B] dark:text-zinc-100">
      <main className="mx-auto max-w-[1400px] space-y-5 p-4 sm:p-6 lg:p-7">

        {/* HEADER */}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <button
              onClick={() => navigate("/calls")}
              className="mb-3 flex items-center gap-2 text-xs text-zinc-500 hover:text-cyan-500"
            >
              <ArrowLeft size={15} />
              Back to Calls History
            </button>

            <h1 className="text-2xl font-semibold">
              Call Details
            </h1>

            <p className="mt-1 text-xs text-zinc-500">
              Call ID: {call.id}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => navigate(`/calls/${id}/transcript`)}
              className="flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-sm dark:border-white/[0.08] dark:bg-[#101012]"
            >
              <MessageSquare size={15} />
              View Transcript
            </button>

            <button
              onClick={handleAnalyze}
              disabled={analyzing || call.status === "in_progress"}
              className="flex h-9 items-center gap-2 rounded-lg bg-cyan-600 px-3 text-sm font-medium text-white hover:bg-cyan-700 disabled:opacity-50"
            >
              {analyzing ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Brain size={15} />
              )}
              Analyze Call
            </button>
          </div>
        </div>

        <PageError error={error} onClose={() => setError("")} />

        {/* SUMMARY CARDS */}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            [
              "Caller",
              call.caller_display ||
                call.caller_name ||
                call.caller_number ||
                "Unknown",
            ],
            ["Status", call.status_label || call.status || "--"],
            ["Channel", call.channel || "--"],
            ["Duration", formatDuration(call.duration_seconds)],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl border border-black/[0.06] bg-white p-4 dark:border-white/[0.08] dark:bg-[#101012]"
            >
              <p className="text-xs text-zinc-500">{label}</p>
              <p className="mt-2 text-lg font-semibold capitalize">
                {value}
              </p>
            </div>
          ))}
        </section>

        {/* DETAILS */}

        <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">

            <div className="rounded-xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
              <h2 className="mb-5 text-sm font-semibold">
                Call Information
              </h2>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <InfoItem
                  label="Caller Name"
                  value={call.caller_name}
                />

                <InfoItem
                  label="Caller Number"
                  value={call.caller_number}
                />

                <InfoItem
                  label="Agent"
                  value={call.agent_name}
                />

                <InfoItem
                  label="Model"
                  value={call.model}
                />

                <InfoItem
                  label="Direction"
                  value={call.direction}
                />

                <InfoItem
                  label="Sentiment"
                  value={call.sentiment}
                />

                <InfoItem
                  label="Started At"
                  value={formatDate(call.started_at)}
                />

                <InfoItem
                  label="Ended At"
                  value={formatDate(call.ended_at)}
                />

                <InfoItem
                  label="End Reason"
                  value={call.end_reason_label || call.end_reason}
                />

                <InfoItem
                  label="Converted"
                  value={call.converted ? "Yes" : "No"}
                />
              </div>
            </div>

            {/* CALL SUMMARY */}

            <div className="rounded-xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold">
                  Call Summary
                </h2>

                <FileText size={17} className="text-zinc-400" />
              </div>

              <p className="whitespace-pre-wrap text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                {call.summary || "No call summary available."}
              </p>
            </div>

            {/* TRANSCRIPT PREVIEW */}

            <div className="rounded-xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-sm font-semibold">
                  Transcript Preview
                </h2>

                <button
                  onClick={() => navigate(`/calls/${id}/transcript`)}
                  className="text-xs font-medium text-cyan-600 dark:text-cyan-400"
                >
                  View Full Transcript
                </button>
              </div>

              {messages.length === 0 ? (
                <p className="text-sm text-zinc-500">
                  No transcript messages available.
                </p>
              ) : (
                <div className="space-y-3">
                  {messages.slice(0, 4).map((message, index) => (
                    <div
                      key={message.id || index}
                      className="rounded-lg bg-zinc-50 p-3 dark:bg-white/[0.03]"
                    >
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="text-xs font-semibold capitalize text-cyan-600 dark:text-cyan-400">
                          {message.role || "Speaker"}
                        </span>

                        <span className="text-[10px] text-zinc-500">
                          {formatDate(message.created_at)}
                        </span>
                      </div>

                      <p className="whitespace-pre-wrap text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                        {message.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* SIDE PANEL */}

          <div className="space-y-5">

            <div className="rounded-xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
              <div className="mb-4 flex items-center gap-2">
                <User size={17} className="text-zinc-400" />

                <h2 className="text-sm font-semibold">
                  Call Information
                </h2>
              </div>

              <div className="space-y-4">
                <InfoItem
                  label="Call ID"
                  value={call.id}
                />

                <InfoItem
                  label="Agent ID"
                  value={call.agent_id}
                />

                <InfoItem
                  label="Analyzed"
                  value={call.analyzed ? "Yes" : "No"}
                />

                <InfoItem
                  label="Recording Available"
                  value={call.has_recording ? "Yes" : "No"}
                />
              </div>
            </div>

            {/* RECORDING */}

            <div className="rounded-xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
              <div className="mb-4 flex items-center gap-2">
                <Headphones size={17} className="text-zinc-400" />

                <h2 className="text-sm font-semibold">
                  Call Recording
                </h2>
              </div>

              {call.recording_url ? (
                <audio
                  controls
                  className="w-full"
                  src={call.recording_url}
                >
                  Your browser does not support audio playback.
                </audio>
              ) : (
                <p className="text-sm text-zinc-500">
                  Recording is not available for this call.
                </p>
              )}
            </div>

            {/* DOWNLOAD */}

            <div className="rounded-xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
              <h2 className="mb-4 text-sm font-semibold">
                Download Transcript
              </h2>

              <div className="space-y-2">
                <button
                  onClick={() => handleDownload("txt")}
                  className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-black/[0.08] text-sm text-zinc-700 hover:bg-black/[0.03] dark:border-white/[0.08] dark:text-zinc-300 dark:hover:bg-white/[0.04]"
                >
                  <Download size={15} />
                  Download TXT
                </button>

                <button
                  onClick={() => handleDownload("json")}
                  className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-black/[0.08] text-sm text-zinc-700 hover:bg-black/[0.03] dark:border-white/[0.08] dark:text-zinc-300 dark:hover:bg-white/[0.04]"
                >
                  <Download size={15} />
                  Download JSON
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// ============================================================
// CALL TRANSCRIPT
// ============================================================

function CallTranscript() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [call, setCall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState("");

  const fetchTranscript = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await callsApi.getById(id);
      setCall(response);
    } catch (err) {
      setError(getCallsApiError(err));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTranscript();
  }, [fetchTranscript]);

  const handleDownload = async (format) => {
    try {
      setDownloading(format);

      const blob = await callsApi.downloadTranscript(id, format);

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `call-${id}-transcript.${format}`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(getCallsApiError(err));
    } finally {
      setDownloading("");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-100 text-zinc-500 dark:bg-[#09090B]">
        <Loader2 size={20} className="mr-2 animate-spin" />
        Loading transcript...
      </div>
    );
  }

  if (!call) {
    return (
      <div className="min-h-screen bg-zinc-100 p-6 dark:bg-[#09090B]">
        <button
          onClick={() => navigate(`/calls/${id}`)}
          className="mb-5 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300"
        >
          <ArrowLeft size={16} />
          Back to Call Details
        </button>

        <PageError error={error || "Transcript not found."} />
      </div>
    );
  }

  const messages = call.messages || [];

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 dark:bg-[#09090B] dark:text-zinc-100">
      <main className="mx-auto max-w-[1100px] space-y-5 p-4 sm:p-6 lg:p-7">

        {/* HEADER */}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <button
              onClick={() => navigate(`/calls/${id}`)}
              className="mb-3 flex items-center gap-2 text-xs text-zinc-500 hover:text-cyan-500"
            >
              <ArrowLeft size={15} />
              Back to Call Details
            </button>

            <h1 className="text-2xl font-semibold">
              Call Transcript
            </h1>

            <p className="mt-1 text-xs text-zinc-500">
              Call ID: {call.id}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleDownload("txt")}
              disabled={Boolean(downloading)}
              className="flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-sm dark:border-white/[0.08] dark:bg-[#101012] disabled:opacity-50"
            >
              {downloading === "txt" ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Download size={14} />
              )}
              TXT
            </button>

            <button
              onClick={() => handleDownload("json")}
              disabled={Boolean(downloading)}
              className="flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-sm dark:border-white/[0.08] dark:bg-[#101012] disabled:opacity-50"
            >
              {downloading === "json" ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Download size={14} />
              )}
              JSON
            </button>
          </div>
        </div>

        <PageError error={error} onClose={() => setError("")} />

        {/* CALL SUMMARY */}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-black/[0.06] bg-white p-4 dark:border-white/[0.08] dark:bg-[#101012]">
            <p className="text-xs text-zinc-500">Caller</p>

            <p className="mt-2 text-sm font-semibold">
              {call.caller_display ||
                call.caller_name ||
                call.caller_number ||
                "Unknown Caller"}
            </p>
          </div>

          <div className="rounded-xl border border-black/[0.06] bg-white p-4 dark:border-white/[0.08] dark:bg-[#101012]">
            <p className="text-xs text-zinc-500">Agent</p>

            <p className="mt-2 text-sm font-semibold">
              {call.agent_name || "--"}
            </p>
          </div>

          <div className="rounded-xl border border-black/[0.06] bg-white p-4 dark:border-white/[0.08] dark:bg-[#101012]">
            <p className="text-xs text-zinc-500">Duration</p>

            <p className="mt-2 text-sm font-semibold">
              {formatDuration(call.duration_seconds)}
            </p>
          </div>
        </section>

        {/* TRANSCRIPT */}

        <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.06] px-5 py-4 dark:border-white/[0.06]">
            <div className="flex items-center gap-2">
              <MessageSquare
                size={17}
                className="text-cyan-600 dark:text-cyan-400"
              />

              <h2 className="text-sm font-semibold">
                Conversation Transcript
              </h2>
            </div>

            <span className="text-xs text-zinc-500">
              {messages.length} messages
            </span>
          </div>

          {messages.length === 0 ? (
            <div className="py-20 text-center">
              <MessageSquare
                size={32}
                className="mx-auto text-zinc-300 dark:text-zinc-600"
              />

              <p className="mt-4 text-sm text-zinc-500">
                No transcript messages available
              </p>
            </div>
          ) : (
            <div className="space-y-4 p-5">
              {messages.map((message, index) => {
                const isAssistant =
                  message.role === "assistant" ||
                  message.role === "agent";

                return (
                  <div
                    key={message.id || index}
                    className={`flex ${
                      isAssistant ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`w-full max-w-[80%] rounded-xl border p-4 ${
                        isAssistant
                          ? "border-cyan-500/10 bg-cyan-500/[0.04]"
                          : "border-black/[0.06] bg-zinc-50 dark:border-white/[0.06] dark:bg-white/[0.03]"
                      }`}
                    >
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <span
                          className={`text-xs font-semibold capitalize ${
                            isAssistant
                              ? "text-cyan-600 dark:text-cyan-400"
                              : "text-zinc-600 dark:text-zinc-300"
                          }`}
                        >
                          {message.role || "Speaker"}
                        </span>

                        <span className="flex items-center gap-1 text-[10px] text-zinc-500">
                          <Clock size={11} />
                          {formatDate(message.created_at)}
                        </span>
                      </div>

                      <p className="whitespace-pre-wrap break-words text-sm leading-7 text-zinc-700 dark:text-zinc-300">
                        {message.content || ""}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

// ============================================================
// MAIN CALLS ROUTER
// ============================================================

export default function Calls() {
  return (
    <Routes>
      <Route index element={<CallsHistory />} />

      <Route path=":id" element={<CallDetails />} />

      <Route
        path=":id/transcript"
        element={<CallTranscript />}
      />

      <Route
        path="*"
        element={<Navigate to="/calls" replace />}
      />
    </Routes>
  );
}