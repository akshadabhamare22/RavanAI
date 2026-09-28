// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   Clock3,
//   Bot,
//   PhoneCall,
//   Coins,
//   Target,
//   Zap,
//   CheckCircle2,
//   XCircle,
//   PhoneOutgoing,
//   Info,
//   Plus,
//   Zap as ZapIcon,
//   UserPlus,
//   Smartphone,
//   ChevronRight,
//   TrendingUp,
// } from "lucide-react";

// import GlobalReach from "../../components/GlobalReach";

// // ============================================================
// // SHARED CARD STYLE
// // ============================================================

// const CARD = `
//   rounded-2xl border border-black/[0.07] bg-white
//   transition-all duration-300 ease-out
//   hover:-translate-y-[1px] hover:border-cyan-400/30
//   hover:shadow-[0_4px_20px_-8px_rgba(6,182,212,0.15)]
//   dark:border-white/[0.08] dark:bg-[#101012]
//   dark:hover:border-cyan-400/25
//   dark:hover:shadow-[0_4px_20px_-8px_rgba(34,211,238,0.12)]
// `;

// // ============================================================
// // STAT CARD
// // ============================================================

// const StatCard = ({ icon: Icon, label, value, live = false, accent = false }) => {
//   return (
//     <div
//       className={`
//         ${CARD}
//         relative overflow-hidden p-4
//         ${
//           accent
//             ? "border-cyan-400/40 bg-cyan-50/40 dark:border-cyan-400/25 dark:bg-cyan-500/[0.05]"
//             : ""
//         }
//       `}
//     >
//       <div className="mb-5 flex items-center justify-between">
//         <div
//           className={`
//             flex h-8 w-8 items-center justify-center rounded-lg
//             ${
//               accent
//                 ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400"
//                 : "bg-zinc-100 text-zinc-500 dark:bg-white/[0.06] dark:text-zinc-400"
//             }
//           `}
//         >
//           <Icon size={15} strokeWidth={1.8} />
//         </div>

//         {live && (
//           <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
//             <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
//             Live
//           </div>
//         )}
//       </div>

//       <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.08em] text-zinc-500">
//         {label}
//       </p>

//       <div
//         className={`text-[22px] font-semibold tracking-tight ${
//           accent
//             ? "text-cyan-600 dark:text-cyan-400"
//             : "text-zinc-900 dark:text-zinc-100"
//         }`}
//       >
//         {value}
//       </div>
//     </div>
//   );
// };

// // ============================================================
// // USAGE TRENDS
// // ============================================================

// const UsageTrends = () => {
//   const [period, setPeriod] = useState("Month");
//   const periods = ["Day", "Week", "Month"];

//   const chartWidth = 620;
//   const chartHeight = 160;
//   const xLabels = ["Aug 26", "Aug 31", "Sep 5", "Sep 10", "Sep 15", "Sep 20"];

//   return (
//     <div className={`${CARD} p-5`}>
//       <div className="flex flex-wrap items-start justify-between gap-3">
//         <div>
//           <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
//             Usage Trends
//           </h3>
//           <p className="mt-1 text-xs text-zinc-500">
//             {period === "Day"
//               ? "Last 24 hours"
//               : period === "Week"
//                 ? "Last 7 days"
//                 : "Last 30 days"}
//           </p>
//         </div>

//         <div className="flex rounded-lg border border-black/[0.08] bg-white p-1 dark:border-white/[0.08] dark:bg-[#17171A]">
//           {periods.map((item) => (
//             <button
//               key={item}
//               onClick={() => setPeriod(item)}
//               className={`rounded-md px-3 py-1 text-[11px] font-medium transition-colors ${
//                 period === item
//                   ? "bg-cyan-500/15 font-semibold text-cyan-600 dark:text-cyan-400"
//                   : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
//               }`}
//             >
//               {item}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="mt-6">
//         <svg
//           viewBox={`0 0 ${chartWidth} ${chartHeight + 28}`}
//           className="h-[210px] w-full"
//           preserveAspectRatio="none"
//         >
//           {[0, 1, 2, 3, 4].map((line) => {
//             const y = chartHeight - (line / 4) * chartHeight;
//             return (
//               <g key={line}>
//                 <line
//                   x1="30"
//                   y1={y}
//                   x2={chartWidth}
//                   y2={y}
//                   stroke="currentColor"
//                   className="text-zinc-100 dark:text-zinc-800"
//                   strokeWidth="1"
//                 />
//                 <text
//                   x="14"
//                   y={y + 4}
//                   fill="currentColor"
//                   className="text-zinc-400"
//                   fontSize="10"
//                   textAnchor="middle"
//                 >
//                   {line}
//                 </text>
//               </g>
//             );
//           })}

//           <line
//             x1="30"
//             y1={chartHeight}
//             x2={chartWidth}
//             y2={chartHeight}
//             stroke="#F59E0B"
//             strokeWidth="1.5"
//           />

//           {xLabels.map((label, index) => (
//             <text
//               key={label}
//               x={30 + (index / (xLabels.length - 1)) * (chartWidth - 30)}
//               y={chartHeight + 20}
//               fill="currentColor"
//               className="text-zinc-400"
//               fontSize="10"
//               textAnchor={
//                 index === 0
//                   ? "start"
//                   : index === xLabels.length - 1
//                     ? "end"
//                     : "middle"
//               }
//             >
//               {label}
//             </text>
//           ))}
//         </svg>
//       </div>

