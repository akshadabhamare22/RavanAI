
// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import config from "../../config/Config";
// import {
//   PhoneCall,
//   Phone,
//   User,
//   Calendar,
//   Clock,
//   Shield,
//   RotateCcw,
//   Plus,
//   Search,
//   Check,
//   ChevronDown,
//   Info,
//   Eye,
//   Pencil,
//   Trash2,
// } from "lucide-react";
// import ViewInboundRoute from "./ViewInboundRoute";
// import EditInboundRoute from "./EditInboundRoute";
// import DeleteInboundRoute from "./DeleteInboundRoute";

// // ============================================================
// // CONSTANTS
// // ============================================================

// const TIMEZONES = [
//   "UTC",
//   "Asia/Kolkata",
//   "Asia/Dubai",
//   "Asia/Singapore",
//   "Asia/Tokyo",
//   "Europe/London",
//   "Europe/Paris",
//   "America/New_York",
//   "America/Los_Angeles",
//   "Australia/Sydney",
// ];

// const HOURS = Array.from({ length: 24 }, (_, i) =>
//   i.toString().padStart(2, "0")
// );
// const MINUTES = ["00", "15", "30", "45"];

// const DAYS = [
//   { key: "Mon", label: "Mon" },
//   { key: "Tue", label: "Tue" },
//   { key: "Wed", label: "Wed" },
//   { key: "Thu", label: "Thu" },
//   { key: "Fri", label: "Fri" },
//   { key: "Sat", label: "Sat" },
//   { key: "Sun", label: "Sun" },
// ];

// // ============================================================
// // API HELPERS
// // ============================================================

// const getAccessToken = () => {
//   const directToken =
//     localStorage.getItem("access_token") ||
//     localStorage.getItem("accessToken");

//   if (directToken) return directToken.trim();

//   try {
//     const auth = JSON.parse(localStorage.getItem("ravanai_auth") || "{}");
//     return (auth?.access_token || auth?.accessToken || auth?.token || "").trim();
//   } catch {
//     return "";
//   }
// };

// const getApiHeaders = () => {
//   const token = getAccessToken();
//   if (!token) throw new Error("Access token missing. Please login again.");
//   return { Accept: "application/json", Authorization: `Bearer ${token}` };
// };

// const getErrorMessage = (error, fallback) => {
//   const detail = error?.response?.data?.detail ?? error?.response?.data?.message;
//   if (Array.isArray(detail)) {
//     return detail.map((item) => item?.msg || item?.message || String(item)).filter(Boolean).join(", ");
//   }
//   return detail || error?.message || fallback;
// };

// const formatTimeForApi = (hour, minute) =>
//   hour === "" || minute === "" ? null : `${hour}:${minute}:00`;

// const formatDateTimeForDisplay = (value) => {
//   if (!value) return "-";
//   const date = new Date(value);
//   return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
// };

// // ============================================================
// // MAIN PAGE
// // ============================================================

// export default function InboundCalls() {
//   const [form, setForm] = useState({
//     phoneNumber: "",
//     agent: "",
//     timezone: "",
//     maxConcurrent: 1,
//     budget: "",
//     startDate: "",
//     endDate: "",
//     windowStartHour: "",
//     windowStartMin: "",
//     windowEndHour: "",
//     windowEndMin: "",
//     activeDays: [],
//   });

//   const [routes, setRoutes] = useState([]);
//   const [filterQuery, setFilterQuery] = useState("");
//   const [errors, setErrors] = useState({});
//   const [phoneNumbers, setPhoneNumbers] = useState([]);
//   const [agents, setAgents] = useState([]);
//   const [loadingRoutes, setLoadingRoutes] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [apiError, setApiError] = useState("");
//   const [viewRouteId, setViewRouteId] = useState(null);
//   const [editRouteId, setEditRouteId] = useState(null);
//   const [deleteRouteId, setDeleteRouteId] = useState(null);

//   const loadInboundData = useCallback(async () => {
//     setLoadingRoutes(true);
//     setApiError("");
//     try {
//       const headers = getApiHeaders();
//       const [routesResponse, phoneResponse, agentsResponse] = await Promise.all([
//         axios.get(`${config.BASE_URL}/inbound/routes`, { headers }),
//         axios.get(`${config.BASE_URL}/phone-numbers`, {
//           headers,
//           params: { is_active: true, limit: 200, offset: 0 },
//         }),
//         axios.get(`${config.BASE_URL}/agents`, { headers }),
//       ]);

//       const routeItems = routesResponse.data?.items || [];
//       const phoneItems = phoneResponse.data?.items || [];
//       const agentItems = agentsResponse.data?.items || [];

//       setPhoneNumbers(phoneItems);
//       setAgents(agentItems);

//       const phoneById = new Map(phoneItems.map((item) => [item.id, item]));
//       const agentById = new Map(agentItems.map((item) => [item.id, item]));

//       setRoutes(routeItems.map((route) => ({
//         ...route,
//         phoneNumber: phoneById.get(route.phone_number_id)?.number || route.phone_number_id || "-",
//         agent: agentById.get(route.agent_id)?.name || route.agent_id || "-",
//         maxConcurrent: route.max_concurrent_calls,
//         activeDays: Array.isArray(route.active_days) ? route.active_days : [],
//         createdAt: formatDateTimeForDisplay(route.created_at),
//       })));
//     } catch (error) {
//       setApiError(getErrorMessage(error, "Failed to load inbound routes."));
//     } finally {
//       setLoadingRoutes(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadInboundData();
//   }, [loadInboundData]);

//   const updateField = (key, value) => {
//     setForm((p) => ({ ...p, [key]: value }));
//     setErrors((p) => ({ ...p, [key]: undefined }));
//   };

