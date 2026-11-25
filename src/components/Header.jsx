

// import {
//   Bell,
//   Plus,
//   Search,
//   Copy,
//   HelpCircle,
//   RefreshCw,
//   Trash2,
//   Filter,
//   Zap,
// } from "lucide-react";
// import { useLocation, useNavigate } from "react-router-dom";

// import ThemeToggle from "./ThemeToggle";

// // ============================================================
// // ROUTE → HEADER CONTENT
// // ============================================================

// function useHeaderContent() {
//   const location = useLocation();
//   const pathname = location.pathname;

//   // ================= PLATFORM =================
//   if (pathname === "/dashboard") {
//     return {
//       title: "Dashboard",
//       subtitle: "Overview of your voice AI platform",
//     };
//   }

//   if (pathname === "/agents") {
//     return {
//       title: "Agents",
//       subtitle: "Overview of your voice AI platform",
//     };
//   }

//   if (pathname === "/agents/create") {
//     return {
//       title: "Create Agent",
//       subtitle: "Build a new AI assistant",
//     };
//   }

//   // ================= KNOWLEDGE BASE =================
//   if (pathname === "/knowledge-base") {
//     return {
//       title: "Knowledge Base",
//       subtitle: "Add sources for agents",
//     };
//   }

//   if (
//     pathname.startsWith("/knowledge-base/") &&
//     pathname !== "/knowledge-base"
//   ) {
//     const id = pathname.replace("/knowledge-base/", "");
//     let kbName = id;

//     try {
//       const raw = localStorage.getItem("ravanai_knowledge_bases");
//       const bases = raw ? JSON.parse(raw) : [];
//       const found = Array.isArray(bases)
//         ? bases.find((b) => b.id === id)
//         : null;
//       if (found?.name) kbName = found.name;
//     } catch {
//       // fallback to id
//     }

//     return {
//       title: kbName,
//       subtitle: "Knowledge Base Details",
//     };
//   }

//   // ================= CAMPAIGNS =================
//   if (pathname === "/inbound" || pathname === "/inbound-calls") {
//     return {
//       title: "Inbound Calls",
//       subtitle: "Manage inbound call routing and dispatch rules",
//     };
//   }

//   if (pathname === "/outbound") {
//     return {
//       title: "Outbound",
//       subtitle: "Launch and manage outbound call campaigns",
//     };
//   }

//   if (pathname === "/outbound/new") {
//     return {
//       title: "New Campaign",
//       subtitle: "Create a new outbound campaign",
//     };
//   }

//   if (pathname === "/campaigns") {
//     return {
//       title: "Campaigns",
//       subtitle: "Manage your outbound campaigns",
//     };
//   }

//   if (pathname === "/campaigns/new") {
//     return {
//       title: "New Campaign",
//       subtitle: "Create a new outbound campaign",
//     };
//   }

//   // ================= MANAGEMENT =================
//   if (pathname === "/calls" || pathname === "/call-sessions") {
//     return {
//       title: "All Calls History",
//       subtitle: "Review call logs and recordings",
//     };
//   }

//   if (pathname === "/contacts") {
//     return {
//       title: "Contacts",
//       subtitle: "Manage your global contact list and campaign assignments",
//     };
//   }

//   if (pathname === "/integrations") {
//     return {
//       title: "Integrations",
//       subtitle: "Connect and manage external tools that power your agents.",
//     };
//   }

//   // ================= OPERATIONS =================
//   if (pathname === "/phone-numbers" || pathname === "/phone-number") {
//     return {
//       title: "Phone Numbers",
//       subtitle: "Connect a provider, buy numbers, and route calls to AI agents",
//     };
//   }

//   if (pathname === "/billing") {
//     return {
//       title: "Billing",
//       subtitle: "Manage your subscription and usage",
//     };
//   }

//   // ================= FALLBACK =================
//   return {
//     title: "Dashboard",
//     subtitle: "Overview of your voice AI platform",
//   };
// }

// // ============================================================
// // HEADER COMPONENT
// // ============================================================

// export default function Header({ onThemeToggle, theme }) {
//   const { title, subtitle } = useHeaderContent();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const isKbDetail =
//     location.pathname.startsWith("/knowledge-base/") &&
//     location.pathname !== "/knowledge-base";

//   // Event dispatchers for KB detail actions
//   const handleRefresh = () =>
//     window.dispatchEvent(new CustomEvent("kb-refresh"));
//   const handleClearCache = () =>
//     window.dispatchEvent(new CustomEvent("kb-clear-cache"));
//   const handleExclusions = () =>
//     window.dispatchEvent(new CustomEvent("kb-exclusions"));
//   const handleDelete = () =>
//     window.dispatchEvent(new CustomEvent("kb-delete"));
//   const handleAddSource = () =>
//     window.dispatchEvent(new CustomEvent("kb-add-source"));

//   return (
//     <header
//       className="
//         sticky top-0 z-30 flex min-h-[68px]
//         items-center justify-between gap-4
//         border-b border-black/10
//         bg-white/80 px-6
//         backdrop-blur-xl
//         antialiased
//         transition-colors duration-300
//         dark:border-white/10
//         dark:bg-[#080a0d]/95
//       "
//     >
//       {/* ============ LEFT — Title ============ */}
//       <div className="min-w-0 shrink-0">
//         <h2
//           className="
//             flex items-center gap-2
//             text-[15px] font-bold
//             text-zinc-900
//             antialiased
//             dark:text-white
//           "
//         >
//           {title}

//           <span className="text-zinc-500 dark:text-zinc-400">
//             <HelpCircle size={13} strokeWidth={1.8} />
//           </span>
//         </h2>

//         <div
//           className="
//             mt-0.5 flex items-center gap-2
//             text-[11px] text-zinc-500
//             antialiased
//           "
//         >
//           <span className="hidden sm:inline">{subtitle}</span>
//           <span className="hidden sm:inline">•</span>
//           <span className="font-mono"># 012854ee...681e</span>

//           <button
//             type="button"
//             aria-label="Copy workspace ID"
//             className="
//               rounded-md p-0.5
//               transition-colors
//               hover:bg-black/5
//               hover:text-zinc-700
//               dark:hover:bg-white/10
//               dark:hover:text-zinc-300
//             "
//             onClick={() => {
//               navigator.clipboard?.writeText("# 012854ee...681e");
//             }}
//           >
//             <Copy size={11} />
//           </button>
//         </div>
//       </div>

//       {/* ============ RIGHT — Actions ============ */}
//       <div className="flex flex-1 items-center justify-end gap-2">
//         {/* Search */}
//         <div
//           className="
//             hidden h-9 w-56
//             items-center gap-2
//             rounded-lg
//             border border-black/10
//             bg-black/[0.02] px-3
//             text-sm text-zinc-500
//             md:flex
//             dark:border-white/10
//             dark:bg-white/[0.02]
//           "
//         >
//           <Search size={15} />

//           <input
//             type="text"
//             placeholder="Search..."
//             aria-label="Search"
//             className="
//               min-w-0 flex-1
//               bg-transparent
//               text-[13px] text-zinc-800
//               outline-none
//               placeholder:text-zinc-500
//               antialiased
//               dark:text-zinc-200
//             "
//           />

//           <kbd
//             className="
//               rounded border
//               border-black/10
//               px-1.5 py-0.5
//               text-[10px] text-zinc-500
//               dark:border-white/10
//             "
//           >
//             ⌘K
//           </kbd>
//         </div>

//         {/* Credits */}
//         <div
//           className="
//             hidden items-center gap-2
//             rounded-lg
//             border border-black/10
//             px-3 py-1.5
//             text-[13px]
//             sm:flex
//             dark:border-white/10
//           "
//         >
//           <span className="text-cyan-500 dark:text-cyan-300">♧</span>
//           <span className="whitespace-nowrap font-medium text-zinc-800 antialiased dark:text-zinc-200">
//             10 credits
//           </span>
//         </div>

//         {/* Theme Toggle */}
//         <div className="antialiased">
//           <ThemeToggle theme={theme} onToggle={onThemeToggle} />
//         </div>

//         {/* Notifications */}
//         <button
//           type="button"
//           aria-label="Notifications"
//           className="
//             hidden rounded-lg
//             p-2
//             text-zinc-500
//             transition-colors
//             hover:bg-black/5
//             dark:text-zinc-400
//             dark:hover:bg-white/10
//             sm:block
//           "
//         >
//           <Bell size={16} />
//         </button>

//         {/* ============ KB DETAIL BUTTONS ============ */}
//         {isKbDetail && (
//           <>
//             <button
//               type="button"
//               onClick={handleRefresh}
//               className="
//                 flex h-9 items-center gap-2
//                 rounded-lg border border-black/10
//                 bg-white px-3
//                 text-[13px] font-medium text-zinc-700
//                 transition
//                 hover:bg-black/[0.03]
//                 dark:border-white/10
//                 dark:bg-[#101012]
//                 dark:text-zinc-300
//               "
//             >
//               <RefreshCw size={14} />
//               <span className="hidden lg:inline">Refresh</span>
//             </button>

//             <button
//               type="button"
//               onClick={handleClearCache}
//               className="
//                 flex h-9 items-center gap-2
//                 rounded-lg border border-black/10
//                 bg-white px-3
//                 text-[13px] font-medium text-zinc-700
//                 transition
//                 hover:bg-black/[0.03]
//                 dark:border-white/10
//                 dark:bg-[#101012]
//                 dark:text-zinc-300
//               "
//             >
//               <Zap size={14} />
//               <span className="hidden lg:inline">Clear cache</span>
//             </button>

//             <button
//               type="button"
//               onClick={handleExclusions}
//               className="
//                 flex h-9 items-center gap-2
//                 rounded-lg border border-black/10
//                 bg-white px-3
//                 text-[13px] font-medium text-zinc-700
//                 transition
//                 hover:bg-black/[0.03]
//                 dark:border-white/10
//                 dark:bg-[#101012]
//                 dark:text-zinc-300
//               "
//             >
//               <Filter size={14} />
//               <span className="hidden lg:inline">Exclusions</span>
//             </button>

//             <button
//               type="button"
//               onClick={handleDelete}
//               className="
//                 flex h-9 items-center gap-2
//                 rounded-lg border border-black/10
//                 bg-white px-3
//                 text-[13px] font-medium text-zinc-700
//                 transition
//                 hover:bg-red-500/[0.06]
//                 hover:text-red-500
//                 dark:border-white/10
//                 dark:bg-[#101012]
//                 dark:text-zinc-300
//               "
//             >
//               <Trash2 size={14} />
//               <span className="hidden lg:inline">Delete</span>
//             </button>

//             <button
//               type="button"
//               onClick={handleAddSource}
//               className="
//                 flex h-9 items-center gap-1.5
//                 rounded-lg bg-cyan-500 px-4
//                 text-[13px] font-semibold text-white
//                 transition
//                 hover:bg-cyan-400
//                 dark:bg-cyan-400 dark:text-slate-950
//               "
//             >
//               <Plus size={15} strokeWidth={2.8} />
//               <span className="hidden sm:inline">Add Source</span>
//             </button>
//           </>
//         )}

//         {/* ============ NEW AGENT — only on non-KB-detail pages ============ */}
//         {!isKbDetail && (
//           <button
//             type="button"
//             onClick={() => navigate("/agents/create")}
//             className="
//               flex items-center gap-2
//               rounded-lg
//               bg-cyan-400
//               px-3.5 py-2
//               text-[13px] font-bold
//               text-slate-950
//               antialiased
//               transition-all duration-200
//               hover:bg-cyan-300
//               active:scale-[0.98]
//             "
//           >
//             <Plus size={15} strokeWidth={2.8} />
//             <span className="hidden sm:inline">New Agent</span>
//           </button>
//         )}
//       </div>
//     </header>
//   );
// }


// import React from "react";
// import {
//   Bell,
//   Plus,
//   Search,
//   Copy,
//   HelpCircle,
//   RefreshCw,
//   Trash2,
//   Filter,
//   Zap,
// } from "lucide-react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// import ThemeToggle from "./ThemeToggle";

// function useHeaderContent() {
//   const location = useLocation();
//   const pathname = location.pathname;

//   if (pathname === "/dashboard") {
//     return {
//       title: "Dashboard",
//       subtitle: "Overview of your voice AI platform",
//     };
//   }

//   if (pathname === "/agents") {
//     return {
//       title: "Agents",
//       subtitle: "Overview of your voice AI platform",
//     };
//   }

//   if (pathname === "/agents/create") {
//     return {
//       title: "Create Agent",
//       subtitle: "Build a new AI assistant",
//     };
//   }

//   if (pathname === "/knowledge-base") {
//     return {
//       title: "Knowledge Base",
//       subtitle: "Add sources for agents",
//     };
//   }

//   if (
//     pathname.startsWith("/knowledge-base/") &&
//     pathname !== "/knowledge-base"
//   ) {
//     const id = pathname.replace("/knowledge-base/", "");
//     let kbName = id;

//     try {
//       const raw = localStorage.getItem("ravanai_knowledge_bases");
//       const bases = raw ? JSON.parse(raw) : [];

//       const found = Array.isArray(bases)
//         ? bases.find((b) => b.id === id)
//         : null;

//       if (found?.name) kbName = found.name;
//     } catch {
//       // fallback to id
//     }

//     return {
//       title: kbName,
//       subtitle: "Knowledge Base Details",
//     };
//   }

//   if (pathname === "/inbound" || pathname === "/inbound-calls") {
//     return {
//       title: "Inbound Calls",
//       subtitle: "Manage inbound call routing and dispatch rules",
//     };
//   }

//   if (pathname === "/outbound") {
//     return {
//       title: "Outbound",
//       subtitle: "Launch and manage outbound call campaigns",
//     };
//   }

//   if (pathname === "/outbound/new") {
//     return {
//       title: "New Campaign",
//       subtitle: "Create a new outbound campaign",
//     };
//   }

//   if (pathname === "/campaigns") {
//     return {
//       title: "Campaigns",
//       subtitle: "Manage your outbound campaigns",
//     };
//   }

//   if (pathname === "/campaigns/new") {
//     return {
//       title: "New Campaign",
//       subtitle: "Create a new outbound campaign",
//     };
//   }

//   if (pathname === "/calls" || pathname === "/call-sessions") {
//     return {
//       title: "All Calls History",
//       subtitle: "Review call logs and recordings",
//     };
//   }

//   if (pathname === "/contacts") {
//     return {
//       title: "Contacts",
//       subtitle:
//         "Manage your global contact list and campaign assignments",
//     };
//   }

//   if (pathname === "/integrations") {
//     return {
//       title: "Integrations",
//       subtitle:
//         "Connect and manage external tools that power your agents.",
//     };
//   }

//   if (
//     pathname === "/phone-numbers" ||
//     pathname === "/phone-number"
//   ) {
//     return {
//       title: "Phone Numbers",
//       subtitle:
//         "Connect a provider, buy numbers, and route calls to AI agents",
//     };
//   }

//   if (pathname === "/billing") {
//     return {
//       title: "Billing",
//       subtitle: "Manage your subscription and usage",
//     };
//   }

//   return {
//     title: "Dashboard",
//     subtitle: "Overview of your voice AI platform",
//   };
// }

// export default function Header({ onThemeToggle, theme }) {
//   const { title, subtitle } = useHeaderContent();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const isKbDetail =
//     location.pathname.startsWith("/knowledge-base/") &&
//     location.pathname !== "/knowledge-base";

//   const handleRefresh = () => {
//     window.dispatchEvent(new CustomEvent("kb-refresh"));
//   };

//   const handleClearCache = () => {
//     window.dispatchEvent(new CustomEvent("kb-clear-cache"));
//   };

//   const handleExclusions = () => {
//     window.dispatchEvent(new CustomEvent("kb-exclusions"));
//   };

//   const handleDelete = () => {
//     window.dispatchEvent(new CustomEvent("kb-delete"));
//   };

//   const handleAddSource = () => {
//     window.dispatchEvent(new CustomEvent("kb-add-source"));
//   };

//   const handleCopyWorkspaceId = () => {
//     navigator.clipboard?.writeText("# 012854ee...681e");
//   };

//   return (
//     <motion.header
//       initial={{ y: -18, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{
//         duration: 0.45,
//         ease: [0.22, 1, 0.36, 1],
//       }}
//       className="
//         sticky top-0 z-30 flex min-h-[68px]
//         items-center justify-between gap-4
//         border-b border-black/10
//         bg-white/80 px-6
//         backdrop-blur-xl
//         antialiased
//         transition-colors duration-300
//         dark:border-white/10
//         dark:bg-[#080a0d]/95
//       "
//     >
//       {/* LEFT */}
//       <motion.div
//         initial={{ x: -15, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ delay: 0.08, duration: 0.4 }}
//         className="min-w-0 shrink-0"
//       >
//         <motion.h2
//           key={title}
//           initial={{ opacity: 0, y: 6 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.25 }}
//           className="
//             flex items-center gap-2
//             text-[15px] font-bold
//             text-zinc-900
//             dark:text-white
//           "
//         >
//           {title}

