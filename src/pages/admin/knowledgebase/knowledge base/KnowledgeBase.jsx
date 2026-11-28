// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Database,
//   Folder,
//   Clock,
//   Plus,
//   CheckCircle2,
//   AlertCircle,
//   Eye,
//   Pencil,
//   Trash2,
// } from "lucide-react";

// import config from "../../../config/Config";
// import { kbAuthHeaders } from "../hooks/kbAuth";
// import useKbTheme from "../hooks/useKbTheme";
// import { publishKbMeta, clearKbMeta } from "../hooks/kbMeta";
// import useSnackbar, { flashSnackbar } from "../hooks/useSnackbar";

// import CreateKnowledgeBase from "./CreateKnowledgeBase";
// import CreateSource from "../source/CreateSource";
// import DeleteKnowledgeBase from "./DeleteKnowledgeBase";
// import EditKnowledgeBase from "./EditKnowledgeBase";
// import ViewKnowledgeBase from "./ViewKnowledgeBase";
// import KnowledgeBaseDetails from "./KnowledgeBaseDetails";
// import Source from "../source/Source";

// // ============================================================
// // HELPERS
// // ============================================================

// const formatRelativeTime = (dateString) => {
//   if (!dateString) return "Just now";
//   const date = new Date(dateString);
//   if (Number.isNaN(date.getTime())) return "Recently";
//   const mins = Math.max(0, Math.floor((Date.now() - date.getTime()) / 60000));
//   if (mins < 1) return "Just now";
//   if (mins < 60) return `${mins}m ago`;
//   if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
//   return `${Math.floor(mins / 1440)}d ago`;
// };

// const extractItems = (data) => {
//   if (Array.isArray(data)) return data;
//   if (Array.isArray(data?.items)) return data.items;
//   if (Array.isArray(data?.data)) return data.data;
//   return [];
// };

// // ============================================================
// // PAGE
// // ============================================================

// export default function KnowledgeBase() {
//   const navigate = useNavigate();
//   const isDark = useKbTheme();

//   const [bases, setBases] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const { showSnackbar, snackbar } = useSnackbar();

//   const [showCreate, setShowCreate] = useState(false);
//   const [showCreateSource, setShowCreateSource] = useState(false);
//   const [createdKnowledgeBaseId, setCreatedKnowledgeBaseId] = useState(null);

//   const [showView, setShowView] = useState(false);
//   const [showEdit, setShowEdit] = useState(false);
//   const [showDelete, setShowDelete] = useState(false);
//   const [selected, setSelected] = useState(null);

//   const mounted = useRef(true);
//   useEffect(() => {
//     mounted.current = true;
//     return () => {
//       mounted.current = false;
//     };
//   }, []);

//   const showToast = showSnackbar;

//   // ----------------------------------------------------------
//   // GET /knowledge-bases   (+ GET /knowledge-bases/{id}/sources for count)
//   // ----------------------------------------------------------
//   const fetchKnowledgeBases = useCallback(async (showLoader = true) => {
//     try {
//       if (showLoader) setLoading(true);
//       setError("");

//       const response = await axios.get(`${config.BASE_URL}/knowledge-bases`, {
//         headers: { Accept: "*/*", ...kbAuthHeaders() },
//       });

//       const items = extractItems(response.data);
//       const formatted = items.map((base) => ({
//         id: base.id,
//         name: base.name || "Untitled",
//         description: base.description || "",
//         status: base.status || "active",
//         created_at: base.created_at,
//         updated_at: base.updated_at,
//         sourcesCount: null, // filled in below
//       }));

//       if (!mounted.current) return;
//       setBases(formatted);
//       publishKbMeta({
//         total:
//           typeof response.data?.total === "number"
//             ? response.data.total
//             : formatted.length,
//       });
//       setLoading(false);

//       // Source counts (one lightweight request per KB, in parallel)
//       const counts = await Promise.allSettled(
//         formatted.map((base) =>
//           axios.get(`${config.BASE_URL}/knowledge-bases/${base.id}/sources`, {
//             headers: { Accept: "*/*", ...kbAuthHeaders() },
//           })
//         )
//       );

