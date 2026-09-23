
import React, { useState } from "react";
import {
  Clock3,
  Bot,
  PhoneCall,
  Coins,
  Target,
  Zap,
  Activity,
  CheckCircle2,
  XCircle,
  PhoneOutgoing,
  ArrowUpRight,
  Globe2,
  Info,
} from "lucide-react";

// ============================================================
// STAT CARD
// ============================================================

const StatCard = ({
  icon: Icon,
  label,
  value,
  suffix,
  live = false,
  accent = false,
}) => {
  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl border p-4
        transition-all duration-200
        ${
          accent
            ? "border-cyan-500/30 bg-cyan-500/[0.035] hover:border-cyan-400/50"
            : "border-white/[0.08] bg-[#101012] hover:border-white/[0.16]"
        }
      `}
    >
      <div className="mb-5 flex items-center justify-between">
        <div
          className={`
            flex h-8 w-8 items-center justify-center rounded-lg
            ${
              accent
                ? "bg-cyan-500/10 text-cyan-400"
                : "bg-white/[0.055] text-zinc-400"
            }
          `}
        >
          <Icon size={16} strokeWidth={1.7} />
        </div>

        {live && (
          <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-cyan-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
            Live
          </div>
        )}
      </div>

      <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.08em] text-zinc-500">
        {label}
      </p>

      <div
        className={`text-2xl font-semibold tracking-tight ${
          accent ? "text-cyan-400" : "text-zinc-100"
        }`}
      >
        {value}
        {suffix && (
          <span className="ml-1 text-sm font-normal text-zinc-500">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};

// ============================================================
// GLOBAL REACH
// ============================================================

const GlobalReach = () => {
  return (
    <div className="relative h-full min-h-[365px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101012] p-5">
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-zinc-200">
            Global Reach
          </h3>
          <p className="mt-1 text-xs text-zinc-500">Active regions</p>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-zinc-400">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          Live
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 top-[62px] flex items-center justify-center">
        <div className="relative aspect-square w-[88%] max-w-[320px]">
          {/* Glow */}
          <div className="absolute inset-[8%] rounded-full bg-cyan-500/[0.07] blur-3xl" />

          {/* Globe */}
          <svg
            viewBox="0 0 360 360"
            className="relative h-full w-full"
            role="img"
            aria-label="Decorative global reach globe"
          >
            <defs>
              <radialGradient id="globeOcean" cx="35%" cy="25%" r="80%">
                <stop offset="0%" stopColor="#214865" />
                <stop offset="55%" stopColor="#0B253A" />
                <stop offset="100%" stopColor="#030B14" />
              </radialGradient>

              <clipPath id="globeClip">
                <circle cx="180" cy="180" r="132" />
              </clipPath>

              <filter id="globeGlow">
                <feGaussianBlur stdDeviation="4" />
              </filter>
            </defs>

            {/* Outer rings */}
            <circle
              cx="180"
              cy="180"
              r="144"
              fill="none"
              stroke="#15506B"
              strokeWidth="1"
              opacity="0.65"
            />

            <circle
              cx="180"
              cy="180"
              r="140"
              fill="none"
              stroke="#0B526A"
              strokeWidth="1"
              opacity="0.35"
            />

            {/* Ocean */}
            <circle
              cx="180"
              cy="180"
              r="132"
              fill="url(#globeOcean)"
              stroke="#16465F"
              strokeWidth="1.2"
            />

            <g clipPath="url(#globeClip)">
              {/* Latitude lines */}
              <g
                fill="none"
                stroke="#3B7791"
                strokeWidth="0.7"
                opacity="0.4"
              >
                <ellipse cx="180" cy="180" rx="132" ry="42" />
                <ellipse cx="180" cy="180" rx="132" ry="85" />
                <ellipse cx="180" cy="180" rx="132" ry="112" />
                <ellipse cx="180" cy="180" rx="55" ry="132" />
                <ellipse cx="180" cy="180" rx="105" ry="132" />
                <ellipse cx="180" cy="180" rx="25" ry="132" />
              </g>

              {/* Stylized land masses */}
              <g fill="#23485A" opacity="0.9">
                <path d="M65 105 L90 84 119 88 135 105 128 124 111 133 107 151 90 151 80 133 63 125Z" />
                <path d="M119 154 L144 166 157 194 151 215 137 236 129 266 114 250 112 221 99 199 103 178Z" />
                <path d="M181 77 L206 67 233 76 249 91 270 101 279 123 263 135 245 127 233 139 213 132 201 114 181 106Z" />
                <path d="M226 145 L255 139 278 157 293 180 281 202 262 212 251 239 231 244 215 222 222 197 210 180Z" />
                <path d="M273 251 L293 247 305 260 294 276 276 280 265 266Z" />
              </g>

              {/* Route arcs */}
              <g
                fill="none"
                stroke="#16BCE7"
                strokeWidth="1.4"
                opacity="0.9"
              >
                <path d="M108 164 Q180 82 263 188" />
                <path d="M108 164 Q194 248 286 217" />
                <path d="M149 230 Q180 170 225 112" />
              </g>

              {/* Route glow */}
              <g fill="#22D3EE" filter="url(#globeGlow)" opacity="0.7">
                <circle cx="108" cy="164" r="5" />
                <circle cx="263" cy="188" r="5" />
                <circle cx="286" cy="217" r="5" />
                <circle cx="225" cy="112" r="5" />
              </g>

              {/* Route nodes */}
              <g fill="#67E8F9" stroke="#0B1724" strokeWidth="2">
                <circle cx="108" cy="164" r="3.5" />
                <circle cx="263" cy="188" r="3.5" />
                <circle cx="286" cy="217" r="3.5" />
                <circle cx="225" cy="112" r="3.5" />
                <circle cx="149" cy="230" r="3.5" />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// USAGE TRENDS
// ============================================================

const UsageTrends = () => {
  const [period, setPeriod] = useState("Month");

  const periods = ["Day", "Week", "Month"];

  const chartData = {
    Day: [0, 0, 0, 0, 0, 0, 0],
    Week: [0, 0, 0, 0, 0, 0, 0],
    Month: [0, 0, 0, 0, 0, 0, 0],
  };

  const values = chartData[period];

  const maxValue = 4;
  const chartWidth = 620;
  const chartHeight = 190;

  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * chartWidth;
      const y = chartHeight - (value / maxValue) * chartHeight;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#101012] p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-zinc-200">
            Usage Trends
          </h3>
          <p className="mt-1 text-xs text-zinc-500">
            {period === "Day"
              ? "Last 24 hours"
              : period === "Week"
                ? "Last 7 days"
                : "Last 30 days"}
          </p>
        </div>

        <div className="flex rounded-lg border border-white/[0.08] bg-[#17171A] p-1">
          {periods.map((item) => (
            <button
              key={item}
              onClick={() => setPeriod(item)}
              className={`rounded-md px-3 py-1.5 text-xs transition-colors ${
                period === item
                  ? "bg-cyan-500/15 font-semibold text-cyan-300"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-hidden">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight + 25}`}
          className="h-[220px] w-full"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((line) => {
            const y = chartHeight - (line / maxValue) * chartHeight;

            return (
              <g key={line}>
                <line
                  x1="0"
                  y1={y}
                  x2={chartWidth}
                  y2={y}
                  stroke="#27272A"
                  strokeWidth="1"
                  strokeDasharray="3 5"
                />
                <text
                  x="0"
                  y={Math.max(10, y - 5)}
                  fill="#71717A"
                  fontSize="10"
                >
                  {line}
                </text>
              </g>
            );
          })}

          {/* Usage line */}
          <polyline
            points={points}
            fill="none"
            stroke="#22D3EE"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={values.some((value) => value > 0) ? 1 : 0.6}
          />

          {/* X-axis labels */}
          {["1", "5", "10", "15", "20", "25", "30"].map(
            (label, index) => (
              <text
                key={label}
                x={(index / 6) * chartWidth}
                y={chartHeight + 20}
                fill="#71717A"
                fontSize="10"
                textAnchor={
                  index === 0
                    ? "start"
                    : index === 6
                      ? "end"
                      : "middle"
                }
              >
                {label}
              </text>
            ),
          )}
        </svg>
      </div>

      <div className="flex items-center gap-2 text-xs text-zinc-500">
        <span className="h-2 w-2 rounded-full bg-cyan-400" />
        Total calls
      </div>
    </div>
  );
};

