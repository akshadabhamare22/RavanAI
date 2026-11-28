// import React, { useState, useRef, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Bot,
//   BookOpen,
//   Grid3X3,
//   Megaphone,
//   PhoneCall,
//   Users,
//   Cable,
//   Settings,
//   CreditCard,
//   BarChart3,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   LogOut,
//   UserRound,
//   MessageSquare,
// } from "lucide-react";

// // ============================================================
// // NAVIGATION CONFIGURATION
// // ============================================================

// const navigationGroups = [
//   {
//     title: "PLATFORM",
//     items: [
//       { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
//       { label: "Agents", icon: Bot, path: "/agents" },
//       { label: "Knowledge Base", icon: BookOpen, path: "/knowledge-base" },
//     ],
//   },
//   {
//     title: "CAMPAIGNS",
//     items: [
//       { label: "Inbound", icon: Grid3X3, path: "/inbound" },
//       { label: "Outbound", icon: Megaphone, path: "/outbound" },
//     ],
//   },
//   {
//     title: "MANAGEMENT",
//     items: [
//       { label: "All Calls History", icon: PhoneCall, path: "/calls" },
//       { label: "Contacts", icon: Users, path: "/contacts" },
//       { label: "Integrations", icon: Cable, path: "/integrations" },
//     ],
//   },
//   {
//     title: "OPERATIONS",
//     items: [
//       { label: "Phone Number", icon: BarChart3, path: "/phone-number" },
//       { label: "Billing", icon: CreditCard, path: "/billing" },
//     ],
//   },
// ];

// // ============================================================
// // SIDEBAR ITEM
// // ============================================================

// function SidebarItem({ item, collapsed }) {
//   const Icon = item.icon;

//   return (
//     <NavLink
//       to={item.path}
//       title={collapsed ? item.label : undefined}
//       className={({ isActive }) =>
//         `
//         group relative flex items-center gap-3 rounded-lg
//         ${collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2"}
//         text-[13px] font-medium
//         transition-all duration-150
//         ${
//           isActive
//             ? "bg-cyan-500/[0.10] text-cyan-600 dark:bg-cyan-400/[0.10] dark:text-cyan-400"
//             : "text-zinc-600 hover:bg-black/[0.04] hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.05] dark:hover:text-zinc-100"
//         }
//         `
//       }
//     >
//       {({ isActive }) => (
//         <>
//           {isActive && (
//             <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-cyan-500 dark:bg-cyan-400" />
//           )}

//           <Icon
//             size={17}
//             strokeWidth={isActive ? 2.1 : 1.8}
//             className="shrink-0"
//           />

//           {!collapsed && <span className="truncate">{item.label}</span>}
//         </>
//       )}
//     </NavLink>
//   );
// }

// // ============================================================
// // MENU ITEM (for dropdown)
// // ============================================================

// function MenuItem({ icon: Icon, label, onClick, danger = false }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`
//         flex w-full items-center gap-3
//         rounded-lg px-3 py-2.5 text-left
//         text-[13px] font-medium
//         transition
//         ${
//           danger
//             ? "text-red-500 hover:bg-red-500/[0.08] dark:text-red-400 dark:hover:bg-red-500/[0.10]"
//             : "text-zinc-700 hover:bg-black/[0.04] dark:text-zinc-300 dark:hover:bg-white/[0.05]"
//         }
//       `}
//     >
//       <Icon size={16} className="shrink-0" />
//       <span>{label}</span>
//     </button>
//   );
// }

// // ============================================================
// // SIDEBAR
// // ============================================================

// export default function Sidebar({ collapsed = false, onToggle }) {
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const menuRef = useRef(null);

//   // Close on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Close on Escape
//   useEffect(() => {
//     const handleKey = (e) => {
//       if (e.key === "Escape") setMenuOpen(false);
//     };
//     document.addEventListener("keydown", handleKey);
//     return () => document.removeEventListener("keydown", handleKey);
//   }, []);

//   // ------------------------------------------------------------
//   // LOGOUT
//   // ------------------------------------------------------------
//   const handleLogout = () => {
//     localStorage.removeItem("ravanai_auth");
//     setMenuOpen(false);
//     navigate("/login", { replace: true });
//   };

//   const handleNavigate = (path) => {
//     setMenuOpen(false);
//     navigate(path);
//   };

//   return (
//     <aside
//       className={`
//         fixed inset-y-0 left-0 z-50
//         hidden flex-col border-r
//         border-black/[0.08] bg-white
//         transition-[width] duration-200 ease-out
//         dark:border-white/[0.06] dark:bg-[#0a0b0e]
//         lg:flex
//         ${collapsed ? "w-[72px]" : "w-[260px]"}
//       `}
//     >
//       {/* ======================================================
//           BRAND HEADER
//       ====================================================== */}
//       <div
//         className={`
//           flex h-[68px] shrink-0 items-center
//           border-b border-black/[0.06]
//           dark:border-white/[0.06]
//           ${collapsed ? "justify-center px-2" : "px-5"}
//         `}
//       >
//         <div
//           className={`
//             flex min-w-0 items-center
//             ${collapsed ? "justify-center" : "gap-2.5"}
//           `}
//         >
//           <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-orange-400/30 bg-zinc-100 dark:bg-[#17181c]">
//             <img
//               src="/logo.svg"
//               alt="Agni"
//               className="h-full w-full object-cover"
//               onError={(event) => {
//                 event.currentTarget.style.display = "none";
//                 event.currentTarget.nextElementSibling.style.display = "flex";
//               }}
//             />
//             <span className="hidden h-full w-full items-center justify-center text-sm font-bold text-orange-400">
//               A
//             </span>
//           </div>

//           {!collapsed && (
//             <div className="min-w-0 flex-1">
//               <h2 className="truncate text-[15px] font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
//                 JeevaAI
//               </h2>
//               <p className="mt-0.5 truncate text-[10px] font-semibold tracking-[0.1em] text-zinc-500">
//                 ENTERPRISE
//               </p>
//             </div>
//           )}
//         </div>

//         {!collapsed && (
//           <button
//             onClick={onToggle}
//             aria-label="Collapse sidebar"
//             className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-zinc-400 transition hover:bg-black/[0.05] hover:text-zinc-700 dark:text-zinc-500 dark:hover:bg-white/[0.06] dark:hover:text-zinc-300"
//           >
//             <ChevronLeft size={15} />
//           </button>
//         )}
//       </div>

//       {collapsed && (
//         <button
//           onClick={onToggle}
//           aria-label="Expand sidebar"
//           className="mx-auto mt-3 flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 transition hover:bg-black/[0.05] hover:text-zinc-700 dark:text-zinc-500 dark:hover:bg-white/[0.06] dark:hover:text-zinc-300"
//         >
//           <ChevronRight size={15} />
//         </button>
//       )}

//       {/* ======================================================
//           NAVIGATION
//       ====================================================== */}
//       <nav className="sidebar-scrollbar flex-1 overflow-y-auto px-3 py-4">
//         <div className="space-y-5">
//           {navigationGroups.map((group) => (
//             <div key={group.title}>
//               {!collapsed && (
//                 <div className="mb-1.5 px-3 text-[10px] font-semibold tracking-[0.1em] text-zinc-400 dark:text-zinc-500">
//                   {group.title}
//                 </div>
//               )}

//               {collapsed && (
//                 <div className="mx-2 mb-2 h-px bg-black/[0.06] dark:bg-white/[0.06]" />
//               )}

//               <div className="space-y-0.5">
//                 {group.items.map((item) => (
//                   <SidebarItem
//                     key={item.path}
//                     item={item}
//                     collapsed={collapsed}
//                   />
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </nav>

//       {/* ======================================================
//           USER PROFILE + DROPDOWN
//       ====================================================== */}
//       <div
//         ref={menuRef}
//         className="relative shrink-0 border-t border-black/[0.06] p-2.5 dark:border-white/[0.06]"
//       >
//         {/* Trigger */}
//         <button
//           onClick={() => setMenuOpen((prev) => !prev)}
//           className={`
//             flex w-full items-center gap-2.5 rounded-lg
//             p-2 text-left transition
//             hover:bg-black/[0.04]
//             dark:hover:bg-white/[0.04]
//             ${collapsed ? "justify-center" : ""}
//           `}
//         >
//           <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-[11px] font-bold text-[#071318]">
//             AB
//           </div>

//           {!collapsed && (
//             <>
//               <div className="min-w-0 flex-1">
//                 <div className="flex items-center gap-1.5">
//                   <p className="truncate text-[12px] font-semibold text-zinc-900 dark:text-zinc-100">
//                     JeevaAI
//                   </p>
//                   <span className="shrink-0 rounded bg-black/[0.06] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-zinc-600 dark:bg-white/[0.08] dark:text-zinc-400">
//                     Admin
//                   </span>
//                 </div>
//                 <p className="mt-0.5 truncate text-[10px] text-zinc-500">
//                   Softcrowd Technologies
//                 </p>
//               </div>

//               <ChevronDown
//                 size={14}
//                 className={`shrink-0 text-zinc-400 transition-transform duration-200 ${
//                   menuOpen ? "rotate-180" : ""
//                 }`}
//               />
//             </>
//           )}
//         </button>

