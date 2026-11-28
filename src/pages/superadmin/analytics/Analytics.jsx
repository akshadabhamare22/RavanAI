
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Globe2,
  Loader2,
  MessageSquare,
  Phone,
  RefreshCw,
  ShieldCheck,
  Users,
  Wallet,
  XCircle,
} from "lucide-react";

import Config from "../../../config/Config";

const getToken = () => {
  const directToken = localStorage.getItem("access_token");
  if (directToken) return directToken;

  try {
    const auth = JSON.parse(localStorage.getItem("ravanai_auth") || "{}");
    return auth.access_token || auth.token || "";
  } catch {
    return "";
  }
};

const formatNumber = (value, decimals = 0) => {
  const number = Number(value);
  if (!Number.isFinite(number)) return "0";

  return number.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

const formatPercent = (value) => `${formatNumber(value, 1)}%`;

const formatDateLabel = (value) => {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
};

const getErrorMessage = (data, fallback) => {
  if (typeof data?.detail === "string") return data.detail;

  if (Array.isArray(data?.detail)) {
    return data.detail.map((item) => item.msg || "Validation error").join(", ");
  }

  return data?.message || data?.error || fallback;
};

const buildDateParams = (from, to) => {
  const params = new URLSearchParams();

  if (from) params.set("from", `${from}T00:00:00Z`);
  if (to) params.set("to", `${to}T23:59:59Z`);

  return params;
};

const getDefaultDates = () => {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - 29);

  const toInputDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return {
    from: toInputDate(start),
    to: toInputDate(today),
  };
};

const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-zinc-800 dark:bg-[#111315] ${className}`}
  >
    {children}
  </div>
);

const SectionTitle = ({ icon: Icon, title, subtitle, action }) => (
  <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
    <div>
      <div className="flex items-center gap-2">
        {Icon && <Icon size={18} className="text-[#275982]" />}
        <h2 className="text-base font-semibold">{title}</h2>
      </div>
      {subtitle && (
        <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
          {subtitle}
        </p>
      )}
    </div>
    {action}
  </div>
);

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconClass = "bg-[#275982]/10 text-[#275982]",
  loading = false,
}) => (
  <Card>
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-sm text-slate-500 dark:text-zinc-400">{title}</p>
        {loading ? (
          <div className="mt-3 h-8 w-24 animate-pulse rounded bg-slate-200 dark:bg-zinc-800" />
        ) : (
          <p className="mt-2 break-words text-2xl font-bold tabular-nums">
            {value}
          </p>
        )}
        {subtitle && (
          <p className="mt-2 text-xs text-slate-400 dark:text-zinc-500">
            {subtitle}
          </p>
        )}
      </div>
      <div className={`shrink-0 rounded-xl p-3 ${iconClass}`}>
        <Icon size={21} />
      </div>
    </div>
  </Card>
);

const EmptyState = ({ message = "No data available for this period." }) => (
  <div className="flex min-h-[150px] flex-col items-center justify-center text-center">
    <BarChart3 size={28} className="text-slate-300 dark:text-zinc-600" />
    <p className="mt-3 text-sm text-slate-500 dark:text-zinc-400">{message}</p>
  </div>
);

const ErrorMessage = ({ message, onRetry }) => (
  <div className="flex flex-col gap-3 rounded-lg border border-red-500/20 bg-red-500/5 p-4 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex items-start gap-2">
      <AlertCircle size={17} className="mt-0.5 shrink-0 text-red-500" />
      <p className="text-sm text-red-500">{message}</p>
    </div>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="text-sm font-semibold text-[#275982]"
      >
        Retry
      </button>
    )}
  </div>
);

