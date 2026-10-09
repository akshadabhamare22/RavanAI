import React, { useEffect, useState } from "react";
import axios from "axios";
import { X, Loader2, Upload, Globe, FileText, Type } from "lucide-react";
import config from "../../../config/Config";

const CreateSource = ({ knowledgeBaseId, onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [sourceType, setSourceType] = useState("text");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDark, setIsDark] = useState(false);

  // Detect theme
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

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
    if (!title.trim()) {
      const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
      setTitle(fileNameWithoutExtension);
    }
    setError("");
  };

  const handleSourceTypeChange = (type) => {
    setSourceType(type);
    setError("");
    if (type !== "text") setContent("");
    if (type !== "url") setUrl("");
    if (type !== "file") setSelectedFile(null);
  };

  const handleCreate = async () => {
    setError("");
    if (!knowledgeBaseId) {
      setError("Knowledge base ID is missing.");
      return;
    }

    // FILE UPLOAD
    if (sourceType === "file") {
      if (!selectedFile) {
        setError("Please select a file.");
        return;
      }
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", selectedFile);
        const response = await axios.post(
          `${config.BASE_URL}/knowledge-bases/${knowledgeBaseId}/sources/upload`,
          formData,
          { headers: { Accept: "*/*" } }
        );
        if (onCreate) onCreate(response.data);
        onClose();
      } catch (err) {
        console.error("Upload Source Error:", err);
        const errorMessage =
          err?.response?.data?.detail ||
          err?.response?.data?.message ||
          "Failed to upload source. Please try again.";
        setError(
          Array.isArray(errorMessage)
            ? errorMessage.map((item) => item?.msg || "").join(", ")
            : errorMessage
        );
      } finally {
        setLoading(false);
      }
      return;
    }

    // TEXT / URL
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    if (sourceType === "text" && !content.trim()) {
      setError("Content is required for text source.");
      return;
    }
    if (sourceType === "url" && !url.trim()) {
      setError("URL is required for URL source.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        title: title.trim(),
        source_type: sourceType,
        content: sourceType === "text" ? content.trim() : "",
        url: sourceType === "url" ? url.trim() : "",
        file_name: "",
        file_size: 0,
      };
      const response = await axios.post(
        `${config.BASE_URL}/knowledge-bases/${knowledgeBaseId}/sources`,
        payload,
        { headers: { "Content-Type": "application/json", Accept: "*/*" } }
      );
      if (onCreate) onCreate(response.data);
      onClose();
    } catch (err) {
      console.error("Create Source Error:", err);
      const errorMessage =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Failed to create source. Please try again.";
      setError(
        Array.isArray(errorMessage)
          ? errorMessage.map((item) => item?.msg || "").join(", ")
          : errorMessage
      );
    } finally {
      setLoading(false);
    }
  };

  // Theme-aware class helpers
  const bg = isDark ? "bg-[#0f141e]" : "bg-white";
  const bgCard = isDark ? "bg-[#161c26]" : "bg-white";
  const border = isDark ? "border-gray-700" : "border-gray-200";
  const textPrimary = isDark ? "text-gray-100" : "text-gray-900";
  const textSecondary = isDark ? "text-gray-400" : "text-gray-500";
  const inputBg = isDark ? "bg-[#1a212e]" : "bg-white";
  const inputBorder = isDark ? "border-gray-600" : "border-gray-300";
  const inputText = isDark ? "text-gray-100" : "text-gray-900";
  const inputPlaceholder = isDark ? "placeholder:text-gray-500" : "placeholder:text-gray-400";

  const tabBase = `flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-md transition-all duration-200`;
  const activeTab = isDark
    ? "bg-[#1e2637] text-white shadow-sm"
    : "bg-white text-gray-900 shadow-sm";
  const inactiveTab = isDark
    ? "text-gray-400 hover:text-gray-200"
    : "text-gray-500 hover:text-gray-700";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className={`w-full max-w-lg rounded-xl shadow-2xl ${bgCard} border ${border} overflow-hidden`}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4">
          <div>
            <h2 className={`text-lg font-semibold ${textPrimary}`}>Add Source</h2>
            <p className={`mt-1 text-sm ${textSecondary}`}>
              Add content to your knowledge base for AI agent reference.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className={`rounded-lg p-1.5 transition ${textSecondary} hover:${textPrimary} ${isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 space-y-5">
          {/* Error */}
          {error && (
            <div
              className={`rounded-lg border px-4 py-3 text-sm ${
                isDark
                  ? "border-red-900/60 bg-red-950/40 text-red-300"
                  : "border-red-200 bg-red-50 text-red-600"
              }`}
            >
              {error}
            </div>
          )}

          {/* Source Type Tabs */}
          <div
            className={`flex items-center gap-1 rounded-lg p-1 ${
              isDark ? "bg-[#1a212e]" : "bg-gray-100"
            }`}
          >
            <button
              type="button"
              onClick={() => handleSourceTypeChange("text")}
              disabled={loading}
              className={`${tabBase} ${sourceType === "text" ? activeTab : inactiveTab}`}
            >
              <Type size={16} />
              Text
            </button>
            <button
              type="button"
              onClick={() => handleSourceTypeChange("url")}
              disabled={loading}
              className={`${tabBase} ${sourceType === "url" ? activeTab : inactiveTab}`}
            >
              <Globe size={16} />
              URL
            </button>
            <button
              type="button"
              onClick={() => handleSourceTypeChange("file")}
              disabled={loading}
              className={`${tabBase} ${sourceType === "file" ? activeTab : inactiveTab}`}
            >
              <Upload size={16} />
              File
            </button>
          </div>

          {/* TEXT SOURCE */}
          {sourceType === "text" && (
            <>
              <div>
                <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Company FAQ"
                  disabled={loading}
                  className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition focus:border-[#2759a2] focus:ring-1 focus:ring-[#2759a2] disabled:cursor-not-allowed ${inputBorder} ${inputBg} ${inputText} ${inputPlaceholder}`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>
                  Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste your text content here..."
                  rows={5}
                  disabled={loading}
                  className={`w-full resize-none rounded-lg border px-3.5 py-2.5 text-sm outline-none transition focus:border-[#2759a2] focus:ring-1 focus:ring-[#2759a2] disabled:cursor-not-allowed ${inputBorder} ${inputBg} ${inputText} ${inputPlaceholder}`}
                />
              </div>
              <button
                type="button"
                disabled={loading}
                className={`flex items-center gap-2 text-sm font-medium transition ${
                  isDark
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <span className="text-lg leading-none">+</span>
                Add Another Text Entry
              </button>
            </>
          )}

          {/* URL SOURCE */}
          {sourceType === "url" && (
            <>
              <div>
                <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Company Website"
                  disabled={loading}
                  className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition focus:border-[#2759a2] focus:ring-1 focus:ring-[#2759a2] disabled:cursor-not-allowed ${inputBorder} ${inputBg} ${inputText} ${inputPlaceholder}`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>
                  URL
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  disabled={loading}
                  className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition focus:border-[#2759a2] focus:ring-1 focus:ring-[#2759a2] disabled:cursor-not-allowed ${inputBorder} ${inputBg} ${inputText} ${inputPlaceholder}`}
                />
              </div>
            </>
          )}

          {/* FILE SOURCE */}
          {sourceType === "file" && (
            <div>
              <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>
                Upload File
              </label>
              <div
                className={`rounded-lg border-2 border-dashed p-8 text-center transition ${
                  isDark
                    ? "border-gray-600 bg-[#131a24] hover:border-[#2759a2]"
                    : "border-gray-300 bg-gray-50 hover:border-[#2759a2]"
                }`}
              >
                <Upload
                  size={36}
                  className={`mx-auto mb-3 ${isDark ? "text-gray-500" : "text-gray-400"}`}
                />
                <p className={`mb-1 text-sm font-medium ${textPrimary}`}>
                  Click to select a file
                </p>
                <p className={`mb-4 text-xs ${textSecondary}`}>
                  PDF, TXT, DOCX, or MD
                </p>
                <label className="inline-flex cursor-pointer items-center rounded-lg bg-[#2759a2] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1f4b8a]">
                  <Upload size={16} className="mr-2" />
                  Choose File
                  <input
                    type="file"
                    onChange={handleFileChange}
                    disabled={loading}
                    className="hidden"
                    accept=".pdf,.txt,.docx,.md"
                  />
                </label>
                {selectedFile && (
                  <div
                    className={`mt-4 rounded-lg border px-4 py-3 text-left ${
                      isDark
                        ? "border-gray-700 bg-[#1a212e]"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p
                          className={`truncate text-sm font-medium ${textPrimary}`}
                        >
                          {selectedFile.name}
                        </p>
                        <p className={`mt-0.5 text-xs ${textSecondary}`}>
                          {(selectedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedFile(null)}
                        disabled={loading}
                        className={`rounded-md p-1 transition ${
                          isDark
                            ? "text-gray-500 hover:bg-gray-700 hover:text-red-400"
                            : "text-gray-400 hover:bg-gray-200 hover:text-red-500"
                        }`}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className={`flex items-center justify-end gap-3 border-t px-6 py-4 ${border} ${
            isDark ? "bg-[#131a24]" : "bg-gray-50"
          }`}
        >
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
              isDark
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCreate}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-[#00c2ff] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#00a8e0] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? "Adding..." : "Add Sources"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSource;