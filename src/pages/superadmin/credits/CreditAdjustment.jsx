
import React, { useState } from "react";
import {
  Coins,
  ArrowUpCircle,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import Config from "../../../config/Config";

const CreditAdjustment = ({
  organization,
  token,
  onSuccess,
  onError,
}) => {
  const [formData, setFormData] = useState({
    type: "grant",
    amount: "",
    description: "",
    reference: "",
  });

  const [loading, setLoading] = useState(false);
  const [localMessage, setLocalMessage] = useState("");
  const [localError, setLocalError] = useState("");

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#275982] focus:ring-2 focus:ring-[#275982]/20 dark:border-zinc-700 dark:bg-[#111315] dark:text-zinc-100 dark:placeholder:text-zinc-500";

  const mutedText = "text-slate-500 dark:text-zinc-400";

  const cardClass =
    "rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-zinc-800 dark:bg-[#111315]";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setLocalError("");
    setLocalMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLocalError("");
    setLocalMessage("");

    if (!organization?.id) {
      const message = "Please select an organization first.";
      setLocalError(message);
      onError?.(message);
      return;
    }

    if (!token) {
      const message = "Authentication token is missing. Please log in again.";
      setLocalError(message);
      onError?.(message);
      return;
    }

    const amount = Number(formData.amount);

    if (
      formData.amount.trim() === "" ||
      !Number.isFinite(amount) ||
      amount === 0
    ) {
      const message = "Enter a valid non-zero credit amount.";
      setLocalError(message);
      onError?.(message);
      return;
    }

    if (amount < 0 && formData.type !== "adjustment") {
      const message =
        "Negative amounts are allowed only for adjustment type.";

      setLocalError(message);
      onError?.(message);
      return;
    }

    if (
      amount < 0 &&
      !window.confirm(
        "You are reducing the organization's credit balance. Continue?"
      )
    ) {
      return;
    }

    if (formData.description.trim().length > 500) {
      const message = "Description cannot exceed 500 characters.";
      setLocalError(message);
      onError?.(message);
      return;
    }

    if (formData.reference.trim().length > 120) {
      const message = "Reference cannot exceed 120 characters.";
      setLocalError(message);
      onError?.(message);
      return;
    }

    const payload = {
      type: formData.type,
      amount,
      description: formData.description.trim() || null,
      reference: formData.reference.trim() || null,
    };

    setLoading(true);

    try {
      const response = await fetch(
        `${Config.BASE_URL}/admin/organizations/${encodeURIComponent(
          organization.id
        )}/credits`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        let message = "Unable to adjust credits.";

        try {
          const data = await response.json();

          message =
            data.detail ||
            data.message ||
            data.error ||
            message;
        } catch {
          // Keep fallback error message.
        }

        throw new Error(
          typeof message === "string"
            ? message
            : "Unable to adjust credits."
        );
      }

      setFormData({
        type: "grant",
        amount: "",
        description: "",
        reference: "",
      });

      const message = "Credit adjustment completed successfully.";

      setLocalMessage(message);
      setLocalError("");

      onSuccess?.(message);
    } catch (err) {
      const message =
        err.message || "Unable to adjust credits.";

      setLocalError(message);
      setLocalMessage("");

      onError?.(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

      {/* Adjustment Form */}
      <div className="xl:col-span-2">
        <form
          onSubmit={handleSubmit}
          className={`${cardClass} md:p-6`}
        >
          {/* Form Header */}
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-3 text-[#275982] dark:bg-[#191C1F] dark:text-blue-300">
              <Coins size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold">
                Adjust Organization Credits
              </h2>

              <p className={`mt-1 text-sm ${mutedText}`}>
                Add or adjust credits for the selected organization.
              </p>
            </div>
          </div>

          {/* Selected Organization */}
          <div className="mb-5 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-zinc-800 dark:bg-[#191C1F]">
            <p className={`text-xs ${mutedText}`}>
              Selected Organization
            </p>

            <p className="mt-1 font-semibold">
              {organization?.name || "No organization selected"}
            </p>

            <p className={`text-xs ${mutedText}`}>
              {organization?.email || ""}
            </p>
          </div>

          {/* Error Message */}
          {localError && (
            <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-[#191C1F] dark:text-red-300">
              <AlertCircle
                size={17}
                className="mt-0.5 shrink-0"
              />

              <span>{localError}</span>
            </div>
          )}

          {/* Success Message */}
          {localMessage && (
            <div className="mb-4 flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700 dark:border-green-900/60 dark:bg-[#191C1F] dark:text-green-300">
              <CheckCircle2
                size={17}
                className="mt-0.5 shrink-0"
              />

              <span>{localMessage}</span>
            </div>
          )}

          <div className="space-y-5">

            {/* Adjustment Type */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Adjustment Type{" "}
                <span className="text-red-500">*</span>
              </label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                disabled={loading}
                className={inputClass}
              >
                <option value="grant">Grant</option>
                <option value="purchase">Purchase</option>
                <option value="refund">Refund</option>
                <option value="adjustment">Adjustment</option>
              </select>
            </div>

            {/* Credit Amount */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Credit Amount{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter credit amount"
                step="0.01"
                required
                disabled={loading}
                className={inputClass}
              />

              <p className={`mt-2 text-xs ${mutedText}`}>
                Use a positive value to add credits. Negative values
                are permitted only for Adjustment.
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter adjustment description"
                rows={3}
                maxLength={500}
                disabled={loading}
                className={`${inputClass} resize-none`}
              />

              <p className={`mt-1 text-right text-xs ${mutedText}`}>
                {formData.description.length}/500
              </p>
            </div>

            {/* Reference */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Reference
              </label>

              <input
                type="text"
                name="reference"
                value={formData.reference}
                onChange={handleChange}
                placeholder="Enter transaction reference"
                maxLength={120}
                disabled={loading}
                className={inputClass}
              />

              <p className={`mt-1 text-xs ${mutedText}`}>
                Optional transaction or payment reference.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !organization?.id}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#275982] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1e4565] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />

                  Processing...
                </>
              ) : (
                <>
                  <ArrowUpCircle size={18} />
                  Submit Credit Adjustment
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Right Side Information */}
      <div className="space-y-4">

        {/* Adjustment Guidelines */}
        <div className={cardClass}>
          <h3 className="font-semibold">
            Adjustment Guidelines
          </h3>

          <div className="mt-4 space-y-4 text-sm">

            <div>
              <p className="font-semibold text-green-600 dark:text-green-400">
                Grant
              </p>

              <p className={`mt-1 ${mutedText}`}>
                Add complimentary or allocated credits.
              </p>
            </div>

            <div>
              <p className="font-semibold text-blue-600 dark:text-blue-400">
                Purchase
              </p>

              <p className={`mt-1 ${mutedText}`}>
                Add credits associated with a purchase.
              </p>
            </div>

            <div>
              <p className="font-semibold text-purple-600 dark:text-purple-400">
                Refund
              </p>

              <p className={`mt-1 ${mutedText}`}>
                Add credits as a refund.
              </p>
            </div>

            <div>
              <p className="font-semibold text-orange-600 dark:text-orange-400">
                Adjustment
              </p>

              <p className={`mt-1 ${mutedText}`}>
                Make a manual correction. This type also permits
                negative amounts.
              </p>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 transition-colors duration-300 dark:border-amber-900/50 dark:bg-[#191C1F] dark:text-amber-300">
          <div className="flex items-start gap-2">
            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <p>
              Verify the organization and amount before submitting.
              Credit adjustments are sent directly to the backend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditAdjustment;
