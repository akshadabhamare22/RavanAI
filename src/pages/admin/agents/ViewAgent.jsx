// import React, { useEffect, useState } from "react";
// import { X, LoaderCircle, Pencil, Trash2, RefreshCw } from "lucide-react";
// import { toast } from "react-toastify";
// import agentsApi from "./agentsApi";

// const pretty = (value) => {
//   if (value === null || value === undefined || value === "") return "—";
//   if (typeof value === "object") return JSON.stringify(value, null, 2);
//   return String(value);
// };

// export default function AgentDetails({ agent, onClose, onEdit, onDelete }) {
//   const [details, setDetails] = useState(agent || null);
//   const [loading, setLoading] = useState(false);

//   const load = async () => {
//     if (!agent?.id) return;
//     setLoading(true);
//     try {
//       const result = await agentsApi.getById(agent.id);
//       setDetails(result);
//     } catch (error) {
//       toast.error(error?.response?.data?.detail || error?.response?.data?.message || "Could not load agent details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { setDetails(agent || null); load(); /* load when selected agent changes */ }, [agent?.id]);

//   if (!agent) return null;
//   const data = details || agent;
//   const rows = [
//     ["Agent ID", data.id], ["Status", data.status], ["Client ID", data.client_id],
//     ["Model", data.llm_model || data.model?.id || data.agent_metadata?.builder?.model_name],
//     ["Voice", data.voice?.id || data.voice || data.agent_metadata?.builder?.voice_name],
//     ["Timezone", data.timezone], ["Welcome message", data.welcome_message],
//     ["Memory enabled", data.memory_enabled], ["Emotion", data.emotion], ["Accent", data.accent],
//     ["Total calls", data.total_calls], ["Created", data.created_at], ["Updated", data.updated_at],
//   ];

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose?.(); }}>
//       <section className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-zinc-200 bg-white text-zinc-900 shadow-2xl dark:border-zinc-700 dark:bg-[#111114] dark:text-zinc-100">
//         <header className="flex items-center justify-between border-b border-zinc-200 p-5 dark:border-zinc-800">
//           <div><h2 className="text-lg font-semibold">{data.name || "Agent details"}</h2><p className="mt-1 text-xs text-zinc-500">Full details loaded from GET /agents/{'{agent_id}'}</p></div>
//           <div className="flex gap-2">
//             <button onClick={load} disabled={loading} className="rounded-lg border p-2 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800" title="Refresh"><RefreshCw size={16} className={loading ? "animate-spin" : ""}/></button>
//             <button onClick={onClose} className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800" aria-label="Close"><X size={18}/></button>
//           </div>
//         </header>
//         <div className="max-h-[65vh] overflow-y-auto p-5">
//           {loading && <p className="mb-3 flex items-center gap-2 text-sm text-zinc-500"><LoaderCircle size={16} className="animate-spin"/>Loading latest details…</p>}
//           <div className="grid gap-3 sm:grid-cols-2">
//             {rows.map(([label, value]) => <div key={label} className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800"><p className="mb-1 text-xs text-zinc-500">{label}</p><p className="break-words text-sm">{pretty(value)}</p></div>)}
//           </div>
//           <div className="mt-4 rounded-xl border border-zinc-200 p-3 dark:border-zinc-800"><p className="mb-2 text-xs text-zinc-500">System prompt</p><pre className="whitespace-pre-wrap break-words text-sm">{pretty(data.system_prompt)}</pre></div>
//         </div>
//         <footer className="flex justify-end gap-2 border-t border-zinc-200 p-4 dark:border-zinc-800">
//           <button onClick={() => onDelete?.(data)} className="inline-flex items-center gap-2 rounded-lg border border-red-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50"><Trash2 size={15}/>Delete</button>
//           <button onClick={() => onEdit?.(data)} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"><Pencil size={15}/>Edit agent</button>
//         </footer>
//       </section>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   ArrowLeft,
//   Bot,
//   Calendar,
//   Clock,
//   Loader2,
//   Pencil,
//   RefreshCw,
//   AlertCircle,
// } from "lucide-react";
// import { toast } from "react-toastify";

// import agentsApi, { getApiError } from "./agentsApi";

// const formatDate = (value) => {
//   if (!value) return "Not available";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) return "Not available";

//   return date.toLocaleString();
// };

