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



// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { motion } from "framer-motion";

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
// // GREETING
// // ============================================================

// const getGreeting = () => {
//   const hour = new Date().getHours();

//   if (hour >= 5 && hour < 12) {
//     return "Good Morning";
//   }

//   if (hour >= 12 && hour < 17) {
//     return "Good Afternoon";
//   }

//   if (hour >= 17 && hour < 21) {
//     return "Good Evening";
//   }

//   return "Good Night";
// };

// // ============================================================
// // ANIMATION VARIANTS
// // ============================================================

// const pageVariants = {
//   hidden: {
//     opacity: 0,
//   },

//   visible: {
//     opacity: 1,
//     transition: {
//       duration: 0.4,
//       staggerChildren: 0.08,
//     },
//   },
// };

// const sectionVariants = {
//   hidden: {
//     opacity: 0,
//     y: 18,
//   },

//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.45,
//       ease: [0.22, 1, 0.36, 1],
//     },
//   },
// };

// const cardVariants = {
//   hidden: {
//     opacity: 0,
//     y: 16,
//     scale: 0.98,
//   },

//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       duration: 0.4,
//       ease: [0.22, 1, 0.36, 1],
//     },
//   },
// };

// // ============================================================
// // SHARED CARD STYLE
// // ============================================================

// const CARD = `
//   rounded-2xl
//   border border-black/[0.07]
//   bg-white
//   transition-all duration-300 ease-out
//   hover:-translate-y-[2px]
//   hover:border-cyan-400/30
//   hover:shadow-[0_8px_28px_-10px_rgba(6,182,212,0.18)]
//   dark:border-white/[0.08]
//   dark:bg-[#101012]
//   dark:hover:border-cyan-400/25
//   dark:hover:shadow-[0_8px_28px_-10px_rgba(34,211,238,0.14)]
// `;

// // ============================================================
// // STAT CARD
// // ============================================================

// const StatCard = ({
//   icon: Icon,
//   label,
//   value,
//   live = false,
//   accent = false,
// }) => {
//   return (
//     <motion.div
//       variants={cardVariants}
//       whileHover={{
//         y: -4,
//         scale: 1.015,
//       }}
//       whileTap={{
//         scale: 0.99,
//       }}
//       transition={{
//         duration: 0.2,
//       }}
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
//       {accent && (
//         <motion.div
//           animate={{
//             opacity: [0.15, 0.3, 0.15],
//           }}
//           transition={{
//             duration: 3,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//           className="
//             pointer-events-none
//             absolute -right-10 -top-10
//             h-24 w-24 rounded-full
//             bg-cyan-400/20
//             blur-2xl
//           "
//         />
//       )}

//       <div className="relative mb-5 flex items-center justify-between">
//         <motion.div
//           whileHover={{
//             scale: 1.12,
//             rotate: 4,
//           }}
//           transition={{
//             type: "spring",
//             stiffness: 350,
//             damping: 18,
//           }}
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
//         </motion.div>

//         {live && (
//           <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
//             <motion.span
//               animate={{
//                 scale: [1, 1.5, 1],
//                 opacity: [1, 0.45, 1],
//               }}
//               transition={{
//                 duration: 1.6,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//               className="h-1.5 w-1.5 rounded-full bg-cyan-500"
//             />

//             Live
//           </div>
//         )}
//       </div>

//       <p className="relative mb-1.5 text-[10px] font-medium uppercase tracking-[0.08em] text-zinc-500">
//         {label}
//       </p>

//       <motion.div
//         initial={{
//           opacity: 0,
//           y: 6,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//         }}
//         transition={{
//           delay: 0.15,
//           duration: 0.3,
//         }}
//         className={`relative text-[22px] font-semibold tracking-tight ${
//           accent
//             ? "text-cyan-600 dark:text-cyan-400"
//             : "text-zinc-900 dark:text-zinc-100"
//         }`}
//       >
//         {value}
//       </motion.div>
//     </motion.div>
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

//   const xLabels = [
//     "Aug 26",
//     "Aug 31",
//     "Sep 5",
//     "Sep 10",
//     "Sep 15",
//     "Sep 20",
//   ];

//   return (
//     <motion.div
//       variants={cardVariants}
//       whileHover={{
//         y: -3,
//       }}
//       className={`${CARD} p-5`}
//     >
//       <div className="flex flex-wrap items-start justify-between gap-3">
//         <div>
//           <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
//             Usage Trends
//           </h3>

//           <motion.p
//             key={period}
//             initial={{
//               opacity: 0,
//               x: -5,
//             }}
//             animate={{
//               opacity: 1,
//               x: 0,
//             }}
//             className="mt-1 text-xs text-zinc-500"
//           >
//             {period === "Day"
//               ? "Last 24 hours"
//               : period === "Week"
//                 ? "Last 7 days"
//                 : "Last 30 days"}
//           </motion.p>
//         </div>

//         <div className="flex rounded-lg border border-black/[0.08] bg-white p-1 dark:border-white/[0.08] dark:bg-[#17171A]">
//           {periods.map((item) => (
//             <motion.button
//               key={item}
//               onClick={() => setPeriod(item)}
//               whileHover={{
//                 scale: 1.04,
//               }}
//               whileTap={{
//                 scale: 0.95,
//               }}
//               className={`rounded-md px-3 py-1 text-[11px] font-medium transition-colors ${
//                 period === item
//                   ? "bg-cyan-500/15 font-semibold text-cyan-600 dark:text-cyan-400"
//                   : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
//               }`}
//             >
//               {item}
//             </motion.button>
//           ))}
//         </div>
//       </div>

//       <motion.div
//         initial={{
//           opacity: 0,
//           scaleY: 0.85,
//         }}
//         animate={{
//           opacity: 1,
//           scaleY: 1,
//         }}
//         transition={{
//           duration: 0.7,
//           delay: 0.2,
//           ease: [0.22, 1, 0.36, 1],
//         }}
//         style={{
//           transformOrigin: "bottom",
//         }}
//         className="mt-6"
//       >
//         <svg
//           viewBox={`0 0 ${chartWidth} ${chartHeight + 28}`}
//           className="h-[210px] w-full"
//           preserveAspectRatio="none"
//         >
//           {[0, 1, 2, 3, 4].map((line) => {
//             const y =
//               chartHeight - (line / 4) * chartHeight;

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

//           <motion.line
//             initial={{
//               pathLength: 0,
//             }}
//             animate={{
//               pathLength: 1,
//             }}
//             transition={{
//               duration: 1,
//               delay: 0.3,
//             }}
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
//               x={
//                 30 +
//                 (index / (xLabels.length - 1)) *
//                   (chartWidth - 30)
//               }
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
//       </motion.div>

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

//         <motion.div
//           whileHover={{
//             x: 3,
//           }}
//           className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-500"
//         >
//           <TrendingUp size={12} />
//           vs last period
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// // ============================================================
// // OUTCOME ITEM
// // ============================================================

// const OutcomeItem = ({
//   label,
//   value,
//   color,
//   Icon,
// }) => {
//   return (
//     <motion.div
//       whileHover={{
//         y: -2,
//         scale: 1.01,
//       }}
//       className="rounded-lg border border-black/[0.06] bg-zinc-50/60 p-3 dark:border-white/[0.06] dark:bg-[#15161a]"
//     >
//       <div className="mb-2 flex items-center justify-between">
//         <span className="text-[9px] font-medium uppercase tracking-wider text-zinc-500">
//           {label}
//         </span>

//         {Icon && (
//           <Icon
//             size={11}
//             className={color}
//           />
//         )}
//       </div>

//       <p className={`text-[15px] font-semibold ${color}`}>
//         {value}
//       </p>
//     </motion.div>
//   );
// };

// // ============================================================
// // CALL OUTCOMES
// // ============================================================

// const CallOutcomes = () => {
//   return (
//     <motion.div
//       variants={cardVariants}
//       whileHover={{
//         y: -3,
//       }}
//       className={`${CARD} p-5`}
//     >
//       <div>
//         <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
//           Call Outcomes
//         </h3>

//         <p className="mt-1 text-xs text-zinc-500">
//           Success vs failed per week
//         </p>
//       </div>

//       <div className="mt-5 flex items-start gap-4">
//         <motion.div
//           initial={{
//             opacity: 0,
//             scale: 0.8,
//           }}
//           animate={{
//             opacity: 1,
//             scale: 1,
//           }}
//           transition={{
//             duration: 0.6,
//             delay: 0.25,
//           }}
//           className="relative flex h-[100px] w-[100px] shrink-0 items-center justify-center"
//         >
//           <svg
//             viewBox="0 0 100 100"
//             className="h-full w-full -rotate-90"
//           >
//             <circle
//               cx="50"
//               cy="50"
//               r="38"
//               fill="none"
//               stroke="currentColor"
//               className="text-zinc-100 dark:text-zinc-800"
//               strokeWidth="9"
//             />

//             <motion.circle
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
//             <motion.span
//               initial={{
//                 opacity: 0,
//                 scale: 0.7,
//               }}
//               animate={{
//                 opacity: 1,
//                 scale: 1,
//               }}
//               transition={{
//                 delay: 0.5,
//               }}
//               className="text-[13px] font-bold text-zinc-800 dark:text-zinc-200"
//             >
//               0%
//             </motion.span>

//             <span className="text-[9px] uppercase tracking-wider text-zinc-500">
//               success
//             </span>
//           </div>
//         </motion.div>

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

//           <span className="text-zinc-300 dark:text-zinc-700">
//             ·
//           </span>

//           <span>
//             Web{" "}
//             <span className="font-semibold text-zinc-800 dark:text-zinc-200">
//               0
//             </span>
//           </span>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // ============================================================
// // ACTIVE AGENTS
// // ============================================================

// const ActiveAgents = ({ onNavigate }) => {
//   return (
//     <motion.div
//       variants={cardVariants}
//       whileHover={{
//         y: -3,
//       }}
//       className={`${CARD} flex h-full flex-col p-5`}
//     >
//       <div className="flex items-start justify-between">
//         <div>
//           <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
//             Active Agents
//           </h3>

//           <p className="mt-1 text-xs text-zinc-500">
//             0 live
//           </p>
//         </div>

//         <motion.button
//           onClick={() => onNavigate("/agents")}
//           whileHover={{
//             x: 3,
//           }}
//           whileTap={{
//             scale: 0.96,
//           }}
//           className="text-xs font-medium text-zinc-500 transition hover:text-cyan-500"
//         >
//           View all
//         </motion.button>
//       </div>

//       <div className="mt-6 flex flex-1 items-start">
//         <motion.button
//           onClick={() =>
//             onNavigate("/agents/create")
//           }
//           whileHover={{
//             y: -3,
//             scale: 1.01,
//           }}
//           whileTap={{
//             scale: 0.97,
//           }}
//           className="
//             flex w-full items-center justify-center
//             gap-2 rounded-lg
//             border border-dashed
//             border-black/15
//             bg-zinc-50/50
//             py-3.5
//             text-[13px] font-medium
//             text-zinc-700
//             transition-colors
//             hover:border-cyan-400
//             hover:bg-cyan-50/30
//             hover:text-cyan-600
//             dark:border-white/15
//             dark:bg-white/[0.02]
//             dark:text-zinc-300
//             dark:hover:border-cyan-400
//             dark:hover:bg-cyan-500/[0.04]
//             dark:hover:text-cyan-400
//           "
//         >
//           <motion.span
//             whileHover={{
//               rotate: 90,
//             }}
//             transition={{
//               duration: 0.2,
//             }}
//           >
//             <Plus size={14} />
//           </motion.span>

//           Create Agent
//         </motion.button>
//       </div>
//     </motion.div>
//   );
// };

// // ============================================================
// // TODAY'S ACTIVITY
// // ============================================================

// const TodaysActivity = () => {
//   const chartWidth = 620;
//   const chartHeight = 140;

//   const xLabels = [
//     "00:00",
//     "02:00",
//     "04:00",
//     "06:00",
//     "08:00",
//     "10:00",
//   ];

//   return (
//     <motion.div
//       variants={cardVariants}
//       whileHover={{
//         y: -3,
//       }}
//       className={`${CARD} p-5`}
//     >
//       <div>
//         <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
//           Today's Activity
//         </h3>

//         <p className="mt-1 text-xs text-zinc-500">
//           Call channels per hour
//         </p>
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

//       <motion.div
//         initial={{
//           opacity: 0,
//           scaleY: 0.8,
//         }}
//         animate={{
//           opacity: 1,
//           scaleY: 1,
//         }}
//         transition={{
//           duration: 0.7,
//           delay: 0.3,
//         }}
//         style={{
//           transformOrigin: "bottom",
//         }}
//         className="mt-3"
//       >
//         <svg
//           viewBox={`0 0 ${chartWidth} ${chartHeight + 28}`}
//           className="h-[170px] w-full"
//           preserveAspectRatio="none"
//         >
//           {[0, 1, 2, 3, 4].map((line) => {
//             const y =
//               chartHeight - (line / 4) * chartHeight;

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

//           <motion.polyline
//             initial={{
//               pathLength: 0,
//               opacity: 0,
//             }}
//             animate={{
//               pathLength: 1,
//               opacity: 1,
//             }}
//             transition={{
//               duration: 1.2,
//               delay: 0.3,
//             }}
//             points={`30,${chartHeight} ${chartWidth},${chartHeight}`}
//             fill="none"
//             stroke="#8B5CF6"
//             strokeWidth="1.5"
//           />

//           {xLabels.map((label, index) => (
//             <text
//               key={label}
//               x={
//                 30 +
//                 (index / (xLabels.length - 1)) *
//                   (chartWidth - 30)
//               }
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
//       </motion.div>

//       <div className="mt-3 flex flex-wrap items-center gap-5 border-t border-black/[0.05] pt-4 text-[11px] text-zinc-500 dark:border-white/[0.05]">
//         <div className="flex items-center gap-2">
//           <PhoneCall
//             size={11}
//             className="text-emerald-500"
//           />

//           <span>Outbound</span>

//           <span className="font-semibold text-zinc-800 dark:text-zinc-200">
//             0
//           </span>
//         </div>

//         <div className="flex items-center gap-2">
//           <PhoneCall
//             size={11}
//             className="text-cyan-500"
//           />

//           <span>Inbound</span>

//           <span className="font-semibold text-zinc-800 dark:text-zinc-200">
//             0
//           </span>
//         </div>

//         <div className="flex items-center gap-2">
//           <PhoneCall
//             size={11}
//             className="text-violet-500"
//           />

//           <span>Web</span>

//           <span className="font-semibold text-zinc-800 dark:text-zinc-200">
//             0
//           </span>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // ============================================================
// // TOP COUNTRIES
// // ============================================================

// const TopCountries = () => {
//   return (
//     <motion.div
//       variants={cardVariants}
//       whileHover={{
//         y: -3,
//       }}
//       className={`${CARD} flex h-full flex-col p-5`}
//     >
//       <h3 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
//         TOP COUNTRIES
//       </h3>

//       <div className="flex flex-1 flex-col items-center justify-center py-8">
//         <motion.p
//           initial={{
//             opacity: 0,
//           }}
//           animate={{
//             opacity: 1,
//           }}
//           transition={{
//             delay: 0.3,
//           }}
//           className="text-[13px] text-zinc-500"
//         >
//           No data yet
//         </motion.p>

//         <div className="mt-8 w-full">
//           <div className="border-b border-black/[0.06] pb-2 dark:border-white/[0.06]">
//             <span className="text-[9px] font-medium uppercase tracking-wider text-zinc-500">
//               Countries
//             </span>
//           </div>

//           <motion.div
//             initial={{
//               opacity: 0,
//               x: -8,
//             }}
//             animate={{
//               opacity: 1,
//               x: 0,
//             }}
//             transition={{
//               delay: 0.4,
//             }}
//             className="mt-3 flex items-center gap-2"
//           >
//             <motion.span
//               animate={{
//                 scale: [1, 1.25, 1],
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 repeatDelay: 2,
//               }}
//               className="h-2 w-2 rounded-full bg-cyan-500"
//             />

//             <span className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
//               0
//             </span>
//           </motion.div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // ============================================================
// // QUICK ACTION ITEM
// // ============================================================

