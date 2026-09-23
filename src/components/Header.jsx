import {
  Bell,
  Plus,
  Search,
  Copy,
  HelpCircle,
  Monitor,
} from "lucide-react";

import ThemeToggle from "./ThemeToggle";

export default function Header({ onThemeToggle, theme }) {
  return (
    <header
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
      {/* LEFT — Title */}
      <div className="min-w-0">
        <h2
          className="
            flex items-center gap-2
            text-[15px] font-bold
            text-zinc-900
            antialiased
            dark:text-white
          "
        >
          Dashboard

          <span className="text-zinc-500 dark:text-zinc-400">
            <HelpCircle size={13} strokeWidth={1.8} />
          </span>
        </h2>

        <div
          className="
            mt-0.5 flex items-center gap-2
            text-[11px] text-zinc-500
            antialiased
          "
        >
          <span className="hidden sm:inline">
            Overview of your voice AI platform
          </span>

          <span className="hidden sm:inline">•</span>

          <span className="font-mono">
            # 012854ee...681e
          </span>

          <button
            type="button"
            aria-label="Copy workspace ID"
            className="
              rounded-md p-0.5
              transition-colors
              hover:bg-black/5
              hover:text-zinc-700
              dark:hover:bg-white/10
              dark:hover:text-zinc-300
            "
            onClick={() => {
              console.log("Copy workspace ID");
            }}
          >
            <Copy size={11} />
          </button>
        </div>
      </div>

      {/* RIGHT — Actions */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">

        {/* Search */}
        <div
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
              text-[13px] text-zinc-800
              outline-none
              placeholder:text-zinc-500
              antialiased
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
        </div>

        {/* Credits */}
        <div
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
          <span className="text-cyan-500 dark:text-cyan-300">
            ♧
          </span>

          <span
            className="
              whitespace-nowrap
              font-medium
              text-zinc-800
              antialiased
              dark:text-zinc-200
            "
          >
            10 credits
          </span>
        </div>

        {/* Theme Toggle */}
        <div className="antialiased">
          <ThemeToggle
            theme={theme}
            onToggle={onThemeToggle}
          />
        </div>

        {/* Monitor */}
        <button
          type="button"
          aria-label="Display settings"
          className="
            hidden rounded-lg
            border border-black/10
            p-2
            text-zinc-500
            transition-colors
            hover:bg-black/5
            dark:border-white/10
            dark:text-zinc-400
            dark:hover:bg-white/10
            sm:block
          "
        >
          <Monitor size={15} />
        </button>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
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
        </button>

        {/* New Agent */}
        <button
          type="button"
          className="
            flex items-center gap-2
            rounded-lg
            bg-cyan-400
            px-3.5 py-2
            text-[13px] font-bold
            text-slate-950
            antialiased
            transition-all duration-200
            hover:bg-cyan-300
            active:scale-[0.98]
          "
          onClick={() => {
            console.log("New Agent clicked");
          }}
        >
          <Plus size={15} strokeWidth={2.8} />

          <span className="hidden sm:inline">
            New Agent
          </span>
        </button>
      </div>
    </header>
  );
}