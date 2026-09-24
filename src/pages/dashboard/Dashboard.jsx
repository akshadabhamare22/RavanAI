    import React, { useState } from "react";
    import {
    Clock3,
    Bot,
    PhoneCall,
    Coins,
    Target,
    Zap,
    CheckCircle2,
    XCircle,
    PhoneOutgoing,
    Info,
    Plus,
    Zap as ZapIcon,
    UserPlus,
    Smartphone,
    ChevronRight,
    TrendingUp,
    } from "lucide-react";

    import GlobalReach from "../../components/GlobalReach";

    // ============================================================
    // STAT CARD
    // ============================================================

    const StatCard = ({ icon: Icon, label, value, live = false, accent = false }) => {
    return (
        <div
        className={`
            relative overflow-hidden rounded-2xl border p-4
            transition-all duration-200
            ${
            accent
                ? "border-cyan-400/40 bg-cyan-50/50 dark:border-cyan-400/30 dark:bg-cyan-500/[0.05]"
                : "border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]"
            }
        `}
        >
        <div className="mb-6 flex items-center justify-between">
            <div
            className={`
                flex h-9 w-9 items-center justify-center rounded-lg
                ${
                accent
                    ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400"
                    : "bg-black/[0.04] text-zinc-600 dark:bg-white/[0.05] dark:text-zinc-400"
                }
            `}
            >
            <Icon size={16} strokeWidth={1.8} />
            </div>

            {live && (
            <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                Live
            </div>
            )}
        </div>

        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.1em] text-zinc-500">
            {label}
        </p>

        <div
            className={`text-[22px] font-semibold tracking-tight ${
            accent
                ? "text-cyan-600 dark:text-cyan-400"
                : "text-zinc-900 dark:text-zinc-100"
            }`}
        >
            {value}
        </div>
        </div>
    );
    };

    // ============================================================
    // USAGE TRENDS (matches screenshot — Calls vs Minutes)
    // ============================================================

    const UsageTrends = () => {
    const [period, setPeriod] = useState("Month");

    const periods = ["Day", "Week", "Month"];

    const chartWidth = 700;
    const chartHeight = 160;

    // X-axis labels matching screenshot
    const xLabels = ["Aug 25", "Aug 30", "Sep 4", "Sep 9", "Sep 14", "Sep 19"];

    // Empty flat lines at zero
    const callsPoints = "0,160 700,160";
    const minutesPoints = "0,160 700,160";

    return (
        <div className="rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
            <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
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

            <div className="flex rounded-lg border border-black/[0.08] bg-zinc-50 p-1 dark:border-white/[0.08] dark:bg-[#17171A]">
            {periods.map((item) => (
                <button
                key={item}
                onClick={() => setPeriod(item)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    period === item
                    ? "bg-white font-semibold text-zinc-800 shadow-sm dark:bg-[#25262B] dark:text-cyan-400"
                    : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}
                >
                {item}
                </button>
            ))}
            </div>
        </div>

        {/* Chart */}
        <div className="mt-5">
            <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight + 30}`}
            className="h-[200px] w-full"
            preserveAspectRatio="none"
            >
            {/* Y-axis grid + labels */}
            {[0, 1, 2, 3, 4].map((line) => {
                const y = chartHeight - (line / 4) * chartHeight;
                return (
                <g key={line}>
                    <line
                    x1="40"
                    y1={y}
                    x2={chartWidth}
                    y2={y}
                    stroke="currentColor"
                    className="text-zinc-100 dark:text-zinc-800"
                    strokeWidth="1"
                    />
                    <text
                    x="20"
                    y={y + 4}
                    fill="currentColor"
                    className="text-zinc-400"
                    fontSize="11"
                    textAnchor="middle"
                    >
                    {line}
                    </text>
                </g>
                );
            })}

            {/* Calls line (cyan) */}
            <polyline
                points={callsPoints}
                fill="none"
                stroke="#0EA5E9"
                strokeWidth="1.5"
                strokeLinecap="round"
            />

            {/* Minutes line (yellow/amber) */}
            <polyline
                points={minutesPoints}
                fill="none"
                stroke="#F59E0B"
                strokeWidth="1.5"
                strokeLinecap="round"
            />

            {/* X-axis labels */}
            {xLabels.map((label, index) => (
                <text
                key={label}
                x={40 + (index / (xLabels.length - 1)) * (chartWidth - 40)}
                y={chartHeight + 22}
                fill="currentColor"
                className="text-zinc-400"
                fontSize="11"
                textAnchor={
                    index === 0
                    ? "start"
                    : index === xLabels.length - 1
                        ? "end"
                        : "middle"
                }
                >
                {label}
                </text>
            ))}
            </svg>
        </div>

        {/* Legend */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.05] pt-4 dark:border-white/[0.05]">
            <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
                Calls
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                Minutes
            </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-500">
            <TrendingUp size={13} />
            vs last period
            </div>
        </div>
        </div>
    );
    };

    // ============================================================
    // CALL OUTCOMES
    // ============================================================

    const OutcomeItem = ({ label, value, color, Icon }) => {
    return (
        <div className="rounded-lg border border-black/[0.06] bg-zinc-50/60 p-3 dark:border-white/[0.08] dark:bg-[#151518]">
        <div className="mb-2 flex items-center justify-between">
            <span className="text-[9px] font-medium uppercase tracking-wider text-zinc-500">
            {label}
            </span>
            {Icon && <Icon size={12} className={color} />}
        </div>
        <p className={`text-base font-semibold ${color}`}>{value}</p>
        </div>
    );
    };

    const CallOutcomes = () => {
    return (
        <div className="rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
        <div>
            <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            Call Outcomes
            </h3>
            <p className="mt-1 text-xs text-zinc-500">Success vs failed per week</p>
        </div>

        <div className="mt-5 flex items-start gap-4">
            {/* Donut chart */}
            <div className="relative flex h-[100px] w-[100px] shrink-0 items-center justify-center">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="currentColor"
                className="text-zinc-100 dark:text-zinc-800"
                strokeWidth="9"
                />
                <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#0EA5E9"
                strokeWidth="9"
                strokeDasharray="238.76"
                strokeDashoffset="238.76"
                strokeLinecap="round"
                />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                0%
                </span>
                <span className="text-[9px] uppercase tracking-wider text-zinc-500">
                success
                </span>
            </div>
            </div>

            {/* Outcomes grid */}
            <div className="grid min-w-0 flex-1 grid-cols-2 gap-2">
            <OutcomeItem
                label="Total"
                value="0"
                color="text-zinc-800 dark:text-zinc-200"
            />
            <OutcomeItem
                label="Success"
                value="0"
                color="text-emerald-500"
                Icon={CheckCircle2}
            />
            <OutcomeItem
                label="Failed"
                value="0"
                color="text-red-500"
                Icon={XCircle}
            />
            <OutcomeItem
                label="Outbound"
                value="0"
                color="text-zinc-800 dark:text-zinc-200"
                Icon={PhoneOutgoing}
            />
            </div>
        </div>

        {/* Bottom legend */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.05] pt-4 dark:border-white/[0.05]">
            <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                <span className="h-2.5 w-2.5 rounded-sm bg-cyan-500" />
                Successful
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                <span className="h-2.5 w-2.5 rounded-sm bg-red-500" />
                Failed
            </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-zinc-500">
            <span>
                In{" "}
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                0
                </span>
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            <span>
                Web{" "}
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                0
                </span>
            </span>
            </div>
        </div>
        </div>
    );
    };

    // ============================================================
    // ACTIVE AGENTS
    // ============================================================

    const ActiveAgents = () => {
    return (
        <div className="flex h-full flex-col rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
        <div className="flex items-start justify-between">
            <div>
            <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Active Agents
            </h3>
            <p className="mt-1 text-xs text-zinc-500">0 live</p>
            </div>
            <button className="text-xs font-medium text-zinc-500 transition hover:text-cyan-500">
            View all
            </button>
        </div>

        <div className="mt-6 flex flex-1 items-start">
            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-black/15 py-3.5 text-sm font-medium text-zinc-700 transition hover:border-cyan-400 hover:bg-cyan-50/30 hover:text-cyan-600 dark:border-white/15 dark:text-zinc-300 dark:hover:border-cyan-400 dark:hover:bg-cyan-500/[0.04] dark:hover:text-cyan-400">
            <Plus size={14} />
            Create Agent
            </button>
        </div>
        </div>
    );
    };

    // ============================================================
    // TODAY'S ACTIVITY
    // ============================================================

    const TodaysActivity = () => {
    const chartWidth = 620;
    const chartHeight = 140;

    const xLabels = ["00:00", "03:00", "06:00", "09:00", "12:00"];

    return (
        <div className="rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
        <div>
            <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            Today's Activity
            </h3>
            <p className="mt-1 text-xs text-zinc-500">Call channels per hour</p>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
            <span className="h-0.5 w-4 rounded-full bg-emerald-500" />
            Outbound
            </div>
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
            <span className="h-0.5 w-4 rounded-full bg-cyan-500" />
            Inbound
            </div>
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
            <span className="h-0.5 w-4 rounded-full bg-violet-500" />
            Web
            </div>
        </div>

        {/* Chart */}
        <div className="mt-3">
            <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight + 30}`}
            className="h-[170px] w-full"
            preserveAspectRatio="none"
            >
            {[0, 1, 2, 3, 4].map((line) => {
                const y = chartHeight - (line / 4) * chartHeight;
                return (
                <g key={line}>
                    <line
                    x1="30"
                    y1={y}
                    x2={chartWidth}
                    y2={y}
                    stroke="currentColor"
                    className="text-zinc-100 dark:text-zinc-800"
                    strokeWidth="1"
                    />
                    <text
                    x="15"
                    y={y + 4}
                    fill="currentColor"
                    className="text-zinc-400"
                    fontSize="10"
                    textAnchor="middle"
                    >
                    {line}
                    </text>
                </g>
                );
            })}

            {/* Flat line at zero */}
            <polyline
                points={`30,${chartHeight} ${chartWidth},${chartHeight}`}
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="1.5"
            />

            {/* X labels */}
            {xLabels.map((label, index) => (
                <text
                key={label}
                x={30 + (index / (xLabels.length - 1)) * (chartWidth - 30)}
                y={chartHeight + 22}
                fill="currentColor"
                className="text-zinc-400"
                fontSize="10"
                textAnchor={
                    index === 0
                    ? "start"
                    : index === xLabels.length - 1
                        ? "end"
                        : "middle"
                }
                >
                {label}
                </text>
            ))}
            </svg>
        </div>

        {/* Bottom stats */}
        <div className="mt-3 flex flex-wrap items-center gap-5 border-t border-black/[0.05] pt-4 text-xs text-zinc-500 dark:border-white/[0.05]">
            <div className="flex items-center gap-2">
            <PhoneCall size={12} className="text-emerald-500" />
            <span>Outbound</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                0
            </span>
            </div>
            <div className="flex items-center gap-2">
            <PhoneCall size={12} className="text-cyan-500" />
            <span>Inbound</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                0
            </span>
            </div>
            <div className="flex items-center gap-2">
            <PhoneCall size={12} className="text-violet-500" />
            <span>Web</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                0
            </span>
            </div>
        </div>
        </div>
    );
    };

    // ============================================================
    // TOP COUNTRIES
    // ============================================================

    const TopCountries = () => {
    return (
        <div className="flex h-full flex-col rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Top Countries
        </h3>

        <div className="flex flex-1 flex-col items-center justify-center py-8">
            <p className="text-sm text-zinc-500">No data yet</p>

            <div className="mt-8 w-full">
            <div className="border-b border-black/[0.06] pb-2 dark:border-white/[0.06]">
                <span className="text-[9px] font-medium uppercase tracking-wider text-zinc-500">
                Countries
                </span>
            </div>
            <div className="mt-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-500" />
                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                0
                </span>
            </div>
            </div>
        </div>
        </div>
    );
    };

    // ============================================================
    // QUICK ACTIONS
    // ============================================================

    const QuickActionItem = ({ icon: Icon, title, subtitle }) => {
    return (
        <button className="group flex items-center gap-3 rounded-xl border border-black/[0.06] bg-white p-3.5 text-left transition hover:border-cyan-400/60 hover:bg-cyan-50/30 dark:border-white/[0.08] dark:bg-[#101012] dark:hover:border-cyan-400/40 dark:hover:bg-cyan-500/[0.04]">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black/[0.04] text-zinc-600 transition group-hover:bg-cyan-500/10 group-hover:text-cyan-600 dark:bg-white/[0.05] dark:text-zinc-400 dark:group-hover:text-cyan-400">
            <Icon size={17} strokeWidth={1.7} />
        </div>

        <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            {title}
            </p>
            <p className="mt-0.5 truncate text-xs text-zinc-500">{subtitle}</p>
        </div>

        <ChevronRight
            size={16}
            className="shrink-0 text-zinc-300 transition group-hover:translate-x-0.5 group-hover:text-cyan-500 dark:text-zinc-600 dark:group-hover:text-cyan-400"
        />
        </button>
    );
    };

    const QuickActions = () => {
    return (
        <div className="rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
        <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            Quick Actions
        </h3>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <QuickActionItem
            icon={Bot}
            title="Create Agent"
            subtitle="Build AI assistant"
            />
            <QuickActionItem
            icon={ZapIcon}
            title="New Campaign"
            subtitle="Launch outbound calls"
            />
            <QuickActionItem
            icon={UserPlus}
            title="Add Contact"
            subtitle="Import or create"
            />
            <QuickActionItem
            icon={Smartphone}
            title="Add Number"
            subtitle="Provision number"
            />
        </div>
        </div>
    );
    };

    // ============================================================
    // DASHBOARD
    // ============================================================

    export default function Dashboard() {
    return (
        <div className="min-h-full bg-zinc-50 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
        <main className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-7">
            {/* Welcome */}
            <section>
            <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-[22px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
                Good Afternoon, Agni
                </h1>
                <Info size={15} className="text-zinc-400" />
            </div>

            <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-500">
                Your agents handled{" "}
                <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                0 calls
                </span>{" "}
                this month with{" "}
                <span className="font-semibold text-emerald-500 dark:text-emerald-400">
                0.00% success
                </span>
            </p>
            </section>

            {/* Top Section: Stats (left) + Global Reach (right) */}
            <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,1fr)]">
            {/* LEFT: Stats grid */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard icon={Clock3} label="Total Minutes" value="0" />
                <StatCard icon={Bot} label="Active Agents" value="1" />
                <StatCard
                icon={PhoneCall}
                label="Live Calls"
                value="0"
                live
                accent
                />
                <StatCard icon={Coins} label="Credits" value="0" />
                <StatCard icon={Target} label="Success Rate" value="0.00%" />
                <StatCard icon={Zap} label="Conversion" value="0%" />
            </div>

            {/* RIGHT: Global Reach */}
            <GlobalReach />
            </section>

            {/* Row: Usage Trends + Call Outcomes */}
            <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,1fr)]">
            <UsageTrends />
            <CallOutcomes />
            </section>

            {/* Row: Active Agents + Today's Activity + Top Countries */}
            <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)_minmax(0,0.9fr)]">
            <ActiveAgents />
            <TodaysActivity />
            <TopCountries />
            </section>

            {/* Row: Quick Actions */}
            <section>
            <QuickActions />
            </section>
        </main>
        </div>
    );
    }