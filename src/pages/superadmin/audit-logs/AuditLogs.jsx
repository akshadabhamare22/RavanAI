
// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import {
//   Activity,
//   Building2,
//   Search,
//   RefreshCw,
//   Eye,
//   Filter,
//   ShieldCheck,
//   Clock,
//   AlertCircle,
//   FileText,
//   X,
// } from "lucide-react";

// import Config from "../../../config/Config";
// import ViewAuditLog from "./ViewAuditLog";

// const PAGE_SIZE = 10;

// const getToken = () => {
//   try {
//     const auth = JSON.parse(localStorage.getItem("ravanai_auth") || "{}");

//     return (
//       localStorage.getItem("access_token") ||
//       auth.access_token ||
//       auth.token ||
//       ""
//     );
//   } catch {
//     return localStorage.getItem("access_token") || "";
//   }
// };

// const getErrorMessage = (error) => {
//   return (
//     error?.response?.data?.detail ||
//     error?.response?.data?.message ||
//     error?.message ||
//     "Something went wrong. Please try again."
//   );
// };

// const formatDate = (date) => {
//   if (!date) return "—";

//   const parsedDate = new Date(date);

//   if (Number.isNaN(parsedDate.getTime())) return "—";

//   return parsedDate.toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   });
// };

// const getActionColor = (action = "") => {
//   const value = action.toLowerCase();

//   if (
//     value.includes("delete") ||
//     value.includes("suspend") ||
//     value.includes("deactivate")
//   ) {
//     return "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400";
//   }

//   if (
//     value.includes("create") ||
//     value.includes("activate") ||
//     value.includes("grant")
//   ) {
//     return "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400";
//   }

//   if (
//     value.includes("update") ||
//     value.includes("edit") ||
//     value.includes("adjust")
//   ) {
//     return "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";
//   }

//   return "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400";
// };

// const AuditLogs = () => {
//   const [logs, setLogs] = useState([]);
//   const [organizations, setOrganizations] = useState([]);

//   const [selectedOrganization, setSelectedOrganization] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [actionFilter, setActionFilter] = useState("all");

//   const [selectedLog, setSelectedLog] = useState(null);

//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState("");

//   const [currentPage, setCurrentPage] = useState(1);

//   const token = getToken();

//   const fetchOrganizations = useCallback(async () => {
//     if (!token) {
//       throw new Error("Authentication token not found. Please log in again.");
//     }

//     const response = await fetch(
//       `${Config.BASE_URL}/admin/organizations?limit=200&offset=0`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       const data = await response.json().catch(() => ({}));
//       throw new Error(
//         data.detail || data.message || "Failed to fetch organizations."
//       );
//     }

//     const data = await response.json();

//     setOrganizations(Array.isArray(data.items) ? data.items : []);
//   }, [token]);

//   const fetchAuditLogs = useCallback(async () => {
//     if (!token) {
//       throw new Error("Authentication token not found. Please log in again.");
//     }

//     const params = new URLSearchParams();
//     params.set("limit", "500");

//     if (selectedOrganization) {
//       params.set("client_id", selectedOrganization);
//     }

//     const response = await fetch(
//       `${Config.BASE_URL}/admin/audit-logs?${params.toString()}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       const data = await response.json().catch(() => ({}));
//       throw new Error(
//         data.detail || data.message || "Failed to fetch audit logs."
//       );
//     }

//     const data = await response.json();

//     if (!Array.isArray(data)) {
//       throw new Error("Unexpected audit logs response from the server.");
//     }

//     setLogs(data);
//   }, [token, selectedOrganization]);

//   const loadData = useCallback(
//     async (showRefresh = false) => {
//       try {
//         if (showRefresh) {
//           setRefreshing(true);
//         } else {
//           setLoading(true);
//         }

//         setError("");

//         await Promise.all([fetchOrganizations(), fetchAuditLogs()]);
//       } catch (err) {
//         setError(getErrorMessage(err));
//         setLogs([]);
//       } finally {
//         setLoading(false);
//         setRefreshing(false);
//       }
//     },
//     [fetchOrganizations, fetchAuditLogs]
//   );

