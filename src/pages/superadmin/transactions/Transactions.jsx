
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Coins,
  Filter,
  Loader2,
  RefreshCw,
  ReceiptText,
  Search,
  AlertCircle,
  X,
} from "lucide-react";

import Config from "../../../config/Config";
import ViewTransaction from "./ViewTransaction";

const PAGE_SIZE = 10;

const TRANSACTION_TYPES = [
  { value: "", label: "All Transactions" },
  { value: "grant", label: "Grant" },
  { value: "purchase", label: "Purchase" },
  { value: "usage", label: "Usage" },
  { value: "refund", label: "Refund" },
  { value: "adjustment", label: "Adjustment" },
];

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

const getErrorMessage = (error, fallback) => {
  const detail = error?.response?.data?.detail;

  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    return detail.map((item) => item.msg || "Validation error").join(", ");
  }

  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
};

const formatCredits = (value) => {
  const number = Number(value);
  if (!Number.isFinite(number)) return "0";

  return number.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });
};

const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getTypeStyle = (type) => {
  switch (String(type || "").toLowerCase()) {
    case "grant":
      return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    case "purchase":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    case "usage":
      return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    case "refund":
      return "bg-purple-500/10 text-purple-500 border-purple-500/20";
    case "adjustment":
      return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    default:
      return "bg-zinc-500/10 text-zinc-500 border-zinc-500/20";
  }
};

