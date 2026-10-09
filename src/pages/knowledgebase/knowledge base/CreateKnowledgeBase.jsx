import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";
import axios from "axios";

import config from "../../../config/Config";

export default function CreateKnowledgeBase({
  onClose,
  onCreate,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ============================================================
  // CREATE KNOWLEDGE BASE
  // POST /api/v1/knowledge-bases
  // ============================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ----------------------------------------------------------
    // VALIDATION
    // ----------------------------------------------------------

    if (!name.trim()) {
      setError("Knowledge base name is required.");
      return;
    }

    if (!description.trim()) {
      setError("Description is required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // --------------------------------------------------------
      // API REQUEST
      // --------------------------------------------------------

      const response = await axios.post(
        `${config.BASE_URL}/knowledge-bases`,
        {
          name: name.trim(),
          description: description.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );

      // --------------------------------------------------------
      // BACKEND RESPONSE
      // --------------------------------------------------------

      const createdKnowledgeBase = response.data;

      console.log(
        "Knowledge Base Created Successfully:",
        createdKnowledgeBase
      );

      // --------------------------------------------------------
      // SEND RESPONSE TO PARENT
      // --------------------------------------------------------

      if (onCreate) {
        onCreate(createdKnowledgeBase);
      }

      // --------------------------------------------------------
      // CLOSE MODAL
      // --------------------------------------------------------

      if (onClose) {
        onClose();
      }
    } catch (err) {
      console.error(
        "Create Knowledge Base Error:",
        err
      );

      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Failed to create knowledge base.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* ======================================================
          OVERLAY
      ======================================================= */}

      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={
          loading
            ? undefined
            : onClose
        }
      />

      {/* ======================================================
          MODAL
      ======================================================= */}

      <div className="relative w-full max-w-[560px] overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-2xl dark:border-white/[0.08] dark:bg-[#101012]">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="flex items-start justify-between gap-4 px-6 pt-6">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Create Knowledge Base
            </h3>

            <p className="mt-1 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              A knowledge base stores information your AI agents can reference
              during calls.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="mt-0.5 rounded-md p-1 text-zinc-500 transition hover:bg-black/[0.05] hover:text-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-white/[0.06]"
          >
            <X size={16} />
          </button>
        </div>

        {/* ==================================================
            FORM
        ================================================== */}

        <form
          onSubmit={handleSubmit}
          className="px-6 pb-6 pt-5"
        >
          {/* ==================================================
              NAME
          ================================================== */}

          <div>
            <label
              htmlFor="kb-name"
              className="mb-1.5 block text-[12px] font-medium text-zinc-700 dark:text-zinc-300"
            >
              Name
            </label>

            <input
              id="kb-name"
              autoFocus
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              placeholder="e.g. Product Support KB"
              disabled={loading}
              className="h-10 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-cyan-400"
            />
          </div>

          {/* ==================================================
              DESCRIPTION
          ================================================== */}

          <div className="mt-4">
            <label
              htmlFor="kb-description"
              className="mb-1.5 block text-[12px] font-medium text-zinc-700 dark:text-zinc-300"
            >
              Description
            </label>

            <textarea
              id="kb-description"
              rows={4}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setError("");
              }}
              placeholder="e.g. Product support documentation and FAQs"
              disabled={loading}
              className="w-full resize-none rounded-lg border border-black/[0.08] bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-cyan-400"
            />
          </div>

          {/* ==================================================
              API ERROR
          ================================================== */}

          {error && (
            <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/[0.06] px-3 py-2.5">
              <p className="text-xs font-medium text-red-600 dark:text-red-400">
                {error}
              </p>
            </div>
          )}

          {/* ==================================================
              BUTTONS
          ================================================== */}

          <div className="mt-6 flex items-center justify-end gap-3">
            {/* CANCEL */}

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-black/[0.04] disabled:cursor-not-allowed disabled:opacity-50 dark:text-zinc-300 dark:hover:bg-white/[0.05]"
            >
              Cancel
            </button>

            {/* CREATE */}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-w-[100px] items-center justify-center gap-2 rounded-lg bg-cyan-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-cyan-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 dark:bg-cyan-400 dark:text-slate-950"
            >
              {loading ? (
                <>
                  <Loader2
                    size={14}
                    className="animate-spin"
                  />
                  Creating...
                </>
              ) : (
                "Create"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}