// const displayValue = (value) => {
//   if (value === null || value === undefined || value === "") {
//     return "Not configured";
//   }

//   if (typeof value === "boolean") return value ? "Enabled" : "Disabled";

//   if (typeof value === "object") return JSON.stringify(value, null, 2);

//   return String(value);
// };

// const Detail = ({ label, value }) => (
//   <div className="min-w-0 rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-white/[0.07] dark:bg-[#0b0c0e]">
//     <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
//       {label}
//     </p>
//     <p className="mt-1 break-words text-xs font-medium text-zinc-800 dark:text-zinc-200">
//       {displayValue(value)}
//     </p>
//   </div>
// );

// const JsonSection = ({ title, value }) => (
//   <section className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/[0.07] dark:bg-[#111315]">
//     <h3 className="mb-3 text-sm font-bold">{title}</h3>
//     {value && Object.keys(value).length > 0 ? (
//       <pre className="max-h-[360px] overflow-auto whitespace-pre-wrap break-words rounded-lg bg-zinc-50 p-3 text-[11px] leading-relaxed text-zinc-700 dark:bg-[#0b0c0e] dark:text-zinc-300">
//         {JSON.stringify(value, null, 2)}
//       </pre>
//     ) : (
//       <p className="text-xs text-zinc-500">No configuration saved.</p>
//     )}
//   </section>
// );

// const ViewAgent = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [agent, setAgent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchAgent = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const data = await agentsApi.getById(id);
//       setAgent(data);
//     } catch (err) {
//       const message = getApiError(err);
//       setError(message);
//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAgent();
//     // Fetch again when the route ID changes.
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="flex min-h-[60vh] items-center justify-center gap-2 text-sm text-zinc-500">
//         <Loader2 size={18} className="animate-spin" />
//         Loading agent details...
//       </div>
//     );
//   }

//   if (error || !agent) {
//     return (
//       <div className="min-h-screen bg-zinc-50 p-5 dark:bg-[#08090B]">
//         <div className="mx-auto max-w-3xl rounded-xl border border-red-500/20 bg-white p-6 dark:bg-[#111315]">
//           <AlertCircle size={22} className="mb-3 text-red-500" />
//           <h2 className="text-sm font-bold">Unable to load agent</h2>
//           <p className="mt-2 text-xs text-zinc-500">
//             {error || "Agent details were not returned by the API."}
//           </p>
//           <div className="mt-4 flex gap-2">
//             <button
//               onClick={fetchAgent}
//               className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-white"
//             >
//               <RefreshCw size={13} /> Retry
//             </button>
//             <button
//               onClick={() => navigate("/agents")}
//               className="rounded-lg border border-zinc-200 px-4 py-2 text-xs font-semibold dark:border-white/10"
//             >
//               Back
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const metadata = agent.agent_metadata || {};

//   return (
//     <div className="min-h-screen bg-zinc-50 px-4 py-5 dark:bg-[#08090B] sm:px-6">
//       <div className="mx-auto max-w-[1200px]">
//         <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
//           <button
//             onClick={() => navigate("/agents")}
//             className="flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
//           >
//             <ArrowLeft size={15} /> Back to Agents
//           </button>

//           <div className="flex gap-2">
//             <button
//               onClick={fetchAgent}
//               className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold dark:border-white/10 dark:bg-[#111315]"
//             >
//               <RefreshCw size={13} /> Refresh
//             </button>

//             <button
//               onClick={() => navigate(`/agents/create?edit=${agent.id}`)}
//               className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-white"
//             >
//               <Pencil size={13} /> Edit Agent
//             </button>
//           </div>
//         </div>

//         <div className="mb-5 rounded-xl border border-zinc-200 bg-white p-5 dark:border-white/[0.07] dark:bg-[#111315]">
//           <div className="flex flex-wrap items-start justify-between gap-4">
//             <div className="flex items-center gap-3">
//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
//                 <Bot size={24} />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold">
//                   {agent.name || "Unnamed Agent"}
//                 </h1>
//                 <p className="mt-1 break-all text-[11px] text-zinc-500">
//                   ID: {agent.id}
//                 </p>
//               </div>
//             </div>

//             <span
//               className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
//                 agent.status === "active"
//                   ? "bg-emerald-500/10 text-emerald-500"
//                   : "bg-zinc-500/10 text-zinc-500"
//               }`}
//             >
//               {agent.status || "unknown"}
//             </span>
//           </div>

