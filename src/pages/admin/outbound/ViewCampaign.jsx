// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   ArrowLeft,
//   Pencil,
//   Trash2,
//   Calendar,
//   Phone,
//   Bot,
//   Activity,
//   Hash,
//   RefreshCw,
//   Play,
//   Pause,
//   Users,
//   UserPlus,
// } from "lucide-react";
// import campaignApi from "../../api/campaignApi";
// import AddCampaignContacts from "./AddCampaignContacts";

// const getApiError = (err, fallback) => {
//   const detail =
//     err?.response?.data?.detail ?? err?.response?.data?.message;

//   if (Array.isArray(detail)) {
//     return detail
//       .map((item) => item?.msg || item?.message || String(item))
//       .filter(Boolean)
//       .join(", ");
//   }

//   return detail || err?.message || fallback;
// };

// const contactStatusClass = (status) => {
//   switch (String(status || "").toLowerCase()) {
//     case "completed":
//       return "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-600 dark:text-emerald-400";
//     case "calling":
//       return "border-cyan-500/20 bg-cyan-500/[0.06] text-cyan-600 dark:text-cyan-400";
//     case "failed":
//       return "border-red-500/20 bg-red-500/[0.06] text-red-600 dark:text-red-400";
//     default:
//       return "border-black/[0.08] bg-zinc-50 text-zinc-600 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-400";
//   }
// };

// export default function ViewCampaign() {
//   const navigate = useNavigate();
//   const { campaignId, id } = useParams();
//   const currentId = campaignId || id;

//   const [campaign, setCampaign] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Start / Pause / Resume
//   const [actionLoading, setActionLoading] = useState("");
//   const [actionError, setActionError] = useState("");

//   // Campaign contacts
//   const [contacts, setContacts] = useState([]);
//   const [loadingContacts, setLoadingContacts] = useState(true);
//   const [contactsError, setContactsError] = useState("");
//   const [removingContactId, setRemovingContactId] = useState("");
//   const [showAddContacts, setShowAddContacts] = useState(false);

//   const loadCampaign = async () => {
//     if (!currentId) {
//       setError("Campaign ID is missing.");
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       const response = await campaignApi.get(currentId);
//       const data = response?.data;

//       setCampaign(data?.item || data?.data || data);
//     } catch (err) {
//       console.error("Failed to load campaign:", err);
//       setError(
//         err.response?.data?.detail ||
//         err.response?.data?.message ||
//         "Failed to load campaign details."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadCampaign();
//   }, [currentId]);

//   // ============================================================
//   // GET /campaigns/{campaign_id}/contacts
//   // ============================================================

//   const loadContacts = async () => {
//     if (!currentId) {
//       setLoadingContacts(false);
//       return;
//     }

//     try {
//       setLoadingContacts(true);
//       setContactsError("");

//       const response = await campaignApi.listContacts(currentId, {
//         limit: 500,
//         offset: 0,
//       });

//       const data = response?.data;

//       setContacts(Array.isArray(data?.items) ? data.items : []);
//     } catch (err) {
//       setContactsError(
//         getApiError(err, "Failed to load campaign contacts.")
//       );
//     } finally {
//       setLoadingContacts(false);
//     }
//   };

//   useEffect(() => {
//     loadContacts();
//   }, [currentId]);

//   // ============================================================
//   // POST /campaigns/{campaign_id}/start | pause | resume
//   // ============================================================

//   const runStatusAction = async (action) => {
//     if (actionLoading) return;

//     try {
//       setActionLoading(action);
//       setActionError("");

//       const handlers = {
//         start: campaignApi.start,
//         pause: campaignApi.pause,
//         resume: campaignApi.resume,
//       };

//       const response = await handlers[action](currentId);
//       const updated = response?.data;

//       // The API returns the updated campaign (with the new status)
//       if (updated?.id) {
//         setCampaign(updated);
//       } else {
//         await loadCampaign();
//       }
//     } catch (err) {
//       setActionError(getApiError(err, `Failed to ${action} campaign.`));
//     } finally {
//       setActionLoading("");
//     }
//   };

//   // ============================================================
//   // DELETE /campaigns/{campaign_id}/contacts/{contact_id}
//   // ============================================================

