// import React, { useState, useEffect, useCallback } from "react";
// import campaignApi from "../../api/campaignApi";
// import { useNavigate } from "react-router-dom";
// import {
//   HelpCircle,
//   Users,
//   PhoneCall,
//   TrendingUp,
//   PlayCircle,
//   Calendar,
//   Search,
//   Coins,
// } from "lucide-react";

// // ============================================================
// // STAT CARD
// // ============================================================

// function StatCard({
//   icon: Icon,
//   label,
//   value,
//   accent = false,
//   success = false,
// }) {
//   return (
//     <div
//       className={`
//         rounded-2xl border p-4
//         transition
//         ${
//           accent
//             ? "border-cyan-500/25 bg-cyan-500/[0.04]"
//             : "border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]"
//         }
//       `}
//     >
//       <div className="mb-5 flex items-center justify-between">
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
//           success
//             ? "text-emerald-600 dark:text-emerald-400"
//             : accent
//               ? "text-cyan-600 dark:text-cyan-400"
//               : "text-zinc-900 dark:text-zinc-100"
//         }`}
//       >
//         {value}
//       </p>
//     </div>
//   );
// }

// // ============================================================
// // RESPONSE HELPERS
// // ============================================================

// const getResponseData = (response) => {
//   return response?.data ?? response;
// };

// // ============================================================
// // MAIN PAGE
// // ============================================================

// export default function OutboundCalls() {
//   const navigate = useNavigate();

//   const [campaigns, setCampaigns] = useState([]);

//   const [stats, setStats] = useState({
//     total_calls: 0,
//     credits_consumed: 0,
//     running_calls: 0,
//     avg_success: 0,
//     active: 0,
//     scheduled: 0,
//   });

//   const [activeTab, setActiveTab] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");

//   const tabs = ["All", "Active", "Scheduled", "Paused"];

//   // ============================================================
//   // LOAD CAMPAIGNS
//   // ============================================================

//   const loadCampaigns = useCallback(async () => {
//     try {
//       const response = await campaignApi.list({
//         limit: 200,
//         offset: 0,
//       });

//       const data = getResponseData(response);

//       // Supports both { total, items } and Axios response formats.
//       const items = Array.isArray(data?.items)
//         ? data.items
//         : Array.isArray(data?.data?.items)
//           ? data.data.items
//           : Array.isArray(data)
//             ? data
//             : [];

//       console.log("Campaign API response:", response);
//       console.log("Campaigns received:", items);

//       setCampaigns(items);
//     } catch (error) {
//       console.error("Failed to load campaigns:", error);
//       console.error(
//         "Campaign API error:",
//         error.response?.data || error.message
//       );
//     }
//   }, []);

//   // ============================================================
//   // LOAD CAMPAIGN STATISTICS
//   // ============================================================

//   const loadStats = useCallback(async () => {
//     try {
//       const response = await campaignApi.stats();

//       const data = getResponseData(response);

//       const statsData = data?.data ?? data ?? {};

//       console.log("Campaign stats response:", response);

//       setStats({
//         total_calls: statsData.total_calls ?? 0,
//         credits_consumed:
//           statsData.credits_consumed ??
//           statsData.credits_used ??
//           0,
//         running_calls: statsData.running_calls ?? 0,
//         avg_success: statsData.avg_success ?? 0,
//         active: statsData.active ?? 0,
//         scheduled: statsData.scheduled ?? 0,
//       });
//     } catch (error) {
//       console.error("Failed to load campaign statistics:", error);
//       console.error(
//         "Stats API error:",
//         error.response?.data || error.message
//       );
//     }
//   }, []);

//   // ============================================================
//   // INITIAL LOAD
//   // ============================================================

//   const loadCampaignData = useCallback(() => {
//     loadCampaigns();
//     loadStats();
//   }, [loadCampaigns, loadStats]);

//   useEffect(() => {
//     loadCampaignData();
//   }, [loadCampaignData]);

//   // ============================================================
//   // FILTER CAMPAIGNS
//   // ============================================================

//   const filteredCampaigns = campaigns.filter((c) => {
//     const matchesTab =
//       activeTab === "All" ||
//       (c.status || "").toLowerCase() === activeTab.toLowerCase();

//     const matchesSearch = (c.name || "")
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());

//     return matchesTab && matchesSearch;
//   });

//   // ============================================================
//   // UI
//   // ============================================================

//   return (
//     <div className="min-h-screen bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
//       <main className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-7">

//         {/* ============ PAGE HEADER ============ */}

//         <section>
//           <div className="flex flex-wrap items-center gap-2">
//             <h1 className="text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
//               Campaigns
//             </h1>

//             <HelpCircle size={15} className="text-zinc-400" />
//           </div>