// const QuickActionItem = ({
//   icon: Icon,
//   title,
//   subtitle,
//   onClick,
// }) => {
//   return (
//     <motion.button
//       onClick={onClick}
//       variants={cardVariants}
//       whileHover={{
//         y: -5,
//         scale: 1.015,
//       }}
//       whileTap={{
//         scale: 0.97,
//       }}
//       className={`${CARD} group flex items-center gap-3 p-4 text-left`}
//     >
//       <motion.div
//         whileHover={{
//           scale: 1.12,
//           rotate: 4,
//         }}
//         transition={{
//           type: "spring",
//           stiffness: 350,
//           damping: 18,
//         }}
//         className="
//           flex h-10 w-10 shrink-0
//           items-center justify-center
//           rounded-lg
//           bg-zinc-100
//           text-zinc-600
//           transition-colors
//           group-hover:bg-cyan-500/10
//           group-hover:text-cyan-600
//           dark:bg-white/[0.06]
//           dark:text-zinc-400
//           dark:group-hover:text-cyan-400
//         "
//       >
//         <Icon
//           size={17}
//           strokeWidth={1.7}
//         />
//       </motion.div>

//       <div className="min-w-0 flex-1">
//         <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">
//           {title}
//         </p>

//         <p className="mt-0.5 truncate text-xs text-zinc-500">
//           {subtitle}
//         </p>
//       </div>

//       <motion.div
//         whileHover={{
//           x: 4,
//         }}
//         transition={{
//           type: "spring",
//           stiffness: 400,
//           damping: 20,
//         }}
//       >
//         <ChevronRight
//           size={16}
//           className="
//             shrink-0
//             text-zinc-300
//             group-hover:text-cyan-500
//             dark:text-zinc-600
//             dark:group-hover:text-cyan-400
//           "
//         />
//       </motion.div>
//     </motion.button>
//   );
// };

// // ============================================================
// // QUICK ACTIONS
// // ============================================================

// const QuickActions = ({ onNavigate }) => {
//   return (
//     <motion.div
//       variants={cardVariants}
//       className={`${CARD} p-5`}
//     >
//       <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
//         Quick Actions
//       </h3>

//       <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
//         <QuickActionItem
//           icon={Bot}
//           title="Create Agent"
//           subtitle="Build AI assistant"
//           onClick={() =>
//             onNavigate("/agents/create")
//           }
//         />

//         <QuickActionItem
//           icon={ZapIcon}
//           title="New Campaign"
//           subtitle="Launch outbound calls"
//           onClick={() =>
//             onNavigate("/outbound/new")
//           }
//         />

//         <QuickActionItem
//           icon={UserPlus}
//           title="Add Contact"
//           subtitle="Import or create"
//           onClick={() =>
//             onNavigate("/contacts")
//           }
//         />

//         <QuickActionItem
//           icon={Smartphone}
//           title="Add Number"
//           subtitle="Provision number"
//           onClick={() =>
//             onNavigate("/phone-numbers")
//           }
//         />
//       </div>
//     </motion.div>
//   );
// };

