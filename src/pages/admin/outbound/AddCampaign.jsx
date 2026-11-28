// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   ArrowLeft,
//   Pencil,
//   Bot,
//   Phone,
//   Search,
//   Check,
// } from "lucide-react";

// import config from "../../config/Config";
// import campaignApi from "../../api/campaignApi";

// export default function AddCampaign() {
//   const navigate = useNavigate();

//   const [step, setStep] = useState(1);
//   const [campaignName, setCampaignName] = useState("");
//   const [selectedAgent, setSelectedAgent] = useState(null);
//   const [selectedPhoneNumber, setSelectedPhoneNumber] = useState(null);
//   const [agentSearch, setAgentSearch] = useState("");

//   const [availableAgents, setAvailableAgents] = useState([]);
//   const [availablePhoneNumbers, setAvailablePhoneNumbers] = useState([]);

//   const [loadingAgents, setLoadingAgents] = useState(true);
//   const [loadingPhoneNumbers, setLoadingPhoneNumbers] = useState(true);
//   const [creating, setCreating] = useState(false);
//   const [error, setError] = useState("");

//   // ============================================================
//   // AUTH TOKEN
//   // ============================================================

//   const getToken = () => {
//     const directToken = localStorage.getItem("access_token");

//     if (directToken) return directToken;

//     try {
//       const auth = JSON.parse(
//         localStorage.getItem("ravanai_auth") || "{}"
//       );

//       return auth.token || auth.access_token || null;
//     } catch {
//       return null;
//     }
//   };

//   const getAuthHeaders = () => {
//     const token = getToken();

//     return token
//       ? { Authorization: `Bearer ${token}` }
//       : {};
//   };

//   // ============================================================
//   // GET AGENTS
//   // ============================================================

//   useEffect(() => {
//     const fetchAgents = async () => {
//       try {
//         setLoadingAgents(true);

//         const response = await axios.get(
//           `${config.BASE_URL}/agents`,
//           {
//             headers: getAuthHeaders(),
//           }
//         );

//         const data = response.data?.data ?? response.data;

//         const agents = Array.isArray(data?.items)
//           ? data.items
//           : [];

//         const activeAgents = agents.filter(
//           (agent) =>
//             String(agent.status).toLowerCase() === "active"
//         );

//         setAvailableAgents(activeAgents);
//       } catch (err) {
//         console.error("Failed to load agents:", err);

//         setError(
//           err.response?.data?.detail ||
//           err.response?.data?.message ||
//           "Failed to load agents."
//         );
//       } finally {
//         setLoadingAgents(false);
//       }
//     };

//     fetchAgents();
//   }, []);

//   // ============================================================
//   // GET ACTIVE PHONE NUMBERS
//   // ============================================================

//   useEffect(() => {
//     const fetchPhoneNumbers = async () => {
//       try {
//         setLoadingPhoneNumbers(true);

//         const response = await axios.get(
//           `${config.BASE_URL}/phone-numbers`,
//           {
//             params: {
//               is_active: true,
//             },
//             headers: getAuthHeaders(),
//           }
//         );

//         const data = response.data?.data ?? response.data;

//         const phoneNumbers = Array.isArray(data?.items)
//           ? data.items
//           : Array.isArray(data)
//             ? data
//             : [];

//         const activeNumbers = phoneNumbers.filter((number) => {
//           if (number.is_active !== undefined) {
//             return number.is_active === true;
//           }

//           if (number.status !== undefined) {
//             return (
//               String(number.status).toLowerCase() === "active"
//             );
//           }

//           return true;
//         });

//         setAvailablePhoneNumbers(activeNumbers);
//       } catch (err) {
//         console.error("Failed to load phone numbers:", err);

//         setError(
//           err.response?.data?.detail ||
//           err.response?.data?.message ||
//           "Failed to load phone numbers."
//         );
//       } finally {
//         setLoadingPhoneNumbers(false);
//       }
//     };

//     fetchPhoneNumbers();
//   }, []);