//           <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
//             <Detail label="Model" value={agent.llm_model} />
//             <Detail label="Voice" value={agent.voice} />
//             <Detail label="Timezone" value={agent.timezone} />
//             <Detail label="Total Calls" value={agent.total_calls} />
//             <Detail label="Memory" value={agent.memory_enabled} />
//             <Detail label="Emotion" value={agent.emotion} />
//             <Detail label="Accent" value={agent.accent} />
//             <Detail label="Client ID" value={agent.client_id} />
//           </div>
//         </div>

//         <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
//           <Detail
//             label="Created"
//             value={formatDate(agent.created_at)}
//           />
//           <Detail
//             label="Last Updated"
//             value={formatDate(agent.updated_at)}
//           />
//         </div>

//         <div className="mb-5 rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/[0.07] dark:bg-[#111315]">
//           <h3 className="mb-3 flex items-center gap-2 text-sm font-bold">
//             <Calendar size={15} className="text-cyan-500" />
//             Welcome Message
//           </h3>
//           <p className="whitespace-pre-wrap text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
//             {agent.welcome_message || "No welcome message configured."}
//           </p>
//         </div>

//         <div className="mb-5 rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/[0.07] dark:bg-[#111315]">
//           <h3 className="mb-3 text-sm font-bold">System Prompt</h3>
//           <p className="whitespace-pre-wrap text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
//             {agent.system_prompt || "No system prompt configured."}
//           </p>
//         </div>

//         <div className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
//           <JsonSection title="Functions" value={agent.functions} />
//           <JsonSection title="Calendars" value={agent.calendars} />
//           <JsonSection title="Knowledge Base" value={agent.knowledge_base} />
//           <JsonSection title="CRM Sync" value={agent.crm_sync} />
//           <JsonSection title="Speech Settings" value={agent.speech_settings} />
//           <JsonSection title="Call Settings" value={agent.call_settings} />
//           <JsonSection
//             title="Post-Call Data Extraction"
//             value={agent.post_call_data_extraction}
//           />
//           <JsonSection title="Webhook Settings" value={agent.webhook_settings} />
//           <JsonSection title="Prompt Variables" value={agent.prompt_variables} />
//           <JsonSection title="Agent Metadata" value={metadata} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewAgent;



// import React, { useCallback, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   ArrowLeft,
//   Bot,
//   Calendar,
//   Loader2,
//   Pencil,
//   RefreshCw,
//   AlertCircle,
// } from "lucide-react";
// import { toast } from "react-toastify";

// import agentsApi, { getApiError } from "./agentsApi";

// // Format date and time.
// const formatDate = (value) => {
//   if (!value) {
//     return "Not available";
//   }

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return "Not available";
//   }

//   return date.toLocaleString();
// };

// // Format values for display.
// const displayValue = (value) => {
//   if (
//     value === null ||
//     value === undefined ||
//     value === ""
//   ) {
//     return "Not configured";
//   }

//   if (typeof value === "boolean") {
//     return value ? "Enabled" : "Disabled";
//   }

//   if (typeof value === "object") {
//     return JSON.stringify(value, null, 2);
//   }

//   return String(value);
// };

// // Reusable detail card.
// const Detail = ({ label, value }) => (
//   <div className="min-w-0 rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-white/[0.07] dark:bg-[#0b0c0e]">
//     <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
//       {label}
//     </p>

//     <p className="mt-1 break-words text-xs font-medium text-zinc-800 dark:text-zinc-200">
//       {displayValue(value)}
//     </p>
//   </div>
// );

// // Reusable JSON configuration section.
// const JsonSection = ({ title, value }) => {
//   const hasData =
//     value &&
//     typeof value === "object" &&
//     Object.keys(value).length > 0;

//   return (
//     <section className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/[0.07] dark:bg-[#111315]">
//       <h3 className="mb-3 text-sm font-bold">
//         {title}
//       </h3>

//       {hasData ? (
//         <pre className="max-h-[360px] overflow-auto whitespace-pre-wrap break-words rounded-lg bg-zinc-50 p-3 text-[11px] leading-relaxed text-zinc-700 dark:bg-[#0b0c0e] dark:text-zinc-300">
//           {JSON.stringify(value, null, 2)}
//         </pre>
//       ) : (
//         <p className="text-xs text-zinc-500">
//           No configuration saved.
//         </p>
//       )}
//     </section>
//   );
// };