// // ============================================================
// // DASHBOARD
// // ============================================================

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [greeting, setGreeting] = useState(
//     getGreeting()
//   );

//   // ==========================================================
//   // AUTOMATIC GREETING UPDATE
//   // ==========================================================

//   useEffect(() => {
//     const updateGreeting = () => {
//       setGreeting(getGreeting());
//     };

//     updateGreeting();

//     // Check every minute
//     const interval = setInterval(
//       updateGreeting,
//       60 * 1000
//     );

//     return () => clearInterval(interval);
//   }, []);

//   // ==========================================================
//   // SCROLL TO TOP ON ROUTE CHANGE
//   // ==========================================================

//   useEffect(() => {
//     window.scrollTo({
//       top: 0,
//       behavior: "instant",
//     });

//     const main = document.querySelector("main");

//     if (main) {
//       main.scrollTo({
//         top: 0,
//         behavior: "instant",
//       });
//     }
//   }, [location.pathname]);

//   return (
//     <motion.div
//       variants={pageVariants}
//       initial="hidden"
//       animate="visible"
//       className="
//         min-h-full
//         bg-zinc-50
//         text-zinc-900
//         transition-colors
//         duration-300
//         dark:bg-[#09090B]
//         dark:text-zinc-100
//       "
//     >
//       <motion.main
//         className="
//           mx-auto
//           max-w-[1600px]
//           space-y-5
//           p-4
//           sm:p-6
//           lg:p-7
//         "
//       >
//         {/* ==================================================
//             WELCOME
//         ================================================== */}

//         <motion.section variants={sectionVariants}>
//           <div className="flex flex-wrap items-center gap-2">
//             <motion.h1
//               key={greeting}
//               initial={{
//                 opacity: 0,
//                 x: -15,
//                 y: 4,
//               }}
//               animate={{
//                 opacity: 1,
//                 x: 0,
//                 y: 0,
//               }}
//               transition={{
//                 duration: 0.45,
//               }}
//               className="
//                 text-[22px]
//                 font-semibold
//                 tracking-tight
//                 text-zinc-900
//                 dark:text-zinc-100
//                 sm:text-2xl
//               "
//             >
//               {greeting}, JeevaAI
//             </motion.h1>

//             <motion.div
//               animate={{
//                 rotate: [0, 8, -8, 0],
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 repeatDelay: 5,
//               }}
//             >
//               <Info
//                 size={15}
//                 className="text-zinc-400"
//               />
//             </motion.div>
//           </div>

//           <motion.p
//             initial={{
//               opacity: 0,
//               y: 5,
//             }}
//             animate={{
//               opacity: 1,
//               y: 0,
//             }}
//             transition={{
//               delay: 0.15,
//               duration: 0.35,
//             }}
//             className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-500"
//           >
//             Your agents handled{" "}
//             <span className="font-semibold text-zinc-900 dark:text-zinc-200">
//               0 calls
//             </span>{" "}
//             this month with{" "}
//             <span className="font-semibold text-emerald-500 dark:text-emerald-400">
//               0.00% success
//             </span>
//           </motion.p>
//         </motion.section>

//         {/* ==================================================
//             STATS + GLOBAL REACH
//         ================================================== */}

//         <motion.section
//           variants={sectionVariants}
//           className="
//             grid grid-cols-1 gap-5
//             xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,1fr)]
//           "
//         >
//           <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
//             <StatCard
//               icon={Clock3}
//               label="Total Minutes"
//               value="0"
//             />

//             <StatCard
//               icon={Bot}
//               label="Active Agents"
//               value="1"
//             />

//             <StatCard
//               icon={PhoneCall}
//               label="Live Calls"
//               value="0"
//               live
//               accent
//             />

//             <StatCard
//               icon={Coins}
//               label="Credits"
//               value="0"
//             />

//             <StatCard
//               icon={Target}
//               label="Success Rate"
//               value="0.00%"
//             />

//             <StatCard
//               icon={Zap}
//               label="Conversion"
//               value="0%"
//             />
//           </div>

//           <motion.div
//             variants={cardVariants}
//             whileHover={{
//               y: -3,
//             }}
//           >
//             <GlobalReach />
//           </motion.div>
//         </motion.section>

//         {/* ==================================================
//             USAGE + OUTCOMES
//         ================================================== */}

//         <motion.section
//           variants={sectionVariants}
//           className="
//             grid grid-cols-1 gap-5
//             xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,1fr)]
//           "
//         >
//           <UsageTrends />
//           <CallOutcomes />
//         </motion.section>

//         {/* ==================================================
//             ACTIVE + TODAY + COUNTRIES
//         ================================================== */}

//         <motion.section
//           variants={sectionVariants}
//           className="
//             grid grid-cols-1 gap-5
//             xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)_minmax(0,0.9fr)]
//           "
//         >
//           <ActiveAgents
//             onNavigate={navigate}
//           />

//           <TodaysActivity />

//           <TopCountries />
//         </motion.section>

//         {/* ==================================================
//             QUICK ACTIONS
//         ================================================== */}

//         <motion.section variants={sectionVariants}>
//           <QuickActions
//             onNavigate={navigate}
//           />
//         </motion.section>
//       </motion.main>
//     </motion.div>
//   );
// }




// import React, { useState, useEffect } from "react";

// import { useNavigate, useLocation } from "react-router-dom";

// import { motion } from "framer-motion";
// import Config from "../../config/Config";



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

// // GREETING

// // ============================================================



// const getGreeting = () => {

//   const hour = new Date().getHours();



//   if (hour >= 5 && hour < 12) {

//     return "Good Morning";

//   }



//   if (hour >= 12 && hour < 17) {

//     return "Good Afternoon";

//   }



//   if (hour >= 17 && hour < 21) {

//     return "Good Evening";

//   }



//   return "Good Night";

// };



// // ============================================================

// // ANIMATION VARIANTS

// // ============================================================



// const pageVariants = {

//   hidden: {

//     opacity: 0,

//   },



//   visible: {

//     opacity: 1,

//     transition: {

//       duration: 0.4,

//       staggerChildren: 0.08,

//     },

//   },

// };



// const sectionVariants = {

//   hidden: {

//     opacity: 0,

//     y: 18,

//   },



//   visible: {

//     opacity: 1,

//     y: 0,

//     transition: {

//       duration: 0.45,

//       ease: [0.22, 1, 0.36, 1],

//     },

//   },

// };



// const cardVariants = {

//   hidden: {

//     opacity: 0,

//     y: 16,

//     scale: 0.98,

//   },



//   visible: {

//     opacity: 1,

//     y: 0,

//     scale: 1,

//     transition: {

//       duration: 0.4,

//       ease: [0.22, 1, 0.36, 1],

//     },

//   },

// };



// // ============================================================

// // SHARED CARD STYLE

// // ============================================================



// const CARD = `

//   rounded-2xl

//   border border-black/[0.07]

//   bg-white

//   transition-all duration-300 ease-out

//   hover:-translate-y-[2px]

//   hover:border-cyan-400/30

//   hover:shadow-[0_8px_28px_-10px_rgba(6,182,212,0.18)]

//   dark:border-white/[0.08]

//   dark:bg-[#101012]

//   dark:hover:border-cyan-400/25

//   dark:hover:shadow-[0_8px_28px_-10px_rgba(34,211,238,0.14)]

// `;



// // ============================================================

// // STAT CARD

// // ============================================================



// const StatCard = ({

//   icon: Icon,

//   label,

//   value,

//   live = false,

//   accent = false,

// }) => {

//   return (

//     <motion.div

//       variants={cardVariants}

//       whileHover={{

//         y: -4,

//         scale: 1.015,

//       }}

//       whileTap={{

//         scale: 0.99,

//       }}

//       transition={{

//         duration: 0.2,

//       }}

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

//       {accent && (

//         <motion.div

//           animate={{

//             opacity: [0.15, 0.3, 0.15],

//           }}

//           transition={{

//             duration: 3,

//             repeat: Infinity,

//             ease: "easeInOut",

//           }}

//           className="

//             pointer-events-none

//             absolute -right-10 -top-10

//             h-24 w-24 rounded-full

//             bg-cyan-400/20

//             blur-2xl

//           "

//         />

//       )}



//       <div className="relative mb-5 flex items-center justify-between">

//         <motion.div

//           whileHover={{

//             scale: 1.12,

//             rotate: 4,

//           }}

//           transition={{

//             type: "spring",

//             stiffness: 350,

//             damping: 18,

//           }}

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

//         </motion.div>



//         {live && (

//           <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">

//             <motion.span

//               animate={{

//                 scale: [1, 1.5, 1],

//                 opacity: [1, 0.45, 1],

//               }}

//               transition={{

//                 duration: 1.6,

//                 repeat: Infinity,

//                 ease: "easeInOut",

//               }}

//               className="h-1.5 w-1.5 rounded-full bg-cyan-500"

//             />



//             Live

//           </div>

//         )}

//       </div>



//       <p className="relative mb-1.5 text-[10px] font-medium uppercase tracking-[0.08em] text-zinc-500">

//         {label}

//       </p>



//       <motion.div

//         initial={{

//           opacity: 0,

//           y: 6,

//         }}

//         animate={{

//           opacity: 1,

//           y: 0,

//         }}

//         transition={{

//           delay: 0.15,

//           duration: 0.3,

//         }}

//         className={`relative text-[22px] font-semibold tracking-tight ${

//           accent

//             ? "text-cyan-600 dark:text-cyan-400"

//             : "text-zinc-900 dark:text-zinc-100"

//         }`}

//       >

//         {value}

//       </motion.div>

//     </motion.div>

//   );

// };



// // ============================================================

// // USAGE TRENDS

// // ============================================================



// const UsageTrends = ({ usageTrends }) => {

//   const [period, setPeriod] = useState("Month");

//   const points = Array.isArray(usageTrends?.points)
//     ? usageTrends.points
//     : [];

//   const periods = ["Day", "Week", "Month"];



//   const chartWidth = 620;

//   const chartHeight = 160;



//   const xLabels = [

//     "Aug 26",

//     "Aug 31",

//     "Sep 5",

//     "Sep 10",

//     "Sep 15",

//     "Sep 20",

//   ];



//   return (

//     <motion.div

//       variants={cardVariants}

//       whileHover={{

//         y: -3,

//       }}

//       className={`${CARD} p-5`}

//     >

//       <div className="flex flex-wrap items-start justify-between gap-3">

//         <div>

//           <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">

//             Usage Trends

//           </h3>



//           <motion.p

//             key={period}

//             initial={{

//               opacity: 0,

//               x: -5,

//             }}

//             animate={{

//               opacity: 1,

//               x: 0,

//             }}

//             className="mt-1 text-xs text-zinc-500"

//           >

//             {period === "Day"

//               ? "Last 24 hours"

//               : period === "Week"

//                 ? "Last 7 days"

//                 : "Last 30 days"}

//           </motion.p>

//         </div>



//         <div className="flex rounded-lg border border-black/[0.08] bg-white p-1 dark:border-white/[0.08] dark:bg-[#17171A]">

//           {periods.map((item) => (

//             <motion.button

//               key={item}

//               onClick={() => setPeriod(item)}

//               whileHover={{

//                 scale: 1.04,

//               }}

//               whileTap={{

//                 scale: 0.95,

//               }}

//               className={`rounded-md px-3 py-1 text-[11px] font-medium transition-colors ${

//                 period === item

//                   ? "bg-cyan-500/15 font-semibold text-cyan-600 dark:text-cyan-400"

//                   : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"

//               }`}

//             >

//               {item}

//             </motion.button>

//           ))}

//         </div>

//       </div>



//       <motion.div

//         initial={{

//           opacity: 0,

//           scaleY: 0.85,

//         }}

//         animate={{

//           opacity: 1,

//           scaleY: 1,

//         }}

//         transition={{

//           duration: 0.7,

//           delay: 0.2,

//           ease: [0.22, 1, 0.36, 1],

//         }}

//         style={{

//           transformOrigin: "bottom",

//         }}

//         className="mt-6"

//       >

//         <svg

//           viewBox={`0 0 ${chartWidth} ${chartHeight + 28}`}

//           className="h-[210px] w-full"

//           preserveAspectRatio="none"

//         >

//           {[0, 1, 2, 3, 4].map((line) => {

//             const y =

//               chartHeight - (line / 4) * chartHeight;



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



//           {(() => {
//             const maxValue = Math.max(
//               1,
//               ...points.map((point) =>
//                 Math.max(Number(point.calls) || 0, Number(point.minutes) || 0)
//               )
//             );

//             const getPoints = (key) =>
//               points.length > 0
//                 ? points
//                     .map((point, index) => {
//                       const x =
//                         30 +
//                         (index / Math.max(points.length - 1, 1)) *
//                           (chartWidth - 30);
//                       const value = Number(point[key]) || 0;
//                       const y =
//                         chartHeight - (value / maxValue) * chartHeight;
//                       return `${x},${y}`;
//                     })
//                     .join(" ")
//                 : `30,${chartHeight} ${chartWidth},${chartHeight}`;

//             return (
//               <>
//                 <motion.polyline
//                   initial={{ pathLength: 0, opacity: 0 }}
//                   animate={{ pathLength: 1, opacity: 1 }}
//                   transition={{ duration: 1, delay: 0.3 }}
//                   points={getPoints("calls")}
//                   fill="none"
//                   stroke="#0EA5E9"
//                   strokeWidth="1.5"
//                 />
//                 <motion.polyline
//                   initial={{ pathLength: 0, opacity: 0 }}
//                   animate={{ pathLength: 1, opacity: 1 }}
//                   transition={{ duration: 1, delay: 0.4 }}
//                   points={getPoints("minutes")}
//                   fill="none"
//                   stroke="#F59E0B"
//                   strokeWidth="1.5"
//                 />
//               </>
//             );
//           })()}



//           {xLabels.map((label, index) => (

//             <text

//               key={label}

//               x={

//                 30 +

//                 (index / (xLabels.length - 1)) *

//                   (chartWidth - 30)

//               }

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

//       </motion.div>



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



//         <motion.div

//           whileHover={{

//             x: 3,

//           }}

//           className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-500"

//         >

//           <TrendingUp size={12} />

//           vs last period

//         </motion.div>

//       </div>

//     </motion.div>

//   );

// };



// // ============================================================

// // OUTCOME ITEM

// // ============================================================



// const OutcomeItem = ({

//   label,

//   value,

//   color,

//   Icon,

// }) => {

//   return (

//     <motion.div

//       whileHover={{

//         y: -2,

//         scale: 1.01,

//       }}

//       className="rounded-lg border border-black/[0.06] bg-zinc-50/60 p-3 dark:border-white/[0.06] dark:bg-[#15161a]"

//     >

//       <div className="mb-2 flex items-center justify-between">

//         <span className="text-[9px] font-medium uppercase tracking-wider text-zinc-500">

//           {label}

//         </span>



//         {Icon && (

//           <Icon

//             size={11}

//             className={color}

//           />

//         )}

//       </div>



//       <p className={`text-[15px] font-semibold ${color}`}>

//         {value}

//       </p>

//     </motion.div>

//   );

// };



// // ============================================================

// // CALL OUTCOMES

// // ============================================================



// const CallOutcomes = ({ callOutcomes }) => {
//   const total = Number(callOutcomes?.total) || 0;
//   const success = Number(callOutcomes?.success) || 0;
//   const failed = Number(callOutcomes?.failed) || 0;
//   const inbound = Number(callOutcomes?.inbound) || 0;
//   const outbound = Number(callOutcomes?.outbound) || 0;
//   const successRate = Number(callOutcomes?.success_rate) || 0;
//   const circumference = 238.76;
//   const successOffset =
//     circumference -
//     (Math.min(Math.max(successRate, 0), 100) / 100) * circumference;

//   return (

//     <motion.div

//       variants={cardVariants}

//       whileHover={{

//         y: -3,

//       }}

//       className={`${CARD} p-5`}

//     >

//       <div>

//         <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">

//           Call Outcomes

//         </h3>



//         <p className="mt-1 text-xs text-zinc-500">

//           Success vs failed per week

//         </p>

//       </div>



//       <div className="mt-5 flex items-start gap-4">

//         <motion.div

//           initial={{

//             opacity: 0,

//             scale: 0.8,

//           }}

//           animate={{

//             opacity: 1,

//             scale: 1,

//           }}

//           transition={{

//             duration: 0.6,

//             delay: 0.25,

//           }}

//           className="relative flex h-[100px] w-[100px] shrink-0 items-center justify-center"

//         >

//           <svg

//             viewBox="0 0 100 100"

//             className="h-full w-full -rotate-90"

//           >

//             <circle

//               cx="50"

//               cy="50"

//               r="38"

//               fill="none"

//               stroke="currentColor"

//               className="text-zinc-100 dark:text-zinc-800"

//               strokeWidth="9"

//             />



//             <motion.circle

//               cx="50"

//               cy="50"

//               r="38"

//               fill="none"

//               stroke="#0EA5E9"

//               strokeWidth="9"

//               strokeDasharray="238.76"

//               strokeDashoffset={successOffset}

//               strokeLinecap="round"

//             />

//           </svg>



//           <div className="absolute inset-0 flex flex-col items-center justify-center">

//             <motion.span

//               initial={{

//                 opacity: 0,

//                 scale: 0.7,

//               }}

//               animate={{

//                 opacity: 1,

//                 scale: 1,

//               }}

//               transition={{

//                 delay: 0.5,

//               }}

//               className="text-[13px] font-bold text-zinc-800 dark:text-zinc-200"

//             >

//               0%

//             </motion.span>



//             <span className="text-[9px] uppercase tracking-wider text-zinc-500">

//               success

//             </span>

//           </div>

//         </motion.div>



//         <div className="grid min-w-0 flex-1 grid-cols-2 gap-2">

//           <OutcomeItem

//             label="Total"

//             value={total}

//             color="text-zinc-800 dark:text-zinc-200"

//           />



//           <OutcomeItem

//             label="Success"

//             value={success}

//             color="text-emerald-500"

//             Icon={CheckCircle2}

//           />



//           <OutcomeItem

//             label="Failed"

//             value={failed}

//             color="text-red-500"

//             Icon={XCircle}

//           />



//           <OutcomeItem

//             label="Outbound"

//             value={outbound}

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

//               {inbound}

//             </span>

//           </span>



//           <span className="text-zinc-300 dark:text-zinc-700">

//             ·

//           </span>



//           <span>

//             Web{" "}

//             <span className="font-semibold text-zinc-800 dark:text-zinc-200">

//               0

//             </span>

//           </span>

//         </div>

//       </div>

//     </motion.div>

//   );

// };



// // ============================================================

// // ACTIVE AGENTS

// // ============================================================



// const ActiveAgents = ({ onNavigate, activeAgents }) => {

//   return (

//     <motion.div

//       variants={cardVariants}

//       whileHover={{

//         y: -3,

//       }}

//       className={`${CARD} flex h-full flex-col p-5`}

//     >

//       <div className="flex items-start justify-between">

//         <div>

//           <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">

//             Active Agents

//           </h3>



//           <p className="mt-1 text-xs text-zinc-500">

//             {activeAgents} live

//           </p>

//         </div>



//         <motion.button

//           onClick={() => onNavigate("/agents")}

//           whileHover={{

//             x: 3,

//           }}

//           whileTap={{

//             scale: 0.96,

//           }}

//           className="text-xs font-medium text-zinc-500 transition hover:text-cyan-500"

//         >

//           View all

//         </motion.button>

//       </div>



//       <div className="mt-6 flex flex-1 items-start">

//         <motion.button

//           onClick={() =>

//             onNavigate("/agents/create")

//           }

//           whileHover={{

//             y: -3,

//             scale: 1.01,

//           }}

//           whileTap={{

//             scale: 0.97,

//           }}

//           className="

//             flex w-full items-center justify-center

//             gap-2 rounded-lg

//             border border-dashed

//             border-black/15

//             bg-zinc-50/50

//             py-3.5

//             text-[13px] font-medium

//             text-zinc-700

//             transition-colors

//             hover:border-cyan-400

//             hover:bg-cyan-50/30

//             hover:text-cyan-600

//             dark:border-white/15

//             dark:bg-white/[0.02]

//             dark:text-zinc-300

//             dark:hover:border-cyan-400

//             dark:hover:bg-cyan-500/[0.04]

//             dark:hover:text-cyan-400

//           "

//         >

//           <motion.span

//             whileHover={{

//               rotate: 90,

//             }}

//             transition={{

//               duration: 0.2,

//             }}

//           >

//             <Plus size={14} />

//           </motion.span>



//           Create Agent

//         </motion.button>

//       </div>

//     </motion.div>

//   );

// };



// // ============================================================

// // TODAY'S ACTIVITY

// // ============================================================



// const TodaysActivity = () => {

//   const chartWidth = 620;

//   const chartHeight = 140;



//   const xLabels = [

//     "00:00",

//     "02:00",

//     "04:00",

//     "06:00",

//     "08:00",

//     "10:00",

//   ];



//   return (

//     <motion.div

//       variants={cardVariants}

//       whileHover={{

//         y: -3,

//       }}

//       className={`${CARD} p-5`}

//     >

//       <div>

//         <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">

//           Today's Activity

//         </h3>



//         <p className="mt-1 text-xs text-zinc-500">

//           Call channels per hour

//         </p>

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



//       <motion.div

//         initial={{

//           opacity: 0,

//           scaleY: 0.8,

//         }}

//         animate={{

//           opacity: 1,

//           scaleY: 1,

//         }}

//         transition={{

//           duration: 0.7,

//           delay: 0.3,

//         }}

//         style={{

//           transformOrigin: "bottom",

//         }}

//         className="mt-3"

//       >

//         <svg

//           viewBox={`0 0 ${chartWidth} ${chartHeight + 28}`}

//           className="h-[170px] w-full"

//           preserveAspectRatio="none"

//         >

//           {[0, 1, 2, 3, 4].map((line) => {

//             const y =

//               chartHeight - (line / 4) * chartHeight;



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



//           <motion.polyline

//             initial={{

//               pathLength: 0,

//               opacity: 0,

//             }}

//             animate={{

//               pathLength: 1,

//               opacity: 1,

//             }}

//             transition={{

//               duration: 1.2,

//               delay: 0.3,

//             }}

//             points={`30,${chartHeight} ${chartWidth},${chartHeight}`}

//             fill="none"

//             stroke="#8B5CF6"

//             strokeWidth="1.5"

//           />



//           {xLabels.map((label, index) => (

//             <text

//               key={label}

//               x={

//                 30 +

//                 (index / (xLabels.length - 1)) *

//                   (chartWidth - 30)

//               }

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

//       </motion.div>



//       <div className="mt-3 flex flex-wrap items-center gap-5 border-t border-black/[0.05] pt-4 text-[11px] text-zinc-500 dark:border-white/[0.05]">

//         <div className="flex items-center gap-2">

//           <PhoneCall

//             size={11}

//             className="text-emerald-500"

//           />



//           <span>Outbound</span>



//           <span className="font-semibold text-zinc-800 dark:text-zinc-200">

//             0

//           </span>

//         </div>



//         <div className="flex items-center gap-2">

//           <PhoneCall

//             size={11}

//             className="text-cyan-500"

//           />



//           <span>Inbound</span>



//           <span className="font-semibold text-zinc-800 dark:text-zinc-200">

//             0

//           </span>

//         </div>



//         <div className="flex items-center gap-2">

//           <PhoneCall

//             size={11}

//             className="text-violet-500"

//           />



//           <span>Web</span>



//           <span className="font-semibold text-zinc-800 dark:text-zinc-200">

//             0

//           </span>

//         </div>

//       </div>

//     </motion.div>

//   );

// };



// // ============================================================

// // TOP COUNTRIES

// // ============================================================



// const TopCountries = () => {

//   return (

//     <motion.div

//       variants={cardVariants}

//       whileHover={{

//         y: -3,

//       }}

//       className={`${CARD} flex h-full flex-col p-5`}

//     >

//       <h3 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">

//         TOP COUNTRIES

//       </h3>



//       <div className="flex flex-1 flex-col items-center justify-center py-8">

//         <motion.p

//           initial={{

//             opacity: 0,

//           }}

//           animate={{

//             opacity: 1,

//           }}

//           transition={{

//             delay: 0.3,

//           }}

//           className="text-[13px] text-zinc-500"

//         >

//           No data yet

//         </motion.p>



//         <div className="mt-8 w-full">

//           <div className="border-b border-black/[0.06] pb-2 dark:border-white/[0.06]">

//             <span className="text-[9px] font-medium uppercase tracking-wider text-zinc-500">

//               Countries

//             </span>

//           </div>



//           <motion.div

//             initial={{

//               opacity: 0,

//               x: -8,

//             }}

//             animate={{

//               opacity: 1,

//               x: 0,

//             }}

//             transition={{

//               delay: 0.4,

//             }}

//             className="mt-3 flex items-center gap-2"

//           >

//             <motion.span

//               animate={{

//                 scale: [1, 1.25, 1],

//               }}

//               transition={{

//                 duration: 2,

//                 repeat: Infinity,

//                 repeatDelay: 2,

//               }}

//               className="h-2 w-2 rounded-full bg-cyan-500"

//             />



//             <span className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">

//               0

//             </span>

//           </motion.div>

//         </div>

//       </div>

//     </motion.div>

//   );

// };



// // ============================================================

// // QUICK ACTION ITEM

// // ============================================================



// const QuickActionItem = ({

//   icon: Icon,

//   title,

//   subtitle,

//   onClick,

// }) => {

//   return (

//     <motion.button

//       onClick={onClick}

//       variants={cardVariants}

//       whileHover={{

//         y: -5,

//         scale: 1.015,

//       }}

//       whileTap={{

//         scale: 0.97,

//       }}

//       className={`${CARD} group flex items-center gap-3 p-4 text-left`}

//     >

//       <motion.div

//         whileHover={{

//           scale: 1.12,

//           rotate: 4,

//         }}

//         transition={{

//           type: "spring",

//           stiffness: 350,

//           damping: 18,

//         }}

//         className="

//           flex h-10 w-10 shrink-0

//           items-center justify-center

//           rounded-lg

//           bg-zinc-100

//           text-zinc-600

//           transition-colors

//           group-hover:bg-cyan-500/10

//           group-hover:text-cyan-600

//           dark:bg-white/[0.06]

//           dark:text-zinc-400

//           dark:group-hover:text-cyan-400

//         "

//       >

//         <Icon

//           size={17}

//           strokeWidth={1.7}

//         />

//       </motion.div>



//       <div className="min-w-0 flex-1">

//         <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">

//           {title}

//         </p>



//         <p className="mt-0.5 truncate text-xs text-zinc-500">

//           {subtitle}

//         </p>

//       </div>



//       <motion.div

//         whileHover={{

//           x: 4,

//         }}

//         transition={{

//           type: "spring",

//           stiffness: 400,

//           damping: 20,

//         }}

//       >

//         <ChevronRight

//           size={16}

//           className="

//             shrink-0

//             text-zinc-300

//             group-hover:text-cyan-500

//             dark:text-zinc-600

//             dark:group-hover:text-cyan-400

//           "

//         />

//       </motion.div>

//     </motion.button>

//   );

// };



// // ============================================================

// // QUICK ACTIONS

// // ============================================================



// const QuickActions = ({ onNavigate }) => {

//   return (

//     <motion.div

//       variants={cardVariants}

//       className={`${CARD} p-5`}

//     >

//       <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">

//         Quick Actions

//       </h3>



//       <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

//         <QuickActionItem

//           icon={Bot}

//           title="Create Agent"

//           subtitle="Build AI assistant"

//           onClick={() =>

//             onNavigate("/agents/create")

//           }

//         />



//         <QuickActionItem

//           icon={ZapIcon}

//           title="New Campaign"

//           subtitle="Launch outbound calls"

//           onClick={() =>

//             onNavigate("/outbound/new")

//           }

//         />



//         <QuickActionItem

//           icon={UserPlus}

//           title="Add Contact"

//           subtitle="Import or create"

//           onClick={() =>

//             onNavigate("/contacts")

//           }

//         />



//         <QuickActionItem

//           icon={Smartphone}

//           title="Add Number"

//           subtitle="Provision number"

//           onClick={() =>

//             onNavigate("/phone-numbers")

//           }

//         />

//       </div>

//     </motion.div>

//   );

// };



// // ============================================================

// // DASHBOARD

// // ============================================================



// export default function Dashboard() {

//   const navigate = useNavigate();

//   const location = useLocation();



//   const [greeting, setGreeting] = useState(getGreeting());
//   const [dashboardData, setDashboardData] = useState({
//     greeting: {
//       first_name: "",
//       calls_this_month: 0,
//       success_rate_this_month: 0,
//     },
//     kpis: {
//       total_minutes: 0,
//       active_agents: 0,
//       live_calls: 0,
//       credits_used: 0,
//       credits_balance: 0,
//       success_rate: 0,
//       conversion_rate: 0,
//     },
//     usage_trends: {
//       range: "month",
//       points: [],
//     },
//     call_outcomes: {
//       total: 0,
//       success: 0,
//       failed: 0,
//       inbound: 0,
//       outbound: 0,
//       success_rate: 0,
//       weekly: [],
//     },
//   });



//   // ==========================================================
//   // DASHBOARD API
//   // ==========================================================

//   useEffect(() => {
//     const fetchDashboardOverview = async () => {
//       try {

//         const authData = JSON.parse(
//           localStorage.getItem("ravanai_auth") || "{}"
//         );

//         const token =
//           localStorage.getItem("access_token") || authData?.token || "";

//         const headers = {
//           Accept: "application/json",
//         };

//         if (token) {
//           headers.Authorization = `Bearer ${token}`;
//         }

//         const response = await fetch(
//           `${config.BASE_URL}/dashboard/overview`,
//           {
//             method: "GET",
//             headers,
//           }
//         );

//         let responseData = {};
//         try {
//           responseData = await response.json();
//         } catch {
//           responseData = {};
//         }

//         if (!response.ok) {
//           const detail = Array.isArray(responseData?.detail)
//             ? responseData.detail
//                 .map((item) => item?.msg || item)
//                 .join(", ")
//             : responseData?.detail ||
//               responseData?.message ||
//               responseData?.error ||
//               "Failed to load dashboard data.";

//           throw new Error(detail);
//         }

//         setDashboardData({
//           greeting: {
//             first_name: responseData?.greeting?.first_name || "",
//             calls_this_month:
//               Number(responseData?.greeting?.calls_this_month) || 0,
//             success_rate_this_month:
//               Number(responseData?.greeting?.success_rate_this_month) || 0,
//           },
//           kpis: {
//             total_minutes: Number(responseData?.kpis?.total_minutes) || 0,
//             active_agents: Number(responseData?.kpis?.active_agents) || 0,
//             live_calls: Number(responseData?.kpis?.live_calls) || 0,
//             credits_used: Number(responseData?.kpis?.credits_used) || 0,
//             credits_balance:
//               Number(responseData?.kpis?.credits_balance) || 0,
//             success_rate: Number(responseData?.kpis?.success_rate) || 0,
//             conversion_rate:
//               Number(responseData?.kpis?.conversion_rate) || 0,
//           },
//           usage_trends: {
//             range: responseData?.usage_trends?.range || "month",
//             points: Array.isArray(responseData?.usage_trends?.points)
//               ? responseData.usage_trends.points
//               : [],
//           },
//           call_outcomes: {
//             total: Number(responseData?.call_outcomes?.total) || 0,
//             success: Number(responseData?.call_outcomes?.success) || 0,
//             failed: Number(responseData?.call_outcomes?.failed) || 0,
//             inbound: Number(responseData?.call_outcomes?.inbound) || 0,
//             outbound: Number(responseData?.call_outcomes?.outbound) || 0,
//             success_rate:
//               Number(responseData?.call_outcomes?.success_rate) || 0,
//             weekly: Array.isArray(responseData?.call_outcomes?.weekly)
//               ? responseData.call_outcomes.weekly
//               : [],
//           },
//         });
//       } catch (error) {
//         console.error("Dashboard overview API error:", error);
//       }
//     };

//     fetchDashboardOverview();
//   }, []);

//   // ==========================================================
//   // AUTOMATIC GREETING UPDATE
//   // ==========================================================
//   useEffect(() => {

//     const updateGreeting = () => {

//       setGreeting(getGreeting());

//     };



//     updateGreeting();



//     // Check every minute

//     const interval = setInterval(

//       updateGreeting,

//       60 * 1000

//     );



//     return () => clearInterval(interval);

//   }, []);



//   // ==========================================================

//   // SCROLL TO TOP ON ROUTE CHANGE

//   // ==========================================================



//   useEffect(() => {

//     window.scrollTo({

//       top: 0,

//       behavior: "instant",

//     });



//     const main = document.querySelector("main");



//     if (main) {

//       main.scrollTo({

//         top: 0,

//         behavior: "instant",

//       });

//     }

//   }, [location.pathname]);



//   return (

//     <motion.div

//       variants={pageVariants}

//       initial="hidden"

//       animate="visible"

//       className="

//         min-h-full

//         bg-zinc-50

//         text-zinc-900

//         transition-colors

//         duration-300

//         dark:bg-[#09090B]

//         dark:text-zinc-100

//       "

//     >

//       <motion.main

//         className="

//           mx-auto

//           max-w-[1600px]

//           space-y-5

//           p-4

//           sm:p-6

//           lg:p-7

//         "

//       >

//         {/* ==================================================

//             WELCOME

//         ================================================== */}



//         <motion.section variants={sectionVariants}>

//           <div className="flex flex-wrap items-center gap-2">

//             <motion.h1

//               key={greeting}

//               initial={{

//                 opacity: 0,

//                 x: -15,

//                 y: 4,

//               }}

//               animate={{

//                 opacity: 1,

//                 x: 0,

//                 y: 0,

//               }}

//               transition={{

//                 duration: 0.45,

//               }}

//               className="

//                 text-[22px]

//                 font-semibold

//                 tracking-tight

//                 text-zinc-900

//                 dark:text-zinc-100

//                 sm:text-2xl

//               "

//             >

//               {greeting}, {dashboardData.greeting.first_name || "JeevaAI"}

//             </motion.h1>



//             <motion.div

//               animate={{

//                 rotate: [0, 8, -8, 0],

//               }}

//               transition={{

//                 duration: 2,

//                 repeat: Infinity,

//                 repeatDelay: 5,

//               }}

//             >

//               <Info

//                 size={15}

//                 className="text-zinc-400"

//               />

//             </motion.div>

//           </div>



//           <motion.p

//             initial={{

//               opacity: 0,

//               y: 5,

//             }}

//             animate={{

//               opacity: 1,

//               y: 0,

//             }}

//             transition={{

//               delay: 0.15,

//               duration: 0.35,

//             }}

//             className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-500"

//           >

//             Your agents handled{" "}

//             <span className="font-semibold text-zinc-900 dark:text-zinc-200">

//               {dashboardData.greeting.calls_this_month} calls

//             </span>{" "}

//             this month with{" "}

//             <span className="font-semibold text-emerald-500 dark:text-emerald-400">

//               {dashboardData.greeting.success_rate_this_month.toFixed(2)}% success

//             </span>

//           </motion.p>

//         </motion.section>



//         {/* ==================================================

//             STATS + GLOBAL REACH

//         ================================================== */}



//         <motion.section

//           variants={sectionVariants}

//           className="

//             grid grid-cols-1 gap-5

//             xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,1fr)]

//           "

//         >

//           <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

//             <StatCard

//               icon={Clock3}

//               label="Total Minutes"

//               value={dashboardData.kpis.total_minutes}

//             />



//             <StatCard

//               icon={Bot}

//               label="Active Agents"

//               value={dashboardData.kpis.active_agents}

//             />



//             <StatCard

//               icon={PhoneCall}

//               label="Live Calls"

//               value={dashboardData.kpis.live_calls}

//               live

//               accent

//             />



//             <StatCard

//               icon={Coins}

//               label="Credits"

//               value={`${dashboardData.kpis.credits_used} / ${dashboardData.kpis.credits_balance}`}

//             />



//             <StatCard

//               icon={Target}

//               label="Success Rate"

//               value={`${dashboardData.kpis.success_rate.toFixed(2)}%`}

//             />



//             <StatCard

//               icon={Zap}

//               label="Conversion"

//               value={`${dashboardData.kpis.conversion_rate.toFixed(2)}%`}

//             />

//           </div>



//           <motion.div

//             variants={cardVariants}

//             whileHover={{

//               y: -3,

//             }}

//           >

//             <GlobalReach />

//           </motion.div>

//         </motion.section>



//         {/* ==================================================

//             USAGE + OUTCOMES

//         ================================================== */}



//         <motion.section

//           variants={sectionVariants}

//           className="

//             grid grid-cols-1 gap-5

//             xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,1fr)]

//           "

//         >

//           <UsageTrends usageTrends={dashboardData.usage_trends} />

//           <CallOutcomes callOutcomes={dashboardData.call_outcomes} />

//         </motion.section>



//         {/* ==================================================

//             ACTIVE + TODAY + COUNTRIES

//         ================================================== */}



//         <motion.section

//           variants={sectionVariants}

//           className="

//             grid grid-cols-1 gap-5

//             xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)_minmax(0,0.9fr)]

//           "

//         >

//           <ActiveAgents

//             onNavigate={navigate}

//           activeAgents={dashboardData.kpis.active_agents}
//           />



//           <TodaysActivity />



//           <TopCountries />

//         </motion.section>



//         {/* ==================================================

//             QUICK ACTIONS

//         ================================================== */}



//         <motion.section variants={sectionVariants}>

//           <QuickActions

//             onNavigate={navigate}

//           />

//         </motion.section>

//       </motion.main>

//     </motion.div>

//   );

// }




// import React, { useState, useEffect } from "react";

// import { useNavigate, useLocation } from "react-router-dom";

// import { motion } from "framer-motion";

// import Config from "../../config/Config";

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

// // GREETING

// // ============================================================

// const getGreeting = () => {

//   const hour = new Date().getHours();

//   if (hour >= 5 && hour < 12) {

//     return "Good Morning";

//   }

//   if (hour >= 12 && hour < 17) {

//     return "Good Afternoon";

//   }

//   if (hour >= 17 && hour < 21) {

//     return "Good Evening";

//   }

//   return "Good Night";

// };

// // ============================================================

// // ANIMATION VARIANTS

// // ============================================================

// const pageVariants = {

//   hidden: {

//     opacity: 0,

//   },

//   visible: {

//     opacity: 1,

//     transition: {

//       duration: 0.4,

//       staggerChildren: 0.08,

//     },

//   },

// };

// const sectionVariants = {

//   hidden: {

//     opacity: 0,

//     y: 18,

//   },

//   visible: {

//     opacity: 1,

//     y: 0,

//     transition: {

//       duration: 0.45,

//       ease: [0.22, 1, 0.36, 1],

//     },

//   },

// };

// const cardVariants = {

//   hidden: {

//     opacity: 0,

//     y: 16,

//     scale: 0.98,

//   },

//   visible: {

//     opacity: 1,

//     y: 0,

//     scale: 1,

//     transition: {

//       duration: 0.4,

//       ease: [0.22, 1, 0.36, 1],

//     },

//   },

// };

// // ============================================================

// // SHARED CARD STYLE

// // ============================================================

// const CARD = `

//   rounded-2xl

//   border border-black/[0.07]

//   bg-white

//   transition-all duration-300 ease-out

//   hover:-translate-y-[2px]

//   hover:border-cyan-400/30

//   hover:shadow-[0_8px_28px_-10px_rgba(6,182,212,0.18)]

//   dark:border-white/[0.08]

//   dark:bg-[#101012]

//   dark:hover:border-cyan-400/25

//   dark:hover:shadow-[0_8px_28px_-10px_rgba(34,211,238,0.14)]

// `;

// // ============================================================

// // STAT CARD

// // ============================================================

// const StatCard = ({

//   icon: Icon,

//   label,

//   value,

//   live = false,

//   accent = false,

// }) => {

//   return (

//     <motion.div

//       variants={cardVariants}

//       whileHover={{

//         y: -4,

//         scale: 1.015,

//       }}

//       whileTap={{

//         scale: 0.99,

//       }}

//       transition={{

//         duration: 0.2,

//       }}

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

//       {accent && (

//         <motion.div

//           animate={{

//             opacity: [0.15, 0.3, 0.15],

//           }}

//           transition={{

//             duration: 3,

//             repeat: Infinity,

//             ease: "easeInOut",

//           }}

//           className="

//             pointer-events-none

//             absolute -right-10 -top-10

//             h-24 w-24 rounded-full

//             bg-cyan-400/20

//             blur-2xl

//           "

//         />

//       )}

//       <div className="relative mb-5 flex items-center justify-between">

//         <motion.div

//           whileHover={{

//             scale: 1.12,

//             rotate: 4,

//           }}

//           transition={{

//             type: "spring",

//             stiffness: 350,

//             damping: 18,

//           }}

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

//         </motion.div>

//         {live && (

//           <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">

//             <motion.span

//               animate={{

//                 scale: [1, 1.5, 1],

//                 opacity: [1, 0.45, 1],

//               }}

//               transition={{

//                 duration: 1.6,

//                 repeat: Infinity,

//                 ease: "easeInOut",

//               }}

//               className="h-1.5 w-1.5 rounded-full bg-cyan-500"

//             />

//             Live

//           </div>

//         )}

//       </div>

//       <p className="relative mb-1.5 text-[10px] font-medium uppercase tracking-[0.08em] text-zinc-500">

//         {label}

//       </p>

//       <motion.div

//         initial={{

//           opacity: 0,

//           y: 6,

//         }}

//         animate={{

//           opacity: 1,

//           y: 0,

//         }}

//         transition={{

//           delay: 0.15,

//           duration: 0.3,

//         }}

//         className={`relative text-[22px] font-semibold tracking-tight ${

//           accent

//             ? "text-cyan-600 dark:text-cyan-400"

//             : "text-zinc-900 dark:text-zinc-100"

//         }`}

//       >

//         {value}

//       </motion.div>

//     </motion.div>

//   );

// };

// // ============================================================

// // USAGE TRENDS

// // ============================================================

// const UsageTrends = ({ usageTrends }) => {

//   const [period, setPeriod] = useState("Month");

//   const points = Array.isArray(usageTrends?.points)

//     ? usageTrends.points

//     : [];

//   const periods = ["Day", "Week", "Month"];

//   const chartWidth = 620;

//   const chartHeight = 160;

//   const xLabels = points.length
//     ? Array.from({ length: Math.min(6, points.length) }, (_, index) => {
//         const labelCount = Math.min(6, points.length);
//         const pointIndex = Math.round(
//           (index / Math.max(labelCount - 1, 1)) * (points.length - 1)
//         );
//         const date = new Date(points[pointIndex]?.bucket);
//         return Number.isNaN(date.getTime())
//           ? ""
//           : date.toLocaleDateString("en-US", {
//               month: "short",
//               day: "numeric",
//               timeZone: "UTC",
//             });
//       })
//     : ["", "", "", "", "", ""];

//   return (

//     <motion.div

//       variants={cardVariants}

//       whileHover={{

//         y: -3,

//       }}

//       className={`${CARD} p-5`}

//     >

//       <div className="flex flex-wrap items-start justify-between gap-3">

//         <div>

//           <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">

//             Usage Trends

//           </h3>

//           <motion.p

//             key={period}

//             initial={{

//               opacity: 0,

//               x: -5,

//             }}

//             animate={{

//               opacity: 1,

//               x: 0,

//             }}

//             className="mt-1 text-xs text-zinc-500"

//           >

//             {period === "Day"

//               ? "Last 24 hours"

//               : period === "Week"

//                 ? "Last 7 days"

//                 : "Last 30 days"}

//           </motion.p>

//         </div>

//         <div className="flex rounded-lg border border-black/[0.08] bg-white p-1 dark:border-white/[0.08] dark:bg-[#17171A]">

//           {periods.map((item) => (

//             <motion.button

//               key={item}

//               onClick={() => setPeriod(item)}

//               whileHover={{

//                 scale: 1.04,

//               }}

//               whileTap={{

//                 scale: 0.95,

//               }}

//               className={`rounded-md px-3 py-1 text-[11px] font-medium transition-colors ${

//                 period === item

//                   ? "bg-cyan-500/15 font-semibold text-cyan-600 dark:text-cyan-400"

//                   : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"

//               }`}

//             >

//               {item}

//             </motion.button>

//           ))}

//         </div>

//       </div>

//       <motion.div

//         initial={{

//           opacity: 0,

//           scaleY: 0.85,

//         }}

//         animate={{

//           opacity: 1,

//           scaleY: 1,

//         }}

//         transition={{

//           duration: 0.7,

//           delay: 0.2,

//           ease: [0.22, 1, 0.36, 1],

//         }}

//         style={{

//           transformOrigin: "bottom",

//         }}

//         className="mt-6"

//       >

//         <svg

//           viewBox={`0 0 ${chartWidth} ${chartHeight + 28}`}

//           className="h-[210px] w-full"

//           preserveAspectRatio="none"

//         >

//           {[0, 1, 2, 3, 4].map((line) => {

//             const y =

//               chartHeight - (line / 4) * chartHeight;

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

//           {(() => {

//             const maxValue = Math.max(

//               1,

//               ...points.map((point) =>

//                 Math.max(Number(point.calls) || 0, Number(point.minutes) || 0)

//               )

//             );

//             const getPoints = (key) =>

//               points.length > 0

//                 ? points

//                     .map((point, index) => {

//                       const x =

//                         30 +

//                         (index / Math.max(points.length - 1, 1)) *

//                           (chartWidth - 30);

//                       const value = Number(point[key]) || 0;

//                       const y =

//                         chartHeight - (value / maxValue) * chartHeight;

//                       return `${x},${y}`;

//                     })

//                     .join(" ")

//                 : `30,${chartHeight} ${chartWidth},${chartHeight}`;

//             return (

//               <>

//                 <motion.polyline

//                   initial={{ pathLength: 0, opacity: 0 }}

//                   animate={{ pathLength: 1, opacity: 1 }}

//                   transition={{ duration: 1, delay: 0.3 }}

//                   points={getPoints("calls")}

//                   fill="none"

//                   stroke="#0EA5E9"

//                   strokeWidth="1.5"

//                 />

//                 <motion.polyline

//                   initial={{ pathLength: 0, opacity: 0 }}

//                   animate={{ pathLength: 1, opacity: 1 }}

//                   transition={{ duration: 1, delay: 0.4 }}

//                   points={getPoints("minutes")}

//                   fill="none"

//                   stroke="#F59E0B"

//                   strokeWidth="1.5"

//                 />

//               </>

//             );

//           })()}

//           {xLabels.map((label, index) => (

//             <text

//               key={label}

//               x={

//                 30 +

//                 (index / (xLabels.length - 1)) *

//                   (chartWidth - 30)

//               }

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

//       </motion.div>

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

//         <motion.div

//           whileHover={{

//             x: 3,

//           }}

//           className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-500"

//         >

//           <TrendingUp size={12} />

//           vs last period

//         </motion.div>

//       </div>

//     </motion.div>

//   );

// };

// // ============================================================

// // OUTCOME ITEM

// // ============================================================

// const OutcomeItem = ({

//   label,

//   value,

//   color,

//   Icon,

// }) => {

//   return (

//     <motion.div

//       whileHover={{

//         y: -2,

//         scale: 1.01,

//       }}

//       className="rounded-lg border border-black/[0.06] bg-zinc-50/60 p-3 dark:border-white/[0.06] dark:bg-[#15161a]"

//     >

//       <div className="mb-2 flex items-center justify-between">

//         <span className="text-[9px] font-medium uppercase tracking-wider text-zinc-500">

//           {label}

//         </span>

//         {Icon && (

//           <Icon

//             size={11}

//             className={color}

//           />

//         )}

//       </div>

//       <p className={`text-[15px] font-semibold ${color}`}>

//         {value}

//       </p>

//     </motion.div>

//   );

// };

// // ============================================================

// // CALL OUTCOMES

// // ============================================================

// const CallOutcomes = ({ callOutcomes }) => {

//   const total = Number(callOutcomes?.total) || 0;

//   const success = Number(callOutcomes?.success) || 0;

//   const failed = Number(callOutcomes?.failed) || 0;

//   const inbound = Number(callOutcomes?.inbound) || 0;

//   const outbound = Number(callOutcomes?.outbound) || 0;

//   const successRate = Number(callOutcomes?.success_rate) || 0;

//   const circumference = 238.76;

//   const successOffset =

//     circumference -

//     (Math.min(Math.max(successRate, 0), 100) / 100) * circumference;

//   return (

//     <motion.div

//       variants={cardVariants}

//       whileHover={{

//         y: -3,

//       }}

//       className={`${CARD} p-5`}

//     >

//       <div>

//         <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">

//           Call Outcomes

//         </h3>

//         <p className="mt-1 text-xs text-zinc-500">

//           Success vs failed per week

//         </p>

//       </div>

//       <div className="mt-5 flex items-start gap-4">

//         <motion.div

//           initial={{

//             opacity: 0,

//             scale: 0.8,

//           }}

//           animate={{

//             opacity: 1,

//             scale: 1,

//           }}

//           transition={{

//             duration: 0.6,

//             delay: 0.25,

//           }}

//           className="relative flex h-[100px] w-[100px] shrink-0 items-center justify-center"

//         >

//           <svg

//             viewBox="0 0 100 100"

//             className="h-full w-full -rotate-90"

//           >

//             <circle

//               cx="50"

//               cy="50"

//               r="38"

//               fill="none"

//               stroke="currentColor"

//               className="text-zinc-100 dark:text-zinc-800"

//               strokeWidth="9"

//             />

//             <motion.circle

//               cx="50"

//               cy="50"

//               r="38"

//               fill="none"

//               stroke="#0EA5E9"

//               strokeWidth="9"

//               strokeDasharray="238.76"

//               strokeDashoffset={successOffset}

//               strokeLinecap="round"

//             />

//           </svg>

//           <div className="absolute inset-0 flex flex-col items-center justify-center">

//             <motion.span

//               initial={{

//                 opacity: 0,

//                 scale: 0.7,

//               }}

//               animate={{

//                 opacity: 1,

//                 scale: 1,

//               }}

//               transition={{

//                 delay: 0.5,

//               }}

//               className="text-[13px] font-bold text-zinc-800 dark:text-zinc-200"

//             >

//               {successRate.toFixed(0)}%

//             </motion.span>

//             <span className="text-[9px] uppercase tracking-wider text-zinc-500">

//               success

//             </span>

//           </div>

//         </motion.div>

//         <div className="grid min-w-0 flex-1 grid-cols-2 gap-2">

//           <OutcomeItem

//             label="Total"

//             value={total}

//             color="text-zinc-800 dark:text-zinc-200"

//           />

//           <OutcomeItem

//             label="Success"

//             value={success}

//             color="text-emerald-500"

//             Icon={CheckCircle2}

//           />

//           <OutcomeItem

//             label="Failed"

//             value={failed}

//             color="text-red-500"

//             Icon={XCircle}

//           />

//           <OutcomeItem

//             label="Outbound"

//             value={outbound}

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

//               {inbound}

//             </span>

//           </span>

//           <span className="text-zinc-300 dark:text-zinc-700">

//             ·

//           </span>

//           <span>

//             Web{" "}

//             <span className="font-semibold text-zinc-800 dark:text-zinc-200">

//               0

//             </span>

//           </span>

//         </div>

//       </div>

//     </motion.div>

//   );

// };

// // ============================================================

// // ACTIVE AGENTS

// // ============================================================

// const ActiveAgents = ({ onNavigate, activeAgents, totalAgents, inactiveAgents }) => {

//   return (

//     <motion.div

//       variants={cardVariants}

//       whileHover={{

//         y: -3,

//       }}

//       className={`${CARD} flex h-full flex-col p-5`}

//     >

//       <div className="flex items-start justify-between">

//         <div>

//           <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">

//             Active Agents

//           </h3>

//           <p className="mt-1 text-xs text-zinc-500">

//             {activeAgents} live · {inactiveAgents} inactive · {totalAgents} total

//           </p>

//         </div>

//         <motion.button

//           onClick={() => onNavigate("/agents")}

//           whileHover={{

//             x: 3,

//           }}

//           whileTap={{

//             scale: 0.96,

//           }}

//           className="text-xs font-medium text-zinc-500 transition hover:text-cyan-500"

//         >

//           View all

//         </motion.button>

//       </div>

//       <div className="mt-6 flex flex-1 items-start">

//         <motion.button

//           onClick={() =>

//             onNavigate("/agents/create")

//           }

//           whileHover={{

//             y: -3,

//             scale: 1.01,

//           }}

//           whileTap={{

//             scale: 0.97,

//           }}

//           className="

//             flex w-full items-center justify-center

//             gap-2 rounded-lg

//             border border-dashed

//             border-black/15

//             bg-zinc-50/50

//             py-3.5

//             text-[13px] font-medium

//             text-zinc-700

//             transition-colors

//             hover:border-cyan-400

//             hover:bg-cyan-50/30

//             hover:text-cyan-600

//             dark:border-white/15

//             dark:bg-white/[0.02]

//             dark:text-zinc-300

//             dark:hover:border-cyan-400

//             dark:hover:bg-cyan-500/[0.04]

//             dark:hover:text-cyan-400

//           "

//         >

//           <motion.span

//             whileHover={{

//               rotate: 90,

//             }}

//             transition={{

//               duration: 0.2,

//             }}

//           >

//             <Plus size={14} />

//           </motion.span>

//           Create Agent

//         </motion.button>

//       </div>

//     </motion.div>

//   );

// };

// // ============================================================

// // TODAY'S ACTIVITY

// // ============================================================

// const TodaysActivity = () => {

//   const chartWidth = 620;

//   const chartHeight = 140;

//   const xLabels = [

//     "00:00",

//     "02:00",

//     "04:00",

//     "06:00",

//     "08:00",

//     "10:00",

//   ];

//   return (

//     <motion.div

//       variants={cardVariants}

//       whileHover={{

//         y: -3,

//       }}

//       className={`${CARD} p-5`}

//     >

//       <div>

//         <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">

//           Today's Activity

//         </h3>

//         <p className="mt-1 text-xs text-zinc-500">

//           Call channels per hour

//         </p>

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

//       <motion.div

//         initial={{

//           opacity: 0,

//           scaleY: 0.8,

//         }}

//         animate={{

//           opacity: 1,

//           scaleY: 1,

//         }}

//         transition={{

//           duration: 0.7,

//           delay: 0.3,

//         }}

//         style={{

//           transformOrigin: "bottom",

//         }}

//         className="mt-3"

//       >

//         <svg

//           viewBox={`0 0 ${chartWidth} ${chartHeight + 28}`}

//           className="h-[170px] w-full"

//           preserveAspectRatio="none"

//         >

//           {[0, 1, 2, 3, 4].map((line) => {

//             const y =

//               chartHeight - (line / 4) * chartHeight;

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

//           <motion.polyline

//             initial={{

//               pathLength: 0,

//               opacity: 0,

//             }}

//             animate={{

//               pathLength: 1,

//               opacity: 1,

//             }}

//             transition={{

//               duration: 1.2,

//               delay: 0.3,

//             }}

//             points={`30,${chartHeight} ${chartWidth},${chartHeight}`}

//             fill="none"

//             stroke="#8B5CF6"

//             strokeWidth="1.5"

//           />

//           {xLabels.map((label, index) => (

//             <text

//               key={label}

//               x={

//                 30 +

//                 (index / (xLabels.length - 1)) *

//                   (chartWidth - 30)

//               }

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

//       </motion.div>

//       <div className="mt-3 flex flex-wrap items-center gap-5 border-t border-black/[0.05] pt-4 text-[11px] text-zinc-500 dark:border-white/[0.05]">

//         <div className="flex items-center gap-2">

//           <PhoneCall

//             size={11}

//             className="text-emerald-500"

//           />

//           <span>Outbound</span>

//           <span className="font-semibold text-zinc-800 dark:text-zinc-200">

//             0

//           </span>

//         </div>

//         <div className="flex items-center gap-2">

//           <PhoneCall

//             size={11}

//             className="text-cyan-500"

//           />

//           <span>Inbound</span>

//           <span className="font-semibold text-zinc-800 dark:text-zinc-200">

//             0

//           </span>

//         </div>

//         <div className="flex items-center gap-2">

//           <PhoneCall

//             size={11}

//             className="text-violet-500"

//           />

//           <span>Web</span>

//           <span className="font-semibold text-zinc-800 dark:text-zinc-200">

//             0

//           </span>

//         </div>

//       </div>

//     </motion.div>

//   );

// };

// // ============================================================

// // TOP COUNTRIES

// // ============================================================

// const TopCountries = () => {

//   return (

//     <motion.div

//       variants={cardVariants}

//       whileHover={{

//         y: -3,

//       }}

//       className={`${CARD} flex h-full flex-col p-5`}

//     >

//       <h3 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">

//         TOP COUNTRIES

//       </h3>

//       <div className="flex flex-1 flex-col items-center justify-center py-8">

//         <motion.p

//           initial={{

//             opacity: 0,

//           }}

//           animate={{

//             opacity: 1,

//           }}

//           transition={{

//             delay: 0.3,

//           }}

//           className="text-[13px] text-zinc-500"

//         >

//           No data yet

//         </motion.p>

//         <div className="mt-8 w-full">

//           <div className="border-b border-black/[0.06] pb-2 dark:border-white/[0.06]">

//             <span className="text-[9px] font-medium uppercase tracking-wider text-zinc-500">

//               Countries

//             </span>

//           </div>

//           <motion.div

//             initial={{

//               opacity: 0,

//               x: -8,

//             }}

//             animate={{

//               opacity: 1,

//               x: 0,

//             }}

//             transition={{

//               delay: 0.4,

//             }}

//             className="mt-3 flex items-center gap-2"

//           >

//             <motion.span

//               animate={{

//                 scale: [1, 1.25, 1],

//               }}

//               transition={{

//                 duration: 2,

//                 repeat: Infinity,

//                 repeatDelay: 2,

//               }}

//               className="h-2 w-2 rounded-full bg-cyan-500"

//             />

//             <span className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">

//               0

//             </span>

//           </motion.div>

//         </div>

//       </div>

//     </motion.div>

//   );

// };

// // ============================================================

// // QUICK ACTION ITEM

// // ============================================================

// const QuickActionItem = ({

//   icon: Icon,

//   title,

//   subtitle,

//   onClick,

// }) => {

//   return (

//     <motion.button

//       onClick={onClick}

//       variants={cardVariants}

//       whileHover={{

//         y: -5,

//         scale: 1.015,

//       }}

//       whileTap={{

//         scale: 0.97,

//       }}

//       className={`${CARD} group flex items-center gap-3 p-4 text-left`}

//     >

//       <motion.div

//         whileHover={{

//           scale: 1.12,

//           rotate: 4,

//         }}

//         transition={{

//           type: "spring",

//           stiffness: 350,

//           damping: 18,

//         }}

//         className="

//           flex h-10 w-10 shrink-0

//           items-center justify-center

//           rounded-lg

//           bg-zinc-100

//           text-zinc-600

//           transition-colors

//           group-hover:bg-cyan-500/10

//           group-hover:text-cyan-600

//           dark:bg-white/[0.06]

//           dark:text-zinc-400

//           dark:group-hover:text-cyan-400

//         "

//       >

//         <Icon

//           size={17}

//           strokeWidth={1.7}

//         />

//       </motion.div>

//       <div className="min-w-0 flex-1">

//         <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200">

//           {title}

//         </p>

//         <p className="mt-0.5 truncate text-xs text-zinc-500">

//           {subtitle}

//         </p>

//       </div>

//       <motion.div

//         whileHover={{

//           x: 4,

//         }}

//         transition={{

//           type: "spring",

//           stiffness: 400,

//           damping: 20,

//         }}

//       >

//         <ChevronRight

//           size={16}

//           className="

//             shrink-0

//             text-zinc-300

//             group-hover:text-cyan-500

//             dark:text-zinc-600

//             dark:group-hover:text-cyan-400

//           "

//         />

//       </motion.div>

//     </motion.button>

//   );

// };

// // ============================================================

// // QUICK ACTIONS

// // ============================================================

// const QuickActions = ({ onNavigate }) => {

//   return (

//     <motion.div

//       variants={cardVariants}

//       className={`${CARD} p-5`}

//     >

//       <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">

//         Quick Actions

//       </h3>

//       <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

//         <QuickActionItem

//           icon={Bot}

//           title="Create Agent"

//           subtitle="Build AI assistant"

//           onClick={() =>

//             onNavigate("/agents/create")

//           }

//         />

//         <QuickActionItem

//           icon={ZapIcon}

//           title="New Campaign"

//           subtitle="Launch outbound calls"

//           onClick={() =>

//             onNavigate("/outbound/new")

//           }

//         />

//         <QuickActionItem

//           icon={UserPlus}

//           title="Add Contact"

//           subtitle="Import or create"

//           onClick={() =>

//             onNavigate("/contacts")

//           }

//         />

//         <QuickActionItem

//           icon={Smartphone}

//           title="Add Number"

//           subtitle="Provision number"

//           onClick={() =>

//             onNavigate("/phone-numbers")

//           }

//         />

//       </div>

//     </motion.div>

//   );

// };

// // ============================================================

// // DASHBOARD

// // ============================================================

// export default function Dashboard() {

//   const navigate = useNavigate();

//   const location = useLocation();

//   const [greeting, setGreeting] = useState(getGreeting());

//   const [dashboardData, setDashboardData] = useState({

//     greeting: {

//       first_name: "",

//       calls_this_month: 0,

//       success_rate_this_month: 0,

//     },

//     kpis: {

//       total_minutes: 0,

//       active_agents: 0,

//       total_agents: 0,
//       inactive_agents: 0,
//       live_calls: 0,

//       credits_used: 0,

//       credits_balance: 0,

//       success_rate: 0,

//       conversion_rate: 0,

//     },

//     usage_trends: {

//       range: "month",

//       points: [],

//     },

//     call_outcomes: {

//       total: 0,

//       success: 0,

//       failed: 0,

//       inbound: 0,

//       outbound: 0,

//       success_rate: 0,

//       weekly: [],

//     },

//   });

//   // ==========================================================

//   // DASHBOARD API

//   // ==========================================================

//   useEffect(() => {
//     const controller = new AbortController();
//     let isMounted = true;

//     const fetchDashboardOverview = async () => {

//       try {

//         let authData = {};
//         try {
//           authData = JSON.parse(localStorage.getItem("ravanai_auth") || "{}");
//         } catch {
//           authData = {};
//         }

//         const token =

//           localStorage.getItem("access_token") || authData?.token || "";

//         const headers = {

//           Accept: "application/json",

//         };

//         if (token) {

//           headers.Authorization = `Bearer ${token}`;

//         }

//         const response = await fetch(

//           `${Config.BASE_URL}/dashboard/overview`,

//           {

//             method: "GET",
//             headers,
//             signal: controller.signal,
//           }

//         );

//         let responseData = {};

//         try {

//           responseData = await response.json();

//         } catch {

//           responseData = {};

//         }

//         if (!response.ok) {

//           const detail = Array.isArray(responseData?.detail)

//             ? responseData.detail

//                 .map((item) => item?.msg || item)

//                 .join(", ")

//             : responseData?.detail ||

//               responseData?.message ||

//               responseData?.error ||

//               "Failed to load dashboard data.";

//           throw new Error(detail);

//         }

//         if (!isMounted) return;

//         setDashboardData({
//           greeting: {

//             first_name: responseData?.greeting?.first_name || "",

//             calls_this_month:

//               Number(responseData?.greeting?.calls_this_month) || 0,

//             success_rate_this_month:

//               Number(responseData?.greeting?.success_rate_this_month) || 0,

//           },

//           kpis: {

//             total_minutes: Number(responseData?.kpis?.total_minutes) || 0,

//             active_agents: Number(responseData?.kpis?.active_agents) || 0,

//             total_agents: Number(responseData?.kpis?.total_agents) || 0,
//             inactive_agents: Number(responseData?.kpis?.inactive_agents) || 0,
//             live_calls: Number(responseData?.kpis?.live_calls) || 0,

//             credits_used: Number(responseData?.kpis?.credits_used) || 0,

//             credits_balance:

//               Number(responseData?.kpis?.credits_balance) || 0,

//             success_rate: Number(responseData?.kpis?.success_rate) || 0,

//             conversion_rate:

//               Number(responseData?.kpis?.conversion_rate) || 0,

//           },

//           usage_trends: {

//             range: responseData?.usage_trends?.range || "month",

//             points: Array.isArray(responseData?.usage_trends?.points)

//               ? responseData.usage_trends.points

//               : [],

//           },

//           call_outcomes: {

//             total: Number(responseData?.call_outcomes?.total) || 0,

//             success: Number(responseData?.call_outcomes?.success) || 0,

//             failed: Number(responseData?.call_outcomes?.failed) || 0,

//             inbound: Number(responseData?.call_outcomes?.inbound) || 0,

//             outbound: Number(responseData?.call_outcomes?.outbound) || 0,

//             success_rate:

//               Number(responseData?.call_outcomes?.success_rate) || 0,

//             weekly: Array.isArray(responseData?.call_outcomes?.weekly)

//               ? responseData.call_outcomes.weekly

//               : [],

//           },

//         });

//       } catch (error) {
//         if (error?.name !== "AbortError") {
//           console.error("Dashboard overview API error:", error);
//         }
//       }
//     };

//     fetchDashboardOverview();
//     return () => {
//       isMounted = false;
//       controller.abort();
//     };
//   }, []);

//   // ==========================================================

//   // AUTOMATIC GREETING UPDATE

//   // ==========================================================

//   useEffect(() => {

//     const updateGreeting = () => {

//       setGreeting(getGreeting());

//     };

//     updateGreeting();

//     // Check every minute

//     const interval = setInterval(

//       updateGreeting,

//       60 * 1000

//     );

//     return () => clearInterval(interval);

//   }, []);

//   // ==========================================================

//   // SCROLL TO TOP ON ROUTE CHANGE

//   // ==========================================================

//   useEffect(() => {

//     window.scrollTo({

//       top: 0,

//       behavior: "instant",

//     });

//     const main = document.querySelector("main");

//     if (main) {

//       main.scrollTo({

//         top: 0,

//         behavior: "instant",

//       });

//     }

//   }, [location.pathname]);

//   return (

//     <motion.div

//       variants={pageVariants}

//       initial="hidden"

//       animate="visible"

//       className="

//         min-h-full

//         bg-zinc-50

//         text-zinc-900

//         transition-colors

//         duration-300

//         dark:bg-[#09090B]

//         dark:text-zinc-100

//       "

//     >

//       <motion.main

//         className="

//           mx-auto

//           max-w-[1600px]

//           space-y-5

//           p-4

//           sm:p-6

//           lg:p-7

//         "

//       >

//         {/* ==================================================

//             WELCOME

//         ================================================== */}

//         <motion.section variants={sectionVariants}>

//           <div className="flex flex-wrap items-center gap-2">

//             <motion.h1

//               key={greeting}

//               initial={{

//                 opacity: 0,

//                 x: -15,

//                 y: 4,

//               }}

//               animate={{

//                 opacity: 1,

//                 x: 0,

//                 y: 0,

//               }}

//               transition={{

//                 duration: 0.45,

//               }}

//               className="

//                 text-[22px]

//                 font-semibold

//                 tracking-tight

//                 text-zinc-900

//                 dark:text-zinc-100

//                 sm:text-2xl

//               "

//             >

//               {greeting}, {dashboardData.greeting.first_name || "JeevaAI"}

//             </motion.h1>

//             <motion.div

//               animate={{

//                 rotate: [0, 8, -8, 0],

//               }}

//               transition={{

//                 duration: 2,

//                 repeat: Infinity,

//                 repeatDelay: 5,

//               }}

//             >

//               <Info

//                 size={15}

//                 className="text-zinc-400"

//               />

//             </motion.div>

//           </div>

//           <motion.p

//             initial={{

//               opacity: 0,

//               y: 5,

//             }}

//             animate={{

//               opacity: 1,

//               y: 0,

//             }}

//             transition={{

//               delay: 0.15,

//               duration: 0.35,

//             }}

//             className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-500"

//           >

//             Your agents handled{" "}

//             <span className="font-semibold text-zinc-900 dark:text-zinc-200">

//               {dashboardData.greeting.calls_this_month} calls

//             </span>{" "}

//             this month with{" "}

//             <span className="font-semibold text-emerald-500 dark:text-emerald-400">

//               {dashboardData.greeting.success_rate_this_month.toFixed(2)}% success

//             </span>

//           </motion.p>

//         </motion.section>

//         {/* ==================================================

//             STATS + GLOBAL REACH

//         ================================================== */}

//         <motion.section

//           variants={sectionVariants}

//           className="

//             grid grid-cols-1 gap-5

//             xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,1fr)]

//           "

//         >

//           <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

//             <StatCard

//               icon={Clock3}

//               label="Total Minutes"

//               value={dashboardData.kpis.total_minutes}

//             />

//             <StatCard

//               icon={Bot}

//               label="Active Agents"

//               value={dashboardData.kpis.active_agents}

//             />

//             <StatCard

//               icon={PhoneCall}

//               label="Live Calls"

//               value={dashboardData.kpis.live_calls}

//               live

//               accent

//             />

//             <StatCard

//               icon={Coins}

//               label="Credits"

//               value={`${dashboardData.kpis.credits_used} / ${dashboardData.kpis.credits_balance}`}

//             />

//             <StatCard

//               icon={Target}

//               label="Success Rate"

//               value={`${dashboardData.kpis.success_rate.toFixed(2)}%`}

//             />

//             <StatCard

//               icon={Zap}

//               label="Conversion"

//               value={`${dashboardData.kpis.conversion_rate.toFixed(2)}%`}

//             />

//           </div>

//           <motion.div

//             variants={cardVariants}

//             whileHover={{

//               y: -3,

//             }}

//           >

//             <GlobalReach />

//           </motion.div>

//         </motion.section>

//         {/* ==================================================

//             USAGE + OUTCOMES

//         ================================================== */}

//         <motion.section

//           variants={sectionVariants}

//           className="

//             grid grid-cols-1 gap-5

//             xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,1fr)]

//           "

//         >

//           <UsageTrends usageTrends={dashboardData.usage_trends} />

//           <CallOutcomes callOutcomes={dashboardData.call_outcomes} />

//         </motion.section>

//         {/* ==================================================

//             ACTIVE + TODAY + COUNTRIES

//         ================================================== */}

//         <motion.section

//           variants={sectionVariants}

//           className="

//             grid grid-cols-1 gap-5

//             xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)_minmax(0,0.9fr)]

//           "

//         >

//           <ActiveAgents
//             onNavigate={navigate}
//             activeAgents={dashboardData.kpis.active_agents}
//             totalAgents={dashboardData.kpis.total_agents}
//             inactiveAgents={dashboardData.kpis.inactive_agents}
//           />

//           <TodaysActivity />

//           <TopCountries />

//         </motion.section>

//         {/* ==================================================

//             QUICK ACTIONS

//         ================================================== */}

//         <motion.section variants={sectionVariants}>

//           <QuickActions

//             onNavigate={navigate}

//           />

//         </motion.section>

//       </motion.main>

//     </motion.div>

//   );

// }


import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import config from "../../../config/Config";

import {
  Clock3,
  Bot,
  PhoneCall,
  Coins,
  Target,
  Zap,
  PhoneIncoming,
  PhoneOutgoing,
  Globe,
  Smile,
  UserPlus,
  Smartphone,
  ChevronRight,
  TrendingUp,
  LayoutDashboard,
  LineChart as LineChartIcon,
  Compass,
  Activity,
  CheckCircle2,
  XCircle,
  RefreshCw,
} from "lucide-react";

import GlobalReach from "../../../components/GlobalReach";

// Set false if your Layout already renders these tabs.
const SHOW_TABS = true;

// ============================================================
// HELPERS
// ============================================================

const num = (value) => {
  const result = Number(value);
  return Number.isFinite(result) ? result : 0;
};

const formatNumber = (value) => num(value).toLocaleString("en-IN");

const formatPercent = (value) => `${num(value).toFixed(2)}%`;

const pad = (value) => String(value).padStart(2, "0");

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  if (hour >= 17 && hour < 21) return "Good Evening";

  return "Good Night";
};

