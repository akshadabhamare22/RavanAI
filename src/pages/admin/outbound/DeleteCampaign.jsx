
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ArrowLeft, Trash2, RefreshCw, AlertTriangle } from "lucide-react";
// import campaignApi from "../../api/campaignApi";

// export default function DeleteCampaign() {
//   const navigate = useNavigate();
//   const { campaignId, id } = useParams();
//   const currentId = campaignId || id;

//   const [campaign, setCampaign] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [deleting, setDeleting] = useState(false);
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

//         setCampaign(data);
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

//   const handleDelete = async () => {
//     try {
//       setDeleting(true);
//       setError("");

//       await campaignApi.remove(currentId);

//       navigate("/outbound", {
//         replace: true,
//         state: { campaignDeleted: true },
//       });
//     } catch (err) {
//       console.error("Campaign deletion failed:", err);
//       setError(
//         err.response?.data?.detail ||
//         err.response?.data?.message ||
//         err.message ||
//         "Failed to delete campaign."
//       );
//     } finally {
//       setDeleting(false);
//     }
//   };

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
//       <main className="mx-auto max-w-[800px] space-y-5 p-4 sm:p-6 lg:p-7">

//         {/* PAGE HEADER */}
//         <section className="flex items-center gap-3">
//           <button
//             type="button"
//             onClick={() => navigate(`/outbound/${currentId}`)}
//             className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-zinc-500 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-400"
//           >
//             <ArrowLeft size={16} />
//           </button>

//           <div>
//             <h1 className="text-[22px] font-semibold tracking-tight">
//               Delete Campaign
//             </h1>
//             <p className="mt-1 text-[12px] text-zinc-500">
//               Remove a campaign from your account
//             </p>
//           </div>
//         </section>

//         {/* DELETE CONFIRMATION */}
//         <section className="rounded-2xl border border-red-500/20 bg-white p-6 dark:bg-[#101012]">
//           <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/[0.08] text-red-500">
//             <AlertTriangle size={22} />
//           </div>

//           <h2 className="mt-5 text-[16px] font-semibold text-zinc-900 dark:text-zinc-100">
//             Are you sure you want to delete this campaign?
//           </h2>

//           <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
//             This action will permanently delete the selected campaign.
//             This cannot be undone.
//           </p>

//           {campaign && (
//             <div className="mt-5 rounded-xl border border-black/[0.06] bg-zinc-50 p-4 dark:border-white/[0.08] dark:bg-white/[0.02]">
//               <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
//                 Campaign Name
//               </p>

//               <p className="mt-2 text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
//                 {campaign.name}
//               </p>

//               <p className="mt-1 break-all font-mono text-[11px] text-zinc-500">
//                 {campaign.id}
//               </p>
//             </div>
//           )}

//           {error && (
//             <p className="mt-4 rounded-lg border border-red-500/20 bg-red-500/[0.05] px-4 py-3 text-[12px] text-red-500">
//               {error}
//             </p>
//           )}

//           <div className="mt-6 flex flex-wrap justify-end gap-2">
//             <button
//               type="button"
//               onClick={() => navigate(`/outbound/${currentId}`)}
//               disabled={deleting}
//               className="rounded-lg border border-black/[0.08] bg-white px-4 py-2.5 text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.03] disabled:opacity-60 dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
//             >
//               Cancel
//             </button>

//             <button
//               type="button"
//               onClick={handleDelete}
//               disabled={deleting || !campaign}
//               className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               <Trash2 size={14} />
//               {deleting ? "Deleting..." : "Delete Campaign"}
//             </button>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }





import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Trash2, RefreshCw, AlertTriangle } from "lucide-react";
import { campaignApi } from "./Outboundcalls";

export default function DeleteCampaign() {
  const navigate = useNavigate();
  const { campaignId, id } = useParams();
  const currentId = campaignId || id;

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
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

        setCampaign(data);
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

  const handleDelete = async () => {
    try {
      setDeleting(true);
      setError("");

      await campaignApi.remove(currentId);

      navigate("/outbound", {
        replace: true,
        state: { campaignDeleted: true },
      });
    } catch (err) {
      console.error("Campaign deletion failed:", err);
      setError(
        err.response?.data?.detail ||
        err.response?.data?.message ||
        err.message ||
        "Failed to delete campaign."
      );
    } finally {
      setDeleting(false);
    }
  };

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
      <main className="mx-auto max-w-[800px] space-y-5 p-4 sm:p-6 lg:p-7">

        {/* PAGE HEADER */}
        <section className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(`/outbound/${currentId}`)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-zinc-500 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-400"
          >
            <ArrowLeft size={16} />
          </button>

          <div>
            <h1 className="text-[22px] font-semibold tracking-tight">
              Delete Campaign
            </h1>
            <p className="mt-1 text-[12px] text-zinc-500">
              Remove a campaign from your account
            </p>
          </div>
        </section>

        {/* DELETE CONFIRMATION */}
        <section className="rounded-2xl border border-red-500/20 bg-white p-6 dark:bg-[#101012]">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/[0.08] text-red-500">
            <AlertTriangle size={22} />
          </div>

          <h2 className="mt-5 text-[16px] font-semibold text-zinc-900 dark:text-zinc-100">
            Are you sure you want to delete this campaign?
          </h2>

          <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
            This action will permanently delete the selected campaign.
            This cannot be undone.
          </p>

          {campaign && (
            <div className="mt-5 rounded-xl border border-black/[0.06] bg-zinc-50 p-4 dark:border-white/[0.08] dark:bg-white/[0.02]">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                Campaign Name
              </p>

              <p className="mt-2 text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
                {campaign.name}
              </p>

              <p className="mt-1 break-all font-mono text-[11px] text-zinc-500">
                {campaign.id}
              </p>
            </div>
          )}

          {error && (
            <p className="mt-4 rounded-lg border border-red-500/20 bg-red-500/[0.05] px-4 py-3 text-[12px] text-red-500">
              {error}
            </p>
          )}

          <div className="mt-6 flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={() => navigate(`/outbound/${currentId}`)}
              disabled={deleting}
              className="rounded-lg border border-black/[0.08] bg-white px-4 py-2.5 text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.03] disabled:opacity-60 dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting || !campaign}
              className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Trash2 size={14} />
              {deleting ? "Deleting..." : "Delete Campaign"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}