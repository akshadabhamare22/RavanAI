// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ArrowLeft, Pencil, RefreshCw, Save } from "lucide-react";
// import campaignApi from "../../api/campaignApi";

// // API returns UTC; <input type="datetime-local"> needs the user's LOCAL time
// const toLocalDateTimeInput = (value) => {
//   if (!value) return "";

//   const date = new Date(value);
//   if (Number.isNaN(date.getTime())) return "";

//   const pad = (n) => String(n).padStart(2, "0");

//   return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
//     date.getDate()
//   )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
// };

// export default function EditCampaign() {
//   const navigate = useNavigate();
//   const { campaignId, id } = useParams();
//   const currentId = campaignId || id;

//   const [form, setForm] = useState({
//     name: "",
//     agent_id: "",
//     phone_number_id: "",
//     scheduled_at: "",
//   });

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const loadCampaign = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const response = await campaignApi.get(currentId);
//         const data = response?.data?.item ||
//           response?.data?.data ||
//           response?.data;

//         if (!data) {
//           throw new Error("Campaign not found.");
//         }

//         setForm({
//           name: data.name || "",
//           agent_id: data.agent_id || "",
//           phone_number_id: data.phone_number_id || "",
//           scheduled_at: toLocalDateTimeInput(data.scheduled_at),
//         });
//       } catch (err) {
//         setError(
//           err.response?.data?.detail ||
//           err.response?.data?.message ||
//           err.message ||
//           "Failed to load campaign."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (currentId) loadCampaign();
//     else {
//       setError("Campaign ID is missing.");
//       setLoading(false);
//     }
//   }, [currentId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((previous) => ({
//       ...previous,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.name.trim()) {
//       setError("Campaign name is required.");
//       return;
//     }

//     if (!form.agent_id.trim()) {
//       setError("Agent ID is required.");
//       return;
//     }

//     try {
//       setSaving(true);
//       setError("");

//       const payload = {
//         name: form.name.trim(),
//         agent_id: form.agent_id.trim(),
//         phone_number_id: form.phone_number_id.trim() || null,
//         scheduled_at: form.scheduled_at
//           ? new Date(form.scheduled_at).toISOString()
//           : null,
//       };

//       await campaignApi.update(currentId, payload);

//       navigate(`/outbound/${currentId}`);
//     } catch (err) {
//       console.error("Campaign update failed:", err);
//       setError(
//         err.response?.data?.detail ||
//         err.response?.data?.message ||
//         err.message ||
//         "Failed to update campaign."
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   const inputClass =
//     "h-11 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:placeholder:text-zinc-500";

//   if (loading) {
//     return (
//       <div className="flex min-h-[60vh] items-center justify-center bg-zinc-100 dark:bg-[#09090B]">
//         <div className="flex items-center gap-2 text-sm text-zinc-500">
//           <RefreshCw size={16} className="animate-spin" />
//           Loading campaign...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
//       <main className="mx-auto max-w-[1000px] space-y-5 p-4 sm:p-6 lg:p-7">

//         {/* PAGE HEADER */}
//         <section className="flex items-center justify-between gap-3">
//           <div className="flex items-center gap-3">
//             <button
//               type="button"
//               onClick={() => navigate(`/outbound/${currentId}`)}
//               className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-zinc-500 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-400"
//             >
//               <ArrowLeft size={16} />
//             </button>

//             <div>
//               <h1 className="text-[22px] font-semibold tracking-tight">
//                 Edit Campaign
//               </h1>
//               <p className="mt-1 text-[12px] text-zinc-500">
//                 Update your campaign information
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* EDIT FORM */}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <section className="rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
//             <div className="mb-5 flex items-center gap-3">
//               <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/[0.08] text-cyan-600 dark:text-cyan-400">
//                 <Pencil size={15} />
//               </div>

//               <div>
//                 <h2 className="text-[14px] font-semibold">
//                   Campaign Information
//                 </h2>
//                 <p className="mt-0.5 text-[12px] text-zinc-500">
//                   Edit the details of your campaign
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
//                   Campaign Name
//                 </label>
//                 <input
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   placeholder="Enter campaign name"
//                   className={inputClass}
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
//                   Agent ID
//                 </label>
//                 <input
//                   name="agent_id"
//                   value={form.agent_id}
//                   onChange={handleChange}
//                   placeholder="Enter agent ID"
//                   className={inputClass}
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
//                   Phone Number ID
//                 </label>
//                 <input
//                   name="phone_number_id"
//                   value={form.phone_number_id}
//                   onChange={handleChange}
//                   placeholder="Enter phone number ID (optional)"
//                   className={inputClass}
//                 />
//               </div>

//               <div>
//                 <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
//                   Scheduled At
//                 </label>
//                 <input
//                   type="datetime-local"
//                   name="scheduled_at"
//                   value={form.scheduled_at}
//                   onChange={handleChange}
//                   className={inputClass}
//                 />
//               </div>
//             </div>
//           </section>