//   const toggleDay = (key) => {
//     setForm((p) => ({
//       ...p,
//       activeDays: p.activeDays.includes(key)
//         ? p.activeDays.filter((d) => d !== key)
//         : [...p.activeDays, key],
//     }));
//   };

//   const validate = () => {
//     const e = {};
//     if (!form.phoneNumber) e.phoneNumber = "Phone number is required";
//     if (!form.agent) e.agent = "Please select an agent";
//     if (!form.timezone) e.timezone = "Timezone is required";
//     if (form.maxConcurrent < 1 || form.maxConcurrent > 5)
//       e.maxConcurrent = "Must be between 1 and 5";
//     return e;
//   };

//   const handleSubmit = async (ev) => {
//     ev.preventDefault();
//     const e = validate();
//     if (Object.keys(e).length > 0) {
//       setErrors(e);
//       return;
//     }

//     const payload = {
//       phone_number_id: form.phoneNumber,
//       agent_id: form.agent,
//       timezone: form.timezone,
//       max_concurrent_calls: Number(form.maxConcurrent),
//       budget_credits: form.budget.trim() === "" ? null : Number(form.budget),
//       start_date: form.startDate || null,
//       end_date: form.endDate || null,
//       call_window_start: formatTimeForApi(form.windowStartHour, form.windowStartMin),
//       call_window_end: formatTimeForApi(form.windowEndHour, form.windowEndMin),
//       active_days: form.activeDays,
//       is_active: true,
//     };

//     if (payload.budget_credits !== null && (!Number.isFinite(payload.budget_credits) || payload.budget_credits < 0)) {
//       setApiError("Budget must be a valid non-negative number.");
//       return;
//     }

