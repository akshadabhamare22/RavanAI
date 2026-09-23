
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
  // APPLY THEME
  // ============================================================

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", isDark);

    root.style.colorScheme = isDark ? "dark" : "light";

    localStorage.setItem(
      "ravanai-theme",
      isDark ? "dark" : "light",
    );
  }, [isDark]);

  // ============================================================
  // THEME TOGGLE
  // ============================================================

  const handleThemeToggle = () => {
    setIsDark((previous) => !previous);
  };

  // ============================================================
  // SIDEBAR TOGGLE
  // ============================================================

  const handleSidebarToggle = () => {
    setSidebarCollapsed((previous) => !previous);
  };

  // ============================================================
  // LAYOUT
  // ============================================================

  return (
    <div
      className={`min-h-screen ${
        isDark ? "dark" : ""
      } bg-[#09090B] text-zinc-100`}
    >
      <div className="min-h-screen">

        {/* ======================================================
            SIDEBAR
        ====================================================== */}

        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={handleSidebarToggle}
        />

        {/* ======================================================
            MAIN CONTENT AREA
        ====================================================== */}

        <div
          className={`
            min-h-screen
            transition-all duration-300 ease-in-out
            ${sidebarCollapsed ? "lg:ml-[76px]" : "lg:ml-[300px]"}
          `}
        >

          {/* ====================================================
              HEADER
          ==================================================== */}

          <Header
            onThemeToggle={handleThemeToggle}
            isDark={isDark}
            onSidebarToggle={handleSidebarToggle}
          />

          {/* ====================================================
              PAGE CONTENT
          ==================================================== */}

          <main className="min-h-[calc(100vh-92px)]">
            <Outlet />
          </main>

        </div>
      </div>
    </div>
  );
}