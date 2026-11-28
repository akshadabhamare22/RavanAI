
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  FileText,
  Loader2,
  RefreshCw,
  User,
  Bot,
  AlertCircle,
} from "lucide-react";

import callsApi, { getCallsApiError } from "./callsApi";

// ============================================================
// HELPERS
// ============================================================

const formatDate = (value) => {
  if (!value) return "--";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "--";

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function CallTranscript() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [call, setCall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");

  // --------------------------------------------------
  // FETCH CALL DETAILS AND MESSAGES
  // --------------------------------------------------

  const fetchTranscript = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await callsApi.getById(id);
      setCall(response);
    } catch (err) {
      setError(getCallsApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTranscript();
  }, [id]);

  // --------------------------------------------------
  // DOWNLOAD
  // --------------------------------------------------

  const handleDownload = async (format) => {
    try {
      setDownloading(true);
      setError("");

      const blob = await callsApi.downloadTranscript(id, format);
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `call-${id}-transcript.${format}`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(getCallsApiError(err));
    } finally {
      setDownloading(false);
    }
  };

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center gap-2 text-sm text-zinc-500">
        <Loader2 size={18} className="animate-spin" />
        Loading transcript...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 dark:bg-[#09090B] dark:text-zinc-100">
      <main className="mx-auto max-w-[1200px] space-y-5 p-4 sm:p-6 lg:p-7">

        {/* HEADER */}

        <section className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <button
              onClick={() => navigate(`/calls/${id}`)}
              className="mb-3 flex items-center gap-2 text-xs font-medium text-zinc-500 transition hover:text-zinc-900 dark:hover:text-white"
            >
              <ArrowLeft size={14} />
              Back to Call Details
            </button>

            <h1 className="text-2xl font-semibold tracking-tight">
              Call Transcript
            </h1>

            <p className="mt-1 font-mono text-xs text-zinc-500">
              Call ID: {id}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={fetchTranscript}
              className="flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-xs font-medium text-zinc-700 hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
            >
              <RefreshCw size={14} />
              Refresh
            </button>

            <button
              onClick={() => handleDownload("txt")}
              disabled={downloading}
              className="flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-xs font-medium text-zinc-700 hover:bg-black/[0.03] disabled:opacity-50 dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
            >
              <Download size={14} />
              TXT
            </button>

            <button
              onClick={() => handleDownload("json")}
              disabled={downloading}
              className="flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-xs font-medium text-zinc-700 hover:bg-black/[0.03] disabled:opacity-50 dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
            >
              <Download size={14} />
              JSON
            </button>
          </div>
        </section>

        {/* ERROR */}

        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.06] p-3 text-sm text-red-600 dark:text-red-400">
            <AlertCircle size={17} className="mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        {/* CALL INFORMATION */}

        {call && (
          <section className="rounded-2xl border border-black/[0.06] bg-white p-4 dark:border-white/[0.08] dark:bg-[#101012]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  Caller
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {call.caller_display ||
                    call.caller_name ||
                    call.caller_number ||
                    "Unknown Caller"}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  Agent
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {call.agent_name || "--"}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  Started At
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {formatDate(call.started_at)}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* TRANSCRIPT MESSAGES */}

        <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">
          <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-4 dark:border-white/[0.06]">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-zinc-500" />
              <h2 className="text-sm font-semibold">
                Conversation Transcript
              </h2>
            </div>

            <span className="text-xs text-zinc-500">
              {call?.messages?.length || 0} messages
            </span>
          </div>

          {!call ? (
            <div className="py-20 text-center text-sm text-zinc-500">
              Call transcript could not be loaded.
            </div>
          ) : !call.messages || call.messages.length === 0 ? (
            <div className="py-20 text-center">
              <FileText
                size={34}
                className="mx-auto text-zinc-300 dark:text-zinc-600"
              />

              <p className="mt-4 text-sm text-zinc-500">
                No transcript messages available
              </p>
            </div>
          ) : (
            <div className="space-y-4 p-4 sm:p-6">
              {call.messages.map((message, index) => {
                const isAssistant =
                  message.role === "assistant" ||
                  message.role === "agent";

                return (
                  <div
                    key={message.id || `${message.role}-${index}`}
                    className={`flex gap-3 ${
                      isAssistant ? "" : "flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        isAssistant
                          ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                          : "bg-black/[0.05] text-zinc-500 dark:bg-white/[0.06] dark:text-zinc-300"
                      }`}
                    >
                      {isAssistant ? <Bot size={17} /> : <User size={17} />}
                    </div>

                    <div
                      className={`max-w-[85%] ${
                        isAssistant ? "" : "text-right"
                      }`}
                    >
                      <div
                        className={`mb-1 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 ${
                          isAssistant ? "" : "justify-end"
                        }`}
                      >
                        <span>{message.role || "Message"}</span>
                        <span>•</span>
                        <span>{formatDate(message.created_at)}</span>
                      </div>

                      <div
                        className={`rounded-2xl px-4 py-3 text-left text-sm leading-6 ${
                          isAssistant
                            ? "rounded-tl-sm bg-zinc-100 text-zinc-800 dark:bg-[#1c1d22] dark:text-zinc-200"
                            : "rounded-tr-sm bg-cyan-600 text-white"
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words">
                          {message.content || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