//       <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.05] pt-4 dark:border-white/[0.05]">
//         <div className="flex items-center gap-5">
//           <div className="flex items-center gap-2 text-[11px] text-zinc-600 dark:text-zinc-400">
//             <span className="h-2 w-2 rounded-full bg-sky-500" />
//             Calls
//           </div>
//           <div className="flex items-center gap-2 text-[11px] text-zinc-600 dark:text-zinc-400">
//             <span className="h-2 w-2 rounded-full bg-amber-500" />
//             Minutes
//           </div>
//         </div>

//         <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-500">
//           <TrendingUp size={12} />
//           vs last period
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============================================================
// // CALL OUTCOMES
// // ============================================================

// const OutcomeItem = ({ label, value, color, Icon }) => {
//   return (
//     <div className="rounded-lg border border-black/[0.06] bg-zinc-50/60 p-3 dark:border-white/[0.06] dark:bg-[#15161a]">
//       <div className="mb-2 flex items-center justify-between">
//         <span className="text-[9px] font-medium uppercase tracking-wider text-zinc-500">
//           {label}
//         </span>
//         {Icon && <Icon size={11} className={color} />}
//       </div>
//       <p className={`text-[15px] font-semibold ${color}`}>{value}</p>
//     </div>
//   );
// };

// const CallOutcomes = () => {
//   return (
//     <div className={`${CARD} p-5`}>
//       <div>
//         <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
//           Call Outcomes
//         </h3>
//         <p className="mt-1 text-xs text-zinc-500">Success vs failed per week</p>
//       </div>

//       <div className="mt-5 flex items-start gap-4">
//         <div className="relative flex h-[100px] w-[100px] shrink-0 items-center justify-center">
//           <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
//             <circle
//               cx="50"
//               cy="50"
//               r="38"
//               fill="none"
//               stroke="currentColor"
//               className="text-zinc-100 dark:text-zinc-800"
//               strokeWidth="9"
//             />
//             <circle
//               cx="50"
//               cy="50"
//               r="38"
//               fill="none"
//               stroke="#0EA5E9"
//               strokeWidth="9"
//               strokeDasharray="238.76"
//               strokeDashoffset="238.76"
//               strokeLinecap="round"
//             />
//           </svg>

//           <div className="absolute inset-0 flex flex-col items-center justify-center">
//             <span className="text-[13px] font-bold text-zinc-800 dark:text-zinc-200">
//               0%
//             </span>
//             <span className="text-[9px] uppercase tracking-wider text-zinc-500">
//               success
//             </span>
//           </div>
//         </div>

//         <div className="grid min-w-0 flex-1 grid-cols-2 gap-2">
//           <OutcomeItem
//             label="Total"
//             value="0"
//             color="text-zinc-800 dark:text-zinc-200"
//           />
//           <OutcomeItem
//             label="Success"
//             value="0"
//             color="text-emerald-500"
//             Icon={CheckCircle2}
//           />
//           <OutcomeItem
//             label="Failed"
//             value="0"
//             color="text-red-500"
//             Icon={XCircle}
//           />
//           <OutcomeItem
//             label="Outbound"
//             value="0"
//             color="text-zinc-800 dark:text-zinc-200"
//             Icon={PhoneOutgoing}
//           />
//         </div>
//       </div>

//       <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.05] pt-4 dark:border-white/[0.05]">
//         <div className="flex items-center gap-4">
//           <div className="flex items-center gap-2 text-[11px] text-zinc-600 dark:text-zinc-400">
//             <span className="h-2.5 w-2.5 rounded-sm bg-cyan-500" />
//             Successful
//           </div>
//           <div className="flex items-center gap-2 text-[11px] text-zinc-600 dark:text-zinc-400">
//             <span className="h-2.5 w-2.5 rounded-sm bg-red-500" />
//             Failed
//           </div>
//         </div>

//         <div className="flex items-center gap-3 text-[11px] text-zinc-500">
//           <span>
//             In{" "}
//             <span className="font-semibold text-zinc-800 dark:text-zinc-200">
//               0
//             </span>
//           </span>
//           <span className="text-zinc-300 dark:text-zinc-700">·</span>
//           <span>
//             Web{" "}
//             <span className="font-semibold text-zinc-800 dark:text-zinc-200">
//               0
//             </span>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============================================================
// // ACTIVE AGENTS
// // ============================================================

// const ActiveAgents = ({ onNavigate }) => {
//   return (
//     <div className={`${CARD} flex h-full flex-col p-5`}>
//       <div className="flex items-start justify-between">
//         <div>
//           <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
//             Active Agents
//           </h3>
//           <p className="mt-1 text-xs text-zinc-500">0 live</p>
//         </div>
//         <button
//           onClick={() => onNavigate("/agents")}
//           className="text-xs font-medium text-zinc-500 transition hover:text-cyan-500"
//         >
//           View all
//         </button>
//       </div>