// ============================================================
// CALL OUTCOMES
// ============================================================

const OutcomeItem = ({ label, value, color, Icon }) => {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#151518] p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-wide text-zinc-500">
          {label}
        </span>

        {Icon && <Icon size={14} className={color} />}
      </div>

      <p className={`text-xl font-semibold ${color}`}>{value}</p>
    </div>
  );
};

const CallOutcomes = () => {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#101012] p-5">
      <div>
        <h3 className="text-sm font-semibold text-zinc-200">
          Call Outcomes
        </h3>
        <p className="mt-1 text-xs text-zinc-500">
          Success vs failed per week
        </p>
      </div>

      <div className="mt-5 flex items-center gap-5">
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="h-full w-full -rotate-90"
          >
            <circle
              cx="50"
              cy="50"
              r="37"
              fill="none"
              stroke="#27272A"
              strokeWidth="10"
            />
            <circle
              cx="50"
              cy="50"
              r="37"
              fill="none"
              stroke="#22D3EE"
              strokeWidth="10"
              strokeDasharray="232.5"
              strokeDashoffset="232.5"
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs font-bold text-zinc-200">0%</span>
            <span className="text-[9px] text-zinc-500">success</span>
          </div>
        </div>

        <div className="grid min-w-0 flex-1 grid-cols-2 gap-2">
          <OutcomeItem label="Total" value="0" color="text-zinc-200" />

          <OutcomeItem
            label="Success"
            value="0"
            color="text-emerald-400"
            Icon={CheckCircle2}
          />

          <OutcomeItem
            label="Failed"
            value="0"
            color="text-red-400"
            Icon={XCircle}
          />

          <OutcomeItem
            label="Outbound"
            value="0"
            color="text-zinc-200"
            Icon={PhoneOutgoing}
          />
        </div>
      </div>
    </div>
  );
};

