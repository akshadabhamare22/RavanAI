import React, { useState } from "react";
import axios from "axios";
import { X, Trash2, Loader2 } from "lucide-react";
import config from "../../../config/Config";

const DeleteSource = ({
  knowledgeBaseId,
  sourceId,
  sourceTitle,
  onClose,
  onDelete,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setError("");

    if (!knowledgeBaseId) {
      setError("Knowledge base ID is missing.");
      return;
    }

    if (!sourceId) {
      setError("Source ID is missing.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.delete(
        `${config.BASE_URL}/knowledge-bases/${knowledgeBaseId}/sources/${sourceId}`,
        {
          headers: {
            Accept: "*/*",
          },
        }
      );

      console.log("Source deleted successfully:", response);

      if (onDelete) {
        onDelete(sourceId);
      }

      onClose();
    } catch (err) {
      console.error("Delete Source Error:", err);

      const errorMessage =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Failed to delete source. Please try again.";

      setError(
        Array.isArray(errorMessage)
          ? errorMessage.map((item) => item?.msg || "").join(", ")
          : errorMessage
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <Trash2
                size={20}
                className="text-red-600"
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Delete Source
              </h2>

              <p className="text-sm text-gray-500">
                Confirm source deletion
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <p className="text-sm leading-6 text-gray-600">
            Are you sure you want to delete this source?
            This action cannot be undone.
          </p>

          {/* Source Name */}
          {sourceTitle && (
            <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Source
              </p>

              <p className="mt-1 break-words text-sm font-medium text-gray-900">
                {sourceTitle}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">

          {/* Cancel */}
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading && (
              <Loader2
                size={17}
                className="animate-spin"
              />
            )}

            {loading ? "Deleting..." : "Delete Source"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSource;