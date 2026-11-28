// import React, { useEffect, useState } from "react";
// import { X, Loader2 } from "lucide-react";
// import inboundApi from "../../api/inboundApi";

// const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
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

// const inputClass =
//   "h-10 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-cyan-400";
// const labelClass =
//   "mb-1.5 block text-[12px] font-medium text-zinc-700 dark:text-zinc-300";

// const toDateInput = (value) => (value ? String(value).slice(0, 10) : "");
// const toTimeInput = (value) => (value ? String(value).slice(0, 5) : "");

// export default function EditInboundRoute({
//   inboundRouteId,
//   onClose,
//   onUpdated,
// }) {
//   const [form, setForm] = useState({
//     phone_number_id: "",
//     agent_id: "",
//     timezone: "UTC",
//     max_concurrent_calls: 1,
//     budget_credits: "",
//     start_date: "",
//     end_date: "",
//     call_window_start: "",
//     call_window_end: "",
//     active_days: [],
//     is_active: true,
//   });
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     let mounted = true;

//     const fetchRoute = async () => {
//       if (!inboundRouteId) {
//         setError("Inbound route ID is missing.");
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         setError("");
//         const data = await inboundApi.get(inboundRouteId);
//         if (!mounted) return;

//         setForm({
//           phone_number_id: data?.phone_number_id || "",
//           agent_id: data?.agent_id || "",
//           timezone: data?.timezone || "UTC",
//           max_concurrent_calls: data?.max_concurrent_calls ?? 1,
//           budget_credits: data?.budget_credits ?? "",
//           start_date: toDateInput(data?.start_date),
//           end_date: toDateInput(data?.end_date),
//           call_window_start: toTimeInput(data?.call_window_start),
//           call_window_end: toTimeInput(data?.call_window_end),
//           active_days: Array.isArray(data?.active_days) ? data.active_days : [],
//           is_active: data?.is_active ?? true,
//         });
//       } catch (err) {
//         if (mounted) {
//           const detail = err?.response?.data?.detail;
//           setError(
//             (Array.isArray(detail)
//               ? detail.map((item) => item?.msg).filter(Boolean).join(", ")
//               : detail) || err?.message || "Failed to load inbound route."
//           );
//         }
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };

//     fetchRoute();
//     return () => {
//       mounted = false;
//     };
//   }, [inboundRouteId]);

//   const updateField = (key, value) => {
//     setForm((current) => ({ ...current, [key]: value }));
//     setError("");
//   };

