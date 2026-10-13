
import React, { useEffect, useState } from "react";
import { LoaderCircle, X } from "lucide-react";
import { toast } from "react-toastify";
import agentsApi from "./agentsApi";

const getApiStatus = (status) => {
  const value = String(status || "").toLowerCase();

  if (["active", "live", "running", "enabled"].includes(value)) {
    return "active";
  }

  return "inactive";
};

const getStringValue = (value, fallback = "") => {
  if (typeof value === "string") return value;

  if (value && typeof value === "object") {
    return value.id || value.name || value.instruction || fallback;
  }

  return fallback;
};

const initialForm = (agent) => ({
  name: agent?.name || "",
  status: getApiStatus(agent?.rawStatus ?? agent?.status),

  system_prompt: getStringValue(agent?.system_prompt),
  welcome_message: getStringValue(agent?.welcome_message),

  llm_model: getStringValue(
    agent?.llm_model ?? agent?.model?.id
  ),

  voice: getStringValue(agent?.voice),

  memory_enabled: Boolean(
    agent?.memory_enabled ?? agent?.memory?.enabled
  ),

  emotion:
    typeof agent?.emotion === "string"
      ? agent.emotion.toLowerCase()
      : agent?.emotion?.enabled
        ? "enabled"
        : "disabled",

  accent: getStringValue(
    agent?.accent ?? agent?.voice?.accent,
    "indian"
  ),

  timezone: getStringValue(
    agent?.timezone,
    "Asia/Kolkata"
  ),
});

export default function EditAgent({
  agent,
  onClose,
  onSave,
  onDelete,
}) {
  const [form, setForm] = useState(() => initialForm(agent));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(initialForm(agent));
  }, [agent]);

  if (!agent) return null;

  const change = (key, value) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const submit = async (event) => {
    event.preventDefault();

    if (saving) return;

    if (!agent.id) {
      toast.error("Agent ID is missing.");
      return;
    }

    if (!form.name.trim()) {
      toast.error("Agent name is required.");
      return;
    }

    /*
     * PATCH /api/v1/agents/{agent_id}
     *
     * Keep payload fields aligned with the Swagger schema.
     * Do not send client_id or nested voice/accent objects.
     */
    const payload = {
      name: form.name.trim(),
      status: getApiStatus(form.status),
      system_prompt: form.system_prompt,
      welcome_message: form.welcome_message,
      llm_model: form.llm_model.trim(),
      voice: form.voice.trim(),
      memory_enabled: form.memory_enabled,
      emotion: form.emotion,
      accent: form.accent.trim(),
      timezone: form.timezone.trim(),
    };

    setSaving(true);

    try {
      console.log("Updating agent:", agent.id);
      console.log("PATCH payload:", payload);

      const data = await agentsApi.update(agent.id, payload);

      // agentsApi.update returns response.data.
      const responseData = data?.data ?? data;

      const updatedAgent = {
        ...agent,
        ...payload,
        ...(responseData && typeof responseData === "object"
          ? responseData
          : {}),
        id: responseData?.id || agent.id,
        rawStatus: responseData?.status || payload.status,
      };

      onSave?.(updatedAgent);

      toast.success("Agent updated successfully.", {
        position: "top-right",
        autoClose: 2500,
      });

      onClose?.();
    } catch (error) {
      console.error(
        "Update Agent API Error:",
        error?.response?.data || error
      );

      const responseData = error?.response?.data;
      const detail =
        responseData?.detail ??
        responseData?.error?.details?.fields;

      let message = "Failed to update agent.";

      if (Array.isArray(detail)) {
        message = detail
          .map((item) => {
            const field = Array.isArray(item?.loc)
              ? item.loc.filter((part) => part !== "body").join(".")
              : "";

            return `${field ? `${field}: ` : ""}${
              item?.msg || item?.message || "Invalid value"
            }`;
          })
          .join("; ");
      } else if (typeof detail === "string") {
        message = detail;
      } else if (typeof responseData?.message === "string") {
        message = responseData.message;
      } else if (typeof responseData?.detail === "string") {
        message = responseData.detail;
      } else if (error?.response?.status === 401) {
        message = "Session expired. Please log in again.";
      } else if (error?.response?.status === 403) {
        message = "You do not have permission to update this agent.";
      } else if (error?.response?.status === 422) {
        message = "Invalid agent data. Check the PATCH payload in Network.";
      }

      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100";

  const labelClass =
    "mb-1 block text-sm text-zinc-600 dark:text-zinc-300";

  const field = (label, key, type = "text") => (
    <label className="block" key={key}>
      <span className={labelClass}>{label}</span>

      {type === "textarea" ? (
        <textarea
          value={form[key]}
          onChange={(event) => change(key, event.target.value)}
          rows={3}
          className={inputClass}
        />
      ) : (
        <input
          type={type}
          value={form[key]}
          onChange={(event) => change(key, event.target.value)}
          className={inputClass}
        />
      )}
    </label>
  );

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) {
          onClose?.();
        }
      }}
    >
      <form
        onSubmit={submit}
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-zinc-200 bg-white text-zinc-900 shadow-2xl dark:border-zinc-700 dark:bg-[#111114] dark:text-zinc-100"
      >
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-[#111114]">
          <div>
            <h2 className="font-semibold">Edit agent</h2>
            <p className="text-xs text-zinc-500">
              PATCH /api/v1/agents/{agent.id}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="Close edit agent"
            className="rounded-lg p-2 hover:bg-zinc-100 disabled:opacity-50 dark:hover:bg-zinc-800"
          >
            <X size={18} />
          </button>
        </header>

        <div className="grid gap-4 p-5 sm:grid-cols-2">
          {field("Agent name", "name")}

          <label className="block">
            <span className={labelClass}>Status</span>
            <select
              value={form.status}
              onChange={(event) =>
                change("status", event.target.value)
              }
              className={inputClass}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </label>

          {field("LLM model ID", "llm_model")}
          {field("Voice ID", "voice")}
          {field("Accent", "accent")}
          {field("Timezone", "timezone")}

          <div className="sm:col-span-2">
            {field("Welcome message", "welcome_message", "textarea")}
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.memory_enabled}
              onChange={(event) =>
                change("memory_enabled", event.target.checked)
              }
              className="h-4 w-4"
            />
            <span className="text-sm">Enable memory</span>
          </label>

          <label className="block">
            <span className={labelClass}>Emotion</span>
            <select
              value={form.emotion}
              onChange={(event) =>
                change("emotion", event.target.value)
              }
              className={inputClass}
            >
              <option value="enabled">Enabled</option>
              <option value="disabled">Disabled</option>
            </select>
          </label>

          <div className="sm:col-span-2">
            {field("System prompt", "system_prompt", "textarea")}
          </div>
        </div>

        <footer className="flex flex-wrap justify-between gap-3 border-t border-zinc-200 p-4 dark:border-zinc-800">
          <button
            type="button"
            onClick={() => onDelete?.(agent)}
            disabled={saving}
            className="rounded-lg border border-red-300 px-3 py-2 text-sm text-red-600 disabled:opacity-50"
          >
            Delete agent
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm disabled:opacity-50 dark:border-zinc-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving && (
                <LoaderCircle size={15} className="animate-spin" />
              )}
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
}