//           <div className="mt-1.5 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-500">
//             <span>
//               <span className="font-semibold text-zinc-900 dark:text-zinc-200">
//                 {campaigns.length}
//               </span>{" "}
//               total campaign{campaigns.length !== 1 ? "s" : ""}
//             </span>

//             <span>•</span>

//             <span className="font-mono text-xs">
//               # 012854ee...681e
//             </span>
//           </div>
//         </section>

//         {/* ============ SIX STAT CARDS ============ */}

//         <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

//           <StatCard
//             icon={Users}
//             label="Total Calls"
//             value={stats.total_calls}
//           />

//           <StatCard
//             icon={Coins}
//             label="Credits Consumed"
//             value={stats.credits_consumed}
//           />

//           <StatCard
//             icon={PhoneCall}
//             label="Running Calls"
//             value={stats.running_calls}
//             accent
//           />

//           <StatCard
//             icon={TrendingUp}
//             label="Avg Success"
//             value={`${stats.avg_success}%`}
//             success
//           />

//           <StatCard
//             icon={PlayCircle}
//             label="Active"
//             value={stats.active}
//           />

//           <StatCard
//             icon={Calendar}
//             label="Scheduled"
//             value={stats.scheduled}
//           />

//         </section>

//         {/* ============ TABS + SEARCH ============ */}

//         <section className="flex flex-wrap items-center justify-between gap-3">
//           <div className="flex rounded-lg border border-black/[0.08] bg-white p-1 dark:border-white/[0.08] dark:bg-[#101012]">
//             {tabs.map((tab) => (
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

//           <div className="flex h-10 w-full max-w-md items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-sm text-zinc-500 dark:border-white/[0.08] dark:bg-[#101012]">
//             <Search size={14} />

//             <input
//               type="text"
//               placeholder="Search campaigns..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="min-w-0 flex-1 bg-transparent text-[13px] text-zinc-800 outline-none placeholder:text-zinc-500 dark:text-zinc-200"
//             />
//           </div>
//         </section>

//         {/* ============ EMPTY STATE / LIST ============ */}

//         <section>
//           {filteredCampaigns.length === 0 ? (
//             <div className="rounded-2xl border border-dashed border-black/[0.10] bg-white py-24 text-center dark:border-white/[0.08] dark:bg-[#101012]">
//               <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-black/[0.06] bg-zinc-50 dark:border-white/[0.08] dark:bg-white/[0.02]">
//                 <Search
//                   size={26}
//                   className="text-zinc-400 dark:text-zinc-500"
//                 />
//               </div>

//               <h3 className="mt-5 text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
//                 No campaigns found
//               </h3>

//               <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-zinc-500">
//                 We couldn't find any campaigns matching your current filters or
//                 search query.
//               </p>

//               <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
//                 <button
//                   onClick={() => {
//                     setActiveTab("All");
//                     setSearchQuery("");
//                   }}
//                   className="rounded-lg border border-black/[0.08] bg-white px-4 py-2 text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-300 dark:hover:bg-white/[0.04]"
//                 >
//                   Clear all filters
//                 </button>

//                 <button
//                   onClick={() => navigate("/outbound/new")}
//                   className="rounded-lg bg-cyan-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-cyan-400 dark:bg-cyan-400 dark:text-slate-950"
//                 >
//                   Create first campaign
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
//               {filteredCampaigns.map((c) => (
//                 <div
//                   key={c.id}
//                   onClick={() => navigate(`/outbound/${c.id}`)}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter" || e.key === " ") {
//                       e.preventDefault();
//                       navigate(`/outbound/${c.id}`);
//                     }
//                   }}
//                   role="button"
//                   tabIndex={0}
//                   className="cursor-pointer rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]"
//                 >
//                   <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
//                     {c.name}
//                   </h3>

//                   <p className="mt-1 text-[12px] text-zinc-500">
//                     {(c.status || "draft").charAt(0).toUpperCase() +
//                       (c.status || "draft").slice(1)}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>
//       </main>
//     </div>
//   );
// }






import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import config from "../../../config/Config";
import { useNavigate } from "react-router-dom";
import {
  HelpCircle,
  Users,
  PhoneCall,
  TrendingUp,
  PlayCircle,
  Calendar,
  Search,
  Coins,
} from "lucide-react";

// ============================================================
// OUTBOUND API  (campaigns, campaign contacts, trigger call, lookups)
// Other outbound files import { campaignApi, outboundApi, api, getApiError }
// from "./Outboundcalls"
// ============================================================