//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, actionFilter, selectedOrganization]);

//   const actionOptions = useMemo(() => {
//     const uniqueActions = [
//       ...new Set(logs.map((log) => log.action).filter(Boolean)),
//     ];

//     return uniqueActions.sort((a, b) => a.localeCompare(b));
//   }, [logs]);

//   const filteredLogs = useMemo(() => {
//     const search = searchTerm.trim().toLowerCase();

//     return logs.filter((log) => {
//       const matchesAction =
//         actionFilter === "all" || log.action === actionFilter;

//       const searchableText = [
//         log.id,
//         log.client_id,
//         log.actor_id,
//         log.action,
//         log.target_type,
//         log.target_id,
//         JSON.stringify(log.details ?? {}),
//       ]
//         .filter(Boolean)
//         .join(" ")
//         .toLowerCase();

//       const matchesSearch =
//         !search || searchableText.includes(search);

//       return matchesAction && matchesSearch;
//     });
//   }, [logs, searchTerm, actionFilter]);

//   const totalPages = Math.max(
//     1,
//     Math.ceil(filteredLogs.length / PAGE_SIZE)
//   );

//   const paginatedLogs = useMemo(() => {
//     const start = (currentPage - 1) * PAGE_SIZE;

//     return filteredLogs.slice(start, start + PAGE_SIZE);
//   }, [filteredLogs, currentPage]);

//   const handleRefresh = () => {
//     loadData(true);
//   };

//   const cardClass =
//     "rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-[#111315]";

//   const inputClass =
//     "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#275982] focus:ring-2 focus:ring-[#275982]/20 dark:border-zinc-700 dark:bg-[#111315] dark:text-zinc-100";

//   return (
//     <div className="min-h-screen bg-slate-50 p-4 text-slate-900 transition-colors duration-300 sm:p-6 dark:bg-[#08090B] dark:text-zinc-100">
//       <div className="mx-auto max-w-[1600px] space-y-6">

//         {/* Header */}
//         <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//           <div>
//             <div className="mb-2 flex items-center gap-2">
//               <div className="rounded-lg bg-[#275982]/10 p-2 text-[#275982] dark:bg-[#275982]/20 dark:text-blue-300">
//                 <ShieldCheck size={22} />
//               </div>

//               <span className="text-sm font-medium text-[#275982] dark:text-blue-300">
//                 Platform Management
//               </span>
//             </div>

//             <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
//               Audit Logs
//             </h1>

//             <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
//               Monitor and review platform activities and administrative actions.
//             </p>
//           </div>

//           <button
//             onClick={handleRefresh}
//             disabled={loading || refreshing}
//             className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#275982] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#1f486b] disabled:cursor-not-allowed disabled:opacity-60"
//           >
//             <RefreshCw
//               size={16}
//               className={refreshing ? "animate-spin" : ""}
//             />
//             Refresh
//           </button>
//         </div>

//         {/* Error */}
//         {error && (
//           <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
//             <AlertCircle size={19} className="mt-0.5 shrink-0" />
//             <div className="flex-1">{error}</div>
//             <button onClick={() => setError("")}>
//               <X size={17} />
//             </button>
//           </div>
//         )}

//         {/* Summary cards */}
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//           <div className={cardClass}>
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-zinc-400">
//                   Records returned
//                 </p>

//                 <h2 className="mt-2 text-3xl font-bold tabular-nums">
//                   {loading ? "—" : logs.length.toLocaleString("en-IN")}
//                 </h2>

//                 <p className="mt-1 text-xs text-slate-500 dark:text-zinc-500">
//                   Maximum 500 records requested from the API
//                 </p>
//               </div>

//               <div className="rounded-xl bg-[#275982]/10 p-3 text-[#275982] dark:bg-[#275982]/20 dark:text-blue-300">
//                 <Activity size={24} />
//               </div>
//             </div>
//           </div>

//           <div className={cardClass}>
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-slate-500 dark:text-zinc-400">
//                   Matching records
//                 </p>

