import React, { useEffect, useState } from "react";
import axios from "axios";
import { X, Loader2 } from "lucide-react";
import config from "../../../config/Config";

const ViewSource = ({
  knowledgeBaseId,
  sourceId,
  onClose,
}) => {
  const [source, setSource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (knowledgeBaseId && sourceId) {
      fetchSource();
    } else {
      setError("Knowledge base ID or source ID is missing.");
      setLoading(false);
    }
  }, [knowledgeBaseId, sourceId]);

  const fetchSource = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${config.BASE_URL}/knowledge-bases/${knowledgeBaseId}/sources/${sourceId}`,
        {
          headers: {
            Accept: "*/*",
          },
        }
      );

      console.log("Source details:", response.data);

      setSource(response.data);
    } catch (err) {
      console.error("View Source Error:", err);

      const errorMessage =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Failed to load source details.";

      setError(
        Array.isArray(errorMessage)
          ? errorMessage.map((item) => item?.msg || "").join(", ")
          : errorMessage
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    try {
      return new Date(date).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return date;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-3xl rounded-xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              View Source
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              View source details
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">

          {/* Loading */}
          {loading && (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Loader2
                  size={22}
                  className="animate-spin text-[#2759a2]"
                />
                Loading source details...
              </div>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Source Details */}
          {!loading && !error && source && (
            <div className="space-y-5">

              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Title
                </label>

                <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900">
                  {source.title || "-"}
                </div>
              </div>

              {/* Source Type */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Source Type
                </label>

                <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900">
                  {source.source_type || "-"}
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Content
                </label>

                <div className="max-h-48 min-h-[100px] overflow-y-auto whitespace-pre-wrap rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-900">
                  {source.content || "-"}
                </div>
              </div>

              {/* URL */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  URL
                </label>

                <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900">
                  {source.url || "-"}
                </div>
              </div>

              {/* File Information */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* File Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    File Name
                  </label>

                  <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900">
                    {source.file_name || "-"}
                  </div>
                </div>

                {/* File Size */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    File Size
                  </label>

                  <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900">
                    {source.file_size ?? 0}
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Status
                </label>

                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                    source.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {source.status || "-"}
                </span>
              </div>

              {/* IDs */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Source ID */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Source ID
                  </label>

                  <div className="break-all rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-700">
                    {source.id || "-"}
                  </div>
                </div>

                {/* Knowledge Base ID */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Knowledge Base ID
                  </label>

                  <div className="break-all rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-700">
                    {source.knowledge_base_id || "-"}
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Created At */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Created At
                  </label>

                  <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900">
                    {formatDate(source.created_at)}
                  </div>
                </div>

                {/* Updated At */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Updated At
                  </label>

                  <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900">
                    {formatDate(source.updated_at)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewSource;