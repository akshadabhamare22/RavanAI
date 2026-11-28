// ============================================================
// Knowledge Base - auth helper
// ------------------------------------------------------------
// Every /knowledge-bases endpoint is protected (admin / superadmin),
// so each request must carry the logged-in user's Bearer token.
// The token is saved by Login.jsx in localStorage.
// ============================================================

export function getKbToken() {
  try {
    const direct =
      localStorage.getItem("access_token") ||
      localStorage.getItem("accessToken");

    if (direct) return direct.trim();

    const auth = JSON.parse(localStorage.getItem("ravanai_auth") || "{}");
    return String(auth?.token || auth?.access_token || "").trim();
  } catch {
    return "";
  }
}

// Returns { Authorization: "Bearer <token>" } (or {} if not logged in)
export function kbAuthHeaders() {
  const token = getKbToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Organization (client) id of the logged-in user, if the backend sent one.
export function getKbClientId() {
  try {
    const user = JSON.parse(localStorage.getItem("ravanai_user") || "{}");
    return user?.client_id || null;
  } catch {
    return null;
  }
}