//                 <h2 className="mt-2 text-3xl font-bold tabular-nums">
//                   {loading ? "—" : filteredLogs.length.toLocaleString("en-IN")}
//                 </h2>

//                 <p className="mt-1 text-xs text-slate-500 dark:text-zinc-500">
//                   Based on current search and action filters
//                 </p>
//               </div>

//               <div className="rounded-xl bg-purple-100 p-3 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
//                 <FileText size={24} />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className={cardClass}>
//           <div className="mb-4 flex items-center gap-2">
//             <Filter size={18} className="text-[#275982]" />
//             <h2 className="font-semibold">Filters</h2>
//           </div>

//           <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//             <div>
//               <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-zinc-400">
//                 Search logs
//               </label>

//               <div className="relative">
//                 <Search
//                   size={17}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//                 />

//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Search action, actor, target..."
//                   className={`${inputClass} pl-10`}
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-zinc-400">
//                 Organization
//               </label>

//               <div className="relative">
//                 <Building2
//                   size={17}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//                 />

//                 <select
//                   value={selectedOrganization}
//                   onChange={(e) => setSelectedOrganization(e.target.value)}
//                   className={`${inputClass} pl-10`}
//                 >
//                   <option value="">All organizations</option>

//                   {organizations.map((organization) => (
//                     <option
//                       key={organization.id}
//                       value={organization.id}
//                     >
//                       {organization.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div>
//               <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-zinc-400">
//                 Action
//               </label>

//               <select
//                 value={actionFilter}
//                 onChange={(e) => setActionFilter(e.target.value)}
//                 className={inputClass}
//               >
//                 <option value="all">All actions</option>

//                 {actionOptions.map((action) => (
//                   <option key={action} value={action}>
//                     {action}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Audit table */}
//         <div className={`${cardClass} !p-0 overflow-hidden`}>
//           <div className="flex flex-col justify-between gap-2 border-b border-slate-200 p-5 sm:flex-row sm:items-center dark:border-zinc-800">
//             <div>
//               <h2 className="font-semibold">Activity History</h2>
//               <p className="mt-1 text-xs text-slate-500 dark:text-zinc-500">
//                 Latest records returned by the audit logs endpoint
//               </p>
//             </div>

