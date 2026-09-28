

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


import React from "react";
import {
  Bell,
  Plus,
  Search,
  Copy,
  HelpCircle,
  RefreshCw,
  Trash2,
  Filter,
  Zap,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import ThemeToggle from "./ThemeToggle";

function useHeaderContent() {
  const location = useLocation();
  const pathname = location.pathname;

  if (pathname === "/dashboard") {
    return {
      title: "Dashboard",
      subtitle: "Overview of your voice AI platform",
    };
  }

  if (pathname === "/agents") {
    return {
      title: "Agents",
      subtitle: "Overview of your voice AI platform",
    };
  }

  if (pathname === "/agents/create") {
    return {
      title: "Create Agent",
      subtitle: "Build a new AI assistant",
    };
  }

  if (pathname === "/knowledge-base") {
    return {
      title: "Knowledge Base",
      subtitle: "Add sources for agents",
    };
  }

  if (
    pathname.startsWith("/knowledge-base/") &&
    pathname !== "/knowledge-base"
  ) {
    const id = pathname.replace("/knowledge-base/", "");
    let kbName = id;

    try {
      const raw = localStorage.getItem("ravanai_knowledge_bases");
      const bases = raw ? JSON.parse(raw) : [];

      const found = Array.isArray(bases)
        ? bases.find((b) => b.id === id)
        : null;

      if (found?.name) kbName = found.name;
    } catch {
      // fallback to id
    }

    return {
      title: kbName,
      subtitle: "Knowledge Base Details",
    };
  }

  if (pathname === "/inbound" || pathname === "/inbound-calls") {
    return {
      title: "Inbound Calls",
      subtitle: "Manage inbound call routing and dispatch rules",
    };
  }

  if (pathname === "/outbound") {
    return {
      title: "Outbound",
      subtitle: "Launch and manage outbound call campaigns",
    };
  }

  if (pathname === "/outbound/new") {
    return {
      title: "New Campaign",
      subtitle: "Create a new outbound campaign",
    };
  }

  if (pathname === "/campaigns") {
    return {
      title: "Campaigns",
      subtitle: "Manage your outbound campaigns",
    };
  }

  if (pathname === "/campaigns/new") {
    return {
      title: "New Campaign",
      subtitle: "Create a new outbound campaign",
    };
  }

  if (pathname === "/calls" || pathname === "/call-sessions") {
    return {
      title: "All Calls History",
      subtitle: "Review call logs and recordings",
    };
  }

  if (pathname === "/contacts") {
    return {
      title: "Contacts",
      subtitle:
        "Manage your global contact list and campaign assignments",
    };
  }

  if (pathname === "/integrations") {
    return {
      title: "Integrations",
      subtitle:
        "Connect and manage external tools that power your agents.",
    };
  }

  if (
    pathname === "/phone-numbers" ||
    pathname === "/phone-number"
  ) {
    return {
      title: "Phone Numbers",
      subtitle:
        "Connect a provider, buy numbers, and route calls to AI agents",
    };
  }

  if (pathname === "/billing") {
    return {
      title: "Billing",
      subtitle: "Manage your subscription and usage",
    };
  }

  return {
    title: "Dashboard",
    subtitle: "Overview of your voice AI platform",
  };
}

export default function Header({ onThemeToggle, theme }) {
  const { title, subtitle } = useHeaderContent();
  const location = useLocation();
  const navigate = useNavigate();

  const isKbDetail =
    location.pathname.startsWith("/knowledge-base/") &&
    location.pathname !== "/knowledge-base";

  const handleRefresh = () => {
    window.dispatchEvent(new CustomEvent("kb-refresh"));
  };

  const handleClearCache = () => {
    window.dispatchEvent(new CustomEvent("kb-clear-cache"));
  };

  const handleExclusions = () => {
    window.dispatchEvent(new CustomEvent("kb-exclusions"));
  };

  const handleDelete = () => {
    window.dispatchEvent(new CustomEvent("kb-delete"));
  };

  const handleAddSource = () => {
    window.dispatchEvent(new CustomEvent("kb-add-source"));
  };

  const handleCopyWorkspaceId = () => {
    navigator.clipboard?.writeText("# 012854ee...681e");
  };

  return (
    <motion.header
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        sticky top-0 z-30 flex min-h-[68px]
        items-center justify-between gap-4
        border-b border-black/10
        bg-white/80 px-6
        backdrop-blur-xl
        antialiased
        transition-colors duration-300
        dark:border-white/10
        dark:bg-[#080a0d]/95
      "
    >
      {/* LEFT */}
      <motion.div
        initial={{ x: -15, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.08, duration: 0.4 }}
        className="min-w-0 shrink-0"
      >
        <motion.h2
          key={title}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="
            flex items-center gap-2
            text-[15px] font-bold
            text-zinc-900
            dark:text-white
          "
        >
          {title}

          <motion.span
            whileHover={{ scale: 1.15, rotate: 8 }}
            className="text-zinc-500 dark:text-zinc-400"
          >
            <HelpCircle size={13} strokeWidth={1.8} />
          </motion.span>
        </motion.h2>

        <motion.div
          key={subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12 }}
          className="
            mt-0.5 flex items-center gap-2
            text-[11px] text-zinc-500
          "
        >
          <span className="hidden sm:inline">
            {subtitle}
          </span>

          <span className="hidden sm:inline">•</span>

          <span className="font-mono">
            # 012854ee...681e
          </span>

          <motion.button
            type="button"
            aria-label="Copy workspace ID"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            className="
              rounded-md p-0.5
              transition-colors
              hover:bg-black/5
              hover:text-zinc-700
              dark:hover:bg-white/10
            "
            onClick={handleCopyWorkspaceId}
          >
            <Copy size={11} />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* RIGHT */}
      <motion.div
        initial={{ x: 15, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex flex-1 items-center justify-end gap-2"
      >
        {/* SEARCH */}
        <motion.div
          whileHover={{
            borderColor: "rgba(34,211,238,0.35)",
            scale: 1.01,
          }}
          transition={{ duration: 0.2 }}
          className="
            hidden h-9 w-56
            items-center gap-2
            rounded-lg
            border border-black/10
            bg-black/[0.02] px-3
            text-sm text-zinc-500
            md:flex
            dark:border-white/10
            dark:bg-white/[0.02]
          "
        >
          <Search size={15} />

          <input
            type="text"
            placeholder="Search..."
            aria-label="Search"
            className="
              min-w-0 flex-1
              bg-transparent
              text-[13px]
              text-zinc-800
              outline-none
              placeholder:text-zinc-500
              dark:text-zinc-200
            "
          />

          <kbd
            className="
              rounded border
              border-black/10
              px-1.5 py-0.5
              text-[10px] text-zinc-500
              dark:border-white/10
            "
          >
            ⌘K
          </kbd>
        </motion.div>

        {/* CREDITS */}
        <motion.div
          whileHover={{ y: -2, scale: 1.02 }}
          className="
            hidden items-center gap-2
            rounded-lg
            border border-black/10
            px-3 py-1.5
            text-[13px]
            sm:flex
            dark:border-white/10
          "
        >
          <motion.span
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            className="text-cyan-500 dark:text-cyan-300"
          >
            ♧
          </motion.span>

          <span className="whitespace-nowrap font-medium text-zinc-800 dark:text-zinc-200">
            10 credits
          </span>
        </motion.div>

        {/* THEME */}
        <motion.div
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
        >
          <ThemeToggle
            theme={theme}
            onToggle={onThemeToggle}
          />
        </motion.div>

        {/* NOTIFICATIONS */}
        <motion.button
          type="button"
          aria-label="Notifications"
          whileHover={{
            scale: 1.08,
            y: -1,
          }}
          whileTap={{ scale: 0.9 }}
          className="
            hidden rounded-lg
            p-2
            text-zinc-500
            transition-colors
            hover:bg-black/5
            dark:text-zinc-400
            dark:hover:bg-white/10
            sm:block
          "
        >
          <Bell size={16} />
        </motion.button>

        {/* KB DETAIL BUTTONS */}
        {isKbDetail && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2"
          >
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleRefresh}
              className="
                flex h-9 items-center gap-2
                rounded-lg border border-black/10
                bg-white px-3
                text-[13px] font-medium text-zinc-700
                dark:border-white/10
                dark:bg-[#101012]
                dark:text-zinc-300
              "
            >
              <RefreshCw size={14} />
              <span className="hidden lg:inline">
                Refresh
              </span>
            </motion.button>

            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleClearCache}
              className="
                flex h-9 items-center gap-2
                rounded-lg border border-black/10
                bg-white px-3
                text-[13px] font-medium text-zinc-700
                dark:border-white/10
                dark:bg-[#101012]
                dark:text-zinc-300
              "
            >
              <Zap size={14} />
              <span className="hidden lg:inline">
                Clear cache
              </span>
            </motion.button>

            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleExclusions}
              className="
                flex h-9 items-center gap-2
                rounded-lg border border-black/10
                bg-white px-3
                text-[13px] font-medium text-zinc-700
                dark:border-white/10
                dark:bg-[#101012]
                dark:text-zinc-300
              "
            >
              <Filter size={14} />
              <span className="hidden lg:inline">
                Exclusions
              </span>
            </motion.button>

            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleDelete}
              className="
                flex h-9 items-center gap-2
                rounded-lg border border-black/10
                bg-white px-3
                text-[13px] font-medium text-zinc-700
                hover:text-red-500
                dark:border-white/10
                dark:bg-[#101012]
                dark:text-zinc-300
              "
            >
              <Trash2 size={14} />
              <span className="hidden lg:inline">
                Delete
              </span>
            </motion.button>

            <motion.button
              whileHover={{
                y: -2,
                scale: 1.03,
                boxShadow: "0 8px 25px rgba(34,211,238,0.22)",
              }}
              whileTap={{ scale: 0.96 }}
              onClick={handleAddSource}
              className="
                flex h-9 items-center gap-1.5
                rounded-lg bg-cyan-500 px-4
                text-[13px] font-semibold text-white
                dark:bg-cyan-400 dark:text-slate-950
              "
            >
              <Plus size={15} strokeWidth={2.8} />
              <span className="hidden sm:inline">
                Add Source
              </span>
            </motion.button>
          </motion.div>
        )}

        {/* NEW AGENT */}
        {!isKbDetail && (
          <motion.button
            type="button"
            onClick={() => navigate("/agents/create")}
            whileHover={{
              y: -2,
              scale: 1.03,
              boxShadow: "0 8px 25px rgba(34,211,238,0.22)",
            }}
            whileTap={{ scale: 0.95 }}
            className="
              flex items-center gap-2
              rounded-lg
              bg-cyan-400
              px-3.5 py-2
              text-[13px] font-bold
              text-slate-950
            "
          >
            <Plus size={15} strokeWidth={2.8} />
            <span className="hidden sm:inline">
              New Agent
            </span>
          </motion.button>
        )}
      </motion.div>
    </motion.header>
  );
}