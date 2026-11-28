
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Config from "../../config/Config";

import {
  Building2,
  Users,
  Bot,
  PhoneCall,
  Clock3,
  Coins,
  Activity,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw,
  ChevronRight,
  TrendingUp,
  LayoutDashboard,
  ShieldCheck,
  CalendarDays,
} from "lucide-react";

// ============================================================
// HELPERS
// ============================================================

const num = (value) => {
  const result = Number(value);
  return Number.isFinite(result) ? result : null;
};

const formatNumber = (value) => {
  const parsed = num(value);

  return parsed === null
    ? "—"
    : parsed.toLocaleString("en-IN");
};

const formatMinutes = (value) => {
  const parsed = num(value);

  return parsed === null
    ? "—"
    : parsed.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      });
};

const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  if (hour >= 17 && hour < 21) return "Good Evening";

  return "Good Night";
};

const getStoredToken = () => {
  try {
    const authData = JSON.parse(
      localStorage.getItem("ravanai_auth") || "{}"
    );

    return (
      localStorage.getItem("access_token") ||
      authData?.token ||
      ""
    );
  } catch {
    return localStorage.getItem("access_token") || "";
  }
};

const getApiError = (
  data,
  fallback = "Unable to load data."
) => {
  if (Array.isArray(data?.detail)) {
    return data.detail
      .map(
        (item) =>
          item?.msg ||
          item?.message ||
          String(item)
      )
      .join(", ");
  }

  if (typeof data?.detail === "string") {
    return data.detail;
  }

  if (typeof data?.message === "string") {
    return data.message;
  }

  if (typeof data?.error === "string") {
    return data.error;
  }

  return fallback;
};

// ============================================================
// API HELPER
// ============================================================

