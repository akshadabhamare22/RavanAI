
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Phone,
  Clock,
  Calendar,
  User,
  Bot,
  Download,
  FileText,
  RefreshCw,
  Loader2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Play,
  Brain,
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

const formatDuration = (seconds) => {
  if (seconds === null || seconds === undefined) return "--";

  const value = Number(seconds);

  if (Number.isNaN(value)) return "--";

  const minutes = Math.floor(value / 60);
  const remainingSeconds = value % 60;

  return `${minutes}m ${remainingSeconds}s`;
};

const statusClass = (status) => {
  if (status === "completed") {
    return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
  }

  if (status === "failed") {
    return "bg-red-500/10 text-red-600 dark:text-red-400";
  }

  if (status === "in_progress") {
    return "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400";
  }

  return "bg-zinc-500/10 text-zinc-600";
};

// ============================================================
// INFO CARD
// ============================================================

function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-black/[0.06] bg-white p-4 dark:border-white/[0.08] dark:bg-[#101012]">
      <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-black/[0.04] text-zinc-500 dark:bg-white/[0.05] dark:text-zinc-400">
        <Icon size={15} />
      </div>

      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        {value || "--"}
      </p>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function CallDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [call, setCall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");

  // --------------------------------------------------
  // FETCH DETAILS
  // --------------------------------------------------

  const fetchDetails = useCallback(async () => {
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
  }, [id]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  // --------------------------------------------------
  // DOWNLOAD TRANSCRIPT
  // --------------------------------------------------

  const handleTranscriptDownload = async (format = "txt") => {
    try {
      setDownloading(true);

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
  // ANALYZE CALL
  // --------------------------------------------------

  const handleAnalyze = async () => {
    try {
      setAnalyzing(true);
      setError("");

      const response = await callsApi.analyze(id);
      setCall(response);
    } catch (err) {
      setError(getCallsApiError(err));
    } finally {
      setAnalyzing(false);
    }
  };

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center gap-2 text-sm text-zinc-500">
        <Loader2 size={18} className="animate-spin" />
        Loading call details...
      </div>
    );
  }

  // --------------------------------------------------
  // ERROR / NOT FOUND
  // --------------------------------------------------

  if (!call) {
    return (
      <div className="mx-auto max-w-[1600px] p-5">
        <button
          onClick={() => navigate("/calls")}
          className="mb-5 flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Calls
        </button>

        <div className="rounded-xl border border-red-500/20 bg-red-500/[0.05] p-5 text-sm text-red-600 dark:text-red-400">
          {error || "Call details could not be loaded."}
        </div>
      </div>
    );
  }

  const caller =
    call.caller_display ||
    call.caller_name ||
    call.caller_number ||
    "Unknown Caller";

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 dark:bg-[#09090B] dark:text-zinc-100">
      <main className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-7">

        {/* HEADER */}

        <section className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <button
              onClick={() => navigate("/calls")}
              className="mb-3 flex items-center gap-2 text-xs font-medium text-zinc-500 transition hover:text-zinc-900 dark:hover:text-white"
            >
              <ArrowLeft size={14} />
              Back to Calls History
            </button>

            <h1 className="text-2xl font-semibold tracking-tight">
              Call Details
            </h1>

            <p className="mt-1 font-mono text-xs text-zinc-500">
              Call ID: {call.id}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={fetchDetails}
              className="flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-xs font-medium text-zinc-700 hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
            >
              <RefreshCw size={14} />
              Refresh
            </button>

            <button
              onClick={() => navigate(`/calls/${id}/transcript`)}
              className="flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-xs font-medium text-zinc-700 hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
            >
              <FileText size={14} />
              Transcript
            </button>

            <button
              onClick={handleAnalyze}
              disabled={analyzing || call.status === "in_progress"}
              className="flex h-9 items-center gap-2 rounded-lg bg-cyan-600 px-3 text-xs font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {analyzing ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Brain size={14} />
              )}
              Analyze Call
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

        {/* CALL SUMMARY */}

        <section className="rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                Caller
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                {caller}
              </h2>

              <p className="mt-1 text-xs text-zinc-500">
                {call.caller_number || "No phone number available"}
              </p>
            </div>

            <span
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${statusClass(
                call.status
              )}`}
            >
              {call.status_label || call.status}
            </span>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <InfoCard
              icon={Clock}
              label="Duration"
              value={formatDuration(call.duration_seconds)}
            />

            <InfoCard
              icon={Phone}
              label="Channel"
              value={call.channel}
            />

            <InfoCard
              icon={User}
              label="Direction"
              value={call.direction}
            />

            <InfoCard
              icon={Calendar}
              label="Started At"
              value={formatDate(call.started_at)}
            />
          </div>
        </section>

        {/* CALL INFORMATION */}

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">

          <div className="rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
            <h3 className="mb-4 text-sm font-semibold">
              Agent Information
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                  <Bot size={19} />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    {call.agent_name || "Unknown Agent"}
                  </p>
                  <p className="text-xs text-zinc-500">
                    Agent ID: {call.agent_id || "--"}
                  </p>
                </div>
              </div>

              <div className="border-t border-black/[0.06] pt-3 dark:border-white/[0.06]">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  Model
                </p>
                <p className="mt-1 text-sm text-zinc-800 dark:text-zinc-200">
                  {call.model || "--"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
            <h3 className="mb-4 text-sm font-semibold">
              Call Analysis
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  Sentiment
                </p>
                <p className="mt-1 text-sm font-semibold capitalize">
                  {call.sentiment || "Not analyzed"}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  Conversion
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {call.converted ? "Converted" : "Not converted"}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  Analysis Status
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {call.analyzed ? (
                    <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 size={14} />
                      Analyzed
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-zinc-500">
                      <XCircle size={14} />
                      Not analyzed
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SUMMARY */}

        <section className="rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
          <h3 className="mb-3 text-sm font-semibold">
            Call Summary
          </h3>

          <p className="whitespace-pre-wrap text-sm leading-7 text-zinc-600 dark:text-zinc-400">
            {call.summary || "No summary available for this call."}
          </p>
        </section>

        {/* RECORDING */}

        <section className="rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
          <h3 className="mb-4 text-sm font-semibold">
            Call Recording
          </h3>

          {call.recording_url ? (
            <div className="space-y-3">
              <audio
                controls
                className="w-full"
                src={call.recording_url}
              />

              <a
                href={call.recording_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-cyan-600 hover:text-cyan-500 dark:text-cyan-400"
              >
                <Play size={13} />
                Open Recording
              </a>
            </div>
          ) : (
            <p className="text-sm text-zinc-500">
              No recording available for this call.
            </p>
          )}
        </section>

        {/* TRANSCRIPT DOWNLOAD */}

        <section className="rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold">
                Call Transcript
              </h3>
              <p className="mt-1 text-xs text-zinc-500">
                Download the transcript in your preferred format.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleTranscriptDownload("txt")}
                disabled={downloading}
                className="flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] px-3 text-xs font-medium text-zinc-700 hover:bg-black/[0.03] disabled:opacity-50 dark:border-white/[0.08] dark:text-zinc-300"
              >
                <Download size={13} />
                TXT
              </button>

              <button
                onClick={() => handleTranscriptDownload("json")}
                disabled={downloading}
                className="flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] px-3 text-xs font-medium text-zinc-700 hover:bg-black/[0.03] disabled:opacity-50 dark:border-white/[0.08] dark:text-zinc-300"
              >
                <Download size={13} />
                JSON
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
