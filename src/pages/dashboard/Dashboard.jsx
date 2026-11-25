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


import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Config from "../../config/Config";
import {
  Clock3,
  Bot,
  PhoneCall,
  Coins,
  Target,
  Zap,
  Phone,
  PhoneOutgoing,
  PhoneIncoming,
  PhoneForwarded,
  Globe,
  CheckCircle2,
  XCircle,
  Smile,
  UserPlus,
  Smartphone,
  ChevronRight,
  TrendingUp,
  LayoutDashboard,
  LineChart as LineChartIcon,
  Compass,
} from "lucide-react";
import GlobalReach from "../../components/GlobalReach";

// Set to false if your layout already renders the Overview / Analytics tabs
const SHOW_TABS = true;

// ============================================================
// HELPERS
// ============================================================
const num = (v) => Number(v) || 0;

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  if (hour >= 17 && hour < 21) return "Good Evening";
  return "Good Night";
};

const pad = (n) => String(n).padStart(2, "0");

const toInputDate = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const rangeFor = (period) => {
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - (period === "Day" ? 1 : period === "Week" ? 7 : 30));
  return { from: toInputDate(from), to: toInputDate(to) };
};

const formatPercent = (v) => `${Number(num(v).toFixed(2))}%`;

const formatEventTime = (value) => {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

// ============================================================
// ANIMATION VARIANTS
// ============================================================
const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, staggerChildren: 0.07 },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
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
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.45, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-cyan-500"
          />
          Live
        </div>
      )}
    </div>
    <p className={`mb-1.5 ${LABEL}`}>{label}</p>
    <div
      className={`${MONO} text-[20px] font-bold leading-none ${
        live ? "text-cyan-500" : "text-zinc-900 dark:text-zinc-100"
      }`}
    >
      {value}
    </div>
  </motion.div>
);