const HorizontalBar = ({ label, value, max, suffix = "", color = "bg-[#275982]" }) => {
  const numericValue = Number(value) || 0;
  const percentage = max > 0 ? Math.max(0, (numericValue / max) * 100) : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="truncate text-slate-600 dark:text-zinc-300">
          {label}
        </span>
        <span className="shrink-0 font-semibold tabular-nums">
          {formatNumber(numericValue, 1)}
          {suffix}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-[#191C1F]">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const Analytics = () => {
  const initialDates = useMemo(() => getDefaultDates(), []);

  const [platformStats, setPlatformStats] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState("");

  const [overview, setOverview] = useState(null);
  const [timeseries, setTimeseries] = useState([]);
  const [sentiment, setSentiment] = useState(null);
  const [channels, setChannels] = useState([]);
  const [countries, setCountries] = useState([]);
  const [agents, setAgents] = useState([]);

  const [fromDate, setFromDate] = useState(initialDates.from);
  const [toDate, setToDate] = useState(initialDates.to);

  const [platformLoading, setPlatformLoading] = useState(true);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [platformError, setPlatformError] = useState("");
  const [organizationError, setOrganizationError] = useState("");
  const [analyticsError, setAnalyticsError] = useState("");

  const token = getToken();

  const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#275982] focus:ring-2 focus:ring-[#275982]/20 dark:border-zinc-700 dark:bg-[#111315] dark:text-zinc-100";

  const selectedOrganization = useMemo(
    () => organizations.find((org) => org.id === selectedOrg),
    [organizations, selectedOrg]
  );

  const requestJson = useCallback(
    async (path, signal) => {
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      const response = await fetch(`${Config.BASE_URL}${path}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        signal,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          getErrorMessage(data, `Request failed (${response.status})`)
        );
      }

      return data;
    },
    [token]
  );

  // Platform-wide statistics and organization list.
  const fetchPlatformData = useCallback(
    async (signal) => {
      setPlatformLoading(true);
      setPlatformError("");
      setOrganizationError("");

      const [statsResult, orgsResult] = await Promise.allSettled([
        requestJson("/admin/stats", signal),
        requestJson("/admin/organizations?limit=200&offset=0", signal),
      ]);

      if (signal?.aborted) return;

      if (statsResult.status === "fulfilled") {
        setPlatformStats(statsResult.value);
      } else {
        setPlatformStats(null);
        setPlatformError(
          statsResult.reason?.message || "Unable to load platform statistics."
        );
      }

      if (orgsResult.status === "fulfilled") {
        const items = Array.isArray(orgsResult.value?.items)
          ? orgsResult.value.items
          : [];

        setOrganizations(items);

        setSelectedOrg((current) => {
          if (current && items.some((org) => org.id === current)) {
            return current;
          }
          return items[0]?.id || "";
        });
      } else {
        setOrganizations([]);
        setSelectedOrg("");
        setOrganizationError(
          orgsResult.reason?.message || "Unable to load organizations."
        );
      }

      setPlatformLoading(false);
    },
    [requestJson]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchPlatformData(controller.signal);

    return () => controller.abort();
  }, [fetchPlatformData]);

  // Organization-scoped analytics. Superadmin must pass client_id.
  const fetchOrganizationAnalytics = useCallback(
    async (signal) => {
      if (!selectedOrg) {
        setOverview(null);
        setTimeseries([]);
        setSentiment(null);
        setChannels([]);
        setCountries([]);
        setAgents([]);
        setAnalyticsLoading(false);
        return;
      }

      setAnalyticsLoading(true);
      setAnalyticsError("");

      const dateParams = buildDateParams(fromDate, toDate);
      const baseParams = new URLSearchParams(dateParams);
      baseParams.set("client_id", selectedOrg);

      const timeseriesParams = new URLSearchParams(baseParams);
      timeseriesParams.set("granularity", "day");

      const countryParams = new URLSearchParams(baseParams);
      countryParams.set("limit", "10");

      const channelParams = new URLSearchParams();
      channelParams.set("client_id", selectedOrg);

      const endpoints = [
        `/analytics/overview?${baseParams.toString()}`,
        `/analytics/timeseries?${timeseriesParams.toString()}`,
        `/analytics/sentiment?${baseParams.toString()}`,
        `/analytics/channels-by-hour?${channelParams.toString()}`,
        `/analytics/top-countries?${countryParams.toString()}`,
        `/analytics/agents?${baseParams.toString()}`,
      ];

      const results = await Promise.allSettled(
        endpoints.map((endpoint) => requestJson(endpoint, signal))
      );

      if (signal?.aborted) return;

      const errors = [];

      if (results[0].status === "fulfilled") {
        setOverview(results[0].value);
      } else {
        setOverview(null);
        errors.push(`Overview: ${results[0].reason?.message || "Failed"}`);
      }

      if (results[1].status === "fulfilled") {
        setTimeseries(
          Array.isArray(results[1].value) ? results[1].value : []
        );
      } else {
        setTimeseries([]);
        errors.push(`Call trends: ${results[1].reason?.message || "Failed"}`);
      }

      if (results[2].status === "fulfilled") {
        setSentiment(results[2].value);
      } else {
        setSentiment(null);
        errors.push(`Sentiment: ${results[2].reason?.message || "Failed"}`);
      }

      if (results[3].status === "fulfilled") {
        setChannels(
          Array.isArray(results[3].value) ? results[3].value : []
        );
      } else {
        setChannels([]);
        errors.push(`Channels: ${results[3].reason?.message || "Failed"}`);
      }

      if (results[4].status === "fulfilled") {
        setCountries(
          Array.isArray(results[4].value) ? results[4].value : []
        );
      } else {
        setCountries([]);
        errors.push(`Countries: ${results[4].reason?.message || "Failed"}`);
      }

      if (results[5].status === "fulfilled") {
        setAgents(Array.isArray(results[5].value) ? results[5].value : []);
      } else {
        setAgents([]);
        errors.push(`Agents: ${results[5].reason?.message || "Failed"}`);
      }

      setAnalyticsError(errors.join(" | "));
      setAnalyticsLoading(false);
    },
    [selectedOrg, fromDate, toDate, requestJson]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchOrganizationAnalytics(controller.signal);

    return () => controller.abort();
  }, [fetchOrganizationAnalytics]);

  const handleRefresh = async () => {
    setRefreshing(true);

    try {
      const controller = new AbortController();
      await fetchPlatformData(controller.signal);

      // Organization analytics refresh automatically when the selected
      // organization changes. If it remains the same, refresh it directly.
      if (selectedOrg) {
        await fetchOrganizationAnalytics();
      }
    } finally {
      setRefreshing(false);
    }
  };

  const handleApplyDates = () => {
    if (!fromDate || !toDate) {
      setAnalyticsError("Please select both start date and end date.");
      return;
    }

    if (fromDate > toDate) {
      setAnalyticsError("Start date cannot be later than end date.");
      return;
    }

    setAnalyticsError("");
    fetchOrganizationAnalytics();
  };

  const maxTrendCalls = Math.max(
    1,
    ...timeseries.map((item) => Number(item.calls) || 0)
  );

  const maxCountryCalls = Math.max(
    1,
    ...countries.map((item) => Number(item.calls) || 0)
  );

  const maxAgentCalls = Math.max(
    1,
    ...agents.map((item) => Number(item.calls) || 0)
  );

  const maxChannelCalls = Math.max(
    1,
    ...channels.map(
      (item) =>
        (Number(item.inbound) || 0) +
        (Number(item.outbound) || 0) +
        (Number(item.web) || 0)
    )
  );

  const sentimentTotal =
    (Number(sentiment?.positive) || 0) +
    (Number(sentiment?.neutral) || 0) +
    (Number(sentiment?.negative) || 0);

  const cardGrid = [
    {
      title: "Total Organizations",
      value: formatNumber(platformStats?.organizations_total),
      icon: Building2,
      subtitle: "Registered on the platform",
      iconClass: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Active Organizations",
      value: formatNumber(platformStats?.organizations_active),
      icon: CheckCircle2,
      subtitle: "Currently active",
      iconClass: "bg-emerald-500/10 text-emerald-500",
    },
    {
      title: "Suspended Organizations",
      value: formatNumber(platformStats?.organizations_suspended),
      icon: XCircle,
      subtitle: "Currently suspended",
      iconClass: "bg-red-500/10 text-red-500",
    },
    {
      title: "Total Users",
      value: formatNumber(platformStats?.users_total),
      icon: Users,
      subtitle: "Across all organizations",
      iconClass: "bg-purple-500/10 text-purple-500",
    },
    {
      title: "Total Agents",
      value: formatNumber(platformStats?.agents_total),
      icon: Activity,
      subtitle: "Across all organizations",
      iconClass: "bg-cyan-500/10 text-cyan-500",
    },
    {
      title: "Calls · Last 30 Days",
      value: formatNumber(platformStats?.calls_30d),
      icon: Phone,
      subtitle: "Platform-wide call volume",
      iconClass: "bg-[#275982]/10 text-[#275982]",
    },
    {
      title: "Minutes · Last 30 Days",
      value: formatNumber(platformStats?.minutes_30d, 2),
      icon: Clock3,
      subtitle: "Total call duration",
      iconClass: "bg-amber-500/10 text-amber-500",
    },
    {
      title: "Credits Spent · Last 30 Days",
      value: formatNumber(platformStats?.credits_spent_30d, 2),
      icon: Wallet,
      subtitle: "Platform-wide usage credits",
      iconClass: "bg-orange-500/10 text-orange-500",
    },
    {
      title: "Active Calls Now",
      value: formatNumber(platformStats?.active_calls_now),
      icon: Activity,
      subtitle: "Currently in progress",
      iconClass: "bg-green-500/10 text-green-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-900 transition-colors duration-300 sm:p-6 dark:bg-[#08090B] dark:text-zinc-100">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500 dark:text-zinc-400">
              <span>Superadmin</span>
              <span>/</span>
              <span className="text-[#275982]">Platform Analytics</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Platform Analytics
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
              Monitor platform growth, usage, calls, and organization
              performance.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing || platformLoading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#275982] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#1f496b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={refreshing ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        {/* Platform-wide stats */}
        <div>
          <SectionTitle
            icon={ShieldCheck}
            title="Platform Overview"
            subtitle="Platform-wide statistics returned by the Superadmin stats API."
          />

          {platformError && (
            <div className="mb-4">
              <ErrorMessage
                message={platformError}
                onRetry={() => {
                  const controller = new AbortController();
                  fetchPlatformData(controller.signal);
                }}
              />
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {cardGrid.map((item) => (
              <StatCard
                key={item.title}
                {...item}
                loading={platformLoading}
              />
            ))}
          </div>
        </div>

        {/* Organization analytics filters */}
        <Card>
          <SectionTitle
            icon={Building2}
            title="Organization Analytics"
            subtitle="Detailed analytics are scoped to the selected organization."
          />

          {organizationError && (
            <ErrorMessage
              message={organizationError}
              onRetry={() => {
                const controller = new AbortController();
                fetchPlatformData(controller.signal);
              }}
            />
          )}

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <label className="mb-2 block text-xs font-medium text-slate-500 dark:text-zinc-400">
                Select Organization
              </label>
              <select
                value={selectedOrg}
                onChange={(event) => setSelectedOrg(event.target.value)}
                disabled={platformLoading || organizations.length === 0}
                className={inputClass}
              >
                {organizations.length === 0 ? (
                  <option value="">No organizations available</option>
                ) : (
                  organizations.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.name || "Unnamed organization"}
                      {org.email ? ` — ${org.email}` : ""}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-slate-500 dark:text-zinc-400">
                From
              </label>
              <input
                type="date"
                value={fromDate}
                max={toDate || undefined}
                onChange={(event) => setFromDate(event.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-slate-500 dark:text-zinc-400">
                To
              </label>
              <input
                type="date"
                value={toDate}
                min={fromDate || undefined}
                onChange={(event) => setToDate(event.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              {selectedOrganization
                ? `Selected: ${selectedOrganization.name}`
                : "Select an organization to view detailed analytics."}
            </p>

            <button
              type="button"
              onClick={handleApplyDates}
              disabled={!selectedOrg || analyticsLoading}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#275982] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1f496b] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CalendarDays size={16} />
              Apply Date Range
            </button>
          </div>
        </Card>

        {analyticsError && (
          <ErrorMessage
            message={analyticsError}
            onRetry={() => fetchOrganizationAnalytics()}
          />
        )}

        {!selectedOrg && !platformLoading && (
          <Card>
            <EmptyState message="Select an organization to load detailed analytics." />
          </Card>
        )}

        {selectedOrg && (
          <>
            {/* Selected organization overview */}
            <div>
              <SectionTitle
                icon={BarChart3}
                title="Call Performance"
                subtitle="Analytics for the selected organization and date range."
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                  title="Total Calls"
                  value={formatNumber(overview?.total_calls)}
                  icon={Phone}
                  subtitle="Calls in selected date range"
                  loading={analyticsLoading && !overview}
                />
                <StatCard
                  title="Completed Calls"
                  value={formatNumber(overview?.completed)}
                  icon={CheckCircle2}
                  iconClass="bg-emerald-500/10 text-emerald-500"
                  subtitle="Successfully completed"
                  loading={analyticsLoading && !overview}
                />
                <StatCard
                  title="Failed Calls"
                  value={formatNumber(overview?.failed)}
                  icon={XCircle}
                  iconClass="bg-red-500/10 text-red-500"
                  subtitle="Failed call attempts"
                  loading={analyticsLoading && !overview}
                />
                <StatCard
                  title="In Progress"
                  value={formatNumber(overview?.in_progress)}
                  icon={Activity}
                  iconClass="bg-amber-500/10 text-amber-500"
                  subtitle="Calls currently in progress"
                  loading={analyticsLoading && !overview}
                />
                <StatCard
                  title="Success Rate"
                  value={formatPercent(overview?.success_rate)}
                  icon={CheckCircle2}
                  iconClass="bg-emerald-500/10 text-emerald-500"
                  subtitle="Completed / finished calls"
                  loading={analyticsLoading && !overview}
                />
                <StatCard
                  title="Total Minutes"
                  value={formatNumber(overview?.total_minutes, 2)}
                  icon={Clock3}
                  subtitle="Total call duration"
                  loading={analyticsLoading && !overview}
                />
                <StatCard
                  title="Conversion Rate"
                  value={formatPercent(overview?.conversion_rate)}
                  icon={ArrowUpRight}
                  iconClass="bg-purple-500/10 text-purple-500"
                  subtitle={`${formatNumber(overview?.converted)} converted calls`}
                  loading={analyticsLoading && !overview}
                />
                <StatCard
                  title="Credits Spent"
                  value={formatNumber(overview?.credits_spent, 2)}
                  icon={Wallet}
                  iconClass="bg-orange-500/10 text-orange-500"
                  subtitle="Usage credits in selected period"
                  loading={analyticsLoading && !overview}
                />
              </div>
            </div>

            {/* Call trends and outcomes */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
              <Card className="xl:col-span-2">
                <SectionTitle
                  icon={BarChart3}
                  title="Call Volume Trends"
                  subtitle="Daily calls returned by the analytics timeseries API."
                />

                {analyticsLoading && timeseries.length === 0 ? (
                  <div className="flex min-h-[220px] items-center justify-center">
                    <Loader2 className="animate-spin text-[#275982]" />
                  </div>
                ) : timeseries.length === 0 ? (
                  <EmptyState />
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-end gap-2 overflow-x-auto pb-2">
                      {timeseries.map((item) => {
                        const calls = Number(item.calls) || 0;
                        const height = Math.max(
                          calls > 0 ? 5 : 0,
                          (calls / maxTrendCalls) * 150
                        );

                        return (
                          <div
                            key={item.bucket}
                            className="flex min-w-[35px] flex-1 flex-col items-center gap-2"
                            title={`${item.bucket}: ${calls} calls`}
                          >
                            <span className="text-[10px] font-medium text-slate-500 dark:text-zinc-400">
                              {formatNumber(calls)}
                            </span>
                            <div className="flex h-[155px] w-full items-end justify-center rounded-t-md bg-slate-50 dark:bg-[#191C1F]">
                              <div
                                className="w-full max-w-[30px] rounded-t-md bg-[#275982] transition-all"
                                style={{ height: `${height}px` }}
                              />
                            </div>
                            <span className="text-[10px] text-slate-400 dark:text-zinc-500">
                              {formatDateLabel(item.bucket)}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex flex-wrap gap-5 border-t border-slate-100 pt-4 text-xs dark:border-zinc-800">
                      <span className="flex items-center gap-2 text-slate-500 dark:text-zinc-400">
                        <span className="h-2.5 w-2.5 rounded-sm bg-[#275982]" />
                        Calls
                      </span>
                      <span className="text-slate-500 dark:text-zinc-400">
                        Total minutes:{" "}
                        <strong className="text-slate-800 dark:text-zinc-200">
                          {formatNumber(
                            timeseries.reduce(
                              (sum, item) => sum + (Number(item.minutes) || 0),
                              0
                            ),
                            2
                          )}
                        </strong>
                      </span>
                    </div>
                  </div>
                )}
              </Card>

              <Card>
                <SectionTitle
                  icon={Activity}
                  title="Call Outcomes"
                  subtitle="Completed and failed calls."
                />

                {analyticsLoading && !overview ? (
                  <div className="flex min-h-[180px] items-center justify-center">
                    <Loader2 className="animate-spin text-[#275982]" />
                  </div>
                ) : !overview ? (
                  <EmptyState />
                ) : (
                  <div className="space-y-5">
                    <div>
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="text-slate-500 dark:text-zinc-400">
                          Completed
                        </span>
                        <strong className="text-emerald-500">
                          {formatNumber(overview.completed)}
                        </strong>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-[#191C1F]">
                        <div
                          className="h-full rounded-full bg-emerald-500"
                          style={{
                            width: `${
                              overview.total_calls > 0
                                ? (overview.completed / overview.total_calls) *
                                  100
                                : 0
                            }%`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="text-slate-500 dark:text-zinc-400">
                          Failed
                        </span>
                        <strong className="text-red-500">
                          {formatNumber(overview.failed)}
                        </strong>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-[#191C1F]">
                        <div
                          className="h-full rounded-full bg-red-500"
                          style={{
                            width: `${
                              overview.total_calls > 0
                                ? (overview.failed / overview.total_calls) *
                                  100
                                : 0
                            }%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 dark:border-zinc-800">
                      <div>
                        <p className="text-xs text-slate-500 dark:text-zinc-400">
                          Average Duration
                        </p>
                        <p className="mt-1 text-lg font-bold">
                          {formatNumber(overview.avg_duration_seconds, 1)}s
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 dark:text-zinc-400">
                          Conversion
                        </p>
                        <p className="mt-1 text-lg font-bold">
                          {formatPercent(overview.conversion_rate)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </div>

            {/* Sentiment and channels */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
              <Card>
                <SectionTitle
                  icon={MessageSquare}
                  title="Call Sentiment"
                  subtitle="Sentiment distribution returned by the sentiment API."
                />

                {analyticsLoading && !sentiment ? (
                  <div className="flex min-h-[160px] items-center justify-center">
                    <Loader2 className="animate-spin text-[#275982]" />
                  </div>
                ) : !sentiment || sentimentTotal === 0 ? (
                  <EmptyState message="No sentiment records available." />
                ) : (
                  <div className="space-y-5">
                    <div className="flex h-4 overflow-hidden rounded-full bg-slate-100 dark:bg-[#191C1F]">
                      <div
                        className="bg-emerald-500"
                        style={{
                          width: `${
                            (sentiment.positive / sentimentTotal) * 100
                          }%`,
                        }}
                      />
                      <div
                        className="bg-amber-400"
                        style={{
                          width: `${
                            (sentiment.neutral / sentimentTotal) * 100
                          }%`,
                        }}
                      />
                      <div
                        className="bg-red-500"
                        style={{
                          width: `${
                            (sentiment.negative / sentimentTotal) * 100
                          }%`,
                        }}
                      />
                    </div>

                    {[
                      {
                        label: "Positive",
                        value: sentiment.positive,
                        color: "bg-emerald-500",
                      },
                      {
                        label: "Neutral",
                        value: sentiment.neutral,
                        color: "bg-amber-400",
                      },
                      {
                        label: "Negative",
                        value: sentiment.negative,
                        color: "bg-red-500",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2.5 w-2.5 rounded-full ${item.color}`}
                          />
                          <span className="text-sm text-slate-600 dark:text-zinc-300">
                            {item.label}
                          </span>
                        </div>
                        <div className="text-right">
                          <strong className="text-sm">
                            {formatNumber(item.value)}
                          </strong>
                          <span className="ml-2 text-xs text-slate-400">
                            {formatPercent(
                              (Number(item.value) / sentimentTotal) * 100
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              <Card>
                <SectionTitle
                  icon={Phone}
                  title="Channel Distribution"
                  subtitle="Inbound, outbound, and web calls by hour for today."
                />

                {analyticsLoading && channels.length === 0 ? (
                  <div className="flex min-h-[160px] items-center justify-center">
                    <Loader2 className="animate-spin text-[#275982]" />
                  </div>
                ) : channels.length === 0 ? (
                  <EmptyState message="No channel activity available for today." />
                ) : (
                  <>
                    <div className="mb-4 flex flex-wrap gap-4 text-xs text-slate-500 dark:text-zinc-400">
                      <span className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-sm bg-[#275982]" />
                        Inbound
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" />
                        Outbound
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-sm bg-amber-400" />
                        Web
                      </span>
                    </div>

                    <div className="space-y-3">
                      {channels
                        .filter((item) => {
                          const hourTotal =
                            Number(item.inbound) +
                            Number(item.outbound) +
                            Number(item.web);
                          return hourTotal > 0;
                        })
                        .map((item) => {
                          const inbound = Number(item.inbound) || 0;
                          const outbound = Number(item.outbound) || 0;
                          const web = Number(item.web) || 0;

                          return (
                            <div
                              key={item.hour}
                              className="grid grid-cols-[55px_1fr_35px] items-center gap-3"
                            >
                              <span className="text-xs text-slate-500 dark:text-zinc-400">
                                {String(item.hour).padStart(2, "0")}:00
                              </span>

                              <div className="flex h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-[#191C1F]">
                                <div
                                  className="bg-[#275982]"
                                  style={{
                                    width: `${
                                      (inbound / maxChannelCalls) * 100
                                    }%`,
                                  }}
                                />
                                <div
                                  className="bg-emerald-500"
                                  style={{
                                    width: `${
                                      (outbound / maxChannelCalls) * 100
                                    }%`,
                                  }}
                                />
                                <div
                                  className="bg-amber-400"
                                  style={{
                                    width: `${(web / maxChannelCalls) * 100}%`,
                                  }}
                                />
                              </div>

                              <span className="text-right text-xs font-semibold tabular-nums">
                                {inbound + outbound + web}
                              </span>
                            </div>
                          );
                        })}

                      {channels.every(
                        (item) =>
                          !item.inbound && !item.outbound && !item.web
                      ) && <EmptyState message="No calls recorded today." />}
                    </div>
                  </>
                )}
              </Card>
            </div>

            {/* Countries and agent performance */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
              <Card>
                <SectionTitle
                  icon={Globe2}
                  title="Top Countries"
                  subtitle="Phone call distribution by detected country."
                />

                {analyticsLoading && countries.length === 0 ? (
                  <div className="flex min-h-[150px] items-center justify-center">
                    <Loader2 className="animate-spin text-[#275982]" />
                  </div>
                ) : countries.length === 0 ? (
                  <EmptyState message="No country data available for this period." />
                ) : (
                  <div className="space-y-4">
                    {countries.map((item, index) => (
                      <HorizontalBar
                        key={item.country}
                        label={`${index + 1}. ${item.country}`}
                        value={item.calls}
                        max={maxCountryCalls}
                        color="bg-[#275982]"
                      />
                    ))}
                  </div>
                )}
              </Card>

              <Card>
                <SectionTitle
                  icon={Users}
                  title="Agent Performance"
                  subtitle="Call volume, success rate, and minutes per agent."
                />

                {analyticsLoading && agents.length === 0 ? (
                  <div className="flex min-h-[150px] items-center justify-center">
                    <Loader2 className="animate-spin text-[#275982]" />
                  </div>
                ) : agents.length === 0 ? (
                  <EmptyState message="No agent performance data available." />
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[420px] text-left">
                      <thead>
                        <tr className="bg-slate-100 text-xs text-slate-500 dark:bg-[#191C1F] dark:text-zinc-400">
                          <th className="rounded-l-lg px-3 py-3 font-semibold">
                            Agent
                          </th>
                          <th className="px-3 py-3 font-semibold">Calls</th>
                          <th className="px-3 py-3 font-semibold">Success</th>
                          <th className="rounded-r-lg px-3 py-3 font-semibold">
                            Minutes
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                        {agents.map((agent) => (
                          <tr key={agent.agent_id}>
                            <td className="px-3 py-3">
                              <p className="max-w-[160px] truncate text-sm font-semibold">
                                {agent.agent_name}
                              </p>
                              <p className="mt-1 max-w-[160px] truncate text-[10px] text-slate-400">
                                {agent.agent_id}
                              </p>
                            </td>
                            <td className="px-3 py-3 text-sm font-semibold tabular-nums">
                              {formatNumber(agent.calls)}
                            </td>
                            <td className="px-3 py-3 text-sm font-semibold text-emerald-500">
                              {formatPercent(agent.success_rate)}
                            </td>
                            <td className="px-3 py-3 text-sm tabular-nums">
                              {formatNumber(agent.minutes, 2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card>
            </div>

            {/* Direction summary */}
            {overview && (
              <Card>
                <SectionTitle
                  icon={Activity}
                  title="Call Channel Summary"
                  subtitle="Call direction and web channel totals for the selected period."
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-zinc-800 dark:bg-[#191C1F]">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-zinc-400">
                      <ArrowDownRight size={17} className="text-emerald-500" />
                      Inbound Calls
                    </div>
                    <p className="mt-2 text-2xl font-bold">
                      {formatNumber(overview.inbound)}
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-zinc-800 dark:bg-[#191C1F]">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-zinc-400">
                      <ArrowUpRight size={17} className="text-[#275982]" />
                      Outbound Calls
                    </div>
                    <p className="mt-2 text-2xl font-bold">
                      {formatNumber(overview.outbound)}
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-zinc-800 dark:bg-[#191C1F]">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-zinc-400">
                      <Globe2 size={17} className="text-purple-500" />
                      Web Calls
                    </div>
                    <p className="mt-2 text-2xl font-bold">
                      {formatNumber(overview.web)}
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </>
        )}

        <p className="text-center text-xs text-slate-400 dark:text-zinc-600">
          Platform statistics are global. Detailed analytics are limited to the
          selected organization.
        </p>
      </div>
    </div>
  );
};

export default Analytics;