//       if (!mounted.current) return;
//       setBases((prev) =>
//         prev.map((base, index) => {
//           const result = counts[index];
//           if (result?.status === "fulfilled") {
//             const data = result.value.data;
//             return {
//               ...base,
//               sourcesCount:
//                 typeof data?.total === "number"
//                   ? data.total
//                   : extractItems(data).length,
//             };
//           }
//           return { ...base, sourcesCount: 0 };
//         })
//       );
//     } catch (err) {
//       console.error("Get Knowledge Bases Error:", err);
//       const detail =
//         err?.response?.data?.detail ||
//         err?.response?.data?.message ||
//         "Failed to load knowledge bases. Please check your backend connection.";
//       if (!mounted.current) return;
//       setError(
//         Array.isArray(detail)
//           ? detail.map((d) => d?.msg || "").filter(Boolean).join(", ")
//           : String(detail)
//       );
//       setBases([]);
//       publishKbMeta({ total: 0 });
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     clearKbMeta();
//     fetchKnowledgeBases();
//     return () => clearKbMeta();
//   }, [fetchKnowledgeBases]);

//   // ----------------------------------------------------------
//   // HEADER EVENTS  (Header: "Create Knowledge Base" button, refresh)
//   // ----------------------------------------------------------
//   useEffect(() => {
//     const onCreate = () => setShowCreate(true);
//     const onRefresh = async () => {
//       await fetchKnowledgeBases(false);
//       showToast("Knowledge bases refreshed");
//     };
//     window.addEventListener("kb-create", onCreate);
//     window.addEventListener("kb-refresh", onRefresh);
//     return () => {
//       window.removeEventListener("kb-create", onCreate);
//       window.removeEventListener("kb-refresh", onRefresh);
//     };
//   }, [fetchKnowledgeBases, showToast]);

//   // ----------------------------------------------------------
//   // HANDLERS
//   // ----------------------------------------------------------
//   const handleCreate = async (created) => {
//     setShowCreate(false);
//     if (!created?.id) {
//       showToast("Knowledge base created, but ID was not returned.", "error");
//       await fetchKnowledgeBases(false);
//       return;
//     }
//     setCreatedKnowledgeBaseId(created.id);
//     await fetchKnowledgeBases(false);
//     showToast("Knowledge base created successfully");
//     window.setTimeout(() => setShowCreateSource(true), 300);
//   };

//   const openKnowledgeBase = (base) => {
//     if (base?.id) navigate(`/knowledge-base/${base.id}`);
//   };

//   const closeSelected = () => {
//     setShowView(false);
//     setShowEdit(false);
//     setShowDelete(false);
//     setSelected(null);
//   };

//   const handleUpdated = async () => {
//     closeSelected();
//     await fetchKnowledgeBases(false);
//     showToast("Knowledge base updated successfully");
//   };

//   const handleDeleted = async () => {
//     closeSelected();
//     await fetchKnowledgeBases(false);
//     showToast("Knowledge base deleted successfully");
//   };

