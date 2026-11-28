
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Users as UsersIcon,
  UserPlus,
  Search,
  RefreshCw,
  Eye,
  ShieldCheck,
  UserCheck,
  UserX,
  Building2,
  XCircle,
} from "lucide-react";

import Config from "../../../config/Config";
import CreateUser from "./CreateUser";
import ViewUser from "./ViewUser";

const getAuthToken = () => {
  const directToken = localStorage.getItem("access_token");

  if (directToken) return directToken;

  try {
    const auth = JSON.parse(localStorage.getItem("ravanai_auth") || "{}");
    return auth.token || auth.access_token || "";
  } catch {
    return "";
  }
};

const getErrorMessage = async (response) => {
  try {
    const data = await response.json();

    if (typeof data.detail === "string") return data.detail;
    if (Array.isArray(data.detail)) {
      return data.detail.map((item) => item.msg).join(", ");
    }

    return data.message || "Something went wrong.";
  } catch {
    return `Request failed (${response.status}).`;
  }
};

const roleLabel = (role) => {
  const labels = {
    superadmin: "Superadmin",
    admin: "Admin",
    user: "User",
  };

  return labels[String(role || "").toLowerCase()] || role || "Unknown";
};

const RoleBadge = ({ role }) => {
  const normalized = String(role || "").toLowerCase();

  const styles = {
    superadmin:
      "bg-purple-50 text-purple-700 ring-purple-200 dark:bg-purple-500/10 dark:text-purple-300 dark:ring-purple-500/20",
    admin:
      "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/20",
    user:
      "bg-slate-100 text-slate-700 ring-slate-200 dark:bg-white/[0.06] dark:text-zinc-300 dark:ring-white/[0.1]",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${
        styles[normalized] || styles.user
      }`}
    >
      {roleLabel(role)}
    </span>
  );
};

const StatusBadge = ({ active }) => (
  <span
    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${
      active
        ? "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20"
        : "bg-red-50 text-red-700 ring-red-200 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20"
    }`}
  >
    {active ? "Active" : "Inactive"}
  </span>
);

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-white/[0.08] dark:bg-[#0C0D10]">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500 dark:text-zinc-400">{title}</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-zinc-100">
          {value}
        </h3>
      </div>
      <div className={`rounded-xl p-3 ${color}`}>
        <Icon size={21} />
      </div>
    </div>
  </div>
);

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const [screen, setScreen] = useState("list");
  const [selectedUser, setSelectedUser] = useState(null);

  const pageSize = 10;

  const loadUsers = useCallback(async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    else setLoading(true);

    setError("");

    try {
      const token = getAuthToken();

      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      const response = await fetch(`${Config.BASE_URL}/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(await getErrorMessage(response));
      }

      const data = await response.json();

      // Backend returns a plain array, not { items: [...] }.
      if (!Array.isArray(data)) {
        throw new Error("Unexpected users API response. Expected an array.");
      }

      setUsers(data);
    } catch (err) {
      setError(err.message || "Unable to load users.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const filteredUsers = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !searchText ||
        [
          user.first_name,
          user.last_name,
          user.full_name,
          user.email,
          user.organization_name,
          user.phone_number,
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(searchText));

      const matchesRole =
        roleFilter === "all" ||
        String(user.role).toLowerCase() === roleFilter;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && user.is_active) ||
        (statusFilter === "inactive" && !user.is_active);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  useEffect(() => {
    setPage(1);
  }, [search, roleFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const activeCount = users.filter((user) => user.is_active).length;
  const inactiveCount = users.length - activeCount;
  const adminCount = users.filter(
    (user) => String(user.role).toLowerCase() === "admin"
  ).length;

  const openUser = (user) => {
    setSelectedUser(user);
    setScreen("view");
  };

  const handleUpdated = async (updatedUser) => {
    setSelectedUser(updatedUser);
    await loadUsers(true);
    setScreen("list");
    setSelectedUser(null);
  };

  if (screen === "create") {
    return (
      <CreateUser
        onCancel={() => setScreen("list")}
        onCreated={async () => {
          await loadUsers(true);
          setScreen("list");
        }}
      />
    );
  }

  if (screen === "view" && selectedUser) {
    return (
      <ViewUser
        user={selectedUser}
        onBack={() => {
          setScreen("list");
          setSelectedUser(null);
        }}
        onUpdated={handleUpdated}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 dark:bg-[#08090B]">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-slate-500 dark:text-zinc-400">
              Platform Management / Users
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-zinc-100">
              Platform Users
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
              Manage platform accounts, organization users and access status.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => loadUsers(true)}
              disabled={refreshing}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60 dark:border-white/[0.12] dark:bg-[#111216] dark:text-zinc-300 dark:hover:bg-white/[0.06]"
            >
              <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
              Refresh
            </button>

            <button
              onClick={() => setScreen("create")}
              className="inline-flex items-center gap-2 rounded-lg bg-[#275982] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1f496b]"
            >
              <UserPlus size={17} />
              Create User
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
            <XCircle size={18} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Users"
            value={users.length}
            icon={UsersIcon}
            color="bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"
          />
          <StatCard
            title="Active Users"
            value={activeCount}
            icon={UserCheck}
            color="bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
          />
          <StatCard
            title="Inactive Users"
            value={inactiveCount}
            icon={UserX}
            color="bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300"
          />
          <StatCard
            title="Organization Admins"
            value={adminCount}
            icon={ShieldCheck}
            color="bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-300"
          />
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-white/[0.08] dark:bg-[#0C0D10]">
          <div className="flex flex-col gap-3 border-b border-slate-200 p-4 dark:border-white/[0.08] lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-zinc-100">
                All Users
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
                {filteredUsers.length} matching users
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              <div className="relative sm:col-span-1">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search users..."
                  className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-800 outline-none focus:border-[#275982] dark:border-white/[0.12] dark:bg-[#111216] dark:text-zinc-100 dark:placeholder:text-zinc-500"
                />
              </div>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none dark:border-white/[0.12] dark:bg-[#111216] dark:text-zinc-200"
              >
                <option value="all">All Roles</option>
                <option value="superadmin">Superadmin</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none dark:border-white/[0.12] dark:bg-[#111216] dark:text-zinc-200"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="py-16 text-center text-sm text-slate-500 dark:text-zinc-400">
              Loading platform users...
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-left">
                  <thead className="bg-slate-50 dark:bg-white/[0.03]">
                    <tr className="text-xs uppercase tracking-wide text-slate-500 dark:text-zinc-400">
                      <th className="px-5 py-4 font-semibold">User</th>
                      <th className="px-5 py-4 font-semibold">Organization</th>
                      <th className="px-5 py-4 font-semibold">Phone</th>
                      <th className="px-5 py-4 font-semibold">Role</th>
                      <th className="px-5 py-4 font-semibold">Status</th>
                      <th className="px-5 py-4 text-right font-semibold">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">
                    {paginatedUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-slate-50 dark:hover:bg-white/[0.03]"
                      >
                        <td className="px-5 py-4">
                          <div className="font-medium text-slate-900 dark:text-zinc-100">
                            {user.full_name ||
                              `${user.first_name || ""} ${user.last_name || ""}`}
                          </div>
                          <div className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
                            {user.email}
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-zinc-300">
                            <Building2 size={15} className="text-slate-400" />
                            {user.organization_name || "—"}
                          </div>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600 dark:text-zinc-300">
                          {user.phone_country_code} {user.phone_number}
                        </td>

                        <td className="px-5 py-4">
                          <RoleBadge role={user.role} />
                        </td>

                        <td className="px-5 py-4">
                          <StatusBadge active={user.is_active} />
                        </td>

                        <td className="px-5 py-4 text-right">
                          <button
                            onClick={() => openUser(user)}
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-white/[0.12] dark:text-zinc-300 dark:hover:bg-white/[0.06]"
                          >
                            <Eye size={14} />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}

                    {paginatedUsers.length === 0 && (
                      <tr>
                        <td
                          colSpan="6"
                          className="px-5 py-14 text-center text-sm text-slate-500 dark:text-zinc-400"
                        >
                          No users found matching your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 text-sm dark:border-white/[0.08] sm:flex-row sm:items-center sm:justify-between">
                <p className="text-slate-500 dark:text-zinc-400">
                  Showing{" "}
                  {filteredUsers.length === 0
                    ? 0
                    : (page - 1) * pageSize + 1}
                  {"–"}
                  {Math.min(page * pageSize, filteredUsers.length)} of{" "}
                  {filteredUsers.length}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage((current) => current - 1)}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/[0.12] dark:text-zinc-300"
                  >
                    Previous
                  </button>
                  <span className="text-slate-600 dark:text-zinc-400">
                    {page} / {totalPages}
                  </span>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage((current) => current + 1)}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/[0.12] dark:text-zinc-300"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