//   const handleRemoveContact = async (contact) => {
//     const label = contact.name || contact.phone;

//     if (!window.confirm(`Remove ${label} from this campaign?`)) return;

//     try {
//       setRemovingContactId(contact.contact_id);
//       setContactsError("");

//       await campaignApi.removeContact(currentId, contact.contact_id);

//       setContacts((previous) =>
//         previous.filter((item) => item.contact_id !== contact.contact_id)
//       );
//     } catch (err) {
//       setContactsError(getApiError(err, "Failed to remove contact."));
//     } finally {
//       setRemovingContactId("");
//     }
//   };

//   const formatDate = (value) => {
//     if (!value) return "Not scheduled";

//     const date = new Date(value);

//     if (Number.isNaN(date.getTime())) return value;

//     return date.toLocaleString();
//   };

//   const DetailCard = ({ icon: Icon, label, value }) => (
//     <div className="rounded-xl border border-black/[0.06] bg-white p-4 dark:border-white/[0.08] dark:bg-[#101012]">
//       <div className="mb-3 flex items-center gap-2">
//         <Icon size={15} className="text-zinc-500 dark:text-zinc-400" />
//         <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
//           {label}
//         </p>
//       </div>

//       <p className="break-all text-[13px] font-medium text-zinc-900 dark:text-zinc-100">
//         {value || "Not available"}
//       </p>
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="flex min-h-[60vh] items-center justify-center bg-zinc-100 dark:bg-[#09090B]">
//         <div className="flex items-center gap-2 text-sm text-zinc-500">
//           <RefreshCw size={16} className="animate-spin" />
//           Loading campaign details...
//         </div>
//       </div>
//     );
//   }

//   if (error || !campaign) {
//     return (
//       <div className="min-h-screen bg-zinc-100 p-4 dark:bg-[#09090B] sm:p-6">
//         <div className="mx-auto max-w-3xl rounded-2xl border border-black/[0.06] bg-white p-8 text-center dark:border-white/[0.08] dark:bg-[#101012]">
//           <p className="text-sm text-red-500">
//             {error || "Campaign not found."}
//           </p>

//           <button
//             onClick={() => navigate("/outbound")}
//             className="mt-5 rounded-lg bg-cyan-500 px-4 py-2 text-[13px] font-semibold text-white hover:bg-cyan-400 dark:bg-cyan-400 dark:text-slate-950"
//           >
//             Back to Campaigns
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const status = campaign.status || "draft";

//   const canStart = status === "draft" || status === "scheduled";
//   const canPause = status === "active";
//   const canResume = status === "paused";
//   const canEditContacts = status !== "completed" && status !== "failed";

//   return (
//     <div className="min-h-screen bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
//       <main className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-7">

//         {/* PAGE HEADER */}
//         <section className="flex flex-wrap items-center justify-between gap-3">
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => navigate("/outbound")}
//               className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-zinc-500 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-400 dark:hover:bg-white/[0.04]"
//             >
//               <ArrowLeft size={16} />
//             </button>