//   const toggleDay = (day) => {
//     setForm((current) => ({
//       ...current,
//       active_days: current.active_days.includes(day)
//         ? current.active_days.filter((item) => item !== day)
//         : [...current.active_days, day],
//     }));
//     setError("");
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!inboundRouteId) {
//       setError("Inbound route ID is missing.");
//       return;
//     }
//     if (!form.phone_number_id || !form.agent_id) {
//       setError("Phone number ID and Agent ID are required.");
//       return;
//     }
//     if (!form.timezone) {
//       setError("Timezone is required.");
//       return;
//     }
//     if (Number(form.max_concurrent_calls) < 1 || Number(form.max_concurrent_calls) > 5) {
//       setError("Maximum concurrent calls must be between 1 and 5.");
//       return;
//     }
//     if (form.budget_credits !== "" && Number(form.budget_credits) < 0) {
//       setError("Budget credits cannot be negative.");
//       return;
//     }

//     const payload = {
//       phone_number_id: form.phone_number_id,
//       agent_id: form.agent_id,
//       timezone: form.timezone,
//       max_concurrent_calls: Number(form.max_concurrent_calls),
//       budget_credits: form.budget_credits === "" ? null : Number(form.budget_credits),
//       start_date: form.start_date || null,
//       end_date: form.end_date || null,
//       call_window_start: form.call_window_start || null,
//       call_window_end: form.call_window_end || null,
//       active_days: form.active_days,
//       is_active: Boolean(form.is_active),
//     };

//     try {
//       setSaving(true);
//       setError("");
//       const updatedRoute = await inboundApi.update(inboundRouteId, payload);
//       if (onUpdated) onUpdated(updatedRoute);
//       if (onClose) onClose();
//     } catch (err) {
//       const detail = err?.response?.data?.detail;
//       setError(
//         (Array.isArray(detail)
//           ? detail.map((item) => item?.msg).filter(Boolean).join(", ")
//           : detail) || err?.message || "Failed to update inbound route."
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//         onClick={saving ? undefined : onClose}
//       />

//       <div className="relative max-h-[90vh] w-full max-w-[680px] overflow-y-auto rounded-2xl border border-black/[0.08] bg-white shadow-2xl dark:border-white/[0.08] dark:bg-[#101012]">
//         <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-black/[0.06] bg-white px-6 py-5 dark:border-white/[0.06] dark:bg-[#101012]">
//           <div>
//             <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
//               Edit Inbound Route
//             </h3>
//             <p className="mt-1 text-[13px] text-zinc-600 dark:text-zinc-400">
//               Update the inbound route configuration.
//             </p>
//           </div>
//           <button
//             type="button"
//             onClick={onClose}
//             disabled={saving}
//             className="rounded-md p-1 text-zinc-500 transition hover:bg-black/[0.05] hover:text-zinc-800 disabled:opacity-50 dark:hover:bg-white/[0.06]"
//           >
//             <X size={16} />
//           </button>
//         </div>

//         {loading ? (
//           <div className="flex min-h-[260px] items-center justify-center">
//             <div className="flex flex-col items-center gap-3">
//               <Loader2 size={25} className="animate-spin text-cyan-500" />
//               <p className="text-sm text-zinc-500">Loading inbound route...</p>
//             </div>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <div>
//                 <label className={labelClass} htmlFor="edit-inbound-phone-id">Phone Number ID</label>
//                 <input
//                   id="edit-inbound-phone-id"
//                   className={inputClass}
//                   value={form.phone_number_id}
//                   onChange={(e) => updateField("phone_number_id", e.target.value)}
//                   placeholder="Phone number UUID"
//                   disabled={saving}
//                   required
//                 />
//               </div>
//               <div>
//                 <label className={labelClass} htmlFor="edit-inbound-agent-id">Agent ID</label>
//                 <input
//                   id="edit-inbound-agent-id"
//                   className={inputClass}
//                   value={form.agent_id}
//                   onChange={(e) => updateField("agent_id", e.target.value)}
//                   placeholder="Agent UUID"
//                   disabled={saving}
//                   required
//                 />
//               </div>
//               <div>
//                 <label className={labelClass} htmlFor="edit-inbound-timezone">Timezone</label>
//                 <select
//                   id="edit-inbound-timezone"
//                   className={inputClass}
//                   value={form.timezone}
//                   onChange={(e) => updateField("timezone", e.target.value)}
//                   disabled={saving}
//                   required
//                 >
//                   {!TIMEZONES.includes(form.timezone) && form.timezone && (
//                     <option value={form.timezone}>{form.timezone}</option>
//                   )}
//                   {TIMEZONES.map((timezone) => (
//                     <option key={timezone} value={timezone}>{timezone}</option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className={labelClass} htmlFor="edit-inbound-concurrency">Max Concurrent Calls</label>
//                 <input
//                   id="edit-inbound-concurrency"
//                   type="number"
//                   min="1"
//                   max="5"
//                   className={inputClass}
//                   value={form.max_concurrent_calls}
//                   onChange={(e) => updateField("max_concurrent_calls", e.target.value)}
//                   disabled={saving}
//                   required
//                 />
//               </div>
//               <div>
//                 <label className={labelClass} htmlFor="edit-inbound-budget">Budget Credits</label>
//                 <input
//                   id="edit-inbound-budget"
//                   type="number"
//                   min="0"
//                   className={inputClass}
//                   value={form.budget_credits}
//                   onChange={(e) => updateField("budget_credits", e.target.value)}
//                   placeholder="Optional"
//                   disabled={saving}
//                 />
//               </div>
//               <div>
//                 <label className={labelClass} htmlFor="edit-inbound-status">Status</label>
//                 <select
//                   id="edit-inbound-status"
//                   className={inputClass}
//                   value={form.is_active ? "true" : "false"}
//                   onChange={(e) => updateField("is_active", e.target.value === "true")}
//                   disabled={saving}
//                 >
//                   <option value="true">Active</option>
//                   <option value="false">Inactive</option>
//                 </select>
//               </div>
//               <div>
//                 <label className={labelClass} htmlFor="edit-inbound-start-date">Start Date</label>
//                 <input
//                   id="edit-inbound-start-date"
//                   type="date"
//                   className={inputClass}
//                   value={form.start_date}
//                   onChange={(e) => updateField("start_date", e.target.value)}
//                   disabled={saving}
//                 />
//               </div>
//               <div>
//                 <label className={labelClass} htmlFor="edit-inbound-end-date">End Date</label>
//                 <input
//                   id="edit-inbound-end-date"
//                   type="date"
//                   className={inputClass}
//                   value={form.end_date}
//                   onChange={(e) => updateField("end_date", e.target.value)}
//                   disabled={saving}
//                 />
//               </div>
//               <div>
//                 <label className={labelClass} htmlFor="edit-inbound-window-start">Call Window Start</label>
//                 <input
//                   id="edit-inbound-window-start"
//                   type="time"
//                   className={inputClass}
//                   value={form.call_window_start}
//                   onChange={(e) => updateField("call_window_start", e.target.value)}
//                   disabled={saving}
//                 />
//               </div>
//               <div>
//                 <label className={labelClass} htmlFor="edit-inbound-window-end">Call Window End</label>
//                 <input
//                   id="edit-inbound-window-end"
//                   type="time"
//                   className={inputClass}
//                   value={form.call_window_end}
//                   onChange={(e) => updateField("call_window_end", e.target.value)}
//                   disabled={saving}
//                 />
//               </div>
//             </div>

//             <div>
//               <p className={labelClass}>Active Days</p>
//               <div className="flex flex-wrap gap-2">
//                 {DAYS.map((day) => {
//                   const selected = form.active_days.includes(day);
//                   return (
//                     <button
//                       key={day}
//                       type="button"
//                       onClick={() => toggleDay(day)}
//                       disabled={saving}
//                       className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
//                         selected
//                           ? "border-cyan-500 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300"
//                           : "border-black/[0.08] text-zinc-600 hover:bg-black/[0.03] dark:border-white/[0.08] dark:text-zinc-400 dark:hover:bg-white/[0.04]"
//                       }`}
//                     >
//                       {day}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {error && (
//               <div className="rounded-lg border border-red-500/20 bg-red-500/[0.06] px-3 py-2.5">
//                 <p className="text-xs font-medium text-red-600 dark:text-red-400">{error}</p>
//               </div>
//             )}

//             <div className="flex items-center justify-end gap-3 border-t border-black/[0.06] pt-4 dark:border-white/[0.06]">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 disabled={saving}
//                 className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-black/[0.04] disabled:opacity-50 dark:text-zinc-300 dark:hover:bg-white/[0.05]"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={saving}
//                 className="inline-flex min-w-[110px] items-center justify-center gap-2 rounded-lg bg-cyan-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-cyan-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 dark:bg-cyan-400 dark:text-slate-950"
//               >
//                 {saving ? <><Loader2 size={14} className="animate-spin" /> Updating...</> : "Update Route"}
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }






import React, { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { inboundApi } from "./InboundCalls";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
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

const inputClass =
  "h-10 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-cyan-400";
const labelClass =
  "mb-1.5 block text-[12px] font-medium text-zinc-700 dark:text-zinc-300";

const toDateInput = (value) => (value ? String(value).slice(0, 10) : "");
const toTimeInput = (value) => (value ? String(value).slice(0, 5) : "");

export default function EditInboundRoute({
  inboundRouteId,
  onClose,
  onUpdated,
}) {
  const [form, setForm] = useState({
    phone_number_id: "",
    agent_id: "",
    timezone: "UTC",
    max_concurrent_calls: 1,
    budget_credits: "",
    start_date: "",
    end_date: "",
    call_window_start: "",
    call_window_end: "",
    active_days: [],
    is_active: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchRoute = async () => {
      if (!inboundRouteId) {
        setError("Inbound route ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const data = await inboundApi.get(inboundRouteId);
        if (!mounted) return;

        setForm({
          phone_number_id: data?.phone_number_id || "",
          agent_id: data?.agent_id || "",
          timezone: data?.timezone || "UTC",
          max_concurrent_calls: data?.max_concurrent_calls ?? 1,
          budget_credits: data?.budget_credits ?? "",
          start_date: toDateInput(data?.start_date),
          end_date: toDateInput(data?.end_date),
          call_window_start: toTimeInput(data?.call_window_start),
          call_window_end: toTimeInput(data?.call_window_end),
          active_days: Array.isArray(data?.active_days) ? data.active_days : [],
          is_active: data?.is_active ?? true,
        });
      } catch (err) {
        if (mounted) {
          const detail = err?.response?.data?.detail;
          setError(
            (Array.isArray(detail)
              ? detail.map((item) => item?.msg).filter(Boolean).join(", ")
              : detail) || err?.message || "Failed to load inbound route."
          );
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchRoute();
    return () => {
      mounted = false;
    };
  }, [inboundRouteId]);

  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  };

  const toggleDay = (day) => {
    setForm((current) => ({
      ...current,
      active_days: current.active_days.includes(day)
        ? current.active_days.filter((item) => item !== day)
        : [...current.active_days, day],
    }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inboundRouteId) {
      setError("Inbound route ID is missing.");
      return;
    }
    if (!form.phone_number_id || !form.agent_id) {
      setError("Phone number ID and Agent ID are required.");
      return;
    }
    if (!form.timezone) {
      setError("Timezone is required.");
      return;
    }
    if (Number(form.max_concurrent_calls) < 1 || Number(form.max_concurrent_calls) > 5) {
      setError("Maximum concurrent calls must be between 1 and 5.");
      return;
    }
    if (form.budget_credits !== "" && Number(form.budget_credits) < 0) {
      setError("Budget credits cannot be negative.");
      return;
    }

    const payload = {
      phone_number_id: form.phone_number_id,
      agent_id: form.agent_id,
      timezone: form.timezone,
      max_concurrent_calls: Number(form.max_concurrent_calls),
      budget_credits: form.budget_credits === "" ? null : Number(form.budget_credits),
      start_date: form.start_date || null,
      end_date: form.end_date || null,
      call_window_start: form.call_window_start || null,
      call_window_end: form.call_window_end || null,
      active_days: form.active_days,
      is_active: Boolean(form.is_active),
    };

    try {
      setSaving(true);
      setError("");
      const updatedRoute = await inboundApi.update(inboundRouteId, payload);
      if (onUpdated) onUpdated(updatedRoute);
      if (onClose) onClose();
    } catch (err) {
      const detail = err?.response?.data?.detail;
      setError(
        (Array.isArray(detail)
          ? detail.map((item) => item?.msg).filter(Boolean).join(", ")
          : detail) || err?.message || "Failed to update inbound route."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={saving ? undefined : onClose}
      />

      <div className="relative max-h-[90vh] w-full max-w-[680px] overflow-y-auto rounded-2xl border border-black/[0.08] bg-white shadow-2xl dark:border-white/[0.08] dark:bg-[#101012]">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-black/[0.06] bg-white px-6 py-5 dark:border-white/[0.06] dark:bg-[#101012]">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Edit Inbound Route
            </h3>
            <p className="mt-1 text-[13px] text-zinc-600 dark:text-zinc-400">
              Update the inbound route configuration.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-md p-1 text-zinc-500 transition hover:bg-black/[0.05] hover:text-zinc-800 disabled:opacity-50 dark:hover:bg-white/[0.06]"
          >
            <X size={16} />
          </button>
        </div>

        {loading ? (
          <div className="flex min-h-[260px] items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2 size={25} className="animate-spin text-cyan-500" />
              <p className="text-sm text-zinc-500">Loading inbound route...</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="edit-inbound-phone-id">Phone Number ID</label>
                <input
                  id="edit-inbound-phone-id"
                  className={inputClass}
                  value={form.phone_number_id}
                  onChange={(e) => updateField("phone_number_id", e.target.value)}
                  placeholder="Phone number UUID"
                  disabled={saving}
                  required
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="edit-inbound-agent-id">Agent ID</label>
                <input
                  id="edit-inbound-agent-id"
                  className={inputClass}
                  value={form.agent_id}
                  onChange={(e) => updateField("agent_id", e.target.value)}
                  placeholder="Agent UUID"
                  disabled={saving}
                  required
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="edit-inbound-timezone">Timezone</label>
                <select
                  id="edit-inbound-timezone"
                  className={inputClass}
                  value={form.timezone}
                  onChange={(e) => updateField("timezone", e.target.value)}
                  disabled={saving}
                  required
                >
                  {!TIMEZONES.includes(form.timezone) && form.timezone && (
                    <option value={form.timezone}>{form.timezone}</option>
                  )}
                  {TIMEZONES.map((timezone) => (
                    <option key={timezone} value={timezone}>{timezone}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="edit-inbound-concurrency">Max Concurrent Calls</label>
                <input
                  id="edit-inbound-concurrency"
                  type="number"
                  min="1"
                  max="5"
                  className={inputClass}
                  value={form.max_concurrent_calls}
                  onChange={(e) => updateField("max_concurrent_calls", e.target.value)}
                  disabled={saving}
                  required
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="edit-inbound-budget">Budget Credits</label>
                <input
                  id="edit-inbound-budget"
                  type="number"
                  min="0"
                  className={inputClass}
                  value={form.budget_credits}
                  onChange={(e) => updateField("budget_credits", e.target.value)}
                  placeholder="Optional"
                  disabled={saving}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="edit-inbound-status">Status</label>
                <select
                  id="edit-inbound-status"
                  className={inputClass}
                  value={form.is_active ? "true" : "false"}
                  onChange={(e) => updateField("is_active", e.target.value === "true")}
                  disabled={saving}
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="edit-inbound-start-date">Start Date</label>
                <input
                  id="edit-inbound-start-date"
                  type="date"
                  className={inputClass}
                  value={form.start_date}
                  onChange={(e) => updateField("start_date", e.target.value)}
                  disabled={saving}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="edit-inbound-end-date">End Date</label>
                <input
                  id="edit-inbound-end-date"
                  type="date"
                  className={inputClass}
                  value={form.end_date}
                  onChange={(e) => updateField("end_date", e.target.value)}
                  disabled={saving}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="edit-inbound-window-start">Call Window Start</label>
                <input
                  id="edit-inbound-window-start"
                  type="time"
                  className={inputClass}
                  value={form.call_window_start}
                  onChange={(e) => updateField("call_window_start", e.target.value)}
                  disabled={saving}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="edit-inbound-window-end">Call Window End</label>
                <input
                  id="edit-inbound-window-end"
                  type="time"
                  className={inputClass}
                  value={form.call_window_end}
                  onChange={(e) => updateField("call_window_end", e.target.value)}
                  disabled={saving}
                />
              </div>
            </div>

            <div>
              <p className={labelClass}>Active Days</p>
              <div className="flex flex-wrap gap-2">
                {DAYS.map((day) => {
                  const selected = form.active_days.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      disabled={saving}
                      className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                        selected
                          ? "border-cyan-500 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300"
                          : "border-black/[0.08] text-zinc-600 hover:bg-black/[0.03] dark:border-white/[0.08] dark:text-zinc-400 dark:hover:bg-white/[0.04]"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/[0.06] px-3 py-2.5">
                <p className="text-xs font-medium text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 border-t border-black/[0.06] pt-4 dark:border-white/[0.06]">
              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-black/[0.04] disabled:opacity-50 dark:text-zinc-300 dark:hover:bg-white/[0.05]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex min-w-[110px] items-center justify-center gap-2 rounded-lg bg-cyan-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-cyan-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 dark:bg-cyan-400 dark:text-slate-950"
              >
                {saving ? <><Loader2 size={14} className="animate-spin" /> Updating...</> : "Update Route"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}