//       <div className="mt-6 flex flex-1 items-start">
//         <button
//           onClick={() => onNavigate("/agents/create")}
//           className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-black/15 bg-zinc-50/50 py-3.5 text-[13px] font-medium text-zinc-700 transition hover:border-cyan-400 hover:bg-cyan-50/30 hover:text-cyan-600 dark:border-white/15 dark:bg-white/[0.02] dark:text-zinc-300 dark:hover:border-cyan-400 dark:hover:bg-cyan-500/[0.04] dark:hover:text-cyan-400"
//         >
//           <Plus size={14} />
//           Create Agent
//         </button>
//       </div>
//     </div>
//   );
// };

// // ============================================================
// // TODAY'S ACTIVITY
// // ============================================================

// const TodaysActivity = () => {
//   const chartWidth = 620;
//   const chartHeight = 140;
//   const xLabels = ["00:00", "02:00", "04:00", "06:00", "08:00", "10:00"];

//   return (
//     <div className={`${CARD} p-5`}>
//       <div>
//         <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
//           Today's Activity
//         </h3>
//         <p className="mt-1 text-xs text-zinc-500">Call channels per hour</p>
//       </div>

//       <div className="mt-4 flex flex-wrap items-center gap-4 text-xs">
//         <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
//           <span className="h-0.5 w-4 rounded-full bg-emerald-500" />
//           Outbound
//         </div>
//         <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
//           <span className="h-0.5 w-4 rounded-full bg-cyan-500" />
//           Inbound
//         </div>
//         <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
//           <span className="h-0.5 w-4 rounded-full bg-violet-500" />
//           Web
//         </div>
//       </div>

//       <div className="mt-3">
//         <svg
//           viewBox={`0 0 ${chartWidth} ${chartHeight + 28}`}
//           className="h-[170px] w-full"
//           preserveAspectRatio="none"
//         >
//           {[0, 1, 2, 3, 4].map((line) => {
//             const y = chartHeight - (line / 4) * chartHeight;
//             return (
//               <g key={line}>
//                 <line
//                   x1="30"
//                   y1={y}
//                   x2={chartWidth}
//                   y2={y}
//                   stroke="currentColor"
//                   className="text-zinc-100 dark:text-zinc-800"
//                   strokeWidth="1"
//                 />
//                 <text
//                   x="15"
//                   y={y + 4}
//                   fill="currentColor"
//                   className="text-zinc-400"
//                   fontSize="10"
//                   textAnchor="middle"
//                 >
//                   {line}
//                 </text>
//               </g>
//             );
//           })}

//           <polyline
//             points={`30,${chartHeight} ${chartWidth},${chartHeight}`}
//             fill="none"
//             stroke="#8B5CF6"
//             strokeWidth="1.5"
//           />

//           {xLabels.map((label, index) => (
//             <text
//               key={label}
//               x={30 + (index / (xLabels.length - 1)) * (chartWidth - 30)}
//               y={chartHeight + 20}
//               fill="currentColor"
//               className="text-zinc-400"
//               fontSize="10"
//               textAnchor={
//                 index === 0
//                   ? "start"
//                   : index === xLabels.length - 1
//                     ? "end"
//                     : "middle"
//               }
//             >
//               {label}
//             </text>
//           ))}
//         </svg>
//       </div>

//       <div className="mt-3 flex flex-wrap items-center gap-5 border-t border-black/[0.05] pt-4 text-[11px] text-zinc-500 dark:border-white/[0.05]">
//         <div className="flex items-center gap-2">
//           <PhoneCall size={11} className="text-emerald-500" />
//           <span>Outbound</span>
//           <span className="font-semibold text-zinc-800 dark:text-zinc-200">
//             0
//           </span>
//         </div>
//         <div className="flex items-center gap-2">
//           <PhoneCall size={11} className="text-cyan-500" />
//           <span>Inbound</span>
//           <span className="font-semibold text-zinc-800 dark:text-zinc-200">
//             0
//           </span>
//         </div>
//         <div className="flex items-center gap-2">
//           <PhoneCall size={11} className="text-violet-500" />
//           <span>Web</span>
//           <span className="font-semibold text-zinc-800 dark:text-zinc-200">
//             0
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============================================================
// // TOP COUNTRIES
// // ============================================================

// const TopCountries = () => {
//   return (
//     <div className={`${CARD} flex h-full flex-col p-5`}>
//       <h3 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
//         TOP COUNTRIES
//       </h3>

//       <div className="flex flex-1 flex-col items-center justify-center py-8">
//         <p className="text-[13px] text-zinc-500">No data yet</p>

//         <div className="mt-8 w-full">
//           <div className="border-b border-black/[0.06] pb-2 dark:border-white/[0.06]">
//             <span className="text-[9px] font-medium uppercase tracking-wider text-zinc-500">
//               Countries
//             </span>
//           </div>
//           <div className="mt-3 flex items-center gap-2">
//             <span className="h-2 w-2 rounded-full bg-cyan-500" />
//             <span className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
//               0
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============================================================
// // QUICK ACTIONS
// // ============================================================

// const QuickActionItem = ({ icon: Icon, title, subtitle, onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={`${CARD} group flex items-center gap-3 p-4 text-left`}
//     >
//       <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition group-hover:bg-cyan-500/10 group-hover:text-cyan-600 dark:bg-white/[0.06] dark:text-zinc-400 dark:group-hover:text-cyan-400">
//         <Icon size={17} strokeWidth={1.7} />
//       </div>

//       <div className="min-w-0 flex-1">
//         <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">
//           {title}
//         </p>
//         <p className="mt-0.5 truncate text-xs text-zinc-500">{subtitle}</p>
//       </div>

