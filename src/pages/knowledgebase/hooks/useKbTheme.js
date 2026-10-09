import { useCallback, useEffect, useState } from "react";

// Reads the theme set by the global Header toggle (html/body class or data-theme).
export default function useKbTheme() {
  const read = useCallback(() => {
    if (typeof document === "undefined") return false;
    const html = document.documentElement;
    const body = document.body;
    let stored = null;
    try {
      stored =
        localStorage.getItem("theme") ||
        localStorage.getItem("ravanai_theme") ||
        localStorage.getItem("color-theme");
    } catch {
      stored = null;
    }
    return (
      html.classList.contains("dark") ||
      body?.classList.contains("dark") ||
      html.classList.contains("dark-mode") ||
      body?.classList.contains("dark-mode") ||
      html.getAttribute("data-theme") === "dark" ||
      body?.getAttribute("data-theme") === "dark" ||
      stored === "dark"
    );
  }, []);

  const [isDark, setIsDark] = useState(read);

  useEffect(() => {
    const sync = () => setIsDark(read());
    sync();
    const opts = { attributes: true, attributeFilter: ["class", "data-theme"] };
    const o1 = new MutationObserver(sync);
    const o2 = new MutationObserver(sync);
    o1.observe(document.documentElement, opts);
    if (document.body) o2.observe(document.body, opts);
    window.addEventListener("storage", sync);
    window.addEventListener("theme-changed", sync);
    return () => {
      o1.disconnect();
      o2.disconnect();
      window.removeEventListener("storage", sync);
      window.removeEventListener("theme-changed", sync);
    };
  }, [read]);

  return isDark;
}