// ============================================================
// LINE CHART (crisp text, stretchable lines)
// ============================================================
const LineChart = ({ series, yMax = 4, xLabels = [], height = 190 }) => {
  const ticks = [4, 3, 2, 1, 0].map((i) => ({
    label: Math.round(((i * yMax) / 4) * 10) / 10,
    top: ((4 - i) / 4) * 100,
  }));

  const buildPoints = (values) => {
    let v = values.length ? values : [0, 0];
    if (v.length === 1) v = [v[0], v[0]];
    return v
      .map((value, i) => {
        const x = (i / (v.length - 1)) * 100;
        const y = 100 - (Math.min(value, yMax) / yMax) * 100;
        return `${x},${y}`;
      })
      .join(" ");
  };

  return (
    <div>
      <div className="flex" style={{ height }}>
        <div className="relative w-7 shrink-0">
          {ticks.map((t) => (
            <span
              key={t.top}
              style={{ top: `${t.top}%` }}
              className="absolute right-2 -translate-y-1/2 text-[10px] text-zinc-500"
            >
              {t.label}
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
            {series.map((s) => (
              <motion.polyline
                key={s.color}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                points={buildPoints(s.values)}
                fill="none"
                stroke={s.color}
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
        {xLabels.map((l, i) => (
          <span key={`${l}-${i}`}>{l}</span>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// USAGE TRENDS
// ============================================================
const UsageTrends = ({ usageTrends, period, setPeriod, range, setRange }) => {
  const periods = ["Day", "Week", "Month"];
  const points = Array.isArray(usageTrends?.points) ? usageTrends.points : [];

  const minutes = points.map((p) => num(p.minutes));
  const maxValue = Math.max(0, ...minutes);
  const yMax = Math.max(4, Math.ceil(maxValue / 4) * 4);

  const xLabels = useMemo(() => {
    if (!points.length) {
      // fall back to evenly spaced dates across the selected range
      const start = new Date(range.from);
      const end = new Date(range.to);
      if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return [];
      return Array.from({ length: 6 }, (_, i) => {
        const d = new Date(start.getTime() + ((end - start) * i) / 5);
        return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      });
    }
    const count = Math.min(6, points.length);
    return Array.from({ length: count }, (_, i) => {
      const idx = Math.round((i / Math.max(count - 1, 1)) * (points.length - 1));
      const d = new Date(points[idx]?.bucket);
      return Number.isNaN(d.getTime())
        ? ""
        : d.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            timeZone: "UTC",
          });
    });
  }, [points, range.from, range.to]);

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

          <div className="flex items-center gap-2">
            <span className={LABEL}>From</span>
            <input
              type="date"
              value={range.from}
              max={range.to}
              onChange={(e) => setRange((r) => ({ ...r, from: e.target.value }))}
              className={dateInput}
            />
            <span className={LABEL}>To</span>
            <input
              type="date"
              value={range.to}
              min={range.from}
              onChange={(e) => setRange((r) => ({ ...r, to: e.target.value }))}
              className={dateInput}
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <LineChart
          series={[{ values: minutes, color: "#F5B83D" }]}
          yMax={yMax}
          xLabels={xLabels}
          height={210}
        />
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-black/[0.05] pt-4 dark:border-white/[0.05]">
        <div className="flex items-center gap-2 text-[12px] text-zinc-600 dark:text-zinc-400">
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          Minutes
        </div>
        <div className="flex items-center gap-1.5 text-[12px] font-medium text-emerald-500">
          <TrendingUp size={12} />
          vs last period
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================
// CALL OUTCOMES
// ============================================================
const OutcomeItem = ({ label, value, tone = "default", Icon }) => {
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
      <p className={`${MONO} text-[15px] font-bold ${tones.text}`}>{value}</p>
    </div>
  );
};

const CallOutcomes = ({ callOutcomes }) => {
  const total = num(callOutcomes?.total);
  const success = num(callOutcomes?.success);
  const failed = num(callOutcomes?.failed);
  const inbound = num(callOutcomes?.inbound);
  const outbound = num(callOutcomes?.outbound);
  const transfer = num(callOutcomes?.transfer);
  const web = num(callOutcomes?.web);
  const successRate = num(callOutcomes?.success_rate);
  const weekly = Array.isArray(callOutcomes?.weekly) ? callOutcomes.weekly : [];

  const circumference = 238.76;
  const offset =
    circumference - (Math.min(Math.max(successRate, 0), 100) / 100) * circumference;

  const weeklyMax = Math.max(1, ...weekly.map((w) => Math.max(num(w.success), num(w.failed))));

  return (
    <motion.div variants={cardVariants} className={`${CARD} flex flex-col p-6`}>
      <div>
        <h3 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
          Call Outcomes
        </h3>
        <p className="mt-1 text-[13px] text-zinc-500">Success vs failed per week</p>
      </div>

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
            <span className="text-[8px] text-zinc-500">success</span>
          </div>
        </div>

        <div className="grid min-w-0 flex-1 grid-cols-2 gap-2">
          <OutcomeItem label="Total" value={total} />
          <OutcomeItem label="Success" value={success} tone="success" />
          <OutcomeItem label="Failed" value={failed} tone="failed" />
          <OutcomeItem label="Outbound" value={outbound} />
        </div>
      </div>

      {/* weekly bars */}
      <div className="mt-5 flex min-h-[120px] flex-1 items-end justify-around gap-2 border-b border-black/[0.05] pb-2 dark:border-white/[0.05]">
        {weekly.map((w, i) => (
          <div key={i} className="flex h-[100px] items-end gap-1">
            <div
              className="w-2.5 rounded-t bg-cyan-400"
              style={{ height: `${(num(w.success) / weeklyMax) * 100}%` }}
            />
            <div
              className="w-2.5 rounded-t bg-red-500"
              style={{ height: `${(num(w.failed) / weeklyMax) * 100}%` }}
            />
          </div>
        ))}
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
        <div className="flex items-center gap-3 text-[11px] text-zinc-500">
          <span>
            In <b className={`${MONO} text-zinc-800 dark:text-zinc-100`}>{inbound}</b>
          </span>
          <span>
            Web <b className={`${MONO} text-zinc-800 dark:text-zinc-100`}>{web}</b>
          </span>
          <span>
            Transfer{" "}
            <b className={`${MONO} text-zinc-800 dark:text-zinc-100`}>{transfer}</b>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================
// RECENT ACTIVITY
// ============================================================
const RecentActivity = ({ events }) => (
  <motion.div variants={cardVariants} className={`${CARD} p-6`}>
    <h3 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
      Recent Activity
    </h3>
    <p className="mt-1 text-[13px] text-zinc-500">Latest organization events</p>

    <div className="mt-5 h-[330px] overflow-y-auto pr-2 [scrollbar-width:thin]">
      {events.length === 0 ? (
        <div className="flex h-full items-center justify-center text-[13px] text-zinc-500">
          No recent activity
        </div>
      ) : (
        <ul>
          {events.map((ev, i) => (
            <li
              key={ev.id || i}
              className="flex items-center justify-between py-[15px] first:pt-2"
            >
              <span className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
                {ev.title || ev.action || ev.event || ev.message || "Event"}
              </span>
              <span className="text-[12.5px] text-zinc-500">
                {formatEventTime(ev.created_at || ev.timestamp || ev.time)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </motion.div>
);

// ============================================================
// SENTIMENT
// ============================================================
const Sentiment = ({ sentiment }) => {
  const positive = num(sentiment?.positive);
  const neutral = num(sentiment?.neutral);
  const negative = num(sentiment?.negative);
  const total = positive + neutral + negative;

  const rows = [
    { label: "Positive", value: positive, color: "bg-emerald-500" },
    { label: "Neutral", value: neutral, color: "bg-zinc-400" },
    { label: "Negative", value: negative, color: "bg-red-500" },
  ];

  return (
    <motion.div variants={cardVariants} className={`${CARD} p-6`}>
      <div className="flex items-center gap-2.5">
        <Smile size={15} className="text-zinc-500" />
        <h3 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
          Sentiment
        </h3>
      </div>

      {total === 0 ? (
        <div className="flex h-[300px] items-center justify-center text-[13px] text-zinc-500">
          No data yet
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {rows.map((r) => (
            <div key={r.label}>
              <div className="mb-1.5 flex justify-between text-[12px] text-zinc-500">
                <span>{r.label}</span>
                <span className={`${MONO} text-zinc-800 dark:text-zinc-100`}>
                  {r.value}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-zinc-100 dark:bg-white/[0.06]">
                <div
                  className={`h-full rounded-full ${r.color}`}
                  style={{ width: `${(r.value / total) * 100}%` }}
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
const ActiveAgents = ({ onNavigate, activeAgents, agentStats }) => (
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
    <p className="mt-3 text-[13px] text-zinc-500">{activeAgents} listed</p>

    <div className="mt-5 grid grid-cols-3 gap-3 border-b border-black/[0.06] pb-4 dark:border-white/[0.06]">
      {[
        ["Today", agentStats.today],
        ["7 Days", agentStats.seven_days],
        ["All time", agentStats.all_time],
      ].map(([label, value]) => (
        <div key={label}>
          <p className={LABEL}>{label}</p>
          <p className={`${MONO} mt-2 text-[14px] font-bold text-zinc-900 dark:text-zinc-100`}>
            {value}
          </p>
        </div>
      ))}
    </div>
  </motion.div>
);

// ============================================================
// TODAY'S ACTIVITY
// ============================================================
const TodaysActivity = ({ hourly, totals }) => {
  const nowHour = new Date().getHours();

  const xLabels = Array.from({ length: 6 }, (_, i) => {
    const h = Math.round((i * Math.max(nowHour, 5)) / 5);
    return `${pad(h)}:00`;
  });

  const col = (key) => hourly.map((h) => num(h[key]));
  const maxValue = Math.max(0, ...col("outbound"), ...col("inbound"), ...col("web"));
  const yMax = Math.max(4, Math.ceil(maxValue / 4) * 4);

  const footer = [
    { label: "Outbound", icon: PhoneOutgoing, color: "text-emerald-500", value: totals.outbound },
    { label: "Inbound", icon: PhoneIncoming, color: "text-cyan-500", value: totals.inbound },
    { label: "Web", icon: Globe, color: "text-violet-500", value: totals.web },
    { label: "Transfer", icon: PhoneForwarded, color: "text-zinc-400", value: totals.transfer },
  ];

  return (
    <motion.div variants={cardVariants} className={`${CARD} p-6`}>
      <h3 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
        Today's Activity
      </h3>
      <p className="mt-1 text-[13px] text-zinc-500">Call channels per hour</p>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-[12px]">
        {[
          ["Outbound", "bg-emerald-500"],
          ["Inbound", "bg-cyan-400"],
          ["Web", "bg-violet-500"],
        ].map(([label, bg]) => (
          <div key={label} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
            <span className={`h-0.5 w-4 rounded-full ${bg}`} />
            {label}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <LineChart
          series={[
            { values: col("outbound"), color: "#10B981" },
            { values: col("inbound"), color: "#22C1EE" },
            { values: col("web"), color: "#8B5CF6" },
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
              {value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// ============================================================
// TOP COUNTRIES
// ============================================================
const TopCountries = ({ countries, regions }) => (
  <motion.div variants={cardVariants} className={`${CARD} flex h-full flex-col p-6`}>
    <h3 className={`${LABEL} !text-[11px] !font-semibold`}>Top Countries</h3>

    <div className="mt-5 border-b border-black/[0.06] pb-6 text-center dark:border-white/[0.06]">
      {countries.length === 0 ? (
        <p className="pt-3 text-[13px] text-zinc-500">No data yet</p>
      ) : (
        <ul className="space-y-2 text-left">
          {countries.slice(0, 5).map((c, i) => (
            <li key={i} className="flex justify-between text-[13px]">
              <span className="text-zinc-700 dark:text-zinc-300">{c.name || c.country}</span>
              <span className={`${MONO} font-bold text-zinc-900 dark:text-zinc-100`}>
                {num(c.calls ?? c.count)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>

    <div className="mt-5">
      <p className={LABEL}>Countries</p>
      <p className={`${MONO} mt-2 text-[15px] font-bold text-cyan-500`}>{countries.length}</p>
    </div>

    <div className="mt-6">
      <p className={LABEL}>Top Regions</p>
      {regions.length === 0 ? (
        <p className="mt-4 text-center text-[13px] text-zinc-500">No data yet</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {regions.slice(0, 5).map((r, i) => (
            <li key={i} className="flex justify-between text-[13px]">
              <span className="text-zinc-700 dark:text-zinc-300">{r.name || r.region}</span>
              <span className={`${MONO} font-bold text-zinc-900 dark:text-zinc-100`}>
                {num(r.calls ?? r.count)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </motion.div>
);

// ============================================================
// QUICK ACTIONS
// ============================================================
const QuickActionItem = ({ icon: Icon, title, subtitle, onClick }) => (
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
      <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-100">{title}</p>
      <p className="mt-0.5 truncate text-xs text-zinc-500">{subtitle}</p>
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
// DASHBOARD
// ============================================================
const EMPTY_DATA = {
  greeting: { first_name: "", calls_this_month: 0, success_rate_this_month: 0 },
  kpis: {
    total_minutes: 0,
    active_agents: 0,
    total_agents: 0,
    inactive_agents: 0,
    live_calls: 0,
    credits_used: 0,
    credits_balance: 0,
    model_charges: 0,
    twilio_charges: 0,
    transfers: 0,
    transfers_today: 0,
    success_rate: 0,
    conversion_rate: 0,
  },
  usage_trends: { range: "month", points: [] },
  call_outcomes: {
    total: 0,
    success: 0,
    failed: 0,
    inbound: 0,
    outbound: 0,
    transfer: 0,
    web: 0,
    success_rate: 0,
    weekly: [],
  },
  recent_activity: [],
  sentiment: { positive: 0, neutral: 0, negative: 0 },
  agent_stats: { today: 0, seven_days: 0, all_time: 0 },
  todays_activity: { hourly: [], outbound: 0, inbound: 0, web: 0, transfer: 0 },
  top_countries: [],
  top_regions: [],
};

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [greeting, setGreeting] = useState(getGreeting());
  const [dashboardData, setDashboardData] = useState(EMPTY_DATA);
  const [period, setPeriodState] = useState("Month");
  const [range, setRange] = useState(rangeFor("Month"));

  const setPeriod = (p) => {
    setPeriodState(p);
    setRange(rangeFor(p));
  };

  // ==========================================================
  // DASHBOARD API
  // ==========================================================
  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const fetchDashboardOverview = async () => {
      try {
        let authData = {};
        try {
          authData = JSON.parse(localStorage.getItem("ravanai_auth") || "{}");
        } catch {
          authData = {};
        }

        const token = localStorage.getItem("access_token") || authData?.token || "";
        const headers = { Accept: "application/json" };
        if (token) headers.Authorization = `Bearer ${token}`;

        const query = new URLSearchParams({
          range: period.toLowerCase(),
          from: range.from,
          to: range.to,
        });

        const response = await fetch(
          `${Config.BASE_URL}/dashboard/overview?${query.toString()}`,
          { method: "GET", headers, signal: controller.signal }
        );

        let r = {};
        try {
          r = await response.json();
        } catch {
          r = {};
        }

        if (!response.ok) {
          const detail = Array.isArray(r?.detail)
            ? r.detail.map((item) => item?.msg || item).join(", ")
            : r?.detail || r?.message || r?.error || "Failed to load dashboard data.";
          throw new Error(detail);
        }

        if (!isMounted) return;

        const k = r?.kpis || {};
        const co = r?.call_outcomes || {};
        const ta = r?.todays_activity || {};
        const as = r?.agent_stats || {};

        setDashboardData({
          greeting: {
            first_name: r?.greeting?.first_name || "",
            calls_this_month: num(r?.greeting?.calls_this_month),
            success_rate_this_month: num(r?.greeting?.success_rate_this_month),
          },
          kpis: {
            total_minutes: num(k.total_minutes),
            active_agents: num(k.active_agents),
            total_agents: num(k.total_agents),
            inactive_agents: num(k.inactive_agents),
            live_calls: num(k.live_calls),
            credits_used: num(k.credits_used),
            credits_balance: num(k.credits_balance),
            model_charges: num(k.model_charges),
            twilio_charges: num(k.twilio_charges),
            transfers: num(k.transfers),
            transfers_today: num(k.transfers_today),
            success_rate: num(k.success_rate),
            conversion_rate: num(k.conversion_rate),
          },
          usage_trends: {
            range: r?.usage_trends?.range || "month",
            points: Array.isArray(r?.usage_trends?.points) ? r.usage_trends.points : [],
          },
          call_outcomes: {
            total: num(co.total),
            success: num(co.success),
            failed: num(co.failed),
            inbound: num(co.inbound),
            outbound: num(co.outbound),
            transfer: num(co.transfer),
            web: num(co.web),
            success_rate: num(co.success_rate),
            weekly: Array.isArray(co.weekly) ? co.weekly : [],
          },
          recent_activity: Array.isArray(r?.recent_activity) ? r.recent_activity : [],
          sentiment: {
            positive: num(r?.sentiment?.positive),
            neutral: num(r?.sentiment?.neutral),
            negative: num(r?.sentiment?.negative),
          },
          agent_stats: {
            today: num(as.today),
            seven_days: num(as.seven_days),
            all_time: num(as.all_time ?? k.total_agents),
          },
          todays_activity: {
            hourly: Array.isArray(ta.hourly) ? ta.hourly : [],
            outbound: num(ta.outbound),
            inbound: num(ta.inbound),
            web: num(ta.web),
            transfer: num(ta.transfer),
          },
          top_countries: Array.isArray(r?.top_countries) ? r.top_countries : [],
          top_regions: Array.isArray(r?.top_regions) ? r.top_regions : [],
        });
      } catch (error) {
        if (error?.name !== "AbortError") {
          console.error("Dashboard overview API error:", error);
        }
      }
    };

    fetchDashboardOverview();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [period, range.from, range.to]);

  // ==========================================================
  // AUTOMATIC GREETING UPDATE
  // ==========================================================
  useEffect(() => {
    const interval = setInterval(() => setGreeting(getGreeting()), 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // ==========================================================
  // SCROLL TO TOP ON ROUTE CHANGE
  // ==========================================================
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const main = document.querySelector("main");
    if (main) main.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  const { greeting: g, kpis, call_outcomes } = dashboardData;

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
        <motion.section variants={sectionVariants} className="pt-2">
          <h1
            key={greeting}
            className="text-[26px] font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-[28px]"
          >
            {greeting}, {g.first_name || "there"}
          </h1>
          <p className="mt-1.5 text-[15px] text-zinc-600 dark:text-zinc-500">
            Your agents handled{" "}
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {g.calls_this_month} calls
            </span>{" "}
            this month with{" "}
            <span className="font-semibold text-emerald-500 dark:text-emerald-400">
              {g.success_rate_this_month.toFixed(2)}% success
            </span>
          </p>
        </motion.section>

        {/* ================= STATS + GLOBAL REACH ================= */}
        <motion.section
          variants={sectionVariants}
          className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,1fr)]"
        >
          <div className="grid grid-cols-2 content-start gap-3 sm:grid-cols-3 2xl:grid-cols-5 xl:grid-cols-5">
            <StatCard icon={Clock3} label="Total Minutes" value={kpis.total_minutes} />
            <StatCard icon={Bot} label="Active Agents" value={kpis.active_agents} />
            <StatCard icon={PhoneCall} label="Live Calls" value={kpis.live_calls} live />
            <StatCard icon={Coins} label="Used Credits" value={kpis.credits_used} />
            <StatCard icon={Coins} label="Model Charges" value={kpis.model_charges} />
            <StatCard icon={Phone} label="Twilio Charges" value={kpis.twilio_charges} />
            <StatCard icon={PhoneForwarded} label="Transfers" value={kpis.transfers} />
            <StatCard icon={PhoneForwarded} label="Transfers Today" value={kpis.transfers_today} />
            <StatCard icon={Target} label="Success Rate" value={`${kpis.success_rate.toFixed(2)}%`} />
            <StatCard icon={Zap} label="Conversion" value={formatPercent(kpis.conversion_rate)} />
          </div>

          <motion.div variants={cardVariants}>
            <GlobalReach />
          </motion.div>
        </motion.section>

        {/* ================= USAGE + OUTCOMES ================= */}
        <motion.section
          variants={sectionVariants}
          className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,1fr)]"
        >
          <UsageTrends
            usageTrends={dashboardData.usage_trends}
            period={period}
            setPeriod={setPeriod}
            range={range}
            setRange={setRange}
          />
          <CallOutcomes callOutcomes={call_outcomes} />
        </motion.section>

        {/* ================= RECENT ACTIVITY + SENTIMENT ================= */}
        <motion.section
          variants={sectionVariants}
          className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
        >
          <RecentActivity events={dashboardData.recent_activity} />
          <Sentiment sentiment={dashboardData.sentiment} />
        </motion.section>

        {/* ================= ACTIVE + TODAY + COUNTRIES ================= */}
        <motion.section
          variants={sectionVariants}
          className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)]"
        >
          <ActiveAgents
            onNavigate={navigate}
            activeAgents={kpis.active_agents}
            agentStats={dashboardData.agent_stats}
          />
          <TodaysActivity
            hourly={dashboardData.todays_activity.hourly}
            totals={dashboardData.todays_activity}
          />
          <TopCountries
            countries={dashboardData.top_countries}
            regions={dashboardData.top_regions}
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