//   // ----------------------------------------------------------
//   // THEME CLASSES
//   // ----------------------------------------------------------
//   const t = isDark
//     ? {
//         page: "bg-[#09090b] text-zinc-100",
//         card: "border-white/[0.08] bg-[#101012] hover:border-cyan-400/30",
//         title: "text-zinc-100",
//         sub: "text-zinc-400",
//         muted: "text-zinc-500",
//         divider: "border-white/[0.06]",
//         iconBox: "border-cyan-400/20 bg-cyan-400/[0.06] text-cyan-400",
//         badge: "border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-400",
//         dot: "bg-emerald-400",
//         create:
//           "border-white/[0.12] hover:border-cyan-400/40 hover:bg-cyan-500/[0.02]",
//         createIcon:
//           "border-white/[0.08] bg-white/[0.03] text-zinc-500 group-hover:text-cyan-400",
//         createTitle: "text-zinc-200 group-hover:text-cyan-400",
//         skeleton: "border-white/[0.08] bg-[#101012]",
//         skelBlock: "bg-white/[0.08]",
//         menu: "border-white/10 bg-[#161619] text-zinc-300",
//         menuItem: "hover:bg-white/[0.06]",
//         kebab: "text-zinc-500 hover:bg-white/[0.06] hover:text-zinc-200",
//         toast: "bg-[#101012] text-zinc-200",
//       }
//     : {
//         page: "bg-zinc-50 text-zinc-900",
//         card: "border-gray-200 bg-white hover:border-cyan-300",
//         title: "text-gray-900",
//         sub: "text-gray-500",
//         muted: "text-gray-400",
//         divider: "border-gray-100",
//         iconBox: "border-cyan-100 bg-cyan-50 text-cyan-600",
//         badge: "border-emerald-200 bg-emerald-50 text-emerald-600",
//         dot: "bg-emerald-500",
//         create: "border-gray-300 hover:border-cyan-400 hover:bg-cyan-50/40",
//         createIcon:
//           "border-gray-200 bg-white text-gray-400 group-hover:text-cyan-600",
//         createTitle: "text-gray-800 group-hover:text-cyan-700",
//         skeleton: "border-gray-200 bg-white",
//         skelBlock: "bg-gray-200",
//         menu: "border-gray-200 bg-white text-gray-700",
//         menuItem: "hover:bg-gray-50",
//         kebab: "text-gray-400 hover:bg-gray-100 hover:text-gray-700",
//         toast: "bg-white text-gray-800",
//       };

//   // ----------------------------------------------------------
//   // UI
//   // ----------------------------------------------------------
//   return (
//     <div className={`min-h-full w-full transition-colors duration-200 ${t.page}`}>
//       {snackbar}

//       <main className="mx-auto max-w-[1600px] p-6 lg:p-8">
//         {/* ERROR */}
//         {error && (
//           <div className="mb-6 flex items-center justify-between gap-4 rounded-lg border border-red-500/20 bg-red-500/[0.06] px-4 py-3">
//             <p className="text-sm font-medium text-red-500">{error}</p>
//             <button
//               type="button"
//               onClick={() => fetchKnowledgeBases()}
//               className="rounded bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700"
//             >
//               Retry
//             </button>
//           </div>
//         )}

//         <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
//           {/* CREATE CARD */}
//           <button
//             type="button"
//             onClick={() => setShowCreate(true)}
//             className={`group flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-transparent p-5 transition ${t.create}`}
//           >
//             <div
//               className={`flex h-12 w-12 items-center justify-center rounded-xl border transition ${t.createIcon}`}
//             >
//               <Plus size={22} />
//             </div>
//             <div className="text-center">
//               <p className={`text-sm font-semibold ${t.createTitle}`}>
//                 Create Knowledge Base
//               </p>
//               <p className={`mt-1 text-xs ${t.muted}`}>Add sources for agents</p>
//             </div>
//           </button>

//           {/* SKELETONS */}
//           {loading &&
//             Array.from({ length: 3 }).map((_, i) => (
//               <div
//                 key={`sk-${i}`}
//                 className={`min-h-[280px] animate-pulse rounded-xl border p-5 ${t.skeleton}`}
//               >
//                 <div className={`h-10 w-10 rounded-lg ${t.skelBlock}`} />
//                 <div className={`mt-5 h-4 w-2/3 rounded ${t.skelBlock}`} />
//                 <div className={`mt-2 h-3 w-1/2 rounded ${t.skelBlock}`} />
//                 <div className={`mt-8 border-t ${t.divider}`} />
//                 <div className="mt-6 flex justify-between">
//                   <div className={`h-3 w-1/4 rounded ${t.skelBlock}`} />
//                   <div className={`h-3 w-1/4 rounded ${t.skelBlock}`} />
//                 </div>
//               </div>
//             ))}

