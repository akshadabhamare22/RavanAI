
import React, { useCallback, useEffect, useState } from "react";
import {
  Building2,
  Plus,
  Search,
  RefreshCw,
  Eye,
  ChevronLeft,
  ChevronRight,
  Users,
  X,
  AlertCircle,
} from "lucide-react";
import Config from "../../../config/Config";
import CreateOrganization from "./CreateOrganization";
import ViewOrganization from "./ViewOrganization";

// =====================================================
// Authentication Token
// =====================================================
const getToken = () => {
  const directToken = localStorage.getItem("access_token");
  if (directToken) return directToken;

  try {
    const auth = JSON.parse(localStorage.getItem("ravanai_auth") || "{}");
    return auth.token || auth.access_token || "";
  } catch {
    return "";
  }
};

// =====================================================
// API Request Helper
// =====================================================
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();

  const response = await fetch(`${Config.BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data?.error?.message ||
        data?.detail ||
        data?.message ||
        `Request failed (${response.status})`
    );
  }

  return data;
};

// =====================================================
// Organization Status Styling
// =====================================================
const statusStyle = (status) => {
  const value = String(status || "").toLowerCase();

  if (value === "active") {
    return "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20";
  }

  if (value === "suspended") {
    return "bg-red-50 text-red-700 ring-red-200 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20";
  }

  return "bg-slate-100 text-slate-600 ring-slate-200 dark:bg-white/[0.05] dark:text-zinc-400 dark:ring-white/[0.1]";
};

// =====================================================
// Date Formatter
// =====================================================
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

// =====================================================
// Statistics Card
// =====================================================
const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-white/[0.09] dark:bg-[#0C0D10]">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500 dark:text-zinc-400">
          {label}
        </p>

        <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-zinc-50">
          {value ?? 0}
        </p>
      </div>

      <div className={`rounded-xl p-3 ${color}`}>
        <Icon size={21} />
      </div>
    </div>
  </div>
);

// =====================================================
// Main Organization Component
// =====================================================
export default function Organization() {
  const [organizations, setOrganizations] = useState([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(0);
  const [limit] = useState(10);

  const [screen, setScreen] = useState("list");
  const [selectedOrganizationId, setSelectedOrganizationId] =
    useState(null);

  // =====================================================
  // Fetch Organizations API
  // GET /admin/organizations
  // =====================================================
  const fetchOrganizations = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        limit: String(limit),
        offset: String(page * limit),
      });

      if (search.trim()) {
        params.set("search", search.trim());
      }

      if (status) {
        params.set("status", status);
      }

      const response = await apiRequest(
        `/admin/organizations?${params.toString()}`
      );

      setOrganizations(
        Array.isArray(response.items) ? response.items : []
      );

      setTotal(Number(response.total || 0));
    } catch (err) {
      setOrganizations([]);
      setTotal(0);
      setError(err.message || "Unable to load organizations.");
    } finally {
      setLoading(false);
    }
  }, [limit, page, search, status]);

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  // =====================================================
  // Screen Navigation
  // =====================================================
  const openOrganization = (organization) => {
    setSelectedOrganizationId(organization.id);
    setScreen("view");
  };

  const openCreate = () => {
    setScreen("create");
  };

  const returnToList = (shouldRefresh = false) => {
    setScreen("list");
    setSelectedOrganizationId(null);

    if (shouldRefresh) {
      fetchOrganizations();
    }
  };

  // =====================================================
  // Create Organization Screen
  // =====================================================
  if (screen === "create") {
    return (
      <CreateOrganization
        onBack={() => returnToList(false)}
        onSuccess={() => returnToList(true)}
      />
    );
  }

  // =====================================================
  // View Organization Screen
  // =====================================================
  if (screen === "view" && selectedOrganizationId) {
    return (
      <ViewOrganization
        organizationId={selectedOrganizationId}
        onBack={() => returnToList(true)}
      />
    );
  }

  // =====================================================
  // Statistics
  // Note: These counts represent the current page only.
  // =====================================================
  const activeCount = organizations.filter(
    (item) => String(item.status).toLowerCase() === "active"
  ).length;

  const suspendedCount = organizations.filter(
    (item) => String(item.status).toLowerCase() === "suspended"
  ).length;

  const totalPages = Math.max(1, Math.ceil(total / limit));

  // =====================================================
  // Main UI
  // =====================================================
  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-4 text-slate-900 transition-colors duration-300 dark:bg-[#08090B] dark:text-zinc-100 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-zinc-400">
            <Building2 size={16} />
            <span>Superadmin</span>
            <span>/</span>
            <span>Organizations</span>
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">
            Organizations
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
            Manage all organizations registered on the platform.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Refresh */}
          <button
            onClick={fetchOrganizations}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-50 dark:border-white/[0.12] dark:bg-[#111216] dark:text-zinc-300 dark:hover:bg-white/[0.06]"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>

          {/* Create Organization */}
          <button
            onClick={openCreate}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#275982] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1e4869]"
          >
            <Plus size={17} />
            Create Organization
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={Building2}
          label="Organizations in this page"
          value={organizations.length}
          color="bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
        />

        <StatCard
          icon={Users}
          label="Active in this page"
          value={activeCount}
          color="bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
        />

        <StatCard
          icon={AlertCircle}
          label="Suspended in this page"
          value={suspendedCount}
          color="bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
        />
      </div>

      {/* Organizations Table Card */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-white/[0.09] dark:bg-[#0C0D10]">

        {/* Table Header and Filters */}
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 transition-colors md:flex-row md:items-center md:justify-between dark:border-white/[0.08]">
          <div>
            <h2 className="font-semibold text-slate-900 dark:text-zinc-100">
              All Organizations
            </h2>

            <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
              {total} organization(s) found
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">

            {/* Search */}
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500"
              />

              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(0);
                }}
                placeholder="Search organizations..."
                className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#275982] focus:ring-2 focus:ring-blue-100 sm:w-64 dark:border-white/[0.12] dark:bg-[#111216] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:ring-cyan-500/10"
              />
            </div>

            {/* Status Filter */}
            <select
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
                setPage(0);
              }}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#275982] dark:border-white/[0.12] dark:bg-[#111216] dark:text-zinc-100"
            >
              <option value="">All statuses</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="m-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />

            <div className="flex-1">{error}</div>

            <button
              onClick={() => setError("")}
              aria-label="Dismiss error"
              className="transition hover:opacity-70"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Organizations Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">

            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-white/[0.03] dark:text-zinc-400">
              <tr>
                <th className="px-5 py-4 font-semibold">
                  Organization
                </th>

                <th className="px-5 py-4 font-semibold">
                  Plan
                </th>

                <th className="px-5 py-4 font-semibold">
                  Users
                </th>

                <th className="px-5 py-4 font-semibold">
                  Agents
                </th>

                <th className="px-5 py-4 font-semibold">
                  Status
                </th>

                <th className="px-5 py-4 font-semibold">
                  Created
                </th>

                <th className="px-5 py-4 text-right font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">

              {/* Loading */}
              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-14 text-center text-slate-500 dark:text-zinc-400"
                  >
                    <RefreshCw
                      size={22}
                      className="mx-auto mb-3 animate-spin"
                    />
                    Loading organizations...
                  </td>
                </tr>

              ) : organizations.length === 0 ? (

                /* Empty State */
                <tr>
                  <td colSpan="7" className="px-5 py-14 text-center">
                    <Building2
                      size={30}
                      className="mx-auto mb-3 text-slate-300 dark:text-zinc-600"
                    />

                    <p className="font-medium text-slate-700 dark:text-zinc-200">
                      No organizations found
                    </p>

                    <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
                      Try changing your search or status filter.
                    </p>
                  </td>
                </tr>

              ) : (

                /* Organization Rows */
                organizations.map((organization) => (
                  <tr
                    key={organization.id}
                    className="transition hover:bg-slate-50 dark:hover:bg-white/[0.03]"
                  >
                    {/* Organization Name */}
                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-800 dark:text-zinc-100">
                        {organization.name || "Unnamed organization"}
                      </div>

                      <div className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
                        {organization.email || "No email"}
                      </div>
                    </td>

                    {/* Plan */}
                    <td className="px-5 py-4">
                      <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium capitalize text-slate-700 dark:bg-white/[0.06] dark:text-zinc-300">
                        {organization.plan || "—"}
                      </span>
                    </td>

                    {/* Users */}
                    <td className="px-5 py-4 text-slate-700 dark:text-zinc-300">
                      {organization.users_count ?? 0}
                    </td>

                    {/* Agents */}
                    <td className="px-5 py-4 text-slate-700 dark:text-zinc-300">
                      {organization.agents_count ?? 0}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${statusStyle(
                          organization.status
                        )}`}
                      >
                        {organization.status || "Unknown"}
                      </span>
                    </td>

                    {/* Created Date */}
                    <td className="px-5 py-4 text-slate-500 dark:text-zinc-400">
                      {formatDate(organization.created_at)}
                    </td>

                    {/* View Action */}
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => openOrganization(organization)}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-[#275982] hover:bg-blue-50 hover:text-[#275982] dark:border-white/[0.12] dark:text-zinc-300 dark:hover:border-[#275982] dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
                      >
                        <Eye size={15} />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between dark:border-white/[0.08]">

          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Showing {total === 0 ? 0 : page * limit + 1}–
            {Math.min((page + 1) * limit, total)} of {total}
          </p>

          <div className="flex items-center gap-2">

            {/* Previous Page */}
            <button
              onClick={() =>
                setPage((current) => Math.max(0, current - 1))
              }
              disabled={page === 0 || loading}
              className="rounded-lg border border-slate-300 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/[0.12] dark:text-zinc-400 dark:hover:bg-white/[0.06]"
              aria-label="Previous page"
            >
              <ChevronLeft size={17} />
            </button>

            {/* Current Page */}
            <span className="min-w-24 text-center text-xs text-slate-600 dark:text-zinc-400">
              Page {page + 1} of {totalPages}
            </span>

            {/* Next Page */}
            <button
              onClick={() =>
                setPage((current) =>
                  current + 1 < totalPages ? current + 1 : current
                )
              }
              disabled={page + 1 >= totalPages || loading}
              className="rounded-lg border border-slate-300 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/[0.12] dark:text-zinc-400 dark:hover:bg-white/[0.06]"
              aria-label="Next page"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
