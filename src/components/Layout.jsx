// import React, { useEffect, useState } from "react";
// import { Outlet } from "react-router-dom";

// import Sidebar from "./Sidebar";
// import Header from "./Header";

// export default function Layout() {
//   // ============================================================
//   // THEME STATE
//   // ============================================================
//   const [isDark, setIsDark] = useState(() => {
//     const savedTheme = localStorage.getItem("ravanai-theme");
//     return savedTheme ? savedTheme === "dark" : true;
//   });

//   // ============================================================
//   // SIDEBAR STATE
//   // ============================================================
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   // ============================================================
//   // APPLY THEME TO <html>
//   // ============================================================
//   useEffect(() => {
//     const root = document.documentElement;

//     // ✅ Toggle "dark" class on <html> — this is what Tailwind v4 reads
//     root.classList.toggle("dark", isDark);

//     // Sets native scrollbar / form color scheme
//     root.style.colorScheme = isDark ? "dark" : "light";

//     // Persist
//     localStorage.setItem("ravanai-theme", isDark ? "dark" : "light");
//   }, [isDark]);

//   // ============================================================
//   // HANDLERS
//   // ============================================================
//   const handleThemeToggle = () => {
//     setIsDark((previous) => !previous);
//   };

//   const handleSidebarToggle = () => {
//     setSidebarCollapsed((previous) => !previous);
//   };

//   // ============================================================
//   // LAYOUT
//   // ============================================================
//   return (
//     <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
//       {/* SIDEBAR */}
//       <Sidebar
//         collapsed={sidebarCollapsed}
//         onToggle={handleSidebarToggle}
//       />

//       {/* MAIN CONTENT AREA */}
//       <div
//         className={`
//           min-h-screen
//           transition-all duration-300 ease-in-out
//           ${sidebarCollapsed ? "lg:ml-[72px]" : "lg:ml-[260px]"}
//         `}
//       >
//         {/* HEADER */}
//         <Header
//           onThemeToggle={handleThemeToggle}
//           isDark={isDark}
//           onSidebarToggle={handleSidebarToggle}
//         />

//         {/* PAGE CONTENT */}
//         <main>
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { Outlet } from "react-router-dom";

// import Sidebar from "./Sidebar";
// import Header from "./Header";

// export default function Layout() {
//   // ============================================================
//   // THEME STATE
//   // ============================================================
//   const [isDark, setIsDark] = useState(() => {
//     const savedTheme = localStorage.getItem("ravanai-theme");
//     return savedTheme ? savedTheme === "dark" : true;
//   });

//   // ============================================================
//   // SIDEBAR STATE
//   // ============================================================
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   // ============================================================
//   // APPLY THEME TO <html>
//   // ============================================================
//   useEffect(() => {
//     const root = document.documentElement;

//     // ✅ Toggle "dark" class on <html> — this is what Tailwind v4 reads
//     root.classList.toggle("dark", isDark);

//     // Sets native scrollbar / form color scheme
//     root.style.colorScheme = isDark ? "dark" : "light";

//     // Persist
//     localStorage.setItem("ravanai-theme", isDark ? "dark" : "light");
//   }, [isDark]);

//   // ============================================================
//   // LISTEN FOR EXTERNAL THEME CHANGES (from CreateAgent etc.)
//   // ============================================================
//   useEffect(() => {
//     const handler = (e) => setIsDark(e.detail === "dark");
//     window.addEventListener("ravanai-theme-change", handler);
//     return () =>
//       window.removeEventListener("ravanai-theme-change", handler);
//   }, []);

//   // ============================================================
//   // HANDLERS
//   // ============================================================
//   const handleThemeToggle = () => {
//     setIsDark((previous) => !previous);
//   };

//   const handleSidebarToggle = () => {
//     setSidebarCollapsed((previous) => !previous);
//   };

//   // ============================================================
//   // LAYOUT
//   // ============================================================
//   return (
//     <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
//       {/* SIDEBAR */}
//       <Sidebar
//         collapsed={sidebarCollapsed}
//         onToggle={handleSidebarToggle}
//       />

//       {/* MAIN CONTENT AREA */}
//       <div
//         className={`
//           flex min-h-screen flex-col
//           transition-all duration-300 ease-in-out
//           ${sidebarCollapsed ? "lg:ml-[72px]" : "lg:ml-[260px]"}
//         `}
//       >
//         {/* HEADER */}
//         <Header
//           onThemeToggle={handleThemeToggle}
//           isDark={isDark}
//           onSidebarToggle={handleSidebarToggle}
//         />

//         {/* PAGE CONTENT — fills remaining height */}
//         <main className="flex-1">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { Outlet, useLocation } from "react-router-dom";

// import Sidebar from "./Sidebar";
// import Header from "./Header";

// export default function Layout() {
//   const location = useLocation();