//           <motion.span
//             whileHover={{ scale: 1.15, rotate: 8 }}
//             className="text-zinc-500 dark:text-zinc-400"
//           >
//             <HelpCircle size={13} strokeWidth={1.8} />
//           </motion.span>
//         </motion.h2>

//         <motion.div
//           key={subtitle}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.12 }}
//           className="
//             mt-0.5 flex items-center gap-2
//             text-[11px] text-zinc-500
//           "
//         >
//           <span className="hidden sm:inline">
//             {subtitle}
//           </span>

//           <span className="hidden sm:inline">•</span>

//           <span className="font-mono">
//             # 012854ee...681e
//           </span>

//           <motion.button
//             type="button"
//             aria-label="Copy workspace ID"
//             whileHover={{ scale: 1.12 }}
//             whileTap={{ scale: 0.9 }}
//             className="
//               rounded-md p-0.5
//               transition-colors
//               hover:bg-black/5
//               hover:text-zinc-700
//               dark:hover:bg-white/10
//             "
//             onClick={handleCopyWorkspaceId}
//           >
//             <Copy size={11} />
//           </motion.button>
//         </motion.div>
//       </motion.div>

//       {/* RIGHT */}
//       <motion.div
//         initial={{ x: 15, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ delay: 0.1, duration: 0.4 }}
//         className="flex flex-1 items-center justify-end gap-2"
//       >
//         {/* SEARCH */}
//         <motion.div
//           whileHover={{
//             borderColor: "rgba(34,211,238,0.35)",
//             scale: 1.01,
//           }}
//           transition={{ duration: 0.2 }}
//           className="
//             hidden h-9 w-56
//             items-center gap-2
//             rounded-lg
//             border border-black/10
//             bg-black/[0.02] px-3
//             text-sm text-zinc-500
//             md:flex
//             dark:border-white/10
//             dark:bg-white/[0.02]
//           "
//         >
//           <Search size={15} />

//           <input
//             type="text"
//             placeholder="Search..."
//             aria-label="Search"
//             className="
//               min-w-0 flex-1
//               bg-transparent
//               text-[13px]
//               text-zinc-800
//               outline-none
//               placeholder:text-zinc-500
//               dark:text-zinc-200
//             "
//           />

//           <kbd
//             className="
//               rounded border
//               border-black/10
//               px-1.5 py-0.5
//               text-[10px] text-zinc-500
//               dark:border-white/10
//             "
//           >
//             ⌘K
//           </kbd>
//         </motion.div>

//         {/* CREDITS */}
//         <motion.div
//           whileHover={{ y: -2, scale: 1.02 }}
//           className="
//             hidden items-center gap-2
//             rounded-lg
//             border border-black/10
//             px-3 py-1.5
//             text-[13px]
//             sm:flex
//             dark:border-white/10
//           "
//         >
//           <motion.span
//             animate={{ rotate: [0, 8, -8, 0] }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               repeatDelay: 3,
//             }}
//             className="text-cyan-500 dark:text-cyan-300"
//           >
//             ♧
//           </motion.span>

//           <span className="whitespace-nowrap font-medium text-zinc-800 dark:text-zinc-200">
//             10 credits
//           </span>
//         </motion.div>

//         {/* THEME */}
//         <motion.div
//           whileHover={{ scale: 1.04 }}
//           whileTap={{ scale: 0.94 }}
//         >
//           <ThemeToggle
//             theme={theme}
//             onToggle={onThemeToggle}
//           />
//         </motion.div>

//         {/* NOTIFICATIONS */}
//         <motion.button
//           type="button"
//           aria-label="Notifications"
//           whileHover={{
//             scale: 1.08,
//             y: -1,
//           }}
//           whileTap={{ scale: 0.9 }}
//           className="
//             hidden rounded-lg
//             p-2
//             text-zinc-500
//             transition-colors
//             hover:bg-black/5
//             dark:text-zinc-400
//             dark:hover:bg-white/10
//             sm:block
//           "
//         >
//           <Bell size={16} />
//         </motion.button>

//         {/* KB DETAIL BUTTONS */}
//         {isKbDetail && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="flex items-center gap-2"
//           >
//             <motion.button
//               whileHover={{ y: -2, scale: 1.02 }}
//               whileTap={{ scale: 0.96 }}
//               onClick={handleRefresh}
//               className="
//                 flex h-9 items-center gap-2
//                 rounded-lg border border-black/10
//                 bg-white px-3
//                 text-[13px] font-medium text-zinc-700
//                 dark:border-white/10
//                 dark:bg-[#101012]
//                 dark:text-zinc-300
//               "
//             >
//               <RefreshCw size={14} />
//               <span className="hidden lg:inline">
//                 Refresh
//               </span>
//             </motion.button>

//             <motion.button
//               whileHover={{ y: -2, scale: 1.02 }}
//               whileTap={{ scale: 0.96 }}
//               onClick={handleClearCache}
//               className="
//                 flex h-9 items-center gap-2
//                 rounded-lg border border-black/10
//                 bg-white px-3
//                 text-[13px] font-medium text-zinc-700
//                 dark:border-white/10
//                 dark:bg-[#101012]
//                 dark:text-zinc-300
//               "
//             >
//               <Zap size={14} />
//               <span className="hidden lg:inline">
//                 Clear cache
//               </span>
//             </motion.button>

//             <motion.button
//               whileHover={{ y: -2, scale: 1.02 }}
//               whileTap={{ scale: 0.96 }}
//               onClick={handleExclusions}
//               className="
//                 flex h-9 items-center gap-2
//                 rounded-lg border border-black/10
//                 bg-white px-3
//                 text-[13px] font-medium text-zinc-700
//                 dark:border-white/10
//                 dark:bg-[#101012]
//                 dark:text-zinc-300
//               "
//             >
//               <Filter size={14} />
//               <span className="hidden lg:inline">
//                 Exclusions
//               </span>
//             </motion.button>

//             <motion.button
//               whileHover={{ y: -2, scale: 1.02 }}
//               whileTap={{ scale: 0.96 }}
//               onClick={handleDelete}
//               className="
//                 flex h-9 items-center gap-2
//                 rounded-lg border border-black/10
//                 bg-white px-3
//                 text-[13px] font-medium text-zinc-700
//                 hover:text-red-500
//                 dark:border-white/10
//                 dark:bg-[#101012]
//                 dark:text-zinc-300
//               "
//             >
//               <Trash2 size={14} />
//               <span className="hidden lg:inline">
//                 Delete
//               </span>
//             </motion.button>

//             <motion.button
//               whileHover={{
//                 y: -2,
//                 scale: 1.03,
//                 boxShadow: "0 8px 25px rgba(34,211,238,0.22)",
//               }}
//               whileTap={{ scale: 0.96 }}
//               onClick={handleAddSource}
//               className="
//                 flex h-9 items-center gap-1.5
//                 rounded-lg bg-cyan-500 px-4
//                 text-[13px] font-semibold text-white
//                 dark:bg-cyan-400 dark:text-slate-950
//               "
//             >
//               <Plus size={15} strokeWidth={2.8} />
//               <span className="hidden sm:inline">
//                 Add Source
//               </span>
//             </motion.button>
//           </motion.div>
//         )}

//         {/* NEW AGENT */}
//         {!isKbDetail && (
//           <motion.button
//             type="button"
//             onClick={() => navigate("/agents/create")}
//             whileHover={{
//               y: -2,
//               scale: 1.03,
//               boxShadow: "0 8px 25px rgba(34,211,238,0.22)",
//             }}
//             whileTap={{ scale: 0.95 }}
//             className="
//               flex items-center gap-2
//               rounded-lg
//               bg-cyan-400
//               px-3.5 py-2
//               text-[13px] font-bold
//               text-slate-950
//             "
//           >
//             <Plus size={15} strokeWidth={2.8} />
//             <span className="hidden sm:inline">
//               New Agent
//             </span>
//           </motion.button>
//         )}
//       </motion.div>
//     </motion.header>
//   );
// }

// import React, { useEffect, useState } from "react";

// import {
//   Bell,
//   Plus,
//   Search,
//   Copy,
//   HelpCircle,
//   RefreshCw,
//   Trash2,
//   Filter,
//   Zap,
// } from "lucide-react";

// import {
//   useLocation,
//   useNavigate,
//   useParams,
// } from "react-router-dom";

// import { motion } from "framer-motion";

// import ThemeToggle from "./ThemeToggle";

// // ============================================================
// // HEADER CONTENT
// // ============================================================

// function useHeaderContent() {
//   const location = useLocation();
//   const pathname = location.pathname;

//   const [knowledgeBaseName, setKnowledgeBaseName] =
//     useState("");

//   // ==========================================================
//   // KNOWLEDGE BASE DETAIL NAME
//   // ==========================================================

//   useEffect(() => {
//     if (
//       pathname.startsWith("/knowledge-base/") &&
//       pathname !== "/knowledge-base"
//     ) {
//       const parts = pathname
//         .split("/")
//         .filter(Boolean);

//       const knowledgeBaseId = parts[1];

//       let kbName = knowledgeBaseId || "Knowledge Base";

//       try {
//         const raw = localStorage.getItem(
//           "ravanai_knowledge_bases"
//         );

//         const bases = raw
//           ? JSON.parse(raw)
//           : [];

//         const found = Array.isArray(bases)
//           ? bases.find(
//               (base) =>
//                 String(base?.id) ===
//                 String(knowledgeBaseId)
//             )
//           : null;

//         if (found?.name) {
//           kbName = found.name;
//         }
//       } catch (error) {
//         console.error(
//           "Failed to read Knowledge Base name:",
//           error
//         );
//       }

//       setKnowledgeBaseName(kbName);
//     } else {
//       setKnowledgeBaseName("");
//     }
//   }, [pathname]);

//   // ==========================================================
//   // DASHBOARD
//   // ==========================================================

//   if (pathname === "/dashboard") {
//     return {
//       title: "Dashboard",
//       subtitle:
//         "Overview of your voice AI platform",
//     };
//   }

//   // ==========================================================
//   // AGENTS
//   // ==========================================================

//   if (pathname === "/agents") {
//     return {
//       title: "Agents",
//       subtitle:
//         "Overview of your voice AI platform",
//     };
//   }

//   // ==========================================================
//   // CREATE AGENT
//   // ==========================================================

//   if (pathname === "/agents/create") {
//     return {
//       title: "Create Agent",
//       subtitle:
//         "Build a new AI assistant",
//     };
//   }

//   // ==========================================================
//   // KNOWLEDGE BASE LIST
//   // ==========================================================

//   if (pathname === "/knowledge-base") {
//     return {
//       title: "Knowledge Base",
//       subtitle: "Add sources for agents",
//     };
//   }

//   // ==========================================================
//   // KNOWLEDGE BASE DETAILS
//   // ==========================================================

//   if (
//     pathname.startsWith("/knowledge-base/") &&
//     pathname !== "/knowledge-base"
//   ) {
//     return {
//       title:
//         knowledgeBaseName || "Knowledge Base",
//       subtitle: "Knowledge Base Details",
//     };
//   }

//   // ==========================================================
//   // INBOUND
//   // ==========================================================

//   if (
//     pathname === "/inbound" ||
//     pathname === "/inbound-calls"
//   ) {
//     return {
//       title: "Inbound Calls",
//       subtitle:
//         "Manage inbound call routing and dispatch rules",
//     };
//   }

//   // ==========================================================
//   // OUTBOUND
//   // ==========================================================

//   if (pathname === "/outbound") {
//     return {
//       title: "Outbound",
//       subtitle:
//         "Launch and manage outbound call campaigns",
//     };
//   }

//   // ==========================================================
//   // NEW CAMPAIGN
//   // ==========================================================

//   if (pathname === "/outbound/new") {
//     return {
//       title: "New Campaign",
//       subtitle:
//         "Create a new outbound campaign",
//     };
//   }

//   // ==========================================================
//   // CAMPAIGNS
//   // ==========================================================

//   if (pathname === "/campaigns") {
//     return {
//       title: "Campaigns",
//       subtitle:
//         "Manage your outbound campaigns",
//     };
//   }

//   if (pathname === "/campaigns/new") {
//     return {
//       title: "New Campaign",
//       subtitle:
//         "Create a new outbound campaign",
//     };
//   }

//   // ==========================================================
//   // CALLS
//   // ==========================================================

//   if (
//     pathname === "/calls" ||
//     pathname === "/call-sessions"
//   ) {
//     return {
//       title: "All Calls History",
//       subtitle:
//         "Review call logs and recordings",
//     };
//   }

//   // ==========================================================
//   // CONTACTS
//   // ==========================================================

//   if (pathname === "/contacts") {
//     return {
//       title: "Contacts",
//       subtitle:
//         "Manage your global contact list and campaign assignments",
//     };
//   }

//   // ==========================================================
//   // INTEGRATIONS
//   // ==========================================================

//   if (pathname === "/integrations") {
//     return {
//       title: "Integrations",
//       subtitle:
//         "Connect and manage external tools that power your agents.",
//     };
//   }

//   // ==========================================================
//   // PHONE NUMBERS
//   // ==========================================================

//   if (
//     pathname === "/phone-numbers" ||
//     pathname === "/phone-number"
//   ) {
//     return {
//       title: "Phone Numbers",
//       subtitle:
//         "Connect a provider, buy numbers, and route calls to AI agents",
//     };
//   }

//   // ==========================================================
//   // BILLING
//   // ==========================================================

//   if (pathname === "/billing") {
//     return {
//       title: "Billing",
//       subtitle:
//         "Manage your subscription and usage",
//     };
//   }

//   // ==========================================================
//   // DEFAULT
//   // ==========================================================

//   return {
//     title: "Dashboard",
//     subtitle:
//       "Overview of your voice AI platform",
//   };
// }

// // ============================================================
// // HEADER
// // ============================================================

// export default function Header({
//   onThemeToggle,
//   theme,
// }) {
//   const {
//     title,
//     subtitle,
//   } = useHeaderContent();

//   const location = useLocation();
//   const navigate = useNavigate();

//   // ==========================================================
//   // KNOWLEDGE BASE DETAIL PAGE
//   // ==========================================================

//   const isKbDetail =
//     location.pathname.startsWith(
//       "/knowledge-base/"
//     ) &&
//     location.pathname !==
//       "/knowledge-base";

//   // ==========================================================
//   // HEADER EVENTS
//   // ==========================================================

//   const handleRefresh = () => {
//     window.dispatchEvent(
//       new CustomEvent("kb-refresh")
//     );
//   };

//   const handleClearCache = () => {
//     window.dispatchEvent(
//       new CustomEvent("kb-clear-cache")
//     );
//   };

//   const handleExclusions = () => {
//     window.dispatchEvent(
//       new CustomEvent("kb-exclusions")
//     );
//   };

//   const handleDelete = () => {
//     window.dispatchEvent(
//       new CustomEvent("kb-delete")
//     );
//   };

//   const handleAddSource = () => {
//     window.dispatchEvent(
//       new CustomEvent("kb-add-source")
//     );
//   };

//   // ==========================================================
//   // COPY WORKSPACE ID
//   // ==========================================================

//   const handleCopyWorkspaceId = () => {
//     navigator.clipboard?.writeText(
//       "# 012854ee...681e"
//     );
//   };

//   // ==========================================================
//   // UI
//   // ==========================================================

//   return (
//     <motion.header
//       initial={{
//         y: -18,
//         opacity: 0,
//       }}
//       animate={{
//         y: 0,
//         opacity: 1,
//       }}
//       transition={{
//         duration: 0.45,
//         ease: [0.22, 1, 0.36, 1],
//       }}
//       className="
//         sticky top-0 z-30
//         flex min-h-[68px]
//         items-center justify-between
//         gap-4
//         border-b border-black/10
//         bg-white/95
//         px-6
//         backdrop-blur-xl
//         antialiased
//         dark:border-white/10
//         dark:bg-[#080a0d]/95
//       "
//     >

//       {/* ====================================================
//           LEFT
//       ==================================================== */}

//       <motion.div
//         initial={{
//           x: -15,
//           opacity: 0,
//         }}
//         animate={{
//           x: 0,
//           opacity: 1,
//         }}
//         transition={{
//           delay: 0.08,
//           duration: 0.4,
//         }}
//         className="min-w-0 shrink-0"
//       >
//         <motion.h2
//           key={title}
//           initial={{
//             opacity: 0,
//             y: 6,
//           }}
//           animate={{
//             opacity: 1,
//             y: 0,
//           }}
//           transition={{
//             duration: 0.25,
//           }}
//           className="
//             flex items-center gap-2
//             text-[15px]
//             font-bold
//             text-zinc-900
//             dark:text-white
//           "
//         >
//           <span className="max-w-[260px] truncate">
//             {title}
//           </span>