//           {/* KNOWLEDGE BASE CARDS */}
//           {!loading &&
//             bases.map((base) => {
//               const status = String(base.status || "active").toLowerCase();
//               const ready = ["active", "ready", "complete", "completed"].includes(
//                 status
//               );
//               return (
//                 <div
//                   key={base.id}
//                   role="button"
//                   tabIndex={0}
//                   onClick={() => openKnowledgeBase(base)}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter" || e.key === " ") {
//                       e.preventDefault();
//                       openKnowledgeBase(base);
//                     }
//                   }}
//                   className={`group relative flex min-h-[280px] cursor-pointer flex-col rounded-xl border p-5 transition hover:shadow-md ${t.card}`}
//                 >
//                   {/* TOP ROW */}
//                   <div className="flex items-start justify-between">
//                     <div
//                       className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${t.iconBox}`}
//                     >
//                       <Database size={18} />
//                     </div>

//                     <div className="flex items-center gap-1.5">
//                       <span
//                         className={`flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-wider ${
//                           ready
//                             ? t.badge
//                             : "border-amber-500/30 bg-amber-500/[0.08] text-amber-500"
//                         }`}
//                       >
//                         <span
//                           className={`h-1.5 w-1.5 rounded-full ${
//                             ready ? t.dot : "bg-amber-500"
//                           }`}
//                         />
//                         {ready ? "READY" : status.toUpperCase()}
//                       </span>

//                     </div>
//                   </div>

//                   {/* HOVER ARROW */}
//                   <div
//                     aria-hidden="true"
//                     className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="18"
//                       height="18"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="m9 18 6-6-6-6" />
//                     </svg>
//                   </div>

//                   {/* NAME */}
//                   <h3 className={`mt-4 truncate text-base font-semibold ${t.title}`}>
//                     {base.name}
//                   </h3>

//                   {/* ID */}
//                   <p className={`mt-1 truncate font-mono text-[11px] ${t.muted}`}>
//                     {base.id}
//                   </p>

//                   {/* DESCRIPTION */}
//                   {base.description && (
//                     <p className={`mt-2 line-clamp-2 text-[12px] ${t.sub}`}>
//                       {base.description}
//                     </p>
//                   )}

//                   <div className={`mt-4 border-t ${t.divider}`} />

//                   {/* BOTTOM ROW */}
//                   <div className="mt-auto flex items-center justify-between pt-4">
//                     <div className={`flex items-center gap-1.5 text-xs ${t.sub}`}>
//                       <Folder size={13} />
//                       <span>
//                         {base.sourcesCount === null
//                           ? "…"
//                           : `${base.sourcesCount} source${
//                               base.sourcesCount === 1 ? "" : "s"
//                             }`}
//                       </span>
//                     </div>
//                     <div className={`flex items-center gap-1.5 text-xs ${t.muted}`}>
//                       <Clock size={12} />
//                       <span>{formatRelativeTime(base.updated_at)}</span>
//                     </div>
//                   </div>

//                 </div>
//               );
//             })}

//           {/* EMPTY STATE */}
//           {!loading && !error && bases.length === 0 && (
//             <div
//               className={`col-span-full flex min-h-[280px] flex-col items-center justify-center rounded-xl border py-16 text-center ${t.card}`}
//             >
//               <div
//                 className={`flex h-12 w-12 items-center justify-center rounded-xl ${
//                   isDark ? "bg-white/[0.05]" : "bg-gray-100"
//                 } ${t.muted}`}
//               >
//                 <Database size={20} />
//               </div>
//               <p className={`mt-4 text-sm font-semibold ${t.title}`}>
//                 No Knowledge Bases
//               </p>
//               <p className={`mt-1 max-w-sm text-xs ${t.muted}`}>
//                 Create your first knowledge base to provide information for your
//                 AI agents.
//               </p>
//             </div>
//           )}
//         </div>
//       </main>

//       {/* MODALS */}
//       {showCreate && (
//         <CreateKnowledgeBase
//           onClose={() => setShowCreate(false)}
//           onCreate={handleCreate}
//         />
//       )}

