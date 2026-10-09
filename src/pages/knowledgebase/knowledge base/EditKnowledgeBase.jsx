import React, { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import axios from "axios";
import config from "../../../config/Config";
export default function EditKnowledgeBase({
  knowledgeBaseId,
  onClose,
  onUpdated,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  /*
   * ------------------------------------------------------------
   * GET EXISTING KNOWLEDGE BASE
   * ------------------------------------------------------------
   *
   * GET
   * /api/v1/knowledge-bases/{knowledge_base_id}
   *
   * We first load the existing data so the Edit form
   * contains the current values.
   */

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

      const response = await axios.get(
  `${config.BASE_URL}/knowledge-bases/${knowledgeBaseId}`,
  {
    headers: {
      Accept: "*/*",
    },
  }
);

      const data = response.data;

      console.log(
        "Knowledge Base Details:",
        data
      );

      setName(data?.name || "");
      setDescription(data?.description || "");
      setStatus(data?.status || "active");
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

  /*
   * ------------------------------------------------------------
   * UPDATE KNOWLEDGE BASE
   * ------------------------------------------------------------
   *
   * PATCH
   * /api/v1/knowledge-bases/{knowledge_base_id}
   *
   * Request:
   *
   * {
   *   "name": "ABC",
   *   "description": "Demo",
   *   "status": "active"
   * }
   */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Knowledge base name is required.");
      return;
    }

    if (!description.trim()) {
      setError("Description is required.");
      return;
    }

    if (!status) {
      setError("Status is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        name: name.trim(),
        description: description.trim(),
        status: status,
      };

      console.log(
        "Updating Knowledge Base:",
        payload
      );

      const response = await axios.patch(
  `${config.BASE_URL}/knowledge-bases/${knowledgeBaseId}`,
  {
    name: name.trim(),
    description: description.trim(),
    status,
  },
  {
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
  }
);

      const updatedKnowledgeBase = response.data;

      console.log(
        "Knowledge Base Updated Successfully:",
        updatedKnowledgeBase
      );

      /*
       * Send updated backend response
       * back to parent component.
       */
      if (onUpdated) {
        onUpdated(updatedKnowledgeBase);
      }

      /*
       * Close modal after successful update.
       */
      if (onClose) {
        onClose();
      }
    } catch (err) {
      console.error(
        "Update Knowledge Base Error:",
        err
      );

      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Failed to update knowledge base.";

      setError(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* =====================================================
          OVERLAY
      ====================================================== */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={saving ? undefined : onClose}
      />

      {/* =====================================================
          MODAL
      ====================================================== */}
      <div className="relative w-full max-w-[560px] overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-2xl dark:border-white/[0.08] dark:bg-[#101012]">

        {/* ===================================================
            HEADER
        ==================================================== */}
        <div className="flex items-start justify-between gap-4 px-6 pt-6">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Edit Knowledge Base
            </h3>

            <p className="mt-1 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              Update your knowledge base information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="mt-0.5 rounded-md p-1 text-zinc-500 transition hover:bg-black/[0.05] hover:text-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-white/[0.06]"
          >
            <X size={16} />
          </button>
        </div>

        {/* ===================================================
            FORM
        ==================================================== */}
        <form
          onSubmit={handleSubmit}
          className="px-6 pb-6 pt-5"
        >
          {/* =================================================
              LOADING
          ================================================== */}
          {loading ? (
            <div className="flex min-h-[240px] items-center justify-center">
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
          ) : (
            <>
              {/* ===========================================
                  NAME
              ============================================ */}
              <div>
                <label
                  htmlFor="edit-kb-name"
                  className="mb-1.5 block text-[12px] font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Name
                </label>

                <input
                  id="edit-kb-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                  }}
                  placeholder="e.g. Product Support KB"
                  disabled={saving}
                  required
                  className="h-10 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-cyan-400"
                />
              </div>

              {/* ===========================================
                  DESCRIPTION
              ============================================ */}
              <div className="mt-4">
                <label
                  htmlFor="edit-kb-description"
                  className="mb-1.5 block text-[12px] font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Description
                </label>

                <textarea
                  id="edit-kb-description"
                  rows={4}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter knowledge base description"
                  disabled={saving}
                  required
                  className="w-full resize-none rounded-lg border border-black/[0.08] bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-cyan-400"
                />
              </div>

              {/* ===========================================
                  STATUS
              ============================================ */}
              <div className="mt-4">
                <label
                  htmlFor="edit-kb-status"
                  className="mb-1.5 block text-[12px] font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Status
                </label>

                <select
                  id="edit-kb-status"
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setError("");
                  }}
                  disabled={saving}
                  className="h-10 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-sm text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:focus:border-cyan-400"
                >
                  <option value="active">
                    Active
                  </option>

                  <option value="inactive">
                    Inactive
                  </option>
                </select>
              </div>

              {/* ===========================================
                  ERROR
              ============================================ */}
              {error && (
                <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/[0.06] px-3 py-2.5">
                  <p className="text-xs font-medium text-red-600 dark:text-red-400">
                    {error}
                  </p>
                </div>
              )}

              {/* ===========================================
                  BUTTONS
              ============================================ */}
              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={saving}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-black/[0.04] disabled:cursor-not-allowed disabled:opacity-50 dark:text-zinc-300 dark:hover:bg-white/[0.05]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex min-w-[110px] items-center justify-center gap-2 rounded-lg bg-cyan-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-cyan-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 dark:bg-cyan-400 dark:text-slate-950"
                >
                  {saving ? (
                    <>
                      <Loader2
                        size={14}
                        className="animate-spin"
                      />

                      Updating...
                    </>
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}