const apiRequest = async (endpoint, options = {}) => {
  const token = getStoredToken();

  const headers = {
    Accept: "application/json",
    ...(options.body
      ? { "Content-Type": "application/json" }
      : {}),
    ...(token
      ? { Authorization: `Bearer ${token}` }
      : {}),
    ...options.headers,
  };

  const response = await fetch(
    `${Config.BASE_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      getApiError(
        data,
        `Request failed (${response.status})`
      )
    );
  }

  return data;
};

// ============================================================
// STYLES
// ============================================================

const CARD = `
  rounded-xl border border-black/[0.07] bg-white
  transition-colors duration-300
  hover:border-cyan-400/30
  dark:border-white/[0.07] dark:bg-[#0C0D10]
  dark:hover:border-cyan-400/20
`;

const LABEL =
  "text-[10px] font-medium uppercase tracking-[0.08em] text-zinc-500";

const MONO = "font-mono tabular-nums";

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.07,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ============================================================
// LOADING / ERROR
// ============================================================

const SectionMessage = ({
  message = "No data available.",
}) => (
  <div className="flex min-h-[110px] items-center justify-center text-center text-[13px] text-zinc-500">
    {message}
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="rounded-lg border border-red-500/20 bg-red-500/[0.05] p-3 text-xs text-red-500">
    {message}
  </div>
);

// ============================================================
// STAT CARD
// ============================================================

const StatCard = ({
  icon: Icon,
  label,
  value,
  description,
  accent = false,
}) => (
  <motion.div
    variants={sectionVariants}
    className={`${CARD} relative overflow-hidden p-4`}
  >
    <div className="mb-4 flex items-center justify-between">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-lg ${
          accent
            ? "bg-cyan-500/10 text-cyan-500"
            : "bg-zinc-100 text-zinc-500 dark:bg-white/[0.06] dark:text-zinc-400"
        }`}
      >
        <Icon size={16} strokeWidth={1.8} />
      </div>
    </div>

    <p className={LABEL}>{label}</p>

    <p className={`${MONO} mt-2 text-[23px] font-bold leading-none text-zinc-900 dark:text-zinc-100`}>
      {value}
    </p>

    {description && (
      <p className="mt-2 text-[11px] text-zinc-500">
        {description}
      </p>
    )}
  </motion.div>
);

// ============================================================
// PLATFORM USAGE CHART
// ============================================================

const UsageTrends = ({ points, loading }) => {
  const validPoints = Array.isArray(points)
    ? points
    : [];

  const maxMinutes = Math.max(
    1,
    ...validPoints.map((point) =>
      num(point.minutes) ?? 0
    )
  );

  return (
    <motion.div
      variants={sectionVariants}
      className={`${CARD} p-6`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
            Platform Usage Trends
          </h3>

          <p className="mt-1 text-[13px] text-zinc-500">
            Aggregate usage across organizations
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-cyan-500/10 px-3 py-1.5 text-[11px] font-medium text-cyan-600 dark:text-cyan-400">
          <CalendarDays size={13} />
          This month
        </div>
      </div>

      {loading ? (
        <SectionMessage message="Loading platform usage..." />
      ) : validPoints.length === 0 ? (
        <SectionMessage message="No platform usage data available." />
      ) : (
        <div className="mt-7">
          <div className="flex h-[190px] items-end gap-2 border-b border-black/[0.06] pb-2 dark:border-white/[0.06]">
            {validPoints.map((point, index) => {
              const minutes = num(point.minutes) ?? 0;

              const height = Math.max(
                minutes > 0 ? 4 : 0,
                (minutes / maxMinutes) * 100
              );

              return (
                <div
                  key={`${point.bucket || "point"}-${index}`}
                  className="group flex h-full min-w-0 flex-1 flex-col justify-end"
                  title={`${formatMinutes(minutes)} minutes`}
                >
                  <div className="flex h-full items-end justify-center">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.025,
                      }}
                      className="w-full max-w-[28px] rounded-t-md bg-cyan-400/80 transition-colors group-hover:bg-cyan-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex justify-between gap-2 text-[10px] text-zinc-500">
            <span>
              {formatDate(validPoints[0]?.bucket)}
            </span>

            <span>
              {formatDate(
                validPoints[validPoints.length - 1]?.bucket
              )}
            </span>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-black/[0.05] pt-4 dark:border-white/[0.05]">
            <div className="flex items-center gap-2 text-[12px] text-zinc-500">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              Total minutes
            </div>

            <p className={`${MONO} text-[12px] font-semibold text-zinc-900 dark:text-zinc-100`}>
              {formatMinutes(
                validPoints.reduce(
                  (total, point) =>
                    total + (num(point.minutes) ?? 0),
                  0
                )
              )}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// ============================================================
// CALL OUTCOMES
// ============================================================

const CallOutcomes = ({ data, loading }) => {
  const items = [
    {
      label: "Total Calls",
      value: data?.total,
      icon: PhoneCall,
      color: "text-zinc-800 dark:text-zinc-100",
    },
    {
      label: "Successful",
      value: data?.success,
      icon: CheckCircle2,
      color: "text-emerald-500",
    },
    {
      label: "Failed",
      value: data?.failed,
      icon: XCircle,
      color: "text-red-500",
    },
  ];

  return (
    <motion.div
      variants={sectionVariants}
      className={`${CARD} p-6`}
    >
      <h3 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
        Platform Call Outcomes
      </h3>

      <p className="mt-1 text-[13px] text-zinc-500">
        Aggregate call results
      </p>

      {loading ? (
        <SectionMessage message="Loading call outcomes..." />
      ) : !data ? (
        <SectionMessage message="No call outcome data available." />
      ) : (
        <div className="mt-5 space-y-3">
          {items.map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-lg border border-black/[0.05] bg-zinc-50/60 p-3 dark:border-white/[0.06] dark:bg-white/[0.02]"
            >
              <div className="flex items-center gap-2.5">
                <Icon size={15} className={color} />

                <span className="text-[12px] text-zinc-600 dark:text-zinc-400">
                  {label}
                </span>
              </div>

              <span className={`${MONO} text-[14px] font-bold ${color}`}>
                {formatNumber(value)}
              </span>
            </div>
          ))}
        </div>
      )}

      {!loading && data && (
        <div className="mt-5 border-t border-black/[0.05] pt-4 dark:border-white/[0.05]">
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-zinc-500">
              Success rate
            </span>

            <span className={`${MONO} font-bold text-emerald-500`}>
              {num(data.success_rate) === null
                ? "—"
                : `${num(data.success_rate).toFixed(2)}%`}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// ============================================================
// ORGANIZATION STATUS
// ============================================================

const OrganizationStatus = ({ stats }) => {
  const total = num(stats?.organizations_total);
  const active = num(stats?.organizations_active);
  const suspended = num(stats?.organizations_suspended);

  const statusItems = [
    {
      label: "Active Organizations",
      value: active,
      icon: CheckCircle2,
      color: "text-emerald-500",
    },
    {
      label: "Suspended Organizations",
      value: suspended,
      icon: AlertTriangle,
      color: "text-red-500",
    },
  ];

  return (
    <motion.div
      variants={sectionVariants}
      className={`${CARD} p-6`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
            Organization Status
          </h3>

          <p className="mt-1 text-[13px] text-zinc-500">
            Platform organization overview
          </p>
        </div>

        <Building2 size={18} className="text-zinc-400" />
      </div>

      <div className="mt-6">
        <p className={LABEL}>Total Organizations</p>

        <p className={`${MONO} mt-2 text-[30px] font-bold text-zinc-900 dark:text-zinc-100`}>
          {formatNumber(total)}
        </p>
      </div>

      {total !== null && total > 0 && (
        <div className="mt-5 flex h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-white/[0.06]">
          <div
            className="bg-emerald-500 transition-all"
            style={{
              width: `${Math.min(
                100,
                ((active ?? 0) / total) * 100
              )}%`,
            }}
          />

          <div
            className="bg-red-500 transition-all"
            style={{
              width: `${Math.min(
                100,
                ((suspended ?? 0) / total) * 100
              )}%`,
            }}
          />
        </div>
      )}

      <div className="mt-5 space-y-4">
        {statusItems.map(
          ({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Icon size={14} className={color} />

                <span className="text-[12px] text-zinc-500">
                  {label}
                </span>
              </div>

              <span className={`${MONO} text-[13px] font-semibold text-zinc-900 dark:text-zinc-100`}>
                {formatNumber(value)}
              </span>
            </div>
          )
        )}
      </div>
    </motion.div>
  );
};

// ============================================================
// RECENT ORGANIZATIONS
// ============================================================

const RecentOrganizations = ({
  organizations,
  loading,
  onViewAll,
}) => {
  const getStatusStyle = (status) => {
    const normalized = String(status || "").toLowerCase();

    if (normalized === "active") {
      return "bg-emerald-500/10 text-emerald-500";
    }

    if (normalized === "suspended") {
      return "bg-red-500/10 text-red-500";
    }

    return "bg-zinc-500/10 text-zinc-500";
  };

  return (
    <motion.div
      variants={sectionVariants}
      className={`${CARD} p-6`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
            Organizations
          </h3>

          <p className="mt-1 text-[13px] text-zinc-500">
            Recently listed platform organizations
          </p>
        </div>

        <button
          onClick={onViewAll}
          className="flex items-center gap-1 text-[12px] font-medium text-cyan-600 transition hover:text-cyan-500 dark:text-cyan-400"
        >
          View all
          <ChevronRight size={14} />
        </button>
      </div>

      {loading ? (
        <SectionMessage message="Loading organizations..." />
      ) : organizations.length === 0 ? (
        <SectionMessage message="No organizations found." />
      ) : (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">
            <thead>
              <tr className="border-b border-black/[0.06] dark:border-white/[0.06]">
                <th className={`${LABEL} pb-3 font-medium`}>
                  Organization
                </th>

                <th className={`${LABEL} pb-3 font-medium`}>
                  Plan
                </th>

                <th className={`${LABEL} pb-3 font-medium`}>
                  Users
                </th>

                <th className={`${LABEL} pb-3 font-medium`}>
                  Agents
                </th>

                <th className={`${LABEL} pb-3 font-medium`}>
                  Status
                </th>

                <th className={`${LABEL} pb-3 font-medium`}>
                  Created
                </th>
              </tr>
            </thead>

            <tbody>
              {organizations.map((organization, index) => (
                <tr
                  key={organization.id || index}
                  className="border-b border-black/[0.04] last:border-0 dark:border-white/[0.04]"
                >
                  <td className="py-4 pr-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500">
                        <Building2 size={15} />
                      </div>

                      <div className="min-w-0">
                        <p className="max-w-[200px] truncate text-[12px] font-semibold text-zinc-800 dark:text-zinc-100">
                          {organization.name || "Unnamed"}
                        </p>

                        <p className="max-w-[200px] truncate text-[10px] text-zinc-500">
                          {organization.email || "—"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 pr-3 text-[12px] capitalize text-zinc-600 dark:text-zinc-400">
                    {organization.plan || "—"}
                  </td>

                  <td className={`${MONO} py-4 pr-3 text-[12px] text-zinc-700 dark:text-zinc-300`}>
                    {formatNumber(organization.users_count)}
                  </td>

                  <td className={`${MONO} py-4 pr-3 text-[12px] text-zinc-700 dark:text-zinc-300`}>
                    {formatNumber(organization.agents_count)}
                  </td>

                  <td className="py-4 pr-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${getStatusStyle(
                        organization.status
                      )}`}
                    >
                      {organization.status || "Unknown"}
                    </span>
                  </td>

                  <td className="py-4 text-[11px] text-zinc-500">
                    {formatDate(organization.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

// ============================================================
// MAIN SUPERADMIN DASHBOARD
// ============================================================

export default function SuperadminDashboard() {
  const navigate = useNavigate();

  const [greeting, setGreeting] = useState(getGreeting());

  const [stats, setStats] = useState(null);
  const [overview, setOverview] = useState(null);
  const [organizations, setOrganizations] = useState([]);

  const [loading, setLoading] = useState({
    stats: true,
    overview: true,
    organizations: true,
  });

  const [errors, setErrors] = useState({});

  const [refreshKey, setRefreshKey] = useState(0);

  // ==========================================================
  // FETCH SECTION
  // ==========================================================

  const fetchSection = useCallback(
    async (key, endpoint, signal, onSuccess) => {
      try {
        const response = await apiRequest(endpoint, {
          signal,
        });

        if (signal.aborted) return;

        onSuccess(response);

        setErrors((previous) => ({
          ...previous,
          [key]: "",
        }));
      } catch (error) {
        if (error.name === "AbortError") return;

        console.error(
          `Superadmin ${key} API error:`,
          error
        );

        setErrors((previous) => ({
          ...previous,
          [key]:
            error.message || "Unable to load data.",
        }));
      } finally {
        if (!signal.aborted) {
          setLoading((previous) => ({
            ...previous,
            [key]: false,
          }));
        }
      }
    },
    []
  );

  // ==========================================================
  // LOAD PLATFORM APIs
  // ==========================================================

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading({
      stats: true,
      overview: true,
      organizations: true,
    });

    setErrors({});

    // --------------------------------------------------------
    // 1. PLATFORM STATISTICS
    // GET /admin/stats
    // --------------------------------------------------------

    fetchSection(
      "stats",
      "/admin/stats",
      signal,
      (response) => {
        setStats(response);
      }
    );

    // --------------------------------------------------------
    // 2. ORGANIZATIONS
    // GET /admin/organizations
    // --------------------------------------------------------

    fetchSection(
      "organizations",
      "/admin/organizations?limit=6&offset=0",
      signal,
      (response) => {
        setOrganizations(
          Array.isArray(response?.items)
            ? response.items
            : []
        );
      }
    );

    // --------------------------------------------------------
    // 3. AGGREGATE PLATFORM DASHBOARD
    // GET /dashboard/overview?range=month
    // --------------------------------------------------------

    fetchSection(
      "overview",
      "/dashboard/overview?range=month",
      signal,
      (response) => {
        setOverview(response);
      }
    );

    return () => {
      controller.abort();
    };
  }, [refreshKey, fetchSection]);

  // ==========================================================
  // GREETING
  // ==========================================================

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // ==========================================================
  // REFRESH
  // ==========================================================

  const refreshDashboard = () => {
    setRefreshKey((previous) => previous + 1);
  };

  // ==========================================================
  // DATA
  // ==========================================================

  const usagePoints = Array.isArray(
    overview?.usage_trends?.points
  )
    ? overview.usage_trends.points
    : [];

  const callOutcomes = overview?.call_outcomes || null;

  const anyError = Object.values(errors).some(Boolean);

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="min-h-full bg-zinc-50 text-zinc-900 transition-colors duration-300 dark:bg-[#08090B] dark:text-zinc-100"
    >
      <main className="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-7">

        {/* ================================================== */}
        {/* HEADER */}
        {/* ================================================== */}

        <motion.section
          variants={sectionVariants}
          className="flex flex-wrap items-start justify-between gap-4 pt-2"
        >
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500">
                <ShieldCheck size={15} />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-600 dark:text-cyan-400">
                Platform Administration
              </span>
            </div>

            <h1 className="text-[26px] font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-[28px]">
              {greeting}, Superadmin
            </h1>

            <p className="mt-1.5 text-[14px] text-zinc-500">
              Monitor organizations, users, agents and platform activity.
            </p>
          </div>

          <button
            onClick={refreshDashboard}
            className="flex items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-xs font-medium text-zinc-600 transition hover:border-cyan-400/40 hover:text-cyan-500 dark:border-white/[0.08] dark:bg-[#0C0D10] dark:text-zinc-300"
          >
            <RefreshCw size={13} />
            Refresh
          </button>
        </motion.section>

        {/* ================================================== */}
        {/* ERROR NOTICE */}
        {/* ================================================== */}

        {anyError && (
          <div className="flex items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/[0.05] p-3 text-xs text-amber-600 dark:text-amber-400">
            <AlertTriangle size={15} className="mt-0.5 shrink-0" />

            <div>
              Some platform sections could not be loaded.
              Available sections are still displayed.

              <button
                onClick={refreshDashboard}
                className="ml-2 font-semibold underline"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* ================================================== */}
        {/* PLATFORM STATS */}
        {/* ================================================== */}

        <motion.section
          variants={sectionVariants}
          className="space-y-3"
        >
          <div className="flex items-center gap-2">
            <LayoutDashboard
              size={15}
              className="text-cyan-500"
            />

            <h2 className="text-[14px] font-semibold text-zinc-800 dark:text-zinc-200">
              Platform Overview
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={Building2}
              label="Total Organizations"
              value={formatNumber(stats?.organizations_total)}
              description="All registered organizations"
              accent
            />

            <StatCard
              icon={CheckCircle2}
              label="Active Organizations"
              value={formatNumber(stats?.organizations_active)}
              description="Currently active organizations"
            />

            <StatCard
              icon={AlertTriangle}
              label="Suspended Organizations"
              value={formatNumber(stats?.organizations_suspended)}
              description="Organizations currently suspended"
            />

            <StatCard
              icon={Users}
              label="Total Users"
              value={formatNumber(stats?.users_total)}
              description="Across the platform"
            />

            <StatCard
              icon={Bot}
              label="Total Agents"
              value={formatNumber(stats?.agents_total)}
              description="Registered platform agents"
            />

            <StatCard
              icon={PhoneCall}
              label="Calls - Last 30 Days"
              value={formatNumber(stats?.calls_30d)}
              description="Platform-wide call volume"
            />

            <StatCard
              icon={Clock3}
              label="Minutes - Last 30 Days"
              value={formatMinutes(stats?.minutes_30d)}
              description="Platform-wide usage"
            />

            <StatCard
              icon={Activity}
              label="Active Calls Now"
              value={formatNumber(stats?.active_calls_now)}
              description="Currently active calls"
              accent
            />
          </div>
        </motion.section>

        {/* ================================================== */}
        {/* USAGE + ORGANIZATION STATUS */}
        {/* ================================================== */}

        <motion.section
          variants={sectionVariants}
          className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(300px,1fr)]"
        >
          <UsageTrends
            points={usagePoints}
            loading={loading.overview}
          />

          <OrganizationStatus stats={stats} />
        </motion.section>

        {errors.stats && (
          <ErrorMessage
            message={`Platform statistics: ${errors.stats}`}
          />
        )}

        {errors.overview && (
          <ErrorMessage
            message={`Platform overview: ${errors.overview}`}
          />
        )}

        {/* ================================================== */}
        {/* CALL OUTCOMES */}
        {/* ================================================== */}

        <motion.section
          variants={sectionVariants}
          className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
        >
          <CallOutcomes
            data={callOutcomes}
            loading={loading.overview}
          />

          <motion.div
            variants={sectionVariants}
            className={`${CARD} flex flex-col justify-between p-6`}
          >
            <div>
              <div className="flex items-center gap-2">
                <Coins
                  size={16}
                  className="text-cyan-500"
                />

                <h3 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
                  Platform Credit Usage
                </h3>
              </div>

              <p className="mt-1 text-[13px] text-zinc-500">
                Credits spent across all organizations in the last 30 days
              </p>

              <p className={`${MONO} mt-7 text-[30px] font-bold text-zinc-900 dark:text-zinc-100`}>
                {formatNumber(stats?.credits_spent_30d)}
              </p>

              <p className="mt-2 text-[11px] text-zinc-500">
                Total platform credits spent
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2 border-t border-black/[0.05] pt-4 text-[11px] text-zinc-500 dark:border-white/[0.05]">
              <TrendingUp
                size={14}
                className="text-cyan-500"
              />
              Platform-wide 30-day usage statistic
            </div>
          </motion.div>
        </motion.section>

        {/* ================================================== */}
        {/* ORGANIZATIONS */}
        {/* ================================================== */}

        <motion.section variants={sectionVariants}>
          <RecentOrganizations
            organizations={organizations}
            loading={loading.organizations}
            onViewAll={() => navigate("/superadmin/organizations")}
          />
        </motion.section>

        {errors.organizations && (
          <ErrorMessage
            message={`Organizations: ${errors.organizations}`}
          />
        )}

      </main>
    </motion.div>
  );
}