const toInputDate = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;

const rangeFor = (period) => {
  const to = new Date();
  const from = new Date();

  const days = period === "Day" ? 1 : period === "Week" ? 7 : 30;

  from.setDate(to.getDate() - days);

  return {
    from: toInputDate(from),
    to: toInputDate(to),
  };
};

const formatDateTime = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStoredToken = () => {
  try {
    const authData = JSON.parse(
      localStorage.getItem("ravanai_auth") || "{}"
    );

    return (
      localStorage.getItem("access_token") ||
      authData?.token ||
      ""
    );
  } catch {
    return localStorage.getItem("access_token") || "";
  }
};

const getApiError = (data, fallback = "Unable to load data.") => {
  if (Array.isArray(data?.detail)) {
    return data.detail
      .map((item) => item?.msg || item?.message || String(item))
      .join(", ");
  }

  if (typeof data?.detail === "string") return data.detail;
  if (typeof data?.message === "string") return data.message;
  if (typeof data?.error === "string") return data.error;

  return fallback;
};

const buildDateParams = (range) => {
  const params = new URLSearchParams();

  if (range?.from) {
    params.set("from", `${range.from}T00:00:00`);
  }

  if (range?.to) {
    params.set("to", `${range.to}T23:59:59`);
  }

  return params;
};

