
import React, { useEffect, useState } from "react";
import {
  Coins,
  Zap,
  Activity,
  PhoneCall,
  RefreshCw,
  ArrowDownLeft,
  ArrowUpRight,
  Search,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from "lucide-react";

import billingApi from "./billingApi";

const PAGE_LIMIT = 10;

const TRANSACTION_TYPES = [
  { value: "all", label: "All Transactions" },
  { value: "grant", label: "Grant" },
  { value: "purchase", label: "Purchase" },
  { value: "usage", label: "Usage" },
  { value: "refund", label: "Refund" },
  { value: "adjustment", label: "Adjustment" },
];

const formatCredits = (value) => {
  const number = Number(value || 0);

  return number.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
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

const formatDay = (value) => {
  if (!value) return "";

  const date = new Date(value + "T00:00:00");

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
};

const getTransactionLabel = (type) => {
  const labels = {
    grant: "Credit Grant",
    purchase: "Credit Purchase",
    usage: "Call Usage",
    refund: "Refund",
    adjustment: "Adjustment",
  };

  return labels[type] || type || "Transaction";
};

const getTransactionStyle = (type) => {
  if (type === "usage") {
    return "bg-red-500/10 text-red-600 dark:text-red-400";
  }

  if (type === "grant" || type === "purchase" || type === "refund") {
    return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
  }

  return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
};

export default function Billing() {
  const [balance, setBalance] = useState(null);
  const [usage, setUsage] = useState([]);

  const [transactions, setTransactions] = useState([]);
  const [transactionTotal, setTransactionTotal] = useState(0);

  const [balanceLoading, setBalanceLoading] = useState(true);
  const [usageLoading, setUsageLoading] = useState(true);
  const [transactionsLoading, setTransactionsLoading] = useState(true);

  const [balanceError, setBalanceError] = useState("");
  const [usageError, setUsageError] = useState("");
  const [transactionError, setTransactionError] = useState("");

  const [usageDays, setUsageDays] = useState("30");
  const [transactionType, setTransactionType] = useState("all");
  const [offset, setOffset] = useState(0);

  const fetchBalance = async () => {
    try {
      setBalanceLoading(true);
      setBalanceError("");

      const response = await billingApi.getBalance();

      setBalance(response);
    } catch (error) {
      setBalanceError(error.message || "Unable to load credit balance.");
    } finally {
      setBalanceLoading(false);
    }
  };

  const fetchUsage = async () => {
    try {
      setUsageLoading(true);
      setUsageError("");

      const response = await billingApi.getUsage(Number(usageDays));

      setUsage(Array.isArray(response) ? response : []);
    } catch (error) {
      setUsageError(error.message || "Unable to load usage information.");
    } finally {
      setUsageLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      setTransactionsLoading(true);
      setTransactionError("");

      const params = {
        limit: PAGE_LIMIT,
        offset,
      };

      if (transactionType !== "all") {
        params.type = transactionType;
      }

      const response = await billingApi.getTransactions(params);

      setTransactions(response.items || []);
      setTransactionTotal(response.total || 0);
    } catch (error) {
      setTransactionError(
        error.message || "Unable to load transactions."
      );
    } finally {
      setTransactionsLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  useEffect(() => {
    fetchUsage();
  }, [usageDays]);

  useEffect(() => {
    fetchTransactions();
  }, [transactionType, offset]);

  const refreshAll = () => {
    fetchBalance();
    fetchUsage();
    fetchTransactions();
  };

  const handleTypeChange = (event) => {
    setTransactionType(event.target.value);
    setOffset(0);
  };

  const totalPages = Math.ceil(transactionTotal / PAGE_LIMIT);
  const currentPage = Math.floor(offset / PAGE_LIMIT) + 1;

  const totalUsageCalls = usage.reduce(
    (sum, item) => sum + Number(item.calls || 0),
    0
  );

  const totalUsageMinutes = usage.reduce(
    (sum, item) => sum + Number(item.minutes || 0),
    0
  );

  const totalUsageCredits = usage.reduce(
    (sum, item) => sum + Number(item.credits || 0),
    0
  );

  const chartItems = usage.slice(-14);

  const maxCredits = Math.max(
    ...chartItems.map((item) => Number(item.credits || 0)),
    1
  );

  return (
    <div className="min-h-screen bg-zinc-100 p-4 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100 sm:p-6 lg:p-7">

      <main className="mx-auto max-w-[1600px] space-y-5">

        {/* HEADER */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <Coins size={20} />
              </div>

              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  Billing & Credits
                </h1>
                <p className="mt-0.5 text-xs text-zinc-500">
                  Monitor credit balance, transactions and usage
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={refreshAll}
            disabled={
              balanceLoading ||
              usageLoading ||
              transactionsLoading
            }
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-black/[0.08] bg-white px-4 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-50 dark:border-white/[0.08] dark:bg-[#151518] dark:text-zinc-300 dark:hover:bg-white/[0.05]"
          >
            <RefreshCw
              size={14}
              className={
                balanceLoading ||
                usageLoading ||
                transactionsLoading
                  ? "animate-spin"
                  : ""
              }
            />
            Refresh
          </button>
        </div>

        {/* BALANCE ERROR */}
        {balanceError && (
          <ErrorMessage
            message={balanceError}
            onRetry={fetchBalance}
          />
        )}

        {/* CREDIT BALANCE */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <SummaryCard
            title="Available Credits"
            icon={Coins}
            loading={balanceLoading}
            value={
              balance
                ? formatCredits(balance.credit_balance)
                : "—"
            }
            description="Current credit balance"
            highlight
          />

          <SummaryCard
            title="Credits Per Minute"
            icon={Zap}
            loading={balanceLoading}
            value={
              balance
                ? formatCredits(balance.credits_per_minute)
                : "—"
            }
            description="Configured usage rate"
          />

          <SummaryCard
            title="Credits Spent This Month"
            icon={Activity}
            loading={balanceLoading}
            value={
              balance
                ? formatCredits(balance.credits_spent_this_month)
                : "—"
            }
            description="Current month's credit consumption"
          />

          <SummaryCard
            title="Minutes This Month"
            icon={PhoneCall}
            loading={balanceLoading}
            value={
              balance
                ? formatCredits(balance.minutes_this_month)
                : "—"
            }
            description="Total call duration this month"
          />

        </section>

        {/* LOW CREDIT THRESHOLD */}
        {balance && (
          <section className="rounded-xl border border-black/[0.06] bg-white px-5 py-4 dark:border-white/[0.08] dark:bg-[#101012]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  Low Credit Threshold
                </p>
                <p className="mt-1 text-[11px] text-zinc-500">
                  Configured threshold for low credit monitoring
                </p>
              </div>

              <span className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-sm font-bold text-amber-600 dark:text-amber-400">
                {formatCredits(balance.low_credit_threshold)} credits
              </span>
            </div>
          </section>
        )}

        {/* USAGE SECTION */}
        <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">

          <div className="flex flex-col justify-between gap-3 border-b border-black/[0.06] px-5 py-4 dark:border-white/[0.06] sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/[0.06] text-cyan-600 dark:text-cyan-400">
                <Activity size={16} />
              </div>

              <div>
                <h2 className="text-sm font-semibold">
                  Usage Overview
                </h2>
                <p className="mt-0.5 text-[11px] text-zinc-500">
                  Daily calls, minutes and credit consumption
                </p>
              </div>
            </div>

            <select
              value={usageDays}
              onChange={(event) => setUsageDays(event.target.value)}
              className="h-9 rounded-lg border border-black/[0.08] bg-zinc-50 px-3 text-xs outline-none focus:border-cyan-500 dark:border-white/[0.08] dark:bg-[#151518]"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="180">Last 180 days</option>
              <option value="366">Last 366 days</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-3">

            <UsageSummary
              title="Total Calls"
              value={totalUsageCalls.toLocaleString("en-IN")}
              icon={PhoneCall}
              loading={usageLoading}
            />

            <UsageSummary
              title="Total Minutes"
              value={formatCredits(totalUsageMinutes)}
              icon={Clock}
              loading={usageLoading}
            />

            <UsageSummary
              title="Credits Consumed"
              value={formatCredits(totalUsageCredits)}
              icon={Coins}
              loading={usageLoading}
            />

          </div>

          <div className="border-t border-black/[0.06] p-5 dark:border-white/[0.06]">

            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-semibold">
                  Daily Credit Usage
                </h3>
                <p className="mt-1 text-[10px] text-zinc-500">
                  Credit consumption over the selected period
                </p>
              </div>

              <span className="text-[10px] text-zinc-400">
                Credits
              </span>
            </div>

            {usageError ? (
              <div className="py-8 text-center">
                <p className="text-xs text-red-500">{usageError}</p>
                <button
                  onClick={fetchUsage}
                  className="mt-2 text-xs font-semibold text-cyan-600 hover:underline dark:text-cyan-400"
                >
                  Try again
                </button>
              </div>
            ) : usageLoading ? (
              <div className="flex h-48 items-center justify-center">
                <Loader2
                  size={22}
                  className="animate-spin text-cyan-500"
                />
              </div>
            ) : chartItems.length === 0 ? (
              <EmptyState message="No usage data available." />
            ) : (
              <div className="flex h-52 items-end gap-2 overflow-x-auto pb-2">
                {chartItems.map((item) => {
                  const credits = Number(item.credits || 0);
                  const height = Math.max(
                    (credits / maxCredits) * 100,
                    credits > 0 ? 5 : 0
                  );

                  return (
                    <div
                      key={item.date}
                      className="flex h-full min-w-[32px] flex-1 flex-col items-center justify-end gap-2"
                      title={
                        formatDay(item.date) +
                        ": " +
                        formatCredits(credits) +
                        " credits"
                      }
                    >
                      <span className="text-[9px] text-zinc-500">
                        {credits > 0 ? formatCredits(credits) : ""}
                      </span>

                      <div className="flex h-[130px] w-full items-end justify-center">
                        <div
                          className="w-full max-w-[34px] rounded-t-md bg-cyan-500 transition-all duration-300 hover:bg-cyan-400"
                          style={{
                            height: height + "%",
                            minHeight: credits > 0 ? "3px" : "0px",
                          }}
                        />
                      </div>

                      <span className="whitespace-nowrap text-[9px] text-zinc-500">
                        {formatDay(item.date)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

          {/* DAILY USAGE DETAILS */}
          {!usageLoading && !usageError && usage.length > 0 && (
            <div className="overflow-x-auto border-t border-black/[0.06] dark:border-white/[0.06]">
              <table className="w-full min-w-[550px] text-left">
                <thead>
                  <tr className="bg-zinc-50/70 dark:bg-white/[0.02]">
                    <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      Date
                    </th>
                    <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      Calls
                    </th>
                    <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      Minutes
                    </th>
                    <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      Credits
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {usage.slice(-7).reverse().map((item) => (
                    <tr
                      key={item.date}
                      className="border-t border-black/[0.05] dark:border-white/[0.05]"
                    >
                      <td className="px-5 py-3 text-xs font-medium">
                        {formatDay(item.date)}
                      </td>
                      <td className="px-5 py-3 text-xs text-zinc-500">
                        {item.calls}
                      </td>
                      <td className="px-5 py-3 text-xs text-zinc-500">
                        {formatCredits(item.minutes)}
                      </td>
                      <td className="px-5 py-3 text-right text-xs font-semibold">
                        {formatCredits(item.credits)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </section>

        {/* TRANSACTION LEDGER */}
        <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">

          {/* HEADER */}
          <div className="flex flex-col justify-between gap-3 border-b border-black/[0.06] px-5 py-4 dark:border-white/[0.06] sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.06] bg-zinc-50 text-zinc-500 dark:border-white/[0.08] dark:bg-white/[0.02]">
                <CalendarDays size={16} />
              </div>

              <div>
                <h2 className="text-sm font-semibold">
                  Credit Transaction Ledger
                </h2>
                <p className="mt-0.5 text-[11px] text-zinc-500">
                  Complete history of credit balance changes
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={transactionType}
                onChange={handleTypeChange}
                className="h-9 rounded-lg border border-black/[0.08] bg-zinc-50 px-3 text-xs outline-none focus:border-cyan-500 dark:border-white/[0.08] dark:bg-[#151518]"
              >
                {TRANSACTION_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>

              <button
                onClick={fetchTransactions}
                disabled={transactionsLoading}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.08] bg-zinc-50 text-zinc-500 transition hover:text-cyan-600 dark:border-white/[0.08] dark:bg-[#151518]"
                title="Refresh transactions"
              >
                <RefreshCw
                  size={14}
                  className={transactionsLoading ? "animate-spin" : ""}
                />
              </button>
            </div>
          </div>

          {/* TRANSACTION ERROR */}
          {transactionError && (
            <div className="p-4">
              <ErrorMessage
                message={transactionError}
                onRetry={fetchTransactions}
              />
            </div>
          )}

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">

              <thead>
                <tr className="border-b border-black/[0.06] bg-zinc-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                    Transaction
                  </th>
                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                    Description
                  </th>
                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                    Reference
                  </th>
                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                    Date
                  </th>
                  <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                    Amount
                  </th>
                  <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                    Balance After
                  </th>
                </tr>
              </thead>

              <tbody>
                {transactionsLoading ? (
                  <tr>
                    <td colSpan="6" className="py-16 text-center">
                      <Loader2
                        size={22}
                        className="mx-auto animate-spin text-cyan-500"
                      />
                      <p className="mt-3 text-xs text-zinc-500">
                        Loading transactions...
                      </p>
                    </td>
                  </tr>
                ) : transactions.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-16 text-center">
                      <EmptyState message="No transactions found." />
                    </td>
                  </tr>
                ) : (
                  transactions.map((item) => {
                    const amount = Number(item.amount || 0);
                    const isCredit = amount > 0;

                    return (
                      <tr
                        key={item.id}
                        className="border-b border-black/[0.05] transition hover:bg-zinc-50/70 dark:border-white/[0.05] dark:hover:bg-white/[0.02]"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={
                                isCredit
                                  ? "flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                  : "flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-600 dark:text-red-400"
                              }
                            >
                              {isCredit ? (
                                <ArrowDownLeft size={16} />
                              ) : (
                                <ArrowUpRight size={16} />
                              )}
                            </div>

                            <div>
                              <p className="text-xs font-semibold">
                                {getTransactionLabel(item.type)}
                              </p>

                              <span
                                className={
                                  "mt-1 inline-flex rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase " +
                                  getTransactionStyle(item.type)
                                }
                              >
                                {item.type}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="max-w-[220px] px-5 py-4 text-xs text-zinc-500">
                          <span className="line-clamp-2">
                            {item.description || "—"}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-xs text-zinc-500">
                          {item.reference || "—"}
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 text-xs text-zinc-500">
                          {formatDate(item.created_at)}
                        </td>

                        <td
                          className={
                            "whitespace-nowrap px-5 py-4 text-right text-xs font-bold " +
                            (isCredit
                              ? "text-emerald-600 dark:text-emerald-400"
                              : amount < 0
                                ? "text-red-600 dark:text-red-400"
                                : "text-zinc-600 dark:text-zinc-400")
                          }
                        >
                          {amount > 0 ? "+" : ""}
                          {formatCredits(amount)}
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                          {formatCredits(item.balance_after)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>

            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col gap-3 border-t border-black/[0.06] px-5 py-3 dark:border-white/[0.06] sm:flex-row sm:items-center sm:justify-between">

            <p className="text-[11px] text-zinc-500">
              Showing{" "}
              {transactionTotal === 0 ? 0 : offset + 1}
              {" - "}
              {Math.min(offset + transactions.length, transactionTotal)}
              {" of "}
              {transactionTotal} transactions
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setOffset(Math.max(0, offset - PAGE_LIMIT))
                }
                disabled={offset === 0 || transactionsLoading}
                className="flex h-8 items-center gap-1 rounded-lg border border-black/[0.08] px-3 text-[11px] font-medium text-zinc-600 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/[0.08] dark:text-zinc-400 dark:hover:bg-white/[0.04]"
              >
                <ChevronLeft size={13} />
                Previous
              </button>

              <span className="text-[11px] text-zinc-500">
                Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setOffset(offset + PAGE_LIMIT)}
                disabled={
                  offset + PAGE_LIMIT >= transactionTotal ||
                  transactionsLoading
                }
                className="flex h-8 items-center gap-1 rounded-lg border border-black/[0.08] px-3 text-[11px] font-medium text-zinc-600 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/[0.08] dark:text-zinc-400 dark:hover:bg-white/[0.04]"
              >
                Next
                <ChevronRight size={13} />
              </button>
            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

// ============================================================
// SUMMARY CARD
// ============================================================

function SummaryCard({
  title,
  icon: Icon,
  value,
  description,
  loading,
  highlight,
}) {
  return (
    <div
      className={
        "rounded-xl border p-5 " +
        (highlight
          ? "border-cyan-500/25 bg-cyan-500/[0.04]"
          : "border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]")
      }
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium text-zinc-500">
          {title}
        </p>

        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
          <Icon size={16} />
        </div>
      </div>

      {loading ? (
        <div className="mt-4 h-8 w-24 animate-pulse rounded bg-zinc-200 dark:bg-white/[0.08]" />
      ) : (
        <h2 className="mt-3 text-2xl font-bold tabular-nums">
          {value}
        </h2>
      )}

      <p className="mt-2 text-[10px] text-zinc-500">
        {description}
      </p>
    </div>
  );
}

// ============================================================
// USAGE SUMMARY
// ============================================================

function UsageSummary({ title, value, icon: Icon, loading }) {
  return (
    <div className="rounded-xl border border-black/[0.06] bg-zinc-50/70 p-4 dark:border-white/[0.06] dark:bg-white/[0.02]">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-medium text-zinc-500">
          {title}
        </p>
        <Icon size={15} className="text-cyan-500" />
      </div>

      {loading ? (
        <div className="mt-3 h-7 w-20 animate-pulse rounded bg-zinc-200 dark:bg-white/[0.08]" />
      ) : (
        <p className="mt-3 text-xl font-bold tabular-nums">
          {value}
        </p>
      )}
    </div>
  );
}

// ============================================================
// EMPTY STATE
// ============================================================

function EmptyState({ message }) {
  return (
    <div className="py-8 text-center">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100 text-zinc-400 dark:bg-white/[0.04]">
        <Coins size={20} />
      </div>

      <p className="mt-3 text-xs text-zinc-500">
        {message}
      </p>
    </div>
  );
}

// ============================================================
// ERROR MESSAGE
// ============================================================

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-600 dark:text-red-400">
      <AlertCircle size={15} />
      <span className="flex-1">{message}</span>

      <button
        onClick={onRetry}
        className="font-semibold underline underline-offset-2"
      >
        Retry
      </button>
    </div>
  );
}