//             <div>
//               <h1 className="text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
//                 Campaign Details
//               </h1>
//               <p className="mt-1 text-[12px] text-zinc-500">
//                 View your campaign information
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             {(canStart || canResume) && (
//               <button
//                 onClick={() => runStatusAction(canStart ? "start" : "resume")}
//                 disabled={Boolean(actionLoading)}
//                 className="flex h-9 items-center gap-2 rounded-lg bg-cyan-500 px-3 text-[12px] font-semibold text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-cyan-400 dark:text-slate-950"
//               >
//                 <Play size={14} />
//                 {actionLoading
//                   ? canStart
//                     ? "Starting..."
//                     : "Resuming..."
//                   : canStart
//                     ? "Start"
//                     : "Resume"}
//               </button>
//             )}

//             {canPause && (
//               <button
//                 onClick={() => runStatusAction("pause")}
//                 disabled={Boolean(actionLoading)}
//                 className="flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] font-semibold text-zinc-700 transition hover:bg-black/[0.03] disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300 dark:hover:bg-white/[0.04]"
//               >
//                 <Pause size={14} />
//                 {actionLoading ? "Pausing..." : "Pause"}
//               </button>
//             )}

//             <button
//               onClick={() => navigate(`/outbound/${currentId}/edit`)}
//               className="flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] font-semibold text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300 dark:hover:bg-white/[0.04]"
//             >
//               <Pencil size={14} />
//               Edit
//             </button>

//             <button
//               onClick={() => navigate(`/outbound/${currentId}/delete`)}
//               className="flex h-9 items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/[0.05] px-3 text-[12px] font-semibold text-red-500 transition hover:bg-red-500/10"
//             >
//               <Trash2 size={14} />
//               Delete
//             </button>
//           </div>
//         </section>

//         {actionError && (
//           <div
//             role="alert"
//             className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] text-red-600 dark:text-red-400"
//           >
//             {actionError}
//           </div>
//         )}

//         {/* CAMPAIGN SUMMARY */}
//         <section className="rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
//           <div className="flex flex-wrap items-start justify-between gap-3">
//             <div>
//               <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
//                 Campaign Name
//               </p>

//               <h2 className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
//                 {campaign.name}
//               </h2>

//               <p className="mt-1 break-all font-mono text-[11px] text-zinc-500">
//                 {campaign.id}
//               </p>
//             </div>

//             <span className="rounded-full border border-cyan-500/20 bg-cyan-500/[0.06] px-3 py-1 text-[11px] font-semibold capitalize text-cyan-600 dark:text-cyan-400">
//               {status}
//             </span>
//           </div>
//         </section>

//         {/* CAMPAIGN INFORMATION */}
//         <section>
//           <h2 className="mb-3 text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
//             Campaign Information
//           </h2>

//           <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
//             <DetailCard
//               icon={Hash}
//               label="Campaign ID"
//               value={campaign.id}
//             />

//             <DetailCard
//               icon={Bot}
//               label="Agent ID"
//               value={campaign.agent_id}
//             />

//             <DetailCard
//               icon={Phone}
//               label="Phone Number ID"
//               value={campaign.phone_number_id}
//             />

//             <DetailCard
//               icon={Calendar}
//               label="Scheduled At"
//               value={formatDate(campaign.scheduled_at)}
//             />

//             <DetailCard
//               icon={Calendar}
//               label="Created At"
//               value={formatDate(campaign.created_at)}
//             />

//             <DetailCard
//               icon={Activity}
//               label="Updated At"
//               value={formatDate(campaign.updated_at)}
//             />
//           </div>
//         </section>

//         {/* CALL STATISTICS */}
//         <section>
//           <h2 className="mb-3 text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
//             Call Statistics
//           </h2>

//           <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
//             {[
//               { label: "Total Calls", value: campaign.total_calls },
//               { label: "Running Calls", value: campaign.running_calls },
//               { label: "Successful Calls", value: campaign.successful_calls },
//             ].map((item) => (
//               <div
//                 key={item.label}
//                 className="rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]"
//               >
//                 <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
//                   {item.label}
//                 </p>

//                 <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
//                   {item.value ?? 0}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* CAMPAIGN CONTACTS */}
//         <section>
//           <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
//             <div className="flex items-center gap-2">
//               <h2 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
//                 Contacts
//               </h2>
//               <span className="rounded bg-black/[0.06] px-2 py-0.5 text-[11px] font-semibold text-zinc-600 dark:bg-white/[0.08] dark:text-zinc-400">
//                 {contacts.length}
//               </span>
//             </div>

//             {canEditContacts && (
//               <button
//                 onClick={() => setShowAddContacts(true)}
//                 className="flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] font-semibold text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300 dark:hover:bg-white/[0.04]"
//               >
//                 <UserPlus size={14} />
//                 Add Contacts
//               </button>
//             )}
//           </div>

//           {contactsError && (
//             <div
//               role="alert"
//               className="mb-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] text-red-600 dark:text-red-400"
//             >
//               {contactsError}
//             </div>
//           )}

//           {loadingContacts ? (
//             <div className="rounded-2xl border border-black/[0.06] bg-white py-10 text-center text-[13px] text-zinc-500 dark:border-white/[0.08] dark:bg-[#101012]">
//               Loading contacts...
//             </div>
//           ) : contacts.length === 0 ? (
//             <div className="rounded-2xl border border-dashed border-black/[0.10] bg-white py-12 text-center dark:border-white/[0.08] dark:bg-[#101012]">
//               <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-black/[0.06] bg-zinc-50 dark:border-white/[0.08] dark:bg-white/[0.02]">
//                 <Users size={20} className="text-zinc-400 dark:text-zinc-500" />
//               </div>
//               <p className="mt-4 text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
//                 No contacts added yet
//               </p>
//               <p className="mx-auto mt-1 max-w-sm text-[12px] text-zinc-500">
//                 Add contacts before starting this campaign.
//               </p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto rounded-2xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">
//               <table className="w-full">
//                 <thead className="border-b border-black/[0.06] dark:border-white/[0.06]">
//                   <tr>
//                     <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
//                       Name
//                     </th>
//                     <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
//                       Phone
//                     </th>
//                     <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
//                       Status
//                     </th>
//                     <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
//                       Attempts
//                     </th>
//                     <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
//                       Next Attempt
//                     </th>
//                     <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {contacts.map((contact) => (
//                     <tr
//                       key={contact.id}
//                       className="border-b border-black/[0.04] last:border-0 dark:border-white/[0.04]"
//                     >
//                       <td className="px-5 py-4 text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
//                         {contact.name || "-"}
//                       </td>
//                       <td className="px-3 py-4 text-[13px] text-zinc-700 dark:text-zinc-300">
//                         {contact.phone}
//                       </td>
//                       <td className="px-3 py-4">
//                         <span
//                           className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${contactStatusClass(
//                             contact.status
//                           )}`}
//                         >
//                           {contact.status}
//                         </span>
//                       </td>
//                       <td className="px-3 py-4 text-[13px] text-zinc-700 dark:text-zinc-300">
//                         {contact.attempts ?? 0}
//                       </td>
//                       <td className="px-3 py-4 text-[12px] text-zinc-500">
//                         {contact.next_attempt_at
//                           ? formatDate(contact.next_attempt_at)
//                           : "-"}
//                       </td>
//                       <td className="px-5 py-4 text-right">
//                         {canEditContacts && (
//                           <button
//                             type="button"
//                             onClick={() => handleRemoveContact(contact)}
//                             disabled={
//                               removingContactId === contact.contact_id ||
//                               contact.status === "calling"
//                             }
//                             title="Remove from campaign"
//                             aria-label="Remove contact"
//                             className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/[0.05] text-red-500 transition hover:bg-red-500/[0.12] disabled:cursor-not-allowed disabled:opacity-50"
//                           >
//                             <Trash2 size={14} />
//                           </button>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </section>

//         {/* SETTINGS */}
//         {campaign.settings && (
//           <section className="rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
//             <h2 className="mb-3 text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
//               Campaign Settings
//             </h2>

//             <pre className="overflow-x-auto whitespace-pre-wrap break-words text-[12px] text-zinc-600 dark:text-zinc-400">
//               {JSON.stringify(campaign.settings, null, 2)}
//             </pre>
//           </section>
//         )}
//       </main>

//       {showAddContacts && (
//         <AddCampaignContacts
//           campaignId={currentId}
//           existingContactIds={contacts.map((item) => item.contact_id)}
//           onClose={() => setShowAddContacts(false)}
//           onAdded={() => loadContacts()}
//         />
//       )}
//     </div>
//   );
// }





import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Calendar,
  Phone,
  Bot,
  Activity,
  Hash,
  RefreshCw,
  Play,
  Pause,
  Users,
  UserPlus,
} from "lucide-react";
import { campaignApi } from "./Outboundcalls";
import AddCampaignContacts from "./AddCampaignContacts";

const getApiError = (err, fallback) => {
  const detail =
    err?.response?.data?.detail ?? err?.response?.data?.message;

  if (Array.isArray(detail)) {
    return detail
      .map((item) => item?.msg || item?.message || String(item))
      .filter(Boolean)
      .join(", ");
  }

  return detail || err?.message || fallback;
};

const contactStatusClass = (status) => {
  switch (String(status || "").toLowerCase()) {
    case "completed":
      return "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-600 dark:text-emerald-400";
    case "calling":
      return "border-cyan-500/20 bg-cyan-500/[0.06] text-cyan-600 dark:text-cyan-400";
    case "failed":
      return "border-red-500/20 bg-red-500/[0.06] text-red-600 dark:text-red-400";
    default:
      return "border-black/[0.08] bg-zinc-50 text-zinc-600 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-zinc-400";
  }
};

export default function ViewCampaign() {
  const navigate = useNavigate();
  const { campaignId, id } = useParams();
  const currentId = campaignId || id;

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Start / Pause / Resume
  const [actionLoading, setActionLoading] = useState("");
  const [actionError, setActionError] = useState("");

  // Campaign contacts
  const [contacts, setContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [contactsError, setContactsError] = useState("");
  const [removingContactId, setRemovingContactId] = useState("");
  const [showAddContacts, setShowAddContacts] = useState(false);

  const loadCampaign = async () => {
    if (!currentId) {
      setError("Campaign ID is missing.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await campaignApi.get(currentId);
      const data = response?.data;

      setCampaign(data?.item || data?.data || data);
    } catch (err) {
      console.error("Failed to load campaign:", err);
      setError(
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Failed to load campaign details."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCampaign();
  }, [currentId]);

  // ============================================================
  // GET /campaigns/{campaign_id}/contacts
  // ============================================================

  const loadContacts = async () => {
    if (!currentId) {
      setLoadingContacts(false);
      return;
    }

    try {
      setLoadingContacts(true);
      setContactsError("");

      const response = await campaignApi.listContacts(currentId, {
        limit: 500,
        offset: 0,
      });

      const data = response?.data;

      setContacts(Array.isArray(data?.items) ? data.items : []);
    } catch (err) {
      setContactsError(
        getApiError(err, "Failed to load campaign contacts.")
      );
    } finally {
      setLoadingContacts(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, [currentId]);

  // ============================================================
  // POST /campaigns/{campaign_id}/start | pause | resume
  // ============================================================

  const runStatusAction = async (action) => {
    if (actionLoading) return;

    try {
      setActionLoading(action);
      setActionError("");

      const handlers = {
        start: campaignApi.start,
        pause: campaignApi.pause,
        resume: campaignApi.resume,
      };

      const response = await handlers[action](currentId);
      const updated = response?.data;

      // The API returns the updated campaign (with the new status)
      if (updated?.id) {
        setCampaign(updated);
      } else {
        await loadCampaign();
      }
    } catch (err) {
      setActionError(getApiError(err, `Failed to ${action} campaign.`));
    } finally {
      setActionLoading("");
    }
  };

  // ============================================================
  // DELETE /campaigns/{campaign_id}/contacts/{contact_id}
  // ============================================================

  const handleRemoveContact = async (contact) => {
    const label = contact.name || contact.phone;

    if (!window.confirm(`Remove ${label} from this campaign?`)) return;

    try {
      setRemovingContactId(contact.contact_id);
      setContactsError("");

      await campaignApi.removeContact(currentId, contact.contact_id);

      setContacts((previous) =>
        previous.filter((item) => item.contact_id !== contact.contact_id)
      );
    } catch (err) {
      setContactsError(getApiError(err, "Failed to remove contact."));
    } finally {
      setRemovingContactId("");
    }
  };

  const formatDate = (value) => {
    if (!value) return "Not scheduled";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleString();
  };

  const DetailCard = ({ icon: Icon, label, value }) => (
    <div className="rounded-xl border border-black/[0.06] bg-white p-4 dark:border-white/[0.08] dark:bg-[#101012]">
      <div className="mb-3 flex items-center gap-2">
        <Icon size={15} className="text-zinc-500 dark:text-zinc-400" />
        <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          {label}
        </p>
      </div>

      <p className="break-all text-[13px] font-medium text-zinc-900 dark:text-zinc-100">
        {value || "Not available"}
      </p>
    </div>
  );

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-zinc-100 dark:bg-[#09090B]">
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <RefreshCw size={16} className="animate-spin" />
          Loading campaign details...
        </div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="min-h-screen bg-zinc-100 p-4 dark:bg-[#09090B] sm:p-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-black/[0.06] bg-white p-8 text-center dark:border-white/[0.08] dark:bg-[#101012]">
          <p className="text-sm text-red-500">
            {error || "Campaign not found."}
          </p>

          <button
            onClick={() => navigate("/outbound")}
            className="mt-5 rounded-lg bg-cyan-500 px-4 py-2 text-[13px] font-semibold text-white hover:bg-cyan-400 dark:bg-cyan-400 dark:text-slate-950"
          >
            Back to Campaigns
          </button>
        </div>
      </div>
    );
  }

  const status = campaign.status || "draft";

  const canStart = status === "draft" || status === "scheduled";
  const canPause = status === "active";
  const canResume = status === "paused";
  const canEditContacts = status !== "completed" && status !== "failed";

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
      <main className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-7">

        {/* PAGE HEADER */}
        <section className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/outbound")}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-zinc-500 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-400 dark:hover:bg-white/[0.04]"
            >
              <ArrowLeft size={16} />
            </button>

            <div>
              <h1 className="text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                Campaign Details
              </h1>
              <p className="mt-1 text-[12px] text-zinc-500">
                View your campaign information
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {(canStart || canResume) && (
              <button
                onClick={() => runStatusAction(canStart ? "start" : "resume")}
                disabled={Boolean(actionLoading)}
                className="flex h-9 items-center gap-2 rounded-lg bg-cyan-500 px-3 text-[12px] font-semibold text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-cyan-400 dark:text-slate-950"
              >
                <Play size={14} />
                {actionLoading
                  ? canStart
                    ? "Starting..."
                    : "Resuming..."
                  : canStart
                    ? "Start"
                    : "Resume"}
              </button>
            )}

            {canPause && (
              <button
                onClick={() => runStatusAction("pause")}
                disabled={Boolean(actionLoading)}
                className="flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] font-semibold text-zinc-700 transition hover:bg-black/[0.03] disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300 dark:hover:bg-white/[0.04]"
              >
                <Pause size={14} />
                {actionLoading ? "Pausing..." : "Pause"}
              </button>
            )}

            <button
              onClick={() => navigate(`/outbound/${currentId}/edit`)}
              className="flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] font-semibold text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300 dark:hover:bg-white/[0.04]"
            >
              <Pencil size={14} />
              Edit
            </button>

            <button
              onClick={() => navigate(`/outbound/${currentId}/delete`)}
              className="flex h-9 items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/[0.05] px-3 text-[12px] font-semibold text-red-500 transition hover:bg-red-500/10"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </section>

        {actionError && (
          <div
            role="alert"
            className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] text-red-600 dark:text-red-400"
          >
            {actionError}
          </div>
        )}

        {/* CAMPAIGN SUMMARY */}
        <section className="rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                Campaign Name
              </p>

              <h2 className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                {campaign.name}
              </h2>

              <p className="mt-1 break-all font-mono text-[11px] text-zinc-500">
                {campaign.id}
              </p>
            </div>

            <span className="rounded-full border border-cyan-500/20 bg-cyan-500/[0.06] px-3 py-1 text-[11px] font-semibold capitalize text-cyan-600 dark:text-cyan-400">
              {status}
            </span>
          </div>
        </section>

        {/* CAMPAIGN INFORMATION */}
        <section>
          <h2 className="mb-3 text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
            Campaign Information
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <DetailCard
              icon={Hash}
              label="Campaign ID"
              value={campaign.id}
            />

            <DetailCard
              icon={Bot}
              label="Agent ID"
              value={campaign.agent_id}
            />

            <DetailCard
              icon={Phone}
              label="Phone Number ID"
              value={campaign.phone_number_id}
            />

            <DetailCard
              icon={Calendar}
              label="Scheduled At"
              value={formatDate(campaign.scheduled_at)}
            />

            <DetailCard
              icon={Calendar}
              label="Created At"
              value={formatDate(campaign.created_at)}
            />

            <DetailCard
              icon={Activity}
              label="Updated At"
              value={formatDate(campaign.updated_at)}
            />
          </div>
        </section>

        {/* CALL STATISTICS */}
        <section>
          <h2 className="mb-3 text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
            Call Statistics
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { label: "Total Calls", value: campaign.total_calls },
              { label: "Running Calls", value: campaign.running_calls },
              { label: "Successful Calls", value: campaign.successful_calls },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]"
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  {item.label}
                </p>

                <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  {item.value ?? 0}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CAMPAIGN CONTACTS */}
        <section>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h2 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
                Contacts
              </h2>
              <span className="rounded bg-black/[0.06] px-2 py-0.5 text-[11px] font-semibold text-zinc-600 dark:bg-white/[0.08] dark:text-zinc-400">
                {contacts.length}
              </span>
            </div>

            {canEditContacts && (
              <button
                onClick={() => setShowAddContacts(true)}
                className="flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] font-semibold text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300 dark:hover:bg-white/[0.04]"
              >
                <UserPlus size={14} />
                Add Contacts
              </button>
            )}
          </div>

          {contactsError && (
            <div
              role="alert"
              className="mb-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] text-red-600 dark:text-red-400"
            >
              {contactsError}
            </div>
          )}

          {loadingContacts ? (
            <div className="rounded-2xl border border-black/[0.06] bg-white py-10 text-center text-[13px] text-zinc-500 dark:border-white/[0.08] dark:bg-[#101012]">
              Loading contacts...
            </div>
          ) : contacts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-black/[0.10] bg-white py-12 text-center dark:border-white/[0.08] dark:bg-[#101012]">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-black/[0.06] bg-zinc-50 dark:border-white/[0.08] dark:bg-white/[0.02]">
                <Users size={20} className="text-zinc-400 dark:text-zinc-500" />
              </div>
              <p className="mt-4 text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
                No contacts added yet
              </p>
              <p className="mx-auto mt-1 max-w-sm text-[12px] text-zinc-500">
                Add contacts before starting this campaign.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">
              <table className="w-full">
                <thead className="border-b border-black/[0.06] dark:border-white/[0.06]">
                  <tr>
                    <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      Name
                    </th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      Phone
                    </th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      Status
                    </th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      Attempts
                    </th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      Next Attempt
                    </th>
                    <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {contacts.map((contact) => (
                    <tr
                      key={contact.id}
                      className="border-b border-black/[0.04] last:border-0 dark:border-white/[0.04]"
                    >
                      <td className="px-5 py-4 text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
                        {contact.name || "-"}
                      </td>
                      <td className="px-3 py-4 text-[13px] text-zinc-700 dark:text-zinc-300">
                        {contact.phone}
                      </td>
                      <td className="px-3 py-4">
                        <span
                          className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${contactStatusClass(
                            contact.status
                          )}`}
                        >
                          {contact.status}
                        </span>
                      </td>
                      <td className="px-3 py-4 text-[13px] text-zinc-700 dark:text-zinc-300">
                        {contact.attempts ?? 0}
                      </td>
                      <td className="px-3 py-4 text-[12px] text-zinc-500">
                        {contact.next_attempt_at
                          ? formatDate(contact.next_attempt_at)
                          : "-"}
                      </td>
                      <td className="px-5 py-4 text-right">
                        {canEditContacts && (
                          <button
                            type="button"
                            onClick={() => handleRemoveContact(contact)}
                            disabled={
                              removingContactId === contact.contact_id ||
                              contact.status === "calling"
                            }
                            title="Remove from campaign"
                            aria-label="Remove contact"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/[0.05] text-red-500 transition hover:bg-red-500/[0.12] disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* SETTINGS */}
        {campaign.settings && (
          <section className="rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
            <h2 className="mb-3 text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
              Campaign Settings
            </h2>

            <pre className="overflow-x-auto whitespace-pre-wrap break-words text-[12px] text-zinc-600 dark:text-zinc-400">
              {JSON.stringify(campaign.settings, null, 2)}
            </pre>
          </section>
        )}
      </main>

      {showAddContacts && (
        <AddCampaignContacts
          campaignId={currentId}
          existingContactIds={contacts.map((item) => item.contact_id)}
          onClose={() => setShowAddContacts(false)}
          onAdded={() => loadContacts()}
        />
      )}
    </div>
  );
}