//           <motion.span
//             whileHover={{
//               scale: 1.15,
//               rotate: 8,
//             }}
//             className="text-zinc-500 dark:text-zinc-400"
//           >
//             <HelpCircle
//               size={13}
//               strokeWidth={1.8}
//             />
//           </motion.span>
//         </motion.h2>

//         <motion.div
//           key={subtitle}
//           initial={{
//             opacity: 0,
//           }}
//           animate={{
//             opacity: 1,
//           }}
//           transition={{
//             delay: 0.12,
//           }}
//           className="
//             mt-0.5
//             flex items-center gap-2
//             text-[11px]
//             text-zinc-500
//           "
//         >
//           <span className="hidden sm:inline">
//             {subtitle}
//           </span>

//           <span className="hidden sm:inline">
//             •
//           </span>

//           <span className="font-mono">
//             # 012854ee...681e
//           </span>

//           <motion.button
//             type="button"
//             aria-label="Copy workspace ID"
//             whileHover={{
//               scale: 1.12,
//             }}
//             whileTap={{
//               scale: 0.9,
//             }}
//             className="
//               rounded-md
//               p-0.5
//               transition-colors
//               hover:bg-black/5
//               hover:text-zinc-700
//               dark:hover:bg-white/10
//             "
//             onClick={
//               handleCopyWorkspaceId
//             }
//           >
//             <Copy size={11} />
//           </motion.button>
//         </motion.div>
//       </motion.div>

//       {/* ====================================================
//           RIGHT
//       ==================================================== */}

//       <motion.div
//         initial={{
//           x: 15,
//           opacity: 0,
//         }}
//         animate={{
//           x: 0,
//           opacity: 1,
//         }}
//         transition={{
//           delay: 0.1,
//           duration: 0.4,
//         }}
//         className="
//           flex
//           min-w-0
//           flex-1
//           items-center
//           justify-end
//           gap-2
//         "
//       >

//         {/* ==================================================
//             SEARCH
//         ================================================== */}

//         <motion.div
//           whileHover={{
//             borderColor:
//               "rgba(34,211,238,0.35)",
//             scale: 1.01,
//           }}
//           transition={{
//             duration: 0.2,
//           }}
//           className="
//             hidden
//             h-9
//             w-56
//             items-center
//             gap-2
//             rounded-lg
//             border
//             border-black/10
//             bg-black/[0.02]
//             px-3
//             text-sm
//             text-zinc-500
//             md:flex
//             dark:border-white/10
//             dark:bg-white/[0.02]
//           "
//         >
//           <Search size={15} />

//           <input
//             type="text"
//             placeholder="Search..."
//             aria-label="Search"
//             className="
//               min-w-0
//               flex-1
//               bg-transparent
//               text-[13px]
//               text-zinc-800
//               outline-none
//               placeholder:text-zinc-500
//               dark:text-zinc-200
//             "
//           />

//           <kbd
//             className="
//               rounded
//               border
//               border-black/10
//               px-1.5
//               py-0.5
//               text-[10px]
//               text-zinc-500
//               dark:border-white/10
//             "
//           >
//             ⌘K
//           </kbd>
//         </motion.div>

//         {/* ==================================================
//             CREDITS
//         ================================================== */}

//         <motion.div
//           whileHover={{
//             y: -2,
//             scale: 1.02,
//           }}
//           className="
//             hidden
//             items-center
//             gap-2
//             rounded-lg
//             border
//             border-black/10
//             px-3
//             py-1.5
//             text-[13px]
//             sm:flex
//             dark:border-white/10
//           "
//         >
//           <motion.span
//             animate={{
//               rotate: [0, 8, -8, 0],
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               repeatDelay: 3,
//             }}
//             className="text-cyan-500 dark:text-cyan-300"
//           >
//             ♧
//           </motion.span>

//           <span className="whitespace-nowrap font-medium text-zinc-800 dark:text-zinc-200">
//             10 credits
//           </span>
//         </motion.div>

//         {/* ==================================================
//             THEME
//         ================================================== */}

//         <motion.div
//           whileHover={{
//             scale: 1.04,
//           }}
//           whileTap={{
//             scale: 0.94,
//           }}
//         >
//           <ThemeToggle
//             theme={theme}
//             onToggle={onThemeToggle}
//           />
//         </motion.div>

//         {/* ==================================================
//             NOTIFICATIONS
//         ================================================== */}

//         <motion.button
//           type="button"
//           aria-label="Notifications"
//           whileHover={{
//             scale: 1.08,
//             y: -1,
//           }}
//           whileTap={{
//             scale: 0.9,
//           }}
//           className="
//             hidden
//             rounded-lg
//             p-2
//             text-zinc-500
//             transition-colors
//             hover:bg-black/5
//             dark:text-zinc-400
//             dark:hover:bg-white/10
//             sm:block
//           "
//         >
//           <Bell size={16} />
//         </motion.button>

//         {/* ==================================================
//             KNOWLEDGE BASE DETAIL ACTIONS
//         ================================================== */}

//         {isKbDetail && (
//           <motion.div
//             initial={{
//               opacity: 0,
//               scale: 0.95,
//             }}
//             animate={{
//               opacity: 1,
//               scale: 1,
//             }}
//             className="
//               flex
//               items-center
//               gap-2
//             "
//           >

//             {/* REFRESH */}

//             <motion.button
//               type="button"
//               whileHover={{
//                 y: -2,
//                 scale: 1.02,
//               }}
//               whileTap={{
//                 scale: 0.96,
//               }}
//               onClick={
//                 handleRefresh
//               }
//               className="
//                 flex
//                 h-9
//                 items-center
//                 gap-2
//                 rounded-lg
//                 border
//                 border-black/10
//                 bg-white
//                 px-3
//                 text-[13px]
//                 font-medium
//                 text-zinc-700
//                 transition
//                 hover:bg-zinc-50
//                 dark:border-white/10
//                 dark:bg-[#101012]
//                 dark:text-zinc-300
//               "
//             >
//               <RefreshCw size={14} />

//               <span className="hidden lg:inline">
//                 Refresh
//               </span>
//             </motion.button>

//             {/* CLEAR CACHE */}

//             <motion.button
//               type="button"
//               whileHover={{
//                 y: -2,
//                 scale: 1.02,
//               }}
//               whileTap={{
//                 scale: 0.96,
//               }}
//               onClick={
//                 handleClearCache
//               }
//               className="
//                 flex
//                 h-9
//                 items-center
//                 gap-2
//                 rounded-lg
//                 border
//                 border-black/10
//                 bg-white
//                 px-3
//                 text-[13px]
//                 font-medium
//                 text-zinc-700
//                 transition
//                 hover:bg-zinc-50
//                 dark:border-white/10
//                 dark:bg-[#101012]
//                 dark:text-zinc-300
//               "
//             >
//               <Zap size={14} />

//               <span className="hidden lg:inline">
//                 Clear cache
//               </span>
//             </motion.button>

//             {/* EXCLUSIONS */}

//             <motion.button
//               type="button"
//               whileHover={{
//                 y: -2,
//                 scale: 1.02,
//               }}
//               whileTap={{
//                 scale: 0.96,
//               }}
//               onClick={
//                 handleExclusions
//               }
//               className="
//                 hidden
//                 h-9
//                 items-center
//                 gap-2
//                 rounded-lg
//                 border
//                 border-black/10
//                 bg-white
//                 px-3
//                 text-[13px]
//                 font-medium
//                 text-zinc-700
//                 transition
//                 hover:bg-zinc-50
//                 xl:flex
//                 dark:border-white/10
//                 dark:bg-[#101012]
//                 dark:text-zinc-300
//               "
//             >
//               <Filter size={14} />

//               <span>
//                 Exclusions
//               </span>
//             </motion.button>

//             {/* DELETE */}

//             <motion.button
//               type="button"
//               whileHover={{
//                 y: -2,
//                 scale: 1.02,
//               }}
//               whileTap={{
//                 scale: 0.96,
//               }}
//               onClick={handleDelete}
//               className="
//                 hidden
//                 h-9
//                 items-center
//                 gap-2
//                 rounded-lg
//                 border
//                 border-black/10
//                 bg-white
//                 px-3
//                 text-[13px]
//                 font-medium
//                 text-zinc-700
//                 transition
//                 hover:border-red-200
//                 hover:bg-red-50
//                 hover:text-red-500
//                 lg:flex
//                 dark:border-white/10
//                 dark:bg-[#101012]
//                 dark:text-zinc-300
//               "
//             >
//               <Trash2 size={14} />

//               <span>
//                 Delete
//               </span>
//             </motion.button>

//             {/* ADD SOURCE */}

//             <motion.button
//               type="button"
//               whileHover={{
//                 y: -2,
//                 scale: 1.03,
//                 boxShadow:
//                   "0 8px 25px rgba(34,211,238,0.22)",
//               }}
//               whileTap={{
//                 scale: 0.96,
//               }}
//               onClick={
//                 handleAddSource
//               }
//               className="
//                 flex
//                 h-9
//                 items-center
//                 gap-1.5
//                 rounded-lg
//                 bg-cyan-500
//                 px-4
//                 text-[13px]
//                 font-semibold
//                 text-white
//                 dark:bg-cyan-400
//                 dark:text-slate-950
//               "
//             >
//               <Plus
//                 size={15}
//                 strokeWidth={2.8}
//               />

//               <span>
//                 Add Source
//               </span>
//             </motion.button>
//           </motion.div>
//         )}

//         {/* ==================================================
//             NEW AGENT
//         ================================================== */}

//         {!isKbDetail && (
//           <motion.button
//             type="button"
//             onClick={() =>
//               navigate("/agents/create")
//             }
//             whileHover={{
//               y: -2,
//               scale: 1.03,
//               boxShadow:
//                 "0 8px 25px rgba(34,211,238,0.22)",
//             }}
//             whileTap={{
//               scale: 0.95,
//             }}
//             className="
//               flex
//               items-center
//               gap-2
//               rounded-lg
//               bg-cyan-400
//               px-3.5
//               py-2
//               text-[13px]
//               font-bold
//               text-slate-950
//             "
//           >
//             <Plus
//               size={15}
//               strokeWidth={2.8}
//             />

//             <span className="hidden sm:inline">
//               New Agent
//             </span>
//           </motion.button>
//         )}
//       </motion.div>
//     </motion.header>
//   );
// }

// import React, { useEffect, useState } from "react";

// import {
//   Bell,
//   Plus,
//   Search,
//   Copy,
//   HelpCircle,
//   RefreshCw,
//   Trash2,
//   Filter,
//   Zap,
//   Sun,
//   Moon,
// } from "lucide-react";

// import {
//   useLocation,
//   useNavigate,
// } from "react-router-dom";

// import { motion } from "framer-motion";

// // ============================================================
// // HEADER CONTENT
// // ============================================================

// function useHeaderContent() {
//   const location = useLocation();
//   const pathname = location.pathname;

//   const [knowledgeBaseName, setKnowledgeBaseName] = useState("");

//   useEffect(() => {
//     if (
//       pathname.startsWith("/knowledge-base/") &&
//       pathname !== "/knowledge-base"
//     ) {
//       const parts = pathname.split("/").filter(Boolean);
//       const knowledgeBaseId = parts[1];
//       let kbName = knowledgeBaseId || "Knowledge Base";

//       try {
//         const raw = localStorage.getItem("ravanai_knowledge_bases");
//         const bases = raw ? JSON.parse(raw) : [];
//         const found = Array.isArray(bases)
//           ? bases.find(
//               (base) => String(base?.id) === String(knowledgeBaseId)
//             )
//           : null;

//         if (found?.name) {
//           kbName = found.name;
//         }
//       } catch (error) {
//         console.error("Failed to read Knowledge Base name:", error);
//       }

//       setKnowledgeBaseName(kbName);
//     } else {
//       setKnowledgeBaseName("");
//     }
//   }, [pathname]);

//   if (pathname === "/dashboard") {
//     return { title: "Dashboard", subtitle: "Overview of your voice AI platform" };
//   }
//   if (pathname === "/agents") {
//     return { title: "Agents", subtitle: "Overview of your voice AI platform" };
//   }
//   if (pathname === "/agents/create") {
//     return { title: "Create Agent", subtitle: "Build a new AI assistant" };
//   }
//   if (pathname === "/knowledge-base") {
//     return { title: "Knowledge Base", subtitle: "1 knowledge base" };
//   }
//   if (
//     pathname.startsWith("/knowledge-base/") &&
//     pathname !== "/knowledge-base"
//   ) {
//     return {
//       title: knowledgeBaseName || "Knowledge Base",
//       subtitle: "Knowledge Base Details",
//     };
//   }
//   if (pathname === "/inbound" || pathname === "/inbound-calls") {
//     return { title: "Inbound Calls", subtitle: "Manage inbound call routing and dispatch rules" };
//   }
//   if (pathname === "/outbound") {
//     return { title: "Outbound", subtitle: "Launch and manage outbound call campaigns" };
//   }
//   if (pathname === "/outbound/new") {
//     return { title: "New Campaign", subtitle: "Create a new outbound campaign" };
//   }
//   if (pathname === "/campaigns") {
//     return { title: "Campaigns", subtitle: "Manage your outbound campaigns" };
//   }
//   if (pathname === "/campaigns/new") {
//     return { title: "New Campaign", subtitle: "Create a new outbound campaign" };
//   }
//   if (pathname === "/calls" || pathname === "/call-sessions") {
//     return { title: "All Calls History", subtitle: "Review call logs and recordings" };
//   }
//   if (pathname === "/contacts") {
//     return { title: "Contacts", subtitle: "Manage your global contact list and campaign assignments" };
//   }
//   if (pathname === "/integrations") {
//     return { title: "Integrations", subtitle: "Connect and manage external tools that power your agents." };
//   }
//   if (pathname === "/phone-numbers" || pathname === "/phone-number") {
//     return { title: "Phone Numbers", subtitle: "Connect a provider, buy numbers, and route calls to AI agents" };
//   }
//   if (pathname === "/billing") {
//     return { title: "Billing", subtitle: "Manage your subscription and usage" };
//   }

//   return { title: "Dashboard", subtitle: "Overview of your voice AI platform" };
// }

// // ============================================================
// // HEADER
// // ============================================================

// export default function Header({ onThemeToggle, theme }) {
//   const { title, subtitle } = useHeaderContent();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const isKbDetail =
//     location.pathname.startsWith("/knowledge-base/") &&
//     location.pathname !== "/knowledge-base";

//   // ==========================================================
//   // HEADER EVENTS
//   // ==========================================================

//   const handleRefresh = () => {
//     window.dispatchEvent(new CustomEvent("kb-refresh"));
//   };

//   const handleClearCache = () => {
//     window.dispatchEvent(new CustomEvent("kb-clear-cache"));
//   };

//   const handleExclusions = () => {
//     window.dispatchEvent(new CustomEvent("kb-exclusions"));
//   };

//   const handleDelete = () => {
//     window.dispatchEvent(new CustomEvent("kb-delete"));
//   };

//   const handleAddSource = () => {
//     window.dispatchEvent(new CustomEvent("kb-add-source"));
//   };

//   const handleCreateKb = () => {
//     window.dispatchEvent(new CustomEvent("kb-create"));
//   };

//   const handleCopyWorkspaceId = () => {
//     navigator.clipboard?.writeText("# 012854ee...681e");
//   };

//   // ==========================================================
//   // UI
//   // ==========================================================

//   return (
//     <motion.header
//       initial={{ y: -18, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
//       className="sticky top-0 z-30 flex min-h-[68px] items-center justify-between gap-4 border-b border-black/10 bg-white/95 px-6 backdrop-blur-xl antialiased dark:border-white/10 dark:bg-[#080a0d]/95"
//     >
//       {/* ====================================================
//           LEFT SIDE (Title & Subtitle)
//       ==================================================== */}
//       <motion.div
//         initial={{ x: -15, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ delay: 0.08, duration: 0.4 }}
//         className="min-w-0 shrink-0"
//       >
//         <motion.h2
//           key={title}
//           initial={{ opacity: 0, y: 6 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.25 }}
//           className="flex items-center gap-2 text-[15px] font-bold text-zinc-900 dark:text-white"
//         >
//           <span className="max-w-[260px] truncate">{title}</span>
//           <motion.span
//             whileHover={{ scale: 1.15, rotate: 8 }}
//             className="text-zinc-400 dark:text-zinc-500"
//           >
//             <HelpCircle size={14} strokeWidth={2} />
//           </motion.span>
//         </motion.h2>

