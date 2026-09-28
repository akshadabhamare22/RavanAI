/**
 * Knowledge Base data service
 * ------------------------------------------------------------------
 * Single source of truth for all Knowledge Base + Source persistence.
 * Everything currently goes through localStorage. The functions here
 * are written so that swapping the body of each function for an
 * Axios call later does not require touching any component.
 *
 * Storage keys:
 *   - "ravanai_knowledge_bases"   -> array of KB summary records
 *   - "knowledge_base_<id>"       -> full KB record incl. sources[]
 *
 * The summary list ("ravanai_knowledge_bases") is kept in sync with
 * each full record every time a KB or its sources change, so the
 * list page never needs to read individual KB keys.
 * ------------------------------------------------------------------
 */

const LIST_KEY = "ravanai_knowledge_bases";
const RECORD_PREFIX = "knowledge_base_";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function generateId(prefix = "") {
  const random =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  return prefix ? `${prefix}_${random}` : random;
}

function recordKey(id) {
  return `${RECORD_PREFIX}${id}`;
}

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch (error) {
    console.error(`Failed to read "${key}" from localStorage:`, error);
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Failed to write "${key}" to localStorage:`, error);
    return false;
  }
}

function toSummary(kb) {
  return {
    id: kb.id,
    name: kb.name,
    status: kb.status || "READY",
    sourceCount: Array.isArray(kb.sources) ? kb.sources.length : 0,
    createdAt: kb.createdAt,
    updatedAt: kb.updatedAt || kb.createdAt,
  };
}

function syncSummaryList(kb) {
  const list = readJSON(LIST_KEY, []);
  const index = list.findIndex((item) => item.id === kb.id);
  const summary = toSummary(kb);

  if (index === -1) {
    list.push(summary);
  } else {
    list[index] = summary;
  }

  writeJSON(LIST_KEY, list);
  return list;
}

function removeFromSummaryList(id) {
  const list = readJSON(LIST_KEY, []).filter((item) => item.id !== id);
  writeJSON(LIST_KEY, list);
  return list;
}

/* ------------------------------------------------------------------ */
/* Knowledge Base CRUD                                                 */
/* ------------------------------------------------------------------ */

/** Get all knowledge bases (summary records, newest first). */
export function getAllKnowledgeBases() {
  const list = readJSON(LIST_KEY, []);
  return [...list].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}

/** Get a single knowledge base's full record (including sources). */
export function getKnowledgeBaseById(id) {
  if (!id) return null;
  return readJSON(recordKey(id), null);
}

/** Create a new knowledge base and persist it. Returns the full record. */
export function createKnowledgeBase(name) {
  const trimmedName = (name || "").trim();
  if (!trimmedName) {
    throw new Error("Knowledge base name is required.");
  }

  const now = new Date().toISOString();
  const knowledgeBase = {
    id: generateId("kb"),
    name: trimmedName,
    status: "READY",
    sources: [],
    createdAt: now,
    updatedAt: now,
  };

  writeJSON(recordKey(knowledgeBase.id), knowledgeBase);
  syncSummaryList(knowledgeBase);

  return knowledgeBase;
}

/** Update fields on a knowledge base (e.g. name). Returns updated record. */
export function updateKnowledgeBase(id, updates) {
  const existing = getKnowledgeBaseById(id);
  if (!existing) return null;

  const updated = {
    ...existing,
    ...updates,
    id: existing.id,
    updatedAt: new Date().toISOString(),
  };

  writeJSON(recordKey(id), updated);
  syncSummaryList(updated);

  return updated;
}

/** Delete a knowledge base entirely (record + summary entry). */
export function deleteKnowledgeBase(id) {
  localStorage.removeItem(recordKey(id));
  removeFromSummaryList(id);
}

/** Touch updatedAt without changing anything else (used by Refresh). */
export function touchKnowledgeBase(id) {
  return updateKnowledgeBase(id, {});
}

/* ------------------------------------------------------------------ */
/* Source CRUD (nested inside a knowledge base)                        */
/* ------------------------------------------------------------------ */

/**
 * Add one or more sources to a knowledge base.
 * `sources` is an array of partial source objects; each is completed
 * with an id, status and addedAt before saving.
 * Returns the updated knowledge base record.
 */
export function addSources(knowledgeBaseId, sources) {
  const kb = getKnowledgeBaseById(knowledgeBaseId);
  if (!kb) throw new Error("Knowledge base not found.");

  const now = new Date().toISOString();

  const completedSources = sources.map((source) => ({
    id: generateId("src"),
    title: source.title || "Untitled source",
    type: source.type, // "TEXT" | "URL" | "FILE"
    content: source.content || "",
    url: source.url || "",
    fileName: source.fileName || "",
    fileSize: source.fileSize || null,
    status: source.status || "COMPLETE",
    addedAt: now,
  }));

  const updated = {
    ...kb,
    sources: [...(kb.sources || []), ...completedSources],
    updatedAt: now,
  };

  writeJSON(recordKey(knowledgeBaseId), updated);
  syncSummaryList(updated);

  return updated;
}

/** Delete a single source from a knowledge base. Returns updated KB. */
export function deleteSource(knowledgeBaseId, sourceId) {
  const kb = getKnowledgeBaseById(knowledgeBaseId);
  if (!kb) throw new Error("Knowledge base not found.");

  const updated = {
    ...kb,
    sources: (kb.sources || []).filter((s) => s.id !== sourceId),
    updatedAt: new Date().toISOString(),
  };

  writeJSON(recordKey(knowledgeBaseId), updated);
  syncSummaryList(updated);

  return updated;
}

/** Delete many sources at once. Returns updated KB. */
export function deleteSources(knowledgeBaseId, sourceIds) {
  const kb = getKnowledgeBaseById(knowledgeBaseId);
  if (!kb) throw new Error("Knowledge base not found.");

  const idSet = new Set(sourceIds);
  const updated = {
    ...kb,
    sources: (kb.sources || []).filter((s) => !idSet.has(s.id)),
    updatedAt: new Date().toISOString(),
  };

  writeJSON(recordKey(knowledgeBaseId), updated);
  syncSummaryList(updated);

  return updated;
}

/** Update a single source's fields (e.g. `excluded`). Returns updated KB. */
export function updateSource(knowledgeBaseId, sourceId, updates) {
  const kb = getKnowledgeBaseById(knowledgeBaseId);
  if (!kb) throw new Error("Knowledge base not found.");

  const updated = {
    ...kb,
    sources: (kb.sources || []).map((s) =>
      s.id === sourceId ? { ...s, ...updates } : s
    ),
    updatedAt: new Date().toISOString(),
  };

  writeJSON(recordKey(knowledgeBaseId), updated);
  syncSummaryList(updated);

  return updated;
}

/** Set which sources are excluded, given the full list of excluded ids. */
export function setExclusions(knowledgeBaseId, excludedIds) {
  const kb = getKnowledgeBaseById(knowledgeBaseId);
  if (!kb) throw new Error("Knowledge base not found.");

  const idSet = new Set(excludedIds);
  const updated = {
    ...kb,
    sources: (kb.sources || []).map((s) => ({
      ...s,
      excluded: idSet.has(s.id),
    })),
    updatedAt: new Date().toISOString(),
  };

  writeJSON(recordKey(knowledgeBaseId), updated);
  syncSummaryList(updated);

  return updated;
}

/** Clear the "cache" for a KB. Frontend-only: resets all source statuses
 *  back to COMPLETE and bumps updatedAt, simulating a re-index. */
export function clearKnowledgeBaseCache(knowledgeBaseId) {
  const kb = getKnowledgeBaseById(knowledgeBaseId);
  if (!kb) throw new Error("Knowledge base not found.");

  const updated = {
    ...kb,
    sources: (kb.sources || []).map((s) => ({ ...s, status: "COMPLETE" })),
    updatedAt: new Date().toISOString(),
  };

  writeJSON(recordKey(knowledgeBaseId), updated);
  syncSummaryList(updated);

  return updated;
}

/** Client-side search/filter over a KB's sources by title or content. */
export function searchSources(sources, query) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return sources;

  return sources.filter((source) => {
    return (
      source.title?.toLowerCase().includes(q) ||
      source.content?.toLowerCase().includes(q) ||
      source.url?.toLowerCase().includes(q) ||
      source.fileName?.toLowerCase().includes(q) ||
      source.type?.toLowerCase().includes(q)
    );
  });
}

/* ------------------------------------------------------------------ */
/* Formatting helpers                                                  */
/* ------------------------------------------------------------------ */

export function formatRelativeTime(isoString) {
  if (!isoString) return "—";

  const then = new Date(isoString).getTime();
  const now = Date.now();
  const diffSeconds = Math.max(0, Math.floor((now - then) / 1000));

  if (diffSeconds < 10) return "Just now";
  if (diffSeconds < 60) return `${diffSeconds}s ago`;

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d ago`;

  return new Date(isoString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDate(isoString) {
  if (!isoString) return "—";
  return new Date(isoString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatShortId(id) {
  if (!id) return "";
  return id.length > 16 ? `${id.slice(0, 8)}...${id.slice(-6)}` : id;
}

export function formatFileSize(bytes) {
  if (!bytes && bytes !== 0) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
