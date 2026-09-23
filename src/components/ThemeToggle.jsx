
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      className={`
        group relative flex h-10 w-10 shrink-0
        items-center justify-center rounded-xl
        border transition-all duration-300 ease-out
        focus:outline-none focus:ring-2 focus:ring-cyan-400/40
        ${
          isDark
            ? "border-white/10 bg-[#111216] text-gray-300 hover:border-cyan-400/40 hover:bg-cyan-400/10"
            : "border-black/10 bg-white text-gray-600 hover:border-cyan-400/40 hover:bg-cyan-400/10"
        }
      `}
    >
      <span
        className="
          flex items-center justify-center
          transition-all duration-300 ease-out
          group-active:scale-90
        "
      >
        {isDark ? (
          <Moon
            size={18}
            strokeWidth={1.7}
            className="text-gray-300 transition-transform duration-300"
          />
        ) : (
          <Sun
            size={18}
            strokeWidth={1.7}
            className="text-gray-700 transition-transform duration-300"
          />
        )}
      </span>
    </button>
  );
}