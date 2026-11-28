
import React, { useCallback, useEffect, useState } from "react";
import {
  ReceiptText,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ArrowDownCircle,
  ArrowUpCircle,
  Filter,
  AlertCircle,
} from "lucide-react";

import Config from "../../../config/Config";

const PAGE_SIZE = 10;

const formatNumber = (value) => {
  const number = Number(value ?? 0);

  if (!Number.isFinite(number)) return "0";

  return number.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const getErrorMessage = async (response, fallback) => {
  try {
    const data = await response.json();

    const message =
      data.detail ||
      data.message ||
      data.error ||
      fallback;

    return typeof message === "string" ? message : fallback;
  } catch {
    return fallback;
  }
};

const CreditTransactions = ({ organization, token }) => {
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Shared styling with the Credits module.
  const cardClass =
    "overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-zinc-800 dark:bg-[#111315]";

  const mutedText = "text-slate-500 dark:text-zinc-400";

  const fetchTransactions = useCallback(async () => {
    if (!organization?.id) {
      setTransactions([]);
      setTotal(0);
      setError("");
      return;
    }

    if (!token) {
      setTransactions([]);
      setTotal(0);
      setError("Authentication token is missing. Please log in again.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        client_id: organization.id,
        limit: String(PAGE_SIZE),
        offset: String(page * PAGE_SIZE),
      });

      if (type) {
        params.set("type", type);
      }

      const response = await fetch(
        `${Config.BASE_URL}/billing/transactions?${params.toString()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          await getErrorMessage(
            response,
            "Unable to load transactions."
          )
        );
      }

      const data = await response.json();

      setTransactions(
        Array.isArray(data.items) ? data.items : []
      );

      setTotal(Number(data.total || 0));
    } catch (err) {
      setTransactions([]);
      setTotal(0);
      setError(err.message || "Unable to load transactions.");
    } finally {
      setLoading(false);
    }
  }, [organization?.id, token, page, type]);

  // Reset pagination when organization or filter changes.
  useEffect(() => {
    setPage(0);
  }, [organization?.id, type]);

  // Fetch transactions whenever filters or page changes.
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const totalPages = Math.ceil(total / PAGE_SIZE);
  const currentPage = page + 1;

  const getTypeStyle = (transactionType) => {
    const styles = {
      grant:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",

      purchase:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",

      refund:
        "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",

      adjustment:
        "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",

      usage:
        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    };

    return (
      styles[transactionType] ||
      "bg-slate-100 text-slate-700 dark:bg-[#191C1F] dark:text-zinc-300"
    );
  };

  const handlePrevious = () => {
    setPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setPage((prev) =>
      Math.min(Math.max(totalPages - 1, 0), prev + 1)
    );
  };

  const startRecord = total === 0 ? 0 : page * PAGE_SIZE + 1;

  const endRecord = Math.min(
    (page + 1) * PAGE_SIZE,
    total
  );

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <ReceiptText size={21} className="text-[#275982]" />
            Credit Transactions
          </h2>

          <p className={`mt-1 text-sm ${mutedText}`}>
            Transaction history for{" "}
            {organization?.name || "selected organization"}.
          </p>
        </div>

        <button
          onClick={fetchTransactions}
          disabled={loading || !organization?.id}
          className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-[#111315] dark:text-zinc-200 dark:hover:bg-[#191C1F]"
        >
          <RefreshCw
            size={15}
            className={loading ? "animate-spin" : ""}
          />

          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-zinc-800 dark:bg-[#111315] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Filter
            size={17}
            className="text-slate-500 dark:text-zinc-400"
          />

          Filter Transactions
        </div>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          disabled={loading}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#275982] focus:ring-2 focus:ring-[#275982]/20 disabled:opacity-60 dark:border-zinc-700 dark:bg-[#111315] dark:text-zinc-100 sm:w-auto"
        >
          <option value="">All Transaction Types</option>
          <option value="grant">Grant</option>
          <option value="purchase">Purchase</option>
          <option value="usage">Usage</option>
          <option value="refund">Refund</option>
          <option value="adjustment">Adjustment</option>
        </select>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-[#191C1F] dark:text-red-300">
          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0"
          />

          <span>{error}</span>
        </div>
      )}

      {/* Transaction Table */}
      <div className={cardClass}>

        {/* Table Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 p-5 dark:border-zinc-800">
          <h3 className="font-semibold">
            Transaction History
          </h3>

          <p className={`text-xs ${mutedText}`}>
            {total.toLocaleString("en-IN")} total transactions
          </p>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left text-sm">

            <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-[#191C1F] dark:text-zinc-400">
              <tr>
                <th className="px-5 py-4 font-semibold">
                  Transaction
                </th>

                <th className="px-5 py-4 font-semibold">
                  Type
                </th>

                <th className="px-5 py-4 font-semibold">
                  Amount
                </th>

                <th className="px-5 py-4 font-semibold">
                  Balance After
                </th>

                <th className="px-5 py-4 font-semibold">
                  Description
                </th>

                <th className="px-5 py-4 font-semibold">
                  Reference
                </th>

                <th className="px-5 py-4 font-semibold">
                  Date
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">

              {/* Loading */}
              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className={`px-5 py-10 text-center ${mutedText}`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw
                        size={16}
                        className="animate-spin"
                      />

                      Loading transactions...
                    </div>
                  </td>
                </tr>

              ) : transactions.length === 0 ? (

                /* Empty State */
                <tr>
                  <td
                    colSpan="7"
                    className={`px-5 py-10 text-center ${mutedText}`}
                  >
                    <ReceiptText
                      size={30}
                      className="mx-auto mb-2 opacity-50"
                    />

                    No transactions found.
                  </td>
                </tr>

              ) : (

                /* Transaction Rows */
                transactions.map((transaction) => {
                  const amount = Number(transaction.amount || 0);
                  const isNegative = amount < 0;

                  return (
                    <tr
                      key={transaction.id}
                      className="transition hover:bg-slate-50 dark:hover:bg-[#191C1F]"
                    >
                      {/* Transaction ID */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {isNegative ? (
                            <ArrowDownCircle
                              size={19}
                              className="shrink-0 text-red-500"
                            />
                          ) : (
                            <ArrowUpCircle
                              size={19}
                              className="shrink-0 text-green-500"
                            />
                          )}

                          <span
                            className="font-medium"
                            title={transaction.id || ""}
                          >
                            {transaction.id
                              ? `${transaction.id.slice(0, 8)}...`
                              : "—"}
                          </span>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${getTypeStyle(
                            transaction.type
                          )}`}
                        >
                          {transaction.type || "—"}
                        </span>
                      </td>

                      {/* Amount */}
                      <td
                        className={`px-5 py-4 font-semibold ${
                          isNegative
                            ? "text-red-600 dark:text-red-400"
                            : "text-green-600 dark:text-green-400"
                        }`}
                      >
                        {isNegative ? "" : "+"}
                        {formatNumber(amount)}
                      </td>

                      {/* Balance */}
                      <td className="px-5 py-4 font-medium">
                        {formatNumber(transaction.balance_after)}
                      </td>

                      {/* Description */}
                      <td
                        className="max-w-[220px] truncate px-5 py-4 text-slate-600 dark:text-zinc-300"
                        title={transaction.description || ""}
                      >
                        {transaction.description || "—"}
                      </td>

                      {/* Reference */}
                      <td
                        className={`max-w-[180px] truncate px-5 py-4 ${mutedText}`}
                        title={transaction.reference || ""}
                      >
                        {transaction.reference || "—"}
                      </td>

                      {/* Date */}
                      <td className={`whitespace-nowrap px-5 py-4 ${mutedText}`}>
                        {formatDate(transaction.created_at)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col justify-between gap-3 border-t border-slate-200 px-5 py-4 dark:border-zinc-800 sm:flex-row sm:items-center">

          <p className={`text-xs ${mutedText}`}>
            {total === 0
              ? "Showing 0 transactions"
              : `Showing ${startRecord}–${endRecord} of ${total}`}
          </p>

          <div className="flex items-center gap-2">

            {/* Previous */}
            <button
              onClick={handlePrevious}
              disabled={page === 0 || loading}
              className="flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:bg-[#111315] dark:text-zinc-200 dark:hover:bg-[#191C1F]"
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            {/* Current Page */}
            <span className="whitespace-nowrap px-2 text-sm text-slate-500 dark:text-zinc-400">
              {totalPages === 0 ? 0 : currentPage} / {totalPages}
            </span>

            {/* Next */}
            <button
              onClick={handleNext}
              disabled={
                currentPage >= totalPages ||
                loading ||
                totalPages === 0
              }
              className="flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:bg-[#111315] dark:text-zinc-200 dark:hover:bg-[#191C1F]"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditTransactions;