//             <span className="text-xs text-slate-500 dark:text-zinc-400">
//               {filteredLogs.length} matching records
//             </span>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full min-w-[950px] text-left text-sm">
//               <thead className="bg-slate-100 text-xs uppercase tracking-wider text-slate-500 dark:bg-[#191C1F] dark:text-zinc-400">
//                 <tr>
//                   <th className="px-5 py-4 font-semibold">Action</th>
//                   <th className="px-5 py-4 font-semibold">Target</th>
//                   <th className="px-5 py-4 font-semibold">Actor ID</th>
//                   <th className="px-5 py-4 font-semibold">Organization ID</th>
//                   <th className="px-5 py-4 font-semibold">Date & Time</th>
//                   <th className="px-5 py-4 text-right font-semibold">Details</th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
//                 {loading ? (
//                   <tr>
//                     <td colSpan="6" className="px-5 py-14 text-center">
//                       <RefreshCw
//                         size={22}
//                         className="mx-auto animate-spin text-[#275982]"
//                       />
//                       <p className="mt-3 text-sm text-slate-500 dark:text-zinc-400">
//                         Loading audit logs...
//                       </p>
//                     </td>
//                   </tr>
//                 ) : paginatedLogs.length === 0 ? (
//                   <tr>
//                     <td colSpan="6" className="px-5 py-14 text-center">
//                       <FileText
//                         size={30}
//                         className="mx-auto text-slate-300 dark:text-zinc-600"
//                       />
//                       <p className="mt-3 font-medium">
//                         No audit logs found
//                       </p>
//                       <p className="mt-1 text-xs text-slate-500 dark:text-zinc-500">
//                         Try changing your filters or refresh the records.
//                       </p>
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedLogs.map((log) => (
//                     <tr
//                       key={log.id}
//                       className="transition-colors hover:bg-slate-50 dark:hover:bg-[#191C1F]"
//                     >
//                       <td className="px-5 py-4">
//                         <span
//                           className={`inline-flex max-w-[190px] truncate rounded-full px-3 py-1 text-xs font-semibold ${getActionColor(
//                             log.action
//                           )}`}
//                         >
//                           {log.action || "Unknown"}
//                         </span>
//                       </td>

//                       <td className="px-5 py-4">
//                         <p className="font-medium">
//                           {log.target_type || "—"}
//                         </p>
//                         <p className="mt-1 max-w-[180px] truncate text-xs text-slate-500 dark:text-zinc-500">
//                           {log.target_id || "No target ID"}
//                         </p>
//                       </td>

//                       <td className="px-5 py-4">
//                         <span className="font-mono text-xs text-slate-600 dark:text-zinc-400">
//                           {log.actor_id || "—"}
//                         </span>
//                       </td>

//                       <td className="px-5 py-4">
//                         <span className="font-mono text-xs text-slate-600 dark:text-zinc-400">
//                           {log.client_id || "Platform"}
//                         </span>
//                       </td>

//                       <td className="px-5 py-4">
//                         <div className="flex items-center gap-2 whitespace-nowrap text-slate-600 dark:text-zinc-400">
//                           <Clock size={14} />
//                           {formatDate(log.created_at)}
//                         </div>
//                       </td>

//                       <td className="px-5 py-4 text-right">
//                         <button
//                           onClick={() => setSelectedLog(log)}
//                           className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-[#275982] transition hover:bg-[#275982]/10 dark:border-zinc-700 dark:text-blue-300 dark:hover:bg-[#275982]/20"
//                         >
//                           <Eye size={14} />
//                           View
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Client-side pagination */}
//           {!loading && filteredLogs.length > 0 && (
//             <div className="flex flex-col justify-between gap-3 border-t border-slate-200 p-4 sm:flex-row sm:items-center dark:border-zinc-800">
//               <p className="text-xs text-slate-500 dark:text-zinc-400">
//                 Showing{" "}
//                 {(currentPage - 1) * PAGE_SIZE + 1}–
//                 {Math.min(currentPage * PAGE_SIZE, filteredLogs.length)} of{" "}
//                 {filteredLogs.length} loaded records
//               </p>

//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() =>
//                     setCurrentPage((page) => Math.max(1, page - 1))
//                   }
//                   disabled={currentPage === 1}
//                   className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700"
//                 >
//                   Previous
//                 </button>

//                 <span className="px-2 text-xs text-slate-500 dark:text-zinc-400">
//                   Page {currentPage} of {totalPages}
//                 </span>

//                 <button
//                   onClick={() =>
//                     setCurrentPage((page) =>
//                       Math.min(totalPages, page + 1)
//                     )
//                   }
//                   disabled={currentPage >= totalPages}
//                   className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Log details */}
//       {selectedLog && (
//         <ViewAuditLog
//           log={selectedLog}
//           onClose={() => setSelectedLog(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default AuditLogs;


import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Activity,
  Building2,
  Search,
  RefreshCw,
  Eye,
  Filter,
  ShieldCheck,
  Clock,
  AlertCircle,
  FileText,
  X,
} from "lucide-react";

import Config from "../../../config/Config";
import ViewAuditLog from "./ViewAuditLog";

const PAGE_SIZE = 10;

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const getToken = () => {
  try {
    const auth = JSON.parse(
      localStorage.getItem("ravanai_auth") || "{}"
    );

    return (
      localStorage.getItem("access_token") ||
      auth.access_token ||
      auth.token ||
      ""
    );
  } catch {
    return localStorage.getItem("access_token") || "";
  }
};

const parseError = (detail) => {
  if (typeof detail === "string") return detail;

  if (Array.isArray(detail)) {
    return detail
      .map((item) =>
        typeof item === "string"
          ? item
          : item?.msg || JSON.stringify(item)
      )
      .join(", ");
  }

  if (detail && typeof detail === "object") {
    return detail.message || JSON.stringify(detail);
  }

  return "";
};

