// import React, { useCallback, useEffect, useState } from "react";
// import { X, PhoneCall, Calendar, Clock, Loader2, RefreshCw } from "lucide-react";
// import inboundApi from "../../api/inboundApi";

// export default function ViewInboundRoute({ inboundRouteId, onClose }) {
//   const [route, setRoute] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchRoute = useCallback(async () => {
//     if (!inboundRouteId) {
//       setError("Inbound route ID is missing.");
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       const data = await inboundApi.get(inboundRouteId);
//       setRoute(data);
//     } catch (err) {
//       setError(err?.message || "Failed to load inbound route.");
//     } finally {
//       setLoading(false);
//     }
//   }, [inboundRouteId]);

//   useEffect(() => {
//     fetchRoute();
//   }, [fetchRoute]);

//   const formatDate = (value) => {
//     if (!value) return "-";
//     const date = new Date(value);
//     return Number.isNaN(date.getTime())
//       ? value
//       : date.toLocaleDateString("en-IN", {
//           day: "2-digit",
//           month: "short",
//           year: "numeric",
//         });
//   };

//   const formatDateTime = (value) => {
//     if (!value) return "-";
//     const date = new Date(value);
//     return Number.isNaN(date.getTime())
//       ? value
//       : date.toLocaleString("en-IN", {
//           day: "2-digit",
//           month: "short",
//           year: "numeric",
//           hour: "2-digit",
//           minute: "2-digit",
//         });
//   };

//   const formatTime = (value) => {
//     if (!value) return "-";
//     return String(value).slice(0, 5);
//   };

//   const Detail = ({ label, value }) => (
//     <div>
//       <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
//         {label}
//       </p>
//       <div className="break-words rounded-xl border border-black/[0.06] bg-zinc-50 px-4 py-3 text-[13px] text-zinc-700 dark:border-white/[0.06] dark:bg-white/[0.02] dark:text-zinc-300">
//         {value ?? "-"}
//       </div>
//     </div>
//   );

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//         onClick={onClose}
//       />

//       <div className="relative max-h-[90vh] w-full max-w-[650px] overflow-y-auto rounded-2xl border border-black/[0.08] bg-white shadow-2xl dark:border-white/[0.08] dark:bg-[#101012]">
//         <div className="flex items-start justify-between gap-4 border-b border-black/[0.06] px-6 py-5 dark:border-white/[0.06]">
//           <div className="flex items-center gap-3">
//             <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/25 bg-cyan-500/[0.06]">
//               <PhoneCall size={17} className="text-cyan-600 dark:text-cyan-400" />
//             </div>
//             <div>
//               <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
//                 Inbound Route Details
//               </h3>
//               <p className="mt-0.5 text-[12px] text-zinc-500">
//                 View inbound routing configuration
//               </p>
//             </div>
//           </div>
//           <button
//             type="button"
//             onClick={onClose}
//             className="rounded-md p-1 text-zinc-500 transition hover:bg-black/[0.05] hover:text-zinc-800 dark:hover:bg-white/[0.06] dark:hover:text-zinc-200"
//             aria-label="Close"
//           >
//             <X size={17} />
//           </button>
//         </div>

//         <div className="px-6 py-6">
//           {loading ? (
//             <div className="flex min-h-[250px] items-center justify-center">
//               <div className="flex flex-col items-center gap-3">
//                 <Loader2 size={25} className="animate-spin text-cyan-500" />
//                 <p className="text-sm text-zinc-500">Loading inbound route...</p>
//               </div>
//             </div>
//           ) : error ? (
//             <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
//               <p className="max-w-md rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-sm text-red-600 dark:text-red-400">
//                 {error}
//               </p>
//               <button
//                 type="button"
//                 onClick={fetchRoute}
//                 className="mt-4 flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-cyan-400 dark:bg-cyan-400 dark:text-slate-950"
//               >
//                 <RefreshCw size={13} /> Try Again
//               </button>
//             </div>
//           ) : route ? (
//             <div className="space-y-5">
//               <div className="flex items-center justify-between gap-3">
//                 <div>
//                   <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
//                     Route Status
//                   </p>
//                   <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${route.is_active ? "border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-600 dark:text-emerald-400" : "border-zinc-500/30 bg-zinc-500/[0.08] text-zinc-600 dark:text-zinc-400"}`}>
//                     <span className={`h-1.5 w-1.5 rounded-full ${route.is_active ? "bg-emerald-500" : "bg-zinc-400"}`} />
//                     {route.is_active ? "Active" : "Inactive"}
//                   </span>
//                 </div>
//                 <div className="text-right">
//                   <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
//                     Max Concurrent Calls
//                   </p>
//                   <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
//                     {route.max_concurrent_calls ?? "-"}
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <Detail label="Inbound Route ID" value={route.id} />
//                 <Detail label="Organization ID" value={route.client_id} />
//                 <Detail label="Phone Number ID" value={route.phone_number_id} />
//                 <Detail label="Agent ID" value={route.agent_id} />
//                 <Detail label="Timezone" value={route.timezone} />
//                 <Detail label="Budget Credits" value={route.budget_credits ?? "-"} />
//                 <Detail label="Start Date" value={formatDate(route.start_date)} />
//                 <Detail label="End Date" value={formatDate(route.end_date)} />
//                 <Detail label="Call Window Start" value={formatTime(route.call_window_start)} />
//                 <Detail label="Call Window End" value={formatTime(route.call_window_end)} />
//                 <Detail label="Active Days" value={Array.isArray(route.active_days) && route.active_days.length ? route.active_days.join(", ") : "All days"} />
//                 <Detail label="Created At" value={formatDateTime(route.created_at)} />
//                 <Detail label="Updated At" value={formatDateTime(route.updated_at)} />
//               </div>