// ============================================================
// DASHBOARD
// ============================================================

export default function Dashboard() {
  return (
    <div className="min-h-full bg-[#09090B] text-zinc-100">
      <main className="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-7">
        {/* Welcome */}
        <section>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-100 sm:text-[25px]">
              Good Morning, Akshada
            </h1>
            <Info size={15} className="text-zinc-500" />
          </div>

          <p className="mt-2 text-sm text-zinc-500">
            Your agents handled{" "}
            <span className="font-semibold text-zinc-200">0 calls</span>{" "}
            this month with{" "}
            <span className="font-semibold text-emerald-400">
              0.00% success
            </span>
          </p>
        </section>

        {/* Main dashboard grid */}
        <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,1fr)]">
          {/* Left column */}
          <div className="space-y-5">
            {/* Stats */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <StatCard
                icon={Clock3}
                label="Total Minutes"
                value="0"
              />

              <StatCard
                icon={Bot}
                label="Active Agents"
                value="0"
              />

              <StatCard
                icon={PhoneCall}
                label="Live Calls"
                value="0"
                live
                accent
              />

              <StatCard
                icon={Coins}
                label="Credits"
                value="0"
              />

              <StatCard
                icon={Target}
                label="Success Rate"
                value="0.00%"
              />

              <StatCard
                icon={Zap}
                label="Conversion"
                value="0%"
              />
            </div>

            {/* Usage trends */}
            <UsageTrends />
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-5">
            <GlobalReach />

            <CallOutcomes />
          </div>
        </section>
      </main>
    </div>
  );
}