//         {/* ======================================================
//             DROPDOWN MENU — opens ABOVE the trigger
//         ====================================================== */}
//         {menuOpen && (
//           <div
//             className={`
//               absolute bottom-full z-50 mb-2
//               w-[240px] overflow-hidden
//               rounded-xl border
//               border-black/[0.08] bg-white
//               p-1.5
//               shadow-[0_8px_30px_rgba(0,0,0,0.12)]
//               dark:border-white/[0.08]
//               dark:bg-[#15161a]
//               dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]
//               ${collapsed ? "left-2" : "left-0"}
//             `}
//           >
//             {/* Org Badge */}
//             <div className="flex items-center gap-2.5 rounded-lg px-3 py-2.5">
//               <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/[0.08]">
//                 <svg
//                   width="14"
//                   height="14"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="text-cyan-500 dark:text-cyan-400"
//                 >
//                   <rect x="4" y="2" width="16" height="20" rx="2" />
//                   <path d="M9 22v-4h6v4" />
//                   <path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
//                 </svg>
//               </div>

//               <div className="min-w-0 flex-1">
//                 <p className="truncate text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
//                   Softcrowd Technologies
//                 </p>
//               </div>

//               <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black/[0.06] px-1.5 text-[10px] font-semibold text-zinc-600 dark:bg-white/[0.08] dark:text-zinc-400">
//                 1
//               </span>
//             </div>

//             {/* Divider */}
//             <div className="my-1 h-px bg-black/[0.06] dark:bg-white/[0.06]" />

//             {/* Menu Items */}
//             <MenuItem
//               icon={UserRound}
//               label="Profile"
//               onClick={() => handleNavigate("/settings")}
//             />
//             <MenuItem
//               icon={Settings}
//               label="Settings"
//               onClick={() => handleNavigate("/settings")}
//             />
//             <MenuItem
//               icon={MessageSquare}
//               label="Feedback"
//               onClick={() => handleNavigate("/feedback")}
//             />

//             {/* Divider */}
//             <div className="my-1 h-px bg-black/[0.06] dark:bg-white/[0.06]" />

//             <MenuItem
//               icon={LogOut}
//               label="Log out"
//               onClick={handleLogout}
//               danger
//             />
//           </div>
//         )}
//       </div>
//     </aside>
//   );
// }

// import React, { useState, useRef, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// import {
//   LayoutDashboard,
//   Bot,
//   BookOpen,
//   Grid3X3,
//   Megaphone,
//   PhoneCall,
//   Users,
//   Cable,
//   Settings,
//   CreditCard,
//   BarChart3,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   LogOut,
//   UserRound,
//   MessageSquare,
// } from "lucide-react";

// import ThemeToggle from "./ThemeToggle";

// // ============================================================
// // NAVIGATION
// // ============================================================

// const navigationGroups = [
//   {
//     title: "PLATFORM",
//     items: [
//       {
//         label: "Dashboard",
//         icon: LayoutDashboard,
//         path: "/dashboard",
//       },
//       {
//         label: "Agents",
//         icon: Bot,
//         path: "/agents",
//       },
//       {
//         label: "Knowledge Base",
//         icon: BookOpen,
//         path: "/knowledge-base",
//       },
//     ],
//   },
//   {
//     title: "CAMPAIGNS",
//     items: [
//       {
//         label: "Inbound",
//         icon: Grid3X3,
//         path: "/inbound",
//       },
//       {
//         label: "Outbound",
//         icon: Megaphone,
//         path: "/outbound",
//       },
//     ],
//   },
//   {
//     title: "MANAGEMENT",
//     items: [
//       {
//         label: "All Calls History",
//         icon: PhoneCall,
//         path: "/calls",
//       },
//       {
//         label: "Contacts",
//         icon: Users,
//         path: "/contacts",
//       },
//       {
//         label: "Integrations",
//         icon: Cable,
//         path: "/integrations",
//       },
//     ],
//   },
//   {
//     title: "OPERATIONS",
//     items: [
//       {
//         label: "Phone Number",
//         icon: BarChart3,
//         path: "/phone-number",
//       },
//       {
//         label: "Billing",
//         icon: CreditCard,
//         path: "/billing",
//       },
//     ],
//   },
// ];

// // ============================================================
// // SIDEBAR ITEM
// // ============================================================

// function SidebarItem({ item, collapsed, index }) {
//   const Icon = item.icon;

//   return (
//     <motion.div
//       initial={{
//         opacity: 0,
//         x: -10,
//       }}
//       animate={{
//         opacity: 1,
//         x: 0,
//       }}
//       transition={{
//         delay: 0.08 + index * 0.035,
//         duration: 0.3,
//         ease: "easeOut",
//       }}
//     >
//       <NavLink
//         to={item.path}
//         title={collapsed ? item.label : undefined}
//         className={({ isActive }) => `
//           group relative flex items-center gap-3
//           rounded-lg
//           ${collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2"}
//           text-[13px] font-medium
//           transition-colors duration-200
//           ${
//             isActive
//               ? "bg-cyan-500/[0.10] text-cyan-600 dark:bg-cyan-400/[0.10] dark:text-cyan-400"
//               : "text-zinc-600 hover:bg-black/[0.04] hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.05] dark:hover:text-zinc-100"
//           }
//         `}
//       >
//         {({ isActive }) => (
//           <>
//             {/* Active Indicator */}
//             <AnimatePresence>
//               {isActive && (
//                 <motion.span
//                   layoutId="sidebar-active-indicator"
//                   initial={{
//                     opacity: 0,
//                     scaleY: 0,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     scaleY: 1,
//                   }}
//                   exit={{
//                     opacity: 0,
//                     scaleY: 0,
//                   }}
//                   transition={{
//                     duration: 0.2,
//                   }}
//                   className="
//                     absolute left-0 top-1/2
//                     h-5 w-[3px]
//                     -translate-y-1/2
//                     rounded-r-full
//                     bg-cyan-500
//                     dark:bg-cyan-400
//                   "
//                 />
//               )}
//             </AnimatePresence>

//             <motion.div
//               whileHover={{
//                 scale: 1.12,
//                 rotate: isActive ? 0 : 2,
//               }}
//               transition={{
//                 type: "spring",
//                 stiffness: 400,
//                 damping: 20,
//               }}
//             >
//               <Icon
//                 size={17}
//                 strokeWidth={isActive ? 2.1 : 1.8}
//                 className="shrink-0"
//               />
//             </motion.div>

//             <AnimatePresence initial={false}>
//               {!collapsed && (
//                 <motion.span
//                   initial={{
//                     opacity: 0,
//                     x: -5,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     x: 0,
//                   }}
//                   exit={{
//                     opacity: 0,
//                     x: -5,
//                   }}
//                   transition={{ duration: 0.18 }}
//                   className="truncate"
//                 >
//                   {item.label}
//                 </motion.span>
//               )}
//             </AnimatePresence>
//           </>
//         )}
//       </NavLink>
//     </motion.div>
//   );
// }

// // ============================================================
// // MENU ITEM
// // ============================================================

// function MenuItem({
//   icon: Icon,
//   label,
//   onClick,
//   danger = false,
// }) {
//   return (
//     <motion.button
//       onClick={onClick}
//       whileHover={{
//         x: 3,
//       }}
//       whileTap={{
//         scale: 0.98,
//       }}
//       transition={{
//         type: "spring",
//         stiffness: 400,
//         damping: 25,
//       }}
//       className={`
//         flex w-full items-center gap-3
//         rounded-lg px-3 py-2.5
//         text-left text-[13px] font-medium
//         ${
//           danger
//             ? "text-red-500 hover:bg-red-500/[0.08] dark:text-red-400 dark:hover:bg-red-500/[0.10]"
//             : "text-zinc-700 hover:bg-black/[0.04] dark:text-zinc-300 dark:hover:bg-white/[0.05]"
//         }
//       `}
//     >
//       <Icon size={16} className="shrink-0" />
//       <span>{label}</span>
//     </motion.button>
//   );
// }

// // ============================================================
// // SIDEBAR
// // ============================================================

// export default function Sidebar({
//   collapsed = false,
//   onToggle,
//   theme,
//   onThemeToggle,
// }) {
//   const navigate = useNavigate();

//   const [menuOpen, setMenuOpen] = useState(false);

//   const menuRef = useRef(null);

//   // Close outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         menuRef.current &&
//         !menuRef.current.contains(event.target)
//       ) {
//         setMenuOpen(false);
//       }
//     };

//     document.addEventListener(
//       "mousedown",
//       handleClickOutside
//     );

//     return () => {
//       document.removeEventListener(
//         "mousedown",
//         handleClickOutside
//       );
//     };
//   }, []);

//   // Escape
//   useEffect(() => {
//     const handleKey = (event) => {
//       if (event.key === "Escape") {
//         setMenuOpen(false);
//       }
//     };

//     document.addEventListener("keydown", handleKey);

//     return () => {
//       document.removeEventListener("keydown", handleKey);
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("ravanai_auth");
//     setMenuOpen(false);

//     navigate("/login", {
//       replace: true,
//     });
//   };

//   const handleNavigate = (path) => {
//     setMenuOpen(false);
//     navigate(path);
//   };

//   return (
//     <motion.aside
//       initial={{
//         x: -30,
//         opacity: 0,
//       }}
//       animate={{
//         x: 0,
//         opacity: 1,
//       }}
//       transition={{
//         duration: 0.45,
//         ease: [0.22, 1, 0.36, 1],
//       }}
//       className={`
//         fixed inset-y-0 left-0 z-50
//         hidden flex-col
//         border-r
//         border-black/[0.08]
//         bg-white
//         dark:border-white/[0.06]
//         dark:bg-[#0a0b0e]
//         lg:flex
//         transition-[width,background-color,border-color]
//         duration-300 ease-out
//         ${collapsed ? "w-[72px]" : "w-[260px]"}
//       `}
//     >
//       {/* ======================================================
//           BRAND
//       ====================================================== */}