//         <motion.div
//           key={subtitle}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.12 }}
//           className="mt-0.5 flex items-center gap-2 text-[12px] text-zinc-500"
//         >
//           <span className="hidden sm:inline">{subtitle}</span>
//           <span className="hidden sm:inline">•</span>
//           <span className="font-mono text-[11px] text-zinc-400">
//             # 012854ee...681e
//           </span>
//           <motion.button
//             type="button"
//             aria-label="Copy workspace ID"
//             whileHover={{ scale: 1.12 }}
//             whileTap={{ scale: 0.9 }}
//             className="rounded-md p-0.5 text-zinc-400 transition-colors hover:bg-black/5 hover:text-zinc-700 dark:hover:bg-white/10"
//             onClick={handleCopyWorkspaceId}
//           >
//             <Copy size={11} />
//           </motion.button>
//         </motion.div>
//       </motion.div>

//       {/* ====================================================
//           RIGHT SIDE (Search, Credits, Theme, Bell, Buttons)
//       ==================================================== */}
//       <motion.div
//         initial={{ x: 15, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ delay: 0.1, duration: 0.4 }}
//         className="flex min-w-0 flex-1 items-center justify-end gap-3"
//       >
//         {/* SEARCH BAR */}
//         <motion.div
//           whileHover={{ borderColor: "rgba(34,211,238,0.35)", scale: 1.01 }}
//           transition={{ duration: 0.2 }}
//           className="hidden h-9 w-64 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm text-zinc-500 md:flex dark:border-white/10 dark:bg-white/[0.02]"
//         >
//           <Search size={15} className="text-zinc-400" />
//           <input
//             type="text"
//             placeholder="Search..."
//             aria-label="Search"
//             className="min-w-0 flex-1 bg-transparent text-[13px] text-zinc-800 outline-none placeholder:text-zinc-400 dark:text-zinc-200"
//           />
//           <kbd className="rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] text-zinc-500 dark:border-white/10 dark:bg-white/5">
//             ⌘K
//           </kbd>
//         </motion.div>

//         {/* CREDITS BADGE */}
//         <motion.div
//           whileHover={{ y: -2, scale: 1.02 }}
//           className="hidden items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[13px] sm:flex dark:border-white/10 dark:bg-white/[0.02]"
//         >
//           <span className="text-blue-500 text-[10px]">●</span>
//           <span className="whitespace-nowrap font-medium text-zinc-800 dark:text-zinc-200">
//             10 credits
//           </span>
//         </motion.div>

//         {/* THEME TOGGLE (Direct Button) */}
//         <motion.button
//           type="button"
//           onClick={onThemeToggle}
//           whileHover={{ scale: 1.08, y: -1 }}
//           whileTap={{ scale: 0.9 }}
//           className="hidden rounded-lg p-2 text-zinc-500 transition-colors hover:bg-black/5 dark:text-zinc-400 dark:hover:bg-white/10 sm:block"
//           aria-label="Toggle Theme"
//         >
//           {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
//         </motion.button>

//         {/* NOTIFICATIONS */}
//         <motion.button
//           type="button"
//           aria-label="Notifications"
//           whileHover={{ scale: 1.08, y: -1 }}
//           whileTap={{ scale: 0.9 }}
//           className="hidden rounded-lg p-2 text-zinc-500 transition-colors hover:bg-black/5 dark:text-zinc-400 dark:hover:bg-white/10 sm:block"
//         >
//           <Bell size={16} />
//         </motion.button>

//         {/* ==================================================
//             KNOWLEDGE BASE DETAIL ACTIONS (When inside a KB)
//         ================================================== */}
//         {isKbDetail && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="flex items-center gap-2"
//           >
//             <motion.button
//               type="button"
//               whileHover={{ y: -2, scale: 1.02 }}
//               whileTap={{ scale: 0.96 }}
//               onClick={handleRefresh}
//               className="flex h-9 items-center gap-2 rounded-lg border border-black/10 bg-white px-3 text-[13px] font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-white/10 dark:bg-[#101012] dark:text-zinc-300"
//             >
//               <RefreshCw size={14} />
//               <span className="hidden lg:inline">Refresh</span>
//             </motion.button>

//             <motion.button
//               type="button"
//               whileHover={{ y: -2, scale: 1.02 }}
//               whileTap={{ scale: 0.96 }}
//               onClick={handleClearCache}
//               className="flex h-9 items-center gap-2 rounded-lg border border-black/10 bg-white px-3 text-[13px] font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-white/10 dark:bg-[#101012] dark:text-zinc-300"
//             >
//               <Zap size={14} />
//               <span className="hidden lg:inline">Clear cache</span>
//             </motion.button>

//             <motion.button
//               type="button"
//               whileHover={{ y: -2, scale: 1.02 }}
//               whileTap={{ scale: 0.96 }}
//               onClick={handleExclusions}
//               className="hidden h-9 items-center gap-2 rounded-lg border border-black/10 bg-white px-3 text-[13px] font-medium text-zinc-700 transition hover:bg-zinc-50 xl:flex dark:border-white/10 dark:bg-[#101012] dark:text-zinc-300"
//             >
//               <Filter size={14} />
//               <span>Exclusions</span>
//             </motion.button>

//             <motion.button
//               type="button"
//               whileHover={{ y: -2, scale: 1.02 }}
//               whileTap={{ scale: 0.96 }}
//               onClick={handleDelete}
//               className="hidden h-9 items-center gap-2 rounded-lg border border-black/10 bg-white px-3 text-[13px] font-medium text-zinc-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 lg:flex dark:border-white/10 dark:bg-[#101012] dark:text-zinc-300"
//             >
//               <Trash2 size={14} />
//               <span>Delete</span>
//             </motion.button>

//             <motion.button
//               type="button"
//               whileHover={{ y: -2, scale: 1.03, boxShadow: "0 8px 25px rgba(34,211,238,0.22)" }}
//               whileTap={{ scale: 0.96 }}
//               onClick={handleAddSource}
//               className="flex h-9 items-center gap-1.5 rounded-lg bg-cyan-500 px-4 text-[13px] font-semibold text-white dark:bg-cyan-400 dark:text-slate-950"
//             >
//               <Plus size={15} strokeWidth={2.8} />
//               <span>Add Source</span>
//             </motion.button>
//           </motion.div>
//         )}

//         {/* ==================================================
//             CREATE KNOWLEDGE BASE BUTTON (Main KB List Page)
//         ================================================== */}
//         {!isKbDetail && location.pathname === "/knowledge-base" && (
//           <motion.button
//             type="button"
//             onClick={handleCreateKb}
//             whileHover={{ y: -2, scale: 1.03, boxShadow: "0 8px 25px rgba(34,211,238,0.22)" }}
//             whileTap={{ scale: 0.95 }}
//             className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-cyan-700"
//           >
//             <Plus size={15} strokeWidth={2.8} />
//             <span className="hidden sm:inline">Create Knowledge Base</span>
//           </motion.button>
//         )}

//         {/* ==================================================
//             NEW AGENT BUTTON (All other pages)
//         ================================================== */}
//         {!isKbDetail && location.pathname !== "/knowledge-base" && (
//           <motion.button
//             type="button"
//             onClick={() => navigate("/agents/create")}
//             whileHover={{ y: -2, scale: 1.03, boxShadow: "0 8px 25px rgba(34,211,238,0.22)" }}
//             whileTap={{ scale: 0.95 }}
//             className="flex items-center gap-2 rounded-lg bg-cyan-400 px-3.5 py-2 text-[13px] font-bold text-slate-950"
//           >
//             <Plus size={15} strokeWidth={2.8} />
//             <span className="hidden sm:inline">New Agent</span>
//           </motion.button>
//         )}
//       </motion.div>
//     </motion.header>
//   );
// }

// import React, { useEffect, useState } from "react";

// import {
//   Bell,
//   Plus,
//   Search,
//   Copy,
//   Check,
//   HelpCircle,
//   RefreshCw,
//   Trash2,
//   Filter,
//   Zap,
//   Sun,
//   Moon,
// } from "lucide-react";

// import { useLocation, useNavigate } from "react-router-dom";

// import { motion } from "framer-motion";

// const WORKSPACE_ID = "012854ee...681e";

// // ============================================================
// // KNOWLEDGE BASE META (published by the KB pages via
// // knowledgebase/hooks/kbMeta.js -> "kb-meta" window event)
// // ============================================================

// function useKbMeta() {
//   const [meta, setMeta] = useState(
//     () => (typeof window !== "undefined" && window.__kbMeta) || {}
//   );

//   useEffect(() => {
//     const onMeta = (e) => setMeta({ ...(e.detail || window.__kbMeta || {}) });
//     window.addEventListener("kb-meta", onMeta);
//     return () => window.removeEventListener("kb-meta", onMeta);
//   }, []);

//   return meta;
// }

// // ============================================================
// // HEADER CONTENT
// // ============================================================

// function useHeaderContent(kbMeta) {
//   const { pathname } = useLocation();

//   const isKbDetail =
//     pathname.startsWith("/knowledge-base/") && pathname !== "/knowledge-base";

//   if (pathname === "/dashboard") {
//     return { title: "Dashboard", subtitle: "Overview of your voice AI platform" };
//   }
//   if (pathname === "/agents") {
//     return { title: "Agents", subtitle: "Overview of your voice AI platform" };
//   }
//   if (pathname === "/agents/create") {
//     return { title: "Create Agent", subtitle: "Build a new AI assistant" };
//   }
//   if (pathname === "/knowledge-base") {
//     const total = typeof kbMeta.total === "number" ? kbMeta.total : null;
//     return {
//       title: "Knowledge Base",
//       subtitle:
//         total === null
//           ? "Knowledge bases"
//           : `${total} knowledge base${total === 1 ? "" : "s"}`,
//     };
//   }
//   if (isKbDetail) {
//     const idFromUrl = pathname.split("/").filter(Boolean)[1];
//     return {
//       title: kbMeta.name || idFromUrl || "Knowledge Base",
//       subtitle: "", // detail header shows only name + workspace id (as in Agni panel)
//     };
//   }
//   if (pathname === "/inbound" || pathname === "/inbound-calls") {
//     return { title: "Inbound Calls", subtitle: "Manage inbound call routing and dispatch rules" };
//   }
//   if (pathname === "/outbound") {
//     return { title: "Outbound", subtitle: "Launch and manage outbound call campaigns" };
//   }
//   if (pathname === "/outbound/new") {
//     return { title: "New Campaign", subtitle: "Create a new outbound campaign" };
//   }
//   if (pathname === "/campaigns") {
//     return { title: "Campaigns", subtitle: "Manage your outbound campaigns" };
//   }
//   if (pathname === "/campaigns/new") {
//     return { title: "New Campaign", subtitle: "Create a new outbound campaign" };
//   }
//   if (pathname === "/calls" || pathname === "/call-sessions") {
//     return { title: "All Calls History", subtitle: "Review call logs and recordings" };
//   }
//   if (pathname === "/contacts") {
//     return { title: "Contacts", subtitle: "Manage your global contact list and campaign assignments" };
//   }
//   if (pathname === "/integrations") {
//     return { title: "Integrations", subtitle: "Connect and manage external tools that power your agents." };
//   }
//   if (pathname === "/phone-numbers" || pathname === "/phone-number") {
//     return { title: "Phone Numbers", subtitle: "Connect a provider, buy numbers, and route calls to AI agents" };
//   }
//   if (pathname === "/billing") {
//     return { title: "Billing", subtitle: "Manage your subscription and usage" };
//   }

//   return { title: "Dashboard", subtitle: "Overview of your voice AI platform" };
// }

// // ============================================================
// // SHARED BUTTON STYLES
// // ============================================================

// const kbBtn =
//   "h-9 items-center gap-2 rounded-lg border border-black/10 bg-white px-3 text-[13px] font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-white/10 dark:bg-[#101012] dark:text-zinc-300 dark:hover:bg-white/5";

// // ============================================================
// // HEADER
// // ============================================================

// export default function Header({ onThemeToggle, theme }) {
//   const kbMeta = useKbMeta();
//   const { title, subtitle } = useHeaderContent(kbMeta);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [copied, setCopied] = useState(false);

//   const isKbList = location.pathname === "/knowledge-base";
//   const isKbDetail =
//     location.pathname.startsWith("/knowledge-base/") && !isKbList;

//   // ==========================================================
//   // HEADER EVENTS  (handled by the Knowledge Base pages)
//   // ==========================================================

//   const emit = (name) => () => window.dispatchEvent(new CustomEvent(name));

//   const handleRefresh = emit("kb-refresh");
//   const handleClearCache = emit("kb-clear-cache");
//   const handleExclusions = emit("kb-exclusions");
//   const handleDelete = emit("kb-delete");
//   const handleAddSource = emit("kb-add-source");
//   const handleCreateKb = emit("kb-create");

//   const handleCopyWorkspaceId = () => {
//     navigator.clipboard?.writeText(WORKSPACE_ID);
//     setCopied(true);
//     window.setTimeout(() => setCopied(false), 1400);
//   };

//   // ==========================================================
//   // UI
//   // ==========================================================

//   return (
//     <motion.header
//       initial={{ y: -18, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
//       className="sticky top-0 z-30 flex min-h-[68px] items-center justify-between gap-4 border-b border-black/10 bg-white/95 px-6 backdrop-blur-xl antialiased dark:border-white/10 dark:bg-[#080a0d]/95"
//     >
//       {/* LEFT: title + subtitle */}
//       <motion.div
//         initial={{ x: -15, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ delay: 0.08, duration: 0.4 }}
//         className="min-w-0 shrink-0"
//       >
//         <motion.h2
//           key={title}
//           initial={{ opacity: 0, y: 6 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.25 }}
//           className="flex items-center gap-2 text-[15px] font-bold text-zinc-900 dark:text-white"
//         >
//           <span className="max-w-[260px] truncate" title={title}>
//             {title}
//           </span>
//           <motion.span
//             whileHover={{ scale: 1.15, rotate: 8 }}
//             className="text-zinc-400 dark:text-zinc-500"
//           >
//             <HelpCircle size={14} strokeWidth={2} />
//           </motion.span>
//         </motion.h2>

//         <motion.div
//           key={subtitle}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.12 }}
//           className="mt-0.5 flex items-center gap-2 text-[12px] text-zinc-500"
//         >
//           {subtitle && (
//             <>
//               <span className="hidden sm:inline">{subtitle}</span>
//               <span className="hidden sm:inline">•</span>
//             </>
//           )}
//           <span className="font-mono text-[11px] text-zinc-400">
//             # {WORKSPACE_ID}
//           </span>
//           <motion.button
//             type="button"
//             aria-label="Copy workspace ID"
//             whileHover={{ scale: 1.12 }}
//             whileTap={{ scale: 0.9 }}
//             className="rounded-md p-0.5 text-zinc-400 transition-colors hover:bg-black/5 hover:text-zinc-700 dark:hover:bg-white/10"
//             onClick={handleCopyWorkspaceId}
//           >
//             {copied ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
//           </motion.button>
//         </motion.div>
//       </motion.div>

//       {/* RIGHT: search, credits, theme, bell, page actions */}
//       <motion.div
//         initial={{ x: 15, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ delay: 0.1, duration: 0.4 }}
//         className="flex min-w-0 flex-1 items-center justify-end gap-3"
//       >
//         {/* SEARCH */}
//         <motion.div
//           whileHover={{ borderColor: "rgba(34,211,238,0.35)", scale: 1.01 }}
//           transition={{ duration: 0.2 }}
//           className="hidden h-9 w-64 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm text-zinc-500 md:flex dark:border-white/10 dark:bg-white/[0.02]"
//         >
//           <Search size={15} className="text-zinc-400" />
//           <input
//             type="text"
//             placeholder="Search..."
//             aria-label="Search"
//             className="min-w-0 flex-1 bg-transparent text-[13px] text-zinc-800 outline-none placeholder:text-zinc-400 dark:text-zinc-200"
//           />
//           <kbd className="rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] text-zinc-500 dark:border-white/10 dark:bg-white/5">
//             ⌘K
//           </kbd>
//         </motion.div>

//         {/* CREDITS */}
//         <motion.div
//           whileHover={{ y: -2, scale: 1.02 }}
//           className="hidden items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[13px] sm:flex dark:border-white/10 dark:bg-white/[0.02]"
//         >
//           <span className="text-[10px] text-blue-500">●</span>
//           <span className="whitespace-nowrap font-medium text-zinc-800 dark:text-zinc-200">
//             10 credits
//           </span>
//         </motion.div>

//         {/* THEME */}
//         <motion.button
//           type="button"
//           onClick={onThemeToggle}
//           whileHover={{ scale: 1.08, y: -1 }}
//           whileTap={{ scale: 0.9 }}
//           className="hidden rounded-lg p-2 text-zinc-500 transition-colors hover:bg-black/5 dark:text-zinc-400 dark:hover:bg-white/10 sm:block"
//           aria-label="Toggle Theme"
//         >
//           {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
//         </motion.button>

//         {/* NOTIFICATIONS */}
//         <motion.button
//           type="button"
//           aria-label="Notifications"
//           whileHover={{ scale: 1.08, y: -1 }}
//           whileTap={{ scale: 0.9 }}
//           className="hidden rounded-lg p-2 text-zinc-500 transition-colors hover:bg-black/5 dark:text-zinc-400 dark:hover:bg-white/10 sm:block"
//         >
//           <Bell size={16} />
//         </motion.button>