const getErrorMessage = (error) => {
  return (
    parseError(error?.response?.data?.detail) ||
    parseError(error?.response?.data?.message) ||
    error?.message ||
    "Something went wrong. Please try again."
  );
};

const getFetchError = async (response, fallbackMessage) => {
  const data = await response.json().catch(() => ({}));

  return (
    parseError(data?.detail) ||
    parseError(data?.message) ||
    `${fallbackMessage} (${response.status})`
  );
};

const formatDate = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "—";

  return parsedDate.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const getActionColor = (action = "") => {
  const value = String(action).toLowerCase();

  if (
    value.includes("delete") ||
    value.includes("suspend") ||
    value.includes("deactivate")
  ) {
    return "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400";
  }

  if (
    value.includes("create") ||
    value.includes("activate") ||
    value.includes("grant")
  ) {
    return "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400";
  }

  if (
    value.includes("update") ||
    value.includes("edit") ||
    value.includes("adjust")
  ) {
    return "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";
  }

  return "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400";
};

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  const [selectedOrganization, setSelectedOrganization] =
    useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("all");

  const [selectedLog, setSelectedLog] = useState(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Separate errors so organization fetch cannot clear log errors
  const [logError, setLogError] = useState("");
  const [organizationError, setOrganizationError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);

  const token = getToken();

  // ─────────────────────────────────────────────
  // Fetch organizations - only once
  // ─────────────────────────────────────────────

  useEffect(() => {
    const controller = new AbortController();

    const fetchOrganizations = async () => {
      if (!token) {
        setOrganizationError(
          "Authentication token not found. Please log in again."
        );
        return;
      }

      try {
        setOrganizationError("");

        const response = await fetch(
          `${Config.BASE_URL}/admin/organizations?limit=200&offset=0`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(
            await getFetchError(
              response,
              "Failed to fetch organizations"
            )
          );
        }

        const data = await response.json();

        if (!Array.isArray(data.items)) {
          throw new Error(
            "Unexpected organizations response from server."
          );
        }

        setOrganizations(data.items);
      } catch (err) {
        if (err.name === "AbortError") return;

        setOrganizationError(getErrorMessage(err));
      }
    };

    fetchOrganizations();

    return () => controller.abort();
  }, [token]);

  // ─────────────────────────────────────────────
  // Fetch audit logs
  // Runs on organization change or refresh
  // ─────────────────────────────────────────────

  useEffect(() => {
    const controller = new AbortController();

    const fetchAuditLogs = async () => {
      if (!token) {
        setLogs([]);
        setLogError(
          "Authentication token not found. Please log in again."
        );
        setLoading(false);
        setRefreshing(false);
        return;
      }

      try {
        setLogError("");
        setLoading(true);

        const params = new URLSearchParams();
        params.set("limit", "500");

        if (selectedOrganization) {
          params.set("client_id", selectedOrganization);
        }

        const response = await fetch(
          `${Config.BASE_URL}/admin/audit-logs?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(
            await getFetchError(
              response,
              "Failed to fetch audit logs"
            )
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error(
            "Unexpected audit logs response from the server."
          );
        }

        setLogs(data);
      } catch (err) {
        if (err.name === "AbortError") return;

        setLogError(getErrorMessage(err));
        setLogs([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    };

    fetchAuditLogs();

    return () => controller.abort();
  }, [token, selectedOrganization, refreshKey]);

  // ─────────────────────────────────────────────
  // Reset pagination when filters change
  // ─────────────────────────────────────────────

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, actionFilter, selectedOrganization]);

  // ─────────────────────────────────────────────
  // Action dropdown options
  // ─────────────────────────────────────────────

  const actionOptions = useMemo(() => {
    const uniqueActions = [
      ...new Set(logs.map((log) => log.action).filter(Boolean)),
    ];

    return uniqueActions.sort((a, b) =>
      String(a).localeCompare(String(b))
    );
  }, [logs]);

  // ─────────────────────────────────────────────
  // Search and filter
  // ─────────────────────────────────────────────

  const filteredLogs = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return logs.filter((log) => {
      const matchesAction =
        actionFilter === "all" || log.action === actionFilter;

      const searchableText = [
        log.id,
        log.client_id,
        log.actor_id,
        log.action,
        log.target_type,
        log.target_id,
        JSON.stringify(log.details ?? {}),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !search || searchableText.includes(search);

      return matchesAction && matchesSearch;
    });
  }, [logs, searchTerm, actionFilter]);

  // ─────────────────────────────────────────────
  // Pagination
  // ─────────────────────────────────────────────

  const totalPages = Math.max(
    1,
    Math.ceil(filteredLogs.length / PAGE_SIZE)
  );

  // Ensure current page never exceeds total pages
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;

    return filteredLogs.slice(start, start + PAGE_SIZE);
  }, [filteredLogs, currentPage]);

  // ─────────────────────────────────────────────
  // Refresh audit logs only
  // ─────────────────────────────────────────────

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshKey((prev) => prev + 1);
  }, []);

  const dismissLogError = () => setLogError("");
  const dismissOrganizationError = () => setOrganizationError("");

  const cardClass =
    "rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-[#111315]";

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#275982] focus:ring-2 focus:ring-[#275982]/20 dark:border-zinc-700 dark:bg-[#111315] dark:text-zinc-100";

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-900 transition-colors duration-300 sm:p-6 dark:bg-[#08090B] dark:text-zinc-100">
      <div className="mx-auto max-w-[1600px] space-y-6">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="rounded-lg bg-[#275982]/10 p-2 text-[#275982] dark:bg-[#275982]/20 dark:text-blue-300">
                <ShieldCheck size={22} />
              </div>

              <span className="text-sm font-medium text-[#275982] dark:text-blue-300">
                Platform Management
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Audit Logs
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
              Monitor and review platform activities and administrative actions.
            </p>
          </div>

          <button
            onClick={handleRefresh}
            disabled={loading || refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#275982] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#1f486b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={refreshing ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        {/* Errors */}
        {logError && (
          <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
            <AlertCircle size={19} className="mt-0.5 shrink-0" />
            <div className="flex-1">{logError}</div>
            <button onClick={dismissLogError}>
              <X size={17} />
            </button>
          </div>
        )}

        {organizationError && (
          <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-400">
            <AlertCircle size={19} className="mt-0.5 shrink-0" />
            <div className="flex-1">
              Organization filter could not be loaded: {organizationError}
            </div>
            <button onClick={dismissOrganizationError}>
              <X size={17} />
            </button>
          </div>
        )}

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className={cardClass}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-zinc-400">
                  Records returned
                </p>

                <h2 className="mt-2 text-3xl font-bold tabular-nums">
                  {loading ? "—" : logs.length.toLocaleString("en-IN")}
                </h2>

                <p className="mt-1 text-xs text-slate-500 dark:text-zinc-500">
                  Maximum 500 records requested from the API
                </p>
              </div>

              <div className="rounded-xl bg-[#275982]/10 p-3 text-[#275982] dark:bg-[#275982]/20 dark:text-blue-300">
                <Activity size={24} />
              </div>
            </div>
          </div>

          <div className={cardClass}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-zinc-400">
                  Matching records
                </p>

                <h2 className="mt-2 text-3xl font-bold tabular-nums">
                  {loading ? "—" : filteredLogs.length.toLocaleString("en-IN")}
                </h2>

                <p className="mt-1 text-xs text-slate-500 dark:text-zinc-500">
                  Based on current search and action filters
                </p>
              </div>

              <div className="rounded-xl bg-purple-100 p-3 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                <FileText size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className={cardClass}>
          <div className="mb-4 flex items-center gap-2">
            <Filter size={18} className="text-[#275982]" />
            <h2 className="font-semibold">Filters</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Search */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-zinc-400">
                Search logs
              </label>

              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search action, actor, target..."
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            {/* Organization */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-zinc-400">
                Organization
              </label>

              <div className="relative">
                <Building2
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={selectedOrganization}
                  onChange={(e) => setSelectedOrganization(e.target.value)}
                  className={`${inputClass} pl-10`}
                >
                  <option value="">All organizations</option>

                  {organizations.map((organization) => (
                    <option
                      key={organization.id}
                      value={organization.id}
                    >
                      {organization.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-zinc-400">
                Action
              </label>

              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className={inputClass}
              >
                <option value="all">All actions</option>

                {actionOptions.map((action) => (
                  <option key={action} value={action}>
                    {action}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Audit table */}
        <div className={`${cardClass} !p-0 overflow-hidden`}>
          <div className="flex flex-col justify-between gap-2 border-b border-slate-200 p-5 sm:flex-row sm:items-center dark:border-zinc-800">
            <div>
              <h2 className="font-semibold">Activity History</h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-zinc-500">
                Latest records returned by the audit logs endpoint
              </p>
            </div>

            <span className="text-xs text-slate-500 dark:text-zinc-400">
              {filteredLogs.length} matching records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left text-sm">
              <thead className="bg-slate-100 text-xs uppercase tracking-wider text-slate-500 dark:bg-[#191C1F] dark:text-zinc-400">
                <tr>
                  <th className="px-5 py-4 font-semibold">Action</th>
                  <th className="px-5 py-4 font-semibold">Target</th>
                  <th className="px-5 py-4 font-semibold">Actor ID</th>
                  <th className="px-5 py-4 font-semibold">Organization ID</th>
                  <th className="px-5 py-4 font-semibold">Date & Time</th>
                  <th className="px-5 py-4 text-right font-semibold">Details</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-5 py-14 text-center">
                      <RefreshCw
                        size={22}
                        className="mx-auto animate-spin text-[#275982]"
                      />
                      <p className="mt-3 text-sm text-slate-500 dark:text-zinc-400">
                        Loading audit logs...
                      </p>
                    </td>
                  </tr>
                ) : paginatedLogs.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-5 py-14 text-center">
                      <FileText
                        size={30}
                        className="mx-auto text-slate-300 dark:text-zinc-600"
                      />
                      <p className="mt-3 font-medium">
                        No audit logs found
                      </p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-zinc-500">
                        Try changing your filters or refresh the records.
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedLogs.map((log) => (
                    <tr
                      key={log.id}
                      className="transition-colors hover:bg-slate-50 dark:hover:bg-[#191C1F]"
                    >
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex max-w-[190px] truncate rounded-full px-3 py-1 text-xs font-semibold ${getActionColor(
                            log.action
                          )}`}
                        >
                          {log.action || "Unknown"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-medium">
                          {log.target_type || "—"}
                        </p>
                        <p className="mt-1 max-w-[180px] truncate text-xs text-slate-500 dark:text-zinc-500">
                          {log.target_id || "No target ID"}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span className="font-mono text-xs text-slate-600 dark:text-zinc-400">
                          {log.actor_id || "—"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="font-mono text-xs text-slate-600 dark:text-zinc-400">
                          {log.client_id || "Platform"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 whitespace-nowrap text-slate-600 dark:text-zinc-400">
                          <Clock size={14} />
                          {formatDate(log.created_at)}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => setSelectedLog(log)}
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-[#275982] transition hover:bg-[#275982]/10 dark:border-zinc-700 dark:text-blue-300 dark:hover:bg-[#275982]/20"
                        >
                          <Eye size={14} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Client-side pagination */}
          {!loading && filteredLogs.length > 0 && (
            <div className="flex flex-col justify-between gap-3 border-t border-slate-200 p-4 sm:flex-row sm:items-center dark:border-zinc-800">
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Showing{" "}
                {(currentPage - 1) * PAGE_SIZE + 1}–
                {Math.min(currentPage * PAGE_SIZE, filteredLogs.length)} of{" "}
                {filteredLogs.length} loaded records
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  disabled={currentPage === 1}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700"
                >
                  Previous
                </button>

                <span className="px-2 text-xs text-slate-500 dark:text-zinc-400">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(totalPages, page + 1)
                    )
                  }
                  disabled={currentPage >= totalPages}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Log details modal */}
      {selectedLog && (
        <ViewAuditLog
          log={selectedLog}
          onClose={() => setSelectedLog(null)}
        />
      )}
    </div>
  );
};

export default AuditLogs;