//       <ChevronRight
//         size={16}
//         className="shrink-0 text-zinc-300 transition group-hover:translate-x-0.5 group-hover:text-cyan-500 dark:text-zinc-600 dark:group-hover:text-cyan-400"
//       />
//     </button>
//   );
// };

// const QuickActions = ({ onNavigate }) => {
//   return (
//     <div className={`${CARD} p-5`}>
//       <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
//         Quick Actions
//       </h3>

//       <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
//         <QuickActionItem
//           icon={Bot}
//           title="Create Agent"
//           subtitle="Build AI assistant"
//           onClick={() => onNavigate("/agents/create")}
//         />
//         <QuickActionItem
//           icon={ZapIcon}
//           title="New Campaign"
//           subtitle="Launch outbound calls"
//           onClick={() => onNavigate("/outbound/new")}
//         />
//         <QuickActionItem
//           icon={UserPlus}
//           title="Add Contact"
//           subtitle="Import or create"
//           onClick={() => onNavigate("/contacts")}
//         />
//         <QuickActionItem
//           icon={Smartphone}
//           title="Add Number"
//           subtitle="Provision number"
//           onClick={() => onNavigate("/phone-numbers")}
//         />
//       </div>
//     </div>
//   );
// };

// // ============================================================
// // DASHBOARD
// // ============================================================

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ✅ Scroll to top when route changes
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "instant" });

//     // Also handle any nested scroll containers
//     const main = document.querySelector("main");
//     if (main) {
//       main.scrollTo({ top: 0, behavior: "instant" });
//     }
//   }, [location.pathname]);

//   return (
//     <div className="min-h-full bg-zinc-50 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
//       <main className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-7">
//         {/* ============ WELCOME ============ */}
//         <section>
//           <div className="flex flex-wrap items-center gap-2">
//             <h1 className="text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
//               Good Morning, Admin
//             </h1>
//             <Info size={15} className="text-zinc-400" />
//           </div>

//           <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-500">
//             Your agents handled{" "}
//             <span className="font-semibold text-zinc-900 dark:text-zinc-200">
//               0 calls
//             </span>{" "}
//             this month with{" "}
//             <span className="font-semibold text-emerald-500 dark:text-emerald-400">
//               0.00% success
//             </span>
//           </p>
//         </section>

//         {/* ============ TOP: STATS + GLOBAL REACH ============ */}
//         <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,1fr)]">
//           <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
//             <StatCard icon={Clock3} label="Total Minutes" value="0" />
//             <StatCard icon={Bot} label="Active Agents" value="1" />
//             <StatCard
//               icon={PhoneCall}
//               label="Live Calls"
//               value="0"
//               live
//               accent
//             />
//             <StatCard icon={Coins} label="Credits" value="0" />
//             <StatCard icon={Target} label="Success Rate" value="0.00%" />
//             <StatCard icon={Zap} label="Conversion" value="0%" />
//           </div>

//           <GlobalReach />
//         </section>

//         {/* ============ USAGE TRENDS + CALL OUTCOMES ============ */}
//         <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,1fr)]">
//           <UsageTrends />
//           <CallOutcomes />
//         </section>

//         {/* ============ ACTIVE AGENTS + TODAY + TOP COUNTRIES ============ */}
//         <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)_minmax(0,0.9fr)]">
//           <ActiveAgents onNavigate={navigate} />
//           <TodaysActivity />
//           <TopCountries />
//         </section>

//         {/* ============ QUICK ACTIONS ============ */}
//         <section>
//           <QuickActions onNavigate={navigate} />
//         </section>
//       </main>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Clock3,
  Bot,
  PhoneCall,
  Coins,
  Target,
  Zap,
  CheckCircle2,
  XCircle,
  PhoneOutgoing,
  Info,
  Plus,
  Zap as ZapIcon,
  UserPlus,
  Smartphone,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

import GlobalReach from "../../components/GlobalReach";

// ============================================================
// GREETING
// ============================================================

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Good Morning";
  }

  if (hour >= 12 && hour < 17) {
    return "Good Afternoon";
  }

  if (hour >= 17 && hour < 21) {
    return "Good Evening";
  }

  return "Good Night";
};

// ============================================================
// ANIMATION VARIANTS
// ============================================================

const pageVariants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.08,
    },
  },
};

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 16,
    scale: 0.98,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ============================================================
// SHARED CARD STYLE
// ============================================================

const CARD = `
  rounded-2xl
  border border-black/[0.07]
  bg-white
  transition-all duration-300 ease-out
  hover:-translate-y-[2px]
  hover:border-cyan-400/30
  hover:shadow-[0_8px_28px_-10px_rgba(6,182,212,0.18)]
  dark:border-white/[0.08]
  dark:bg-[#101012]
  dark:hover:border-cyan-400/25
  dark:hover:shadow-[0_8px_28px_-10px_rgba(34,211,238,0.14)]
`;

// ============================================================
// STAT CARD
// ============================================================