//         {/* KB DETAIL ACTIONS: Refresh | Clear cache | Exclusions | Delete | Add Source */}
//         {isKbDetail && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="flex items-center gap-2"
//           >
//             <motion.button
//               type="button"
//               whileHover={{ y: -2, scale: 1.02 }}
//               whileTap={{ scale: 0.96 }}
//               onClick={handleRefresh}
//               className={`flex ${kbBtn}`}
//             >
//               <RefreshCw size={14} />
//               <span className="hidden lg:inline">Refresh</span>
//             </motion.button>

//             <motion.button
//               type="button"
//               whileHover={{ y: -2, scale: 1.02 }}
//               whileTap={{ scale: 0.96 }}
//               onClick={handleClearCache}
//               className={`flex ${kbBtn}`}
//             >
//               <Zap size={14} />
//               <span className="hidden lg:inline">Clear cache</span>
//             </motion.button>

//             <motion.button
//               type="button"
//               whileHover={{ y: -2, scale: 1.02 }}
//               whileTap={{ scale: 0.96 }}
//               onClick={handleExclusions}
//               className={`hidden xl:flex ${kbBtn}`}
//             >
//               <Filter size={14} />
//               <span>Exclusions</span>
//             </motion.button>

//             <motion.button
//               type="button"
//               whileHover={{ y: -2, scale: 1.02 }}
//               whileTap={{ scale: 0.96 }}
//               onClick={handleDelete}
//               className={`hidden lg:flex ${kbBtn} hover:border-red-200 hover:bg-red-50 hover:text-red-500 dark:hover:border-red-500/30 dark:hover:bg-red-500/10 dark:hover:text-red-400`}
//             >
//               <Trash2 size={14} />
//               <span>Delete</span>
//             </motion.button>

//             <motion.button
//               type="button"
//               whileHover={{ y: -2, scale: 1.03, boxShadow: "0 8px 25px rgba(34,211,238,0.22)" }}
//               whileTap={{ scale: 0.96 }}
//               onClick={handleAddSource}
//               className="flex h-9 items-center gap-1.5 rounded-lg bg-cyan-500 px-4 text-[13px] font-semibold text-white dark:bg-cyan-400 dark:text-slate-950"
//             >
//               <Plus size={15} strokeWidth={2.8} />
//               <span>Add Source</span>
//             </motion.button>
//           </motion.div>
//         )}

//         {/* KB LIST: Create Knowledge Base */}
//         {isKbList && (
//           <motion.button
//             type="button"
//             onClick={handleCreateKb}
//             whileHover={{ y: -2, scale: 1.03, boxShadow: "0 8px 25px rgba(34,211,238,0.22)" }}
//             whileTap={{ scale: 0.95 }}
//             className="flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2 text-[13px] font-bold text-slate-950"
//           >
//             <Plus size={15} strokeWidth={2.8} />
//             <span className="hidden sm:inline">Create Knowledge Base</span>
//           </motion.button>
//         )}

//         {/* ALL OTHER PAGES: New Agent */}
//         {!isKbDetail && !isKbList && (
//           <motion.button
//             type="button"
//             onClick={() => navigate("/agents/create")}
//             whileHover={{ y: -2, scale: 1.03, boxShadow: "0 8px 25px rgba(34,211,238,0.22)" }}
//             whileTap={{ scale: 0.95 }}
//             className="flex items-center gap-2 rounded-lg bg-cyan-400 px-3.5 py-2 text-[13px] font-bold text-slate-950"
//           >
//             <Plus size={15} strokeWidth={2.8} />
//             <span className="hidden sm:inline">New Agent</span>
//           </motion.button>
//         )}
//       </motion.div>
//     </motion.header>
//   );
// }

// import React, { useEffect, useRef, useState } from "react";

// import {
//   Bell,
//   Plus,
//   Search,
//   Copy,
//   Check,
//   HelpCircle,
//   RefreshCw,
//   Trash2,
//   Filter,
//   Zap,
//   Sun,
//   Moon,
//   AlertTriangle,
// } from "lucide-react";

// import { useLocation, useNavigate } from "react-router-dom";

// import { motion } from "framer-motion";

// const WORKSPACE_ID = "012854ee...681e";
// const [copied, setCopied] = useState(false);

//   const [notifications, setNotifications] = useState([
//     {
//       id: 1,
//       title: "Credits Expired",
//       message:
//         "Some of your credits have reached their expiry date. Recharge to continue using calling...",
//       time: "about 1 month ago",
//       type: "warning",
//       read: false,
//     },
//   ]);

//   const [notificationOpen, setNotificationOpen] = useState(false);
//   const notificationRef = useRef(null);

//   const unreadCount = notifications.filter((n) => !n.read).length;

//   const markAllRead = () => {
//     setNotifications((prev) =>
//       prev.map((notification) => ({ ...notification, read: true }))
//     );
//   };

//   const clearAllNotifications = () => {
//     setNotifications([]);
//   };

//   // Close notification dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         notificationRef.current &&
//         !notificationRef.current.contains(event.target)
//       ) {
//         setNotificationOpen(false);
//       }
//     };

//     const handleEscape = (event) => {
//       if (event.key === "Escape") setNotificationOpen(false);
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     document.addEventListener("keydown", handleEscape);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, []);

// // ============================================================
// // KNOWLEDGE BASE META
// // ============================================================

// function useKbMeta() {
//   const [meta, setMeta] = useState(
//     () => (typeof window !== "undefined" && window.__kbMeta) || {}
//   );

//   useEffect(() => {
//     const onMeta = (e) => setMeta({ ...(e.detail || window.__kbMeta || {}) });
//     window.addEventListener("kb-meta", onMeta);
//     return () => window.removeEventListener("kb-meta", onMeta);
//   }, []);

//   return meta;
// }

// // ============================================================
// // HEADER CONTENT
// // ============================================================

// function useHeaderContent(kbMeta) {
//   const { pathname } = useLocation();

//   const isKbDetail =
//     pathname.startsWith("/knowledge-base/") && pathname !== "/knowledge-base";

//   if (pathname === "/dashboard") {
//     return { title: "Dashboard", subtitle: "Overview of your voice AI platform" };
//   }
//   if (pathname === "/agents") {
//     return { title: "Agents", subtitle: "Overview of your voice AI platform" };
//   }
//   if (pathname === "/agents/create") {
//     return { title: "Create Agent", subtitle: "Build a new AI assistant" };
//   }
//   if (pathname === "/knowledge-base") {
//     const total = typeof kbMeta.total === "number" ? kbMeta.total : null;
//     return {
//       title: "Knowledge Base",
//       subtitle:
//         total === null
//           ? "Knowledge bases"
//           : `${total} knowledge base${total === 1 ? "" : "s"}`,
//     };
//   }
//   if (isKbDetail) {
//     const idFromUrl = pathname.split("/").filter(Boolean)[1];
//     return {
//       title: kbMeta.name || idFromUrl || "Knowledge Base",
//       subtitle: "",
//     };
//   }
//   if (pathname === "/inbound" || pathname === "/inbound-calls") {
//     return { title: "Inbound Calls", subtitle: "Manage inbound call routing and dispatch rules" };
//   }
//   if (pathname === "/outbound") {
//     return { title: "Outbound", subtitle: "Launch and manage outbound call campaigns" };
//   }
//   if (pathname === "/outbound/new") {
//     return { title: "New Campaign", subtitle: "Create a new outbound campaign" };
//   }
//   if (pathname === "/campaigns") {
//     return { title: "Campaigns", subtitle: "Manage your outbound campaigns" };
//   }
//   if (pathname === "/campaigns/new") {
//     return { title: "New Campaign", subtitle: "Create a new outbound campaign" };
//   }
//   if (pathname === "/calls" || pathname === "/call-sessions") {
//     return { title: "All Calls History", subtitle: "Review call logs and recordings" };
//   }
//   if (pathname === "/contacts") {
//     return { title: "Contacts", subtitle: "Manage your global contact list and campaign assignments" };
//   }
//   if (pathname === "/integrations") {
//     return { title: "Integrations", subtitle: "Connect and manage external tools that power your agents." };
//   }
//   if (pathname === "/phone-numbers" || pathname === "/phone-number") {
//     return { title: "Phone Numbers", subtitle: "Connect a provider, buy numbers, and route calls to AI agents" };
//   }
//   if (pathname === "/billing") {
//     return { title: "Billing", subtitle: "Manage your subscription and usage" };
//   }

//   return { title: "Dashboard", subtitle: "Overview of your voice AI platform" };
// }

// // ============================================================
// // SHARED BUTTON STYLES
// // ============================================================

// const kbBtn =
//   "h-9 items-center gap-2 rounded-lg border border-black/10 bg-white px-3 text-[13px] font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-white/10 dark:bg-[#101012] dark:text-zinc-300 dark:hover:border-white/20 dark:hover:bg-white/5";

// // ============================================================
// // HEADER
// // ============================================================

// export default function Header({ onThemeToggle, theme }) {
//   const kbMeta = useKbMeta();
//   const { title, subtitle } = useHeaderContent(kbMeta);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [copied, setCopied] = useState(false);

//   const isKbList = location.pathname === "/knowledge-base";
//   const isKbDetail =
//     location.pathname.startsWith("/knowledge-base/") && !isKbList;

//   const emit = (name) => () => window.dispatchEvent(new CustomEvent(name));

//   const handleRefresh = emit("kb-refresh");
//   const handleClearCache = emit("kb-clear-cache");
//   const handleExclusions = emit("kb-exclusions");
//   const handleDelete = emit("kb-delete");
//   const handleAddSource = emit("kb-add-source");
//   const handleCreateKb = emit("kb-create");

//   const handleCopyWorkspaceId = () => {
//     navigator.clipboard?.writeText(WORKSPACE_ID);
//     setCopied(true);
//     window.setTimeout(() => setCopied(false), 1400);
//   };

//   return (
//     <motion.header
//       initial={{ y: -18, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
//       className="sticky top-0 z-30 flex min-h-[72px] items-center justify-between gap-4 border-b border-black/10 bg-white/95 px-6 backdrop-blur-xl antialiased dark:border-white/10 dark:bg-[#080a0d]/95"
//     >
//       {/* ============ LEFT: title + subtitle ============ */}
//       <motion.div
//         initial={{ x: -15, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ delay: 0.08, duration: 0.4 }}
//         className="min-w-0 shrink-0"
//       >
//         {/* Title — darker, bolder, crisper */}
//         <motion.h2
//           key={title}
//           initial={{ opacity: 0, y: 6 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.25 }}
//           className="flex items-center gap-2 text-[16px] font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50"
//         >
//           <span className="max-w-[280px] truncate" title={title}>
//             {title}
//           </span>
//           <motion.span
//             whileHover={{ scale: 1.15, rotate: 8 }}
//             className="text-zinc-400 dark:text-zinc-500"
//           >
//             <HelpCircle size={14} strokeWidth={2.4} />
//           </motion.span>
//         </motion.h2>

//         {/* Subtitle + workspace ID — more readable */}
//         <motion.div
//           key={subtitle}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.12 }}
//           className="mt-1 flex items-center gap-2 text-[12.5px] font-medium text-zinc-600 dark:text-zinc-400"
//         >
//           {subtitle && (
//             <>
//               <span className="hidden sm:inline">{subtitle}</span>
//               <span className="hidden sm:inline text-zinc-400">•</span>
//             </>
//           )}
//           <span className="font-mono text-[11.5px] font-semibold tracking-tight text-zinc-500 dark:text-zinc-500">
//             # {WORKSPACE_ID}
//           </span>
//           <motion.button
//             type="button"
//             aria-label="Copy workspace ID"
//             whileHover={{ scale: 1.12 }}
//             whileTap={{ scale: 0.9 }}
//             className="rounded-md p-0.5 text-zinc-400 transition-colors hover:bg-black/5 hover:text-zinc-700 dark:hover:bg-white/10 dark:hover:text-zinc-200"
//             onClick={handleCopyWorkspaceId}
//           >
//             {copied ? (
//               <Check size={11} className="text-emerald-500" strokeWidth={3} />
//             ) : (
//               <Copy size={11} />
//             )}
//           </motion.button>
//         </motion.div>
//       </motion.div>

//       {/* ============ RIGHT: search, credits, theme, bell, actions ============ */}
//       <motion.div
//         initial={{ x: 15, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ delay: 0.1, duration: 0.4 }}
//         className="flex min-w-0 flex-1 items-center justify-end gap-3"
//       >
//         {/* SEARCH */}
//         <motion.div
//           whileHover={{ borderColor: "rgba(34,211,238,0.35)", scale: 1.01 }}
//           transition={{ duration: 0.2 }}
//           className="hidden h-9 w-64 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm text-zinc-500 focus-within:border-cyan-500/50 focus-within:ring-2 focus-within:ring-cyan-500/20 md:flex dark:border-white/10 dark:bg-white/[0.02]"
//         >
//           <Search size={15} className="text-zinc-400" />
//           <input
//             type="text"
//             placeholder="Search..."
//             aria-label="Search"
//             className="min-w-0 flex-1 bg-transparent text-[13px] font-medium text-zinc-800 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
//           />
//           <kbd className="rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-500 dark:border-white/10 dark:bg-white/5">
//             ⌘K
//           </kbd>
//         </motion.div>

//         {/* CREDITS */}
//               {/* CREDITS */}
//         <motion.button
//           type="button"
//           onClick={() => navigate("/billing")}
//           whileHover={{ y: -2, scale: 1.02 }}
//           whileTap={{ scale: 0.96 }}
//           className="hidden items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[13px] transition hover:border-blue-300 hover:bg-blue-50 sm:flex dark:border-white/10 dark:bg-white/[0.02] dark:hover:bg-white/[0.06]"
//           title="View billing and credits"
//         >
//           <span className="text-[10px] text-blue-500">●</span>
//           <span className="whitespace-nowrap font-semibold text-zinc-800 dark:text-zinc-200">
//             10 credits
//           </span>
//         </motion.button>

//         {/* THEME */}
//         <motion.button
//           type="button"
//           onClick={onThemeToggle}
//           whileHover={{ scale: 1.08, y: -1 }}
//           whileTap={{ scale: 0.9 }}
//           className="hidden rounded-lg p-2 text-zinc-500 transition-colors hover:bg-black/5 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-200 sm:block"
//           aria-label="Toggle Theme"
//         >
//           {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
//         </motion.button>

//               {/* NOTIFICATIONS */}
//         <div className="relative" ref={notificationRef}>
//           <motion.button
//             type="button"
//             aria-label="Notifications"
//             onClick={() => setNotificationOpen((prev) => !prev)}
//             whileHover={{ scale: 1.08, y: -1 }}
//             whileTap={{ scale: 0.9 }}
//             className="relative rounded-lg p-2 text-zinc-500 transition-colors hover:bg-black/5 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-200"
//           >
//             <Bell size={18} />

//             {/* Unread badge */}
//             {unreadCount > 0 && (
//               <span className="absolute -right-0.5 -top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-cyan-500 px-1 text-[10px] font-bold text-white ring-2 ring-white dark:ring-[#080a0d]">
//                 {unreadCount > 9 ? "9+" : unreadCount}
//               </span>
//             )}
//           </motion.button>

//           {/* DROPDOWN */}
//           {notificationOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: -8, scale: 0.97 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: -8, scale: 0.97 }}
//               transition={{ duration: 0.18 }}
//               className="absolute right-0 top-12 z-[100] w-[340px] max-w-[calc(100vw-24px)] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl dark:border-white/10 dark:bg-[#141519]"
//             >
//               {/* HEADER */}
//               <div className="flex items-center justify-between border-b border-black/5 px-4 py-3 dark:border-white/[0.06]">
//                 <div className="flex items-center gap-2">
//                   <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/10">
//                     <Bell size={15} className="text-cyan-500" />
//                   </div>

//                   <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
//                     Notifications
//                   </span>

//                   {unreadCount > 0 && (
//                     <span className="flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-cyan-500 px-1 text-[10px] font-bold text-white">
//                       {unreadCount}
//                     </span>
//                   )}
//                 </div>
//               </div>

//               {/* ACTIONS */}
//               <div className="flex items-center gap-2 px-4 py-2.5">
//                 <button
//                   type="button"
//                   onClick={markAllRead}
//                   disabled={unreadCount === 0}
//                   className="flex items-center gap-1.5 rounded-lg border border-black/10 px-2.5 py-1.5 text-[11px] font-semibold text-zinc-600 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/5"
//                 >
//                   <Check size={12} />
//                   Mark all read
//                 </button>

//                 <button
//                   type="button"
//                   onClick={clearAllNotifications}
//                   disabled={notifications.length === 0}
//                   className="flex items-center gap-1.5 rounded-lg border border-black/10 px-2.5 py-1.5 text-[11px] font-semibold text-zinc-600 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/5"
//                 >
//                   <Trash2 size={12} />
//                   Clear all
//                 </button>
//               </div>