//       <motion.div
//         layout
//         className={`
//           flex h-[68px] shrink-0 items-center
//           border-b border-black/[0.06]
//           dark:border-white/[0.06]
//           ${collapsed ? "justify-center px-2" : "px-5"}
//         `}
//       >
//         <motion.div
//           layout
//           className={`
//             flex min-w-0 items-center
//             ${collapsed ? "justify-center" : "gap-2.5"}
//           `}
//         >
//           {/* Logo */}
//           <motion.div
//             whileHover={{
//               scale: 1.08,
//               rotate: 3,
//             }}
//             whileTap={{
//               scale: 0.95,
//             }}
//             transition={{
//               type: "spring",
//               stiffness: 400,
//               damping: 20,
//             }}
//             className="
//               flex h-9 w-9 shrink-0
//               items-center justify-center
//               overflow-hidden rounded-full
//               border border-orange-400/30
//               bg-zinc-100
//               dark:bg-[#17181c]
//             "
//           >
//             <img
//               src="/logo.svg"
//               alt="Agni"
//               className="h-full w-full object-cover"
//               onError={(event) => {
//                 event.currentTarget.style.display = "none";

//                 if (
//                   event.currentTarget.nextElementSibling
//                 ) {
//                   event.currentTarget.nextElementSibling.style.display =
//                     "flex";
//                 }
//               }}
//             />

//             <span className="hidden h-full w-full items-center justify-center text-sm font-bold text-orange-400">
//               AI
//             </span>
//           </motion.div>

//           {/* Brand Text */}
//           <AnimatePresence initial={false}>
//             {!collapsed && (
//               <motion.div
//                 initial={{
//                   opacity: 0,
//                   width: 0,
//                   x: -8,
//                 }}
//                 animate={{
//                   opacity: 1,
//                   width: "auto",
//                   x: 0,
//                 }}
//                 exit={{
//                   opacity: 0,
//                   width: 0,
//                   x: -8,
//                 }}
//                 transition={{
//                   duration: 0.25,
//                 }}
//                 className="min-w-0 flex-1 overflow-hidden"
//               >
//                 <h2 className="truncate text-[15px] font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
//                   JeevaAI
//                 </h2>

//                 <p className="mt-0.5 truncate text-[10px] font-semibold tracking-[0.1em] text-zinc-500">
//                   ENTERPRISE
//                 </p>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>

//         {/* Collapse */}
//         {!collapsed && (
//           <motion.button
//             onClick={onToggle}
//             aria-label="Collapse sidebar"
//             whileHover={{
//               scale: 1.1,
//               x: -1,
//             }}
//             whileTap={{
//               scale: 0.9,
//             }}
//             className="
//               ml-auto flex h-7 w-7 shrink-0
//               items-center justify-center
//               rounded-md
//               text-zinc-400
//               hover:bg-black/[0.05]
//               hover:text-zinc-700
//               dark:text-zinc-500
//               dark:hover:bg-white/[0.06]
//               dark:hover:text-zinc-300
//             "
//           >
//             <motion.span
//               animate={{
//                 x: 0,
//               }}
//               whileHover={{
//                 x: -2,
//               }}
//             >
//               <ChevronLeft size={15} />
//             </motion.span>
//           </motion.button>
//         )}
//       </motion.div>

//       {/* Expand Button */}
//       {collapsed && (
//         <motion.button
//           initial={{
//             opacity: 0,
//             scale: 0.8,
//           }}
//           animate={{
//             opacity: 1,
//             scale: 1,
//           }}
//           onClick={onToggle}
//           aria-label="Expand sidebar"
//           whileHover={{
//             scale: 1.1,
//             x: 2,
//           }}
//           whileTap={{
//             scale: 0.9,
//           }}
//           className="
//             mx-auto mt-3 flex h-7 w-7
//             items-center justify-center
//             rounded-md
//             text-zinc-400
//             hover:bg-black/[0.05]
//             hover:text-zinc-700
//             dark:text-zinc-500
//             dark:hover:bg-white/[0.06]
//             dark:hover:text-zinc-300
//           "
//         >
//           <ChevronRight size={15} />
//         </motion.button>
//       )}

//       {/* ======================================================
//           NAVIGATION
//       ====================================================== */}

//       <nav className="sidebar-scrollbar flex-1 overflow-y-auto px-3 py-4">
//         <div className="space-y-5">
//           {navigationGroups.map((group, groupIndex) => (
//             <motion.div
//               key={group.title}
//               initial={{
//                 opacity: 0,
//                 y: 8,
//               }}
//               animate={{
//                 opacity: 1,
//                 y: 0,
//               }}
//               transition={{
//                 delay: 0.1 + groupIndex * 0.06,
//                 duration: 0.3,
//               }}
//             >
//               {!collapsed && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="
//                     mb-1.5 px-3
//                     text-[10px]
//                     font-semibold
//                     tracking-[0.1em]
//                     text-zinc-400
//                     dark:text-zinc-500
//                   "
//                 >
//                   {group.title}
//                 </motion.div>
//               )}

//               {collapsed && (
//                 <motion.div
//                   initial={{ scaleX: 0 }}
//                   animate={{ scaleX: 1 }}
//                   className="
//                     mx-2 mb-2 h-px
//                     bg-black/[0.06]
//                     dark:bg-white/[0.06]
//                   "
//                 />
//               )}

//               <div className="space-y-0.5">
//                 {group.items.map((item, itemIndex) => (
//                   <SidebarItem
//                     key={item.path}
//                     item={item}
//                     collapsed={collapsed}
//                     index={
//                       groupIndex * 3 + itemIndex
//                     }
//                   />
//                 ))}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </nav>

//       {/* ======================================================
//           USER PROFILE
//       ====================================================== */}

//       <motion.div
//         ref={menuRef}
//         layout
//         className="
//           relative shrink-0
//           border-t border-black/[0.06]
//           p-2.5
//           dark:border-white/[0.06]
//         "
//       >
//         <motion.button
//           onClick={() =>
//             setMenuOpen((prev) => !prev)
//           }
//           whileHover={{
//             scale: 1.01,
//           }}
//           whileTap={{
//             scale: 0.98,
//           }}
//           className={`
//             flex w-full items-center
//             gap-2.5 rounded-lg
//             p-2 text-left
//             hover:bg-black/[0.04]
//             dark:hover:bg-white/[0.04]
//             ${collapsed ? "justify-center" : ""}
//           `}
//         >
//           <motion.div
//             whileHover={{
//               scale: 1.08,
//             }}
//             className="
//               flex h-8 w-8 shrink-0
//               items-center justify-center
//               rounded-full
//               bg-cyan-400
//               text-[11px] font-bold
//               text-[#071318]
//             "
//           >
//             AI
//           </motion.div>

//           {!collapsed && (
//             <>
//               <div className="min-w-0 flex-1">
//                 <div className="flex items-center gap-1.5">
//                   <p className="truncate text-[12px] font-semibold text-zinc-900 dark:text-zinc-100">
//                     JeevaAI
//                   </p>

//                   <span className="shrink-0 rounded bg-black/[0.06] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-zinc-600 dark:bg-white/[0.08] dark:text-zinc-400">
//                     JeevaAI
//                   </span>
//                 </div>

//                 <p className="mt-0.5 truncate text-[10px] text-zinc-500">
//                   Softcrowd Technologies
//                 </p>
//               </div>

//               <motion.div
//                 animate={{
//                   rotate: menuOpen ? 180 : 0,
//                 }}
//                 transition={{
//                   duration: 0.25,
//                 }}
//               >
//                 <ChevronDown
//                   size={14}
//                   className="shrink-0 text-zinc-400"
//                 />
//               </motion.div>
//             </>
//           )}
//         </motion.button>

//         {/* ====================================================
//             DROPDOWN
//         ==================================================== */}

//         <AnimatePresence>
//           {menuOpen && (
//             <motion.div
//               initial={{
//                 opacity: 0,
//                 y: 8,
//                 scale: 0.96,
//               }}
//               animate={{
//                 opacity: 1,
//                 y: 0,
//                 scale: 1,
//               }}
//               exit={{
//                 opacity: 0,
//                 y: 8,
//                 scale: 0.96,
//               }}
//               transition={{
//                 duration: 0.2,
//                 ease: "easeOut",
//               }}
//               className={`
//                 absolute bottom-full z-50 mb-2
//                 w-[240px] overflow-hidden
//                 rounded-xl border
//                 border-black/[0.08]
//                 bg-white p-1.5
//                 shadow-[0_8px_30px_rgba(0,0,0,0.12)]
//                 dark:border-white/[0.08]
//                 dark:bg-[#15161a]
//                 dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]
//                 ${collapsed ? "left-2" : "left-0"}
//               `}
//             >
//               {/* Org */}
//               <motion.div
//                 initial={{ opacity: 0, x: -8 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.05 }}
//                 className="
//                   flex items-center gap-2.5
//                   rounded-lg px-3 py-2.5
//                 "
//               >
//                 <div className="
//                   flex h-8 w-8 shrink-0
//                   items-center justify-center
//                   rounded-lg
//                   border border-cyan-500/30
//                   bg-cyan-500/[0.08]
//                 ">
//                   <span className="text-cyan-500 dark:text-cyan-400">
//                     ◈
//                   </span>
//                 </div>

//                 <div className="min-w-0 flex-1">
//                   <p className="truncate text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
//                     Softcrowd Technologies
//                   </p>
//                 </div>

//                 <span className="
//                   flex h-5 min-w-5
//                   items-center justify-center
//                   rounded-full
//                   bg-black/[0.06]
//                   px-1.5
//                   text-[10px] font-semibold
//                   text-zinc-600
//                   dark:bg-white/[0.08]
//                   dark:text-zinc-400
//                 ">
//                   1
//                 </span>
//               </motion.div>

//               <div className="my-1 h-px bg-black/[0.06] dark:bg-white/[0.06]" />