//   // ============================================================
//   // THEME STATE
//   // ============================================================
//   const [isDark, setIsDark] = useState(() => {
//     const savedTheme = localStorage.getItem("ravanai-theme");
//     return savedTheme ? savedTheme === "dark" : true;
//   });

//   // ============================================================
//   // SIDEBAR STATE
//   // ============================================================
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   // ============================================================
//   // APPLY THEME TO <html>
//   // ============================================================
//   useEffect(() => {
//     const root = document.documentElement;
//     root.classList.toggle("dark", isDark);
//     root.style.colorScheme = isDark ? "dark" : "light";
//     localStorage.setItem("ravanai-theme", isDark ? "dark" : "light");
//   }, [isDark]);

//   // ============================================================
//   // ✅ SCROLL TO TOP ON ROUTE CHANGE
//   // ============================================================
//   useEffect(() => {
//     // Scroll window
//     window.scrollTo({ top: 0, behavior: "instant" });

//     // Also scroll the main content area (if using internal scroll)
//     const main = document.querySelector("main");
//     if (main) {
//       main.scrollTo({ top: 0, behavior: "instant" });
//     }

//     // Also scroll any scrollable content area
//     const scrollables = document.querySelectorAll(
//       "[data-scroll-container], .page-scroll"
//     );
//     scrollables.forEach((el) => {
//       el.scrollTo({ top: 0, behavior: "instant" });
//     });
//   }, [location.pathname]);

//   // ============================================================
//   // LISTEN FOR EXTERNAL THEME CHANGES
//   // ============================================================
//   useEffect(() => {
//     const handler = (e) => setIsDark(e.detail === "dark");
//     window.addEventListener("ravanai-theme-change", handler);
//     return () =>
//       window.removeEventListener("ravanai-theme-change", handler);
//   }, []);

//   // ============================================================
//   // HANDLERS
//   // ============================================================
//   const handleThemeToggle = () => setIsDark((p) => !p);
//   const handleSidebarToggle = () => setSidebarCollapsed((p) => !p);

//   // ============================================================
//   // LAYOUT
//   // ============================================================
//   return (
//     <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
//       {/* Sidebar */}
//       <Sidebar
//         collapsed={sidebarCollapsed}
//         onToggle={handleSidebarToggle}
//       />

//       {/* Main content */}
//       <div
//         className={`
//           flex min-h-screen flex-col
//           transition-all duration-300 ease-in-out
//           ${sidebarCollapsed ? "lg:ml-[72px]" : "lg:ml-[260px]"}
//         `}
//       >
//         {/* Header */}
//         <Header
//           onThemeToggle={handleThemeToggle}
//           theme={isDark ? "dark" : "light"}
//         />

//         {/* Page content */}
//         <main className="flex-1">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";
import ChatBot from "./chatbot/ChatBot";

export default function Layout() {
  const location = useLocation();

  // ============================================================
  // THEME STATE
  // ============================================================
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("ravanai-theme");
    return savedTheme ? savedTheme === "dark" : true;
  });

  // ============================================================
  // SIDEBAR STATE
  // ============================================================
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // ============================================================
  // APPLY THEME TO <html>
  // ============================================================
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";
    localStorage.setItem("ravanai-theme", isDark ? "dark" : "light");
  }, [isDark]);

  // ============================================================
  // SCROLL TO TOP ON ROUTE CHANGE
  // ============================================================
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    const main = document.querySelector("main");
    if (main) {
      main.scrollTo({ top: 0, behavior: "instant" });
    }

    const scrollables = document.querySelectorAll(
      "[data-scroll-container], .page-scroll"
    );
    scrollables.forEach((el) => {
      el.scrollTo({ top: 0, behavior: "instant" });
    });
  }, [location.pathname]);

  // ============================================================
  // LISTEN FOR EXTERNAL THEME CHANGES
  // ============================================================
  useEffect(() => {
    const handler = (e) => setIsDark(e.detail === "dark");
    window.addEventListener("ravanai-theme-change", handler);
    return () =>
      window.removeEventListener("ravanai-theme-change", handler);
  }, []);

  // ============================================================
  // HANDLERS
  // ============================================================
  const handleThemeToggle = () => setIsDark((p) => !p);
  const handleSidebarToggle = () => setSidebarCollapsed((p) => !p);

  // ============================================================
  // LAYOUT
  // ============================================================
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={handleSidebarToggle}
      />

      {/* Main content */}
      <div
        className={`
          flex min-h-screen flex-col
          transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? "lg:ml-[72px]" : "lg:ml-[260px]"}
        `}
      >
        {/* Header */}
        <Header
          onThemeToggle={handleThemeToggle}
          theme={isDark ? "dark" : "light"}
        />

        {/* Page content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      {/* ✅ NEW: floating chatbot, visible on every page */}
      <ChatBot userInitials="AB" />
    </div>
  );
}