//               {/* NOTIFICATION LIST */}
//               <div className="max-h-[320px] overflow-y-auto">
//                 {notifications.length === 0 ? (
//                   <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
//                     <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-white/5">
//                       <Bell size={20} className="text-zinc-400" />
//                     </div>

//                     <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
//                       All caught up!
//                     </p>

//                     <p className="mt-1 text-xs text-zinc-500">
//                       You have no notifications right now.
//                     </p>
//                   </div>
//                 ) : (
//                   notifications.map((notification) => (
//                     <button
//                       key={notification.id}
//                       type="button"
//                       onClick={() =>
//                         setNotifications((prev) =>
//                           prev.map((n) =>
//                             n.id === notification.id ? { ...n, read: true } : n
//                           )
//                         )
//                       }
//                       className={`relative flex w-full gap-3 border-b border-black/[0.04] px-4 py-3 text-left transition hover:bg-zinc-50 dark:border-white/[0.04] dark:hover:bg-white/[0.03] ${
//                         !notification.read
//                           ? "bg-zinc-50 dark:bg-white/[0.025]"
//                           : "bg-white dark:bg-[#141519]"
//                       }`}
//                     >
//                       {/* ICON */}
//                       <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10">
//                         <span className="text-amber-500">
//                           <AlertTriangle size={16} />
//                         </span>
//                       </div>

//                       {/* CONTENT */}
//                       <div className="min-w-0 flex-1">
//                         <div className="flex items-center justify-between gap-2">
//                           <p className="truncate text-[12px] font-bold text-zinc-800 dark:text-zinc-100">
//                             {notification.title}
//                           </p>

//                           {!notification.read && (
//                             <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
//                           )}
//                         </div>

//                         <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
//                           {notification.message}
//                         </p>

//                         <p className="mt-1.5 text-[10px] text-zinc-400 dark:text-zinc-500">
//                           {notification.time}
//                         </p>
//                       </div>
//                     </button>
//                   ))
//                 )}
//               </div>

//               {/* FOOTER */}
//               <div className="border-t border-black/[0.06] px-4 py-3 text-center dark:border-white/[0.06]">
//                 <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
//                   {notifications.length === 0
//                     ? "No notifications"
//                     : `All ${notifications.length} notification${
//                         notifications.length !== 1 ? "s" : ""
//                       } shown`}
//                 </p>
//               </div>
//             </motion.div>
//           )}
//         </div>

//         {/* KB DETAIL ACTIONS */}
//         {isKbDetail && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="flex items-center gap-2"
//           >
//             <motion.button
//               type="button"
//               whileHover={{ y: -2, scale: 1.02 }}
//               whileTap={{ scale: 0.96 }}
//               onClick={handleRefresh}
//               className={`flex ${kbBtn}`}
//             >
//               <RefreshCw size={14} />
//               <span className="hidden lg:inline">Refresh</span>
//             </motion.button>

//             <motion.button
//               type="button"
//               whileHover={{ y: -2, scale: 1.02 }}
//               whileTap={{ scale: 0.96 }}
//               onClick={handleClearCache}
//               className={`flex ${kbBtn}`}
//             >
//               <Zap size={14} />
//               <span className="hidden lg:inline">Clear cache</span>
//             </motion.button>

//             <motion.button
//               type="button"
//               whileHover={{ y: -2, scale: 1.02 }}
//               whileTap={{ scale: 0.96 }}
//               onClick={handleExclusions}
//               className={`hidden xl:flex ${kbBtn}`}
//             >
//               <Filter size={14} />
//               <span>Exclusions</span>
//             </motion.button>

//             <motion.button
//               type="button"
//               whileHover={{ y: -2, scale: 1.02 }}
//               whileTap={{ scale: 0.96 }}
//               onClick={handleDelete}
//               className={`hidden lg:flex ${kbBtn} hover:border-red-200 hover:bg-red-50 hover:text-red-500 dark:hover:border-red-500/30 dark:hover:bg-red-500/10 dark:hover:text-red-400`}
//             >
//               <Trash2 size={14} />
//               <span>Delete</span>
//             </motion.button>

//             <motion.button
//               type="button"
//               whileHover={{ y: -2, scale: 1.03, boxShadow: "0 8px 25px rgba(34,211,238,0.22)" }}
//               whileTap={{ scale: 0.96 }}
//               onClick={handleAddSource}
//               className="flex h-9 items-center gap-1.5 rounded-lg bg-cyan-500 px-4 text-[13px] font-bold text-white dark:bg-cyan-400 dark:text-slate-950"
//             >
//               <Plus size={15} strokeWidth={2.8} />
//               <span>Add Source</span>
//             </motion.button>
//           </motion.div>
//         )}

//         {/* KB LIST: Create Knowledge Base */}
//         {isKbList && (
//           <motion.button
//             type="button"
//             onClick={handleCreateKb}
//             whileHover={{ y: -2, scale: 1.03, boxShadow: "0 8px 25px rgba(34,211,238,0.22)" }}
//             whileTap={{ scale: 0.95 }}
//             className="flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2 text-[13px] font-bold text-slate-950"
//           >
//             <Plus size={15} strokeWidth={2.8} />
//             <span className="hidden sm:inline">Create Knowledge Base</span>
//           </motion.button>
//         )}

//         {/* DEFAULT: New Agent */}
//         {!isKbDetail && !isKbList && (
//           <motion.button
//             type="button"
//             onClick={() => navigate("/agents/create")}
//             whileHover={{ y: -2, scale: 1.03, boxShadow: "0 8px 25px rgba(34,211,238,0.22)" }}
//             whileTap={{ scale: 0.95 }}
//             className="flex items-center gap-2 rounded-lg bg-cyan-400 px-3.5 py-2 text-[13px] font-bold text-slate-950"
//           >
//             <Plus size={15} strokeWidth={2.8} />
//             <span className="hidden sm:inline">New Agent</span>
//           </motion.button>
//         )}
//       </motion.div>
//     </motion.header>
//   );
// }



// import React, { useEffect, useRef, useState } from "react";

// import {
//   Bell,
//   Plus,
//   Search,
//   Copy,
//   Check,
//   HelpCircle,
//   RefreshCw,
//   Trash2,
//   Filter,
//   Zap,
//   Sun,
//   Moon,
//   AlertTriangle,
// } from "lucide-react";

// import { useLocation, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// const WORKSPACE_ID = "012854ee...681e";

// // ============================================================
// // KNOWLEDGE BASE META
// // ============================================================

// function useKbMeta() {
//   const [meta, setMeta] = useState(
//     () => (typeof window !== "undefined" && window.__kbMeta) || {}
//   );

//   useEffect(() => {
//     const onMeta = (e) =>
//       setMeta({ ...(e.detail || window.__kbMeta || {}) });

//     window.addEventListener("kb-meta", onMeta);

//     return () => window.removeEventListener("kb-meta", onMeta);
//   }, []);

//   return meta;
// }

// // ============================================================
// // HEADER CONTENT
// // ============================================================

// function useHeaderContent(kbMeta) {
//   const { pathname } = useLocation();

//   const isKbDetail =
//     pathname.startsWith("/knowledge-base/") &&
//     pathname !== "/knowledge-base";

//   if (pathname === "/dashboard") {
//     return {
//       title: "Dashboard",
//       subtitle: "Overview of your voice AI platform",
//     };
//   }

//   if (pathname === "/agents") {
//     return {
//       title: "Agents",
//       subtitle: "Overview of your voice AI platform",
//     };
//   }

//   if (pathname === "/agents/create") {
//     return {
//       title: "Create Agent",
//       subtitle: "Build a new AI assistant",
//     };
//   }

//   if (pathname === "/knowledge-base") {
//     const total = typeof kbMeta.total === "number" ? kbMeta.total : null;

//     return {
//       title: "Knowledge Base",
//       subtitle:
//         total === null
//           ? "Knowledge bases"
//           : `${total} knowledge base${total === 1 ? "" : "s"}`,
//     };
//   }

//   if (isKbDetail) {
//     const idFromUrl = pathname.split("/").filter(Boolean)[1];

//     return {
//       title: kbMeta.name || idFromUrl || "Knowledge Base",
//       subtitle: "",
//     };
//   }

//   if (pathname === "/inbound" || pathname === "/inbound-calls") {
//     return {
//       title: "Inbound Calls",
//       subtitle: "Manage inbound call routing and dispatch rules",
//     };
//   }

//   if (pathname === "/outbound") {
//     return {
//       title: "Outbound",
//       subtitle: "Launch and manage outbound call campaigns",
//     };
//   }

//   if (pathname === "/outbound/new") {
//     return {
//       title: "New Campaign",
//       subtitle: "Create a new outbound campaign",
//     };
//   }

//   if (pathname === "/campaigns") {
//     return {
//       title: "Campaigns",
//       subtitle: "Manage your outbound campaigns",
//     };
//   }

//   if (pathname === "/campaigns/new") {
//     return {
//       title: "New Campaign",
//       subtitle: "Create a new outbound campaign",
//     };
//   }

//   if (pathname === "/calls" || pathname === "/call-sessions") {
//     return {
//       title: "All Calls History",
//       subtitle: "Review call logs and recordings",
//     };
//   }

//   if (pathname === "/contacts") {
//     return {
//       title: "Contacts",
//       subtitle: "Manage your global contact list and campaign assignments",
//     };
//   }

//   if (pathname === "/integrations") {
//     return {
//       title: "Integrations",
//       subtitle: "Connect and manage external tools that power your agents.",
//     };
//   }

//   if (pathname === "/phone-numbers" || pathname === "/phone-number") {
//     return {
//       title: "Phone Numbers",
//       subtitle: "Connect a provider, buy numbers, and route calls to AI agents",
//     };
//   }

//   if (pathname === "/billing") {
//     return {
//       title: "Billing",
//       subtitle: "Manage your subscription and usage",
//     };
//   }

//   return {
//     title: "Dashboard",
//     subtitle: "Overview of your voice AI platform",
//   };
// }

// // ============================================================
// // SHARED BUTTON STYLES
// // ============================================================

// const kbBtn =
//   "h-9 items-center gap-2 rounded-lg border border-black/10 bg-white px-3 text-[13px] font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-white/10 dark:bg-[#101012] dark:text-zinc-300 dark:hover:border-white/20 dark:hover:bg-white/5";

// // ============================================================
// // HEADER
// // ============================================================

// export default function Header({ onThemeToggle, theme }) {
//   const kbMeta = useKbMeta();
//   const { title, subtitle } = useHeaderContent(kbMeta);

//   const location = useLocation();
//   const navigate = useNavigate();

//   const [copied, setCopied] = useState(false);

//   // ==========================================================
//   // NOTIFICATION STATE
//   // ==========================================================

//   const [notifications, setNotifications] = useState([
//     {
//       id: 1,
//       title: "Credits Expired",
//       message:
//         "Some of your credits have reached their expiry date. Recharge to continue using calling...",
//       time: "about 1 month ago",
//       type: "warning",
//       read: false,
//     },
//   ]);

//   const [notificationOpen, setNotificationOpen] = useState(false);

//   const notificationRef = useRef(null);

//   const unreadCount = notifications.filter(
//     (notification) => !notification.read
//   ).length;

//   // Mark all notifications as read
//   const markAllRead = () => {
//     setNotifications((prev) =>
//       prev.map((notification) => ({
//         ...notification,
//         read: true,
//       }))
//     );
//   };

//   // Clear all notifications
//   const clearAllNotifications = () => {
//     setNotifications([]);
//   };

//   // Mark individual notification as read
//   const markNotificationRead = (id) => {
//     setNotifications((prev) =>
//       prev.map((notification) =>
//         notification.id === id
//           ? { ...notification, read: true }
//           : notification
//       )
//     );
//   };

//   // Close dropdown when clicking outside or pressing Escape
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         notificationRef.current &&
//         !notificationRef.current.contains(event.target)
//       ) {
//         setNotificationOpen(false);
//       }
//     };

//     const handleEscape = (event) => {
//       if (event.key === "Escape") {
//         setNotificationOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     document.addEventListener("keydown", handleEscape);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, []);

//   // ==========================================================
//   // KNOWLEDGE BASE ROUTE CHECKS
//   // ==========================================================

//   const isKbList = location.pathname === "/knowledge-base";

//   const isKbDetail =
//     location.pathname.startsWith("/knowledge-base/") && !isKbList;

//   // ==========================================================
//   // KNOWLEDGE BASE ACTIONS
//   // ==========================================================

//   const emit = (name) => () =>
//     window.dispatchEvent(new CustomEvent(name));

//   const handleRefresh = emit("kb-refresh");
//   const handleClearCache = emit("kb-clear-cache");
//   const handleExclusions = emit("kb-exclusions");
//   const handleDelete = emit("kb-delete");
//   const handleAddSource = emit("kb-add-source");
//   const handleCreateKb = emit("kb-create");

//   // ==========================================================
//   // COPY WORKSPACE ID
//   // ==========================================================

//   const handleCopyWorkspaceId = () => {
//     navigator.clipboard?.writeText(WORKSPACE_ID);

//     setCopied(true);

//     window.setTimeout(() => setCopied(false), 1400);
//   };

//   // ==========================================================
//   // JSX
//   // ==========================================================

//   return (
//     <motion.header
//       initial={{ y: -18, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{
//         duration: 0.45,
//         ease: [0.22, 1, 0.36, 1],
//       }}
//       className="sticky top-0 z-30 flex min-h-[72px] items-center justify-between gap-4 border-b border-black/10 bg-white/95 px-6 backdrop-blur-xl antialiased dark:border-white/10 dark:bg-[#080a0d]/95"
//     >
//       {/* ================================================== */}
//       {/* LEFT: TITLE + SUBTITLE */}
//       {/* ================================================== */}

//       <motion.div
//         initial={{ x: -15, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ delay: 0.08, duration: 0.4 }}
//         className="min-w-0 shrink-0"
//       >
//         <motion.h2
//           key={title}
//           initial={{ opacity: 0, y: 6 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.25 }}
//           className="flex items-center gap-2 text-[16px] font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50"
//         >
//           <span className="max-w-[280px] truncate" title={title}>
//             {title}
//           </span>

//           <motion.span
//             whileHover={{ scale: 1.15, rotate: 8 }}
//             className="text-zinc-400 dark:text-zinc-500"
//           >
//             <HelpCircle size={14} strokeWidth={2.4} />
//           </motion.span>
//         </motion.h2>

//         <motion.div
//           key={subtitle}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.12 }}
//           className="mt-1 flex items-center gap-2 text-[12.5px] font-medium text-zinc-600 dark:text-zinc-400"
//         >
//           {subtitle && (
//             <>
//               <span className="hidden sm:inline">{subtitle}</span>
//               <span className="hidden text-zinc-400 sm:inline">•</span>
//             </>
//           )}

//           <span className="font-mono text-[11.5px] font-semibold tracking-tight text-zinc-500 dark:text-zinc-500">
//             # {WORKSPACE_ID}
//           </span>

//           <motion.button
//             type="button"
//             aria-label="Copy workspace ID"
//             whileHover={{ scale: 1.12 }}
//             whileTap={{ scale: 0.9 }}
//             className="rounded-md p-0.5 text-zinc-400 transition-colors hover:bg-black/5 hover:text-zinc-700 dark:hover:bg-white/10 dark:hover:text-zinc-200"
//             onClick={handleCopyWorkspaceId}
//           >
//             {copied ? (
//               <Check
//                 size={11}
//                 className="text-emerald-500"
//                 strokeWidth={3}
//               />
//             ) : (
//               <Copy size={11} />
//             )}
//           </motion.button>
//         </motion.div>
//       </motion.div>

//       {/* ================================================== */}
//       {/* RIGHT: SEARCH, CREDITS, THEME, NOTIFICATIONS, ACTIONS */}
//       {/* ================================================== */}

//       <motion.div
//         initial={{ x: 15, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ delay: 0.1, duration: 0.4 }}
//         className="flex min-w-0 flex-1 items-center justify-end gap-3"
//       >
//         {/* SEARCH */}

//         <motion.div
//           whileHover={{
//             borderColor: "rgba(34,211,238,0.35)",
//             scale: 1.01,
//           }}
//           transition={{ duration: 0.2 }}
//           className="hidden h-9 w-64 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm text-zinc-500 focus-within:border-cyan-500/50 focus-within:ring-2 focus-within:ring-cyan-500/20 md:flex dark:border-white/10 dark:bg-white/[0.02]"
//         >
//           <Search size={15} className="text-zinc-400" />

//           <input
//             type="text"
//             placeholder="Search..."
//             aria-label="Search"
//             className="min-w-0 flex-1 bg-transparent text-[13px] font-medium text-zinc-800 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
//           />

//           <kbd className="rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-500 dark:border-white/10 dark:bg-white/5">
//             ⌘K
//           </kbd>
//         </motion.div>

