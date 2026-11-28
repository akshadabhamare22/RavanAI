import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  X, Plus, Trash2, Loader2, Upload, FileText, Phone, Mail, StickyNote,
  Activity, PhoneCall, Megaphone, AlertCircle, CheckCircle2,
} from "lucide-react";
import { toast } from "react-toastify";

import contactsApi, { getApiError, normalizePhone } from "./contactsApi";

// ============================================================
// SHARED
// ============================================================
export const inputCls =
  "h-10 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-xs outline-none focus:border-cyan-500 dark:border-white/10 dark:bg-[#0b0c0e] dark:text-zinc-100";

const btnPrimary =
  "flex h-10 items-center justify-center gap-2 rounded-lg bg-cyan-500 px-4 text-xs font-semibold text-white transition hover:bg-cyan-400 disabled:opacity-50";
const btnGhost =
  "flex h-10 items-center justify-center gap-2 rounded-lg border border-zinc-200 px-4 text-xs font-semibold hover:bg-zinc-50 disabled:opacity-50 dark:border-white/10 dark:hover:bg-white/5";

export const fmtDate = (value) => {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
};

export const fmtDuration = (seconds) => {
  const s = Math.round(Number(seconds) || 0);
  if (!s) return "0s";
  const m = Math.floor(s / 60);
  const r = s % 60;
  return m ? `${m}m ${r}s` : `${r}s`;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ModalShell({ title, subtitle, onClose, children, footer, wide }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
      <div
        className={`flex max-h-[90vh] w-full ${wide ? "max-w-[720px]" : "max-w-[520px]"} flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#111315]`}
      >
        <div className="flex items-start justify-between border-b border-zinc-100 px-5 py-4 dark:border-white/[0.06]">
          <div>
            <h2 className="text-base font-bold">{title}</h2>
            {subtitle && <p className="mt-1 text-xs text-zinc-500">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="rounded-md p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200">
            <X size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
        {footer && (
          <div className="flex justify-end gap-2 border-t border-zinc-100 px-5 py-3.5 dark:border-white/[0.06]">{footer}</div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// ADD / EDIT CONTACT
// ============================================================
export function ContactFormModal({ contact, onClose, onSaved }) {
  const isEdit = Boolean(contact);
  const [phone, setPhone] = useState(contact?.phone || "");
  const [name, setName] = useState(contact?.name || "");
  const [email, setEmail] = useState(contact?.email || "");
  const [attrs, setAttrs] = useState(
    Object.entries(contact?.attributes || {}).map(([key, value]) => ({
      key,
      value: typeof value === "string" ? value : JSON.stringify(value),
    }))
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    let normalizedPhone = contact?.phone;
    if (!isEdit) {
      try {
        normalizedPhone = normalizePhone(phone);
      } catch (e) {
        setError(e.message);
        return;
      }
    }
    if (email.trim() && !EMAIL_RE.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }

    const attributes = {};
    attrs.forEach(({ key, value }) => {
      if (key.trim()) attributes[key.trim()] = value;
    });

    setSaving(true);
    try {
      const saved = isEdit
        ? await contactsApi.update(contact.id, {
            name: name.trim() || null,
            email: email.trim() || null,
            attributes,
          })
        : await contactsApi.create({
            phone: normalizedPhone,
            name: name.trim() || null,
            email: email.trim() || null,
            attributes,
          });
      toast.success(isEdit ? "Contact updated" : "Contact added");
      onSaved(saved);
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <ModalShell
      title={isEdit ? "Edit contact" : "Add contact"}
      subtitle={isEdit ? "The phone number cannot be changed." : "People your campaigns and agents can call."}
      onClose={onClose}
      footer={
        <>
          <button onClick={onClose} className={btnGhost} disabled={saving}>Cancel</button>
          <button onClick={handleSubmit} className={btnPrimary} disabled={saving}>
            {saving && <Loader2 size={14} className="animate-spin" />}
            {isEdit ? "Save changes" : "Add contact"}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold">Phone <span className="text-red-500">*</span></label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={isEdit}
            placeholder="+919876543210"
            className={`${inputCls} disabled:opacity-60`}
          />
          {!isEdit && <p className="mt-1 text-[11px] text-zinc-500">Digits with an optional leading +, 6–20 digits.</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold">Name</label>
          <input value={name} maxLength={255} onChange={(e) => setName(e.target.value)} placeholder="Full name" className={inputCls} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold">Email</label>
          <input value={email} maxLength={255} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className={inputCls} />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-xs font-semibold">Custom fields</label>
            <button
              type="button"
              onClick={() => setAttrs((prev) => [...prev, { key: "", value: "" }])}
              className="flex items-center gap-1 text-[11px] font-semibold text-cyan-600 dark:text-cyan-400"
            >
              <Plus size={12} /> Add field
            </button>
          </div>
          <div className="space-y-2">
            {attrs.length === 0 && <p className="text-[11px] text-zinc-500">Optional, e.g. company, city. Available to agents as call variables.</p>}
            {attrs.map((row, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={row.key}
                  onChange={(e) => setAttrs((prev) => prev.map((x, idx) => (idx === i ? { ...x, key: e.target.value } : x)))}
                  placeholder="field"
                  className={`${inputCls} !w-[38%]`}
                />
                <input
                  value={row.value}
                  onChange={(e) => setAttrs((prev) => prev.map((x, idx) => (idx === i ? { ...x, value: e.target.value } : x)))}
                  placeholder="value"
                  className={inputCls}
                />
                <button
                  type="button"
                  onClick={() => setAttrs((prev) => prev.filter((_, idx) => idx !== i))}
                  className="shrink-0 rounded-md p-1.5 text-zinc-400 hover:bg-red-500/10 hover:text-red-500"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-500">
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            {error}
          </div>
        )}
      </div>
    </ModalShell>
  );
}

// ============================================================
// CONFIRM DELETE
// ============================================================
export function ConfirmDeleteModal({ title, message, loading, onClose, onConfirm }) {
  return (
    <ModalShell
      title={title}
      onClose={loading ? () => {} : onClose}
      footer={
        <>
          <button onClick={onClose} className={btnGhost} disabled={loading}>Cancel</button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex h-10 items-center justify-center gap-2 rounded-lg bg-red-500 px-4 text-xs font-semibold text-white hover:bg-red-400 disabled:opacity-50"
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            Delete
          </button>
        </>
      }
    >
      <p className="text-sm text-zinc-600 dark:text-zinc-300">{message}</p>
    </ModalShell>
  );
}

// ============================================================
// CSV / PASTE IMPORT
// ============================================================
const CHUNK = 200;

// Minimal CSV parser: quoted fields, escaped quotes, CRLF, comma/semicolon/tab delimiters.
function parseCsv(text) {
  const firstLine = text.split(/\r?\n/, 1)[0] || "";
  const delimiter = [",", ";", "\t"].reduce(
    (best, d) => (firstLine.split(d).length > firstLine.split(best).length ? d : best),
    ","
  );
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i += 1; }
      else if (ch === '"') inQuotes = false;
      else field += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === delimiter) { row.push(field); field = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i += 1;
      row.push(field); field = "";
      rows.push(row); row = [];
    } else field += ch;
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((cell) => String(cell).trim() !== ""));
}

const PHONE_HEADERS = ["phone", "mobile", "number", "phone number", "phone_number", "mobile number", "contact"];

function rowsToContacts(rows) {
  if (!rows.length) return { valid: [], invalid: [], duplicates: 0 };

  const header = rows[0].map((h) => String(h).trim().toLowerCase());
  const phoneIdx = header.findIndex((h) => PHONE_HEADERS.includes(h));
  const hasHeader = phoneIdx !== -1;

  const nameIdx = hasHeader ? header.findIndex((h) => ["name", "full name", "full_name"].includes(h)) : 1;
  const emailIdx = hasHeader ? header.findIndex((h) => ["email", "e-mail", "email address"].includes(h)) : 2;
  const pIdx = hasHeader ? phoneIdx : 0;
  const body = hasHeader ? rows.slice(1) : rows;

  const valid = [];
  const invalid = [];
  const seen = new Set();
  let duplicates = 0;

  body.forEach((cells, i) => {
    const line = i + (hasHeader ? 2 : 1);
    try {
      const phone = normalizePhone(cells[pIdx]);
      if (seen.has(phone)) { duplicates += 1; return; }
      seen.add(phone);

      const attributes = {};
      if (hasHeader) {
        header.forEach((h, c) => {
          if (c === pIdx || c === nameIdx || c === emailIdx || !h) return;
          const v = String(cells[c] ?? "").trim();
          if (v) attributes[rows[0][c].trim()] = v;
        });
      }
      const name = String(cells[nameIdx] ?? "").trim();
      const email = String(cells[emailIdx] ?? "").trim();
      valid.push({
        phone,
        name: name || null,
        email: email && EMAIL_RE.test(email) ? email : null,
        attributes,
      });
    } catch (e) {
      invalid.push({ line, reason: e.message, value: String(cells[pIdx] ?? "") });
    }
  });

  return { valid, invalid, duplicates };
}

export function ImportContactsModal({ onClose, onImported }) {
  const [mode, setMode] = useState("csv");
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const fileRef = useRef(null);

  const parsed = useMemo(() => rowsToContacts(text.trim() ? parseCsv(text) : []), [text]);

  const handleFile = async (file) => {
    if (!file) return;
    setFileName(file.name);
    setText(await file.text());
    setResult(null);
  };

  const handleImport = async () => {
    if (!parsed.valid.length) return;
    setImporting(true);
    setProgress(0);

    let imported = 0;
    const failedChunks = [];

    for (let start = 0; start < parsed.valid.length; start += CHUNK) {
      const chunk = parsed.valid.slice(start, start + CHUNK);
      try {
        const res = await contactsApi.bulkCreate(chunk);
        imported += res.total ?? chunk.length;
      } catch (err) {
        failedChunks.push({ from: start + 1, to: start + chunk.length, message: getApiError(err) });
      }
      setProgress(Math.min(100, Math.round(((start + chunk.length) / parsed.valid.length) * 100)));
    }

    setImporting(false);
    setResult({ imported, failedChunks });
    if (imported > 0) {
      toast.success(`${imported} contact${imported === 1 ? "" : "s"} imported`);
      onImported();
    }
  };

  return (
    <ModalShell
      wide
      title="Import contacts"
      subtitle="Upload a CSV or paste rows. Required column: phone. Optional: name, email. Any other column becomes a custom field."
      onClose={importing ? () => {} : onClose}
      footer={
        <>
          <button onClick={onClose} className={btnGhost} disabled={importing}>{result ? "Close" : "Cancel"}</button>
          {!result && (
            <button onClick={handleImport} className={btnPrimary} disabled={importing || !parsed.valid.length}>
              {importing && <Loader2 size={14} className="animate-spin" />}
              Import {parsed.valid.length || ""} contact{parsed.valid.length === 1 ? "" : "s"}
            </button>
          )}
        </>
      }
    >
      <div className="mb-4 flex w-fit items-center gap-1 rounded-lg bg-zinc-100 p-1 dark:bg-[#08090B]">
        {[
          { id: "csv", label: "Upload CSV", icon: Upload },
          { id: "paste", label: "Paste", icon: FileText },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setMode(id)}
            className={`flex items-center gap-1.5 rounded-md px-3 py-2 text-[11px] font-semibold ${
              mode === id ? "bg-white shadow-sm dark:bg-[#25282c]" : "text-zinc-500"
            }`}
          >
            <Icon size={12} /> {label}
          </button>
        ))}
      </div>

      {mode === "csv" ? (
        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files?.[0]); }}
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 px-4 py-8 text-center hover:border-cyan-500/50 dark:border-white/15"
        >
          <Upload size={22} className="mb-2 text-zinc-400" />
          <p className="text-xs font-semibold">{fileName || "Click to choose a .csv file or drop it here"}</p>
          <input
            ref={fileRef}
            type="file"
            accept=".csv,text/csv,.txt"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </div>
      ) : (
        <textarea
          value={text}
          onChange={(e) => { setText(e.target.value); setResult(null); }}
          rows={7}
          placeholder={"phone,name,email,company\n+919876543210,Asha Patil,asha@example.com,Acme\n9123456780,Ravi"}
          className="w-full resize-y rounded-lg border border-zinc-200 bg-zinc-50 p-3 font-mono text-xs outline-none focus:border-cyan-500 dark:border-white/10 dark:bg-[#0b0c0e]"
        />
      )}

      {text.trim() && (
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[
            { label: "Ready to import", value: parsed.valid.length, tone: "text-emerald-600 dark:text-emerald-400" },
            { label: "Invalid rows", value: parsed.invalid.length, tone: parsed.invalid.length ? "text-red-500" : "" },
            { label: "Duplicates in file", value: parsed.duplicates, tone: "" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-zinc-200 p-3 dark:border-white/10">
              <p className={`text-xl font-bold tabular-nums ${s.tone}`}>{s.value}</p>
              <p className="mt-0.5 text-[10px] text-zinc-500">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {parsed.invalid.length > 0 && (
        <div className="mt-3 max-h-28 overflow-y-auto rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-[11px] text-red-500">
          {parsed.invalid.slice(0, 20).map((r) => (
            <p key={r.line}>Line {r.line}: {r.reason}{r.value ? ` (“${r.value}”)` : ""}</p>
          ))}
          {parsed.invalid.length > 20 && <p>…and {parsed.invalid.length - 20} more</p>}
          <p className="mt-1 text-zinc-500">Invalid rows are skipped.</p>
        </div>
      )}

      {importing && (
        <div className="mt-4">
          <div className="h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
            <div className="h-full bg-cyan-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-1 text-[11px] text-zinc-500">{progress}%</p>
        </div>
      )}

      {result && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 size={14} /> {result.imported} imported
          </div>
          {result.failedChunks.map((f) => (
            <div key={f.from} className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-500">
              <AlertCircle size={14} className="mt-0.5 shrink-0" />
              Rows {f.from}–{f.to} failed: {f.message}
            </div>
          ))}
        </div>
      )}
    </ModalShell>
  );
}

// ============================================================
// CONTACT DETAIL DRAWER
// ============================================================
const TABS = [
  { id: "overview", label: "Overview", icon: Activity },
  { id: "notes", label: "Notes", icon: StickyNote },
  { id: "calls", label: "Calls", icon: PhoneCall },
  { id: "campaigns", label: "Campaigns", icon: Megaphone },
];

function useLoader(fn, deps) {
  const [state, setState] = useState({ loading: true, error: "", data: null });
  const reload = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: "" }));
    try {
      setState({ loading: false, error: "", data: await fn() });
    } catch (err) {
      setState({ loading: false, error: getApiError(err), data: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  useEffect(() => { reload(); }, [reload]);
  return [state, reload];
}

const Loading = () => (
  <div className="flex items-center justify-center gap-2 py-10 text-xs text-zinc-500">
    <Loader2 size={14} className="animate-spin" /> Loading...
  </div>
);
const ErrorBox = ({ message }) => (
  <div className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-500">
    <AlertCircle size={14} className="mt-0.5 shrink-0" /> {message}
  </div>
);
const Empty = ({ children }) => (
  <div className="rounded-lg border border-dashed border-zinc-300 px-4 py-8 text-center text-xs text-zinc-500 dark:border-white/10">{children}</div>
);

function OverviewTab({ contact }) {
  const [stats] = useLoader(() => contactsApi.getStats(contact.id), [contact.id]);
  const [acts] = useLoader(() => contactsApi.getActivities(contact.id), [contact.id]);

  return (
    <div className="space-y-5">
      <div className="space-y-2 rounded-lg border border-zinc-200 p-4 text-xs dark:border-white/10">
        <p className="flex items-center gap-2"><Phone size={13} className="text-zinc-400" /> {contact.phone}</p>
        <p className="flex items-center gap-2"><Mail size={13} className="text-zinc-400" /> {contact.email || "No email"}</p>
        {Object.entries(contact.attributes || {}).map(([k, v]) => (
          <p key={k} className="flex gap-2"><span className="w-28 shrink-0 text-zinc-500">{k}</span><span className="break-words">{String(v)}</span></p>
        ))}
        <p className="pt-1 text-[10px] text-zinc-400">Added {fmtDate(contact.created_at)}</p>
      </div>

      {stats.loading ? <Loading /> : stats.error ? <ErrorBox message={stats.error} /> : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            ["Calls", stats.data.total_calls],
            ["Completed", stats.data.completed_calls],
            ["Failed", stats.data.failed_calls],
            ["Avg duration", fmtDuration(stats.data.avg_seconds)],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-zinc-200 p-3 dark:border-white/10">
              <p className="text-lg font-bold tabular-nums">{value}</p>
              <p className="text-[10px] text-zinc-500">{label}</p>
            </div>
          ))}
          <div className="col-span-2 rounded-lg border border-zinc-200 p-3 text-xs dark:border-white/10 sm:col-span-4">
            <span className="text-zinc-500">Last call: </span>{fmtDate(stats.data.last_call_at)}
            {Object.keys(stats.data.sentiment || {}).length > 0 && (
              <span className="ml-3 text-zinc-500">
                Sentiment: {Object.entries(stats.data.sentiment).map(([k, v]) => `${k} ${v}`).join(" · ")}
              </span>
            )}
          </div>
        </div>
      )}

      <div>
        <h4 className="mb-2 text-xs font-bold">Recent activity</h4>
        {acts.loading ? <Loading /> : acts.error ? <ErrorBox message={acts.error} /> : acts.data.length === 0 ? (
          <Empty>No activity yet.</Empty>
        ) : (
          <ul className="space-y-2">
            {acts.data.slice(0, 20).map((a) => (
              <li key={`${a.type}-${a.id}`} className="flex items-start gap-3 rounded-lg border border-zinc-200 p-3 text-xs dark:border-white/10">
                {a.type === "call" ? <PhoneCall size={14} className="mt-0.5 text-cyan-500" /> : <StickyNote size={14} className="mt-0.5 text-amber-500" />}
                <div className="min-w-0">
                  <p className="font-semibold capitalize">{a.type}</p>
                  <p className="mt-0.5 break-words text-zinc-500">{a.summary || "No summary"}</p>
                  <p className="mt-1 text-[10px] text-zinc-400">{fmtDate(a.at)}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function NotesTab({ contact }) {
  const [notes, reload] = useLoader(() => contactsApi.getNotes(contact.id), [contact.id]);
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);

  const add = async () => {
    if (!body.trim()) return;
    setSaving(true);
    try {
      await contactsApi.addNote(contact.id, body.trim());
      setBody("");
      reload();
    } catch (err) {
      toast.error(getApiError(err));
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    try {
      await contactsApi.deleteNote(contact.id, id);
      reload();
    } catch (err) {
      toast.error(getApiError(err));
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <textarea
          value={body}
          maxLength={5000}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
          placeholder="Write a note..."
          className="w-full resize-none rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-xs outline-none focus:border-cyan-500 dark:border-white/10 dark:bg-[#0b0c0e]"
        />
        <div className="mt-2 flex justify-end">
          <button onClick={add} disabled={saving || !body.trim()} className={btnPrimary}>
            {saving && <Loader2 size={14} className="animate-spin" />} Add note
          </button>
        </div>
      </div>

      {notes.loading ? <Loading /> : notes.error ? <ErrorBox message={notes.error} /> : notes.data.length === 0 ? (
        <Empty>No notes yet.</Empty>
      ) : (
        <ul className="space-y-2">
          {notes.data.map((n) => (
            <li key={n.id} className="flex items-start justify-between gap-3 rounded-lg border border-zinc-200 p-3 text-xs dark:border-white/10">
              <div className="min-w-0">
                <p className="whitespace-pre-wrap break-words">{n.body}</p>
                <p className="mt-1 text-[10px] text-zinc-400">{fmtDate(n.created_at)}</p>
              </div>
              <button onClick={() => remove(n.id)} className="shrink-0 rounded-md p-1.5 text-zinc-400 hover:bg-red-500/10 hover:text-red-500">
                <Trash2 size={13} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CallsTab({ contact }) {
  const [calls] = useLoader(() => contactsApi.getCalls(contact.id, { limit: 50 }), [contact.id]);
  if (calls.loading) return <Loading />;
  if (calls.error) return <ErrorBox message={calls.error} />;
  if (!calls.data.items.length) return <Empty>No calls with this number yet.</Empty>;
  return (
    <ul className="space-y-2">
      {calls.data.items.map((c) => (
        <li key={c.id} className="rounded-lg border border-zinc-200 p-3 text-xs dark:border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold capitalize">{c.direction}</span>
            <span className="rounded-full bg-zinc-500/10 px-2 py-0.5 text-[10px] capitalize">{c.status}</span>
            {c.sentiment && <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] capitalize text-cyan-600 dark:text-cyan-400">{c.sentiment}</span>}
            <span className="ml-auto text-[10px] text-zinc-400">{fmtDate(c.started_at)} · {fmtDuration(c.duration_seconds)}</span>
          </div>
          {c.summary && <p className="mt-1.5 text-zinc-500">{c.summary}</p>}
          {c.end_reason && <p className="mt-1 text-[10px] text-zinc-400">Ended: {c.end_reason}</p>}
        </li>
      ))}
      {calls.data.total > calls.data.items.length && (
        <p className="text-center text-[11px] text-zinc-500">Showing {calls.data.items.length} of {calls.data.total} calls</p>
      )}
    </ul>
  );
}

function CampaignsTab({ contact }) {
  const [rows] = useLoader(() => contactsApi.getCampaigns(contact.id), [contact.id]);
  if (rows.loading) return <Loading />;
  if (rows.error) return <ErrorBox message={rows.error} />;
  if (!rows.data.length) return <Empty>Not part of any campaign.</Empty>;
  return (
    <ul className="space-y-2">
      {rows.data.map((r) => (
        <li key={r.campaign_id} className="flex items-center justify-between gap-3 rounded-lg border border-zinc-200 p-3 text-xs dark:border-white/10">
          <div className="min-w-0">
            <p className="truncate font-semibold">{r.name}</p>
            <p className="mt-0.5 text-[10px] text-zinc-500">Campaign: {r.campaign_status} · Attempts: {r.attempts}</p>
          </div>
          <span className="shrink-0 rounded-full bg-zinc-500/10 px-2 py-0.5 text-[10px] capitalize">{r.contact_status}</span>
        </li>
      ))}
    </ul>
  );
}

export function ContactDrawer({ contact, onClose, onEdit, onDelete }) {
  const [tab, setTab] = useState("overview");

  useEffect(() => { setTab("overview"); }, [contact.id]);

  return (
    <div className="fixed inset-0 z-[90] flex justify-end bg-black/50" onClick={onClose}>
      <aside
        className="flex h-full w-full max-w-[520px] flex-col border-l border-zinc-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#111315]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-zinc-100 px-5 py-4 dark:border-white/[0.06]">
          <div className="min-w-0">
            <h2 className="truncate text-base font-bold">{contact.name || "Unnamed contact"}</h2>
            <p className="mt-0.5 text-xs text-zinc-500">{contact.phone}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button onClick={() => onEdit(contact)} className="rounded-lg border border-zinc-200 px-3 py-1.5 text-[11px] font-semibold hover:bg-zinc-50 dark:border-white/10 dark:hover:bg-white/5">Edit</button>
            <button onClick={() => onDelete(contact)} className="rounded-lg border border-red-500/20 px-3 py-1.5 text-[11px] font-semibold text-red-500 hover:bg-red-500/5">Delete</button>
            <button onClick={onClose} className="rounded-md p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"><X size={16} /></button>
          </div>
        </div>

        <div className="flex gap-1 border-b border-zinc-100 px-3 pt-2 dark:border-white/[0.06]">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-1.5 border-b-2 px-3 py-2 text-[11px] font-semibold ${
                tab === id ? "border-cyan-500 text-cyan-600 dark:text-cyan-400" : "border-transparent text-zinc-500"
              }`}
            >
              <Icon size={12} /> {label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {tab === "overview" && <OverviewTab contact={contact} />}
          {tab === "notes" && <NotesTab contact={contact} />}
          {tab === "calls" && <CallsTab contact={contact} />}
          {tab === "campaigns" && <CampaignsTab contact={contact} />}
        </div>
      </aside>
    </div>
  );
}
