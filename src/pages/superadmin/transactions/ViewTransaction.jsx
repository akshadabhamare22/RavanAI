
import React from "react";
import {
  X,
  ReceiptText,
  Building2,
  CalendarDays,
  Coins,
  UserRound,
  Phone,
  Hash,
  FileText,
  Wallet,
} from "lucide-react";

const formatCredits = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number)) return "—";

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
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
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

const DetailItem = ({ icon: Icon, label, value, breakAll = false }) => (
  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-zinc-800 dark:bg-[#191C1F]">
    <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-zinc-400">
      <Icon size={15} />
      {label}
    </div>

    <p
      className={`text-sm font-semibold text-slate-800 dark:text-zinc-100 ${
        breakAll ? "break-all" : "break-words"
      }`}
    >
      {value || "—"}
    </p>
  </div>
);

const ViewTransaction = ({ transaction, organization, onClose }) => {
  if (!transaction) return null;

  const amount = Number(transaction.amount);
  const isPositive = Number.isFinite(amount) && amount > 0;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-5"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="transaction-details-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-[#111315]"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 dark:border-zinc-800 dark:bg-[#111315] sm:px-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#275982]/10 p-2.5 text-[#275982]">
              <ReceiptText size={21} />
            </div>

            <div>
              <h2
                id="transaction-details-title"
                className="text-lg font-bold text-slate-900 dark:text-zinc-100"
              >
                Transaction Details
              </h2>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-zinc-400">
                Complete transaction information
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close transaction details"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-[#191C1F] dark:hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          {/* Amount summary */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-zinc-800 dark:bg-[#191C1F]">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-slate-500 dark:text-zinc-400">
                  Transaction Amount
                </p>

                <p
                  className={`mt-2 text-3xl font-bold tabular-nums ${
                    isPositive ? "text-emerald-500" : "text-orange-500"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {formatCredits(transaction.amount)}
                </p>
              </div>

              <span
                className={`inline-flex w-fit items-center rounded-full border px-3 py-1.5 text-xs font-semibold capitalize ${getTypeStyle(
                  transaction.type
                )}`}
              >
                {transaction.type || "Unknown"}
              </span>
            </div>
          </div>

          {/* Transaction information */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-800 dark:text-zinc-200">
              Transaction Information
            </h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <DetailItem
                icon={Hash}
                label="Transaction ID"
                value={transaction.id}
                breakAll
              />

              <DetailItem
                icon={Wallet}
                label="Balance After Transaction"
                value={formatCredits(transaction.balance_after)}
              />

              <DetailItem
                icon={CalendarDays}
                label="Created At"
                value={formatDate(transaction.created_at)}
              />

              <DetailItem
                icon={Hash}
                label="Reference"
                value={transaction.reference}
                breakAll
              />

              <DetailItem
                icon={Phone}
                label="Call ID"
                value={transaction.call_id}
                breakAll
              />

              <DetailItem
                icon={UserRound}
                label="Created By (User ID)"
                value={transaction.created_by}
                breakAll
              />
            </div>
          </div>

          {/* Organization */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-800 dark:text-zinc-200">
              Organization
            </h3>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-zinc-800 dark:bg-[#191C1F]">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-[#275982]/10 p-2 text-[#275982]">
                  <Building2 size={19} />
                </div>

                <div className="min-w-0">
                  <p className="break-words text-sm font-semibold text-slate-800 dark:text-zinc-100">
                    {organization?.name || "Organization"}
                  </p>

                  {organization?.email && (
                    <p className="mt-1 break-all text-xs text-slate-500 dark:text-zinc-400">
                      {organization.email}
                    </p>
                  )}

                  {organization?.id && (
                    <p className="mt-1 break-all text-xs text-slate-400 dark:text-zinc-500">
                      ID: {organization.id}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-800 dark:text-zinc-200">
              Description
            </h3>

            <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-zinc-800 dark:bg-[#191C1F]">
              <FileText
                size={17}
                className="mt-0.5 shrink-0 text-slate-400"
              />

              <p className="whitespace-pre-wrap break-words text-sm text-slate-700 dark:text-zinc-300">
                {transaction.description || "No description provided."}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-200 px-5 py-4 dark:border-zinc-800 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#275982] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1f496b]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTransaction;