//         {/* ================================================== */}
//         {/* CREDITS - REDIRECT TO BILLING */}
//         {/* ================================================== */}

//         <motion.button
//           type="button"
//           onClick={() => navigate("/billing")}
//           whileHover={{ y: -2, scale: 1.02 }}
//           whileTap={{ scale: 0.96 }}
//           className="hidden items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[13px] transition hover:border-blue-300 hover:bg-blue-50 sm:flex dark:border-white/10 dark:bg-white/[0.02] dark:hover:bg-white/[0.06]"
//           title="View billing and credits"
//         >
//           <span className="text-[10px] text-blue-500">●</span>

//           <span className="whitespace-nowrap font-semibold text-zinc-800 dark:text-zinc-200">
//             10 credits
//           </span>
//         </motion.button>

//         {/* ================================================== */}
//         {/* THEME */}
//         {/* ================================================== */}

//         <motion.button
//           type="button"
//           onClick={onThemeToggle}
//           whileHover={{ scale: 1.08, y: -1 }}
//           whileTap={{ scale: 0.9 }}
//           className="hidden rounded-lg p-2 text-zinc-500 transition-colors hover:bg-black/5 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-200 sm:block"
//           aria-label="Toggle Theme"
//         >
//           {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
//         </motion.button>

//         {/* ================================================== */}
//         {/* NOTIFICATIONS */}
//         {/* ================================================== */}

//         <div className="relative" ref={notificationRef}>
//           {/* NOTIFICATION BELL */}

//           <motion.button
//             type="button"
//             aria-label="Notifications"
//             aria-expanded={notificationOpen}
//             onClick={() =>
//               setNotificationOpen((prev) => !prev)
//             }
//             whileHover={{ scale: 1.08, y: -1 }}
//             whileTap={{ scale: 0.9 }}
//             className="relative rounded-lg p-2 text-zinc-500 transition-colors hover:bg-black/5 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-200"
//           >
//             <Bell size={18} />

//             {/* UNREAD BADGE */}

//             {unreadCount > 0 && (
//               <span className="absolute -right-0.5 -top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-cyan-500 px-1 text-[10px] font-bold text-white ring-2 ring-white dark:ring-[#080a0d]">
//                 {unreadCount > 9 ? "9+" : unreadCount}
//               </span>
//             )}
//           </motion.button>

//           {/* NOTIFICATION DROPDOWN */}

//           {notificationOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: -8, scale: 0.97 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               transition={{ duration: 0.18 }}
//               className="absolute right-0 top-12 z-[100] w-[340px] max-w-[calc(100vw-24px)] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl dark:border-white/10 dark:bg-[#141519]"
//             >
//               {/* DROPDOWN HEADER */}

//               <div className="flex items-center justify-between border-b border-black/5 px-4 py-3 dark:border-white/[0.06]">
//                 <div className="flex items-center gap-2">
//                   <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/10">
//                     <Bell size={15} className="text-cyan-500" />
//                   </div>

//                   <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
//                     Notifications
//                   </span>

//                   {unreadCount > 0 && (
//                     <span className="flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-cyan-500 px-1 text-[10px] font-bold text-white">
//                       {unreadCount}
//                     </span>
//                   )}
//                 </div>
//               </div>

//               {/* NOTIFICATION ACTIONS */}

//               <div className="flex items-center gap-2 px-4 py-2.5">
//                 <button
//                   type="button"
//                   onClick={markAllRead}
//                   disabled={unreadCount === 0}
//                   className="flex items-center gap-1.5 rounded-lg border border-black/10 px-2.5 py-1.5 text-[11px] font-semibold text-zinc-600 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/5"
//                 >
//                   <Check size={12} />
//                   Mark all read
//                 </button>

//                 <button
//                   type="button"
//                   onClick={clearAllNotifications}
//                   disabled={notifications.length === 0}
//                   className="flex items-center gap-1.5 rounded-lg border border-black/10 px-2.5 py-1.5 text-[11px] font-semibold text-zinc-600 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/5"
//                 >
//                   <Trash2 size={12} />
//                   Clear all
//                 </button>
//               </div>

//               {/* NOTIFICATION LIST */}

//               <div className="max-h-[320px] overflow-y-auto">
//                 {notifications.length === 0 ? (
//                   <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
//                     <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-white/5">
//                       <Bell size={20} className="text-zinc-400" />
//                     </div>

//                     <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
//                       All caught up!
//                     </p>

//                     <p className="mt-1 text-xs text-zinc-500">
//                       You have no notifications right now.
//                     </p>
//                   </div>
//                 ) : (
//                   notifications.map((notification) => (
//                     <button
//                       key={notification.id}
//                       type="button"
//                       onClick={() =>
//                         markNotificationRead(notification.id)
//                       }
//                       className={`relative flex w-full gap-3 border-b border-black/[0.04] px-4 py-3 text-left transition hover:bg-zinc-50 dark:border-white/[0.04] dark:hover:bg-white/[0.03] ${
//                         !notification.read
//                           ? "bg-zinc-50 dark:bg-white/[0.025]"
//                           : "bg-white dark:bg-[#141519]"
//                       }`}
//                     >
//                       {/* NOTIFICATION ICON */}

//                       <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10">
//                         <span className="text-amber-500">
//                           <AlertTriangle size={16} />
//                         </span>
//                       </div>

//                       {/* NOTIFICATION CONTENT */}

//                       <div className="min-w-0 flex-1">
//                         <div className="flex items-center justify-between gap-2">
//                           <p className="truncate text-[12px] font-bold text-zinc-800 dark:text-zinc-100">
//                             {notification.title}
//                           </p>

//                           {!notification.read && (
//                             <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
//                           )}
//                         </div>

//                         <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
//                           {notification.message}
//                         </p>

//                         <p className="mt-1.5 text-[10px] text-zinc-400 dark:text-zinc-500">
//                           {notification.time}
//                         </p>
//                       </div>
//                     </button>
//                   ))
//                 )}
//               </div>

//               {/* DROPDOWN FOOTER */}

//               <div className="border-t border-black/[0.06] px-4 py-3 text-center dark:border-white/[0.06]">
//                 <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
//                   {notifications.length === 0
//                     ? "No notifications"
//                     : `All ${notifications.length} notification${
//                         notifications.length !== 1 ? "s" : ""
//                       } shown`}
//                 </p>
//               </div>
//             </motion.div>
//           )}
//         </div>

//         {/* ================================================== */}
//         {/* KNOWLEDGE BASE DETAIL ACTIONS */}
//         {/* ================================================== */}

//         {isKbDetail && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="flex items-center gap-2"
//           >
//             <motion.button
//               type="button"
//               whileHover={{ y: -2, scale: 1.02 }}
//               whileTap={{ scale: 0.96 }}
//               onClick={handleRefresh}
//               className={`flex ${kbBtn}`}
//             >
//               <RefreshCw size={14} />
//               <span className="hidden lg:inline">Refresh</span>
//             </motion.button>

//             <motion.button
//               type="button"
//               whileHover={{ y: -2, scale: 1.02 }}
//               whileTap={{ scale: 0.96 }}
//               onClick={handleClearCache}
//               className={`flex ${kbBtn}`}
//             >
//               <Zap size={14} />
//               <span className="hidden lg:inline">Clear cache</span>
//             </motion.button>

//             <motion.button
//               type="button"
//               whileHover={{ y: -2, scale: 1.02 }}
//               whileTap={{ scale: 0.96 }}
//               onClick={handleExclusions}
//               className={`hidden xl:flex ${kbBtn}`}
//             >
//               <Filter size={14} />
//               <span>Exclusions</span>
//             </motion.button>

//             <motion.button
//               type="button"
//               whileHover={{ y: -2, scale: 1.02 }}
//               whileTap={{ scale: 0.96 }}
//               onClick={handleDelete}
//               className={`hidden lg:flex ${kbBtn} hover:border-red-200 hover:bg-red-50 hover:text-red-500 dark:hover:border-red-500/30 dark:hover:bg-red-500/10 dark:hover:text-red-400`}
//             >
//               <Trash2 size={14} />
//               <span>Delete</span>
//             </motion.button>

//             <motion.button
//               type="button"
//               whileHover={{
//                 y: -2,
//                 scale: 1.03,
//                 boxShadow: "0 8px 25px rgba(34,211,238,0.22)",
//               }}
//               whileTap={{ scale: 0.96 }}
//               onClick={handleAddSource}
//               className="flex h-9 items-center gap-1.5 rounded-lg bg-cyan-500 px-4 text-[13px] font-bold text-white dark:bg-cyan-400 dark:text-slate-950"
//             >
//               <Plus size={15} strokeWidth={2.8} />
//               <span>Add Source</span>
//             </motion.button>
//           </motion.div>
//         )}

//         {/* ================================================== */}
//         {/* KNOWLEDGE BASE LIST: CREATE */}
//         {/* ================================================== */}

//         {isKbList && (
//           <motion.button
//             type="button"
//             onClick={handleCreateKb}
//             whileHover={{
//               y: -2,
//               scale: 1.03,
//               boxShadow: "0 8px 25px rgba(34,211,238,0.22)",
//             }}
//             whileTap={{ scale: 0.95 }}
//             className="flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2 text-[13px] font-bold text-slate-950"
//           >
//             <Plus size={15} strokeWidth={2.8} />
//             <span className="hidden sm:inline">
//               Create Knowledge Base
//             </span>
//           </motion.button>
//         )}

//         {/* ================================================== */}
//         {/* DEFAULT: NEW AGENT */}
//         {/* ================================================== */}

//         {!isKbDetail && !isKbList && (
//           <motion.button
//             type="button"
//             onClick={() => navigate("/agents/create")}
//             whileHover={{
//               y: -2,
//               scale: 1.03,
//               boxShadow: "0 8px 25px rgba(34,211,238,0.22)",
//             }}
//             whileTap={{ scale: 0.95 }}
//             className="flex items-center gap-2 rounded-lg bg-cyan-400 px-3.5 py-2 text-[13px] font-bold text-slate-950"
//           >
//             <Plus size={15} strokeWidth={2.8} />
//             <span className="hidden sm:inline">New Agent</span>
//           </motion.button>
//         )}
//       </motion.div>
//     </motion.header>
//   );
// }


import React, { useCallback, useEffect, useRef, useState } from "react";

import {
  Bell,
  Plus,
  Search,
  Copy,
  Check,
  Info,
  HelpCircle,
  RefreshCw,
  Trash2,
  Filter,
  Zap,
  Sun,
  Moon,
  AlertTriangle,
  Sparkles,
  Compass,
  X,
  Coins,
  History,
  Download,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const WORKSPACE_ID = "012854ee…681e";

// ============================================================
// SMALL HELPERS
// ============================================================

const emit = (name, detail) => () =>
  window.dispatchEvent(new CustomEvent(name, { detail }));

const lsGet = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const lsSet = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
};

/**
 * Pages publish their counts like:
 *   window.__agentsMeta = { total: 1 };
 *   window.dispatchEvent(new CustomEvent("agents-meta", { detail: { total: 1 } }));
 * Same pattern for "kb", "campaigns", "calls".
 */
function useMeta(key) {
  const globalKey = `__${key}Meta`;

  const [meta, setMeta] = useState(
    () => (typeof window !== "undefined" && window[globalKey]) || {}
  );

  useEffect(() => {
    const onMeta = (e) => setMeta({ ...(e.detail || window[globalKey] || {}) });
    window.addEventListener(`${key}-meta`, onMeta);
    return () => window.removeEventListener(`${key}-meta`, onMeta);
  }, [key, globalKey]);

  return meta;
}

const countText = (total, singular, plural, fallback) => {
  if (typeof total !== "number") return fallback;
  return `${total} ${total === 1 ? singular : plural}`;
};

// ============================================================
// ROUTE CONFIG  (title / subtitle / what shows on the right)
// ============================================================

function useRouteConfig(meta) {
  const { pathname: raw } = useLocation();
  const pathname = raw.length > 1 ? raw.replace(/\/+$/, "") : raw;

  const isKbDetail =
    pathname.startsWith("/knowledge-base/") && pathname !== "/knowledge-base";

  const base = {
    title: "Dashboard",
    subtitle: "Overview of your voice AI platform",
    search: true, // search icon
    action: "new-agent", // right-most action
    tour: null, // auto "New to X?" popover
    nudge: false, // Ask Agni nudge popover
    askDot: false, // cyan dot on Ask Agni
    kind: "default",
  };

  if (pathname === "/dashboard") return base;

  if (pathname === "/agents")
    return {
      ...base,
      title: "Agents",
      subtitle: countText(
        meta.agents.total,
        "total agent",
        "total agents",
        "Manage your voice AI agents"
      ),
    };

  if (pathname === "/agents/create")
    return {
      ...base,
      title: "Create Agent",
      subtitle: "Build a new AI assistant",
      action: null,
    };

  if (pathname === "/knowledge-base")
    return {
      ...base,
      title: "Knowledge Base",
      subtitle: countText(
        meta.kb.total,
        "knowledge base",
        "knowledge bases",
        "Knowledge bases"
      ),
      action: "kb-create",
      kind: "kb-list",
    };

  if (isKbDetail)
    return {
      ...base,
      title: meta.kb.name || pathname.split("/").filter(Boolean)[1] || "Knowledge Base",
      subtitle: "",
      action: "kb-detail",
      kind: "kb-detail",
    };

  if (pathname === "/inbound" || pathname === "/inbound-calls")
    return {
      ...base,
      title: "Inbound Calls",
      subtitle: "Manage inbound call routing and dispatch rules",
      search: false,
      action: null,
    };

  if (pathname === "/outbound" || pathname === "/campaigns")
    return {
      ...base,
      title: pathname === "/outbound" ? "Outbound" : "Campaigns",
      subtitle: countText(
        meta.campaigns.total,
        "total campaign",
        "total campaigns",
        "Manage your outbound campaigns"
      ),
      action: "new-campaign",
    };

  if (pathname === "/outbound/new" || pathname === "/campaigns/new")
    return {
      ...base,
      title: "New Campaign",
      subtitle: "Create a new outbound campaign",
      action: null,
    };

  if (pathname === "/calls" || pathname === "/call-sessions")
    return {
      ...base,
      title: "All Calls History",
      subtitle: countText(meta.calls.total, "call total", "calls total", "Review call logs and recordings"),
      action: "calls",
      tour: "Call history",
    };

  if (pathname === "/contacts")
    return {
      ...base,
      title: "Contacts",
      subtitle: "Manage your global contact list and campaign assignments",
      search: false,
      action: null,
      nudge: true,
      askDot: true,
    };

  if (pathname === "/integrations")
    return {
      ...base,
      title: "Integrations",
      subtitle: "Connect and manage external tools that power your agents.",
      search: false,
      action: null,
      tour: "Integrations",
      askDot: true,
    };

  if (pathname === "/phone-numbers" || pathname === "/phone-number")
    return {
      ...base,
      title: "Phone Numbers",
      subtitle: "Connect a provider, buy numbers, and route calls to AI agents",
      search: false,
      action: null,
      tour: "Phone numbers",
      askDot: true,
    };

  if (pathname === "/billing")
    return {
      ...base,
      title: "Billing",
      subtitle: "Manage your subscription and usage",
      action: null,
      askDot: true,
    };

  return base;
}

// ============================================================
// SHARED STYLES
// ============================================================

const outlineBtn =
  "inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-lg border border-black/10 bg-white px-3 text-[13px] font-semibold text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-white/10 dark:bg-[#0D0F12] dark:text-zinc-200 dark:hover:border-white/20 dark:hover:bg-white/5";

const primaryBtn =
  "inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-lg bg-cyan-400 px-5 text-[14px] font-semibold text-slate-950 shadow-[0_0_0_1px_rgba(34,211,238,0.25)] transition hover:bg-cyan-300";

const iconBtn =
  "relative flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-black/5 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-100";

const Dot = () => (
  <span className="absolute right-1 top-1 h-[7px] w-[7px] rounded-full bg-cyan-400 ring-2 ring-white dark:ring-[#080a0d]" />
);

// ============================================================
// TOUR / NUDGE POPOVERS (anchored under the header, right side)
// ============================================================