//               <div className="flex items-center gap-2 border-t border-black/[0.06] pt-4 text-[11px] text-zinc-500 dark:border-white/[0.06]">
//                 <Calendar size={13} />
//                 <Clock size={13} />
//                 Route details are loaded directly from the backend.
//               </div>
//             </div>
//           ) : null}
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useCallback, useEffect, useState } from "react";
import { X, PhoneCall, Calendar, Clock, Loader2, RefreshCw } from "lucide-react";
import { inboundApi } from "./InboundCalls";

export default function ViewInboundRoute({ inboundRouteId, onClose }) {
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRoute = useCallback(async () => {
    if (!inboundRouteId) {
      setError("Inbound route ID is missing.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await inboundApi.get(inboundRouteId);
      setRoute(data);
    } catch (err) {
      setError(err?.message || "Failed to load inbound route.");
    } finally {
      setLoading(false);
    }
  }, [inboundRouteId]);

  useEffect(() => {
    fetchRoute();
  }, [fetchRoute]);

  const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? value
      : date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
  };

  const formatDateTime = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? value
      : date.toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  const formatTime = (value) => {
    if (!value) return "-";
    return String(value).slice(0, 5);
  };

  const Detail = ({ label, value }) => (
    <div>
      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
        {label}
      </p>
      <div className="break-words rounded-xl border border-black/[0.06] bg-zinc-50 px-4 py-3 text-[13px] text-zinc-700 dark:border-white/[0.06] dark:bg-white/[0.02] dark:text-zinc-300">
        {value ?? "-"}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative max-h-[90vh] w-full max-w-[650px] overflow-y-auto rounded-2xl border border-black/[0.08] bg-white shadow-2xl dark:border-white/[0.08] dark:bg-[#101012]">
        <div className="flex items-start justify-between gap-4 border-b border-black/[0.06] px-6 py-5 dark:border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/25 bg-cyan-500/[0.06]">
              <PhoneCall size={17} className="text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Inbound Route Details
              </h3>
              <p className="mt-0.5 text-[12px] text-zinc-500">
                View inbound routing configuration
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-zinc-500 transition hover:bg-black/[0.05] hover:text-zinc-800 dark:hover:bg-white/[0.06] dark:hover:text-zinc-200"
            aria-label="Close"
          >
            <X size={17} />
          </button>
        </div>

        <div className="px-6 py-6">
          {loading ? (
            <div className="flex min-h-[250px] items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Loader2 size={25} className="animate-spin text-cyan-500" />
                <p className="text-sm text-zinc-500">Loading inbound route...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
              <p className="max-w-md rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
              <button
                type="button"
                onClick={fetchRoute}
                className="mt-4 flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-cyan-400 dark:bg-cyan-400 dark:text-slate-950"
              >
                <RefreshCw size={13} /> Try Again
              </button>
            </div>
          ) : route ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                    Route Status
                  </p>
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${route.is_active ? "border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-600 dark:text-emerald-400" : "border-zinc-500/30 bg-zinc-500/[0.08] text-zinc-600 dark:text-zinc-400"}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${route.is_active ? "bg-emerald-500" : "bg-zinc-400"}`} />
                    {route.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="text-right">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                    Max Concurrent Calls
                  </p>
                  <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {route.max_concurrent_calls ?? "-"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Detail label="Inbound Route ID" value={route.id} />
                <Detail label="Organization ID" value={route.client_id} />
                <Detail label="Phone Number ID" value={route.phone_number_id} />
                <Detail label="Agent ID" value={route.agent_id} />
                <Detail label="Timezone" value={route.timezone} />
                <Detail label="Budget Credits" value={route.budget_credits ?? "-"} />
                <Detail label="Start Date" value={formatDate(route.start_date)} />
                <Detail label="End Date" value={formatDate(route.end_date)} />
                <Detail label="Call Window Start" value={formatTime(route.call_window_start)} />
                <Detail label="Call Window End" value={formatTime(route.call_window_end)} />
                <Detail label="Active Days" value={Array.isArray(route.active_days) && route.active_days.length ? route.active_days.join(", ") : "All days"} />
                <Detail label="Created At" value={formatDateTime(route.created_at)} />
                <Detail label="Updated At" value={formatDateTime(route.updated_at)} />
              </div>

              <div className="flex items-center gap-2 border-t border-black/[0.06] pt-4 text-[11px] text-zinc-500 dark:border-white/[0.06]">
                <Calendar size={13} />
                <Clock size={13} />
                Route details are loaded directly from the backend.
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}