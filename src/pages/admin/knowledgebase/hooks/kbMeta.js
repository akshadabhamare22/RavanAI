// Tiny bridge so the global Header can show Knowledge Base info
// (list count / current KB name) without extra API calls or imports.
//
//   publishKbMeta({ total: 16 })                       -> list page
//   publishKbMeta({ id, name, sourcesCount })           -> detail page
//
// Header listens to the "kb-meta" window event and also reads window.__kbMeta.
export function publishKbMeta(patch) {
  if (typeof window === "undefined") return;
  window.__kbMeta = { ...(window.__kbMeta || {}), ...patch };
  window.dispatchEvent(new CustomEvent("kb-meta", { detail: window.__kbMeta }));
}

export function clearKbMeta() {
  if (typeof window === "undefined") return;
  window.__kbMeta = {};
  window.dispatchEvent(new CustomEvent("kb-meta", { detail: {} }));
}
