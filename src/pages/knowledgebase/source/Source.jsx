import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Plus,
  Eye,
  Trash2,
  RefreshCw,
  FileText,
  Link as LinkIcon,
  File,
  Loader2,
  AlertCircle,
  ArrowLeft,
  Search,
  Copy,
  CheckCircle2,
  FolderOpen,
  X,
  Send,
  Sparkles,
  MessageSquare,
  Bot,
  User,
  Pencil,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import axios from "axios";

import config from "../../../config/Config";

import CreateSource from "./CreateSource";
import ViewSource from "./ViewSource";
import DeleteSource from "./DeleteSource";
import DeleteKnowledgeBase from "../knowledge base/DeleteKnowledgeBase";
import EditKnowledgeBase from "../knowledge base/EditKnowledgeBase";
import { publishKbMeta, clearKbMeta } from "../hooks/kbMeta";
import useSnackbar, { flashSnackbar } from "../hooks/useSnackbar";

// ============================================================
// SOURCE PAGE
// ============================================================

const Source = ({
  knowledgeBaseId: propKnowledgeBaseId,
  knowledgeBaseName: propKnowledgeBaseName,
}) => {
  // ==========================================================
  // THEME
  // ==========================================================
  // This page follows the existing Header theme toggle. It watches
  // the <html>/<body> theme class/attributes, so no second toggle
  // is required on this page.
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const readTheme = () => {
      const root = document.documentElement;
      const body = document.body;

      const rootTheme =
        root.getAttribute("data-theme") ||
        root.getAttribute("data-mode") ||
        root.getAttribute("data-color-scheme");

      const bodyTheme =
        body.getAttribute("data-theme") ||
        body.getAttribute("data-mode") ||
        body.getAttribute("data-color-scheme");

      const dark =
        root.classList.contains("dark") ||
        body.classList.contains("dark") ||
        root.classList.contains("dark-mode") ||
        body.classList.contains("dark-mode") ||
        rootTheme === "dark" ||
        bodyTheme === "dark";

      setIsDark(dark);
    };

    readTheme();

    const observer = new MutationObserver(readTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "data-mode", "data-color-scheme"],
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "data-mode", "data-color-scheme"],
    });

    window.addEventListener("storage", readTheme);
    window.addEventListener("theme-changed", readTheme);

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", readTheme);
      window.removeEventListener("theme-changed", readTheme);
    };
  }, []);

  const {
    knowledgeBaseId: routeKnowledgeBaseId,
  } = useParams();

  const navigate = useNavigate();

  // ==========================================================
  // KNOWLEDGE BASE ID
  // ==========================================================

  const knowledgeBaseId =
    routeKnowledgeBaseId ||
    propKnowledgeBaseId;

  // ==========================================================
  // STATE
  // ==========================================================

  const [sources, setSources] = useState([]);

  const [knowledgeBaseName, setKnowledgeBaseName] =
    useState(propKnowledgeBaseName || "");

  // Full knowledge base record (GET /knowledge-bases/{id})
  const [knowledgeBase, setKnowledgeBase] = useState(null);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  // ==========================================================
  // ACTIVE TAB
  // ==========================================================

  const [activeTab, setActiveTab] =
    useState("sources");

  // ==========================================================
  // PLAYGROUND STATE
  // ==========================================================

  const [playgroundInput, setPlaygroundInput] =
    useState("");

  const [playgroundMessages, setPlaygroundMessages] =
    useState([]);

  const [playgroundLoading, setPlaygroundLoading] =
    useState(false);

  // ==========================================================
  // MODALS
  // ==========================================================

  const [showCreate, setShowCreate] =
    useState(false);

  const [showView, setShowView] =
    useState(false);

  const [showDelete, setShowDelete] =
    useState(false);

  const [selectedSource, setSelectedSource] =
    useState(null);

  // Knowledge base level modals (opened from Header buttons / edit icon)
  const [showEditKb, setShowEditKb] = useState(false);
  const [showDeleteKb, setShowDeleteKb] = useState(false);

  // ==========================================================
  // SNACKBAR (top-right)
  // ==========================================================

  const { showSnackbar, snackbar } = useSnackbar();

  const showToast = useCallback(
    (message, type = "success") => showSnackbar(message, type),
    [showSnackbar]
  );

  // ==========================================================
  // COPY STATE
  // ==========================================================

  const [copied, setCopied] =
    useState(false);

  // ==========================================================
  // FETCH SOURCES
  // ==========================================================

  const fetchSources = useCallback(
    async (showRefreshLoader = false) => {
      if (!knowledgeBaseId) {
        setError(
          "Knowledge base ID is missing."
        );

        setSources([]);
        setLoading(false);
        setRefreshing(false);

        return;
      }

      try {
        if (showRefreshLoader) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const response = await axios.get(
          `${config.BASE_URL}/knowledge-bases/${knowledgeBaseId}/sources`,
          {
            headers: {
              Accept: "*/*",
            },
          }
        );

        const responseData = response.data;
        let sourceItems = [];

        if (Array.isArray(responseData)) {
          sourceItems = responseData;
        } else if (Array.isArray(responseData?.items)) {
          sourceItems = responseData.items;
        } else if (Array.isArray(responseData?.data)) {
          sourceItems = responseData.data;
        } else if (Array.isArray(responseData?.sources)) {
          sourceItems = responseData.sources;
        } else if (responseData?.data && typeof responseData.data === "object") {
          if (Array.isArray(responseData.data.items)) {
            sourceItems = responseData.data.items;
          } else if (Array.isArray(responseData.data.sources)) {
            sourceItems = responseData.data.sources;
          }
        }

        setSources(
          Array.isArray(sourceItems) ? sourceItems : []
        );
      } catch (err) {
        console.error("Fetch Sources Error:", err);
        const errorMessage =
          err?.response?.data?.detail ||
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load sources.";

        setError(
          Array.isArray(errorMessage)
            ? errorMessage.map((item) => item?.msg || "").filter(Boolean).join(", ")
            : String(errorMessage)
        );
        setSources([]);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [knowledgeBaseId]
  );

  // ==========================================================
  // FETCH KNOWLEDGE BASE NAME
  // ==========================================================

  const fetchKnowledgeBaseName = useCallback(async () => {
    if (!knowledgeBaseId) return;

    try {
      // GET /knowledge-bases/{knowledge_base_id}
      const response = await axios.get(
        `${config.BASE_URL}/knowledge-bases/${knowledgeBaseId}`,
        { headers: { Accept: "*/*" } }
      );

      const data = response.data;
      if (data && typeof data === "object") {
        setKnowledgeBase(data);
        if (data.name) setKnowledgeBaseName(data.name);
      }
    } catch (err) {
      console.error("Fetch Knowledge Base Error:", err);
    }
  }, [knowledgeBaseId]);

  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {
    const loadInitialData = async () => {
      if (!knowledgeBaseId) {
        setLoading(false);
        setError("Knowledge base ID is missing.");
        return;
      }
      await Promise.all([
        fetchSources(false),
        fetchKnowledgeBaseName(),
      ]);
    };
    loadInitialData();
  }, [knowledgeBaseId, fetchSources, fetchKnowledgeBaseName]);

  // ==========================================================
  // SHARE KB INFO WITH THE GLOBAL HEADER
  // ==========================================================

  useEffect(() => {
    publishKbMeta({
      id: knowledgeBaseId,
      name: knowledgeBaseName || "",
      sourcesCount: sources.length,
    });
  }, [knowledgeBaseId, knowledgeBaseName, sources.length]);

  useEffect(() => () => clearKbMeta(), []);

  // ==========================================================
  // HEADER EVENTS
  // ==========================================================

  useEffect(() => {
    const handleHeaderRefresh = async () => {
      await Promise.all([fetchSources(true), fetchKnowledgeBaseName()]);
      showToast("Refreshed.");
    };
    const handleHeaderClearCache = async () => {
      setSearchTerm("");
      setSelectedSource(null);
      await Promise.all([fetchSources(true), fetchKnowledgeBaseName()]);
      showToast("Cache cleared.");
    };
    const handleHeaderAddSource = () => {
      setSelectedSource(null);
      setShowCreate(true);
    };
    const handleHeaderDelete = () => setShowDeleteKb(true);
    const handleHeaderExclusions = () =>
      showToast("Exclusions are not available yet.", "error");

    window.addEventListener("kb-refresh", handleHeaderRefresh);
    window.addEventListener("kb-clear-cache", handleHeaderClearCache);
    window.addEventListener("kb-add-source", handleHeaderAddSource);
    window.addEventListener("kb-delete", handleHeaderDelete);
    window.addEventListener("kb-exclusions", handleHeaderExclusions);

    return () => {
      window.removeEventListener("kb-refresh", handleHeaderRefresh);
      window.removeEventListener("kb-clear-cache", handleHeaderClearCache);
      window.removeEventListener("kb-add-source", handleHeaderAddSource);
      window.removeEventListener("kb-delete", handleHeaderDelete);
      window.removeEventListener("kb-exclusions", handleHeaderExclusions);
    };
  }, [fetchSources, fetchKnowledgeBaseName, showToast]);

  // ==========================================================
  // FILTER SOURCES
  // ==========================================================

  const filteredSources = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return sources;

    return sources.filter((source) => {
      const title = String(source?.title || "").toLowerCase();
      const type = String(source?.source_type || "").toLowerCase();
      const fileName = String(source?.file_name || "").toLowerCase();
      const content = String(source?.content || "").toLowerCase();
      const url = String(source?.url || "").toLowerCase();

      return (
        title.includes(query) ||
        type.includes(query) ||
        fileName.includes(query) ||
        content.includes(query) ||
        url.includes(query)
      );
    });
  }, [sources, searchTerm]);

  // ==========================================================
  // HANDLERS
  // ==========================================================

  const handleSourceCreated = async (createdSource) => {
    setShowCreate(false);
    setSelectedSource(null);
    await fetchSources(true);
    showToast("Source added — indexing started");
  };

  const handleViewSource = (source) => {
    setSelectedSource(source);
    setShowView(true);
  };

  const handleDeleteClick = (source) => {
    setSelectedSource(source);
    setShowDelete(true);
  };

  const handleSourceDeleted = async (sourceId) => {
    setShowDelete(false);
    setSelectedSource(null);
    await fetchSources(true);
    showToast("Source deleted successfully");
  };

  const handleRefresh = async () => {
    await fetchSources(true);
    showToast("Sources refreshed.");
  };

  const handleCopyId = async () => {
    if (!knowledgeBaseId) return;
    try {
      await navigator.clipboard.writeText(knowledgeBaseId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const handleBack = () => {
    navigate("/knowledge-base");
  };

  // ==========================================================
  // PLAYGROUND HANDLERS
  // ==========================================================

  const handlePlaygroundSubmit = () => {
    const message = playgroundInput.trim();
    if (!message || playgroundLoading) return;

    setPlaygroundMessages((prev) => [
      ...prev,
      { id: Date.now(), role: "user", content: message },
    ]);
    setPlaygroundInput("");
    setPlaygroundLoading(true);

    // Simulate API call
    window.setTimeout(() => {
      setPlaygroundMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: "This is a simulated response from your knowledge base.",
        },
      ]);
      setPlaygroundLoading(false);
    }, 700);
  };

  const handlePlaygroundKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handlePlaygroundSubmit();
    }
  };

  const clearPlayground = () => {
    setPlaygroundMessages([]);
    setPlaygroundInput("");
  };

  // ==========================================================
  // HELPERS
  // ==========================================================

  const formatDate = (date) => {
    if (!date) return "-";
    try {
      return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit", month: "short", year: "numeric",
      });
    } catch { return "-"; }
  };

  const formatRelative = (date) => {
    if (!date) return "";
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return "";
    const mins = Math.max(0, Math.floor((Date.now() - d.getTime()) / 60000));
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
    return `${Math.floor(mins / 1440)}d ago`;
  };

  const kbStatus = String(knowledgeBase?.status || "active").toLowerCase();
  const kbReady = ["active", "ready", "complete", "completed"].includes(kbStatus);

  const normalizeSourceType = (sourceType) => String(sourceType || "text").toLowerCase();

  const getSourceIcon = (sourceType) => {
    switch (normalizeSourceType(sourceType)) {
      case "url": return <LinkIcon size={17} />;
      case "file": return <File size={17} />;
      default: return <FileText size={17} />;
    }
  };

  const getSourceTypeLabel = (sourceType) => normalizeSourceType(sourceType).toUpperCase();

  const getSourceTypeStyle = (sourceType) => {
    switch (normalizeSourceType(sourceType)) {
      case "url":
        return { wrapper: "bg-purple-50 text-purple-700 border-purple-200", icon: "bg-purple-100 text-purple-600" };
      case "file":
        return { wrapper: "bg-orange-50 text-orange-700 border-orange-200", icon: "bg-orange-100 text-orange-600" };
      default:
        return { wrapper: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: "bg-emerald-100 text-emerald-600" };
    }
  };

  const getStatusStyle = (status) => {
    const normalized = String(status || "").toLowerCase();
    if (["complete", "completed", "ready", "active"].includes(normalized)) {
      return "border-emerald-200 bg-emerald-50 text-emerald-600";
    }
    if (["processing", "indexing", "pending"].includes(normalized)) {
      return "border-amber-200 bg-amber-50 text-amber-600";
    }
    if (["failed", "error"].includes(normalized)) {
      return "border-red-200 bg-red-50 text-red-600";
    }
    return "border-gray-200 bg-gray-50 text-gray-600";
  };

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <div className={`source-page-theme ${isDark ? "dark-mode" : "light-mode"} flex min-h-[500px] w-full items-center justify-center bg-white`}>
        <div className="flex flex-col items-center gap-3 text-sm text-gray-500">
          <Loader2 size={22} className="animate-spin text-cyan-600" />
          <span>Loading sources...</span>
        </div>
      </div>
    );
  }

  // ==========================================================
  // MAIN UI
  // ==========================================================

  return (
    <div className={`source-page-theme ${isDark ? "dark-mode" : "light-mode"} min-h-full w-full bg-white text-gray-900`}>

      {/* ==========================================================
          THEME STYLES
          ========================================================== */}
      <style>{`
        .source-page-theme {
          min-height: 100%;
          transition: background-color 180ms ease, color 180ms ease;
        }

        .source-page-theme.dark-mode {
          color-scheme: dark;
          background-color: #09090b;
          color: #f4f4f5;
        }

        .source-page-theme.dark-mode .bg-white,
        .source-page-theme.dark-mode [class*="bg-white"] {
          background-color: #101114 !important;
        }

        .source-page-theme.dark-mode .bg-gray-50,
        .source-page-theme.dark-mode [class*="bg-gray-50"] {
          background-color: #15171b !important;
        }

        .source-page-theme.dark-mode .bg-gray-100,
        .source-page-theme.dark-mode [class*="bg-gray-100"] {
          background-color: #1c1f24 !important;
        }

        .source-page-theme.dark-mode .bg-gray-200,
        .source-page-theme.dark-mode [class*="bg-gray-200"] {
          background-color: #272b33 !important;
        }

        .source-page-theme.dark-mode .text-gray-900 {
          color: #f4f4f5 !important;
        }

        .source-page-theme.dark-mode .text-gray-800 {
          color: #e4e4e7 !important;
        }

        .source-page-theme.dark-mode .text-gray-700 {
          color: #d4d4d8 !important;
        }

        .source-page-theme.dark-mode .text-gray-600,
        .source-page-theme.dark-mode .text-gray-500 {
          color: #a1a1aa !important;
        }

        .source-page-theme.dark-mode .text-gray-400 {
          color: #71717a !important;
        }

        .source-page-theme.dark-mode .border-gray-100 {
          border-color: #22252b !important;
        }

        .source-page-theme.dark-mode .border-gray-200 {
          border-color: #2a2d33 !important;
        }

        .source-page-theme.dark-mode .border-gray-300 {
          border-color: #3a3f48 !important;
        }

        .source-page-theme.dark-mode .hover\\:bg-gray-50:hover {
          background-color: #1a1d22 !important;
        }

        .source-page-theme.dark-mode .hover\\:bg-gray-100:hover {
          background-color: #22252b !important;
        }

        .source-page-theme.dark-mode .hover\\:text-gray-700:hover {
          color: #f4f4f5 !important;
        }

        .source-page-theme.dark-mode .hover\\:text-gray-800:hover,
        .source-page-theme.dark-mode .hover\\:text-gray-900:hover {
          color: #ffffff !important;
        }

        .source-page-theme.dark-mode [class*="bg-red-50"] {
          background-color: #2a1517 !important;
        }

        .source-page-theme.dark-mode [class*="border-red-200"] {
          border-color: #5b252a !important;
        }

        .source-page-theme.dark-mode [class*="bg-cyan-50"] {
          background-color: #10262b !important;
        }

        .source-page-theme.dark-mode [class*="border-cyan-200"] {
          border-color: #164e63 !important;
        }

        .source-page-theme.dark-mode [class*="bg-purple-50"] {
          background-color: #21182d !important;
        }

        .source-page-theme.dark-mode [class*="bg-purple-100"] {
          background-color: #2d2040 !important;
        }

        .source-page-theme.dark-mode [class*="border-purple-200"] {
          border-color: #55356f !important;
        }

        .source-page-theme.dark-mode [class*="bg-orange-50"] {
          background-color: #2b2115 !important;
        }

        .source-page-theme.dark-mode [class*="bg-orange-100"] {
          background-color: #382a18 !important;
        }

        .source-page-theme.dark-mode [class*="border-orange-200"] {
          border-color: #65441f !important;
        }

        .source-page-theme.dark-mode [class*="bg-emerald-50"] {
          background-color: #10251e !important;
        }

        .source-page-theme.dark-mode [class*="bg-emerald-100"] {
          background-color: #16352a !important;
        }

        .source-page-theme.dark-mode [class*="border-emerald-200"] {
          border-color: #245b47 !important;
        }

        .source-page-theme.dark-mode input::placeholder {
          color: #71717a !important;
        }

        .source-page-theme.dark-mode input {
          caret-color: #22d3ee;
        }

        .source-page-theme.dark-mode table tbody tr {
          border-color: #22252b !important;
        }

        .source-page-theme.dark-mode table tbody tr:hover {
          background-color: #17191e !important;
        }

        .source-page-theme.dark-mode .shadow-sm,
        .source-page-theme.dark-mode .shadow-xl {
          --tw-shadow-color: rgb(0 0 0 / 0.35);
        }
      `}</style>

      {snackbar}

      <main className="px-6 py-5">
        {/* BACK */}
        <button type="button" onClick={handleBack} className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900">
          <ArrowLeft size={16} />
          All Knowledge Bases
        </button>

        {/* KB INFO */}
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-xl font-semibold text-gray-900">
                {knowledgeBaseName || knowledgeBaseId}
              </h1>
              <button type="button" onClick={handleCopyId} className="rounded-md p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700" title="Copy Knowledge Base ID">
                {copied ? <CheckCircle2 size={15} className="text-emerald-500" /> : <Copy size={15} />}
              </button>
              <button type="button" onClick={() => setShowEditKb(true)} className="rounded-md p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700" title="Edit Knowledge Base">
                <Pencil size={15} />
              </button>
            </div>
            <p className="mt-1 font-mono text-[11px] text-gray-400">
              {knowledgeBaseId}
            </p>
            {knowledgeBase?.description && (
              <p className="mt-1 max-w-xl truncate text-xs text-gray-500">
                {knowledgeBase.description}
              </p>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-semibold text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {kbReady ? "READY" : kbStatus.toUpperCase()}
            </span>
            <span className="text-gray-400">
              {sources.length} {sources.length === 1 ? "source" : "sources"}
            </span>
            <span className="hidden text-gray-400 sm:inline">
              {knowledgeBase?.updated_at ? `Updated ${formatRelative(knowledgeBase.updated_at)}` : ""}
            </span>
          </div>
        </div>

        {/* TABS */}
        <div className="mb-6 inline-flex overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={() => setActiveTab("sources")}
            className={`flex items-center gap-2 border-r border-gray-200 px-5 py-3 text-sm transition ${
              activeTab === "sources"
                ? "bg-white font-semibold text-gray-900 shadow-sm"
                : "font-medium text-gray-500 hover:bg-white hover:text-gray-800"
            }`}
          >
            <FolderOpen size={16} className={activeTab === "sources" ? "text-gray-700" : "text-gray-400"} />
            Sources
            <span className="text-xs font-medium text-gray-400">{sources.length}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("playground")}
            className={`flex items-center gap-2 px-5 py-3 text-sm transition ${
              activeTab === "playground"
                ? "bg-white font-semibold text-gray-900 shadow-sm"
                : "font-medium text-gray-500 hover:bg-white hover:text-gray-800"
            }`}
          >
            <Sparkles size={15} className={activeTab === "playground" ? "text-cyan-600" : "text-gray-400"} />
            Playground
          </button>
        </div>

        {/* ==================================================
            SOURCES TAB
        ================================================== */}
        {activeTab === "sources" && (
          <>
            {/* SEARCH */}
            <div className="mb-5">
              <div className="flex h-11 max-w-[485px] items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 shadow-sm">
                <Search size={17} className="text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search sources..."
                  className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />
                {searchTerm && (
                  <button type="button" onClick={() => setSearchTerm("")} className="text-gray-400 hover:text-gray-700">
                    <X size={15} />
                  </button>
                )}
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="mb-5 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Failed to load sources</p>
                  <p className="mt-1">{error}</p>
                  <button type="button" onClick={handleRefresh} disabled={refreshing} className="mt-3 inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-60">
                    <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
                    Retry
                  </button>
                </div>
              </div>
            )}

            {/* REFRESHING */}
            {refreshing && (
              <div className="mb-3 flex items-center gap-2 text-xs text-gray-400">
                <RefreshCw size={13} className="animate-spin" />
                Refreshing sources...
              </div>
            )}

            {/* SOURCE TABLE */}
            {filteredSources.length > 0 ? (
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <div className="max-h-[520px] overflow-y-auto">
                  <table className="w-full border-collapse">
                    <thead className="sticky top-0 z-10 bg-gray-50">
                      <tr className="border-b border-gray-200">
                        <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">Source</th>
                        <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">Type</th>
                        <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">Status</th>
                        <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">Added</th>
                        <th className="px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-wide text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSources.map((source) => {
                        const typeStyle = getSourceTypeStyle(source?.source_type);
                        const status = String(source?.status || "complete");
                        return (
                          <tr key={source?.id || `${source?.title}-${source?.created_at}`} className="border-b border-gray-100 transition hover:bg-gray-50">
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${typeStyle.icon}`}>
                                  {getSourceIcon(source?.source_type)}
                                </div>
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-medium text-gray-900">
                                    {source?.title || source?.file_name || source?.name || "Untitled source"}
                                  </p>
                                  <p className="mt-1 max-w-[420px] truncate font-mono text-[10px] text-gray-400">
                                    {source?.id || "-"}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <span className={`inline-flex items-center rounded-md border px-2.5 py-1 text-[10px] font-semibold ${typeStyle.wrapper}`}>
                                {getSourceTypeLabel(source?.source_type)}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase ${getStatusStyle(source?.status)}`}>
                                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                {status}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-sm text-gray-500">
                              {formatDate(source?.created_at || source?.createdAt || source?.added_at)}
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex items-center justify-center gap-2">
                                <button type="button" onClick={() => handleViewSource(source)} title="View Source" className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-600">
                                  <Eye size={15} />
                                </button>
                                <button type="button" onClick={() => handleDeleteClick(source)} title="Delete Source" className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600">
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-gray-200 bg-white px-6 py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-gray-400">
                  <FileText size={23} />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-gray-900">
                  {searchTerm ? "No sources found" : "No sources yet"}
                </h3>
                <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-gray-500">
                  {searchTerm ? "No source matches your search." : "Add a source to this knowledge base to get started."}
                </p>
                {!searchTerm && (
                  <button type="button" onClick={() => setShowCreate(true)} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700">
                    <Plus size={16} />
                    Add Source
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {/* ==================================================
            PLAYGROUND TAB (Matches the exact screenshot)
        ================================================== */}
        {activeTab === "playground" && (
          <div className="flex h-[calc(100vh-220px)] flex-col rounded-xl border border-gray-200 bg-white">
            {/* Playground Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
                  <Sparkles size={16} />
                </div>
                <h2 className="text-sm font-semibold text-gray-900">Knowledge Playground</h2>
              </div>
              <button onClick={clearPlayground} className="text-xs font-medium text-gray-500 hover:text-gray-800">
                Clear
              </button>
            </div>

            {/* Playground Content Area */}
            <div className="flex flex-1 flex-col items-center justify-center bg-gray-50/30 px-6">
              {playgroundMessages.length === 0 ? (
                <div className="max-w-xl text-center">
                  {/* Icon */}
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-cyan-500 shadow-sm ring-1 ring-gray-200">
                    <MessageSquare size={32} />
                  </div>
                  
                  {/* Title */}
                  <h2 className="mt-6 text-xl font-bold text-gray-900">
                    Test Your Knowledge Base
                  </h2>
                  
                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">
                    This is a RAG query. The testing playground doesn't use any agents—it's only meant for quickly checking and understanding the information stored in the knowledge base.
                  </p>

                  {/* Suggestions */}
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    {[
                      "What services do you offer?",
                      "Tell me about pricing",
                      "How can I get support?"
                    ].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setPlaygroundInput(suggestion)}
                        className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-600 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-700 shadow-sm"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-3xl space-y-6 overflow-y-auto py-6">
                  {playgroundMessages.map((msg) => (
                    <div key={msg.id} className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      {msg.role !== "user" && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-600">
                          <Bot size={16} />
                        </div>
                      )}
                      <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "rounded-br-md bg-cyan-500 text-white"
                          : "rounded-bl-md border border-gray-200 bg-white text-gray-700 shadow-sm"
                      }`}>
                        {msg.content}
                      </div>
                      {msg.role === "user" && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-500">
                          <User size={15} />
                        </div>
                      )}
                    </div>
                  ))}
                  {playgroundLoading && (
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-100 text-cyan-600">
                        <Bot size={16} />
                      </div>
                      <div className="rounded-2xl rounded-bl-md border border-gray-200 bg-white px-4 py-3 shadow-sm">
                        <div className="flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "120ms" }} />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "240ms" }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 bg-white p-4">
              <div className="mx-auto max-w-3xl">
                <div className="relative flex items-center rounded-xl border border-gray-200 bg-white shadow-sm transition focus-within:border-cyan-300 focus-within:ring-2 focus-within:ring-cyan-100">
                  <input
                    type="text"
                    value={playgroundInput}
                    onChange={(e) => setPlaygroundInput(e.target.value)}
                    onKeyDown={handlePlaygroundKeyDown}
                    placeholder="Ask a question..."
                    className="w-full bg-transparent px-4 py-3.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={handlePlaygroundSubmit}
                    disabled={!playgroundInput.trim() || playgroundLoading}
                    className="absolute right-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500 text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {playgroundLoading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* MODALS */}
      {showCreate && knowledgeBaseId && (
        <CreateSource
          knowledgeBaseId={knowledgeBaseId}
          onClose={() => setShowCreate(false)}
          onCreate={handleSourceCreated}
        />
      )}

      {showEditKb && knowledgeBaseId && (
        <EditKnowledgeBase
          knowledgeBaseId={knowledgeBaseId}
          onClose={() => setShowEditKb(false)}
          onUpdated={async () => {
            setShowEditKb(false);
            await fetchKnowledgeBaseName();
            showToast("Knowledge base updated successfully");
          }}
        />
      )}

      {showDeleteKb && knowledgeBaseId && (
        <DeleteKnowledgeBase
          knowledgeBaseId={knowledgeBaseId}
          knowledgeBaseName={knowledgeBaseName}
          onClose={() => setShowDeleteKb(false)}
          onDeleted={() => {
            flashSnackbar("Knowledge base deleted successfully");
            navigate("/knowledge-base");
          }}
        />
      )}

      {showView && selectedSource && (
        <ViewSource
          knowledgeBaseId={knowledgeBaseId}
          sourceId={selectedSource.id}
          onClose={() => { setShowView(false); setSelectedSource(null); }}
        />
      )}

      {showDelete && selectedSource && (
        <DeleteSource
          knowledgeBaseId={knowledgeBaseId}
          sourceId={selectedSource.id}
          sourceTitle={selectedSource.title || selectedSource.file_name}
          onClose={() => { setShowDelete(false); setSelectedSource(null); }}
          onDelete={handleSourceDeleted}
        />
      )}
    </div>
  );
};

export default Source;