function TourPopover({ name, onLater, onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18 }}
      className="absolute right-6 top-[calc(100%+10px)] z-50 w-[320px] max-w-[calc(100vw-24px)] rounded-xl border border-cyan-400/20 bg-white p-4 shadow-2xl dark:bg-[#15161A]"
    >
      <span className="absolute -top-1.5 right-[150px] h-3 w-3 rotate-45 border-l border-t border-cyan-400/20 bg-white dark:bg-[#15161A]" />

      <button
        type="button"
        aria-label="Close"
        onClick={onLater}
        className="absolute right-3 top-3 text-zinc-400 transition hover:text-zinc-700 dark:hover:text-zinc-200"
      >
        <X size={15} />
      </button>

      <div className="flex gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-400/25 bg-cyan-400/10 text-cyan-500">
          <Compass size={16} />
        </div>

        <div className="min-w-0 pr-4">
          <p className="text-[14px] font-bold text-zinc-900 dark:text-zinc-50">
            New to {name}?
          </p>
          <p className="mt-1.5 text-[12px] leading-relaxed text-zinc-500 dark:text-zinc-400">
            A step-by-step tour shows how this page works, from start to finish. Look
            for Guide me buttons for the details of each part.
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onLater}
          className="rounded-lg px-3 py-1.5 text-[12px] font-medium text-zinc-500 transition hover:text-zinc-800 dark:hover:text-zinc-200"
        >
          Later
        </button>
        <button
          type="button"
          onClick={onStart}
          className="rounded-lg bg-cyan-400 px-3.5 py-1.5 text-[12px] font-bold text-slate-950 transition hover:bg-cyan-300"
        >
          Start the tour
        </button>
      </div>
    </motion.div>
  );
}

function NudgePopover({ onClose, onYes }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18 }}
      className="absolute right-[250px] top-[calc(100%+6px)] z-50 w-[250px] rounded-xl border border-cyan-400/20 bg-white p-3.5 shadow-2xl dark:bg-[#15161A]"
    >
      <span className="absolute -top-1.5 right-[70px] h-3 w-3 rotate-45 border-l border-t border-cyan-400/20 bg-white dark:bg-[#15161A]" />

      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-2.5 top-2.5 text-zinc-400 transition hover:text-zinc-700 dark:hover:text-zinc-200"
      >
        <X size={14} />
      </button>

      <p className="pr-5 text-[13px] font-medium leading-snug text-zinc-800 dark:text-zinc-100">
        No contacts yet — want help importing a list?
      </p>

      <button
        type="button"
        onClick={onYes}
        className="mt-3 rounded-lg bg-cyan-400 px-3 py-1.5 text-[12px] font-bold text-slate-950 transition hover:bg-cyan-300"
      >
        Yes, help me
      </button>
    </motion.div>
  );
}

// ============================================================
// HEADER
// ============================================================

export default function Header({
  onThemeToggle,
  theme,
  credits = 10,
  workspaceId = WORKSPACE_ID,
}) {
  const meta = {
    agents: useMeta("agents"),
    kb: useMeta("kb"),
    campaigns: useMeta("campaigns"),
    calls: useMeta("calls"),
  };

  const cfg = useRouteConfig(meta);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);

  // ----------------------------------------------------------
  // SEARCH (icon that expands into an input, Ctrl/Cmd + K)
  // ----------------------------------------------------------
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);

  useEffect(() => {
    setSearchOpen(false);
    setQuery("");
  }, [pathname]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k" && cfg.search) {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cfg.search]);

  // ----------------------------------------------------------
  // TOUR PILL + POPOVERS
  // ----------------------------------------------------------
  const [pillDismissed, setPillDismissed] = useState(
    () => lsGet("agni_tour_pill_dismissed") === "1"
  );

  const tourKey = `agni_tour_seen:${pathname}`;
  const nudgeKey = `agni_nudge_seen:${pathname}`;

  const [tourOpen, setTourOpen] = useState(false);
  const [nudgeOpen, setNudgeOpen] = useState(false);

  useEffect(() => {
    setTourOpen(!!cfg.tour && lsGet(tourKey) !== "1");
    setNudgeOpen(cfg.nudge && lsGet(nudgeKey) !== "1");
  }, [pathname, cfg.tour, cfg.nudge, tourKey, nudgeKey]);

  const closeTour = () => {
    lsSet(tourKey, "1");
    setTourOpen(false);
  };

  const startTour = useCallback(() => {
    lsSet(tourKey, "1");
    setTourOpen(false);
    window.dispatchEvent(new CustomEvent("start-tour", { detail: { path: pathname } }));
  }, [tourKey, pathname]);

  const closeNudge = () => {
    lsSet(nudgeKey, "1");
    setNudgeOpen(false);
  };

  const dismissPill = (e) => {
    e.stopPropagation();
    lsSet("agni_tour_pill_dismissed", "1");
    setPillDismissed(true);
  };

  // The tour pill is replaced by the popover while it is open
  const showTourPill = !pillDismissed && !tourOpen;

  // ----------------------------------------------------------
  // NOTIFICATIONS
  // ----------------------------------------------------------
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Credits Expired",
      message:
        "Some of your credits have reached their expiry date. Recharge to continue using calling...",
      time: "about 1 month ago",
      type: "warning",
      read: false,
    },
  ]);

  const [notificationOpen, setNotificationOpen] = useState(false);
  const notificationRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const clearAllNotifications = () => setNotifications([]);

  const markNotificationRead = (id) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setNotificationOpen(false);
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // ----------------------------------------------------------
  // COPY WORKSPACE ID
  // ----------------------------------------------------------
  const handleCopyWorkspaceId = () => {
    navigator.clipboard?.writeText(workspaceId);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  // ----------------------------------------------------------
  // PAGE ACTIONS
  // ----------------------------------------------------------
  const renderAction = () => {
    switch (cfg.action) {
      case "new-agent":
        return (
          <button type="button" onClick={() => navigate("/agents/create")} className={primaryBtn}>
            <Plus size={16} strokeWidth={2.4} />
            <span className="hidden sm:inline">New Agent</span>
          </button>
        );

      case "new-campaign":
        return (
          <button type="button" onClick={() => navigate("/outbound/new")} className={primaryBtn}>
            <Plus size={16} strokeWidth={2.4} />
            <span className="hidden sm:inline">New Campaign</span>
          </button>
        );

      case "kb-create":
        return (
          <>
            <button
              type="button"
              aria-label="Guide"
              onClick={startTour}
              className={`${iconBtn} !text-cyan-500`}
            >
              <Compass size={16} />
            </button>
            <button type="button" onClick={emit("kb-create")} className={primaryBtn}>
              <Plus size={16} strokeWidth={2.4} />
              <span className="hidden sm:inline">Create Knowledge Base</span>
            </button>
          </>
        );

      case "kb-detail":
        return (
          <div className="flex items-center gap-2">
            <button type="button" onClick={emit("kb-refresh")} className={outlineBtn}>
              <RefreshCw size={14} />
              <span className="hidden lg:inline">Refresh</span>
            </button>
            <button type="button" onClick={emit("kb-clear-cache")} className={outlineBtn}>
              <Zap size={14} />
              <span className="hidden lg:inline">Clear cache</span>
            </button>
            <button type="button" onClick={emit("kb-exclusions")} className={`hidden xl:inline-flex ${outlineBtn}`}>
              <Filter size={14} />
              <span>Exclusions</span>
            </button>
            <button
              type="button"
              onClick={emit("kb-delete")}
              className={`hidden lg:inline-flex ${outlineBtn} hover:!border-red-200 hover:!bg-red-50 hover:!text-red-500 dark:hover:!border-red-500/30 dark:hover:!bg-red-500/10 dark:hover:!text-red-400`}
            >
              <Trash2 size={14} />
              <span>Delete</span>
            </button>
            <button type="button" onClick={emit("kb-add-source")} className={`${primaryBtn} !h-9 !px-4 !text-[13px]`}>
              <Plus size={15} strokeWidth={2.6} />
              <span>Add Source</span>
            </button>
          </div>
        );

      case "calls":
        return (
          <div className="flex items-center gap-2">
            <button type="button" onClick={emit("calls-refresh")} className={outlineBtn}>
              <RefreshCw size={14} />
              <span className="hidden lg:inline">Refresh</span>
            </button>
            <button
              type="button"
              aria-label="History"
              onClick={emit("calls-history")}
              className={`${outlineBtn} !px-2.5`}
            >
              <History size={15} />
            </button>
            <button
              type="button"
              aria-label="Guide"
              onClick={startTour}
              className={`${iconBtn} !text-cyan-500`}
            >
              <Compass size={16} />
            </button>
            <button type="button" onClick={emit("calls-export")} className={outlineBtn}>
              <Download size={14} />
              <span className="hidden lg:inline">Export</span>
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  // ----------------------------------------------------------
  // JSX
  // ----------------------------------------------------------
  return (
    <motion.header
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-30 flex min-h-[72px] items-center justify-between gap-4 border-b border-black/10 bg-white/95 px-6 antialiased backdrop-blur-xl dark:border-white/[0.07] dark:bg-[#080a0d]/95"
    >
      {/* ================= LEFT: TITLE + SUBTITLE ================= */}
      <div className="min-w-0 shrink-0">
        <motion.h2
          key={cfg.title}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          className="flex items-center gap-2 text-[16px] font-bold tracking-tight text-zinc-950 dark:text-zinc-50"
        >
          <span className="max-w-[280px] truncate" title={cfg.title}>
            {cfg.title}
          </span>
          <Info size={14} strokeWidth={2} className="text-zinc-400 dark:text-zinc-500" />
        </motion.h2>

        <motion.div
          key={`${cfg.title}-${cfg.subtitle}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.08 }}
          className="mt-1 flex items-center gap-2 text-[12px] text-zinc-600 dark:text-zinc-400"
        >
          {cfg.subtitle && (
            <>
              <span className="hidden sm:inline">{cfg.subtitle}</span>
              <span className="hidden text-zinc-400 sm:inline">·</span>
            </>
          )}

          <span className="font-mono text-[11px] font-medium tracking-tight text-zinc-500">
            # {workspaceId}
          </span>

          <button
            type="button"
            aria-label="Copy workspace ID"
            onClick={handleCopyWorkspaceId}
            className="rounded p-0.5 text-zinc-400 transition-colors hover:bg-black/5 hover:text-zinc-700 dark:hover:bg-white/10 dark:hover:text-zinc-200"
          >
            {copied ? (
              <Check size={11} className="text-emerald-500" strokeWidth={3} />
            ) : (
              <Copy size={11} />
            )}
          </button>
        </motion.div>
      </div>

      {/* ================= RIGHT ================= */}
      <div className="flex min-w-0 flex-1 items-center justify-end gap-2.5">
        {/* SEARCH */}
        {cfg.search && (
          <AnimatePresence initial={false} mode="wait">
            {searchOpen ? (
              <motion.div
                key="search-open"
                initial={{ width: 36, opacity: 0 }}
                animate={{ width: 240, opacity: 1 }}
                exit={{ width: 36, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="hidden h-9 items-center gap-2 overflow-hidden rounded-lg border border-cyan-500/40 bg-white px-3 ring-2 ring-cyan-500/15 md:flex dark:bg-[#0D0F12]"
              >
                <Search size={15} className="shrink-0 text-zinc-400" />
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter")
                      window.dispatchEvent(
                        new CustomEvent("global-search", { detail: { query } })
                      );
                  }}
                  placeholder="Search..."
                  aria-label="Search"
                  className="min-w-0 flex-1 bg-transparent text-[13px] font-medium text-zinc-800 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
                />
                <kbd className="rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-500 dark:border-white/10 dark:bg-white/5">
                  Esc
                </kbd>
              </motion.div>
            ) : (
              <motion.button
                key="search-closed"
                type="button"
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={iconBtn}
              >
                <Search size={17} />
              </motion.button>
            )}
          </AnimatePresence>
        )}

        {/* CREDITS */}
        <button
          type="button"
          onClick={() => navigate("/billing")}
          title="View billing and credits"
          className={`hidden sm:inline-flex ${outlineBtn}`}
        >
          <Coins size={14} className="text-cyan-500" />
          <span>{credits} credits</span>
        </button>

        {/* THEME */}
        <button
          type="button"
          onClick={onThemeToggle}
          aria-label="Toggle Theme"
          className="hidden h-9 w-9 items-center justify-center rounded-lg border border-black/10 bg-white text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-800 sm:flex dark:border-white/10 dark:bg-[#0D0F12] dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-zinc-100"
        >
          {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        {/* ASK AGNI */}
        <button
          type="button"
          onClick={emit("ask-agni-open")}
          className="relative hidden h-9 items-center gap-2 whitespace-nowrap rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-3 text-[13px] font-semibold text-cyan-600 transition hover:border-cyan-400/50 hover:bg-cyan-400/15 sm:inline-flex dark:text-cyan-400"
        >
          <Sparkles size={14} />
          <span>Ask Agni</span>
          {cfg.askDot && (
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-cyan-400 ring-2 ring-white dark:ring-[#080a0d]" />
          )}
        </button>

        {/* TAKE THE TOUR (pill) */}
        {showTourPill && (
          <button
            type="button"
            onClick={startTour}
            className="hidden h-9 items-center gap-2 whitespace-nowrap rounded-full border border-cyan-400/30 bg-cyan-400/10 pl-3 pr-2 text-[13px] font-semibold text-cyan-600 transition hover:border-cyan-400/50 hover:bg-cyan-400/15 xl:inline-flex dark:text-cyan-400"
          >
            <Compass size={14} />
            <span>Take the tour</span>
            <span
              role="button"
              aria-label="Dismiss tour"
              onClick={dismissPill}
              className="ml-0.5 rounded-full p-0.5 text-cyan-500/70 transition hover:bg-cyan-400/20 hover:text-cyan-500"
            >
              <X size={12} />
            </span>
          </button>
        )}

        {/* HELP */}
        <button
          type="button"
          aria-label="Help"
          onClick={emit("open-help")}
          className={iconBtn}
        >
          <HelpCircle size={17} />
          <Dot />
        </button>

        {/* NOTIFICATIONS */}
        <div className="relative" ref={notificationRef}>
          <button
            type="button"
            aria-label="Notifications"
            aria-expanded={notificationOpen}
            onClick={() => setNotificationOpen((p) => !p)}
            className={iconBtn}
          >
            <Bell size={17} />

            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-cyan-400 px-1 text-[10px] font-bold text-slate-950 ring-2 ring-white dark:ring-[#080a0d]">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {notificationOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.18 }}
              className="absolute right-0 top-12 z-[100] w-[340px] max-w-[calc(100vw-24px)] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl dark:border-white/10 dark:bg-[#141519]"
            >
              <div className="flex items-center justify-between border-b border-black/5 px-4 py-3 dark:border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/10">
                    <Bell size={15} className="text-cyan-500" />
                  </div>

                  <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Notifications
                  </span>

                  {unreadCount > 0 && (
                    <span className="flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-cyan-500 px-1 text-[10px] font-bold text-white">
                      {unreadCount}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 px-4 py-2.5">
                <button
                  type="button"
                  onClick={markAllRead}
                  disabled={unreadCount === 0}
                  className="flex items-center gap-1.5 rounded-lg border border-black/10 px-2.5 py-1.5 text-[11px] font-semibold text-zinc-600 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/5"
                >
                  <Check size={12} />
                  Mark all read
                </button>

                <button
                  type="button"
                  onClick={clearAllNotifications}
                  disabled={notifications.length === 0}
                  className="flex items-center gap-1.5 rounded-lg border border-black/10 px-2.5 py-1.5 text-[11px] font-semibold text-zinc-600 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/5"
                >
                  <Trash2 size={12} />
                  Clear all
                </button>
              </div>

              <div className="max-h-[320px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-white/5">
                      <Bell size={20} className="text-zinc-400" />
                    </div>
                    <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                      All caught up!
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      You have no notifications right now.
                    </p>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => markNotificationRead(n.id)}
                      className={`relative flex w-full gap-3 border-b border-black/[0.04] px-4 py-3 text-left transition hover:bg-zinc-50 dark:border-white/[0.04] dark:hover:bg-white/[0.03] ${
                        !n.read
                          ? "bg-zinc-50 dark:bg-white/[0.025]"
                          : "bg-white dark:bg-[#141519]"
                      }`}
                    >
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10">
                        <AlertTriangle size={16} className="text-amber-500" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-[12px] font-bold text-zinc-800 dark:text-zinc-100">
                            {n.title}
                          </p>
                          {!n.read && (
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                          )}
                        </div>

                        <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                          {n.message}
                        </p>

                        <p className="mt-1.5 text-[10px] text-zinc-400 dark:text-zinc-500">
                          {n.time}
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </div>

              <div className="border-t border-black/[0.06] px-4 py-3 text-center dark:border-white/[0.06]">
                <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                  {notifications.length === 0
                    ? "No notifications"
                    : `All ${notifications.length} notification${
                        notifications.length !== 1 ? "s" : ""
                      } shown`}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* PAGE-SPECIFIC ACTION(S) */}
        {renderAction()}
      </div>

      {/* ================= POPOVERS ================= */}
      <AnimatePresence>
        {tourOpen && cfg.tour && (
          <TourPopover name={cfg.tour} onLater={closeTour} onStart={startTour} />
        )}

        {nudgeOpen && (
          <NudgePopover
            onClose={closeNudge}
            onYes={() => {
              closeNudge();
              window.dispatchEvent(
                new CustomEvent("ask-agni-open", {
                  detail: { prompt: "Help me import a contact list" },
                })
              );
            }}
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
}