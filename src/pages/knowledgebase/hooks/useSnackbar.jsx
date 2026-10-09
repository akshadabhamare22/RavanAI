import React, { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import useKbTheme from "./useKbTheme";

const DURATION = 3500;
const FLASH_KEY = "kb_flash_snackbar";

// Use before navigating to another page: the next page shows the snackbar on mount.
export function flashSnackbar(message, type = "success") {
  try {
    sessionStorage.setItem(FLASH_KEY, JSON.stringify({ message, type }));
  } catch {
    /* ignore */
  }
}

// const { showSnackbar, snackbar } = useSnackbar();
// showSnackbar("Source added — indexing started");
// showSnackbar("Something failed", "error");
// ...and render {snackbar} once inside the page.
export default function useSnackbar() {
  const isDark = useKbTheme();
  const [item, setItem] = useState(null);
  const timer = useRef(null);

  const hide = useCallback(() => {
    window.clearTimeout(timer.current);
    setItem(null);
  }, []);

  const showSnackbar = useCallback((message, type = "success") => {
    window.clearTimeout(timer.current);
    setItem({ message, type, key: Date.now() });
    timer.current = window.setTimeout(() => setItem(null), DURATION);
  }, []);

  // Show a snackbar queued by the previous page (e.g. after delete/create + navigate)
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(FLASH_KEY);
      if (raw) {
        sessionStorage.removeItem(FLASH_KEY);
        const { message, type } = JSON.parse(raw);
        if (message) showSnackbar(message, type);
      }
    } catch {
      /* ignore */
    }
    return () => window.clearTimeout(timer.current);
  }, [showSnackbar]);

  const isError = item?.type === "error";
  const accent = isError ? "#ef4444" : "#22c55e";

  const snackbar = item ? (
    <div
      key={item.key}
      role="status"
      aria-live="polite"
      className={`fixed right-4 top-4 z-[300] w-[340px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border shadow-2xl ${
        isDark
          ? "border-white/10 bg-[#101012] text-zinc-100"
          : "border-gray-200 bg-white text-gray-800"
      }`}
      style={{ animation: "kbSnackIn 220ms ease-out" }}
    >
      <style>{`
        @keyframes kbSnackIn { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes kbSnackBar { from { width: 100%; } to { width: 0%; } }
      `}</style>

      <div className="flex items-center gap-3 px-4 py-4">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border"
          style={{
            color: accent,
            borderColor: `${accent}55`,
            backgroundColor: `${accent}14`,
          }}
        >
          {isError ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
        </div>
        <p className="flex-1 text-sm font-medium leading-snug">{item.message}</p>
        <button
          type="button"
          onClick={hide}
          aria-label="Dismiss"
          className="rounded-md p-1 text-zinc-400 transition hover:text-zinc-600 dark:hover:text-zinc-200"
        >
          <X size={14} />
        </button>
      </div>

      <div
        className="h-1"
        style={{
          backgroundColor: accent,
          animation: `kbSnackBar ${DURATION}ms linear forwards`,
        }}
      />
    </div>
  ) : null;

  return { showSnackbar, hideSnackbar: hide, snackbar };
}