const getAccessToken = () => {
  const directToken =
    localStorage.getItem("access_token") ||
    localStorage.getItem("accessToken");

  if (directToken) return directToken.trim();

  try {
    const auth = JSON.parse(localStorage.getItem("ravanai_auth") || "{}");
    return String(auth.token || auth.access_token || "").trim();
  } catch {
    return "";
  }
};

export const api = axios.create({
  baseURL: config.BASE_URL,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

// Attach the login token to every request
api.interceptors.request.use((requestConfig) => {
  const token = getAccessToken();
  if (token) requestConfig.headers.Authorization = `Bearer ${token}`;
  return requestConfig;
});

export const getApiError = (err, fallback) => {
  const detail = err?.response?.data?.detail ?? err?.response?.data?.message;
  if (Array.isArray(detail)) {
    return detail.map((item) => item?.msg || item?.message || String(item)).filter(Boolean).join(", ");
  }
  return detail || err?.message || fallback;
};

// /api/v1/campaigns/*  (returns the full axios response: use response.data)
export const campaignApi = {
  list: (params = {}) => api.get("/campaigns", { params }),
  stats: (params = {}) => api.get("/campaigns/stats", { params }),
  get: (campaignId) => api.get(`/campaigns/${campaignId}`),
  create: (payload) => api.post("/campaigns", payload),
  update: (campaignId, payload) => api.patch(`/campaigns/${campaignId}`, payload),
  remove: (campaignId) => api.delete(`/campaigns/${campaignId}`),

  start: (campaignId) => api.post(`/campaigns/${campaignId}/start`),
  pause: (campaignId) => api.post(`/campaigns/${campaignId}/pause`),
  resume: (campaignId) => api.post(`/campaigns/${campaignId}/resume`),

  listContacts: (campaignId, params = {}) =>
    api.get(`/campaigns/${campaignId}/contacts`, { params }),
  addContacts: (campaignId, payload) =>
    api.post(`/campaigns/${campaignId}/contacts`, payload),
  removeContact: (campaignId, contactId) =>
    api.delete(`/campaigns/${campaignId}/contacts/${contactId}`),

  // lookups used by the Add Campaign wizard
  listAgents: (params = {}) => api.get("/agents", { params }),
  listPhoneNumbers: (params = {}) => api.get("/phone-numbers", { params }),
};

// /api/v1/outbound/call
// payload: { campaign_id, contact_id, agent_id, phone_number_id,
//            to_number (E.164, e.g. "+919876543210"), metadata }
export const outboundApi = {
  async triggerCall(payload) {
    try {
      const { data } = await api.post("/outbound/call", payload);
      return data;
    } catch (error) {
      throw new Error(getApiError(error, "Failed to trigger outbound call."));
    }
  },
};

// ============================================================
// STAT CARD
// ============================================================

function StatCard({
  icon: Icon,
  label,
  value,
  accent = false,
  success = false,
}) {
  return (
    <div
      className={`
        rounded-2xl border p-4
        transition
        ${
          accent
            ? "border-cyan-500/25 bg-cyan-500/[0.04]"
            : "border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]"
        }
      `}
    >
      <div className="mb-5 flex items-center justify-between">
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
          success
            ? "text-emerald-600 dark:text-emerald-400"
            : accent
              ? "text-cyan-600 dark:text-cyan-400"
              : "text-zinc-900 dark:text-zinc-100"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

// ============================================================
// RESPONSE HELPERS
// ============================================================

const getResponseData = (response) => {
  return response?.data ?? response;
};

// ============================================================
// MAIN PAGE
// ============================================================

export default function OutboundCalls() {
  const navigate = useNavigate();

  const [campaigns, setCampaigns] = useState([]);

  const [stats, setStats] = useState({
    total_calls: 0,
    credits_consumed: 0,
    running_calls: 0,
    avg_success: 0,
    active: 0,
    scheduled: 0,
  });

  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = ["All", "Active", "Scheduled", "Paused"];

  // ============================================================
  // LOAD CAMPAIGNS
  // ============================================================

  const loadCampaigns = useCallback(async () => {
    try {
      const response = await campaignApi.list({
        limit: 200,
        offset: 0,
      });

      const data = getResponseData(response);

      // Supports both { total, items } and Axios response formats.
      const items = Array.isArray(data?.items)
        ? data.items
        : Array.isArray(data?.data?.items)
          ? data.data.items
          : Array.isArray(data)
            ? data
            : [];

      console.log("Campaign API response:", response);
      console.log("Campaigns received:", items);

      setCampaigns(items);
    } catch (error) {
      console.error("Failed to load campaigns:", error);
      console.error(
        "Campaign API error:",
        error.response?.data || error.message
      );
    }
  }, []);

  // ============================================================
  // LOAD CAMPAIGN STATISTICS
  // ============================================================

  const loadStats = useCallback(async () => {
    try {
      const response = await campaignApi.stats();

      const data = getResponseData(response);

      const statsData = data?.data ?? data ?? {};

      console.log("Campaign stats response:", response);

      setStats({
        total_calls: statsData.total_calls ?? 0,
        credits_consumed:
          statsData.credits_consumed ??
          statsData.credits_used ??
          0,
        running_calls: statsData.running_calls ?? 0,
        avg_success: statsData.avg_success ?? 0,
        active: statsData.active ?? 0,
        scheduled: statsData.scheduled ?? 0,
      });
    } catch (error) {
      console.error("Failed to load campaign statistics:", error);
      console.error(
        "Stats API error:",
        error.response?.data || error.message
      );
    }
  }, []);

  // ============================================================
  // INITIAL LOAD
  // ============================================================

  const loadCampaignData = useCallback(() => {
    loadCampaigns();
    loadStats();
  }, [loadCampaigns, loadStats]);

  useEffect(() => {
    loadCampaignData();
  }, [loadCampaignData]);

  // ============================================================
  // FILTER CAMPAIGNS
  // ============================================================

  const filteredCampaigns = campaigns.filter((c) => {
    const matchesTab =
      activeTab === "All" ||
      (c.status || "").toLowerCase() === activeTab.toLowerCase();

    const matchesSearch = (c.name || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
      <main className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-7">

        {/* ============ PAGE HEADER ============ */}

        <section>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
              Campaigns
            </h1>

            <HelpCircle size={15} className="text-zinc-400" />
          </div>

          <div className="mt-1.5 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-500">
            <span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                {campaigns.length}
              </span>{" "}
              total campaign{campaigns.length !== 1 ? "s" : ""}
            </span>

            <span>•</span>

            <span className="font-mono text-xs">
              # 012854ee...681e
            </span>
          </div>
        </section>

        {/* ============ SIX STAT CARDS ============ */}

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

          <StatCard
            icon={Users}
            label="Total Calls"
            value={stats.total_calls}
          />

          <StatCard
            icon={Coins}
            label="Credits Consumed"
            value={stats.credits_consumed}
          />

          <StatCard
            icon={PhoneCall}
            label="Running Calls"
            value={stats.running_calls}
            accent
          />

          <StatCard
            icon={TrendingUp}
            label="Avg Success"
            value={`${stats.avg_success}%`}
            success
          />

          <StatCard
            icon={PlayCircle}
            label="Active"
            value={stats.active}
          />

          <StatCard
            icon={Calendar}
            label="Scheduled"
            value={stats.scheduled}
          />

        </section>

        {/* ============ TABS + SEARCH ============ */}

        <section className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex rounded-lg border border-black/[0.08] bg-white p-1 dark:border-white/[0.08] dark:bg-[#101012]">
            {tabs.map((tab) => (
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

          <div className="flex h-10 w-full max-w-md items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-sm text-zinc-500 dark:border-white/[0.08] dark:bg-[#101012]">
            <Search size={14} />

            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="min-w-0 flex-1 bg-transparent text-[13px] text-zinc-800 outline-none placeholder:text-zinc-500 dark:text-zinc-200"
            />
          </div>
        </section>

        {/* ============ EMPTY STATE / LIST ============ */}

        <section>
          {filteredCampaigns.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-black/[0.10] bg-white py-24 text-center dark:border-white/[0.08] dark:bg-[#101012]">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-black/[0.06] bg-zinc-50 dark:border-white/[0.08] dark:bg-white/[0.02]">
                <Search
                  size={26}
                  className="text-zinc-400 dark:text-zinc-500"
                />
              </div>

              <h3 className="mt-5 text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
                No campaigns found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-zinc-500">
                We couldn't find any campaigns matching your current filters or
                search query.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => {
                    setActiveTab("All");
                    setSearchQuery("");
                  }}
                  className="rounded-lg border border-black/[0.08] bg-white px-4 py-2 text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-transparent dark:text-zinc-300 dark:hover:bg-white/[0.04]"
                >
                  Clear all filters
                </button>

                <button
                  onClick={() => navigate("/outbound/new")}
                  className="rounded-lg bg-cyan-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-cyan-400 dark:bg-cyan-400 dark:text-slate-950"
                >
                  Create first campaign
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredCampaigns.map((c) => (
                <div
                  key={c.id}
                  onClick={() => navigate(`/outbound/${c.id}`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      navigate(`/outbound/${c.id}`);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className="cursor-pointer rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]"
                >
                  <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
                    {c.name}
                  </h3>

                  <p className="mt-1 text-[12px] text-zinc-500">
                    {(c.status || "draft").charAt(0).toUpperCase() +
                      (c.status || "draft").slice(1)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}