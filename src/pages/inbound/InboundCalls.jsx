import React, { useState, useEffect } from "react";
import {
  PhoneCall,
  Phone,
  User,
  Calendar,
  Clock,
  Shield,
  RotateCcw,
  Plus,
  Search,
  Check,
  ChevronDown,
  Info,
} from "lucide-react";

// ============================================================
// CONSTANTS
// ============================================================

const TIMEZONES = [
  "UTC",
  "Asia/Kolkata",
  "Asia/Dubai",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Europe/London",
  "Europe/Paris",
  "America/New_York",
  "America/Los_Angeles",
  "Australia/Sydney",
];

const HOURS = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, "0")
);
const MINUTES = ["00", "15", "30", "45"];

const DAYS = [
  { key: "Mon", label: "Mon" },
  { key: "Tue", label: "Tue" },
  { key: "Wed", label: "Wed" },
  { key: "Thu", label: "Thu" },
  { key: "Fri", label: "Fri" },
  { key: "Sat", label: "Sat" },
  { key: "Sun", label: "Sun" },
];

// ============================================================
// MAIN PAGE
// ============================================================

export default function InboundCalls() {
  const [form, setForm] = useState({
    phoneNumber: "",
    agent: "",
    timezone: "",
    maxConcurrent: 1,
    budget: "",
    startDate: "",
    endDate: "",
    windowStartHour: "",
    windowStartMin: "",
    windowEndHour: "",
    windowEndMin: "",
    activeDays: [],
  });

  const [routes, setRoutes] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [errors, setErrors] = useState({});

  const updateField = (key, value) => {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const toggleDay = (key) => {
    setForm((p) => ({
      ...p,
      activeDays: p.activeDays.includes(key)
        ? p.activeDays.filter((d) => d !== key)
        : [...p.activeDays, key],
    }));
  };

  const validate = () => {
    const e = {};
    if (!form.phoneNumber) e.phoneNumber = "Phone number is required";
    if (!form.agent) e.agent = "Please select an agent";
    if (!form.timezone) e.timezone = "Timezone is required";
    if (form.maxConcurrent < 1 || form.maxConcurrent > 5)
      e.maxConcurrent = "Must be between 1 and 5";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    const newRoute = {
      id: Date.now().toString(),
      ...form,
      createdAt: new Date().toLocaleString(),
    };

    setRoutes((prev) => [newRoute, ...prev]);
    handleReset();
  };

  const handleReset = () => {
    setForm({
      phoneNumber: "",
      agent: "",
      timezone: "",
      maxConcurrent: 1,
      budget: "",
      startDate: "",
      endDate: "",
      windowStartHour: "",
      windowStartMin: "",
      windowEndHour: "",
      windowEndMin: "",
      activeDays: [],
    });
    setErrors({});
  };

  const filteredRoutes = routes.filter((r) =>
    (r.phoneNumber || "").toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
      <main className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-7">
        {/* ============ INBOUND CAMPAIGN CARD ============ */}
        <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">
          {/* Card header */}
          <div className="flex items-center gap-3 border-b border-black/[0.06] px-5 py-4 dark:border-white/[0.06]">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-500/25 bg-cyan-500/[0.06]">
              <PhoneCall
                size={16}
                className="text-cyan-600 dark:text-cyan-400"
              />
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
                Inbound Campaign
              </h2>
              <p className="mt-0.5 text-[12px] text-zinc-500">
                Link a phone number to an AI agent — all calls to that number will be handled automatically.
              </p>
            </div>
          </div>

          {/* Form body */}
          <form onSubmit={handleSubmit} className="space-y-6 p-5">
            {/* Incoming Calls To + Routed To Agent */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Incoming */}
              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  Incoming Calls To
                </label>
                <div className="relative">
                  <Phone
                    size={14}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                  />
                  <select
                    value={form.phoneNumber}
                    onChange={(e) =>
                      updateField("phoneNumber", e.target.value)
                    }
                    className="h-11 w-full appearance-none rounded-lg border border-black/[0.08] bg-white pl-9 pr-9 text-[13px] text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:focus:border-cyan-400"
                  >
                    <option value="">No numbers</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                  />
                </div>
                <p className="mt-2 flex items-center gap-1.5 text-[11px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  <span className="text-zinc-500">
                    No phone numbers —{" "}
                    <a
                      href="#"
                      className="text-cyan-600 hover:underline dark:text-cyan-400"
                    >
                      buy one first
                    </a>
                  </span>
                </p>
              </div>

              {/* Agent */}
              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  Routed To Agent
                </label>
                <div className="relative">
                  <User
                    size={14}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                  />
                  <select
                    value={form.agent}
                    onChange={(e) => updateField("agent", e.target.value)}
                    className="h-11 w-full appearance-none rounded-lg border border-black/[0.08] bg-white pl-9 pr-9 text-[13px] text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:focus:border-cyan-400"
                  >
                    <option value="">Select agent</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                  />
                </div>
                {errors.agent && (
                  <p className="mt-1.5 text-[11px] text-red-500">
                    {errors.agent}
                  </p>
                )}
              </div>
            </div>

            {/* ============ SCHEDULE & RULES ============ */}
            <div className="rounded-xl border border-black/[0.06] p-5 dark:border-white/[0.06]">
              {/* Sub-header */}
              <div className="mb-5 flex items-center gap-2">
                <Calendar size={14} className="text-zinc-500" />
                <h3 className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
                  Schedule &amp; Rules
                </h3>
              </div>

              {/* Row 1: Timezone + Max Concurrent */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                    Timezone <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock
                      size={14}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                    />
                    <select
                      value={form.timezone}
                      onChange={(e) =>
                        updateField("timezone", e.target.value)
                      }
                      className="h-11 w-full appearance-none rounded-lg border border-black/[0.08] bg-white pl-9 pr-9 text-[13px] text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:focus:border-cyan-400"
                    >
                      <option value="">Select timezone</option>
                      {TIMEZONES.map((tz) => (
                        <option key={tz} value={tz}>
                          {tz}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                    />
                  </div>
                  {errors.timezone && (
                    <p className="mt-1.5 text-[11px] text-red-500">
                      {errors.timezone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                    Max Concurrent Calls
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={form.maxConcurrent}
                    onChange={(e) =>
                      updateField(
                        "maxConcurrent",
                        parseInt(e.target.value || "0", 10)
                      )
                    }
                    className="h-11 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:focus:border-cyan-400"
                  />
                  <p className="mt-1.5 text-[11px] text-zinc-500">
                    Range: 1 – 5
                  </p>
                  {errors.maxConcurrent && (
                    <p className="mt-1 text-[11px] text-red-500">
                      {errors.maxConcurrent}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Budget + Start Date */}
              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                    Budget (Credits)
                  </label>
                  <input
                    type="text"
                    value={form.budget}
                    onChange={(e) => updateField("budget", e.target.value)}
                    placeholder="Unlimited"
                    className="h-11 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-cyan-400"
                  />
                  <p className="mt-1.5 text-[11px] text-zinc-500">
                    New calls are rejected once spend reaches the cap. Blank = unlimited.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => updateField("startDate", e.target.value)}
                    className="h-11 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Row 3: End Date + Window Start */}
              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => updateField("endDate", e.target.value)}
                    className="h-11 w-full rounded-lg border border-black/[0.08] bg-white px-3 text-[13px] text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                    Call Window Start
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <select
                        value={form.windowStartHour}
                        onChange={(e) =>
                          updateField("windowStartHour", e.target.value)
                        }
                        className="h-11 w-full appearance-none rounded-lg border border-black/[0.08] bg-white px-3 pr-9 text-[13px] text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:focus:border-cyan-400"
                      >
                        <option value="">Hour</option>
                        {HOURS.map((h) => (
                          <option key={h} value={h}>
                            {h}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={13}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                      />
                    </div>
                    <span className="text-zinc-400">:</span>
                    <div className="relative flex-1">
                      <select
                        value={form.windowStartMin}
                        onChange={(e) =>
                          updateField("windowStartMin", e.target.value)
                        }
                        className="h-11 w-full appearance-none rounded-lg border border-black/[0.08] bg-white px-3 pr-9 text-[13px] text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:focus:border-cyan-400"
                      >
                        <option value="">Min</option>
                        {MINUTES.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={13}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 4: Window End */}
              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                    Call Window End
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <select
                        value={form.windowEndHour}
                        onChange={(e) =>
                          updateField("windowEndHour", e.target.value)
                        }
                        className="h-11 w-full appearance-none rounded-lg border border-black/[0.08] bg-white px-3 pr-9 text-[13px] text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:focus:border-cyan-400"
                      >
                        <option value="">Hour</option>
                        {HOURS.map((h) => (
                          <option key={h} value={h}>
                            {h}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={13}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                      />
                    </div>
                    <span className="text-zinc-400">:</span>
                    <div className="relative flex-1">
                      <select
                        value={form.windowEndMin}
                        onChange={(e) =>
                          updateField("windowEndMin", e.target.value)
                        }
                        className="h-11 w-full appearance-none rounded-lg border border-black/[0.08] bg-white px-3 pr-9 text-[13px] text-zinc-900 outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-100 dark:focus:border-cyan-400"
                      >
                        <option value="">Min</option>
                        {MINUTES.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={13}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 5: Active Days */}
              <div className="mt-5">
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  Active Days
                </label>
                <div className="flex flex-wrap gap-2">
                  {DAYS.map((d) => {
                    const active = form.activeDays.includes(d.key);
                    return (
                      <button
                        key={d.key}
                        type="button"
                        onClick={() => toggleDay(d.key)}
                        className={`
                          rounded-md border px-3 py-1.5 text-[12px] font-medium transition
                          ${
                            active
                              ? "border-cyan-500/50 bg-cyan-500/[0.10] text-cyan-600 dark:text-cyan-400"
                              : "border-black/[0.08] bg-white text-zinc-600 hover:border-cyan-500/30 dark:border-white/[0.08] dark:bg-[#0e0f12] dark:text-zinc-400"
                          }
                        `}
                      >
                        {d.label}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-[11px] text-zinc-500">
                  Leave call window blank to allow calls at any time.
                </p>
              </div>
            </div>

            {/* ============ FOOTER ============ */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.06] pt-5 dark:border-white/[0.06]">
              <div className="flex items-center gap-2 text-[12px] text-zinc-500">
                <Shield size={14} className="text-cyan-500 dark:text-cyan-400" />
                Route becomes live immediately after creation.
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex h-10 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-4 text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
                >
                  <RotateCcw size={14} />
                  Reset
                </button>
                <button
                  type="submit"
                  className="flex h-10 items-center gap-2 rounded-lg bg-cyan-500 px-4 text-[13px] font-semibold text-white transition hover:bg-cyan-400 dark:bg-cyan-400 dark:text-slate-950"
                >
                  <Plus size={15} strokeWidth={2.8} />
                  Create Route
                </button>
              </div>
            </div>
          </form>
        </section>

        {/* ============ ROUTING RULES ============ */}
        <section className="space-y-4">
          {/* Header row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h2 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
                Routing Rules
              </h2>
              <span className="rounded bg-black/[0.06] px-2 py-0.5 text-[11px] font-semibold text-zinc-600 dark:bg-white/[0.08] dark:text-zinc-400">
                {routes.length}
              </span>
            </div>

            <div className="flex h-10 w-full max-w-xs items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-sm text-zinc-500 dark:border-white/[0.08] dark:bg-[#101012]">
              <Search size={14} />
              <input
                type="text"
                placeholder="Filter by number..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="min-w-0 flex-1 bg-transparent text-[13px] text-zinc-800 outline-none placeholder:text-zinc-500 dark:text-zinc-200"
              />
            </div>
          </div>

          {/* Empty state */}
          {routes.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-black/[0.10] bg-white py-20 text-center dark:border-white/[0.08] dark:bg-[#101012]">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-black/[0.06] bg-zinc-50 dark:border-white/[0.08] dark:bg-white/[0.02]">
                <Phone
                  size={26}
                  className="text-zinc-400 dark:text-zinc-500"
                />
              </div>

              <h3 className="mt-5 text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
                No routes yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-zinc-500">
                Create a routing rule above to start directing calls from a
                phone number to an AI agent.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">
              <table className="w-full">
                <thead className="border-b border-black/[0.06] dark:border-white/[0.06]">
                  <tr>
                    <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      Phone Number
                    </th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      Agent
                    </th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      Timezone
                    </th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      Max
                    </th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      Active Days
                    </th>
                    <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRoutes.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b border-black/[0.04] last:border-0 dark:border-white/[0.04]"
                    >
                      <td className="px-5 py-4 text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
                        {r.phoneNumber}
                      </td>
                      <td className="px-3 py-4 text-[13px] text-zinc-700 dark:text-zinc-300">
                        {r.agent || "-"}
                      </td>
                      <td className="px-3 py-4 text-[13px] text-zinc-700 dark:text-zinc-300">
                        {r.timezone}
                      </td>
                      <td className="px-3 py-4 text-[13px] text-zinc-700 dark:text-zinc-300">
                        {r.maxConcurrent}
                      </td>
                      <td className="px-3 py-4 text-[12px] text-zinc-500">
                        {r.activeDays.length > 0
                          ? r.activeDays.join(", ")
                          : "All days"}
                      </td>
                      <td className="px-5 py-4 text-right text-[12px] text-zinc-500">
                        {r.createdAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}