//               <MenuItem
//                 icon={UserRound}
//                 label="Profile"
//                 onClick={() =>
//                   handleNavigate("/settings")
//                 }
//               />

//               <MenuItem
//                 icon={Settings}
//                 label="Settings"
//                 onClick={() =>
//                   handleNavigate("/settings")
//                 }
//               />

//               <MenuItem
//                 icon={MessageSquare}
//                 label="Feedback"
//                 onClick={() =>
//                   handleNavigate("/feedback")
//                 }
//               />

//               {/* THEME */}
//               <div className="
//                 my-1 flex items-center
//                 justify-between rounded-lg
//                 px-3 py-2
//                 text-[13px] font-medium
//                 text-zinc-700
//                 dark:text-zinc-300
//               ">
//                 <div className="flex items-center gap-3">
//                   <span>Theme</span>
//                 </div>

//                 <ThemeToggle
//                   theme={theme}
//                   onToggle={onThemeToggle}
//                 />
//               </div>

//               <div className="my-1 h-px bg-black/[0.06] dark:bg-white/[0.06]" />

//               <MenuItem
//                 icon={LogOut}
//                 label="Log out"
//                 onClick={handleLogout}
//                 danger
//               />
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </motion.aside>
//   );
// }


// import React, { useState, useRef, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// import {
//   LayoutDashboard,
//   Bot,
//   BookOpen,
//   Grid3X3,
//   Megaphone,
//   PhoneCall,
//   Users,
//   Cable,
//   Settings,
//   CreditCard,
//   BarChart3,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   LogOut,
//   UserRound,
//   MessageSquare,
//   Building2,
// } from "lucide-react";

// import ThemeToggle from "./ThemeToggle";

// import {
//   normalizeRole,
//   canAccessModule,
//   getRoleHome,
// } from "../utils/permissionModules";

// // ============================================================
// // NAVIGATION
// // ============================================================

// const navigationGroups = [
//   {
//     title: "PLATFORM",
//     items: [
//       {
//         label: "Dashboard",
//         icon: LayoutDashboard,
//         module: "dashboard",
//         dashboard: true,
//       },
//       {
//         label: "Agents",
//         icon: Bot,
//         path: "/agents",
//         module: "agents",
//       },
//       {
//         label: "Knowledge Base",
//         icon: BookOpen,
//         path: "/knowledge-base",
//         module: "knowledge-base",
//       },
//     ],
//   },
//   {
//     title: "CAMPAIGNS",
//     items: [
//       {
//         label: "Inbound",
//         icon: Grid3X3,
//         path: "/inbound",
//         module: "campaigns",
//       },
//       {
//         label: "Outbound",
//         icon: Megaphone,
//         path: "/outbound",
//         module: "campaigns",
//       },
//     ],
//   },
//   {
//     title: "MANAGEMENT",
//     items: [
//       {
//         label: "All Calls History",
//         icon: PhoneCall,
//         path: "/calls",
//         module: "calls",
//       },
//       {
//         label: "Contacts",
//         icon: Users,
//         path: "/contacts",
//         module: "contacts",
//       },
//       {
//         label: "Integrations",
//         icon: Cable,
//         path: "/integrations",
//         module: "integrations",
//       },
//     ],
//   },
//   {
//     title: "OPERATIONS",
//     items: [
//       {
//         label: "Phone Number",
//         icon: BarChart3,
//         path: "/phone-numbers",
//         module: "phone-numbers",
//       },
//       {
//         label: "Billing",
//         icon: CreditCard,
//         path: "/billing",
//         module: "billing",
//       },
//     ],
//   },
// ];

// // ============================================================
// // HELPERS
// // ============================================================

// function getInitials(name) {
//   if (!name || typeof name !== "string") return "AI";

//   const parts = name.trim().split(" ").filter(Boolean);

//   if (parts.length === 0) return "AI";

//   if (parts.length === 1) {
//     return parts[0].substring(0, 2).toUpperCase();
//   }

//   return (
//     parts[0][0] + parts[parts.length - 1][0]
//   ).toUpperCase();
// }

// function readStoredObject(key) {
//   try {
//     const raw = localStorage.getItem(key);
//     return raw ? JSON.parse(raw) : null;
//   } catch {
//     return null;
//   }
// }

// // ============================================================
// // AUTHENTICATED USER
// // ============================================================

// function getCurrentUser() {
//   const auth = readStoredObject("ravanai_auth") || {};
//   const authUser = auth.user || {};

//   const savedUser = readStoredObject("ravanai_user") || {};
//   const legacyUser = readStoredObject("user") || {};

//   const user = {
//     ...legacyUser,
//     ...savedUser,
//     ...authUser,
//   };

//   const role = normalizeRole(
//     auth.role || user.role || user.user_role
//   );

//   const name =
//     user.full_name ||
//     user.name ||
//     [user.first_name, user.last_name]
//       .filter(Boolean)
//       .join(" ") ||
//     user.email ||
//     "Guest User";

//   const organization =
//     user.organization_name ||
//     user.organization ||
//     user.organizationName ||
//     auth.organization ||
//     user.company ||
//     user.companyName ||
//     "JeevaAI";

//   return {
//     ...user,
//     name,
//     role,
//     organization,
//   };
// }

// function getRoleTitle(role) {
//   const titles = {
//     superadmin: "SUPERADMIN",
//     admin: "ADMIN",
//     user: "USER",
//   };

//   return titles[role] || "MEMBER";
// }


// function useCurrentUser() {
//   const [user, setUser] = useState(() => getCurrentUser());

//   useEffect(() => {
//     const updateUser = () => {
//       setUser(getCurrentUser());
//     };

//     window.addEventListener("storage", updateUser);
//     window.addEventListener("auth-updated", updateUser);

//     return () => {
//       window.removeEventListener("storage", updateUser);
//       window.removeEventListener("auth-updated", updateUser);
//     };
//   }, []);

//   return user;
// }


// // ============================================================
// // SIDEBAR ITEM — RIPPLE + GRADIENT HOVER
// // ============================================================

// function SidebarItem({ item, collapsed, index }) {
//   const Icon = item.icon;
//   const [ripple, setRipple] = useState(false);

//   const handleClick = () => {
//     setRipple(true);
//     setTimeout(() => setRipple(false), 600);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -14 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{
//         delay: 0.06 + index * 0.035,
//         duration: 0.35,
//         ease: [0.22, 1, 0.36, 1],
//       }}
//     >
//       <NavLink
//         to={item.path}
//         title={collapsed ? item.label : undefined}
//         onClick={handleClick}
//         className={({ isActive }) => `
//           group relative flex items-center gap-3
//           rounded-lg overflow-hidden
//           ${collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2"}
//           text-[13px] font-medium
//           transition-all duration-200
//           ${
//             isActive
//               ? "bg-gradient-to-r from-cyan-500/[0.14] to-cyan-500/[0.03] text-cyan-600 dark:from-cyan-400/[0.16] dark:to-cyan-400/[0.03] dark:text-cyan-400"
//               : "text-zinc-600 hover:bg-gradient-to-r hover:from-black/[0.05] hover:to-transparent hover:text-zinc-900 dark:text-zinc-400 dark:hover:from-white/[0.06] dark:hover:to-transparent dark:hover:text-zinc-100"
//           }
//         `}
//       >
//         {({ isActive }) => (
//           <>
//             <AnimatePresence>
//               {isActive && (
//                 <>
//                   <motion.span
//                     layoutId="sidebar-active-indicator"
//                     initial={{ opacity: 0, scaleY: 0 }}
//                     animate={{ opacity: 1, scaleY: 1 }}
//                     exit={{ opacity: 0, scaleY: 0 }}
//                     transition={{
//                       duration: 0.25,
//                       type: "spring",
//                       stiffness: 400,
//                     }}
//                     className="
//                       absolute left-0 top-1/2
//                       h-6 w-[3px]
//                       -translate-y-1/2
//                       rounded-r-full
//                       bg-cyan-500
//                       dark:bg-cyan-400
//                     "
//                   />

//                   <motion.span
//                     layoutId="sidebar-active-glow"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="
//                       pointer-events-none absolute left-0 top-1/2
//                       h-6 w-6 -translate-y-1/2 -translate-x-2
//                       rounded-full bg-cyan-500/25 blur-md
//                       dark:bg-cyan-400/30
//                     "
//                   />
//                 </>
//               )}
//             </AnimatePresence>

//             <AnimatePresence>
//               {ripple && (
//                 <motion.span
//                   initial={{ scale: 0, opacity: 0.6 }}
//                   animate={{ scale: 4, opacity: 0 }}
//                   exit={{ opacity: 0 }}
//                   transition={{
//                     duration: 0.6,
//                     ease: "easeOut",
//                   }}
//                   className="
//                     pointer-events-none absolute left-1/2 top-1/2
//                     h-8 w-8 -translate-x-1/2 -translate-y-1/2
//                     rounded-full bg-cyan-400/40
//                   "
//                 />
//               )}
//             </AnimatePresence>

//             <motion.div
//               whileHover={{
//                 scale: 1.2,
//                 rotate: isActive ? 0 : 6,
//               }}
//               whileTap={{ scale: 0.85 }}
//               transition={{
//                 type: "spring",
//                 stiffness: 400,
//                 damping: 17,
//               }}
//               className="relative z-10 shrink-0"
//             >
//               {isActive ? (
//                 <motion.div
//                   animate={{ scale: [1, 1.08, 1] }}
//                   transition={{
//                     duration: 2.4,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                   }}
//                 >
//                   <Icon size={17} strokeWidth={2.2} />
//                 </motion.div>
//               ) : (
//                 <Icon size={17} strokeWidth={1.8} />
//               )}
//             </motion.div>

//             <AnimatePresence initial={false}>
//               {!collapsed && (
//                 <motion.span
//                   initial={{ opacity: 0, x: -8 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -8 }}
//                   transition={{
//                     duration: 0.2,
//                     ease: "easeOut",
//                   }}
//                   className="truncate relative z-10"
//                 >
//                   {item.label}
//                 </motion.span>
//               )}
//             </AnimatePresence>
//           </>
//         )}
//       </NavLink>
//     </motion.div>
//   );
// }

// // ============================================================
// // MENU ITEM
// // ============================================================

// function MenuItem({
//   icon: Icon,
//   label,
//   onClick,
//   danger = false,
//   delay = 0,
// }) {
//   return (
//     <motion.button
//       type="button"
//       initial={{ opacity: 0, x: -8 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ delay, duration: 0.2 }}
//       onClick={onClick}
//       whileHover={{ x: 5, scale: 1.02 }}
//       whileTap={{ scale: 0.97 }}
//       className={`
//         flex w-full items-center gap-3
//         rounded-lg px-3 py-2.5
//         text-left text-[13px] font-medium
//         transition-colors
//         ${
//           danger
//             ? "text-red-500 hover:bg-red-500/[0.08] dark:text-red-400 dark:hover:bg-red-500/[0.10]"
//             : "text-zinc-700 hover:bg-black/[0.04] dark:text-zinc-300 dark:hover:bg-white/[0.05]"
//         }
//       `}
//     >
//       <motion.div
//         whileHover={{ scale: 1.15, rotate: 4 }}
//         transition={{
//           type: "spring",
//           stiffness: 400,
//           damping: 17,
//         }}
//       >
//         <Icon size={16} className="shrink-0" />
//       </motion.div>

//       <span>{label}</span>
//     </motion.button>
//   );
// }

// // ============================================================
// // SIDEBAR
// // ============================================================

// export default function Sidebar({
//   collapsed = false,
//   onToggle,
//   theme,
//   onThemeToggle,
// }) {
//   const navigate = useNavigate();

//   const [menuOpen, setMenuOpen] = useState(false);
//   const menuRef = useRef(null);

//   const user = useCurrentUser();

//   const userInitials = getInitials(user?.name);
//   const userName = user?.name || "Guest User";
//   const userRole = getRoleTitle(user?.role);
//   const userOrg = user?.organization || "JeevaAI";

//   const displayName =
//     userName.length > 16
//       ? userName.substring(0, 14) + "..."
//       : userName;

//   // ==========================================================
//   // ROLE-BASED NAVIGATION
//   // ==========================================================

//   const roleHome = getRoleHome(user?.role);

//   const visibleNavigationGroups = navigationGroups
//     .map((group) => ({
//       ...group,
//       items: group.items
//         .filter((item) =>
//           canAccessModule(user?.role, item.module)
//         )
//         .map((item) => ({
//           ...item,
//           path: item.dashboard ? roleHome : item.path,
//         })),
//     }))
//     .filter((group) => group.items.length > 0);

//   // ==========================================================
//   // DROPDOWN EVENTS
//   // ==========================================================

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         menuRef.current &&
//         !menuRef.current.contains(event.target)
//       ) {
//         setMenuOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener(
//         "mousedown",
//         handleClickOutside
//       );
//     };
//   }, []);

//   useEffect(() => {
//     const handleKey = (event) => {
//       if (event.key === "Escape") {
//         setMenuOpen(false);
//       }
//     };

//     document.addEventListener("keydown", handleKey);

//     return () => {
//       document.removeEventListener("keydown", handleKey);
//     };
//   }, []);

//   // ==========================================================
//   // LOGOUT
//   // ==========================================================


// const handleLogout = () => {
//   localStorage.removeItem("user");
//   localStorage.removeItem("ravanai_user");
//   localStorage.removeItem("ravanai_auth");
//   localStorage.removeItem("access_token");
//   localStorage.removeItem("refresh_token");

//   window.dispatchEvent(new Event("auth-updated"));

//   setMenuOpen(false);
//   navigate("/login", { replace: true });
// };


//   const handleNavigate = (path) => {
//     setMenuOpen(false);
//     navigate(path);
//   };

//   // ==========================================================
//   // RENDER
//   // ==========================================================

//   return (
//     <motion.aside
//       initial={{ x: -30, opacity: 0, rotateY: -8 }}
//       animate={{ x: 0, opacity: 1, rotateY: 0 }}
//       transition={{
//         duration: 0.55,
//         ease: [0.22, 1, 0.36, 1],
//       }}
//       style={{ transformPerspective: 1200 }}
//       className={`
//         fixed inset-y-0 left-0 z-50
//         hidden flex-col
//         border-r
//         border-black/[0.08]
//         bg-white
//         dark:border-white/[0.06]
//         dark:bg-[#0a0b0e]
//         lg:flex
//         transition-[width] duration-300 ease-out
//         ${collapsed ? "w-[72px]" : "w-[260px]"}
//       `}
//     >
//       <style>{`
//         .sidebar-scrollbar::-webkit-scrollbar {
//           width: 6px;
//           height: 6px;
//         }

//         .sidebar-scrollbar::-webkit-scrollbar-track {
//           background: transparent;
//         }

//         .sidebar-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(120,120,130,0.35);
//           border-radius: 9999px;
//         }

//         .sidebar-scrollbar {
//           scrollbar-width: thin;
//         }
//       `}</style>

//       {/* BRAND */}

//       <motion.div
//         layout
//         className={`
//           flex h-[68px] shrink-0 items-center
//           border-b border-black/[0.06]
//           dark:border-white/[0.06]
//           ${collapsed ? "justify-center px-2" : "px-5"}
//         `}
//       >
//         <motion.div
//           layout
//           className={`flex min-w-0 items-center ${
//             collapsed ? "justify-center" : "gap-2.5"
//           }`}
//         >
//           <motion.div
//             whileHover={{ scale: 1.1, rotate: 6 }}
//             whileTap={{ scale: 0.95 }}
//             transition={{
//               type: "spring",
//               stiffness: 400,
//               damping: 17,
//             }}
//             className="
//               relative flex h-9 w-9 shrink-0
//               items-center justify-center
//               overflow-hidden rounded-full
//               border border-orange-400/30
//               bg-zinc-100
//               dark:bg-[#17181c]
//             "
//           >
//             <img
//               src="/logo.svg"
//               alt="JEEVA"
//               className="h-full w-full object-cover"
//               onError={(event) => {
//                 event.currentTarget.style.display = "none";

//                 if (event.currentTarget.nextElementSibling) {
//                   event.currentTarget.nextElementSibling.style.display =
//                     "flex";
//                 }
//               }}
//             />

//             <span className="hidden h-full w-full items-center justify-center text-sm font-bold text-orange-400">
//               AG
//             </span>

//             <motion.span
//               animate={{
//                 opacity: [0.6, 0, 0.6],
//                 scale: [1, 1.4, 1],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//               className="
//                 pointer-events-none absolute inset-0
//                 rounded-full border border-orange-400/50
//               "
//             />
//           </motion.div>

//           <AnimatePresence initial={false}>
//             {!collapsed && (
//               <motion.div
//                 initial={{ opacity: 0, width: 0, x: -8 }}
//                 animate={{ opacity: 1, width: "auto", x: 0 }}
//                 exit={{ opacity: 0, width: 0, x: -8 }}
//                 transition={{ duration: 0.25 }}
//                 className="min-w-0 flex-1 overflow-hidden"
//               >
//                 <h2 className="truncate text-[15px] font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
//                   JEEVA
//                 </h2>

//                 <p className="mt-0.5 truncate text-[10px] font-semibold tracking-[0.1em] text-zinc-500"></p>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>

//         {!collapsed && (
//           <motion.button
//             type="button"
//             onClick={onToggle}
//             aria-label="Collapse sidebar"
//             whileHover={{ scale: 1.12, x: -3 }}
//             whileTap={{ scale: 0.9 }}
//             transition={{
//               type: "spring",
//               stiffness: 400,
//               damping: 17,
//             }}
//             className="
//               ml-auto flex h-7 w-7 shrink-0
//               items-center justify-center
//               rounded-md
//               text-zinc-400
//               hover:bg-black/[0.05]
//               hover:text-zinc-700
//               dark:text-zinc-500
//               dark:hover:bg-white/[0.06]
//               dark:hover:text-zinc-300
//             "
//           >
//             <motion.div
//               whileHover={{ rotate: -8 }}
//               transition={{
//                 type: "spring",
//                 stiffness: 400,
//                 damping: 15,
//               }}
//             >
//               <ChevronLeft size={15} />
//             </motion.div>
//           </motion.button>
//         )}
//       </motion.div>

//       {/* EXPAND BUTTON */}

//       {collapsed && (
//         <motion.button
//           type="button"
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           onClick={onToggle}
//           aria-label="Expand sidebar"
//           whileHover={{ scale: 1.15, x: 3 }}
//           whileTap={{ scale: 0.9 }}
//           transition={{
//             type: "spring",
//             stiffness: 400,
//             damping: 17,
//           }}
//           className="
//             mx-auto mt-3 flex h-7 w-7
//             items-center justify-center
//             rounded-md
//             text-zinc-400
//             hover:bg-black/[0.05]
//             hover:text-zinc-700
//             dark:text-zinc-500
//             dark:hover:bg-white/[0.06]
//             dark:hover:text-zinc-300
//           "
//         >
//           <motion.div
//             whileHover={{ rotate: 8 }}
//             transition={{
//               type: "spring",
//               stiffness: 400,
//               damping: 15,
//             }}
//           >
//             <ChevronRight size={15} />
//           </motion.div>
//         </motion.button>
//       )}