//   // ============================================================
//   // FILTER AGENTS
//   // ============================================================

//   const filteredAgents = availableAgents.filter((agent) =>
//     agent.name?.toLowerCase().includes(agentSearch.toLowerCase())
//   );

//   // ============================================================
//   // PHONE NUMBER DISPLAY
//   // ============================================================

//   const getPhoneNumberLabel = (number) => {
//     return (
//       number.phone_number ||
//       number.number ||
//       number.phone ||
//       number.formatted_number ||
//       number.e164_number ||
//       number.name ||
//       "Phone number"
//     );
//   };

//   // ============================================================
//   // VALIDATION
//   // ALL THREE FIELDS ARE REQUIRED
//   // ============================================================

//   const canContinue =
//     campaignName.trim().length > 0 &&
//     selectedAgent !== null &&
//     selectedPhoneNumber !== null &&
//     !loadingAgents &&
//     !loadingPhoneNumbers;

//   const canCreate = canContinue && !creating;

//   // ============================================================
//   // CREATE CAMPAIGN
//   // ============================================================

//   const handleContinue = async () => {
//     setError("");

//     // Prevent proceeding until all required fields are selected
//     if (!canContinue || creating) return;

//     // Step 1: Move to confirmation/creation step
//     if (step === 1) {
//       setStep(2);
//       return;
//     }

//     // Step 2: Create campaign
//     if (!canCreate) return;

//     try {
//       setCreating(true);

//       const payload = {
//         name: campaignName.trim(),
//         agent_id: selectedAgent.id,
//         phone_number_id: selectedPhoneNumber.id,
//         settings: {},
//       };

//       console.log("Creating campaign with payload:", payload);

//       const response = await campaignApi.create(payload);
//       const createdCampaign = response?.data?.data ?? response?.data;

//       // Open the new campaign so contacts can be added and it can be started
//       navigate(
//         createdCampaign?.id
//           ? `/outbound/${createdCampaign.id}`
//           : "/outbound"
//       );
//     } catch (err) {
//       console.error("Campaign creation failed:", err);

//       setError(
//         err.response?.data?.detail ||
//         err.response?.data?.message ||
//         err.message ||
//         "Failed to create campaign."
//       );
//     } finally {
//       setCreating(false);
//     }
//   };

//   // ============================================================
//   // UI
//   // ============================================================

//   return (
//     <div className="min-h-screen bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">

//       {/* ============ TOP BAR ============ */}

//       <div className="sticky top-0 z-20 border-b border-black/[0.06] bg-zinc-100/95 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#09090B]/95">
//         <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

//           <div className="flex items-center gap-3">
//             <button
//               onClick={() =>
//                 step === 2
//                   ? setStep(1)
//                   : navigate("/outbound")
//               }
//               className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-zinc-500 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-400 dark:hover:bg-white/[0.04]"
//             >
//               <ArrowLeft size={16} />
//             </button>

//             <div>
//               <h1 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
//                 New Campaign
//               </h1>

//               <p className="mt-0.5 text-[11px] text-zinc-500">
//                 Step {step} of 2
//               </p>
//             </div>
//           </div>

//           <button
//             onClick={handleContinue}
//             disabled={!canContinue || creating}
//             className="
//               flex h-9 items-center gap-2
//               rounded-lg bg-cyan-500 px-4
//               text-[13px] font-semibold text-white
//               transition
//               hover:bg-cyan-400
//               disabled:cursor-not-allowed
//               disabled:bg-zinc-300
//               dark:bg-cyan-400 dark:text-slate-950
//               dark:disabled:bg-zinc-700
//             "
//           >
//             {creating
//               ? "Creating..."
//               : step === 2
//                 ? "Create Campaign"
//                 : "Continue"}
//           </button>
//         </div>

//         {/* Progress bar */}

