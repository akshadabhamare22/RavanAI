import React, { useState } from "react";
import { X, Trash2, Loader2, AlertTriangle } from "lucide-react";
import axios from "axios";
import config from "../../../config/Config";

export default function DeleteKnowledgeBase({
  knowledgeBaseId,
  knowledgeBaseName,
  onClose,
  onDeleted,
}) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  /*
   * ============================================================
   * DELETE KNOWLEDGE BASE
   * ============================================================
   *
   * DELETE
   * /api/v1/knowledge-bases/{knowledge_base_id}
   *
   * No request body is required.
   */

  const handleDelete = async () => {
    if (!knowledgeBaseId) {
      setError("Knowledge Base ID is missing.");
      return;
    }

    try {
      setDeleting(true);
      setError("");

      console.log(
        "Deleting Knowledge Base:",
        knowledgeBaseId
      );

      // ========================================================
      // DELETE API
      // ========================================================

      const response = await axios.delete(
        `${config.BASE_URL}/knowledge-bases/${knowledgeBaseId}`,
        {
          headers: {
            Accept: "*/*",
          },
        }
      );

      console.log(
        "Knowledge Base Deleted Successfully:",
        response.data
      );

      // ========================================================
      // NOTIFY PARENT
      // ========================================================

      if (onDeleted) {
        onDeleted(response.data);
      }

      // ========================================================
      // CLOSE MODAL
      // ========================================================

      if (onClose) {
        onClose();
      }
    } catch (err) {
      console.error(
        "Delete Knowledge Base Error:",
        err
      );

      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Failed to delete knowledge base.";

      setError(
        Array.isArray(message)
          ? message
              .map((item) =>
                typeof item === "string"
                  ? item
                  : item?.msg || "Validation error"
              )
              .join(", ")
          : String(message)
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* =====================================================
          OVERLAY
      ====================================================== */}

      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={deleting ? undefined : onClose}
      />

      {/* =====================================================
          DELETE MODAL
      ====================================================== */}

      <div className="relative w-full max-w-[460px] overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-2xl dark:border-white/[0.08] dark:bg-[#101012]">

        {/* ===================================================
            HEADER
        ==================================================== */}

        <div className="flex items-start justify-between gap-4 px-6 pt-6">
          <div className="flex items-center gap-3">

            {/* Warning Icon */}

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/[0.08]">
              <AlertTriangle
                size={18}
                className="text-red-500"
              />
            </div>

            <div>
              <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Delete Knowledge Base
              </h3>

              <p className="mt-0.5 text-[12px] text-zinc-500">
                This action cannot be undone.
              </p>
            </div>
          </div>

          {/* Close Button */}

          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="rounded-md p-1 text-zinc-500 transition hover:bg-black/[0.05] hover:text-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-white/[0.06]"
          >
            <X size={16} />
          </button>
        </div>

        {/* ===================================================
            CONTENT
        ==================================================== */}

        <div className="px-6 py-5">

          <p className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            Are you sure you want to delete this knowledge
            base?
          </p>

          {/* =================================================
              KNOWLEDGE BASE NAME
          ================================================== */}

          {knowledgeBaseName && (
            <div className="mt-4 rounded-xl border border-black/[0.06] bg-zinc-50 px-4 py-3 dark:border-white/[0.06] dark:bg-white/[0.02]">

              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                Knowledge Base
              </p>

              <p className="mt-1 truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {knowledgeBaseName}
              </p>

            </div>
          )}

          {/* =================================================
              KNOWLEDGE BASE ID
          ================================================== */}

          <div className="mt-3 rounded-xl border border-black/[0.06] bg-zinc-50 px-4 py-3 dark:border-white/[0.06] dark:bg-white/[0.02]">

            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Knowledge Base ID
            </p>

            <p className="mt-1 break-all font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
              {knowledgeBaseId || "-"}
            </p>

          </div>

          {/* =================================================
              WARNING
          ================================================== */}

          <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-red-500/20 bg-red-500/[0.05] px-3 py-2.5">

            <AlertTriangle
              size={14}
              className="mt-0.5 shrink-0 text-red-500"
            />

            <p className="text-[11px] leading-relaxed text-red-600 dark:text-red-400">
              Deleting this knowledge base may also remove
              its associated sources and data.
            </p>

          </div>

          {/* =================================================
              API ERROR
          ================================================== */}

          {error && (
            <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/[0.06] px-3 py-2.5">

              <p className="text-xs font-medium text-red-600 dark:text-red-400">
                {error}
              </p>

            </div>
          )}

        </div>

        {/* ===================================================
            FOOTER
        ==================================================== */}

        <div className="flex items-center justify-end gap-3 border-t border-black/[0.06] px-6 py-4 dark:border-white/[0.06]">

          {/* Cancel */}

          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-black/[0.04] disabled:cursor-not-allowed disabled:opacity-50 dark:text-zinc-300 dark:hover:bg-white/[0.05]"
          >
            Cancel
          </button>

          {/* Delete */}

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex min-w-[105px] items-center justify-center gap-2 rounded-lg bg-red-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {deleting ? (
              <>
                <Loader2
                  size={14}
                  className="animate-spin"
                />

                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={14} />

                Delete
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  );
}