//       {/* NAVIGATION */}

//       <nav className="sidebar-scrollbar flex-1 overflow-y-auto px-3 py-4">
//         <div className="space-y-5">
//           {visibleNavigationGroups.map((group, groupIndex) => (
//             <motion.div
//               key={group.title}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{
//                 delay: 0.1 + groupIndex * 0.07,
//                 duration: 0.35,
//                 ease: [0.22, 1, 0.36, 1],
//               }}
//             >
//               {!collapsed && (
//                 <motion.div
//                   initial={{ opacity: 0, x: -6 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{
//                     delay: 0.15 + groupIndex * 0.07,
//                   }}
//                   className="
//                     mb-1.5 px-3
//                     text-[10px] font-semibold
//                     tracking-[0.1em]
//                     text-zinc-400
//                     dark:text-zinc-500
//                   "
//                 >
//                   {group.title}
//                 </motion.div>
//               )}

//               {collapsed && (
//                 <motion.div
//                   initial={{ scaleX: 0 }}
//                   animate={{ scaleX: 1 }}
//                   transition={{
//                     delay: 0.15 + groupIndex * 0.07,
//                     duration: 0.3,
//                   }}
//                   className="
//                     mx-2 mb-2 h-px
//                     bg-black/[0.06]
//                     dark:bg-white/[0.06]
//                   "
//                 />
//               )}

//               <div className="space-y-0.5">
//                 {group.items.map((item, itemIndex) => (
//                   <SidebarItem
//                     key={item.path}
//                     item={item}
//                     collapsed={collapsed}
//                     index={groupIndex * 3 + itemIndex}
//                   />
//                 ))}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </nav>

//       {/* USER PROFILE */}

//       <motion.div
//         ref={menuRef}
//         layout
//         className="
//           relative shrink-0
//           border-t border-black/[0.06]
//           p-2.5
//           dark:border-white/[0.06]
//         "
//       >
//         <motion.button
//           type="button"
//           onClick={() => setMenuOpen((prev) => !prev)}
//           whileHover={{ scale: 1.01 }}
//           whileTap={{ scale: 0.98 }}
//           className={`
//             flex w-full items-center
//             gap-2.5 rounded-lg
//             p-2 text-left
//             hover:bg-black/[0.04]
//             dark:hover:bg-white/[0.04]
//             ${collapsed ? "justify-center" : ""}
//           `}
//         >
//           <motion.div
//             whileHover={{ scale: 1.1, rotate: 5 }}
//             animate={
//               menuOpen
//                 ? { scale: [1, 1.08, 1] }
//                 : { scale: 1 }
//             }
//             transition={
//               menuOpen
//                 ? {
//                     duration: 1.2,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                   }
//                 : {
//                     type: "spring",
//                     stiffness: 400,
//                     damping: 17,
//                   }
//             }
//             className="
//               flex h-8 w-8 shrink-0
//               items-center justify-center
//               rounded-full
//               bg-cyan-400
//               text-[11px] font-bold
//               text-[#071318]
//             "
//           >
//             {userInitials}
//           </motion.div>

//           {!collapsed && (
//             <>
//               <div className="min-w-0 flex-1">
//                 <div className="flex items-center gap-1.5">
//                   <p className="truncate text-[12px] font-semibold text-zinc-900 dark:text-zinc-100">
//                     {displayName}
//                   </p>

//                   <span className="shrink-0 rounded bg-black/[0.06] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-zinc-600 dark:bg-white/[0.08] dark:text-zinc-400">
//                     {userRole}
//                   </span>
//                 </div>

//                 <p className="mt-0.5 truncate text-[10px] text-zinc-500">
//                   {userOrg}
//                 </p>
//               </div>

//               <motion.div
//                 animate={{ rotate: menuOpen ? 180 : 0 }}
//                 transition={{
//                   type: "spring",
//                   stiffness: 400,
//                   damping: 20,
//                 }}
//               >
//                 <ChevronDown
//                   size={14}
//                   className="shrink-0 text-zinc-400"
//                 />
//               </motion.div>
//             </>
//           )}
//         </motion.button>

//         {/* DROPDOWN */}

//         <AnimatePresence>
//           {menuOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: 12, scale: 0.94 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: 12, scale: 0.94 }}
//               transition={{
//                 type: "spring",
//                 stiffness: 400,
//                 damping: 28,
//               }}
//               className={`
//                 absolute bottom-full z-50 mb-2
//                 w-[240px] overflow-hidden
//                 rounded-xl border
//                 border-black/[0.08]
//                 bg-white p-1.5
//                 shadow-[0_8px_30px_rgba(0,0,0,0.12)]
//                 dark:border-white/[0.08]
//                 dark:bg-[#15161a]
//                 dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]
//                 ${collapsed ? "left-2" : "left-0"}
//               `}
//             >
//               <motion.div
//                 initial={{ opacity: 0, x: -8 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.05 }}
//                 className="flex items-center gap-2.5 rounded-lg px-3 py-2.5"
//               >
//                 <div className="
//                   flex h-8 w-8 shrink-0 items-center justify-center
//                   rounded-lg border border-cyan-500/30 bg-cyan-500/[0.08]
//                 ">
//                   <motion.span
//                     animate={{ rotate: [0, 360] }}
//                     transition={{
//                       duration: 8,
//                       repeat: Infinity,
//                       ease: "linear",
//                     }}
//                     className="text-cyan-500 dark:text-cyan-400"
//                   >
//                     ◈
//                   </motion.span>
//                 </div>

//                 <div className="min-w-0 flex-1">
//                   <p className="truncate text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
//                     {userOrg}
//                   </p>
//                 </div>

//                 <span className="
//                   flex h-5 min-w-5 items-center justify-center
//                   rounded-full bg-black/[0.06] px-1.5
//                   text-[10px] font-semibold text-zinc-600
//                   dark:bg-white/[0.08] dark:text-zinc-400
//                 ">
//                   1
//                 </span>
//               </motion.div>

//               <div className="my-1 h-px bg-black/[0.06] dark:bg-white/[0.06]" />

//               <MenuItem
//                 icon={UserRound}
//                 label="Profile"
//                 onClick={() => handleNavigate("/settings")}
//                 delay={0.08}
//               />

//               <MenuItem
//                 icon={Settings}
//                 label="Settings"
//                 onClick={() => handleNavigate("/settings")}
//                 delay={0.12}
//               />

//               <MenuItem
//                 icon={MessageSquare}
//                 label="Feedback"
//                 onClick={() => handleNavigate("/feedback")}
//                 delay={0.16}
//               />

//               <div className="
//                 my-1 flex items-center justify-between rounded-lg
//                 px-3 py-2 text-[13px] font-medium
//                 text-zinc-700 dark:text-zinc-300
//               ">
//                 <div className="flex items-center gap-3">
//                   <span>Theme</span>
//                 </div>

//                 <ThemeToggle
//                   theme={theme}
//                   onToggle={onThemeToggle}
//                 />
//               </div>

//               <div className="my-1 h-px bg-black/[0.06] dark:bg-white/[0.06]" />

//               <MenuItem
//                 icon={LogOut}
//                 label="Log out"
//                 onClick={handleLogout}
//                 danger
//                 delay={0.2}
//               />
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </motion.aside>
//   );
// }


import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  LayoutDashboard,
  Bot,
  BookOpen,
  Grid3X3,
  Megaphone,
  PhoneCall,
  Users,
  Cable,
  Settings,
  CreditCard,
  BarChart3,
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LogOut,
  UserRound,
  MessageSquare,
  ShieldCheck,
  History,
  Coins,
} from "lucide-react";

import ThemeToggle from "./ThemeToggle";

import {
  normalizeRole,
  canAccessModule,
  getRoleHome,
} from "../utils/permissionModules";

// ============================================================
// ROLE-BASED NAVIGATION CONFIGURATION
//
// SUPERADMIN:
// Platform-level modules.
//
// ADMIN:
// Organization-level modules.
//
// USER:
// Only modules permitted in permissionModules.js.
//
// IMPORTANT:
// Every item's module must match ROLE_MODULES in
// src/utils/permissionModules.js.
//
// A navigation item is displayed only when BOTH its module
// permission and its optional role restriction are satisfied.
// ============================================================