//         <div className="h-0.5 w-full bg-black/[0.05] dark:bg-white/[0.05]">
//           <div
//             className="h-full bg-cyan-500 transition-all duration-500 dark:bg-cyan-400"
//             style={{ width: `${(step / 2) * 100}%` }}
//           />
//         </div>
//       </div>

//       {/* ============ FORM ============ */}

//       <main className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-7">

//         {error && (
//           <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-[13px] text-red-500">
//             {error}
//           </div>
//         )}

//         {/* Campaign Name */}

//         <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">

//           <div className="mb-4 flex items-start gap-3">
//             <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-black/[0.06] bg-zinc-50 dark:border-white/[0.08] dark:bg-white/[0.02]">
//               <Pencil
//                 size={14}
//                 className="text-zinc-500 dark:text-zinc-400"
//               />
//             </div>

//             <div>
//               <h2 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
//                 Campaign Name
//               </h2>

//               <p className="mt-0.5 text-[12px] text-zinc-500">
//                 What should we call this campaign?
//               </p>
//             </div>
//           </div>

//           <input
//             type="text"
//             value={campaignName}
//             onChange={(e) => setCampaignName(e.target.value)}
//             placeholder="e.g., Q1 Customer Outreach"
//             autoFocus
//             className="h-11 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[14px] text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-cyan-400"
//           />
//         </section>

//         {/* AI Agent */}

//         <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">

//           <div className="mb-4 flex items-start justify-between gap-3">
//             <div className="flex items-start gap-3">
//               <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-black/[0.06] bg-zinc-50 dark:border-white/[0.08] dark:bg-white/[0.02]">
//                 <Bot
//                   size={14}
//                   className="text-zinc-500 dark:text-zinc-400"
//                 />
//               </div>

//               <div>
//                 <h2 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
//                   AI Agent
//                 </h2>

//                 <p className="mt-0.5 text-[12px] text-zinc-500">
//                   Select the agent that will handle calls
//                 </p>
//               </div>
//             </div>

//             <span className="text-[11px] text-zinc-500">
//               {availableAgents.length} agent
//               {availableAgents.length !== 1 ? "s" : ""}
//             </span>
//           </div>

//           {/* Search */}

//           <div className="mb-4 flex h-11 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 dark:border-white/[0.08] dark:bg-[#0e0f12]">
//             <Search size={14} className="text-zinc-400" />

//             <input
//               type="text"
//               value={agentSearch}
//               onChange={(e) => setAgentSearch(e.target.value)}
//               placeholder="Search agents..."
//               className="min-w-0 flex-1 bg-transparent text-[13px] text-zinc-800 outline-none placeholder:text-zinc-500 dark:text-zinc-200"
//             />
//           </div>

//           {/* Agent list */}

//           <div className="space-y-2">
//             {loadingAgents ? (
//               <p className="py-4 text-center text-[12px] text-zinc-500">
//                 Loading agents...
//               </p>
//             ) : filteredAgents.length === 0 ? (
//               <p className="py-4 text-center text-[12px] text-zinc-500">
//                 No active agents found.
//               </p>
//             ) : (
//               filteredAgents.map((agent) => {
//                 const initials = agent.name
//                   ?.split(" ")
//                   .map((word) => word[0])
//                   .join("")
//                   .slice(0, 2)
//                   .toUpperCase() || "AI";

//                 const isSelected =
//                   selectedAgent?.id === agent.id;

//                 return (
//                   <button
//                     key={agent.id}
//                     type="button"
//                     onClick={() => setSelectedAgent(agent)}
//                     className={`
//                       flex w-full items-center gap-3
//                       rounded-lg border px-4 py-3
//                       text-left transition
//                       ${
//                         isSelected
//                           ? "border-cyan-500/50 bg-cyan-500/[0.04]"
//                           : "border-black/[0.06] bg-white hover:border-cyan-500/30 dark:border-white/[0.08] dark:bg-white/[0.02]"
//                       }
//                     `}
//                   >
//                     <div
//                       className={`
//                         flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
//                         text-[11px] font-bold
//                         ${
//                           isSelected
//                             ? "bg-cyan-500 text-white dark:bg-cyan-400 dark:text-slate-950"
//                             : "border border-cyan-500/25 bg-cyan-500/[0.06] text-cyan-600 dark:text-cyan-400"
//                         }
//                       `}
//                     >
//                       {initials}
//                     </div>

