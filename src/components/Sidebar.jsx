import React from "react";
import { NavLink } from "react-router-dom";
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
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ============================================================
// NAVIGATION CONFIGURATION
// ============================================================

const navigationGroups = [
  {
    title: "PLATFORM",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { label: "Agents", icon: Bot, path: "/agents" },
      { label: "Knowledge Base", icon: BookOpen, path: "/knowledge-base" },
    ],
  },
  {
    title: "CAMPAIGNS",
    items: [
      { label: "Inbound", icon: Grid3X3, path: "/inbound" },
      { label: "Outbound", icon: Megaphone, path: "/outbound" },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      { label: "All Calls History", icon: PhoneCall, path: "/calls" },
      { label: "Contacts", icon: Users, path: "/contacts" },
      { label: "Integrations", icon: Cable, path: "/integrations" },
    ],
  },
  {
    title: "OPERATIONS",
    items: [
      { label: "Analytics", icon: BarChart3, path: "/analytics" },
      { label: "Billing", icon: CreditCard, path: "/billing" },
      { label: "Settings", icon: Settings, path: "/settings" },
    ],
  },
];

// ============================================================
// SIDEBAR ITEM
// ============================================================

function SidebarItem({ item, collapsed }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        `
        group relative flex items-center gap-3 rounded-lg
        ${collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2"}
        text-[13px] font-medium
        transition-all duration-150
        ${
          isActive
            ? "bg-cyan-500/[0.10] text-cyan-600 dark:bg-cyan-400/[0.10] dark:text-cyan-400"
            : "text-zinc-600 hover:bg-black/[0.04] hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.05] dark:hover:text-zinc-100"
        }
        `
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-cyan-500 dark:bg-cyan-400" />
          )}

          <Icon
            size={17}
            strokeWidth={isActive ? 2.1 : 1.8}
            className="shrink-0"
          />

          {!collapsed && <span className="truncate">{item.label}</span>}
        </>
      )}
    </NavLink>
  );
}

// ============================================================
// SIDEBAR
// ============================================================

export default function Sidebar({ collapsed = false, onToggle }) {
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50
        hidden flex-col border-r
        border-black/[0.08] bg-white
        transition-[width] duration-200 ease-out
        dark:border-white/[0.06] dark:bg-[#0a0b0e]
        lg:flex
        ${collapsed ? "w-[72px]" : "w-[260px]"}
      `}
    >
      {/* ======================================================
          BRAND HEADER — reduced to 68px, matches Header height
      ====================================================== */}

      <div
        className={`
          flex h-[68px] shrink-0 items-center
          border-b border-black/[0.06]
          dark:border-white/[0.06]
          ${collapsed ? "justify-center px-2" : "px-5"}
        `}
      >
        <div
          className={`
            flex min-w-0 items-center
            ${collapsed ? "justify-center" : "gap-2.5"}
          `}
        >
          {/* Agni Logo */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-orange-400/30 bg-zinc-100 dark:bg-[#17181c]">
            <img
              src="/logo.svg"
              alt="Agni"
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display = "none";
                event.currentTarget.nextElementSibling.style.display = "flex";
              }}
            />

            <span className="hidden h-full w-full items-center justify-center text-sm font-bold text-orange-400">
              A
            </span>
          </div>

          {!collapsed && (
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-[15px] font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Agni
              </h2>
              <p className="mt-0.5 truncate text-[10px] font-semibold tracking-[0.1em] text-zinc-500">
                ENTERPRISE
              </p>
            </div>
          )}
        </div>

        {/* Collapse Button */}
        {!collapsed && (
          <button
            onClick={onToggle}
            aria-label="Collapse sidebar"
            className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-zinc-400 transition hover:bg-black/[0.05] hover:text-zinc-700 dark:text-zinc-500 dark:hover:bg-white/[0.06] dark:hover:text-zinc-300"
          >
            <ChevronLeft size={15} />
          </button>
        )}
      </div>

      {/* Expand Button (collapsed state) */}
      {collapsed && (
        <button
          onClick={onToggle}
          aria-label="Expand sidebar"
          className="mx-auto mt-3 flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 transition hover:bg-black/[0.05] hover:text-zinc-700 dark:text-zinc-500 dark:hover:bg-white/[0.06] dark:hover:text-zinc-300"
        >
          <ChevronRight size={15} />
        </button>
      )}

      {/* ======================================================
          NAVIGATION
      ====================================================== */}

      <nav className="sidebar-scrollbar flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-5">
          {navigationGroups.map((group) => (
            <div key={group.title}>
              {!collapsed && (
                <div className="mb-1.5 px-3 text-[10px] font-semibold tracking-[0.1em] text-zinc-400 dark:text-zinc-500">
                  {group.title}
                </div>
              )}

              {collapsed && (
                <div className="mx-2 mb-2 h-px bg-black/[0.06] dark:bg-white/[0.06]" />
              )}

              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <SidebarItem
                    key={item.path}
                    item={item}
                    collapsed={collapsed}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* ======================================================
          USER PROFILE
      ====================================================== */}

      <div className="shrink-0 border-t border-black/[0.06] p-2.5 dark:border-white/[0.06]">
        <button
          className={`
            flex w-full items-center gap-2.5 rounded-lg
            p-2 text-left transition
            hover:bg-black/[0.04]
            dark:hover:bg-white/[0.04]
            ${collapsed ? "justify-center" : ""}
          `}
        >
          {/* Avatar */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-[11px] font-bold text-[#071318]">
            AB
          </div>

          {!collapsed && (
            <>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="truncate text-[12px] font-semibold text-zinc-900 dark:text-zinc-100">
                    Akshada Bhamare
                  </p>
                  <span className="shrink-0 rounded bg-black/[0.06] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-zinc-600 dark:bg-white/[0.08] dark:text-zinc-400">
                    Admin
                  </span>
                </div>
                <p className="mt-0.5 truncate text-[10px] text-zinc-500">
                  Bhamare Classes
                </p>
              </div>

              <ChevronDown size={14} className="shrink-0 text-zinc-400" />
            </>
          )}
        </button>
      </div>
    </aside>
  );
}