// ============================================================
// API HELPER
// ============================================================

const apiRequest = async (endpoint, options = {}) => {
  const token = getStoredToken();

  const headers = {
    Accept: "application/json",
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

const response = await fetch(
    `${config.BASE_URL}${endpoint}`,
    {
        ...options,
        headers,
    }
);

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      getApiError(data, `Request failed (${response.status})`)
    );
  }

  return data;
};

// ============================================================
// ANIMATIONS
// ============================================================

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.07,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
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
  hidden: { opacity: 0, y: 14, scale: 0.985 },
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
// SHARED STYLES
// ============================================================

const CARD = `
  rounded-xl border border-black/[0.07] bg-white
  transition-colors duration-300
  hover:border-cyan-400/30
  dark:border-white/[0.07] dark:bg-[#0C0D10]
  dark:hover:border-cyan-400/20
`;

const LABEL =
  "text-[9.5px] font-medium uppercase tracking-[0.08em] text-zinc-500";

const MONO = "font-mono tabular-nums";

// ============================================================
// LOADING / EMPTY / ERROR
// ============================================================

const SectionMessage = ({ message = "No data available." }) => (
  <div className="flex min-h-[120px] items-center justify-center text-center text-[13px] text-zinc-500">
    {message}
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="rounded-lg border border-red-500/20 bg-red-500/[0.05] p-3 text-xs text-red-500">
    {message}
  </div>
);