//                     <div className="min-w-0 flex-1">
//                       <p className="truncate text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
//                         {agent.name}
//                       </p>

//                       <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
//                         {agent.status}
//                       </p>
//                     </div>

//                     {isSelected && (
//                       <Check
//                         size={16}
//                         className="shrink-0 text-cyan-500 dark:text-cyan-400"
//                       />
//                     )}
//                   </button>
//                 );
//               })
//             )}
//           </div>

//           <p className="mt-3 text-[11px] text-zinc-500">
//             Showing {filteredAgents.length} of {availableAgents.length} active
//             agent{availableAgents.length !== 1 ? "s" : ""}
//           </p>
//         </section>

//         {/* Caller ID */}

//         <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">

//           <div className="mb-4 flex items-start justify-between gap-3">
//             <div className="flex items-start gap-3">
//               <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-black/[0.06] bg-zinc-50 dark:border-white/[0.08] dark:bg-white/[0.02]">
//                 <Phone
//                   size={14}
//                   className="text-zinc-500 dark:text-zinc-400"
//                 />
//               </div>

//               <div>
//                 <h2 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
//                   Caller ID
//                 </h2>

//                 <p className="mt-0.5 text-[12px] text-zinc-500">
//                   Phone number to call from
//                 </p>
//               </div>
//             </div>

//             <span className="text-[10px] font-bold uppercase tracking-wider text-red-500">
//               Required
//             </span>
//           </div>

//           {loadingPhoneNumbers ? (
//             <p className="py-3 text-[12px] text-zinc-500">
//               Loading phone numbers...
//             </p>
//           ) : availablePhoneNumbers.length === 0 ? (
//             <p className="text-[13px] text-zinc-500">
//               No active phone numbers.{" "}
//               <button
//                 type="button"
//                 onClick={() => navigate("/phone-numbers")}
//                 className="text-cyan-600 hover:underline dark:text-cyan-400"
//               >
//                 Add one.
//               </button>
//             </p>
//           ) : (
//             <div className="space-y-2">
//               {availablePhoneNumbers.map((number) => {
//                 const isSelected =
//                   selectedPhoneNumber?.id === number.id;

//                 return (
//                   <button
//                     key={number.id}
//                     type="button"
//                     onClick={() => setSelectedPhoneNumber(number)}
//                     className={`
//                       flex w-full items-center gap-3 rounded-lg border px-4 py-3
//                       text-left transition
//                       ${
//                         isSelected
//                           ? "border-cyan-500/50 bg-cyan-500/[0.04]"
//                           : "border-black/[0.06] bg-white hover:border-cyan-500/30 dark:border-white/[0.08] dark:bg-white/[0.02]"
//                       }
//                     `}
//                   >
//                     <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-500/25 bg-cyan-500/[0.06] text-cyan-600 dark:text-cyan-400">
//                       <Phone size={14} />
//                     </div>

//                     <div className="min-w-0 flex-1">
//                       <p className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
//                         {getPhoneNumberLabel(number)}
//                       </p>

//                       <p className="mt-0.5 text-[11px] text-emerald-600 dark:text-emerald-400">
//                         Active
//                       </p>
//                     </div>

//                     {isSelected && (
//                       <Check
//                         size={16}
//                         className="text-cyan-500 dark:text-cyan-400"
//                       />
//                     )}
//                   </button>
//                 );
//               })}
//             </div>
//           )}
//         </section>
//       </main>
//     </div>
//   );
// }









import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Pencil,
  Bot,
  Phone,
  Search,
  Check,
} from "lucide-react";

import { campaignApi } from "./Outboundcalls";