//     setSubmitting(true);
//     setApiError("");
//     try {
//       await axios.post(`${config.BASE_URL}/inbound/routes`, payload, {
//         headers: { ...getApiHeaders(), "Content-Type": "application/json" },
//       });
//       await loadInboundData();
//       handleReset();
//     } catch (error) {
//       setApiError(getErrorMessage(error, "Failed to create inbound route."));
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleReset = () => {
//     setForm({
//       phoneNumber: "",
//       agent: "",
//       timezone: "",
//       maxConcurrent: 1,
//       budget: "",
//       startDate: "",
//       endDate: "",
//       windowStartHour: "",
//       windowStartMin: "",
//       windowEndHour: "",
//       windowEndMin: "",
//       activeDays: [],
//     });
//     setErrors({});
//   };

//   const filteredRoutes = routes.filter((r) =>
//     (r.phoneNumber || "").toLowerCase().includes(filterQuery.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
//       <main className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-7">
//         {/* ============ INBOUND CAMPAIGN CARD ============ */}
//         <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">
//           {/* Card header */}
//           <div className="flex items-center gap-3 border-b border-black/[0.06] px-5 py-4 dark:border-white/[0.06]">
//             <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-500/25 bg-cyan-500/[0.06]">
//               <PhoneCall
//                 size={16}
//                 className="text-cyan-600 dark:text-cyan-400"
//               />
//             </div>
//             <div>
//               <h2 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
//                 Inbound Campaign
//               </h2>
//               <p className="mt-0.5 text-[12px] text-zinc-500">
//                 Link a phone number to an AI agent — all calls to that number will be handled automatically.
//               </p>
//             </div>
//           </div>

//           {/* Form body */}
//           <form onSubmit={handleSubmit} className="space-y-6 p-5">
//             {/* Incoming Calls To + Routed To Agent */}
//             <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//               {/* Incoming */}
//               <div>
//                 <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
//                   Incoming Calls To
//                 </label>
//                 <div className="relative">
//                   <Phone
//                     size={14}
//                     className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
//                   />
//                   <select
//                     value={form.phoneNumber}
//                     onChange={(e) =>
//                       updateField("phoneNumber", e.target.value)
//                     }
//                     className="h-11 w-full appearance-none rounded-lg border border-black/[0.08] bg-white pl-9 pr-9 text-[13px] text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:focus:border-cyan-400"
//                   >
//                     <option value="">Select phone number</option>
//                     {phoneNumbers.map((phone) => (
//                       <option key={phone.id} value={phone.id}>
//                         {phone.number}{phone.label ? ` - ${phone.label}` : ""}
//                       </option>
//                     ))}
//                   </select>
//                   <ChevronDown
//                     size={14}
//                     className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
//                   />
//                 </div>
//                 <p className="mt-2 flex items-center gap-1.5 text-[11px]">
//                   <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
//                   <span className="text-zinc-500">
//                     {phoneNumbers.length === 0 ? (
//                       <>No phone numbers —{" "}<a href="#" className="text-cyan-600 hover:underline dark:text-cyan-400">buy one first</a></>
//                     ) : (
//                       `${phoneNumbers.length} active phone number${phoneNumbers.length === 1 ? "" : "s"} available`
//                     )}
//                   </span>
//                 </p>
//               </div>

//               {/* Agent */}
//               <div>
//                 <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
//                   Routed To Agent
//                 </label>
//                 <div className="relative">
//                   <User
//                     size={14}
//                     className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
//                   />
//                   <select
//                     value={form.agent}
//                     onChange={(e) => updateField("agent", e.target.value)}
//                     className="h-11 w-full appearance-none rounded-lg border border-black/[0.08] bg-white pl-9 pr-9 text-[13px] text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:focus:border-cyan-400"
//                   >
//                     <option value="">Select agent</option>
//                     {agents.map((agent) => (
//                       <option key={agent.id} value={agent.id}>
//                         {agent.name}
//                       </option>
//                     ))}
//                   </select>
//                   <ChevronDown
//                     size={14}
//                     className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
//                   />
//                 </div>
//                 {errors.agent && (
//                   <p className="mt-1.5 text-[11px] text-red-500">
//                     {errors.agent}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* ============ SCHEDULE & RULES ============ */}
//             <div className="rounded-xl border border-black/[0.06] p-5 dark:border-white/[0.06]">
//               {/* Sub-header */}
//               <div className="mb-5 flex items-center gap-2">
//                 <Calendar size={14} className="text-zinc-500" />
//                 <h3 className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
//                   Schedule &amp; Rules
//                 </h3>
//               </div>

//               {/* Row 1: Timezone + Max Concurrent */}
//               <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//                 <div>
//                   <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
//                     Timezone <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <Clock
//                       size={14}
//                       className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
//                     />
//                     <select
//                       value={form.timezone}
//                       onChange={(e) =>
//                         updateField("timezone", e.target.value)
//                       }
//                       className="h-11 w-full appearance-none rounded-lg border border-black/[0.08] bg-white pl-9 pr-9 text-[13px] text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:focus:border-cyan-400"
//                     >
//                       <option value="">Select timezone</option>
//                       {TIMEZONES.map((tz) => (
//                         <option key={tz} value={tz}>
//                           {tz}
//                         </option>
//                       ))}
//                     </select>
//                     <ChevronDown
//                       size={14}
//                       className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
//                     />
//                   </div>
//                   {errors.timezone && (
//                     <p className="mt-1.5 text-[11px] text-red-500">
//                       {errors.timezone}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
//                     Max Concurrent Calls
//                   </label>
//                   <input
//                     type="number"
//                     min={1}
//                     max={5}
//                     value={form.maxConcurrent}
//                     onChange={(e) =>
//                       updateField(
//                         "maxConcurrent",
//                         parseInt(e.target.value || "0", 10)
//                       )
//                     }
//                     className="h-11 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:focus:border-cyan-400"
//                   />
//                   <p className="mt-1.5 text-[11px] text-zinc-500">
//                     Range: 1 – 5
//                   </p>
//                   {errors.maxConcurrent && (
//                     <p className="mt-1 text-[11px] text-red-500">
//                       {errors.maxConcurrent}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Row 2: Budget + Start Date */}
//               <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
//                 <div>
//                   <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
//                     Budget (Credits)
//                   </label>
//                   <input
//                     type="text"
//                     value={form.budget}
//                     onChange={(e) => updateField("budget", e.target.value)}
//                     placeholder="Unlimited"
//                     className="h-11 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-cyan-400"
//                   />
//                   <p className="mt-1.5 text-[11px] text-zinc-500">
//                     New calls are rejected once spend reaches the cap. Blank = unlimited.
//                   </p>
//                 </div>

//                 <div>
//                   <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
//                     Start Date
//                   </label>
//                   <input
//                     type="date"
//                     value={form.startDate}
//                     onChange={(e) => updateField("startDate", e.target.value)}
//                     className="h-11 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:focus:border-cyan-400"
//                   />
//                 </div>
//               </div>

//               {/* Row 3: End Date + Window Start */}
//               <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
//                 <div>
//                   <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
//                     End Date
//                   </label>
//                   <input
//                     type="date"
//                     value={form.endDate}
//                     onChange={(e) => updateField("endDate", e.target.value)}
//                     className="h-11 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:focus:border-cyan-400"
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
//                     Call Window Start
//                   </label>
//                   <div className="flex items-center gap-2">
//                     <div className="relative flex-1">
//                       <select
//                         value={form.windowStartHour}
//                         onChange={(e) =>
//                           updateField("windowStartHour", e.target.value)
//                         }
//                         className="h-11 w-full appearance-none rounded-lg border border-black/[0.08] bg-white px-3 pr-9 text-[13px] text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:focus:border-cyan-400"
//                       >
//                         <option value="">Hour</option>
//                         {HOURS.map((h) => (
//                           <option key={h} value={h}>
//                             {h}
//                           </option>
//                         ))}
//                       </select>
//                       <ChevronDown
//                         size={13}
//                         className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
//                       />
//                     </div>
//                     <span className="text-zinc-400">:</span>
//                     <div className="relative flex-1">
//                       <select
//                         value={form.windowStartMin}
//                         onChange={(e) =>
//                           updateField("windowStartMin", e.target.value)
//                         }
//                         className="h-11 w-full appearance-none rounded-lg border border-black/[0.08] bg-white px-3 pr-9 text-[13px] text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:focus:border-cyan-400"
//                       >
//                         <option value="">Min</option>
//                         {MINUTES.map((m) => (
//                           <option key={m} value={m}>
//                             {m}
//                           </option>
//                         ))}
//                       </select>
//                       <ChevronDown
//                         size={13}
//                         className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Row 4: Window End */}
//               <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
//                 <div>
//                   <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
//                     Call Window End
//                   </label>
//                   <div className="flex items-center gap-2">
//                     <div className="relative flex-1">
//                       <select
//                         value={form.windowEndHour}
//                         onChange={(e) =>
//                           updateField("windowEndHour", e.target.value)
//                         }
//                         className="h-11 w-full appearance-none rounded-lg border border-black/[0.08] bg-white px-3 pr-9 text-[13px] text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:focus:border-cyan-400"
//                       >
//                         <option value="">Hour</option>
//                         {HOURS.map((h) => (
//                           <option key={h} value={h}>
//                             {h}
//                           </option>
//                         ))}
//                       </select>
//                       <ChevronDown
//                         size={13}
//                         className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
//                       />
//                     </div>
//                     <span className="text-zinc-400">:</span>
//                     <div className="relative flex-1">
//                       <select
//                         value={form.windowEndMin}
//                         onChange={(e) =>
//                           updateField("windowEndMin", e.target.value)
//                         }
//                         className="h-11 w-full appearance-none rounded-lg border border-black/[0.08] bg-white px-3 pr-9 text-[13px] text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:focus:border-cyan-400"
//                       >
//                         <option value="">Min</option>
//                         {MINUTES.map((m) => (
//                           <option key={m} value={m}>
//                             {m}
//                           </option>
//                         ))}
//                       </select>
//                       <ChevronDown
//                         size={13}
//                         className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Row 5: Active Days */}
//               <div className="mt-5">
//                 <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
//                   Active Days
//                 </label>
//                 <div className="flex flex-wrap gap-2">
//                   {DAYS.map((d) => {
//                     const active = form.activeDays.includes(d.key);
//                     return (
//                       <button
//                         key={d.key}
//                         type="button"
//                         onClick={() => toggleDay(d.key)}
//                         className={`
//                           rounded-md border px-3 py-1.5 text-[12px] font-medium transition
//                           ${
//                             active
//                               ? "border-cyan-500/50 bg-cyan-500/[0.10] text-cyan-600 dark:text-cyan-400"
//                               : "border-black/[0.08] bg-white text-zinc-600 hover:border-cyan-500/30 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-400"
//                           }
//                         `}
//                       >
//                         {d.label}
//                       </button>
//                     );
//                   })}
//                 </div>
//                 <p className="mt-2 text-[11px] text-zinc-500">
//                   Leave call window blank to allow calls at any time.
//                 </p>
//               </div>
//             </div>

//             {/* ============ FOOTER ============ */}
//             <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.06] pt-5 dark:border-white/[0.06]">
//               <div className="flex items-center gap-2 text-[12px] text-zinc-500">
//                 <Shield size={14} className="text-cyan-500 dark:text-cyan-400" />
//                 Route becomes live immediately after creation.
//               </div>
//               <div className="flex items-center gap-2">
//                 <button
//                   type="button"
//                   onClick={handleReset}
//                   className="flex h-10 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-4 text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
//                 >
//                   <RotateCcw size={14} />
//                   Reset
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={submitting}
//                   className="flex h-10 items-center gap-2 rounded-lg bg-cyan-500 px-4 text-[13px] font-semibold text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-cyan-400 dark:text-slate-950"
//                 >
//                   <Plus size={15} strokeWidth={2.8} />
//                   {submitting ? "Creating..." : "Create Route"}
//                 </button>
//               </div>
//             </div>
//           </form>
//         </section>

//         {/* ============ ROUTING RULES ============ */}
//         <section className="space-y-4">
//           {apiError && (
//             <div role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] text-red-600 dark:text-red-400">
//               {apiError}
//             </div>
//           )}
//           {/* Header row */}
//           <div className="flex flex-wrap items-center justify-between gap-3">
//             <div className="flex items-center gap-2">
//               <h2 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
//                 Routing Rules
//               </h2>
//               <span className="rounded bg-black/[0.06] px-2 py-0.5 text-[11px] font-semibold text-zinc-600 dark:bg-white/[0.08] dark:text-zinc-400">
//                 {routes.length}
//               </span>
//             </div>

//             <div className="flex h-10 w-full max-w-xs items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-sm text-zinc-500 dark:border-white/[0.08] dark:bg-[#101012]">
//               <Search size={14} />
//               <input
//                 type="text"
//                 placeholder="Filter by number..."
//                 value={filterQuery}
//                 onChange={(e) => setFilterQuery(e.target.value)}
//                 className="min-w-0 flex-1 bg-transparent text-[13px] text-zinc-800 outline-none placeholder:text-zinc-500 dark:text-zinc-200"
//               />
//             </div>
//           </div>

//           {/* Empty state */}
//           {loadingRoutes ? (
//             <div className="rounded-2xl border border-black/[0.06] bg-white py-12 text-center text-[13px] text-zinc-500 dark:border-white/[0.08] dark:bg-[#101012]">
//               Loading routing rules...
//             </div>
//           ) : routes.length === 0 ? (
//             <div className="rounded-2xl border border-dashed border-black/[0.10] bg-white py-20 text-center dark:border-white/[0.08] dark:bg-[#101012]">
//               <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-black/[0.06] bg-zinc-50 dark:border-white/[0.08] dark:bg-white/[0.02]">
//                 <Phone
//                   size={26}
//                   className="text-zinc-400 dark:text-zinc-500"
//                 />
//               </div>

//               <h3 className="mt-5 text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
//                 No routes yet
//               </h3>

//               <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-zinc-500">
//                 Create a routing rule above to start directing calls from a
//                 phone number to an AI agent.
//               </p>
//             </div>
//           ) : (
//             <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">
//               <table className="w-full">
//                 <thead className="border-b border-black/[0.06] dark:border-white/[0.06]">
//                   <tr>
//                     <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
//                       Phone Number
//                     </th>
//                     <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
//                       Agent
//                     </th>
//                     <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
//                       Timezone
//                     </th>
//                     <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
//                       Max
//                     </th>
//                     <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
//                       Active Days
//                     </th>
//                     <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
//                       Created
//                     </th>
//                     <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredRoutes.map((r) => (
//                     <tr
//                       key={r.id}
//                       className="border-b border-black/[0.04] last:border-0 dark:border-white/[0.04]"
//                     >
//                       <td className="px-5 py-4 text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
//                         {r.phoneNumber}
//                       </td>
//                       <td className="px-3 py-4 text-[13px] text-zinc-700 dark:text-zinc-300">
//                         {r.agent || "-"}
//                       </td>
//                       <td className="px-3 py-4 text-[13px] text-zinc-700 dark:text-zinc-300">
//                         {r.timezone}
//                       </td>
//                       <td className="px-3 py-4 text-[13px] text-zinc-700 dark:text-zinc-300">
//                         {r.maxConcurrent}
//                       </td>
//                       <td className="px-3 py-4 text-[12px] text-zinc-500">
//                         {r.activeDays?.length > 0
//                           ? r.activeDays.join(", ")
//                           : "All days"}
//                       </td>
//                       <td className="px-5 py-4 text-right text-[12px] text-zinc-500">
//                         {r.createdAt}
//                       </td>
//                       <td className="px-5 py-4">
//                         <div className="flex items-center justify-end gap-1.5">
//                           <button
//                             type="button"
//                             onClick={() => setViewRouteId(r.id)}
//                             title="View"
//                             aria-label="View route"
//                             className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-zinc-500 transition hover:bg-black/[0.03] hover:text-zinc-800 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:hover:bg-white/[0.04] dark:hover:text-zinc-200"
//                           >
//                             <Eye size={14} />
//                           </button>
//                           <button
//                             type="button"
//                             onClick={() => setEditRouteId(r.id)}
//                             title="Edit"
//                             aria-label="Edit route"
//                             className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-zinc-500 transition hover:bg-black/[0.03] hover:text-zinc-800 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:hover:bg-white/[0.04] dark:hover:text-zinc-200"
//                           >
//                             <Pencil size={14} />
//                           </button>
//                           <button
//                             type="button"
//                             onClick={() => setDeleteRouteId(r.id)}
//                             title="Delete"
//                             aria-label="Delete route"
//                             className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/[0.05] text-red-500 transition hover:bg-red-500/[0.12]"
//                           >
//                             <Trash2 size={14} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </section>
//       </main>

//       {/* ============ VIEW / EDIT / DELETE ROUTE ============ */}
//       {viewRouteId && (
//         <ViewInboundRoute
//           inboundRouteId={viewRouteId}
//           onClose={() => setViewRouteId(null)}
//         />
//       )}

//       {editRouteId && (
//         <EditInboundRoute
//           inboundRouteId={editRouteId}
//           onClose={() => setEditRouteId(null)}
//           onUpdated={() => loadInboundData()}
//         />
//       )}

//       {deleteRouteId && (
//         <DeleteInboundRoute
//           inboundRouteId={deleteRouteId}
//           onClose={() => setDeleteRouteId(null)}
//           onDeleted={() => loadInboundData()}
//         />
//       )}
//     </div>
//   );
// }






import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import config from "../../../config/Config";
import {
  PhoneCall,
  Phone,
  User,
  Calendar,
  Clock,
  Shield,
  RotateCcw,
  Plus,
  Search,
  Check,
  ChevronDown,
  Info,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import ViewInboundRoute from "./ViewInboundRoute";
import EditInboundRoute from "./EditInboundRoute";
import DeleteInboundRoute from "./DeleteInboundRoute";

// ============================================================
// CONSTANTS
// ============================================================

const TIMEZONES = [
  "UTC",
  "Asia/Kolkata",
  "Asia/Dubai",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Europe/London",
  "Europe/Paris",
  "America/New_York",
  "America/Los_Angeles",
  "Australia/Sydney",
];

const HOURS = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, "0")
);
const MINUTES = ["00", "15", "30", "45"];

