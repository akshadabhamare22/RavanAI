import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { ModalShell, Field, inputClass } from "./AgentModalParts";

export default function EditAgent({ agent, onClose, onSave, onDelete }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Single Prompt");
  const [model, setModel] = useState("Agni Premium Lite");
  const [voice, setVoice] = useState("Priya");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (agent) {
      setName(agent.name);
      setType(agent.type);
      setModel(agent.model);
      setVoice(agent.voice);
      setDescription(agent.description);
    }
  }, [agent]);

  if (!agent) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const initials = name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    onSave({
      ...agent,
      name: name.trim(),
      initials,
      type,
      model,
      voice,
      description: description.trim(),
      updated: new Date().toLocaleString(),
    });
  };

  return (
    <ModalShell title="Edit Agent" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Agent name">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={inputClass}
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Type">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={inputClass}
            >
              <option>Single Prompt</option>
              <option>Multi Prompt</option>
              <option>Workflow</option>
            </select>
          </Field>

          <Field label="Voice">
            <select
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
              className={inputClass}
            >
              <option>Priya</option>
              <option>Aarav</option>
              <option>Emma</option>
              <option>James</option>
            </select>
          </Field>
        </div>

        <Field label="Model">
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className={inputClass}
          >
            <option>Agni Premium Lite</option>
            <option>Agni Premium Pro</option>
            <option>Agni Enterprise</option>
          </select>
        </Field>

        <Field label="Description">
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${inputClass} h-auto py-2`}
          />
        </Field>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => onDelete(agent)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500/[0.08] dark:text-red-400"
          >
            <Trash2 size={14} />
            Delete
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-black/[0.08] px-4 py-2 text-sm font-medium text-zinc-700 dark:border-white/[0.08] dark:text-zinc-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-white dark:bg-cyan-400 dark:text-slate-950"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </ModalShell>
  );
}