//       {showCreateSource && createdKnowledgeBaseId && (
//         <CreateSource
//           knowledgeBaseId={createdKnowledgeBaseId}
//           onClose={() => {
//             setShowCreateSource(false);
//             setCreatedKnowledgeBaseId(null);
//           }}
//           onCreate={() => {
//             const id = createdKnowledgeBaseId;
//             setShowCreateSource(false);
//             setCreatedKnowledgeBaseId(null);
//             flashSnackbar("Source added — indexing started");
//             if (id) navigate(`/knowledge-base/${id}/sources`);
//           }}
//         />
//       )}

//       {showView && selected && (
//         <ViewKnowledgeBase knowledgeBaseId={selected.id} onClose={closeSelected} />
//       )}

//       {showEdit && selected && (
//         <EditKnowledgeBase
//           knowledgeBaseId={selected.id}
//           onClose={closeSelected}
//           onUpdated={handleUpdated}
//         />
//       )}

//       {showDelete && selected && (
//         <DeleteKnowledgeBase
//           knowledgeBaseId={selected.id}
//           knowledgeBaseName={selected.name}
//           onClose={closeSelected}
//           onDeleted={handleDeleted}
//         />
//       )}
//     </div>
//   );
// }

// // Re-exported so App.jsx only needs to import this one file:
// // import KnowledgeBase, { KnowledgeBaseDetails, Source } from ".../KnowledgeBase";
// export { KnowledgeBaseDetails, Source };



import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Database,
  Folder,
  Clock,
  Plus,
  CheckCircle2,
  AlertCircle,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import config from "../../../../config/Config";
import { kbAuthHeaders } from "../hooks/kbAuth";
import useKbTheme from "../hooks/useKbTheme";
import { publishKbMeta, clearKbMeta } from "../hooks/kbMeta";
import useSnackbar, { flashSnackbar } from "../hooks/useSnackbar";

import CreateKnowledgeBase from "./CreateKnowledgeBase";
import CreateSource from "../source/CreateSource";
import DeleteKnowledgeBase from "./DeleteKnowledgeBase";
import EditKnowledgeBase from "./EditKnowledgeBase";
import ViewKnowledgeBase from "./ViewKnowledgeBase";
import KnowledgeBaseDetails from "./KnowledgeBaseDetails";
import Source from "../source/Source";

// ============================================================
// HELPERS
// ============================================================

const formatRelativeTime = (dateString) => {
  if (!dateString) return "Just now";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "Recently";
  const mins = Math.max(0, Math.floor((Date.now() - date.getTime()) / 60000));
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
  return `${Math.floor(mins / 1440)}d ago`;
};

const extractItems = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

// ============================================================
// PAGE
// ============================================================

export default function KnowledgeBase() {
  const navigate = useNavigate();
  const isDark = useKbTheme();

  const [bases, setBases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { showSnackbar, snackbar } = useSnackbar();

  const [showCreate, setShowCreate] = useState(false);
  const [showCreateSource, setShowCreateSource] = useState(false);
  const [createdKnowledgeBaseId, setCreatedKnowledgeBaseId] = useState(null);

  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selected, setSelected] = useState(null);

  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const showToast = showSnackbar;

  // ----------------------------------------------------------
  // GET /knowledge-bases   (+ GET /knowledge-bases/{id}/sources for count)
  // ----------------------------------------------------------
  const fetchKnowledgeBases = useCallback(async (showLoader = true) => {
    try {
      if (showLoader) setLoading(true);
      setError("");

      const response = await axios.get(`${config.BASE_URL}/knowledge-bases`, {
        headers: { Accept: "*/*", ...kbAuthHeaders() },
      });

      const items = extractItems(response.data);
      const formatted = items.map((base) => ({
        id: base.id,
        name: base.name || "Untitled",
        description: base.description || "",
        status: base.status || "active",
        created_at: base.created_at,
        updated_at: base.updated_at,
        sourcesCount: null, // filled in below
      }));

      if (!mounted.current) return;
      setBases(formatted);
      publishKbMeta({
        total:
          typeof response.data?.total === "number"
            ? response.data.total
            : formatted.length,
      });
      setLoading(false);

      // Source counts (one lightweight request per KB, in parallel)
      const counts = await Promise.allSettled(
        formatted.map((base) =>
          axios.get(`${config.BASE_URL}/knowledge-bases/${base.id}/sources`, {
            headers: { Accept: "*/*", ...kbAuthHeaders() },
          })
        )
      );

      if (!mounted.current) return;
      setBases((prev) =>
        prev.map((base, index) => {
          const result = counts[index];
          if (result?.status === "fulfilled") {
            const data = result.value.data;
            return {
              ...base,
              sourcesCount:
                typeof data?.total === "number"
                  ? data.total
                  : extractItems(data).length,
            };
          }
          return { ...base, sourcesCount: 0 };
        })
      );
    } catch (err) {
      console.error("Get Knowledge Bases Error:", err);
      const detail =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Failed to load knowledge bases. Please check your backend connection.";
      if (!mounted.current) return;
      setError(
        Array.isArray(detail)
          ? detail.map((d) => d?.msg || "").filter(Boolean).join(", ")
          : String(detail)
      );
      setBases([]);
      publishKbMeta({ total: 0 });
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    clearKbMeta();
    fetchKnowledgeBases();
    return () => clearKbMeta();
  }, [fetchKnowledgeBases]);

  // ----------------------------------------------------------
  // HEADER EVENTS  (Header: "Create Knowledge Base" button, refresh)
  // ----------------------------------------------------------
  useEffect(() => {
    const onCreate = () => setShowCreate(true);
    const onRefresh = async () => {
      await fetchKnowledgeBases(false);
      showToast("Knowledge bases refreshed");
    };
    window.addEventListener("kb-create", onCreate);
    window.addEventListener("kb-refresh", onRefresh);
    return () => {
      window.removeEventListener("kb-create", onCreate);
      window.removeEventListener("kb-refresh", onRefresh);
    };
  }, [fetchKnowledgeBases, showToast]);

  // ----------------------------------------------------------
  // HANDLERS
  // ----------------------------------------------------------
  const handleCreate = async (created) => {
    setShowCreate(false);
    if (!created?.id) {
      showToast("Knowledge base created, but ID was not returned.", "error");
      await fetchKnowledgeBases(false);
      return;
    }
    setCreatedKnowledgeBaseId(created.id);
    await fetchKnowledgeBases(false);
    showToast("Knowledge base created successfully");
    window.setTimeout(() => setShowCreateSource(true), 300);
  };

  const openKnowledgeBase = (base) => {
    if (base?.id) navigate(`/knowledge-base/${base.id}`);
  };

  const closeSelected = () => {
    setShowView(false);
    setShowEdit(false);
    setShowDelete(false);
    setSelected(null);
  };

  const handleUpdated = async () => {
    closeSelected();
    await fetchKnowledgeBases(false);
    showToast("Knowledge base updated successfully");
  };

  const handleDeleted = async () => {
    closeSelected();
    await fetchKnowledgeBases(false);
    showToast("Knowledge base deleted successfully");
  };

  // ----------------------------------------------------------
  // THEME CLASSES
  // ----------------------------------------------------------
  const t = isDark
    ? {
        page: "bg-[#09090b] text-zinc-100",
        card: "border-white/[0.08] bg-[#101012] hover:border-cyan-400/30",
        title: "text-zinc-100",
        sub: "text-zinc-400",
        muted: "text-zinc-500",
        divider: "border-white/[0.06]",
        iconBox: "border-cyan-400/20 bg-cyan-400/[0.06] text-cyan-400",
        badge: "border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-400",
        dot: "bg-emerald-400",
        create:
          "border-white/[0.12] hover:border-cyan-400/40 hover:bg-cyan-500/[0.02]",
        createIcon:
          "border-white/[0.08] bg-white/[0.03] text-zinc-500 group-hover:text-cyan-400",
        createTitle: "text-zinc-200 group-hover:text-cyan-400",
        skeleton: "border-white/[0.08] bg-[#101012]",
        skelBlock: "bg-white/[0.08]",
        menu: "border-white/10 bg-[#161619] text-zinc-300",
        menuItem: "hover:bg-white/[0.06]",
        kebab: "text-zinc-500 hover:bg-white/[0.06] hover:text-zinc-200",
        toast: "bg-[#101012] text-zinc-200",
      }
    : {
        page: "bg-zinc-50 text-zinc-900",
        card: "border-gray-200 bg-white hover:border-cyan-300",
        title: "text-gray-900",
        sub: "text-gray-500",
        muted: "text-gray-400",
        divider: "border-gray-100",
        iconBox: "border-cyan-100 bg-cyan-50 text-cyan-600",
        badge: "border-emerald-200 bg-emerald-50 text-emerald-600",
        dot: "bg-emerald-500",
        create: "border-gray-300 hover:border-cyan-400 hover:bg-cyan-50/40",
        createIcon:
          "border-gray-200 bg-white text-gray-400 group-hover:text-cyan-600",
        createTitle: "text-gray-800 group-hover:text-cyan-700",
        skeleton: "border-gray-200 bg-white",
        skelBlock: "bg-gray-200",
        menu: "border-gray-200 bg-white text-gray-700",
        menuItem: "hover:bg-gray-50",
        kebab: "text-gray-400 hover:bg-gray-100 hover:text-gray-700",
        toast: "bg-white text-gray-800",
      };

  // ----------------------------------------------------------
  // UI
  // ----------------------------------------------------------
  return (
    <div className={`min-h-full w-full transition-colors duration-200 ${t.page}`}>
      {snackbar}

      <main className="mx-auto max-w-[1600px] p-6 lg:p-8">
        {/* ERROR */}
        {error && (
          <div className="mb-6 flex items-center justify-between gap-4 rounded-lg border border-red-500/20 bg-red-500/[0.06] px-4 py-3">
            <p className="text-sm font-medium text-red-500">{error}</p>
            <button
              type="button"
              onClick={() => fetchKnowledgeBases()}
              className="rounded bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {/* CREATE CARD */}
          <button
            type="button"
            onClick={() => setShowCreate(true)}
            className={`group flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-transparent p-5 transition ${t.create}`}
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl border transition ${t.createIcon}`}
            >
              <Plus size={22} />
            </div>
            <div className="text-center">
              <p className={`text-sm font-semibold ${t.createTitle}`}>
                Create Knowledge Base
              </p>
              <p className={`mt-1 text-xs ${t.muted}`}>Add sources for agents</p>
            </div>
          </button>

          {/* SKELETONS */}
          {loading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={`sk-${i}`}
                className={`min-h-[280px] animate-pulse rounded-xl border p-5 ${t.skeleton}`}
              >
                <div className={`h-10 w-10 rounded-lg ${t.skelBlock}`} />
                <div className={`mt-5 h-4 w-2/3 rounded ${t.skelBlock}`} />
                <div className={`mt-2 h-3 w-1/2 rounded ${t.skelBlock}`} />
                <div className={`mt-8 border-t ${t.divider}`} />
                <div className="mt-6 flex justify-between">
                  <div className={`h-3 w-1/4 rounded ${t.skelBlock}`} />
                  <div className={`h-3 w-1/4 rounded ${t.skelBlock}`} />
                </div>
              </div>
            ))}

          {/* KNOWLEDGE BASE CARDS */}
          {!loading &&
            bases.map((base) => {
              const status = String(base.status || "active").toLowerCase();
              const ready = ["active", "ready", "complete", "completed"].includes(
                status
              );
              return (
                <div
                  key={base.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => openKnowledgeBase(base)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openKnowledgeBase(base);
                    }
                  }}
                  className={`group relative flex min-h-[280px] cursor-pointer flex-col rounded-xl border p-5 transition hover:shadow-md ${t.card}`}
                >
                  {/* TOP ROW */}
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${t.iconBox}`}
                    >
                      <Database size={18} />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span
                        className={`flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-wider ${
                          ready
                            ? t.badge
                            : "border-amber-500/30 bg-amber-500/[0.08] text-amber-500"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            ready ? t.dot : "bg-amber-500"
                          }`}
                        />
                        {ready ? "READY" : status.toUpperCase()}
                      </span>

                      {/* DELETE KNOWLEDGE BASE */}
                      <button
                        type="button"
                        title="Delete knowledge base"
                        aria-label={`Delete ${base.name}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelected(base);
                          setShowDelete(true);
                        }}
                        onKeyDown={(e) => e.stopPropagation()}
                        className={`flex h-7 w-7 items-center justify-center rounded-md border transition ${
                          isDark
                            ? "border-red-500/30 bg-red-500/[0.08] text-red-400 hover:bg-red-500/20"
                            : "border-red-200 bg-red-50 text-red-500 hover:bg-red-100"
                        }`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* HOVER ARROW */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </div>

                  {/* NAME */}
                  <h3 className={`mt-4 truncate text-base font-semibold ${t.title}`}>
                    {base.name}
                  </h3>

                  {/* ID */}
                  <p className={`mt-1 truncate font-mono text-[11px] ${t.muted}`}>
                    {base.id}
                  </p>

                  {/* DESCRIPTION */}
                  {base.description && (
                    <p className={`mt-2 line-clamp-2 text-[12px] ${t.sub}`}>
                      {base.description}
                    </p>
                  )}

                  <div className={`mt-4 border-t ${t.divider}`} />

                  {/* BOTTOM ROW */}
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className={`flex items-center gap-1.5 text-xs ${t.sub}`}>
                      <Folder size={13} />
                      <span>
                        {base.sourcesCount === null
                          ? "…"
                          : `${base.sourcesCount} source${
                              base.sourcesCount === 1 ? "" : "s"
                            }`}
                      </span>
                    </div>
                    <div className={`flex items-center gap-1.5 text-xs ${t.muted}`}>
                      <Clock size={12} />
                      <span>{formatRelativeTime(base.updated_at)}</span>
                    </div>
                  </div>

                </div>
              );
            })}

          {/* EMPTY STATE */}
          {!loading && !error && bases.length === 0 && (
            <div
              className={`col-span-full flex min-h-[280px] flex-col items-center justify-center rounded-xl border py-16 text-center ${t.card}`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                  isDark ? "bg-white/[0.05]" : "bg-gray-100"
                } ${t.muted}`}
              >
                <Database size={20} />
              </div>
              <p className={`mt-4 text-sm font-semibold ${t.title}`}>
                No Knowledge Bases
              </p>
              <p className={`mt-1 max-w-sm text-xs ${t.muted}`}>
                Create your first knowledge base to provide information for your
                AI agents.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* MODALS */}
      {showCreate && (
        <CreateKnowledgeBase
          onClose={() => setShowCreate(false)}
          onCreate={handleCreate}
        />
      )}

      {showCreateSource && createdKnowledgeBaseId && (
        <CreateSource
          knowledgeBaseId={createdKnowledgeBaseId}
          onClose={() => {
            setShowCreateSource(false);
            setCreatedKnowledgeBaseId(null);
          }}
          onCreate={() => {
            const id = createdKnowledgeBaseId;
            setShowCreateSource(false);
            setCreatedKnowledgeBaseId(null);
            flashSnackbar("Source added — indexing started");
            if (id) navigate(`/knowledge-base/${id}/sources`);
          }}
        />
      )}

      {showView && selected && (
        <ViewKnowledgeBase knowledgeBaseId={selected.id} onClose={closeSelected} />
      )}

      {showEdit && selected && (
        <EditKnowledgeBase
          knowledgeBaseId={selected.id}
          onClose={closeSelected}
          onUpdated={handleUpdated}
        />
      )}

      {showDelete && selected && (
        <DeleteKnowledgeBase
          knowledgeBaseId={selected.id}
          knowledgeBaseName={selected.name}
          onClose={closeSelected}
          onDeleted={handleDeleted}
        />
      )}
    </div>
  );
}

// Re-exported so App.jsx only needs to import this one file:
// import KnowledgeBase, { KnowledgeBaseDetails, Source } from ".../KnowledgeBase";
export { KnowledgeBaseDetails, Source };