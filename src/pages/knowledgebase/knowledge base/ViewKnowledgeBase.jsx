import React, { useEffect, useState } from "react";
import { X, Database, Calendar, Clock, Loader2 } from "lucide-react";
import axios from "axios";
import config from "../../../config/Config";
export default function ViewKnowledgeBase({
    knowledgeBaseId,
    onClose,
}) {
    const [knowledgeBase, setKnowledgeBase] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!knowledgeBaseId) {
            setError("Knowledge Base ID is missing.");
            setLoading(false);
            return;
        }

        fetchKnowledgeBase();
    }, [knowledgeBaseId]);

    const fetchKnowledgeBase = async () => {
        try {
            setLoading(true);
            setError("");

            /*
             * GET
             * /api/v1/knowledge-bases/{knowledge_base_id}
             */

            const response = await axios.get(
                `${config.BASE_URL}/knowledge-bases/${knowledgeBaseId}`,
                {
                    headers: {
                        Accept: "*/*",
                    },
                }
            );

            console.log(
                "Knowledge Base Details:",
                response.data
            );

            setKnowledgeBase(response.data);
        } catch (err) {
            console.error(
                "Get Knowledge Base Error:",
                err
            );

            const message =
                err?.response?.data?.detail ||
                err?.response?.data?.message ||
                "Failed to load knowledge base.";

            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "-";

        try {
            return new Date(dateString).toLocaleString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                }
            );
        } catch {
            return dateString;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-[600px] overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-2xl dark:border-white/[0.08] dark:bg-[#101012]">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 border-b border-black/[0.06] px-6 py-5 dark:border-white/[0.06]">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/25 bg-cyan-500/[0.06]">
                            <Database
                                size={17}
                                className="text-cyan-600 dark:text-cyan-400"
                            />
                        </div>

                        <div>
                            <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                                Knowledge Base
                            </h3>

                            <p className="mt-0.5 text-[12px] text-zinc-500">
                                View knowledge base details
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md p-1 text-zinc-500 transition hover:bg-black/[0.05] hover:text-zinc-800 dark:hover:bg-white/[0.06] dark:hover:text-zinc-200"
                    >
                        <X size={17} />
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 py-6">
                    {/* Loading */}
                    {loading && (
                        <div className="flex min-h-[250px] items-center justify-center">
                            <div className="flex flex-col items-center gap-3">
                                <Loader2
                                    size={25}
                                    className="animate-spin text-cyan-500"
                                />

                                <p className="text-sm text-zinc-500">
                                    Loading knowledge base...
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Error */}
                    {!loading && error && (
                        <div className="flex min-h-[250px] items-center justify-center">
                            <div className="w-full rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-4 text-center">
                                <p className="text-sm font-medium text-red-600 dark:text-red-400">
                                    {error}
                                </p>

                                <button
                                    type="button"
                                    onClick={fetchKnowledgeBase}
                                    className="mt-4 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-cyan-400 dark:bg-cyan-400 dark:text-slate-950"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Knowledge Base Details */}
                    {!loading &&
                        !error &&
                        knowledgeBase && (
                            <div className="space-y-5">
                                {/* Name + Status */}
                                <div className="flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                                            Name
                                        </p>

                                        <h4 className="truncate text-[17px] font-semibold text-zinc-900 dark:text-zinc-100">
                                            {knowledgeBase.name || "-"}
                                        </h4>
                                    </div>

                                    {/* Status */}
                                    <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/[0.08] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                                        {knowledgeBase.status || "active"}
                                    </span>
                                </div>

                                {/* Description */}
                                <div>
                                    <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                                        Description
                                    </p>

                                    <div className="rounded-xl border border-black/[0.06] bg-zinc-50 px-4 py-3 dark:border-white/[0.06] dark:bg-white/[0.02]">
                                        <p className="text-[13px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                                            {knowledgeBase.description || "No description available."}
                                        </p>
                                    </div>
                                </div>

                                {/* ID */}
                                <div>
                                    <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                                        Knowledge Base ID
                                    </p>

                                    <div className="rounded-xl border border-black/[0.06] bg-zinc-50 px-4 py-3 dark:border-white/[0.06] dark:bg-white/[0.02]">
                                        <p className="break-all font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                                            {knowledgeBase.id}
                                        </p>
                                    </div>
                                </div>

                                {/* Dates */}
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    {/* Created */}
                                    <div className="rounded-xl border border-black/[0.06] bg-zinc-50 p-4 dark:border-white/[0.06] dark:bg-white/[0.02]">
                                        <div className="flex items-center gap-2">
                                            <Calendar
                                                size={13}
                                                className="text-cyan-600 dark:text-cyan-400"
                                            />

                                            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                                                Created At
                                            </span>
                                        </div>

                                        <p className="mt-2 text-[12px] text-zinc-700 dark:text-zinc-300">
                                            {formatDate(
                                                knowledgeBase.created_at
                                            )}
                                        </p>
                                    </div>

                                    {/* Updated */}
                                    <div className="rounded-xl border border-black/[0.06] bg-zinc-50 p-4 dark:border-white/[0.06] dark:bg-white/[0.02]">
                                        <div className="flex items-center gap-2">
                                            <Clock
                                                size={13}
                                                className="text-cyan-600 dark:text-cyan-400"
                                            />

                                            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                                                Updated At
                                            </span>
                                        </div>

                                        <p className="mt-2 text-[12px] text-zinc-700 dark:text-zinc-300">
                                            {formatDate(
                                                knowledgeBase.updated_at
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end border-t border-black/[0.06] px-6 py-4 dark:border-white/[0.06]">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-black/[0.04] dark:text-zinc-300 dark:hover:bg-white/[0.05]"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}