const DAYS = [
  { key: "Mon", label: "Mon" },
  { key: "Tue", label: "Tue" },
  { key: "Wed", label: "Wed" },
  { key: "Thu", label: "Thu" },
  { key: "Fri", label: "Fri" },
  { key: "Sat", label: "Sat" },
  { key: "Sun", label: "Sun" },
];

// ============================================================
// INBOUND API  (all /inbound/* + the lookups this module needs)
// Other inbound files import { inboundApi } from "./InboundCalls"
// ============================================================

const getAccessToken = () => {
  const directToken =
    localStorage.getItem("access_token") ||
    localStorage.getItem("accessToken");

  if (directToken) return directToken.trim();

  try {
    const auth = JSON.parse(localStorage.getItem("ravanai_auth") || "{}");
    return (auth?.access_token || auth?.accessToken || auth?.token || "").trim();
  } catch {
    return "";
  }
};

const api = axios.create({
  baseURL: config.BASE_URL,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

// Attach the login token to every request
api.interceptors.request.use((requestConfig) => {
  const token = getAccessToken();
  if (!token) throw new Error("Access token missing. Please login again.");
  requestConfig.headers.Authorization = `Bearer ${token}`;
  return requestConfig;
});

const getErrorMessage = (error, fallback) => {
  const detail = error?.response?.data?.detail ?? error?.response?.data?.message;
  if (Array.isArray(detail)) {
    return detail.map((item) => item?.msg || item?.message || String(item)).filter(Boolean).join(", ");
  }
  return detail || error?.message || fallback;
};

// Every call returns response.data and throws an Error with a readable message
const request = async (call, fallback) => {
  try {
    const { data } = await call();
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, fallback));
  }
};

