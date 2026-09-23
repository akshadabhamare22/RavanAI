
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
  LogOut,
  UserRound,
  Menu,
} from "lucide-react";

// ============================================================
// NAVIGATION CONFIGURATION
// ============================================================

const navigationGroups = [
  {
    title: "PLATFORM",
    items: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
      },
      {
        label: "Agents",
        icon: Bot,
        path: "/agents",
      },
      {
        label: "Knowledge Base",
        icon: BookOpen,
        path: "/knowledge-base",
      },
    ],
  },
  {
    title: "CAMPAIGNS",
    items: [
      {
        label: "Inbound",
        icon: Grid3X3,
        path: "/inbound",
      },
      {
        label: "Outbound",
        icon: Megaphone,
        path: "/outbound",
      },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      {
        label: "All Calls History",
        icon: PhoneCall,
        path: "/calls",
      },
      {
        label: "Contacts",
        icon: Users,
        path: "/contacts",
      },
      {
        label: "Integrations",
        icon: Cable,
        path: "/integrations",
      },
    ],
  },
  {
    title: "OPERATIONS",
    items: [
      {
        label: "Analytics",
        icon: BarChart3,
        path: "/analytics",
      },
      {
        label: "Billing",
        icon: CreditCard,
        path: "/billing",
      },
      {
        label: "Settings",
        icon: Settings,
        path: "/settings",
      },
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
        group relative flex items-center gap-3 rounded-xl
        px-3 py-3 text-sm font-medium
        transition-all duration-200
        ${
          isActive
            ? "bg-cyan-400/[0.10] text-cyan-400"
            : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
        }
        ${collapsed ? "justify-center px-2" : ""}
        `
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-cyan-400" />
          )}

          <Icon
            size={18}
            strokeWidth={isActive ? 2 : 1.7}
            className="shrink-0"
          />

          {!collapsed && (
            <span className="truncate">{item.label}</span>
          )}
        </>
      )}
    </NavLink>
  );
}

// ============================================================
// SIDEBAR
// ============================================================

export default function Sidebar({
  collapsed = false,
  onToggle,
}) {
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50
        hidden flex-col border-r border-white/[0.07]
        bg-[#090A0C] transition-all duration-300
        lg:flex
        ${collapsed ? "w-[76px]" : "w-[300px]"}
      `}
    >
      {/* ======================================================
          BRAND HEADER
      ====================================================== */}

      <div
        className={`
          flex h-[92px] shrink-0 items-center
          border-b border-white/[0.06]
          ${collapsed ? "justify-center px-2" : "px-6"}
        `}
      >
        <div
          className={`
            flex min-w-0 items-center
            ${collapsed ? "justify-center" : "gap-3"}
          `}
        >
          {/* Agni Logo */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-orange-400/30 bg-[#171719]">
            <img
              src="/logo.svg"
              alt="Agni"
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display = "none";
                event.currentTarget.nextElementSibling.style.display =
                  "flex";
              }}
            />

            <span className="hidden h-full w-full items-center justify-center text-xl font-bold text-orange-400">
              A
            </span>
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <h2 className="text-xl font-bold tracking-tight text-zinc-100">
                Agni
              </h2>

              <p className="mt-0.5 text-[11px] font-semibold tracking-wide text-zinc-500">
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
            className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-white/[0.06] hover:text-zinc-200"
          >
            <ChevronLeft size={18} />
          </button>
        )}
      </div>

      {/* Expand Button */}
      {collapsed && (
        <button
          onClick={onToggle}
          aria-label="Expand sidebar"
          className="mx-auto mt-4 flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-white/[0.06] hover:text-zinc-200"
        >
          <ChevronRight size={18} />
        </button>
      )}

      {/* ======================================================
          NAVIGATION
      ====================================================== */}

      <nav className="sidebar-scrollbar flex-1 overflow-y-auto px-3 py-5">
        <div className="space-y-7">
          {navigationGroups.map((group) => (
            <div key={group.title}>
              {!collapsed && (
                <div className="mb-3 px-3 text-[11px] font-semibold tracking-[0.08em] text-zinc-500">
                  {group.title}
                </div>
              )}

              {collapsed && (
                <div className="mb-3 h-px bg-white/[0.06]" />
              )}

              <div className="space-y-1">
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

      <div className="shrink-0 border-t border-white/[0.07] p-3">
        <button
          className={`
            flex w-full items-center gap-3 rounded-xl
            border border-white/[0.08] bg-white/[0.025]
            p-3 text-left transition hover:bg-white/[0.05]
            ${collapsed ? "justify-center px-1" : ""}
          `}
        >
          {/* Avatar */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-sm font-semibold text-[#071318]">
            AB
          </div>

          {!collapsed && (
            <>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-xs font-semibold text-zinc-200">
                    Akshada Bhamare
                  </p>
                </div>

                <p className="mt-1 truncate text-[11px] text-zinc-500">
                  Bhamare Classes
                </p>
              </div>

              <ChevronDown
                size={16}
                className="shrink-0 text-zinc-500"
              />
            </>
          )}
        </button>
      </div>
    </aside>
  );
}