const StatCard = ({
  icon: Icon,
  label,
  value,
  live = false,
  accent = false,
}) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -4,
        scale: 1.015,
      }}
      whileTap={{
        scale: 0.99,
      }}
      transition={{
        duration: 0.2,
      }}
      className={`
        ${CARD}
        relative overflow-hidden p-4
        ${
          accent
            ? "border-cyan-400/40 bg-cyan-50/40 dark:border-cyan-400/25 dark:bg-cyan-500/[0.05]"
            : ""
        }
      `}
    >
      {accent && (
        <motion.div
          animate={{
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute -right-10 -top-10
            h-24 w-24 rounded-full
            bg-cyan-400/20
            blur-2xl
          "
        />
      )}

      <div className="relative mb-5 flex items-center justify-between">
        <motion.div
          whileHover={{
            scale: 1.12,
            rotate: 4,
          }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 18,
          }}
          className={`
            flex h-8 w-8 items-center justify-center rounded-lg
            ${
              accent
                ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400"
                : "bg-zinc-100 text-zinc-500 dark:bg-white/[0.06] dark:text-zinc-400"
            }
          `}
        >
          <Icon size={15} strokeWidth={1.8} />
        </motion.div>

        {live && (
          <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            <motion.span
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.45, 1],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-1.5 w-1.5 rounded-full bg-cyan-500"
            />

            Live
          </div>
        )}
      </div>

      <p className="relative mb-1.5 text-[10px] font-medium uppercase tracking-[0.08em] text-zinc-500">
        {label}
      </p>

      <motion.div
        initial={{
          opacity: 0,
          y: 6,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.15,
          duration: 0.3,
        }}
        className={`relative text-[22px] font-semibold tracking-tight ${
          accent
            ? "text-cyan-600 dark:text-cyan-400"
            : "text-zinc-900 dark:text-zinc-100"
        }`}
      >
        {value}
      </motion.div>
    </motion.div>
  );
};

// ============================================================
// USAGE TRENDS
// ============================================================

const UsageTrends = () => {
  const [period, setPeriod] = useState("Month");

  const periods = ["Day", "Week", "Month"];

  const chartWidth = 620;
  const chartHeight = 160;

  const xLabels = [
    "Aug 26",
    "Aug 31",
    "Sep 5",
    "Sep 10",
    "Sep 15",
    "Sep 20",
  ];

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -3,
      }}
      className={`${CARD} p-5`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
            Usage Trends
          </h3>

          <motion.p
            key={period}
            initial={{
              opacity: 0,
              x: -5,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="mt-1 text-xs text-zinc-500"
          >
            {period === "Day"
              ? "Last 24 hours"
              : period === "Week"
                ? "Last 7 days"
                : "Last 30 days"}
          </motion.p>
        </div>

        <div className="flex rounded-lg border border-black/[0.08] bg-white p-1 dark:border-white/[0.08] dark:bg-[#17171A]">
          {periods.map((item) => (
            <motion.button
              key={item}
              onClick={() => setPeriod(item)}
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className={`rounded-md px-3 py-1 text-[11px] font-medium transition-colors ${
                period === item
                  ? "bg-cyan-500/15 font-semibold text-cyan-600 dark:text-cyan-400"
                  : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              {item}
            </motion.button>
          ))}
        </div>
      </div>

      <motion.div
        initial={{
          opacity: 0,
          scaleY: 0.85,
        }}
        animate={{
          opacity: 1,
          scaleY: 1,
        }}
        transition={{
          duration: 0.7,
          delay: 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          transformOrigin: "bottom",
        }}
        className="mt-6"
      >
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight + 28}`}
          className="h-[210px] w-full"
          preserveAspectRatio="none"
        >
          {[0, 1, 2, 3, 4].map((line) => {
            const y =
              chartHeight - (line / 4) * chartHeight;

            return (
              <g key={line}>
                <line
                  x1="30"
                  y1={y}
                  x2={chartWidth}
                  y2={y}
                  stroke="currentColor"
                  className="text-zinc-100 dark:text-zinc-800"
                  strokeWidth="1"
                />

                <text
                  x="14"
                  y={y + 4}
                  fill="currentColor"
                  className="text-zinc-400"
                  fontSize="10"
                  textAnchor="middle"
                >
                  {line}
                </text>
              </g>
            );
          })}

          <motion.line
            initial={{
              pathLength: 0,
            }}
            animate={{
              pathLength: 1,
            }}
            transition={{
              duration: 1,
              delay: 0.3,
            }}
            x1="30"
            y1={chartHeight}
            x2={chartWidth}
            y2={chartHeight}
            stroke="#F59E0B"
            strokeWidth="1.5"
          />

          {xLabels.map((label, index) => (
            <text
              key={label}
              x={
                30 +
                (index / (xLabels.length - 1)) *
                  (chartWidth - 30)
              }
              y={chartHeight + 20}
              fill="currentColor"
              className="text-zinc-400"
              fontSize="10"
              textAnchor={
                index === 0
                  ? "start"
                  : index === xLabels.length - 1
                    ? "end"
                    : "middle"
              }
            >
              {label}
            </text>
          ))}
        </svg>
      </motion.div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.05] pt-4 dark:border-white/[0.05]">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 text-[11px] text-zinc-600 dark:text-zinc-400">
            <span className="h-2 w-2 rounded-full bg-sky-500" />
            Calls
          </div>

          <div className="flex items-center gap-2 text-[11px] text-zinc-600 dark:text-zinc-400">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Minutes
          </div>
        </div>

        <motion.div
          whileHover={{
            x: 3,
          }}
          className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-500"
        >
          <TrendingUp size={12} />
          vs last period
        </motion.div>
      </div>
    </motion.div>
  );
};

// ============================================================
// OUTCOME ITEM
// ============================================================

const OutcomeItem = ({
  label,
  value,
  color,
  Icon,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -2,
        scale: 1.01,
      }}
      className="rounded-lg border border-black/[0.06] bg-zinc-50/60 p-3 dark:border-white/[0.06] dark:bg-[#15161a]"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[9px] font-medium uppercase tracking-wider text-zinc-500">
          {label}
        </span>

        {Icon && (
          <Icon
            size={11}
            className={color}
          />
        )}
      </div>

      <p className={`text-[15px] font-semibold ${color}`}>
        {value}
      </p>
    </motion.div>
  );
};

// ============================================================
// CALL OUTCOMES
// ============================================================

const CallOutcomes = () => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -3,
      }}
      className={`${CARD} p-5`}
    >
      <div>
        <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
          Call Outcomes
        </h3>

        <p className="mt-1 text-xs text-zinc-500">
          Success vs failed per week
        </p>
      </div>

      <div className="mt-5 flex items-start gap-4">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.6,
            delay: 0.25,
          }}
          className="relative flex h-[100px] w-[100px] shrink-0 items-center justify-center"
        >
          <svg
            viewBox="0 0 100 100"
            className="h-full w-full -rotate-90"
          >
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="currentColor"
              className="text-zinc-100 dark:text-zinc-800"
              strokeWidth="9"
            />

            <motion.circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="#0EA5E9"
              strokeWidth="9"
              strokeDasharray="238.76"
              strokeDashoffset="238.76"
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 0.5,
              }}
              className="text-[13px] font-bold text-zinc-800 dark:text-zinc-200"
            >
              0%
            </motion.span>

            <span className="text-[9px] uppercase tracking-wider text-zinc-500">
              success
            </span>
          </div>
        </motion.div>

        <div className="grid min-w-0 flex-1 grid-cols-2 gap-2">
          <OutcomeItem
            label="Total"
            value="0"
            color="text-zinc-800 dark:text-zinc-200"
          />

          <OutcomeItem
            label="Success"
            value="0"
            color="text-emerald-500"
            Icon={CheckCircle2}
          />

          <OutcomeItem
            label="Failed"
            value="0"
            color="text-red-500"
            Icon={XCircle}
          />

          <OutcomeItem
            label="Outbound"
            value="0"
            color="text-zinc-800 dark:text-zinc-200"
            Icon={PhoneOutgoing}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.05] pt-4 dark:border-white/[0.05]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[11px] text-zinc-600 dark:text-zinc-400">
            <span className="h-2.5 w-2.5 rounded-sm bg-cyan-500" />
            Successful
          </div>

          <div className="flex items-center gap-2 text-[11px] text-zinc-600 dark:text-zinc-400">
            <span className="h-2.5 w-2.5 rounded-sm bg-red-500" />
            Failed
          </div>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-zinc-500">
          <span>
            In{" "}
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              0
            </span>
          </span>

          <span className="text-zinc-300 dark:text-zinc-700">
            ·
          </span>

          <span>
            Web{" "}
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              0
            </span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================
