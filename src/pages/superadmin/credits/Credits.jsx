
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Wallet,
  Building2,
  RefreshCw,
  Coins,
  TrendingUp,
  Clock,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

import Config from "../../../config/Config";
import CreditAdjustment from "./CreditAdjustment";
import CreditTransactions from "./CreditTransactions";

const getToken = () => {
  try {
    const auth = JSON.parse(
      localStorage.getItem("ravanai_auth") || "{}"
    );

    return (
      localStorage.getItem("access_token") ||
      auth.token ||
      auth.access_token ||
      ""
    );
  } catch {
    return localStorage.getItem("access_token") || "";
  }
};

const formatNumber = (value, decimals = 2) => {
  const number = Number(value ?? 0);

  if (!Number.isFinite(number)) return "0";

  return number.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
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

const Credits = () => {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [balance, setBalance] = useState(null);
  const [usage, setUsage] = useState([]);

  const [loadingOrganizations, setLoadingOrganizations] = useState(true);
  const [loadingBalance, setLoadingBalance] = useState(false);
  const [loadingUsage, setLoadingUsage] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [usageDays, setUsageDays] = useState(30);
  const [activeTab, setActiveTab] = useState("overview");

  const token = getToken();

  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
    [token]
  );

  // Fetch all organizations for the Superadmin selector.
  const fetchOrganizations = useCallback(async () => {
    setLoadingOrganizations(true);
    setError("");

    try {
      const response = await fetch(
        `${Config.BASE_URL}/admin/organizations?limit=200&offset=0`,
        { headers }
      );

      if (!response.ok) {
        throw new Error(
          await getErrorMessage(
            response,
            "Unable to load organizations."
          )
        );
      }

      const data = await response.json();
      const items = Array.isArray(data.items) ? data.items : [];

      setOrganizations(items);

      if (items.length > 0) {
        setSelectedOrg((current) => {
          if (current && items.some((org) => org.id === current)) {
            return current;
          }

          return items[0].id;
        });
      } else {
        setSelectedOrg("");
        setBalance(null);
        setUsage([]);
      }
    } catch (err) {
      setError(err.message || "Unable to load organizations.");
      setOrganizations([]);
      setSelectedOrg("");
      setBalance(null);
      setUsage([]);
    } finally {
      setLoadingOrganizations(false);
    }
  }, [headers]);

  // Fetch the selected organization's credit balance.
  const fetchBalance = useCallback(async () => {
    if (!selectedOrg) {
      setBalance(null);
      return;
    }

    setLoadingBalance(true);

    try {
      const response = await fetch(
        `${Config.BASE_URL}/billing/balance?client_id=${encodeURIComponent(
          selectedOrg
        )}`,
        { headers }
      );

      if (!response.ok) {
        throw new Error(
          await getErrorMessage(
            response,
            "Unable to load credit balance."
          )
        );
      }

      const data = await response.json();
      setBalance(data);
    } catch (err) {
      setBalance(null);
      setError(err.message || "Unable to load credit balance.");
    } finally {
      setLoadingBalance(false);
    }
  }, [selectedOrg, headers]);

  // Fetch usage records for the selected organization.
  const fetchUsage = useCallback(async () => {
    if (!selectedOrg) {
      setUsage([]);
      return;
    }

    setLoadingUsage(true);

    try {
      const response = await fetch(
        `${Config.BASE_URL}/billing/usage?client_id=${encodeURIComponent(
          selectedOrg
        )}&days=${usageDays}`,
        { headers }
      );

      if (!response.ok) {
        throw new Error(
          await getErrorMessage(
            response,
            "Unable to load credit usage."
          )
        );
      }

      const data = await response.json();
      setUsage(Array.isArray(data) ? data : []);
    } catch (err) {
      setUsage([]);
      setError(err.message || "Unable to load credit usage.");
    } finally {
      setLoadingUsage(false);
    }
  }, [selectedOrg, usageDays, headers]);

  // Refresh balance and usage together.
  const refreshData = useCallback(async () => {
    if (!selectedOrg) return;

    setRefreshing(true);
    setError("");
    setSuccess("");

    try {
      await Promise.all([
        fetchBalance(),
        fetchUsage(),
      ]);
    } finally {
      setRefreshing(false);
    }
  }, [selectedOrg, fetchBalance, fetchUsage]);

  // Initial organization loading.
  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  // Reload billing information when organization or usage period changes.
  useEffect(() => {
    if (selectedOrg) {
      setError("");
      fetchBalance();
      fetchUsage();
    }
  }, [selectedOrg, usageDays, fetchBalance, fetchUsage]);

  const selectedOrganization = organizations.find(
    (org) => org.id === selectedOrg
  );

  const totalUsageCredits = usage.reduce(
    (sum, item) => sum + Number(item.credits || 0),
    0
  );

  const totalUsageMinutes = usage.reduce(
    (sum, item) => sum + Number(item.minutes || 0),
    0
  );

  const totalUsageCalls = usage.reduce(
    (sum, item) => sum + Number(item.calls || 0),
    0
  );

  const statCards = [
    {
      title: "Available Credits",
      value: formatNumber(balance?.credit_balance),
      description: "Current credit balance",
      icon: Wallet,
    },
    {
      title: "Credits Used This Month",
      value: formatNumber(balance?.credits_spent_this_month),
      description: "Monthly credit consumption",
      icon: TrendingUp,
    },
    {
      title: "Minutes This Month",
      value: formatNumber(balance?.minutes_this_month),
      description: "Total usage minutes",
      icon: Clock,
    },
    {
      title: "Credits Per Minute",
      value: formatNumber(balance?.credits_per_minute),
      description: "Current billing rate",
      icon: Coins,
    },
  ];

  const cardClass =
    "rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-zinc-800 dark:bg-[#111315]";

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-[#275982] focus:ring-2 focus:ring-[#275982]/20 dark:border-zinc-700 dark:bg-[#111315] dark:text-zinc-100";

  const mutedText = "text-slate-500 dark:text-zinc-400";

  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-4 text-slate-900 transition-colors duration-300 dark:bg-[#08090B] dark:text-zinc-100 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-100 p-3 text-blue-700 dark:bg-[#191C1F] dark:text-blue-300">
            <Wallet size={25} />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              Credit Management
            </h1>

            <p className={`mt-1 text-sm ${mutedText}`}>
              Manage organization credits, usage and transactions.
            </p>
          </div>
        </div>

        <button
          onClick={refreshData}
          disabled={!selectedOrg || refreshing}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#275982] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1e4565] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={refreshing ? "animate-spin" : ""}
          />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Organization Selector */}
      <div className={cardClass}>
        <label className="mb-2 block text-sm font-semibold">
          Select Organization
        </label>

        <div className="relative max-w-xl">
          <Building2
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500"
          />

          <select
            value={selectedOrg}
            onChange={(e) => {
              setSelectedOrg(e.target.value);
              setBalance(null);
              setUsage([]);
              setError("");
              setSuccess("");
            }}
            disabled={loadingOrganizations || organizations.length === 0}
            className={`${inputClass} appearance-none pl-10 pr-10`}
          >
            {loadingOrganizations && (
              <option value="">Loading organizations...</option>
            )}

            {!loadingOrganizations && organizations.length === 0 && (
              <option value="">No organizations available</option>
            )}

            {organizations.map((org) => (
              <option key={org.id} value={org.id}>
                {org.name} ({org.email})
              </option>
            ))}
          </select>

          <ChevronDown
            size={17}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500"
          />
        </div>

        {selectedOrganization && (
          <p className={`mt-2 text-xs ${mutedText}`}>
            Selected: {selectedOrganization.name} ·{" "}
            {selectedOrganization.email}
          </p>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-[#191C1F] dark:text-red-300">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700 dark:border-green-900/60 dark:bg-[#191C1F] dark:text-green-300">
          {success}
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-zinc-800">
        {[
          { id: "overview", label: "Overview" },
          { id: "adjustment", label: "Credit Adjustment" },
          { id: "transactions", label: "Transactions" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`border-b-2 px-4 py-3 text-sm font-semibold transition ${
              activeTab === tab.id
                ? "border-[#275982] text-[#275982] dark:text-blue-300"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* No Organization */}
      {!selectedOrg && !loadingOrganizations && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-zinc-700 dark:bg-[#111315]">
          <Building2
            className="mx-auto mb-3 text-slate-400 dark:text-zinc-500"
            size={35}
          />

          <h3 className="font-semibold">
            No organization selected
          </h3>

          <p className={`mt-1 text-sm ${mutedText}`}>
            Create an organization before managing its credits.
          </p>
        </div>
      )}

      {/* Overview Tab */}
      {selectedOrg && activeTab === "overview" && (
        <>
          {/* Credit Statistics */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {statCards.map((card) => {
              const Icon = card.icon;

              return (
                <div key={card.title} className={cardClass}>
                  <div className="flex items-center justify-between gap-3">
                    <p className={`text-sm font-medium ${mutedText}`}>
                      {card.title}
                    </p>

                    <div className="rounded-lg bg-blue-50 p-2 text-[#275982] dark:bg-[#191C1F] dark:text-blue-300">
                      <Icon size={19} />
                    </div>
                  </div>

                  <h2 className="mt-4 text-2xl font-bold">
                    {loadingBalance ? "..." : card.value}
                  </h2>

                  <p className={`mt-1 text-xs ${mutedText}`}>
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Configuration and Usage Summary */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

            {/* Credit Configuration */}
            <div className={cardClass}>
              <h3 className="font-semibold">
                Credit Configuration
              </h3>

              <div className="mt-4 space-y-4">
                <div className="flex justify-between gap-4 text-sm">
                  <span className={mutedText}>
                    Low Credit Threshold
                  </span>

                  <strong>
                    {loadingBalance
                      ? "..."
                      : formatNumber(balance?.low_credit_threshold)}
                  </strong>
                </div>

                <div className="flex justify-between gap-4 text-sm">
                  <span className={mutedText}>
                    Credits Per Minute
                  </span>

                  <strong>
                    {loadingBalance
                      ? "..."
                      : formatNumber(balance?.credits_per_minute)}
                  </strong>
                </div>

                <div className="flex justify-between gap-4 text-sm">
                  <span className={mutedText}>
                    Organization Status
                  </span>

                  <strong className="capitalize">
                    {selectedOrganization?.status || "—"}
                  </strong>
                </div>
              </div>
            </div>

            {/* Usage Summary */}
            <div className={cardClass}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-semibold">
                  Usage Summary
                </h3>

                <select
                  value={usageDays}
                  onChange={(e) => setUsageDays(Number(e.target.value))}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#275982] dark:border-zinc-700 dark:bg-[#111315] dark:text-zinc-100"
                >
                  <option value={7}>Last 7 days</option>
                  <option value={30}>Last 30 days</option>
                  <option value={90}>Last 90 days</option>
                  <option value={180}>Last 180 days</option>
                  <option value={365}>Last 365 days</option>
                </select>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <div>
                  <p className={`text-xs ${mutedText}`}>
                    Calls
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    {loadingUsage
                      ? "..."
                      : formatNumber(totalUsageCalls, 0)}
                  </p>
                </div>

                <div>
                  <p className={`text-xs ${mutedText}`}>
                    Minutes
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    {loadingUsage
                      ? "..."
                      : formatNumber(totalUsageMinutes)}
                  </p>
                </div>

                <div>
                  <p className={`text-xs ${mutedText}`}>
                    Credits
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    {loadingUsage
                      ? "..."
                      : formatNumber(totalUsageCredits)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Credit Usage Table */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-zinc-800 dark:bg-[#111315]">
            <div className="border-b border-slate-200 p-5 dark:border-zinc-800">
              <h3 className="font-semibold">
                Daily Credit Usage
              </h3>

              <p className={`mt-1 text-xs ${mutedText}`}>
                Usage returned by the billing API.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-[#191C1F] dark:text-zinc-400">
                  <tr>
                    <th className="px-5 py-3 font-semibold">
                      Date
                    </th>

                    <th className="px-5 py-3 font-semibold">
                      Calls
                    </th>

                    <th className="px-5 py-3 font-semibold">
                      Minutes
                    </th>

                    <th className="px-5 py-3 font-semibold">
                      Credits Used
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                  {loadingUsage ? (
                    <tr>
                      <td
                        colSpan="4"
                        className={`px-5 py-8 text-center ${mutedText}`}
                      >
                        Loading usage...
                      </td>
                    </tr>
                  ) : usage.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className={`px-5 py-8 text-center ${mutedText}`}
                      >
                        No usage records found.
                      </td>
                    </tr>
                  ) : (
                    usage.map((item, index) => (
                      <tr
                        key={`${item.date}-${index}`}
                        className="transition hover:bg-slate-50 dark:hover:bg-[#191C1F]"
                      >
                        <td className="px-5 py-3">
                          {item.date}
                        </td>

                        <td className="px-5 py-3">
                          {formatNumber(item.calls, 0)}
                        </td>

                        <td className="px-5 py-3">
                          {formatNumber(item.minutes)}
                        </td>

                        <td className="px-5 py-3 font-semibold">
                          {formatNumber(item.credits)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Credit Adjustment Tab */}
      {selectedOrg && activeTab === "adjustment" && (
        <CreditAdjustment
          organization={selectedOrganization}
          token={token}
          onSuccess={(message) => {
            setSuccess(message);
            setError("");
            refreshData();
          }}
          onError={(message) => {
            setError(message);
            setSuccess("");
          }}
        />
      )}

      {/* Transactions Tab */}
      {selectedOrg && activeTab === "transactions" && (
        <CreditTransactions
          organization={selectedOrganization}
          token={token}
        />
      )}
    </div>
  );
};

export default Credits;