const navigationGroups = [
  // ----------------------------------------------------------
  // PLATFORM
  // ----------------------------------------------------------
  {
    title: "PLATFORM",
    items: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        module: "dashboard",
        dashboard: true,
      },
      {
        label: "Organizations",
        icon: Building2,
        path: "/superadmin/organizations",
        module: "organizations",
        roles: ["superadmin"],
      },
      {
        label: "Agents",
        icon: Bot,
        path: "/agents",
        module: "agents",
        roles: ["admin"],
      },
      {
        label: "Knowledge Base",
        icon: BookOpen,
        path: "/knowledge-base",
        module: "knowledge-base",
        roles: ["admin"],
      },
    ],
  },

  // ----------------------------------------------------------
  // SUPERADMIN PLATFORM MANAGEMENT
  // ----------------------------------------------------------
  {
    title: "PLATFORM MANAGEMENT",
    items: [
      {
        label: "Platform Users",
        icon: Users,
        path: "/superadmin/users",
        module: "users",
        roles: ["superadmin"],
      },
      {
        label: "Credits",
        icon: Coins,
        path: "/superadmin/credits",
        module: "credits",
        roles: ["superadmin"],
      },
      {
        label: "Transactions",
        icon: CreditCard,
        path: "/superadmin/transactions",
        module: "transactions",
        roles: ["superadmin"],
      },
      {
        label: "Platform Analytics",
        icon: BarChart3,
        path: "/superadmin/analytics",
        module: "analytics",
        roles: ["superadmin"],
      },
      {
        label: "Audit Logs",
        icon: History,
        path: "/superadmin/audit-logs",
        module: "audit-logs",
        roles: ["superadmin"],
      },
    ],
  },

  // ----------------------------------------------------------
  // ADMIN CAMPAIGNS
  // ----------------------------------------------------------
  {
    title: "CAMPAIGNS",
    items: [
      {
        label: "Inbound",
        icon: Grid3X3,
        path: "/inbound",
        module: "campaigns",
        roles: ["admin"],
      },
      {
        label: "Outbound",
        icon: Megaphone,
        path: "/outbound",
        module: "campaigns",
        roles: ["admin"],
      },
    ],
  },

  // ----------------------------------------------------------
  // ADMIN MANAGEMENT
  // ----------------------------------------------------------
  {
    title: "MANAGEMENT",
    items: [
      {
        label: "All Calls History",
        icon: PhoneCall,
        path: "/calls",
        module: "calls",
        roles: ["admin"],
      },
      {
        label: "Contacts",
        icon: Users,
        path: "/contacts",
        module: "contacts",
        roles: ["admin"],
      },
      {
        label: "Integrations",
        icon: Cable,
        path: "/integrations",
        module: "integrations",
        roles: ["admin"],
      },
    ],
  },

  // ----------------------------------------------------------
  // ADMIN OPERATIONS
  // ----------------------------------------------------------
  {
    title: "OPERATIONS",
    items: [
      {
        label: "Phone Numbers",
        icon: PhoneCall,
        path: "/phone-numbers",
        module: "phone-numbers",
        roles: ["admin"],
      },
      {
        label: "Billing",
        icon: CreditCard,
        path: "/billing",
        module: "billing",
        roles: ["admin"],
      },
    ],
  },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

// Generate initials for the logged-in user.
function getInitials(name) {
  if (!name || typeof name !== "string") return "AI";

  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "AI";

  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }

  return (
    parts[0][0] + parts[parts.length - 1][0]
  ).toUpperCase();
}