const Transactions = () => {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState("");

  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);

  const [type, setType] = useState("");
  const [page, setPage] = useState(0);

  const [organizationsLoading, setOrganizationsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");
  const [organizationError, setOrganizationError] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const token = getToken();

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const selectedOrganization = useMemo(
    () => organizations.find((org) => org.id === selectedOrg),
    [organizations, selectedOrg]
  );

  const fetchOrganizations = useCallback(async () => {
    setOrganizationsLoading(true);
    setOrganizationError("");

    try {
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      const response = await fetch(
        `${Config.BASE_URL}/admin/organizations?limit=200&offset=0`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw {
          response: {
            data: {
              detail: data?.detail || data?.message,
            },
          },
        };
      }

      const items = Array.isArray(data?.items) ? data.items : [];
      setOrganizations(items);

      setSelectedOrg((current) => {
        if (current && items.some((org) => org.id === current)) {
          return current;
        }
        return items[0]?.id || "";
      });
    } catch (err) {
      setOrganizationError(
        getErrorMessage(err, "Unable to load organizations.")
      );
      setOrganizations([]);
      setSelectedOrg("");
    } finally {
      setOrganizationsLoading(false);
    }
  }, [token]);

  const fetchTransactions = useCallback(
    async (signal) => {
      if (!selectedOrg) {
        setTransactions([]);
        setTotal(0);
        setLoading(false);
        return;
      }

      if (!token) {
        setError("Authentication token not found. Please log in again.");
        setTransactions([]);
        setTotal(0);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          client_id: selectedOrg,
          limit: String(PAGE_SIZE),
          offset: String(page * PAGE_SIZE),
        });

        if (type) params.set("type", type);

        const response = await fetch(
          `${Config.BASE_URL}/billing/transactions?${params.toString()}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
            signal,
          }
        );

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(
            typeof data?.detail === "string"
              ? data.detail
              : data?.message || "Unable to fetch transactions."
          );
        }

        setTransactions(Array.isArray(data?.items) ? data.items : []);
        setTotal(Number(data?.total) || 0);
      } catch (err) {
        if (err.name === "AbortError") return;

        setTransactions([]);
        setTotal(0);
        setError(getErrorMessage(err, "Unable to fetch transactions."));
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [selectedOrg, type, page, token]
  );

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  useEffect(() => {
    const controller = new AbortController();
    fetchTransactions(controller.signal);

    return () => controller.abort();
  }, [fetchTransactions]);

  const handleOrganizationChange = (value) => {
    setSelectedOrg(value);
    setPage(0);
    setSelectedTransaction(null);
  };

  const handleTypeChange = (value) => {
    setType(value);
    setPage(0);
    setSelectedTransaction(null);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchOrganizations();
      // The transaction request is refreshed by the organization state effect.
      await fetchTransactions();
    } finally {
      setRefreshing(false);
    }
  };

  const currentPageAmount = useMemo(
    () =>
      transactions.reduce((sum, item) => {
        const amount = Number(item.amount);
        return sum + (Number.isFinite(amount) ? amount : 0);
      }, 0),
    [transactions]
  );

  const cardClass =
    "rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-zinc-800 dark:bg-[#111315]";

  const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#275982] focus:ring-2 focus:ring-[#275982]/20 dark:border-zinc-700 dark:bg-[#111315] dark:text-zinc-100";

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-900 transition-colors duration-300 sm:p-6 dark:bg-[#08090B] dark:text-zinc-100">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500 dark:text-zinc-400">
              <span>Superadmin</span>
              <span>/</span>
              <span className="text-[#275982]">Transactions</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Platform Transactions
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
              View and monitor organization credit transactions.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing || organizationsLoading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#275982] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#1f496b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={refreshing ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        {/* Organization selector */}
        <div className={cardClass}>
          <div className="mb-3 flex items-center gap-2">
            <Building2 size={18} className="text-[#275982]" />
            <h2 className="text-sm font-semibold">Select Organization</h2>
          </div>

          {organizationError ? (
            <div className="flex flex-col gap-3 rounded-lg border border-red-500/20 bg-red-500/5 p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-red-500">{organizationError}</p>
              <button
                type="button"
                onClick={fetchOrganizations}
                className="text-sm font-semibold text-[#275982]"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="relative max-w-xl">
              <select
                value={selectedOrg}
                onChange={(event) =>
                  handleOrganizationChange(event.target.value)
                }
                disabled={organizationsLoading || organizations.length === 0}
                className={`${inputClass} appearance-none pr-10`}
              >
                {organizationsLoading ? (
                  <option value="">Loading organizations...</option>
                ) : organizations.length === 0 ? (
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
              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          )}

          {selectedOrganization && (
            <p className="mt-2 text-xs text-slate-500 dark:text-zinc-500">
              Showing transactions for{" "}
              <span className="font-semibold text-slate-700 dark:text-zinc-300">
                {selectedOrganization.name}
              </span>
            </p>
          )}
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className={cardClass}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-zinc-400">
                  Total Transactions
                </p>
                <p className="mt-2 text-2xl font-bold tabular-nums">
                  {total.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="rounded-xl bg-[#275982]/10 p-3 text-[#275982]">
                <ReceiptText size={22} />
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-400 dark:text-zinc-500">
              Matching the selected organization and filter
            </p>
          </div>

          <div className={cardClass}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-zinc-400">
                  Records on This Page
                </p>
                <p className="mt-2 text-2xl font-bold tabular-nums">
                  {transactions.length}
                </p>
              </div>
              <div className="rounded-xl bg-blue-500/10 p-3 text-blue-500">
                <Filter size={22} />
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-400 dark:text-zinc-500">
              Maximum {PAGE_SIZE} records per page
            </p>
          </div>

          <div className={cardClass}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-zinc-400">
                  Net Amount on This Page
                </p>
                <p className="mt-2 text-2xl font-bold tabular-nums">
                  {formatCredits(currentPageAmount)}
                </p>
              </div>
              <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-500">
                <Coins size={22} />
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-400 dark:text-zinc-500">
              Sum of transaction amounts on the current page
            </p>
          </div>
        </div>

        {/* Transactions table */}
        <div className={cardClass}>
          <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-lg font-semibold">Transaction Ledger</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
                Latest credit activity for the selected organization.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
              <div className="relative min-w-0 sm:min-w-[210px]">
                <Filter
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <select
                  value={type}
                  onChange={(event) => handleTypeChange(event.target.value)}
                  className={`${inputClass} pl-9`}
                  disabled={!selectedOrg}
                >
                  {TRANSACTION_TYPES.map((item) => (
                    <option key={item.value || "all"} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              {type && (
                <button
                  type="button"
                  onClick={() => handleTypeChange("")}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-[#191C1F]"
                >
                  <X size={15} />
                  Clear filter
                </button>
              )}
            </div>
          </div>

          {error && (
            <div className="mb-4 flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/5 p-4">
              <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-500">
                  Unable to load transactions
                </p>
                <p className="mt-1 text-sm text-red-500/80">{error}</p>
              </div>
              <button
                type="button"
                onClick={() => fetchTransactions()}
                className="text-sm font-semibold text-[#275982]"
              >
                Retry
              </button>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-100 text-xs uppercase tracking-wider text-slate-500 dark:bg-[#191C1F] dark:text-zinc-400">
                  <th className="rounded-l-lg px-4 py-3 font-semibold">
                    Transaction
                  </th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Amount</th>
                  <th className="px-4 py-3 font-semibold">Balance After</th>
                  <th className="px-4 py-3 font-semibold">Reference</th>
                  <th className="px-4 py-3 font-semibold">Date & Time</th>
                  <th className="rounded-r-lg px-4 py-3 text-right font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-16 text-center">
                      <Loader2
                        size={25}
                        className="mx-auto animate-spin text-[#275982]"
                      />
                      <p className="mt-3 text-sm text-slate-500 dark:text-zinc-400">
                        Loading transactions...
                      </p>
                    </td>
                  </tr>
                ) : transactions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-16 text-center">
                      <ReceiptText
                        size={30}
                        className="mx-auto text-slate-300 dark:text-zinc-600"
                      />
                      <p className="mt-3 text-sm font-medium">
                        No transactions found
                      </p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
                        Transactions will appear here when available for this
                        organization.
                      </p>
                    </td>
                  </tr>
                ) : (
                  transactions.map((transaction) => {
                    const amount = Number(transaction.amount);
                    const isPositive = Number.isFinite(amount) && amount > 0;

                    return (
                      <tr
                        key={transaction.id}
                        className="transition hover:bg-slate-50 dark:hover:bg-[#191C1F]"
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`rounded-lg p-2 ${
                                isPositive
                                  ? "bg-emerald-500/10 text-emerald-500"
                                  : "bg-orange-500/10 text-orange-500"
                              }`}
                            >
                              {isPositive ? (
                                <ArrowDownCircle size={17} />
                              ) : (
                                <ArrowUpCircle size={17} />
                              )}
                            </div>
                            <div>
                              <p className="max-w-[180px] truncate text-sm font-semibold">
                                {transaction.id || "—"}
                              </p>
                              <p className="mt-1 text-xs text-slate-400 dark:text-zinc-500">
                                {transaction.call_id
                                  ? "Call transaction"
                                  : "Credit transaction"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${getTypeStyle(
                              transaction.type
                            )}`}
                          >
                            {transaction.type || "Unknown"}
                          </span>
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`text-sm font-semibold tabular-nums ${
                              isPositive ? "text-emerald-500" : "text-orange-500"
                            }`}
                          >
                            {isPositive ? "+" : ""}
                            {formatCredits(transaction.amount)}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-sm font-medium tabular-nums">
                          {formatCredits(transaction.balance_after)}
                        </td>

                        <td className="px-4 py-4 text-sm text-slate-500 dark:text-zinc-400">
                          <span className="block max-w-[140px] truncate">
                            {transaction.reference || "—"}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-sm text-slate-500 dark:text-zinc-400">
                          {formatDate(transaction.created_at)}
                        </td>

                        <td className="px-4 py-4 text-right">
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedTransaction(transaction)
                            }
                            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-[#275982] transition hover:bg-[#275982]/5 dark:border-zinc-700 dark:hover:bg-[#275982]/10"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-5 flex flex-col justify-between gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center dark:border-zinc-800">
            <p className="text-sm text-slate-500 dark:text-zinc-400">
              {total === 0
                ? "No records"
                : `Showing ${page * PAGE_SIZE + 1}–${Math.min(
                    (page + 1) * PAGE_SIZE,
                    total
                  )} of ${total} transactions`}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((current) => Math.max(0, current - 1))}
                disabled={page === 0 || loading || total === 0}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-[#191C1F]"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              <span className="px-2 text-sm text-slate-500 dark:text-zinc-400">
                Page {total === 0 ? 0 : page + 1} of{" "}
                {total === 0 ? 0 : totalPages}
              </span>

              <button
                type="button"
                onClick={() =>
                  setPage((current) => Math.min(totalPages - 1, current + 1))
                }
                disabled={
                  page >= totalPages - 1 || loading || total === 0
                }
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-[#191C1F]"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedTransaction && (
        <ViewTransaction
          transaction={selectedTransaction}
          organization={selectedOrganization}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
};

export default Transactions;