// ACTIVE AGENTS
// ============================================================

const ActiveAgents = ({ onNavigate }) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -3,
      }}
      className={`${CARD} flex h-full flex-col p-5`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
            Active Agents
          </h3>

          <p className="mt-1 text-xs text-zinc-500">
            0 live
          </p>
        </div>

        <motion.button
          onClick={() => onNavigate("/agents")}
          whileHover={{
            x: 3,
          }}
          whileTap={{
            scale: 0.96,
          }}
          className="text-xs font-medium text-zinc-500 transition hover:text-cyan-500"
        >
          View all
        </motion.button>
      </div>

      <div className="mt-6 flex flex-1 items-start">
        <motion.button
          onClick={() =>
            onNavigate("/agents/create")
          }
          whileHover={{
            y: -3,
            scale: 1.01,
          }}
          whileTap={{
            scale: 0.97,
          }}
          className="
            flex w-full items-center justify-center
            gap-2 rounded-lg
            border border-dashed
            border-black/15
            bg-zinc-50/50
            py-3.5
            text-[13px] font-medium
            text-zinc-700
            transition-colors
            hover:border-cyan-400
            hover:bg-cyan-50/30
            hover:text-cyan-600
            dark:border-white/15
            dark:bg-white/[0.02]
            dark:text-zinc-300
            dark:hover:border-cyan-400
            dark:hover:bg-cyan-500/[0.04]
            dark:hover:text-cyan-400
          "
        >
          <motion.span
            whileHover={{
              rotate: 90,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <Plus size={14} />
          </motion.span>

          Create Agent
        </motion.button>
      </div>
    </motion.div>
  );
};

// ============================================================
// TODAY'S ACTIVITY
// ============================================================

const TodaysActivity = () => {
  const chartWidth = 620;
  const chartHeight = 140;

  const xLabels = [
    "00:00",
    "02:00",
    "04:00",
    "06:00",
    "08:00",
    "10:00",
  ];

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -3,
      }}
      className={`${CARD} p-5`}
    >
      <div>
        <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
          Today's Activity
        </h3>

        <p className="mt-1 text-xs text-zinc-500">
          Call channels per hour
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs">
        <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
          <span className="h-0.5 w-4 rounded-full bg-emerald-500" />
          Outbound
        </div>

        <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
          <span className="h-0.5 w-4 rounded-full bg-cyan-500" />
          Inbound
        </div>

        <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
          <span className="h-0.5 w-4 rounded-full bg-violet-500" />
          Web
        </div>
      </div>

      <motion.div
        initial={{
          opacity: 0,
          scaleY: 0.8,
        }}
        animate={{
          opacity: 1,
          scaleY: 1,
        }}
        transition={{
          duration: 0.7,
          delay: 0.3,
        }}
        style={{
          transformOrigin: "bottom",
        }}
        className="mt-3"
      >
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight + 28}`}
          className="h-[170px] w-full"
          preserveAspectRatio="none"
        >
          {[0, 1, 2, 3, 4].map((line) => {
            const y =
              chartHeight - (line / 4) * chartHeight;

            return (
              <g key={line}>
                <line
                  x1="30"
                  y1={y}
                  x2={chartWidth}
                  y2={y}
                  stroke="currentColor"
                  className="text-zinc-100 dark:text-zinc-800"
                  strokeWidth="1"
                />

                <text
                  x="15"
                  y={y + 4}
                  fill="currentColor"
                  className="text-zinc-400"
                  fontSize="10"
                  textAnchor="middle"
                >
                  {line}
                </text>
              </g>
            );
          })}

          <motion.polyline
            initial={{
              pathLength: 0,
              opacity: 0,
            }}
            animate={{
              pathLength: 1,
              opacity: 1,
            }}
            transition={{
              duration: 1.2,
              delay: 0.3,
            }}
            points={`30,${chartHeight} ${chartWidth},${chartHeight}`}
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="1.5"
          />

          {xLabels.map((label, index) => (
            <text
              key={label}
              x={
                30 +
                (index / (xLabels.length - 1)) *
                  (chartWidth - 30)
              }
              y={chartHeight + 20}
              fill="currentColor"
              className="text-zinc-400"
              fontSize="10"
              textAnchor={
                index === 0
                  ? "start"
                  : index === xLabels.length - 1
                    ? "end"
                    : "middle"
              }
            >
              {label}
            </text>
          ))}
        </svg>
      </motion.div>

      <div className="mt-3 flex flex-wrap items-center gap-5 border-t border-black/[0.05] pt-4 text-[11px] text-zinc-500 dark:border-white/[0.05]">
        <div className="flex items-center gap-2">
          <PhoneCall
            size={11}
            className="text-emerald-500"
          />

          <span>Outbound</span>

          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
            0
          </span>
        </div>

        <div className="flex items-center gap-2">
          <PhoneCall
            size={11}
            className="text-cyan-500"
          />

          <span>Inbound</span>

          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
            0
          </span>
        </div>

        <div className="flex items-center gap-2">
          <PhoneCall
            size={11}
            className="text-violet-500"
          />

          <span>Web</span>

          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
            0
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================
// TOP COUNTRIES
// ============================================================

const TopCountries = () => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -3,
      }}
      className={`${CARD} flex h-full flex-col p-5`}
    >
      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
        TOP COUNTRIES
      </h3>

      <div className="flex flex-1 flex-col items-center justify-center py-8">
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.3,
          }}
          className="text-[13px] text-zinc-500"
        >
          No data yet
        </motion.p>

        <div className="mt-8 w-full">
          <div className="border-b border-black/[0.06] pb-2 dark:border-white/[0.06]">
            <span className="text-[9px] font-medium uppercase tracking-wider text-zinc-500">
              Countries
            </span>
          </div>

          <motion.div
            initial={{
              opacity: 0,
              x: -8,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.4,
            }}
            className="mt-3 flex items-center gap-2"
          >
            <motion.span
              animate={{
                scale: [1, 1.25, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 2,
              }}
              className="h-2 w-2 rounded-full bg-cyan-500"
            />

            <span className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
              0
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================
// QUICK ACTION ITEM
// ============================================================

const QuickActionItem = ({
  icon: Icon,
  title,
  subtitle,
  onClick,
}) => {
  return (
    <motion.button
      onClick={onClick}
      variants={cardVariants}
      whileHover={{
        y: -5,
        scale: 1.015,
      }}
      whileTap={{
        scale: 0.97,
      }}
      className={`${CARD} group flex items-center gap-3 p-4 text-left`}
    >
      <motion.div
        whileHover={{
          scale: 1.12,
          rotate: 4,
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 18,
        }}
        className="
          flex h-10 w-10 shrink-0
          items-center justify-center
          rounded-lg
          bg-zinc-100
          text-zinc-600
          transition-colors
          group-hover:bg-cyan-500/10
          group-hover:text-cyan-600
          dark:bg-white/[0.06]
          dark:text-zinc-400
          dark:group-hover:text-cyan-400
        "
      >
        <Icon
          size={17}
          strokeWidth={1.7}
        />
      </motion.div>

      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">
          {title}
        </p>

        <p className="mt-0.5 truncate text-xs text-zinc-500">
          {subtitle}
        </p>
      </div>

      <motion.div
        whileHover={{
          x: 4,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 20,
        }}
      >
        <ChevronRight
          size={16}
          className="
            shrink-0
            text-zinc-300
            group-hover:text-cyan-500
            dark:text-zinc-600
            dark:group-hover:text-cyan-400
          "
        />
      </motion.div>
    </motion.button>
  );
};

// ============================================================
// QUICK ACTIONS
// ============================================================

const QuickActions = ({ onNavigate }) => {
  return (
    <motion.div
      variants={cardVariants}
      className={`${CARD} p-5`}
    >
      <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
        Quick Actions
      </h3>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <QuickActionItem
          icon={Bot}
          title="Create Agent"
          subtitle="Build AI assistant"
          onClick={() =>
            onNavigate("/agents/create")
          }
        />

        <QuickActionItem
          icon={ZapIcon}
          title="New Campaign"
          subtitle="Launch outbound calls"
          onClick={() =>
            onNavigate("/outbound/new")
          }
        />

        <QuickActionItem
          icon={UserPlus}
          title="Add Contact"
          subtitle="Import or create"
          onClick={() =>
            onNavigate("/contacts")
          }
        />

        <QuickActionItem
          icon={Smartphone}
          title="Add Number"
          subtitle="Provision number"
          onClick={() =>
            onNavigate("/phone-numbers")
          }
        />
      </div>
    </motion.div>
  );
};

// ============================================================
// DASHBOARD
// ============================================================

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [greeting, setGreeting] = useState(
    getGreeting()
  );

  // ==========================================================
  // AUTOMATIC GREETING UPDATE
  // ==========================================================

  useEffect(() => {
    const updateGreeting = () => {
      setGreeting(getGreeting());
    };

    updateGreeting();

    // Check every minute
    const interval = setInterval(
      updateGreeting,
      60 * 1000
    );

    return () => clearInterval(interval);
  }, []);

  // ==========================================================
  // SCROLL TO TOP ON ROUTE CHANGE
  // ==========================================================

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });

    const main = document.querySelector("main");

    if (main) {
      main.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }
  }, [location.pathname]);

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="
        min-h-full
        bg-zinc-50
        text-zinc-900
        transition-colors
        duration-300
        dark:bg-[#09090B]
        dark:text-zinc-100
      "
    >
      <motion.main
        className="
          mx-auto
          max-w-[1600px]
          space-y-5
          p-4
          sm:p-6
          lg:p-7
        "
      >
        {/* ==================================================
            WELCOME
        ================================================== */}

        <motion.section variants={sectionVariants}>
          <div className="flex flex-wrap items-center gap-2">
            <motion.h1
              key={greeting}
              initial={{
                opacity: 0,
                x: -15,
                y: 4,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
              }}
              transition={{
                duration: 0.45,
              }}
              className="
                text-[22px]
                font-semibold
                tracking-tight
                text-zinc-900
                dark:text-zinc-100
                sm:text-2xl
              "
            >
              {greeting}, JeevaAI
            </motion.h1>

            <motion.div
              animate={{
                rotate: [0, 8, -8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 5,
              }}
            >
              <Info
                size={15}
                className="text-zinc-400"
              />
            </motion.div>
          </div>

          <motion.p
            initial={{
              opacity: 0,
              y: 5,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.15,
              duration: 0.35,
            }}
            className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-500"
          >
            Your agents handled{" "}
            <span className="font-semibold text-zinc-900 dark:text-zinc-200">
              0 calls
            </span>{" "}
            this month with{" "}
            <span className="font-semibold text-emerald-500 dark:text-emerald-400">
              0.00% success
            </span>
          </motion.p>
        </motion.section>

        {/* ==================================================
            STATS + GLOBAL REACH
        ================================================== */}

        <motion.section
          variants={sectionVariants}
          className="
            grid grid-cols-1 gap-5
            xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,1fr)]
          "
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              icon={Clock3}
              label="Total Minutes"
              value="0"
            />

            <StatCard
              icon={Bot}
              label="Active Agents"
              value="1"
            />

            <StatCard
              icon={PhoneCall}
              label="Live Calls"
              value="0"
              live
              accent
            />

            <StatCard
              icon={Coins}
              label="Credits"
              value="0"
            />

            <StatCard
              icon={Target}
              label="Success Rate"
              value="0.00%"
            />

            <StatCard
              icon={Zap}
              label="Conversion"
              value="0%"
            />
          </div>

          <motion.div
            variants={cardVariants}
            whileHover={{
              y: -3,
            }}
          >
            <GlobalReach />
          </motion.div>
        </motion.section>

        {/* ==================================================
            USAGE + OUTCOMES
        ================================================== */}

        <motion.section
          variants={sectionVariants}
          className="
            grid grid-cols-1 gap-5
            xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,1fr)]
          "
        >
          <UsageTrends />
          <CallOutcomes />
        </motion.section>

        {/* ==================================================
            ACTIVE + TODAY + COUNTRIES
        ================================================== */}

        <motion.section
          variants={sectionVariants}
          className="
            grid grid-cols-1 gap-5
            xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)_minmax(0,0.9fr)]
          "
        >
          <ActiveAgents
            onNavigate={navigate}
          />

          <TodaysActivity />

          <TopCountries />
        </motion.section>

        {/* ==================================================
            QUICK ACTIONS
        ================================================== */}

        <motion.section variants={sectionVariants}>
          <QuickActions
            onNavigate={navigate}
          />
        </motion.section>
      </motion.main>
    </motion.div>
  );
}