export const inboundApi = {
  // /api/v1/inbound/routes
  list: (params = {}) =>
    request(() => api.get("/inbound/routes", { params }), "Failed to load inbound routes."),
  get: (routeId) =>
    request(() => api.get(`/inbound/routes/${routeId}`), "Failed to load inbound route."),
  create: (payload) =>
    request(() => api.post("/inbound/routes", payload), "Failed to create inbound route."),
  update: (routeId, payload) =>
    request(() => api.patch(`/inbound/routes/${routeId}`, payload), "Failed to update inbound route."),
  remove: (routeId) =>
    request(() => api.delete(`/inbound/routes/${routeId}`), "Failed to delete inbound route."),

  // lookups used by the create form / route table
  listPhoneNumbers: (params = {}) =>
    request(() => api.get("/phone-numbers", { params }), "Failed to load phone numbers."),
  listAgents: (params = {}) =>
    request(() => api.get("/agents", { params }), "Failed to load agents."),
};

const formatTimeForApi = (hour, minute) =>
  hour === "" || minute === "" ? null : `${hour}:${minute}:00`;

const formatDateTimeForDisplay = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
};

// ============================================================
// MAIN PAGE
// ============================================================

export default function InboundCalls() {
  const [form, setForm] = useState({
    phoneNumber: "",
    agent: "",
    timezone: "",
    maxConcurrent: 1,
    budget: "",
    startDate: "",
    endDate: "",
    windowStartHour: "",
    windowStartMin: "",
    windowEndHour: "",
    windowEndMin: "",
    activeDays: [],
  });

  const [routes, setRoutes] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [errors, setErrors] = useState({});
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loadingRoutes, setLoadingRoutes] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [viewRouteId, setViewRouteId] = useState(null);
  const [editRouteId, setEditRouteId] = useState(null);
  const [deleteRouteId, setDeleteRouteId] = useState(null);

  const loadInboundData = useCallback(async () => {
    setLoadingRoutes(true);
    setApiError("");
    try {
      const [routesData, phoneData, agentsData] = await Promise.all([
        inboundApi.list(),
        inboundApi.listPhoneNumbers({ is_active: true, limit: 200, offset: 0 }),
        inboundApi.listAgents(),
      ]);

      const routeItems = routesData?.items || [];
      const phoneItems = phoneData?.items || [];
      const agentItems = agentsData?.items || [];

      setPhoneNumbers(phoneItems);
      setAgents(agentItems);

      const phoneById = new Map(phoneItems.map((item) => [item.id, item]));
      const agentById = new Map(agentItems.map((item) => [item.id, item]));

      setRoutes(routeItems.map((route) => ({
        ...route,
        phoneNumber: phoneById.get(route.phone_number_id)?.number || route.phone_number_id || "-",
        agent: agentById.get(route.agent_id)?.name || route.agent_id || "-",
        maxConcurrent: route.max_concurrent_calls,
        activeDays: Array.isArray(route.active_days) ? route.active_days : [],
        createdAt: formatDateTimeForDisplay(route.created_at),
      })));
    } catch (error) {
      setApiError(getErrorMessage(error, "Failed to load inbound routes."));
    } finally {
      setLoadingRoutes(false);
    }
  }, []);

  useEffect(() => {
    loadInboundData();
  }, [loadInboundData]);

  const updateField = (key, value) => {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const toggleDay = (key) => {
    setForm((p) => ({
      ...p,
      activeDays: p.activeDays.includes(key)
        ? p.activeDays.filter((d) => d !== key)
        : [...p.activeDays, key],
    }));
  };

  const validate = () => {
    const e = {};
    if (!form.phoneNumber) e.phoneNumber = "Phone number is required";
    if (!form.agent) e.agent = "Please select an agent";
    if (!form.timezone) e.timezone = "Timezone is required";
    if (form.maxConcurrent < 1 || form.maxConcurrent > 5)
      e.maxConcurrent = "Must be between 1 and 5";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    const payload = {
      phone_number_id: form.phoneNumber,
      agent_id: form.agent,
      timezone: form.timezone,
      max_concurrent_calls: Number(form.maxConcurrent),
      budget_credits: form.budget.trim() === "" ? null : Number(form.budget),
      start_date: form.startDate || null,
      end_date: form.endDate || null,
      call_window_start: formatTimeForApi(form.windowStartHour, form.windowStartMin),
      call_window_end: formatTimeForApi(form.windowEndHour, form.windowEndMin),
      active_days: form.activeDays,
      is_active: true,
    };

    if (payload.budget_credits !== null && (!Number.isFinite(payload.budget_credits) || payload.budget_credits < 0)) {
      setApiError("Budget must be a valid non-negative number.");
      return;
    }

    setSubmitting(true);
    setApiError("");
    try {
      await inboundApi.create(payload);
      await loadInboundData();
      handleReset();
    } catch (error) {
      setApiError(getErrorMessage(error, "Failed to create inbound route."));
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm({
      phoneNumber: "",
      agent: "",
      timezone: "",
      maxConcurrent: 1,
      budget: "",
      startDate: "",
      endDate: "",
      windowStartHour: "",
      windowStartMin: "",
      windowEndHour: "",
      windowEndMin: "",
      activeDays: [],
    });
    setErrors({});
  };

  const filteredRoutes = routes.filter((r) =>
    (r.phoneNumber || "").toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
      <main className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-7">
        {/* ============ INBOUND CAMPAIGN CARD ============ */}
        <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">
          {/* Card header */}
          <div className="flex items-center gap-3 border-b border-black/[0.06] px-5 py-4 dark:border-white/[0.06]">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-500/25 bg-cyan-500/[0.06]">
              <PhoneCall
                size={16}
                className="text-cyan-600 dark:text-cyan-400"
              />
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
                Inbound Campaign
              </h2>
              <p className="mt-0.5 text-[12px] text-zinc-500">
                Link a phone number to an AI agent — all calls to that number will be handled automatically.
              </p>
            </div>
          </div>

          {/* Form body */}
          <form onSubmit={handleSubmit} className="space-y-6 p-5">
            {/* Incoming Calls To + Routed To Agent */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Incoming */}
              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  Incoming Calls To
                </label>
                <div className="relative">
                  <Phone
                    size={14}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                  />
                  <select
                    value={form.phoneNumber}
                    onChange={(e) =>
                      updateField("phoneNumber", e.target.value)
                    }
                    className="h-11 w-full appearance-none rounded-lg border border-black/[0.08] bg-white pl-9 pr-9 text-[13px] text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:focus:border-cyan-400"
                  >
                    <option value="">Select phone number</option>
                    {phoneNumbers.map((phone) => (
                      <option key={phone.id} value={phone.id}>
                        {phone.number}{phone.label ? ` - ${phone.label}` : ""}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                  />
                </div>
                <p className="mt-2 flex items-center gap-1.5 text-[11px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  <span className="text-zinc-500">
                    {phoneNumbers.length === 0 ? (
                      <>No phone numbers —{" "}<a href="#" className="text-cyan-600 hover:underline dark:text-cyan-400">buy one first</a></>
                    ) : (
                      `${phoneNumbers.length} active phone number${phoneNumbers.length === 1 ? "" : "s"} available`
                    )}
                  </span>
                </p>
              </div>

              {/* Agent */}
              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  Routed To Agent
                </label>
                <div className="relative">
                  <User
                    size={14}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                  />
                  <select
                    value={form.agent}
                    onChange={(e) => updateField("agent", e.target.value)}
                    className="h-11 w-full appearance-none rounded-lg border border-black/[0.08] bg-white pl-9 pr-9 text-[13px] text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:focus:border-cyan-400"
                  >
                    <option value="">Select agent</option>
                    {agents.map((agent) => (
                      <option key={agent.id} value={agent.id}>
                        {agent.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                  />
                </div>
                {errors.agent && (
                  <p className="mt-1.5 text-[11px] text-red-500">
                    {errors.agent}
                  </p>
                )}
              </div>
            </div>

            {/* ============ SCHEDULE & RULES ============ */}
            <div className="rounded-xl border border-black/[0.06] p-5 dark:border-white/[0.06]">
              {/* Sub-header */}
              <div className="mb-5 flex items-center gap-2">
                <Calendar size={14} className="text-zinc-500" />
                <h3 className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
                  Schedule &amp; Rules
                </h3>
              </div>

              {/* Row 1: Timezone + Max Concurrent */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                    Timezone <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock
                      size={14}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                    />
                    <select
                      value={form.timezone}
                      onChange={(e) =>
                        updateField("timezone", e.target.value)
                      }
                      className="h-11 w-full appearance-none rounded-lg border border-black/[0.08] bg-white pl-9 pr-9 text-[13px] text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:focus:border-cyan-400"
                    >
                      <option value="">Select timezone</option>
                      {TIMEZONES.map((tz) => (
                        <option key={tz} value={tz}>
                          {tz}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                    />
                  </div>
                  {errors.timezone && (
                    <p className="mt-1.5 text-[11px] text-red-500">
                      {errors.timezone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                    Max Concurrent Calls
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={form.maxConcurrent}
                    onChange={(e) =>
                      updateField(
                        "maxConcurrent",
                        parseInt(e.target.value || "0", 10)
                      )
                    }
                    className="h-11 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:focus:border-cyan-400"
                  />
                  <p className="mt-1.5 text-[11px] text-zinc-500">
                    Range: 1 – 5
                  </p>
                  {errors.maxConcurrent && (
                    <p className="mt-1 text-[11px] text-red-500">
                      {errors.maxConcurrent}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Budget + Start Date */}
              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                    Budget (Credits)
                  </label>
                  <input
                    type="text"
                    value={form.budget}
                    onChange={(e) => updateField("budget", e.target.value)}
                    placeholder="Unlimited"
                    className="h-11 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-cyan-400"
                  />
                  <p className="mt-1.5 text-[11px] text-zinc-500">
                    New calls are rejected once spend reaches the cap. Blank = unlimited.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => updateField("startDate", e.target.value)}
                    className="h-11 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Row 3: End Date + Window Start */}
              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => updateField("endDate", e.target.value)}
                    className="h-11 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                    Call Window Start
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <select
                        value={form.windowStartHour}
                        onChange={(e) =>
                          updateField("windowStartHour", e.target.value)
                        }
                        className="h-11 w-full appearance-none rounded-lg border border-black/[0.08] bg-white px-3 pr-9 text-[13px] text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:focus:border-cyan-400"
                      >
                        <option value="">Hour</option>
                        {HOURS.map((h) => (
                          <option key={h} value={h}>
                            {h}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={13}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                      />
                    </div>
                    <span className="text-zinc-400">:</span>
                    <div className="relative flex-1">
                      <select
                        value={form.windowStartMin}
                        onChange={(e) =>
                          updateField("windowStartMin", e.target.value)
                        }
                        className="h-11 w-full appearance-none rounded-lg border border-black/[0.08] bg-white px-3 pr-9 text-[13px] text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:focus:border-cyan-400"
                      >
                        <option value="">Min</option>
                        {MINUTES.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={13}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 4: Window End */}
              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                    Call Window End
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <select
                        value={form.windowEndHour}
                        onChange={(e) =>
                          updateField("windowEndHour", e.target.value)
                        }
                        className="h-11 w-full appearance-none rounded-lg border border-black/[0.08] bg-white px-3 pr-9 text-[13px] text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:focus:border-cyan-400"
                      >
                        <option value="">Hour</option>
                        {HOURS.map((h) => (
                          <option key={h} value={h}>
                            {h}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={13}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                      />
                    </div>
                    <span className="text-zinc-400">:</span>
                    <div className="relative flex-1">
                      <select
                        value={form.windowEndMin}
                        onChange={(e) =>
                          updateField("windowEndMin", e.target.value)
                        }
                        className="h-11 w-full appearance-none rounded-lg border border-black/[0.08] bg-white px-3 pr-9 text-[13px] text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:focus:border-cyan-400"
                      >
                        <option value="">Min</option>
                        {MINUTES.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={13}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 5: Active Days */}
              <div className="mt-5">
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  Active Days
                </label>
                <div className="flex flex-wrap gap-2">
                  {DAYS.map((d) => {
                    const active = form.activeDays.includes(d.key);
                    return (
                      <button
                        key={d.key}
                        type="button"
                        onClick={() => toggleDay(d.key)}
                        className={`
                          rounded-md border px-3 py-1.5 text-[12px] font-medium transition
                          ${
                            active
                              ? "border-cyan-500/50 bg-cyan-500/[0.10] text-cyan-600 dark:text-cyan-400"
                              : "border-black/[0.08] bg-white text-zinc-600 hover:border-cyan-500/30 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-400"
                          }
                        `}
                      >
                        {d.label}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-[11px] text-zinc-500">
                  Leave call window blank to allow calls at any time.
                </p>
              </div>
            </div>

            {/* ============ FOOTER ============ */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.06] pt-5 dark:border-white/[0.06]">
              <div className="flex items-center gap-2 text-[12px] text-zinc-500">
                <Shield size={14} className="text-cyan-500 dark:text-cyan-400" />
                Route becomes live immediately after creation.
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex h-10 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-4 text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
                >
                  <RotateCcw size={14} />
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex h-10 items-center gap-2 rounded-lg bg-cyan-500 px-4 text-[13px] font-semibold text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-cyan-400 dark:text-slate-950"
                >
                  <Plus size={15} strokeWidth={2.8} />
                  {submitting ? "Creating..." : "Create Route"}
                </button>
              </div>
            </div>
          </form>
        </section>

        {/* ============ ROUTING RULES ============ */}
        <section className="space-y-4">
          {apiError && (
            <div role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] text-red-600 dark:text-red-400">
              {apiError}
            </div>
          )}
          {/* Header row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h2 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
                Routing Rules
              </h2>
              <span className="rounded bg-black/[0.06] px-2 py-0.5 text-[11px] font-semibold text-zinc-600 dark:bg-white/[0.08] dark:text-zinc-400">
                {routes.length}
              </span>
            </div>

            <div className="flex h-10 w-full max-w-xs items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-sm text-zinc-500 dark:border-white/[0.08] dark:bg-[#101012]">
              <Search size={14} />
              <input
                type="text"
                placeholder="Filter by number..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="min-w-0 flex-1 bg-transparent text-[13px] text-zinc-800 outline-none placeholder:text-zinc-500 dark:text-zinc-200"
              />
            </div>
          </div>

          {/* Empty state */}
          {loadingRoutes ? (
            <div className="rounded-2xl border border-black/[0.06] bg-white py-12 text-center text-[13px] text-zinc-500 dark:border-white/[0.08] dark:bg-[#101012]">
              Loading routing rules...
            </div>
          ) : routes.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-black/[0.10] bg-white py-20 text-center dark:border-white/[0.08] dark:bg-[#101012]">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-black/[0.06] bg-zinc-50 dark:border-white/[0.08] dark:bg-white/[0.02]">
                <Phone
                  size={26}
                  className="text-zinc-400 dark:text-zinc-500"
                />
              </div>

              <h3 className="mt-5 text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
                No routes yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-zinc-500">
                Create a routing rule above to start directing calls from a
                phone number to an AI agent.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">
              <table className="w-full">
                <thead className="border-b border-black/[0.06] dark:border-white/[0.06]">
                  <tr>
                    <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      Phone Number
                    </th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      Agent
                    </th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      Timezone
                    </th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      Max
                    </th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      Active Days
                    </th>
                    <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      Created
                    </th>
                    <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRoutes.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b border-black/[0.04] last:border-0 dark:border-white/[0.04]"
                    >
                      <td className="px-5 py-4 text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
                        {r.phoneNumber}
                      </td>
                      <td className="px-3 py-4 text-[13px] text-zinc-700 dark:text-zinc-300">
                        {r.agent || "-"}
                      </td>
                      <td className="px-3 py-4 text-[13px] text-zinc-700 dark:text-zinc-300">
                        {r.timezone}
                      </td>
                      <td className="px-3 py-4 text-[13px] text-zinc-700 dark:text-zinc-300">
                        {r.maxConcurrent}
                      </td>
                      <td className="px-3 py-4 text-[12px] text-zinc-500">
                        {r.activeDays?.length > 0
                          ? r.activeDays.join(", ")
                          : "All days"}
                      </td>
                      <td className="px-5 py-4 text-right text-[12px] text-zinc-500">
                        {r.createdAt}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setViewRouteId(r.id)}
                            title="View"
                            aria-label="View route"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-zinc-500 transition hover:bg-black/[0.03] hover:text-zinc-800 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:hover:bg-white/[0.04] dark:hover:text-zinc-200"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditRouteId(r.id)}
                            title="Edit"
                            aria-label="Edit route"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-zinc-500 transition hover:bg-black/[0.03] hover:text-zinc-800 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:hover:bg-white/[0.04] dark:hover:text-zinc-200"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteRouteId(r.id)}
                            title="Delete"
                            aria-label="Delete route"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/[0.05] text-red-500 transition hover:bg-red-500/[0.12]"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* ============ VIEW / EDIT / DELETE ROUTE ============ */}
      {viewRouteId && (
        <ViewInboundRoute
          inboundRouteId={viewRouteId}
          onClose={() => setViewRouteId(null)}
        />
      )}

      {editRouteId && (
        <EditInboundRoute
          inboundRouteId={editRouteId}
          onClose={() => setEditRouteId(null)}
          onUpdated={() => loadInboundData()}
        />
      )}

      {deleteRouteId && (
        <DeleteInboundRoute
          inboundRouteId={deleteRouteId}
          onClose={() => setDeleteRouteId(null)}
          onDeleted={() => loadInboundData()}
        />
      )}
    </div>
  );
}