// const ViewAgent = ({ agentId, onBack }) => {
//   const params = useParams();
//   const navigate = useNavigate();

//   // Supports both in-page rendering and route-based rendering.
//   const id = agentId || params.id;

//   const [agent, setAgent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [refreshing, setRefreshing] = useState(false);

//   // Back navigation.
//   const handleBack = () => {
//     if (typeof onBack === "function") {
//       onBack();
//     } else {
//       navigate("/agents");
//     }
//   };

//   // Fetch agent details from backend.
//   const fetchAgent = useCallback(async () => {
//     if (!id) {
//       setError("Agent ID is missing.");
//       setAgent(null);
//       setLoading(false);
//       setRefreshing(false);
//       return;
//     }

//     setError("");

//     try {
//       const data = await agentsApi.getById(id);

//       if (!data) {
//         throw new Error("Agent details were not returned by the API.");
//       }

//       setAgent(data);
//     } catch (err) {
//       const message = getApiError(err);

//       setError(message);
//       setAgent(null);
//       toast.error(message);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, [id]);

//   // Load agent whenever the selected ID changes.
//   useEffect(() => {
//     setLoading(true);
//     fetchAgent();
//   }, [fetchAgent]);

//   // Refresh details.
//   const handleRefresh = async () => {
//     setRefreshing(true);
//     await fetchAgent();
//   };

//   // Edit agent.
//   const handleEdit = () => {
//     if (!agent || !agent.id) {
//       toast.error("Agent ID is missing.");
//       return;
//     }

//     navigate(
//       `/agents/create?edit=${encodeURIComponent(agent.id)}`
//     );
//   };

//   // Loading state.
//   if (loading) {
//     return (
//       <div className="flex min-h-[60vh] items-center justify-center gap-2 bg-zinc-50 text-sm text-zinc-500 dark:bg-[#08090B]">
//         <Loader2 size={18} className="animate-spin" />
//         Loading agent details...
//       </div>
//     );
//   }

//   // Error state.
//   if (error || !agent) {
//     return (
//       <div className="min-h-screen bg-zinc-50 p-5 dark:bg-[#08090B]">
//         <div className="mx-auto max-w-3xl rounded-xl border border-red-500/20 bg-white p-6 dark:bg-[#111315]">
//           <AlertCircle
//             size={22}
//             className="mb-3 text-red-500"
//           />

//           <h2 className="text-sm font-bold">
//             Unable to load agent
//           </h2>

//           <p className="mt-2 text-xs text-zinc-500">
//             {error ||
//               "Agent details were not returned by the API."}
//           </p>

//           <div className="mt-4 flex flex-wrap gap-2">
//             <button
//               onClick={handleRefresh}
//               disabled={refreshing}
//               className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-white disabled:opacity-50"
//             >
//               {refreshing ? (
//                 <Loader2
//                   size={13}
//                   className="animate-spin"
//                 />
//               ) : (
//                 <RefreshCw size={13} />
//               )}

//               Retry
//             </button>

//             <button
//               onClick={handleBack}
//               className="rounded-lg border border-zinc-200 px-4 py-2 text-xs font-semibold dark:border-white/10"
//             >
//               Back to Agents
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const metadata = agent.agent_metadata || {};

//   return (
//     <div className="min-h-screen bg-zinc-50 px-4 py-5 text-zinc-900 dark:bg-[#08090B] dark:text-zinc-100 sm:px-6">
//       <div className="mx-auto max-w-[1200px]">

//         {/* Header actions */}
//         <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
//           <button
//             onClick={handleBack}
//             className="flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
//           >
//             <ArrowLeft size={15} />
//             Back to Agents
//           </button>

//           <div className="flex gap-2">
//             <button
//               onClick={handleRefresh}
//               disabled={refreshing}
//               className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold disabled:opacity-50 dark:border-white/10 dark:bg-[#111315]"
//             >
//               {refreshing ? (
//                 <Loader2
//                   size={13}
//                   className="animate-spin"
//                 />
//               ) : (
//                 <RefreshCw size={13} />
//               )}

//               Refresh
//             </button>

//             <button
//               onClick={handleEdit}
//               className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-white hover:bg-cyan-400"
//             >
//               <Pencil size={13} />
//               Edit Agent
//             </button>
//           </div>
//         </div>