//           {error && (
//             <p className="rounded-lg border border-red-500/20 bg-red-500/[0.05] px-4 py-3 text-[12px] text-red-500">
//               {error}
//             </p>
//           )}

//           <div className="flex flex-wrap justify-end gap-2">
//             <button
//               type="button"
//               onClick={() => navigate(`/outbound/${currentId}`)}
//               className="rounded-lg border border-black/[0.08] bg-white px-4 py-2.5 text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={saving}
//               className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-cyan-400 dark:text-slate-950"
//             >
//               <Save size={14} />
//               {saving ? "Saving..." : "Save Changes"}
//             </button>
//           </div>
//         </form>
//       </main>
//     </div>
//   );
// }





import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, RefreshCw, Save } from "lucide-react";
import { campaignApi } from "./Outboundcalls";

// API returns UTC; <input type="datetime-local"> needs the user's LOCAL time
const toLocalDateTimeInput = (value) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const pad = (n) => String(n).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

export default function EditCampaign() {
  const navigate = useNavigate();
  const { campaignId, id } = useParams();
  const currentId = campaignId || id;

  const [form, setForm] = useState({
    name: "",
    agent_id: "",
    phone_number_id: "",
    scheduled_at: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCampaign = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await campaignApi.get(currentId);
        const data = response?.data?.item ||
          response?.data?.data ||
          response?.data;

        if (!data) {
          throw new Error("Campaign not found.");
        }

        setForm({
          name: data.name || "",
          agent_id: data.agent_id || "",
          phone_number_id: data.phone_number_id || "",
          scheduled_at: toLocalDateTimeInput(data.scheduled_at),
        });
      } catch (err) {
        setError(
          err.response?.data?.detail ||
          err.response?.data?.message ||
          err.message ||
          "Failed to load campaign."
        );
      } finally {
        setLoading(false);
      }
    };

    if (currentId) loadCampaign();
    else {
      setError("Campaign ID is missing.");
      setLoading(false);
    }
  }, [currentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Campaign name is required.");
      return;
    }

    if (!form.agent_id.trim()) {
      setError("Agent ID is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        name: form.name.trim(),
        agent_id: form.agent_id.trim(),
        phone_number_id: form.phone_number_id.trim() || null,
        scheduled_at: form.scheduled_at
          ? new Date(form.scheduled_at).toISOString()
          : null,
      };

      await campaignApi.update(currentId, payload);

      navigate(`/outbound/${currentId}`);
    } catch (err) {
      console.error("Campaign update failed:", err);
      setError(
        err.response?.data?.detail ||
        err.response?.data?.message ||
        err.message ||
        "Failed to update campaign."
      );
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "h-11 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:placeholder:text-zinc-500";

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-zinc-100 dark:bg-[#09090B]">
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <RefreshCw size={16} className="animate-spin" />
          Loading campaign...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
      <main className="mx-auto max-w-[1000px] space-y-5 p-4 sm:p-6 lg:p-7">

        {/* PAGE HEADER */}
        <section className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(`/outbound/${currentId}`)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-zinc-500 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-400"
            >
              <ArrowLeft size={16} />
            </button>

            <div>
              <h1 className="text-[22px] font-semibold tracking-tight">
                Edit Campaign
              </h1>
              <p className="mt-1 text-[12px] text-zinc-500">
                Update your campaign information
              </p>
            </div>
          </div>
        </section>

        {/* EDIT FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <section className="rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/[0.08] text-cyan-600 dark:text-cyan-400">
                <Pencil size={15} />
              </div>

              <div>
                <h2 className="text-[14px] font-semibold">
                  Campaign Information
                </h2>
                <p className="mt-0.5 text-[12px] text-zinc-500">
                  Edit the details of your campaign
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  Campaign Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter campaign name"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  Agent ID
                </label>
                <input
                  name="agent_id"
                  value={form.agent_id}
                  onChange={handleChange}
                  placeholder="Enter agent ID"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  Phone Number ID
                </label>
                <input
                  name="phone_number_id"
                  value={form.phone_number_id}
                  onChange={handleChange}
                  placeholder="Enter phone number ID (optional)"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  Scheduled At
                </label>
                <input
                  type="datetime-local"
                  name="scheduled_at"
                  value={form.scheduled_at}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {error && (
            <p className="rounded-lg border border-red-500/20 bg-red-500/[0.05] px-4 py-3 text-[12px] text-red-500">
              {error}
            </p>
          )}

          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={() => navigate(`/outbound/${currentId}`)}
              className="rounded-lg border border-black/[0.08] bg-white px-4 py-2.5 text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-cyan-400 dark:text-slate-950"
            >
              <Save size={14} />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}