export default function AddCampaign() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [campaignName, setCampaignName] = useState("");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState(null);
  const [agentSearch, setAgentSearch] = useState("");

  const [availableAgents, setAvailableAgents] = useState([]);
  const [availablePhoneNumbers, setAvailablePhoneNumbers] = useState([]);

  const [loadingAgents, setLoadingAgents] = useState(true);
  const [loadingPhoneNumbers, setLoadingPhoneNumbers] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  // ============================================================
  // GET AGENTS
  // ============================================================

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoadingAgents(true);

        const response = await campaignApi.listAgents();

        const data = response.data?.data ?? response.data;

        const agents = Array.isArray(data?.items)
          ? data.items
          : [];

        const activeAgents = agents.filter(
          (agent) =>
            String(agent.status).toLowerCase() === "active"
        );

        setAvailableAgents(activeAgents);
      } catch (err) {
        console.error("Failed to load agents:", err);

        setError(
          err.response?.data?.detail ||
          err.response?.data?.message ||
          "Failed to load agents."
        );
      } finally {
        setLoadingAgents(false);
      }
    };

    fetchAgents();
  }, []);

  // ============================================================
  // GET ACTIVE PHONE NUMBERS
  // ============================================================

  useEffect(() => {
    const fetchPhoneNumbers = async () => {
      try {
        setLoadingPhoneNumbers(true);

        const response = await campaignApi.listPhoneNumbers({ is_active: true });

        const data = response.data?.data ?? response.data;

        const phoneNumbers = Array.isArray(data?.items)
          ? data.items
          : Array.isArray(data)
            ? data
            : [];

        const activeNumbers = phoneNumbers.filter((number) => {
          if (number.is_active !== undefined) {
            return number.is_active === true;
          }

          if (number.status !== undefined) {
            return (
              String(number.status).toLowerCase() === "active"
            );
          }

          return true;
        });

        setAvailablePhoneNumbers(activeNumbers);
      } catch (err) {
        console.error("Failed to load phone numbers:", err);

        setError(
          err.response?.data?.detail ||
          err.response?.data?.message ||
          "Failed to load phone numbers."
        );
      } finally {
        setLoadingPhoneNumbers(false);
      }
    };

    fetchPhoneNumbers();
  }, []);

  // ============================================================
  // FILTER AGENTS
  // ============================================================

  const filteredAgents = availableAgents.filter((agent) =>
    agent.name?.toLowerCase().includes(agentSearch.toLowerCase())
  );

  // ============================================================
  // PHONE NUMBER DISPLAY
  // ============================================================

  const getPhoneNumberLabel = (number) => {
    return (
      number.phone_number ||
      number.number ||
      number.phone ||
      number.formatted_number ||
      number.e164_number ||
      number.name ||
      "Phone number"
    );
  };

  // ============================================================
  // VALIDATION
  // ALL THREE FIELDS ARE REQUIRED
  // ============================================================

  const canContinue =
    campaignName.trim().length > 0 &&
    selectedAgent !== null &&
    selectedPhoneNumber !== null &&
    !loadingAgents &&
    !loadingPhoneNumbers;

  const canCreate = canContinue && !creating;

  // ============================================================
  // CREATE CAMPAIGN
  // ============================================================

  const handleContinue = async () => {
    setError("");

    // Prevent proceeding until all required fields are selected
    if (!canContinue || creating) return;

    // Step 1: Move to confirmation/creation step
    if (step === 1) {
      setStep(2);
      return;
    }

    // Step 2: Create campaign
    if (!canCreate) return;

    try {
      setCreating(true);

      const payload = {
        name: campaignName.trim(),
        agent_id: selectedAgent.id,
        phone_number_id: selectedPhoneNumber.id,
        settings: {},
      };

      console.log("Creating campaign with payload:", payload);

      const response = await campaignApi.create(payload);
      const createdCampaign = response?.data?.data ?? response?.data;

      // Open the new campaign so contacts can be added and it can be started
      navigate(
        createdCampaign?.id
          ? `/outbound/${createdCampaign.id}`
          : "/outbound"
      );
    } catch (err) {
      console.error("Campaign creation failed:", err);

      setError(
        err.response?.data?.detail ||
        err.response?.data?.message ||
        err.message ||
        "Failed to create campaign."
      );
    } finally {
      setCreating(false);
    }
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">

      {/* ============ TOP BAR ============ */}

      <div className="sticky top-0 z-20 border-b border-black/[0.06] bg-zinc-100/95 backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#09090B]/95">
        <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                step === 2
                  ? setStep(1)
                  : navigate("/outbound")
              }
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-zinc-500 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-400 dark:hover:bg-white/[0.04]"
            >
              <ArrowLeft size={16} />
            </button>

            <div>
              <h1 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
                New Campaign
              </h1>

              <p className="mt-0.5 text-[11px] text-zinc-500">
                Step {step} of 2
              </p>
            </div>
          </div>

          <button
            onClick={handleContinue}
            disabled={!canContinue || creating}
            className="
              flex h-9 items-center gap-2
              rounded-lg bg-cyan-500 px-4
              text-[13px] font-semibold text-white
              transition
              hover:bg-cyan-400
              disabled:cursor-not-allowed
              disabled:bg-zinc-300
              dark:bg-cyan-400 dark:text-slate-950
              dark:disabled:bg-zinc-700
            "
          >
            {creating
              ? "Creating..."
              : step === 2
                ? "Create Campaign"
                : "Continue"}
          </button>
        </div>

        {/* Progress bar */}

        <div className="h-0.5 w-full bg-black/[0.05] dark:bg-white/[0.05]">
          <div
            className="h-full bg-cyan-500 transition-all duration-500 dark:bg-cyan-400"
            style={{ width: `${(step / 2) * 100}%` }}
          />
        </div>
      </div>

      {/* ============ FORM ============ */}

      <main className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-7">

        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-[13px] text-red-500">
            {error}
          </div>
        )}

        {/* Campaign Name */}

        <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">

          <div className="mb-4 flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-black/[0.06] bg-zinc-50 dark:border-white/[0.08] dark:bg-white/[0.02]">
              <Pencil
                size={14}
                className="text-zinc-500 dark:text-zinc-400"
              />
            </div>

            <div>
              <h2 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
                Campaign Name
              </h2>

              <p className="mt-0.5 text-[12px] text-zinc-500">
                What should we call this campaign?
              </p>
            </div>
          </div>

          <input
            type="text"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            placeholder="e.g., Q1 Customer Outreach"
            autoFocus
            className="h-11 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[14px] text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-cyan-400"
          />
        </section>

        {/* AI Agent */}

        <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">

          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-black/[0.06] bg-zinc-50 dark:border-white/[0.08] dark:bg-white/[0.02]">
                <Bot
                  size={14}
                  className="text-zinc-500 dark:text-zinc-400"
                />
              </div>

              <div>
                <h2 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
                  AI Agent
                </h2>

                <p className="mt-0.5 text-[12px] text-zinc-500">
                  Select the agent that will handle calls
                </p>
              </div>
            </div>

            <span className="text-[11px] text-zinc-500">
              {availableAgents.length} agent
              {availableAgents.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Search */}

          <div className="mb-4 flex h-11 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 dark:border-white/[0.08] dark:bg-[#0e0f12]">
            <Search size={14} className="text-zinc-400" />

            <input
              type="text"
              value={agentSearch}
              onChange={(e) => setAgentSearch(e.target.value)}
              placeholder="Search agents..."
              className="min-w-0 flex-1 bg-transparent text-[13px] text-zinc-800 outline-none placeholder:text-zinc-500 dark:text-zinc-200"
            />
          </div>

          {/* Agent list */}

          <div className="space-y-2">
            {loadingAgents ? (
              <p className="py-4 text-center text-[12px] text-zinc-500">
                Loading agents...
              </p>
            ) : filteredAgents.length === 0 ? (
              <p className="py-4 text-center text-[12px] text-zinc-500">
                No active agents found.
              </p>
            ) : (
              filteredAgents.map((agent) => {
                const initials = agent.name
                  ?.split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase() || "AI";

                const isSelected =
                  selectedAgent?.id === agent.id;

                return (
                  <button
                    key={agent.id}
                    type="button"
                    onClick={() => setSelectedAgent(agent)}
                    className={`
                      flex w-full items-center gap-3
                      rounded-lg border px-4 py-3
                      text-left transition
                      ${
                        isSelected
                          ? "border-cyan-500/50 bg-cyan-500/[0.04]"
                          : "border-black/[0.06] bg-white hover:border-cyan-500/30 dark:border-white/[0.08] dark:bg-white/[0.02]"
                      }
                    `}
                  >
                    <div
                      className={`
                        flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
                        text-[11px] font-bold
                        ${
                          isSelected
                            ? "bg-cyan-500 text-white dark:bg-cyan-400 dark:text-slate-950"
                            : "border border-cyan-500/25 bg-cyan-500/[0.06] text-cyan-600 dark:text-cyan-400"
                        }
                      `}
                    >
                      {initials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
                        {agent.name}
                      </p>

                      <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        {agent.status}
                      </p>
                    </div>

                    {isSelected && (
                      <Check
                        size={16}
                        className="shrink-0 text-cyan-500 dark:text-cyan-400"
                      />
                    )}
                  </button>
                );
              })
            )}
          </div>

          <p className="mt-3 text-[11px] text-zinc-500">
            Showing {filteredAgents.length} of {availableAgents.length} active
            agent{availableAgents.length !== 1 ? "s" : ""}
          </p>
        </section>

        {/* Caller ID */}

        <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">

          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-black/[0.06] bg-zinc-50 dark:border-white/[0.08] dark:bg-white/[0.02]">
                <Phone
                  size={14}
                  className="text-zinc-500 dark:text-zinc-400"
                />
              </div>

              <div>
                <h2 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
                  Caller ID
                </h2>

                <p className="mt-0.5 text-[12px] text-zinc-500">
                  Phone number to call from
                </p>
              </div>
            </div>

            <span className="text-[10px] font-bold uppercase tracking-wider text-red-500">
              Required
            </span>
          </div>

          {loadingPhoneNumbers ? (
            <p className="py-3 text-[12px] text-zinc-500">
              Loading phone numbers...
            </p>
          ) : availablePhoneNumbers.length === 0 ? (
            <p className="text-[13px] text-zinc-500">
              No active phone numbers.{" "}
              <button
                type="button"
                onClick={() => navigate("/phone-numbers")}
                className="text-cyan-600 hover:underline dark:text-cyan-400"
              >
                Add one.
              </button>
            </p>
          ) : (
            <div className="space-y-2">
              {availablePhoneNumbers.map((number) => {
                const isSelected =
                  selectedPhoneNumber?.id === number.id;

                return (
                  <button
                    key={number.id}
                    type="button"
                    onClick={() => setSelectedPhoneNumber(number)}
                    className={`
                      flex w-full items-center gap-3 rounded-lg border px-4 py-3
                      text-left transition
                      ${
                        isSelected
                          ? "border-cyan-500/50 bg-cyan-500/[0.04]"
                          : "border-black/[0.06] bg-white hover:border-cyan-500/30 dark:border-white/[0.08] dark:bg-white/[0.02]"
                      }
                    `}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-500/25 bg-cyan-500/[0.06] text-cyan-600 dark:text-cyan-400">
                      <Phone size={14} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
                        {getPhoneNumberLabel(number)}
                      </p>

                      <p className="mt-0.5 text-[11px] text-emerald-600 dark:text-emerald-400">
                        Active
                      </p>
                    </div>

                    {isSelected && (
                      <Check
                        size={16}
                        className="text-cyan-500 dark:text-cyan-400"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}