//         {/* Agent overview */}
//         <div className="mb-5 rounded-xl border border-zinc-200 bg-white p-5 dark:border-white/[0.07] dark:bg-[#111315]">
//           <div className="flex flex-wrap items-start justify-between gap-4">
//             <div className="flex min-w-0 items-center gap-3">
//               <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
//                 <Bot size={24} />
//               </div>

//               <div className="min-w-0">
//                 <h1 className="break-words text-xl font-bold">
//                   {agent.name || "Unnamed Agent"}
//                 </h1>

//                 <p className="mt-1 break-all text-[11px] text-zinc-500">
//                   ID: {agent.id}
//                 </p>
//               </div>
//             </div>

//             <span
//               className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
//                 String(agent.status).toLowerCase() === "active"
//                   ? "bg-emerald-500/10 text-emerald-500"
//                   : "bg-zinc-500/10 text-zinc-500"
//               }`}
//             >
//               {agent.status || "unknown"}
//             </span>
//           </div>

//           {/* Main details */}
//           <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
//             <Detail
//               label="Model"
//               value={agent.llm_model}
//             />

//             <Detail
//               label="Voice"
//               value={agent.voice}
//             />

//             <Detail
//               label="Timezone"
//               value={agent.timezone}
//             />

//             <Detail
//               label="Total Calls"
//               value={agent.total_calls}
//             />

//             <Detail
//               label="Memory"
//               value={agent.memory_enabled}
//             />

//             <Detail
//               label="Emotion"
//               value={agent.emotion}
//             />

//             <Detail
//               label="Accent"
//               value={agent.accent}
//             />

//             <Detail
//               label="Client ID"
//               value={agent.client_id}
//             />
//           </div>
//         </div>

//         {/* Dates */}
//         <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
//           <Detail
//             label="Created"
//             value={formatDate(agent.created_at)}
//           />

//           <Detail
//             label="Last Updated"
//             value={formatDate(agent.updated_at)}
//           />
//         </div>

//         {/* Welcome message */}
//         <div className="mb-5 rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/[0.07] dark:bg-[#111315]">
//           <h3 className="mb-3 flex items-center gap-2 text-sm font-bold">
//             <Calendar
//               size={15}
//               className="text-cyan-500"
//             />
//             Welcome Message
//           </h3>

//           <p className="whitespace-pre-wrap text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
//             {agent.welcome_message ||
//               "No welcome message configured."}
//           </p>
//         </div>

//         {/* System prompt */}
//         <div className="mb-5 rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/[0.07] dark:bg-[#111315]">
//           <h3 className="mb-3 text-sm font-bold">
//             System Prompt
//           </h3>

//           <p className="whitespace-pre-wrap text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
//             {agent.system_prompt ||
//               "No system prompt configured."}
//           </p>
//         </div>

//         {/* Agent configurations */}
//         <div className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
//           <JsonSection
//             title="Functions"
//             value={agent.functions}
//           />

//           <JsonSection
//             title="Calendars"
//             value={agent.calendars}
//           />

//           <JsonSection
//             title="Knowledge Base"
//             value={agent.knowledge_base}
//           />

//           <JsonSection
//             title="CRM Sync"
//             value={agent.crm_sync}
//           />

//           <JsonSection
//             title="Speech Settings"
//             value={agent.speech_settings}
//           />

//           <JsonSection
//             title="Call Settings"
//             value={agent.call_settings}
//           />

//           <JsonSection
//             title="Post-Call Data Extraction"
//             value={agent.post_call_data_extraction}
//           />

//           <JsonSection
//             title="Webhook Settings"
//             value={agent.webhook_settings}
//           />

//           <JsonSection
//             title="Prompt Variables"
//             value={agent.prompt_variables}
//           />

//           <JsonSection
//             title="Agent Metadata"
//             value={metadata}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewAgent;



import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Bot,
  Calendar,
  Clock,
  Loader2,
  Pencil,
  RefreshCw,
  AlertCircle,
  Phone,
  Brain,
  Globe,
} from "lucide-react";
import { toast } from "react-toastify";

import agentsApi, { getApiError } from "./agentsApi";

// Format date.
const formatDate = (value) => {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return date.toLocaleString();
};

