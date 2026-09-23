import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
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

    // ✅ Toggle "dark" class on <html> — this is what Tailwind v4 reads
    root.classList.toggle("dark", isDark);

    // Sets native scrollbar / form color scheme
    root.style.colorScheme = isDark ? "dark" : "light";

    // Persist
    localStorage.setItem("ravanai-theme", isDark ? "dark" : "light");
  }, [isDark]);

  // ============================================================
  // HANDLERS
  // ============================================================
  const handleThemeToggle = () => {
    setIsDark((previous) => !previous);
  };

  const handleSidebarToggle = () => {
    setSidebarCollapsed((previous) => !previous);
  };

  // ============================================================
  // LAYOUT
  // ============================================================
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
      {/* SIDEBAR */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={handleSidebarToggle}
      />

      {/* MAIN CONTENT AREA */}
      <div
        className={`
          min-h-screen
          transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? "lg:ml-[72px]" : "lg:ml-[260px]"}
        `}
      >
        {/* HEADER */}
        <Header
          onThemeToggle={handleThemeToggle}
          isDark={isDark}
          onSidebarToggle={handleSidebarToggle}
        />

        {/* PAGE CONTENT */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}