// ============================================================
// STAT CARD
// ============================================================

const StatCard = ({ icon: Icon, label, value, live = false }) => (
  <motion.div
    variants={cardVariants}
    className={`${CARD} relative overflow-hidden p-4 ${
      live
        ? "!border-cyan-400/40 bg-cyan-50/40 dark:!border-cyan-400/35 dark:bg-cyan-500/[0.06]"
        : ""
    }`}
  >
    <div className="mb-4 flex items-center justify-between">
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-md ${
          live
            ? "bg-cyan-500/15 text-cyan-500"
            : "bg-zinc-100 text-zinc-500 dark:bg-white/[0.06] dark:text-zinc-400"
        }`}
      >
        <Icon size={14} strokeWidth={1.8} />
      </div>

      {live && (
        <div className="flex items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-wider text-cyan-500">
          <motion.span
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.45, 1],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
            }}
            className="h-1.5 w-1.5 rounded-full bg-cyan-500"
          />
          Live
        </div>
      )}
    </div>

    <p className={`mb-1.5 ${LABEL}`}>{label}</p>

    <div
      className={`${MONO} text-[20px] font-bold leading-none ${
        live
          ? "text-cyan-500"
          : "text-zinc-900 dark:text-zinc-100"
      }`}
    >
      {value}
    </div>
  </motion.div>
);

// ============================================================
// LINE CHART
// ============================================================

const LineChart = ({
  series,
  yMax = 4,
  xLabels = [],
  height = 190,
}) => {
  const ticks = [4, 3, 2, 1, 0].map((i) => ({
    label: Math.round(((i * yMax) / 4) * 10) / 10,
    top: ((4 - i) / 4) * 100,
  }));

  const buildPoints = (values) => {
    let data = values.length ? values : [0, 0];

    if (data.length === 1) {
      data = [data[0], data[0]];
    }

    return data
      .map((value, index) => {
        const x = (index / (data.length - 1)) * 100;
        const y = 100 - (Math.min(num(value), yMax) / yMax) * 100;

        return `${x},${y}`;
      })
      .join(" ");
  };

  return (
    <div>
      <div className="flex" style={{ height }}>
        <div className="relative w-7 shrink-0">
          {ticks.map((tick) => (
            <span
              key={tick.top}
              style={{ top: `${tick.top}%` }}
              className="absolute right-2 -translate-y-1/2 text-[10px] text-zinc-500"
            >
              {tick.label}
            </span>
          ))}
        </div>

        <div className="relative flex-1">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
          >
            {[0, 25, 50, 75, 100].map((y) => (
              <line
                key={y}
                x1="0"
                x2="100"
                y1={y}
                y2={y}
                stroke="currentColor"
                className="text-zinc-100 dark:text-white/[0.04]"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {series.map((item, index) => (
              <motion.polyline
                key={`${item.color}-${index}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                points={buildPoints(item.values)}
                fill="none"
                stroke={item.color}
                strokeWidth="1.8"
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="ml-7 mt-2 flex justify-between text-[10px] text-zinc-500">
        {xLabels.map((label, index) => (
          <span key={`${label}-${index}`}>{label}</span>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// USAGE TRENDS
// ============================================================

const UsageTrends = ({
  points,
  period,
  setPeriod,
  range,
  setRange,
  loading,
}) => {
  const periods = ["Day", "Week", "Month"];

  const minutes = points.map((point) => num(point.minutes));

  const maxValue = Math.max(0, ...minutes);
  const yMax = Math.max(4, Math.ceil(maxValue / 4) * 4);

  const xLabels = useMemo(() => {
    if (!points.length) return [];

    const count = Math.min(6, points.length);

    return Array.from({ length: count }, (_, index) => {
      const pointIndex = Math.round(
        (index / Math.max(count - 1, 1)) * (points.length - 1)
      );

      const date = new Date(points[pointIndex]?.bucket);

      return Number.isNaN(date.getTime())
        ? ""
        : date.toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
            timeZone: "UTC",
          });
    });
  }, [points]);

  const dateInput = `
    rounded-lg border border-black/[0.08] bg-white px-3 py-1.5
    font-mono text-xs text-zinc-700 outline-none
    focus:border-cyan-400/50
    dark:border-white/[0.08] dark:bg-[#0F1013] dark:text-zinc-200
    dark:[color-scheme:dark]
  `;

  return (
    <motion.div variants={cardVariants} className={`${CARD} p-6`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
            Usage Trends
          </h3>

          <p className="mt-1 text-[13px] text-zinc-500">
            {period === "Day"
              ? "Last 24 hours"
              : period === "Week"
              ? "Last 7 days"
              : "Last 30 days"}
          </p>
        </div>

        <div className="flex flex-col items-end gap-3">
          <div className="flex rounded-lg border border-black/[0.08] bg-white p-1 dark:border-white/[0.08] dark:bg-[#0F1013]">
            {periods.map((item) => (
              <button
                key={item}
                onClick={() => setPeriod(item)}
                className={`rounded-md px-3.5 py-1 text-[12px] font-medium transition-colors ${
                  period === item
                    ? "bg-cyan-500/15 font-semibold text-cyan-500"
                    : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <span className={LABEL}>From</span>

            <input
              type="date"
              value={range.from}
              max={range.to}
              onChange={(event) =>
                setRange((previous) => ({
                  ...previous,
                  from: event.target.value,
                }))
              }
              className={dateInput}
            />

            <span className={LABEL}>To</span>

            <input
              type="date"
              value={range.to}
              min={range.from}
              onChange={(event) =>
                setRange((previous) => ({
                  ...previous,
                  to: event.target.value,
                }))
              }
              className={dateInput}
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        {loading ? (
          <SectionMessage message="Loading usage trends..." />
        ) : points.length === 0 ? (
          <SectionMessage message="No usage data available for this period." />
        ) : (
          <LineChart
            series={[
              {
                values: minutes,
                color: "#F5B83D",
              },
            ]}
            yMax={yMax}
            xLabels={xLabels}
            height={210}
          />
        )}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-black/[0.05] pt-4 dark:border-white/[0.05]">
        <div className="flex items-center gap-2 text-[12px] text-zinc-600 dark:text-zinc-400">
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          Minutes
        </div>

        <div className="text-[11px] text-zinc-500">
          Data from dashboard usage trends
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================
// CALL OUTCOMES
// ============================================================

const OutcomeItem = ({
  label,
  value,
  tone = "default",
  Icon,
}) => {
  const tones = {
    default: {
      box: "border-black/[0.06] bg-zinc-50/60 dark:border-white/[0.07] dark:bg-white/[0.02]",
      text: "text-zinc-800 dark:text-zinc-100",
    },
    success: {
      box: "border-emerald-500/20 bg-emerald-500/[0.06]",
      text: "text-emerald-500",
    },
    failed: {
      box: "border-red-500/20 bg-red-500/[0.06]",
      text: "text-red-500",
    },
  }[tone];

  return (
    <div className={`rounded-lg border p-3 ${tones.box}`}>
      <div className="mb-2 flex items-center justify-between">
        <span className={LABEL}>{label}</span>
        {Icon && <Icon size={11} className={tones.text} />}
      </div>

      <p className={`${MONO} text-[15px] font-bold ${tones.text}`}>
        {formatNumber(value)}
      </p>
    </div>
  );
};

const CallOutcomes = ({ data, loading }) => {
  const total = num(data?.total);
  const success = num(data?.success);
  const failed = num(data?.failed);
  const inbound = num(data?.inbound);
  const outbound = num(data?.outbound);
  const successRate = num(data?.success_rate);

  const weekly = Array.isArray(data?.weekly) ? data.weekly : [];

  const circumference = 238.76;

  const offset =
    circumference -
    (Math.min(Math.max(successRate, 0), 100) / 100) *
      circumference;

  const weeklyMax = Math.max(
    1,
    ...weekly.map((week) =>
      Math.max(num(week.success), num(week.failed))
    )
  );

  return (
    <motion.div variants={cardVariants} className={`${CARD} flex flex-col p-6`}>
      <div>
        <h3 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
          Call Outcomes
        </h3>

        <p className="mt-1 text-[13px] text-zinc-500">
          Success vs failed per week
        </p>
      </div>

      {loading ? (
        <SectionMessage message="Loading call outcomes..." />
      ) : (
        <>
          <div className="mt-6 flex items-start gap-4">
            <div className="relative flex h-[92px] w-[92px] shrink-0 items-center justify-center">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="currentColor"
                  className="text-zinc-100 dark:text-white/[0.06]"
                  strokeWidth="9"
                />

                <motion.circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#22C1EE"
                  strokeWidth="9"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: offset }}
                  transition={{ duration: 0.9, delay: 0.3 }}
                  strokeLinecap="round"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[13px] font-bold text-zinc-800 dark:text-zinc-100">
                  {successRate.toFixed(0)}%
                </span>

                <span className="text-[8px] text-zinc-500">
                  success
                </span>
              </div>
            </div>

            <div className="grid min-w-0 flex-1 grid-cols-2 gap-2">
              <OutcomeItem label="Total" value={total} />
              <OutcomeItem label="Success" value={success} tone="success" />
              <OutcomeItem label="Failed" value={failed} tone="failed" />
              <OutcomeItem label="Outbound" value={outbound} />
            </div>
          </div>

          <div className="mt-5 flex min-h-[120px] flex-1 items-end justify-around gap-2 border-b border-black/[0.05] pb-2 dark:border-white/[0.05]">
            {weekly.length === 0 ? (
              <SectionMessage message="No weekly outcome data." />
            ) : (
              weekly.map((week, index) => (
                <div
                  key={week.week_start || index}
                  className="flex h-[100px] items-end gap-1"
                  title={week.week_start || ""}
                >
                  <div
                    className="w-2.5 rounded-t bg-cyan-400"
                    style={{
                      height: `${(num(week.success) / weeklyMax) * 100}%`,
                    }}
                  />

                  <div
                    className="w-2.5 rounded-t bg-red-500"
                    style={{
                      height: `${(num(week.failed) / weeklyMax) * 100}%`,
                    }}
                  />
                </div>
              ))
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-[12px] text-zinc-600 dark:text-zinc-400">
                <span className="h-2 w-3.5 rounded-sm bg-cyan-400" />
                Successful
              </div>

              <div className="flex items-center gap-2 text-[12px] text-zinc-600 dark:text-zinc-400">
                <span className="h-2 w-3.5 rounded-sm bg-red-500" />
                Failed
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-500">
              <span>
                In{" "}
                <b className={`${MONO} text-zinc-800 dark:text-zinc-100`}>
                  {formatNumber(inbound)}
                </b>
              </span>

              <span>
                Out{" "}
                <b className={`${MONO} text-zinc-800 dark:text-zinc-100`}>
                  {formatNumber(outbound)}
                </b>
              </span>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

// ============================================================
// RECENT ACTIVITY - ACTUAL CALL RECORDS
// ============================================================

const RecentActivity = ({ calls, loading, onNavigate }) => (
  <motion.div variants={cardVariants} className={`${CARD} p-6`}>
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
          Recent Activity
        </h3>

        <p className="mt-1 text-[13px] text-zinc-500">
          Latest calls from your organization
        </p>
      </div>

      <button
        onClick={() => onNavigate("/calls")}
        className="text-[12px] font-medium text-zinc-500 transition hover:text-cyan-500"
      >
        View all
      </button>
    </div>

    <div className="mt-5 h-[330px] overflow-y-auto pr-2 [scrollbar-width:thin]">
      {loading ? (
        <SectionMessage message="Loading recent calls..." />
      ) : calls.length === 0 ? (
        <SectionMessage message="No recent calls available." />
      ) : (
        <ul>
          {calls.map((call, index) => {
            const successful =
              call.status === "completed" ||
              call.status === "success";

            return (
              <li
                key={call.id || index}
                className="flex items-center justify-between gap-3 border-b border-black/[0.04] py-[13px] last:border-0 dark:border-white/[0.04]"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      successful
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "bg-zinc-100 text-zinc-500 dark:bg-white/[0.06]"
                    }`}
                  >
                    {successful ? (
                      <CheckCircle2 size={15} />
                    ) : (
                      <PhoneCall size={15} />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
                      {call.caller_name ||
                        call.caller_display ||
                        call.caller_number ||
                        "Unknown caller"}
                    </p>

                    <p className="mt-0.5 truncate text-[11px] text-zinc-500">
                      {call.agent_name || "Agent"} ·{" "}
                      {call.direction || call.channel || "Call"}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p
                    className={`text-[11px] font-medium ${
                      successful
                        ? "text-emerald-500"
                        : call.status === "failed"
                        ? "text-red-500"
                        : "text-zinc-500"
                    }`}
                  >
                    {call.status_label || call.status || "Unknown"}
                  </p>

                  <p className="mt-1 text-[10px] text-zinc-500">
                    {formatDateTime(call.started_at)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  </motion.div>
);

// ============================================================
// SENTIMENT
// ============================================================

const Sentiment = ({ sentiment, loading }) => {
  const positive = num(sentiment?.positive);
  const neutral = num(sentiment?.neutral);
  const negative = num(sentiment?.negative);

  const total = positive + neutral + negative;

  const rows = [
    {
      label: "Positive",
      value: positive,
      color: "bg-emerald-500",
    },
    {
      label: "Neutral",
      value: neutral,
      color: "bg-zinc-400",
    },
    {
      label: "Negative",
      value: negative,
      color: "bg-red-500",
    },
  ];

  return (
    <motion.div variants={cardVariants} className={`${CARD} p-6`}>
      <div className="flex items-center gap-2.5">
        <Smile size={15} className="text-zinc-500" />

        <h3 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
          Sentiment
        </h3>
      </div>

      {loading ? (
        <SectionMessage message="Loading sentiment..." />
      ) : total === 0 ? (
        <SectionMessage message="No sentiment data available." />
      ) : (
        <div className="mt-6 space-y-4">
          {rows.map((row) => (
            <div key={row.label}>
              <div className="mb-1.5 flex justify-between text-[12px] text-zinc-500">
                <span>{row.label}</span>

                <span className={`${MONO} text-zinc-800 dark:text-zinc-100`}>
                  {formatNumber(row.value)}
                </span>
              </div>

              <div className="h-1.5 rounded-full bg-zinc-100 dark:bg-white/[0.06]">
                <div
                  className={`h-full rounded-full ${row.color}`}
                  style={{
                    width: `${(row.value / total) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

// ============================================================
// ACTIVE AGENTS
// ============================================================

const ActiveAgents = ({
  onNavigate,
  activeAgents,
  totalAgents,
  agentPerformance,
  loading,
}) => (
  <motion.div variants={cardVariants} className={`${CARD} flex h-full flex-col p-6`}>
    <div className="flex items-start justify-between">
      <h3 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
        Active Agents
      </h3>

      <button
        onClick={() => onNavigate("/agents")}
        className="text-[12px] font-medium text-zinc-500 transition hover:text-cyan-500"
      >
        View all
      </button>
    </div>

    <div className="mt-4 grid grid-cols-2 gap-3 border-b border-black/[0.06] pb-4 dark:border-white/[0.06]">
      <div>
        <p className={LABEL}>Active</p>
        <p className={`${MONO} mt-2 text-[18px] font-bold text-emerald-500`}>
          {formatNumber(activeAgents)}
        </p>
      </div>

      <div>
        <p className={LABEL}>Total Agents</p>
        <p className={`${MONO} mt-2 text-[18px] font-bold text-zinc-900 dark:text-zinc-100`}>
          {formatNumber(totalAgents)}
        </p>
      </div>
    </div>

    <div className="mt-4">
      <p className={LABEL}>Agent Performance</p>

      {loading ? (
        <SectionMessage message="Loading agents..." />
      ) : agentPerformance.length === 0 ? (
        <SectionMessage message="No agent performance data." />
      ) : (
        <div className="mt-3 space-y-3">
          {agentPerformance.slice(0, 4).map((agent, index) => (
            <div
              key={agent.agent_id || index}
              className="flex items-center justify-between gap-2"
            >
              <div className="min-w-0">
                <p className="truncate text-[12px] font-medium text-zinc-800 dark:text-zinc-200">
                  {agent.agent_name || "Agent"}
                </p>

                <p className="text-[10px] text-zinc-500">
                  {formatNumber(agent.calls)} calls
                </p>
              </div>

              <div className="shrink-0 text-right">
                <p className={`${MONO} text-[12px] font-semibold text-cyan-500`}>
                  {formatPercent(agent.success_rate)}
                </p>
                <p className="text-[9px] text-zinc-500">Success</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </motion.div>
);

// ============================================================
// TODAY'S ACTIVITY
// ============================================================

const TodaysActivity = ({ hourly, loading }) => {
  const col = (key) => hourly.map((item) => num(item[key]));

  const maxValue = Math.max(
    0,
    ...col("outbound"),
    ...col("inbound"),
    ...col("web")
  );

  const yMax = Math.max(4, Math.ceil(maxValue / 4) * 4);

const xLabels = Array.from({ length: 6 }, (_, index) => {
  const hour = index * 4;

  return `${pad(hour)}:00`;
});

  const totals = {
    outbound: col("outbound").reduce((a, b) => a + b, 0),
    inbound: col("inbound").reduce((a, b) => a + b, 0),
    web: col("web").reduce((a, b) => a + b, 0),
  };

  const footer = [
    {
      label: "Outbound",
      icon: PhoneOutgoing,
      color: "text-emerald-500",
      value: totals.outbound,
    },
    {
      label: "Inbound",
      icon: PhoneIncoming,
      color: "text-cyan-500",
      value: totals.inbound,
    },
    {
      label: "Web",
      icon: Globe,
      color: "text-violet-500",
      value: totals.web,
    },
  ];

  return (
    <motion.div variants={cardVariants} className={`${CARD} p-6`}>
      <h3 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
        Today's Activity
      </h3>

      <p className="mt-1 text-[13px] text-zinc-500">
        Call channels per hour
      </p>

      {loading ? (
        <SectionMessage message="Loading hourly activity..." />
      ) : hourly.length === 0 ? (
        <SectionMessage message="No hourly activity available." />
      ) : (
        <>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-[12px]">
            {[
              ["Outbound", "bg-emerald-500"],
              ["Inbound", "bg-cyan-400"],
              ["Web", "bg-violet-500"],
            ].map(([label, background]) => (
              <div
                key={label}
                className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400"
              >
                <span className={`h-0.5 w-4 rounded-full ${background}`} />
                {label}
              </div>
            ))}
          </div>

          <div className="mt-4">
            <LineChart
              series={[
                {
                  values: col("outbound"),
                  color: "#10B981",
                },
                {
                  values: col("inbound"),
                  color: "#22C1EE",
                },
                {
                  values: col("web"),
                  color: "#8B5CF6",
                },
              ]}
              yMax={yMax}
              xLabels={xLabels}
              height={160}
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-5 border-t border-black/[0.05] pt-4 text-[11.5px] text-zinc-500 dark:border-white/[0.05]">
            {footer.map(({ label, icon: Icon, color, value }) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon size={12} className={color} />

                <span>{label}</span>

                <span className={`${MONO} font-bold text-zinc-800 dark:text-zinc-100`}>
                  {formatNumber(value)}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};

// ============================================================
// TOP COUNTRIES
// ============================================================

const TopCountries = ({ countries, loading }) => (
  <motion.div variants={cardVariants} className={`${CARD} flex h-full flex-col p-6`}>
    <div className="flex items-center gap-2">
      <Globe size={15} className="text-zinc-500" />

      <h3 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
        Top Countries
      </h3>
    </div>

    {loading ? (
      <SectionMessage message="Loading countries..." />
    ) : countries.length === 0 ? (
      <SectionMessage message="No country data available." />
    ) : (
      <>
        <div className="mt-5 space-y-3 border-b border-black/[0.06] pb-5 dark:border-white/[0.06]">
          {countries.slice(0, 5).map((country, index) => (
            <div
              key={`${country.country}-${index}`}
              className="flex items-center justify-between gap-2"
            >
              <span className="truncate text-[13px] text-zinc-700 dark:text-zinc-300">
                {country.country || "Unknown"}
              </span>

              <span className={`${MONO} shrink-0 font-bold text-zinc-900 dark:text-zinc-100`}>
                {formatNumber(country.calls)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <p className={LABEL}>Countries shown</p>

          <p className={`${MONO} mt-2 text-[18px] font-bold text-cyan-500`}>
            {formatNumber(countries.length)}
          </p>
        </div>
      </>
    )}
  </motion.div>
);

// ============================================================
// QUICK ACTIONS
// ============================================================

const QuickActionItem = ({
  icon: Icon,
  title,
  subtitle,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="
      group flex items-center gap-3 rounded-lg border border-black/[0.07]
      bg-zinc-50/50 p-3.5 text-left transition-colors
      hover:border-cyan-400/30
      dark:border-white/[0.07] dark:bg-white/[0.015]
      dark:hover:border-cyan-400/25
    "
  >
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition-colors group-hover:bg-cyan-500/10 group-hover:text-cyan-500 dark:bg-white/[0.06] dark:text-zinc-400">
      <Icon size={16} strokeWidth={1.7} />
    </div>

    <div className="min-w-0 flex-1">
      <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-100">
        {title}
      </p>

      <p className="mt-0.5 truncate text-xs text-zinc-500">
        {subtitle}
      </p>
    </div>

    <ChevronRight
      size={15}
      className="shrink-0 text-zinc-300 transition-transform group-hover:translate-x-1 group-hover:text-cyan-500 dark:text-zinc-700"
    />
  </button>
);

const QuickActions = ({ onNavigate }) => (
  <motion.div variants={cardVariants} className={`${CARD} p-6`}>
    <h3 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
      Quick Actions
    </h3>

    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <QuickActionItem
        icon={Bot}
        title="Create Agent"
        subtitle="Build AI assistant"
        onClick={() => onNavigate("/agents/create")}
      />

      <QuickActionItem
        icon={Zap}
        title="New Campaign"
        subtitle="Launch outbound calls"
        onClick={() => onNavigate("/outbound/new")}
      />

      <QuickActionItem
        icon={UserPlus}
        title="Add Contact"
        subtitle="Import or create"
        onClick={() => onNavigate("/contacts")}
      />

      <QuickActionItem
        icon={Smartphone}
        title="Add Number"
        subtitle="Provision number"
        onClick={() => onNavigate("/phone-numbers")}
      />
    </div>
  </motion.div>
);

// ============================================================
// DEFAULT DATA
// ============================================================

const EMPTY_DATA = {
  greeting: {
    first_name: "",
    calls_this_month: 0,
    success_rate_this_month: 0,
  },

  kpis: {
    total_minutes: 0,
    active_agents: 0,
    total_agents: 0,
    inactive_agents: 0,
    live_calls: 0,
    credits_used: 0,
    credits_balance: 0,
    success_rate: 0,
    conversion_rate: 0,
  },

  usage_trends: {
    range: "month",
    points: [],
  },

  call_outcomes: {
    total: 0,
    success: 0,
    failed: 0,
    inbound: 0,
    outbound: 0,
    success_rate: 0,
    weekly: [],
  },

  recent_calls: [],
  sentiment: {
    positive: 0,
    neutral: 0,
    negative: 0,
  },

  agent_performance: [],
  hourly_activity: [],
  top_countries: [],
  billing: null,
};

// ============================================================
// DASHBOARD
// ============================================================

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [greeting, setGreeting] = useState(getGreeting());

  const [dashboardData, setDashboardData] = useState(EMPTY_DATA);

  const [period, setPeriodState] = useState("Month");

  const [range, setRange] = useState(rangeFor("Month"));

  const [loading, setLoading] = useState({
    overview: true,
    usage: true,
    calls: true,
    sentiment: true,
    agents: true,
    hourly: true,
    countries: true,
    billing: true,
  });

  const [errors, setErrors] = useState({});

  const [refreshKey, setRefreshKey] = useState(0);

  const [customRangeChanged, setCustomRangeChanged] = useState(false);

  // ==========================================================
  // PERIOD SELECTION
  // ==========================================================

  const setPeriod = (selectedPeriod) => {
    setPeriodState(selectedPeriod);
    setRange(rangeFor(selectedPeriod));
    setCustomRangeChanged(false);
  };

  const handleRangeChange = (updater) => {
    setRange((previous) => {
      const next =
        typeof updater === "function"
          ? updater(previous)
          : updater;

      return next;
    });

    setCustomRangeChanged(true);
  };

  // ==========================================================
  // SAFE API FETCHER
  // ==========================================================

  const fetchSection = useCallback(
    async (key, endpoint, signal, onSuccess) => {
      try {
        const result = await apiRequest(endpoint, { signal });

        if (signal.aborted) return;

        onSuccess(result);

        setErrors((previous) => ({
          ...previous,
          [key]: "",
        }));
      } catch (error) {
        if (error.name === "AbortError") return;

        console.error(`${key} API error:`, error);

        setErrors((previous) => ({
          ...previous,
          [key]: error.message || "Unable to load data.",
        }));
      } finally {
        if (!signal.aborted) {
          setLoading((previous) => ({
            ...previous,
            [key]: false,
          }));
        }
      }
    },
    []
  );

  // ==========================================================
  // LOAD DASHBOARD APIs
  // ==========================================================

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading({
      overview: true,
      usage: true,
      calls: true,
      sentiment: true,
      agents: true,
      hourly: true,
      countries: true,
      billing: true,
    });

    setErrors({});

    // --------------------------------------------------------
    // 1. DASHBOARD OVERVIEW
    // GET /dashboard/overview?range=day|week|month
    // --------------------------------------------------------

    const dashboardRange = period.toLowerCase();

    fetchSection(
      "overview",
      `/dashboard/overview?range=${dashboardRange}`,
      signal,
      (response) => {
        setDashboardData((previous) => ({
          ...previous,

          greeting: {
            first_name: response?.greeting?.first_name || "",
            calls_this_month: num(
              response?.greeting?.calls_this_month
            ),
            success_rate_this_month: num(
              response?.greeting?.success_rate_this_month
            ),
          },

          kpis: {
            total_minutes: num(response?.kpis?.total_minutes),
            active_agents: num(response?.kpis?.active_agents),
            total_agents: num(response?.kpis?.total_agents),
            inactive_agents: num(response?.kpis?.inactive_agents),
            live_calls: num(response?.kpis?.live_calls),
            credits_used: num(response?.kpis?.credits_used),
            credits_balance: num(response?.kpis?.credits_balance),
            success_rate: num(response?.kpis?.success_rate),
            conversion_rate: num(response?.kpis?.conversion_rate),
          },

          usage_trends: {
            range: response?.usage_trends?.range || dashboardRange,
            points: Array.isArray(response?.usage_trends?.points)
              ? response.usage_trends.points
              : [],
          },

          call_outcomes: {
            total: num(response?.call_outcomes?.total),
            success: num(response?.call_outcomes?.success),
            failed: num(response?.call_outcomes?.failed),
            inbound: num(response?.call_outcomes?.inbound),
            outbound: num(response?.call_outcomes?.outbound),
            success_rate: num(response?.call_outcomes?.success_rate),
            weekly: Array.isArray(response?.call_outcomes?.weekly)
              ? response.call_outcomes.weekly
              : [],
          },
        }));
      }
    );

    // --------------------------------------------------------
    // 2. CUSTOM USAGE TIMESERIES
    // GET /analytics/timeseries
    // --------------------------------------------------------

    const usageParams = buildDateParams(range);

    usageParams.set("granularity", "day");

    if (customRangeChanged) {
      fetchSection(
        "usage",
        `/analytics/timeseries?${usageParams.toString()}`,
        signal,
        (response) => {
          const points = Array.isArray(response) ? response : [];

          setDashboardData((previous) => ({
            ...previous,

            usage_trends: {
              range: "custom",
              points: points.map((point) => ({
                bucket: point.bucket,
                calls: num(point.calls),
                minutes: num(point.minutes),
              })),
            },
          }));
        }
      );
    } else {
      // Usage points are already included in dashboard overview.
      // No additional request is required for preset ranges.
      setLoading((previous) => ({
        ...previous,
        usage: false,
      }));
    }

    // --------------------------------------------------------
    // 3. RECENT CALLS
    // GET /calls
    // --------------------------------------------------------

    fetchSection(
      "calls",
      "/calls?limit=6&offset=0&sort_by=time&order=desc",
      signal,
      (response) => {
        setDashboardData((previous) => ({
          ...previous,
          recent_calls: Array.isArray(response?.items)
            ? response.items
            : [],
        }));
      }
    );

    // --------------------------------------------------------
    // 4. SENTIMENT
    // GET /analytics/sentiment
    // --------------------------------------------------------

    const analyticsParams = buildDateParams(range);

    fetchSection(
      "sentiment",
      `/analytics/sentiment?${analyticsParams.toString()}`,
      signal,
      (response) => {
        setDashboardData((previous) => ({
          ...previous,

          sentiment: {
            positive: num(response?.positive),
            neutral: num(response?.neutral),
            negative: num(response?.negative),
          },
        }));
      }
    );

    // --------------------------------------------------------
    // 5. AGENT PERFORMANCE
    // GET /analytics/agents
    // --------------------------------------------------------

    const agentParams = buildDateParams(range);

    fetchSection(
      "agents",
      `/analytics/agents?${agentParams.toString()}`,
      signal,
      (response) => {
        setDashboardData((previous) => ({
          ...previous,

          agent_performance: Array.isArray(response)
            ? response
            : [],
        }));
      }
    );

    // --------------------------------------------------------
    // 6. HOURLY CHANNELS
    // GET /analytics/channels-by-hour
    // --------------------------------------------------------

    const today = new Date();

    const hourlyParams = new URLSearchParams({
      day: today.toISOString(),
    });

    fetchSection(
      "hourly",
      `/analytics/channels-by-hour?${hourlyParams.toString()}`,
      signal,
      (response) => {
        setDashboardData((previous) => ({
          ...previous,

          hourly_activity: Array.isArray(response)
            ? response
            : [],
        }));
      }
    );

    // --------------------------------------------------------
    // 7. TOP COUNTRIES
    // GET /analytics/top-countries
    // --------------------------------------------------------

    const countryParams = buildDateParams(range);

    countryParams.set("limit", "10");

    fetchSection(
      "countries",
      `/analytics/top-countries?${countryParams.toString()}`,
      signal,
      (response) => {
        setDashboardData((previous) => ({
          ...previous,

          top_countries: Array.isArray(response)
            ? response
            : [],
        }));
      }
    );

    // --------------------------------------------------------
    // 8. BILLING BALANCE
    // GET /billing/balance
    // --------------------------------------------------------

    fetchSection(
      "billing",
      "/billing/balance",
      signal,
      (response) => {
        setDashboardData((previous) => ({
          ...previous,
          billing: response,
        }));
      }
    );

    return () => {
      controller.abort();
    };
  }, [
    period,
    range.from,
    range.to,
    customRangeChanged,
    refreshKey,
    fetchSection,
  ]);

  // ==========================================================
  // UPDATE GREETING
  // ==========================================================

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // ==========================================================
  // SCROLL TO TOP
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

  // ==========================================================
  // REFRESH
  // ==========================================================

  const refreshDashboard = () => {
    setRefreshKey((previous) => previous + 1);
  };

  // ==========================================================
  // DATA
  // ==========================================================

  const {
    greeting: greetingData,
    kpis,
    call_outcomes,
  } = dashboardData;

  const usagePoints = dashboardData.usage_trends.points;

  const creditBalance =
    dashboardData.billing?.credit_balance ??
    kpis.credits_balance;

  const anyError = Object.values(errors).some(Boolean);

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="min-h-full bg-zinc-50 text-zinc-900 transition-colors duration-300 dark:bg-[#08090B] dark:text-zinc-100"
    >
      {/* ================= TABS ================= */}

      {SHOW_TABS && (
        <div className="border-b border-black/[0.06] px-4 sm:px-7 dark:border-white/[0.06]">
          <div className="flex items-center gap-7 text-[13.5px]">
            <button className="flex items-center gap-2 border-b-2 border-cyan-400 py-3.5 font-medium text-zinc-900 dark:text-zinc-100">
              <LayoutDashboard size={14} className="text-cyan-500" />
              Overview
            </button>

            <button
              onClick={() => navigate("/analytics")}
              className="flex items-center gap-2 py-3.5 text-zinc-500 transition hover:text-zinc-800 dark:hover:text-zinc-200"
            >
              <LineChartIcon size={14} />
              Analytics
            </button>

            <Compass size={15} className="text-cyan-500" />
          </div>
        </div>
      )}

      <motion.main className="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-7">
        {/* ================= WELCOME ================= */}

        <motion.section
          variants={sectionVariants}
          className="flex flex-wrap items-start justify-between gap-3 pt-2"
        >
          <div>
            <h1
              key={greeting}
              className="text-[26px] font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-[28px]"
            >
              {greeting}, {greetingData.first_name || "there"}
            </h1>

            <p className="mt-1.5 text-[15px] text-zinc-600 dark:text-zinc-500">
              Your agents handled{" "}
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {formatNumber(greetingData.calls_this_month)} calls
              </span>{" "}
              this month with{" "}
              <span className="font-semibold text-emerald-500 dark:text-emerald-400">
                {formatPercent(greetingData.success_rate_this_month)} success
              </span>
            </p>
          </div>

          <button
            onClick={refreshDashboard}
            className="flex items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-xs font-medium text-zinc-600 transition hover:border-cyan-400/40 hover:text-cyan-500 dark:border-white/[0.08] dark:bg-[#0C0D10] dark:text-zinc-300"
          >
            <RefreshCw size={13} />
            Refresh
          </button>
        </motion.section>

        {anyError && (
          <div className="flex items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/[0.05] p-3 text-xs text-amber-600 dark:text-amber-400">
            <Activity size={15} className="mt-0.5 shrink-0" />

            <div>
              Some dashboard sections could not be loaded. Other available
              sections are still displayed.

              <button
                onClick={refreshDashboard}
                className="ml-2 font-semibold underline"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* ================= STATS + GLOBAL REACH ================= */}

        <motion.section
          variants={sectionVariants}
          className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,1fr)]"
        >
          <div className="grid grid-cols-2 content-start gap-3 sm:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
            <StatCard
              icon={Clock3}
              label="Total Minutes"
              value={formatNumber(kpis.total_minutes)}
            />

            <StatCard
              icon={Bot}
              label="Active Agents"
              value={formatNumber(kpis.active_agents)}
            />

            <StatCard
              icon={PhoneCall}
              label="Live Calls"
              value={formatNumber(kpis.live_calls)}
              live
            />

            <StatCard
              icon={Coins}
              label="Used Credits"
              value={formatNumber(kpis.credits_used)}
            />

            <StatCard
              icon={Coins}
              label="Credit Balance"
              value={formatNumber(creditBalance)}
            />

            <StatCard
              icon={Target}
              label="Success Rate"
              value={formatPercent(kpis.success_rate)}
            />

            <StatCard
              icon={Zap}
              label="Conversion"
              value={formatPercent(kpis.conversion_rate)}
            />

            <StatCard
              icon={Bot}
              label="Total Agents"
              value={formatNumber(kpis.total_agents)}
            />

            <StatCard
              icon={Bot}
              label="Inactive Agents"
              value={formatNumber(kpis.inactive_agents)}
            />
          </div>

          <motion.div variants={cardVariants}>
            <GlobalReach />
          </motion.div>
        </motion.section>

        {errors.overview && (
          <ErrorMessage message={`Dashboard overview: ${errors.overview}`} />
        )}

        {/* ================= USAGE + OUTCOMES ================= */}

        <motion.section
          variants={sectionVariants}
          className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,1fr)]"
        >
          <UsageTrends
            points={usagePoints}
            period={period}
            setPeriod={setPeriod}
            range={range}
            setRange={handleRangeChange}
            loading={loading.usage || loading.overview}
          />

          <CallOutcomes
            data={call_outcomes}
            loading={loading.overview}
          />
        </motion.section>

        {errors.usage && (
          <ErrorMessage message={`Usage trends: ${errors.usage}`} />
        )}

        {/* ================= RECENT ACTIVITY + SENTIMENT ================= */}

        <motion.section
          variants={sectionVariants}
          className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
        >
          <RecentActivity
            calls={dashboardData.recent_calls}
            loading={loading.calls}
            onNavigate={navigate}
          />

          <Sentiment
            sentiment={dashboardData.sentiment}
            loading={loading.sentiment}
          />
        </motion.section>

        {/* ================= AGENTS + TODAY + COUNTRIES ================= */}

        <motion.section
          variants={sectionVariants}
          className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)]"
        >
          <ActiveAgents
            onNavigate={navigate}
            activeAgents={kpis.active_agents}
            totalAgents={kpis.total_agents}
            agentPerformance={dashboardData.agent_performance}
            loading={loading.agents}
          />

          <TodaysActivity
            hourly={dashboardData.hourly_activity}
            loading={loading.hourly}
          />

          <TopCountries
            countries={dashboardData.top_countries}
            loading={loading.countries}
          />
        </motion.section>

        {/* ================= QUICK ACTIONS ================= */}

        <motion.section variants={sectionVariants}>
          <QuickActions onNavigate={navigate} />
        </motion.section>
      </motion.main>
    </motion.div>
  );
}