// Format values.
const displayValue = (value) => {
  if (value === null || value === undefined || value === "") {
    return "Not configured";
  }

  if (typeof value === "boolean") {
    return value ? "Enabled" : "Disabled";
  }

  if (Array.isArray(value) && value.length === 0) {
    return "None configured";
  }

  if (typeof value === "object") {
    return JSON.stringify(value, null, 2);
  }

  return String(value);
};

// Detail card.
const Detail = ({ label, value }) => (
  <div className="min-w-0 rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-white/[0.07] dark:bg-[#0b0c0e]">
    <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
      {label}
    </p>

    <p className="mt-1 break-words text-xs font-medium text-zinc-800 dark:text-zinc-200">
      {displayValue(value)}
    </p>
  </div>
);

// JSON configuration section.
const JsonSection = ({ title, value }) => {
  const hasData =
    value !== null &&
    value !== undefined &&
    (
      (Array.isArray(value) && value.length > 0) ||
      (
        typeof value === "object" &&
        !Array.isArray(value) &&
        Object.keys(value).length > 0
      )
    );

  return (
    <section className="min-w-0 rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/[0.07] dark:bg-[#111315]">
      <h3 className="mb-3 text-sm font-bold">
        {title}
      </h3>

      {hasData ? (
        <pre className="max-h-[360px] overflow-auto whitespace-pre-wrap break-words rounded-lg bg-zinc-50 p-3 text-[11px] leading-relaxed text-zinc-700 dark:bg-[#0b0c0e] dark:text-zinc-300">
          {JSON.stringify(value, null, 2)}
        </pre>
      ) : (
        <p className="text-xs text-zinc-500">
          No configuration saved.
        </p>
      )}
    </section>
  );
};