// Safely read JSON data from localStorage.
function readStoredObject(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// ============================================================
// GET AUTHENTICATED USER
//
// Reads the current user's information from existing auth
// storage. Supports:
// - ravanai_auth
// - ravanai_user
// - legacy user
// ============================================================

function getCurrentUser() {
  const auth = readStoredObject("ravanai_auth") || {};
  const authUser = auth.user || {};

  const savedUser = readStoredObject("ravanai_user") || {};
  const legacyUser = readStoredObject("user") || {};

  const user = {
    ...legacyUser,
    ...savedUser,
    ...authUser,
  };

  const role = normalizeRole(
    auth.role ||
      user.role ||
      user.user_role ||
      user.role_name
  );

  const name =
    user.full_name ||
    user.name ||
    [user.first_name, user.last_name]
      .filter(Boolean)
      .join(" ") ||
    user.email ||
    "Guest User";

  const organization =
    user.organization_name ||
    user.organization ||
    user.organizationName ||
    auth.organization ||
    user.company ||
    user.companyName ||
    "JeevaAI";

  return {
    ...user,
    name,
    role,
    organization,
  };
}

// ============================================================
// ROLE DISPLAY LABEL
// ============================================================

function getRoleTitle(role) {
  const titles = {
    superadmin: "SUPERADMIN",
    admin: "ADMIN",
    user: "USER",
  };

  return titles[role] || "MEMBER";
}

// ============================================================
// CURRENT USER HOOK
//
// Updates sidebar when authentication changes in this tab
// or another browser tab.
// ============================================================

function useCurrentUser() {
  const [user, setUser] = useState(() => getCurrentUser());

  useEffect(() => {
    const updateUser = () => {
      setUser(getCurrentUser());
    };

    window.addEventListener("storage", updateUser);
    window.addEventListener("auth-updated", updateUser);

    return () => {
      window.removeEventListener("storage", updateUser);
      window.removeEventListener("auth-updated", updateUser);
    };
  }, []);

  return user;
}

// ============================================================
// SIDEBAR ITEM
//
// Includes active route indicator, hover animation,
// click ripple animation and collapsed tooltip.
// ============================================================

function SidebarItem({ item, collapsed, index }) {
  const Icon = item.icon;
  const [ripple, setRipple] = useState(false);

  const handleClick = () => {
    setRipple(true);
    setTimeout(() => setRipple(false), 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 0.06 + index * 0.035,
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <NavLink
        to={item.path}
        title={collapsed ? item.label : undefined}
        onClick={handleClick}
        className={({ isActive }) => `
          group relative flex items-center gap-3
          rounded-lg overflow-hidden
          ${collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2"}
          text-[13px] font-medium
          transition-all duration-200
          ${
            isActive
              ? "bg-gradient-to-r from-cyan-500/[0.14] to-cyan-500/[0.03] text-cyan-600 dark:from-cyan-400/[0.16] dark:to-cyan-400/[0.03] dark:text-cyan-400"
              : "text-zinc-600 hover:bg-gradient-to-r hover:from-black/[0.05] hover:to-transparent hover:text-zinc-900 dark:text-zinc-400 dark:hover:from-white/[0.06] dark:hover:to-transparent dark:hover:text-zinc-100"
          }
        `}
      >
        {({ isActive }) => (
          <>
            {/* Active route indicator */}
            <AnimatePresence>
              {isActive && (
                <>
                  <motion.span
                    layoutId="sidebar-active-indicator"
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    exit={{ opacity: 0, scaleY: 0 }}
                    transition={{
                      duration: 0.25,
                      type: "spring",
                      stiffness: 400,
                    }}
                    className="
                      absolute left-0 top-1/2
                      h-6 w-[3px]
                      -translate-y-1/2
                      rounded-r-full
                      bg-cyan-500
                      dark:bg-cyan-400
                    "
                  />

                  <motion.span
                    layoutId="sidebar-active-glow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="
                      pointer-events-none absolute left-0 top-1/2
                      h-6 w-6 -translate-y-1/2 -translate-x-2
                      rounded-full bg-cyan-500/25 blur-md
                      dark:bg-cyan-400/30
                    "
                  />
                </>
              )}
            </AnimatePresence>

            {/* Click ripple effect */}
            <AnimatePresence>
              {ripple && (
                <motion.span
                  initial={{ scale: 0, opacity: 0.6 }}
                  animate={{ scale: 4, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  className="
                    pointer-events-none absolute left-1/2 top-1/2
                    h-8 w-8 -translate-x-1/2 -translate-y-1/2
                    rounded-full bg-cyan-400/40
                  "
                />
              )}
            </AnimatePresence>

            {/* Navigation icon */}
            <motion.div
              whileHover={{
                scale: 1.2,
                rotate: isActive ? 0 : 6,
              }}
              whileTap={{ scale: 0.85 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
              className="relative z-10 shrink-0"
            >
              {isActive ? (
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Icon size={17} strokeWidth={2.2} />
                </motion.div>
              ) : (
                <Icon size={17} strokeWidth={1.8} />
              )}
            </motion.div>

            {/* Navigation label */}
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                  className="truncate relative z-10"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </>
        )}
      </NavLink>
    </motion.div>
  );
}

// ============================================================
// PROFILE DROPDOWN ITEM
// ============================================================

function MenuItem({
  icon: Icon,
  label,
  onClick,
  danger = false,
  delay = 0,
}) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.2 }}
      onClick={onClick}
      whileHover={{ x: 5, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`
        flex w-full items-center gap-3
        rounded-lg px-3 py-2.5
        text-left text-[13px] font-medium
        transition-colors
        ${
          danger
            ? "text-red-500 hover:bg-red-500/[0.08] dark:text-red-400 dark:hover:bg-red-500/[0.10]"
            : "text-zinc-700 hover:bg-black/[0.04] dark:text-zinc-300 dark:hover:bg-white/[0.05]"
        }
      `}
    >
      <motion.div
        whileHover={{ scale: 1.15, rotate: 4 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 17,
        }}
      >
        <Icon size={16} className="shrink-0" />
      </motion.div>

      <span>{label}</span>
    </motion.button>
  );
}

// ============================================================
// MAIN SIDEBAR COMPONENT
// ============================================================

export default function Sidebar({
  collapsed = false,
  onToggle,
  theme,
  onThemeToggle,
}) {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const user = useCurrentUser();

  // ----------------------------------------------------------
  // CURRENT USER DETAILS
  // ----------------------------------------------------------

  const userInitials = getInitials(user?.name);
  const userName = user?.name || "Guest User";
  const userRole = getRoleTitle(user?.role);
  const userOrg = user?.organization || "JeevaAI";

  const displayName =
    userName.length > 16
      ? userName.substring(0, 14) + "..."
      : userName;

  // ----------------------------------------------------------
  // ROLE-BASED NAVIGATION
  //
  // Module permissions come from permissionModules.js.
  // Backend RBAC remains the final authority for API access.
  // ----------------------------------------------------------

  const roleHome = getRoleHome(user?.role);

  const visibleNavigationGroups = navigationGroups
    .map((group) => ({
      ...group,
      items: group.items
        .filter((item) => {
          const moduleAllowed = canAccessModule(
            user?.role,
            item.module
          );

          const roleAllowed =
            !item.roles || item.roles.includes(user?.role);

          return moduleAllowed && roleAllowed;
        })
        .map((item) => ({
          ...item,
          path: item.dashboard ? roleHome : item.path,
        })),
    }))
    .filter((group) => group.items.length > 0);

  // ----------------------------------------------------------
  // CLOSE PROFILE MENU WHEN CLICKING OUTSIDE
  // ----------------------------------------------------------

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // ----------------------------------------------------------
  // CLOSE PROFILE MENU WITH ESCAPE KEY
  // ----------------------------------------------------------

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  // ----------------------------------------------------------
  // LOGOUT
  //
  // Clears the authentication values used by this project.
  // ----------------------------------------------------------

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("ravanai_user");
    localStorage.removeItem("ravanai_auth");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    window.dispatchEvent(new Event("auth-updated"));

    setMenuOpen(false);

    navigate("/login", { replace: true });
  };

  // ----------------------------------------------------------
  // PROFILE MENU NAVIGATION
  // ----------------------------------------------------------

  const handleNavigate = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <motion.aside
      initial={{ x: -30, opacity: 0, rotateY: -8 }}
      animate={{ x: 0, opacity: 1, rotateY: 0 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transformPerspective: 1200 }}
      className={`
        fixed inset-y-0 left-0 z-50
        hidden flex-col
        border-r border-black/[0.08]
        bg-white
        dark:border-white/[0.06]
        dark:bg-[#0a0b0e]
        lg:flex
        transition-[width] duration-300 ease-out
        ${collapsed ? "w-[72px]" : "w-[260px]"}
      `}
    >
      {/* =====================================================
          CUSTOM SCROLLBAR
      ====================================================== */}

      <style>{`
        .sidebar-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        .sidebar-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .sidebar-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(120,120,130,0.35);
          border-radius: 9999px;
        }

        .sidebar-scrollbar {
          scrollbar-width: thin;
        }
      `}</style>

      {/* =====================================================
          BRAND HEADER
      ====================================================== */}

      <motion.div
        layout
        className={`
          flex h-[68px] shrink-0 items-center
          border-b border-black/[0.06]
          dark:border-white/[0.06]
          ${collapsed ? "justify-center px-2" : "px-5"}
        `}
      >
        <motion.div
          layout
          className={`flex min-w-0 items-center ${
            collapsed ? "justify-center" : "gap-2.5"
          }`}
        >
          {/* Brand logo */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 6 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 17,
            }}
            className="
              relative flex h-9 w-9 shrink-0
              items-center justify-center
              overflow-hidden rounded-full
              border border-orange-400/30
              bg-zinc-100 dark:bg-[#17181c]
            "
          >
            <img
              src="/logo.svg"
              alt="JEEVA"
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display = "none";

                if (event.currentTarget.nextElementSibling) {
                  event.currentTarget.nextElementSibling.style.display =
                    "flex";
                }
              }}
            />

            <span className="hidden h-full w-full items-center justify-center text-sm font-bold text-orange-400">
              AG
            </span>

            <motion.span
              animate={{
                opacity: [0.6, 0, 0.6],
                scale: [1, 1.4, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                pointer-events-none absolute inset-0
                rounded-full border border-orange-400/50
              "
            />
          </motion.div>

          {/* Brand name */}
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0, x: -8 }}
                animate={{ opacity: 1, width: "auto", x: 0 }}
                exit={{ opacity: 0, width: 0, x: -8 }}
                transition={{ duration: 0.25 }}
                className="min-w-0 flex-1 overflow-hidden"
              >
                <h2 className="truncate text-[15px] font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                  JEEVA
                </h2>

                <p className="mt-0.5 truncate text-[10px] font-semibold tracking-[0.1em] text-zinc-500"></p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Collapse sidebar button */}
        {!collapsed && (
          <motion.button
            type="button"
            onClick={onToggle}
            aria-label="Collapse sidebar"
            whileHover={{ scale: 1.12, x: -3 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 17,
            }}
            className="
              ml-auto flex h-7 w-7 shrink-0
              items-center justify-center rounded-md
              text-zinc-400 hover:bg-black/[0.05]
              hover:text-zinc-700
              dark:text-zinc-500 dark:hover:bg-white/[0.06]
              dark:hover:text-zinc-300
            "
          >
            <motion.div
              whileHover={{ rotate: -8 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 15,
              }}
            >
              <ChevronLeft size={15} />
            </motion.div>
          </motion.button>
        )}
      </motion.div>

      {/* =====================================================
          EXPAND SIDEBAR BUTTON
      ====================================================== */}

      {collapsed && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={onToggle}
          aria-label="Expand sidebar"
          whileHover={{ scale: 1.15, x: 3 }}
          whileTap={{ scale: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17,
          }}
          className="
            mx-auto mt-3 flex h-7 w-7
            items-center justify-center rounded-md
            text-zinc-400 hover:bg-black/[0.05]
            hover:text-zinc-700
            dark:text-zinc-500 dark:hover:bg-white/[0.06]
            dark:hover:text-zinc-300
          "
        >
          <motion.div
            whileHover={{ rotate: 8 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 15,
            }}
          >
            <ChevronRight size={15} />
          </motion.div>
        </motion.button>
      )}

      {/* =====================================================
          ROLE-BASED NAVIGATION
      ====================================================== */}

      <nav className="sidebar-scrollbar flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-5">
          {visibleNavigationGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1 + groupIndex * 0.07,
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Group heading */}
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.15 + groupIndex * 0.07,
                  }}
                  className="
                    mb-1.5 px-3 text-[10px] font-semibold
                    tracking-[0.1em] text-zinc-400
                    dark:text-zinc-500
                  "
                >
                  {group.title}
                </motion.div>
              )}

              {/* Divider for collapsed navigation */}
              {collapsed && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    delay: 0.15 + groupIndex * 0.07,
                    duration: 0.3,
                  }}
                  className="
                    mx-2 mb-2 h-px
                    bg-black/[0.06] dark:bg-white/[0.06]
                  "
                />
              )}

              {/* Navigation items */}
              <div className="space-y-0.5">
                {group.items.map((item, itemIndex) => (
                  <SidebarItem
                    key={item.path}
                    item={item}
                    collapsed={collapsed}
                    index={groupIndex * 3 + itemIndex}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </nav>

      {/* =====================================================
          USER PROFILE SECTION
      ====================================================== */}

      <motion.div
        ref={menuRef}
        layout
        className="
          relative shrink-0 border-t
          border-black/[0.06] p-2.5
          dark:border-white/[0.06]
        "
      >
        {/* Profile button */}
        <motion.button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className={`
            flex w-full items-center gap-2.5
            rounded-lg p-2 text-left
            hover:bg-black/[0.04]
            dark:hover:bg-white/[0.04]
            ${collapsed ? "justify-center" : ""}
          `}
        >
          {/* User initials */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            animate={
              menuOpen
                ? { scale: [1, 1.08, 1] }
                : { scale: 1 }
            }
            transition={
              menuOpen
                ? {
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : {
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  }
            }
            className="
              flex h-8 w-8 shrink-0 items-center justify-center
              rounded-full bg-cyan-400
              text-[11px] font-bold text-[#071318]
            "
          >
            {userInitials}
          </motion.div>

          {/* User information */}
          {!collapsed && (
            <>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="truncate text-[12px] font-semibold text-zinc-900 dark:text-zinc-100">
                    {displayName}
                  </p>

                  <span className="shrink-0 rounded bg-black/[0.06] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-zinc-600 dark:bg-white/[0.08] dark:text-zinc-400">
                    {userRole}
                  </span>
                </div>

                <p className="mt-0.5 truncate text-[10px] text-zinc-500">
                  {userOrg}
                </p>
              </div>

              {/* Dropdown arrow */}
              <motion.div
                animate={{ rotate: menuOpen ? 180 : 0 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                }}
              >
                <ChevronDown
                  size={14}
                  className="shrink-0 text-zinc-400"
                />
              </motion.div>
            </>
          )}
        </motion.button>

        {/* ===================================================
            PROFILE DROPDOWN
        ==================================================== */}

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.94 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 28,
              }}
              className={`
                absolute bottom-full z-50 mb-2
                w-[240px] overflow-hidden rounded-xl
                border border-black/[0.08]
                bg-white p-1.5
                shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                dark:border-white/[0.08]
                dark:bg-[#15161a]
                dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]
                ${collapsed ? "left-2" : "left-0"}
              `}
            >
              {/* Organization information */}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 }}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2.5"
              >
                <div
                  className="
                    flex h-8 w-8 shrink-0 items-center justify-center
                    rounded-lg border border-cyan-500/30
                    bg-cyan-500/[0.08]
                  "
                >
                  <ShieldCheck
                    size={17}
                    className="text-cyan-500 dark:text-cyan-400"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
                    {userOrg}
                  </p>

                  <p className="text-[10px] text-zinc-500">
                    {userRole}
                  </p>
                </div>
              </motion.div>

              <div className="my-1 h-px bg-black/[0.06] dark:bg-white/[0.06]" />

              {/* Profile */}
              <MenuItem
                icon={UserRound}
                label="Profile"
                onClick={() => handleNavigate("/settings")}
                delay={0.08}
              />

              {/* Settings */}
              <MenuItem
                icon={Settings}
                label="Settings"
                onClick={() => handleNavigate("/settings")}
                delay={0.12}
              />

              {/* Feedback */}
              <MenuItem
                icon={MessageSquare}
                label="Feedback"
                onClick={() => handleNavigate("/feedback")}
                delay={0.16}
              />

              {/* Theme selector */}
              <div
                className="
                  my-1 flex items-center justify-between rounded-lg
                  px-3 py-2 text-[13px] font-medium
                  text-zinc-700 dark:text-zinc-300
                "
              >
                <span>Theme</span>

                <ThemeToggle
                  theme={theme}
                  onToggle={onThemeToggle}
                />
              </div>

              <div className="my-1 h-px bg-black/[0.06] dark:bg-white/[0.06]" />

              {/* Logout */}
              <MenuItem
                icon={LogOut}
                label="Log out"
                onClick={handleLogout}
                danger
                delay={0.2}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.aside>
  );
}