const ViewAgent = ({ agentId, onBack }) => {
  const params = useParams();
  const navigate = useNavigate();

  // Supports in-page and route-based rendering.
  const id = agentId || params.id;

  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  // Back navigation.
  const handleBack = () => {
    if (typeof onBack === "function") {
      onBack();
    } else {
      navigate("/agents");
    }
  };

  // GET /agents/{agent_id}
  const fetchAgent = useCallback(async () => {
    if (!id) {
      setAgent(null);
      setError("Agent ID is missing.");
      setLoading(false);
      setRefreshing(false);
      return;
    }

    setError("");

    try {
      const response = await agentsApi.getById(id);

      // Backend returns the agent object directly.
      // Also supports an Axios-style nested data response
      // if the API helper is changed in the future.
      const agentData =
        response && response.data
          ? response.data
          : response;

      if (
        !agentData ||
        typeof agentData !== "object" ||
        !agentData.id
      ) {
        throw new Error(
          "Invalid agent details received from the server."
        );
      }

      setAgent(agentData);
    } catch (err) {
      const message = getApiError(err);

      setAgent(null);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [id]);

  // Load when selected agent ID changes.
  useEffect(() => {
    setLoading(true);
    fetchAgent();
  }, [fetchAgent]);

  // Refresh.
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAgent();
  };

  // Edit.
  const handleEdit = () => {
    if (!agent || !agent.id) {
      toast.error("Agent ID is missing.");
      return;
    }

    navigate(
      `/agents/create?edit=${encodeURIComponent(agent.id)}`
    );
  };

  // Loading screen.
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center gap-2 bg-zinc-50 text-sm text-zinc-500 dark:bg-[#08090B]">
        <Loader2 size={18} className="animate-spin" />
        Loading agent details...
      </div>
    );
  }

  // Error screen.
  if (error || !agent) {
    return (
      <div className="min-h-screen bg-zinc-50 p-5 dark:bg-[#08090B]">
        <div className="mx-auto max-w-3xl rounded-xl border border-red-500/20 bg-white p-6 dark:bg-[#111315]">
          <AlertCircle
            size={22}
            className="mb-3 text-red-500"
          />

          <h2 className="text-sm font-bold">
            Unable to load agent
          </h2>

          <p className="mt-2 text-xs text-zinc-500">
            {error || "Agent details were not returned by the API."}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-white disabled:opacity-50"
            >
              {refreshing ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <RefreshCw size={13} />
              )}
              Retry
            </button>

            <button
              onClick={handleBack}
              className="rounded-lg border border-zinc-200 px-4 py-2 text-xs font-semibold dark:border-white/10"
            >
              Back to Agents
            </button>
          </div>
        </div>
      </div>
    );
  }

  const metadata = agent.agent_metadata || {};

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-5 text-zinc-900 dark:bg-[#08090B] dark:text-zinc-100 sm:px-6">
      <div className="mx-auto max-w-[1200px]">

        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          >
            <ArrowLeft size={15} />
            Back to Agents
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold disabled:opacity-50 dark:border-white/10 dark:bg-[#111315]"
            >
              {refreshing ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <RefreshCw size={13} />
              )}
              Refresh
            </button>

            <button
              onClick={handleEdit}
              className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-white hover:bg-cyan-400"
            >
              <Pencil size={13} />
              Edit Agent
            </button>
          </div>
        </div>

        {/* Agent overview */}
        <div className="mb-5 rounded-xl border border-zinc-200 bg-white p-5 dark:border-white/[0.07] dark:bg-[#111315]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
                <Bot size={24} />
              </div>

              <div className="min-w-0">
                <h1 className="break-words text-xl font-bold">
                  {agent.name || "Unnamed Agent"}
                </h1>

                <p className="mt-1 break-all text-[11px] text-zinc-500">
                  ID: {agent.id}
                </p>
              </div>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                String(agent.status).toLowerCase() === "active"
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "bg-zinc-500/10 text-zinc-500"
              }`}
            >
              {agent.status || "unknown"}
            </span>
          </div>

          {/* Main details */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Detail label="Agent Name" value={agent.name} />
            <Detail label="Agent ID" value={agent.id} />
            <Detail label="Status" value={agent.status} />
            <Detail label="Client ID" value={agent.client_id} />
            <Detail label="LLM Model" value={agent.llm_model} />
            <Detail label="Voice ID" value={agent.voice} />
            <Detail label="Timezone" value={agent.timezone} />
            <Detail label="Total Calls" value={agent.total_calls} />
            <Detail label="Memory" value={agent.memory_enabled} />
            <Detail label="Emotion" value={agent.emotion} />
            <Detail label="Accent" value={agent.accent} />
          </div>
        </div>

        {/* Dates */}
        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Detail
            label="Created At"
            value={formatDate(agent.created_at)}
          />

          <Detail
            label="Updated At"
            value={formatDate(agent.updated_at)}
          />
        </div>

        {/* Welcome message */}
        <div className="mb-5 rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/[0.07] dark:bg-[#111315]">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-bold">
            <Calendar size={15} className="text-cyan-500" />
            Welcome Message
          </h3>

          <p className="whitespace-pre-wrap text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
            {agent.welcome_message || "No welcome message configured."}
          </p>
        </div>

        {/* System prompt */}
        <div className="mb-5 rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/[0.07] dark:bg-[#111315]">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-bold">
            <Brain size={15} className="text-cyan-500" />
            System Prompt
          </h3>

          <p className="whitespace-pre-wrap text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
            {agent.system_prompt || "No system prompt configured."}
          </p>
        </div>

        {/* Functions and integrations */}
        <div className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <JsonSection
            title="Functions"
            value={agent.functions}
          />

          <JsonSection
            title="Calendars"
            value={agent.calendars}
          />

          <JsonSection
            title="Knowledge Base"
            value={agent.knowledge_base}
          />

          <JsonSection
            title="CRM Sync"
            value={agent.crm_sync}
          />
        </div>

        {/* Speech and call configuration */}
        <div className="mb-5">
          <h2 className="mb-3 flex items-center gap-2 text-base font-bold">
            <Globe size={17} className="text-cyan-500" />
            Voice & Call Configuration
          </h2>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <JsonSection
              title="Speech Settings"
              value={agent.speech_settings}
            />

            <JsonSection
              title="Call Settings"
              value={agent.call_settings}
            />
          </div>
        </div>

        {/* Post call and webhook configuration */}
        <div className="mb-5">
          <h2 className="mb-3 flex items-center gap-2 text-base font-bold">
            <Phone size={17} className="text-cyan-500" />
            Post-Call & Webhook Configuration
          </h2>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <JsonSection
              title="Post-Call Data Extraction"
              value={agent.post_call_data_extraction}
            />

            <JsonSection
              title="Webhook Settings"
              value={agent.webhook_settings}
            />
          </div>
        </div>

        {/* Other configuration */}
        <div className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <JsonSection
            title="Prompt Variables"
            value={agent.prompt_variables}
          />

          <JsonSection
            title="Agent Metadata"
            value={metadata}
          />
        </div>

      </div>
    </div>
  );
};

export default ViewAgent;
