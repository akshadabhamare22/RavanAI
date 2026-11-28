
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  HelpCircle,
  Link2,
  LayoutGrid,
  Activity,
  Search,
  ChevronDown,
  Grid3X3,
  List,
  Shield,
  RefreshCw,
  Plug,
  Webhook,
  Headphones,
  ExternalLink,
  Info,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Unplug,
} from "lucide-react";

import integrationsApiService, {
  getIntegrationApiError,
} from "./integrationsApi";

// ============================================================
// INTEGRATION DEFINITIONS
// ============================================================

const INITIAL_INTEGRATIONS = [
  {
    id: "gohighlevel",
    provider: "ghl",
    name: "GoHighLevel",
    category: "CRM & Marketing Automation",
    description:
      "Manage CRM contacts, sync calendars, and automate appointments with GHL.",
    color: "cyan",
    supported: true,
  },
  {
    id: "salesforce",
    provider: "salesforce",
    name: "Salesforce",
    category: "CRM",
    description:
      "Sync contacts, deals, and appointments with your Salesforce org via OAuth.",
    color: "blue",
    supported: false,
  },
  {
    id: "calcom",
    provider: "calcom",
    name: "Cal.com",
    category: "Scheduling & Booking",
    description:
      "Sync booking pages and let agents handle appointment scheduling directly.",
    color: "violet",
    supported: true,
  },
];

// ============================================================
// MAIN PAGE
// ============================================================

export default function Integrations() {
  const [integrations, setIntegrations] = useState(
    INITIAL_INTEGRATIONS.map(function (item) {
      return {
        ...item,
        status: "Not Connected",
        backendId: null,
        accountLabel: "—",
        config: {},
      };
    })
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [viewMode, setViewMode] = useState("grid");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null);

  const [apiKey, setApiKey] = useState("");
  const [locationId, setLocationId] = useState("");
  const [label, setLabel] = useState("");

  const [pageError, setPageError] = useState("");
  const [modalError, setModalError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // ----------------------------------------------------------
  // LOAD INTEGRATIONS
  // ----------------------------------------------------------

  const loadIntegrations = useCallback(async function (showLoader) {
    if (showLoader) {
      setLoading(true);
    } else {
      setRefreshing(true);
    }

    setPageError("");

    try {
      const response = await integrationsApiService.getIntegrations();

      const backendItems = Array.isArray(response.data)
        ? response.data
        : [];

      const updatedIntegrations = INITIAL_INTEGRATIONS.map(function (item) {
        const backendItem = backendItems.find(function (record) {
          return (
            String(record.provider).toLowerCase() ===
            String(item.provider).toLowerCase()
          );
        });

        if (!backendItem) {
          return {
            ...item,
            status: "Not Connected",
            backendId: null,
            accountLabel: "—",
            config: {},
          };
        }

        const active =
          String(backendItem.status).toLowerCase() === "active";

        return {
          ...item,
          status: active ? "Connected" : "Not Connected",
          backendId: backendItem.id,
          accountLabel: backendItem.label || "Connected Account",
          config: backendItem.config || {},
          backendStatus: backendItem.status,
        };
      });

      setIntegrations(updatedIntegrations);
    } catch (error) {
      setPageError(getIntegrationApiError(error));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(function () {
    loadIntegrations(true);
  }, [loadIntegrations]);

  // ----------------------------------------------------------
  // SUMMARY
  // ----------------------------------------------------------

  const connectedCount = integrations.filter(function (item) {
    return item.status === "Connected";
  }).length;

  const availableCount = integrations.filter(function (item) {
    return item.supported;
  }).length;

  const syncStatus = connectedCount > 0 ? "Connected" : "Idle";

  // ----------------------------------------------------------
  // SEARCH AND FILTER
  // ----------------------------------------------------------

  const filteredIntegrations = useMemo(
    function () {
      return integrations.filter(function (item) {
        const query = searchQuery.toLowerCase();

        const matchesSearch =
          item.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query);

        const matchesStatus =
          statusFilter === "All Status" ||
          item.status === statusFilter;

        return matchesSearch && matchesStatus;
      });
    },
    [integrations, searchQuery, statusFilter]
  );

  // ----------------------------------------------------------
  // OPEN CONNECT MODAL
  // ----------------------------------------------------------

  const openConnectModal = function (integration) {
    if (!integration.supported) {
      return;
    }

    setSelectedIntegration(integration);
    setApiKey("");
    setLocationId("");
    setLabel("");
    setModalError("");
    setModalOpen(true);
  };

  const closeConnectModal = function () {
    if (submitting) {
      return;
    }

    setModalOpen(false);
    setSelectedIntegration(null);
    setApiKey("");
    setLocationId("");
    setLabel("");
    setModalError("");
  };

  // ----------------------------------------------------------
  // CONNECT INTEGRATION
  // ----------------------------------------------------------

  const handleConnect = async function (event) {
    event.preventDefault();

    if (!selectedIntegration) {
      return;
    }

    if (!apiKey.trim()) {
      setModalError("Please enter your API Key.");
      return;
    }

    if (
      selectedIntegration.provider === "ghl" &&
      !locationId.trim()
    ) {
      setModalError("Please enter your GoHighLevel Location ID.");
      return;
    }

    const payload = {
      api_key: apiKey.trim(),
    };

    if (label.trim()) {
      payload.label = label.trim();
    }

    if (selectedIntegration.provider === "ghl") {
      payload.location_id = locationId.trim();
    }

    setSubmitting(true);
    setModalError("");
    setSuccessMessage("");

    try {
      if (selectedIntegration.provider === "calcom") {
        await integrationsApiService.connectCalcom(payload);
      } else if (selectedIntegration.provider === "ghl") {
        await integrationsApiService.connectGhl(payload);
      }

      setModalOpen(false);
      setSelectedIntegration(null);
      setApiKey("");
      setLocationId("");
      setLabel("");

      setSuccessMessage(
        selectedIntegration.name + " connected successfully."
      );

      await loadIntegrations(false);
    } catch (error) {
      setModalError(getIntegrationApiError(error));
    } finally {
      setSubmitting(false);
    }
  };

  // ----------------------------------------------------------
  // DISCONNECT INTEGRATION
  // ----------------------------------------------------------

  const handleDisconnect = async function (integration) {
    if (!integration.backendId) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to disconnect " +
        integration.name +
        "?"
    );

    if (!confirmed) {
      return;
    }

    setPageError("");
    setSuccessMessage("");

    try {
      await integrationsApiService.disconnectIntegration(
        integration.backendId
      );

      setSuccessMessage(
        integration.name + " disconnected successfully."
      );

      await loadIntegrations(false);
    } catch (error) {
      setPageError(getIntegrationApiError(error));
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100">
      <main className="mx-auto max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-7">

        {/* SEARCH */}
        <section className="flex justify-end">
          <div className="flex h-10 w-full max-w-xs items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 dark:border-white/[0.08] dark:bg-[#101012]">
            <Search size={14} className="text-zinc-400" />
            <input
              type="text"
              placeholder="Search integrations..."
              value={searchQuery}
              onChange={function (event) {
                setSearchQuery(event.target.value);
              }}
              className="min-w-0 flex-1 bg-transparent text-[13px] text-zinc-800 outline-none placeholder:text-zinc-500 dark:text-zinc-200"
            />
            <kbd className="rounded border border-black/10 px-1.5 py-0.5 text-[10px] text-zinc-500 dark:border-white/10">
              ⌘K
            </kbd>
          </div>
        </section>

        {/* SUCCESS MESSAGE */}
        {successMessage && (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-3 text-[13px] text-emerald-700 dark:text-emerald-400">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} />
              {successMessage}
            </span>
            <button
              type="button"
              onClick={function () {
                setSuccessMessage("");
              }}
            >
              <X size={15} />
            </button>
          </div>
        )}

        {/* ERROR MESSAGE */}
        {pageError && (
          <div className="flex items-start justify-between gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-[13px] text-red-600 dark:text-red-400">
            <span className="flex items-center gap-2">
              <AlertCircle size={16} />
              {pageError}
            </span>
            <button
              type="button"
              onClick={function () {
                setPageError("");
              }}
            >
              <X size={15} />
            </button>
          </div>
        )}

        {/* SUMMARY CARDS */}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">

          <SummaryCard
            icon={Link2}
            title="Connected Integrations"
            value={loading ? "—" : connectedCount}
            description={
              connectedCount === 0
                ? "None connected"
                : connectedCount + " connected"
            }
            color="cyan"
          />

          <SummaryCard
            icon={LayoutGrid}
            title="Available Integrations"
            value={availableCount}
            description="Ready to connect"
            color="violet"
          />

          <SummaryCard
            icon={Activity}
            title="Sync Status"
            value={loading ? "—" : syncStatus}
            description={
              connectedCount === 0
                ? "No integrations connected yet"
                : "Integration accounts connected"
            }
            color="neutral"
          />
        </section>

        {/* ALL INTEGRATIONS */}
        <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">

          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.06] px-5 py-4 dark:border-white/[0.06]">
            <div className="flex items-center gap-2">
              <h2 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
                All Integrations
              </h2>
              <Info size={13} className="text-zinc-400" />
            </div>

            <div className="flex items-center gap-2">

              <button
                type="button"
                onClick={function () {
                  loadIntegrations(false);
                }}
                disabled={refreshing}
                className="flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-[12px] text-zinc-600 transition hover:bg-black/[0.03] disabled:opacity-50 dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
              >
                <RefreshCw
                  size={13}
                  className={refreshing ? "animate-spin" : ""}
                />
                Refresh
              </button>

              {/* STATUS FILTER */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={function (event) {
                    setStatusFilter(event.target.value);
                  }}
                  className="h-9 appearance-none rounded-lg border border-black/[0.08] bg-white pl-3 pr-8 text-[13px] text-zinc-700 outline-none transition hover:bg-black/[0.02] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
                >
                  <option>All Status</option>
                  <option>Connected</option>
                  <option>Not Connected</option>
                </select>
                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400"
                />
              </div>

              {/* VIEW TOGGLE */}
              <div className="flex items-center gap-0.5 rounded-lg border border-black/[0.08] bg-white p-0.5 dark:border-white/[0.08] dark:bg-[#101012]">
                <button
                  type="button"
                  onClick={function () {
                    setViewMode("grid");
                  }}
                  className={
                    "rounded-md p-1.5 transition " +
                    (viewMode === "grid"
                      ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400"
                      : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200")
                  }
                  aria-label="Grid view"
                >
                  <Grid3X3 size={14} />
                </button>

                <button
                  type="button"
                  onClick={function () {
                    setViewMode("list");
                  }}
                  className={
                    "rounded-md p-1.5 transition " +
                    (viewMode === "list"
                      ? "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400"
                      : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200")
                  }
                  aria-label="List view"
                >
                  <List size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* INTEGRATION LIST */}
          <div className="p-5">

            {loading ? (
              <div className="flex min-h-48 items-center justify-center gap-2 text-[13px] text-zinc-500">
                <Loader2 size={18} className="animate-spin" />
                Loading integrations...
              </div>
            ) : filteredIntegrations.length === 0 ? (
              <div className="flex min-h-48 flex-col items-center justify-center text-center">
                <Plug size={25} className="mb-3 text-zinc-400" />
                <p className="text-[14px] font-semibold text-zinc-700 dark:text-zinc-300">
                  No integrations found
                </p>
                <p className="mt-1 text-[12px] text-zinc-500">
                  Try changing your search or status filter.
                </p>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 gap-5 lg:grid-cols-2"
                    : "flex flex-col gap-4"
                }
              >
                {filteredIntegrations.map(function (integration) {
                  return (
                    <IntegrationCard
                      key={integration.id}
                      integration={integration}
                      viewMode={viewMode}
                      onConnect={openConnectModal}
                      onDisconnect={handleDisconnect}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* HELP CARD */}
        <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-500/25 bg-cyan-500/[0.06]">
                <Headphones
                  size={16}
                  className="text-cyan-600 dark:text-cyan-400"
                />
              </div>

              <div>
                <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
                  Need help connecting an integration?
                </h3>
                <p className="mt-0.5 text-[12px] text-zinc-500">
                  Need help with integration? Contact us at{" "}
                  <a
                    href="mailto:Info@ravan.ai"
                    className="text-cyan-600 hover:underline dark:text-cyan-400"
                  >
                    Info@ravan.ai
                  </a>
                  .
                </p>
              </div>
            </div>

            
<button
  type="button"
  className="flex h-10 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-4 text-[13px] font-medium text-zinc-700 transition hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-300"
>
  <ExternalLink size={13} />
  View Docs
</button>

          </div>
        </section>
      </main>

      {/* CONNECT MODAL */}
      {modalOpen && selectedIntegration && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-2xl dark:border-white/[0.08] dark:bg-[#101012]">

            <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-4 dark:border-white/[0.06]">
              <div>
                <h2 className="text-[16px] font-semibold text-zinc-900 dark:text-zinc-100">
                  Connect {selectedIntegration.name}
                </h2>
                <p className="mt-1 text-[11px] text-zinc-500">
                  Enter your provider credentials to connect your account.
                </p>
              </div>

              <button
                type="button"
                onClick={closeConnectModal}
                disabled={submitting}
                className="rounded-lg p-2 text-zinc-500 hover:bg-black/[0.05] dark:hover:bg-white/[0.05]"
              >
                <X size={17} />
              </button>
            </div>

            <form onSubmit={handleConnect} className="space-y-4 p-5">

              {modalError && (
                <div className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/[0.06] p-3 text-[12px] text-red-600 dark:text-red-400">
                  <AlertCircle size={15} className="mt-0.5 shrink-0" />
                  {modalError}
                </div>
              )}

              <div>
                <label className="mb-1.5 block text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
                  Account Label
                  <span className="ml-1 text-zinc-400">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={label}
                  onChange={function (event) {
                    setLabel(event.target.value);
                  }}
                  maxLength={120}
                  placeholder={
                    selectedIntegration.provider === "ghl"
                      ? "My GoHighLevel Account"
                      : "My Cal.com Account"
                  }
                  className="h-11 w-full rounded-lg border border-black/[0.10] bg-white px-3 text-[13px] text-zinc-800 outline-none focus:border-cyan-500 dark:border-white/[0.10] dark:bg-[#09090B] dark:text-zinc-200"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
                  API Key
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={function (event) {
                    setApiKey(event.target.value);
                  }}
                  autoComplete="off"
                  placeholder="Enter your API key"
                  required
                  className="h-11 w-full rounded-lg border border-black/[0.10] bg-white px-3 text-[13px] text-zinc-800 outline-none focus:border-cyan-500 dark:border-white/[0.10] dark:bg-[#09090B] dark:text-zinc-200"
                />
                <p className="mt-1.5 text-[11px] text-zinc-500">
                  Your API key is sent securely to the backend for validation
                  and encrypted storage.
                </p>
              </div>

              {selectedIntegration.provider === "ghl" && (
                <div>
                  <label className="mb-1.5 block text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
                    Location ID
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={locationId}
                    onChange={function (event) {
                      setLocationId(event.target.value);
                    }}
                    placeholder="Enter your GoHighLevel Location ID"
                    required
                    className="h-11 w-full rounded-lg border border-black/[0.10] bg-white px-3 text-[13px] text-zinc-800 outline-none focus:border-cyan-500 dark:border-white/[0.10] dark:bg-[#09090B] dark:text-zinc-200"
                  />
                </div>
              )}

              <div className="rounded-lg border border-amber-500/20 bg-amber-500/[0.05] p-3 text-[11px] leading-relaxed text-amber-700 dark:text-amber-400">
                <div className="flex items-center gap-2 font-semibold">
                  <Shield size={13} />
                  Credential Security
                </div>
                <p className="mt-1">
                  Credentials are validated and encrypted by the backend.
                  Never share your API key with anyone.
                </p>
              </div>

              <div className="flex justify-end gap-2 border-t border-black/[0.06] pt-4 dark:border-white/[0.06]">
                <button
                  type="button"
                  onClick={closeConnectModal}
                  disabled={submitting}
                  className="h-10 rounded-lg border border-black/[0.08] px-4 text-[13px] font-medium text-zinc-600 hover:bg-black/[0.03] disabled:opacity-50 dark:border-white/[0.08] dark:text-zinc-300"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex h-10 items-center gap-2 rounded-lg bg-[#275982] px-5 text-[13px] font-semibold text-white transition hover:bg-[#1f496b] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Link2 size={14} />
                      Connect Integration
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// SUMMARY CARD
// ============================================================

function SummaryCard({ icon: Icon, title, value, description, color }) {
  const styles = {
    cyan: "border-cyan-500/25 bg-cyan-500/[0.06] text-cyan-600 dark:text-cyan-400",
    violet:
      "border-violet-500/25 bg-violet-500/[0.06] text-violet-600 dark:text-violet-400",
    neutral:
      "border-black/[0.06] bg-zinc-50 text-zinc-500 dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-zinc-400",
  };

  return (
    <div className="rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
      <div
        className={
          "mb-5 flex h-9 w-9 items-center justify-center rounded-lg border " +
          styles[color]
        }
      >
        <Icon size={16} />
      </div>

      <h3 className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h3>

      <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        {value}
      </p>

      <p className="mt-1 text-[11px] text-zinc-500">
        {description}
      </p>
    </div>
  );
}

// ============================================================
// INTEGRATION CARD
// ============================================================

function IntegrationCard({
  integration,
  viewMode,
  onConnect,
  onDisconnect,
}) {
  const colorMap = {
    cyan: {
      bg: "bg-cyan-500/[0.06]",
      border: "border-cyan-500/25",
      text: "text-cyan-600 dark:text-cyan-400",
    },
    blue: {
      bg: "bg-blue-500/[0.06]",
      border: "border-blue-500/25",
      text: "text-blue-600 dark:text-blue-400",
    },
    violet: {
      bg: "bg-violet-500/[0.06]",
      border: "border-violet-500/25",
      text: "text-violet-600 dark:text-violet-400",
    },
  };

  const color = colorMap[integration.color] || colorMap.cyan;
  const connected = integration.status === "Connected";

  return (
    <div
      className={
        "rounded-2xl border border-black/[0.06] bg-zinc-50 p-5 dark:border-white/[0.08] dark:bg-[#0e0f12] " +
        (viewMode === "list" ? "w-full" : "")
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className={
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border " +
              color.border +
              " " +
              color.bg
            }
          >
            <Plug size={16} className={color.text} />
          </div>

          <div className="min-w-0">
            <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">
              {integration.name}
            </h3>
            <p className="mt-0.5 text-[11px] text-zinc-500">
              {integration.category}
            </p>
          </div>
        </div>

        <span
          className={
            "flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold " +
            (connected
              ? "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-600 dark:text-emerald-400"
              : "border-black/[0.08] bg-white text-zinc-600 dark:border-white/[0.08] dark:bg-[#101012] dark:text-zinc-400")
          }
        >
          <span
            className={
              "h-1.5 w-1.5 rounded-full " +
              (connected ? "bg-emerald-500" : "bg-zinc-400")
            }
          />
          {integration.status}
        </span>
      </div>

      <p className="mt-4 text-[12px] leading-relaxed text-zinc-500">
        {integration.description}
      </p>

      <div className="mt-4 space-y-2 rounded-lg border border-black/[0.06] bg-white p-4 dark:border-white/[0.08] dark:bg-[#101012]">
        <DetailRow
          icon={Shield}
          label="Status"
          value={integration.status}
        />

        <DetailRow
          icon={RefreshCw}
          label="Last Sync"
          value="—"
        />

        <DetailRow
          icon={Plug}
          label="Connected Account"
          value={integration.accountLabel}
        />

        <DetailRow
          icon={Webhook}
          label="Webhooks"
          value="Not configured"
        />

        {integration.provider === "ghl" &&
          integration.config &&
          integration.config.location_id && (
            <DetailRow
              icon={Info}
              label="Location ID"
              value={integration.config.location_id}
            />
          )}
      </div>

      {integration.supported ? (
        connected ? (
          <button
            type="button"
            onClick={function () {
              onDisconnect(integration);
            }}
            className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-red-500/25 bg-red-500/[0.05] text-[13px] font-semibold text-red-600 transition hover:bg-red-500/[0.10] dark:text-red-400"
          >
            <Unplug size={14} />
            Disconnect
          </button>
        ) : (
          <button
            type="button"
            onClick={function () {
              onConnect(integration);
            }}
            className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/[0.06] text-[13px] font-semibold text-cyan-700 transition hover:bg-cyan-500/[0.10] dark:text-cyan-400"
          >
            <Link2 size={14} />
            Connect
          </button>
        )
      ) : (
        <button
          type="button"
          disabled
          className="mt-4 flex h-11 w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-black/[0.08] bg-zinc-100 text-[13px] font-semibold text-zinc-400 dark:border-white/[0.08] dark:bg-white/[0.03]"
        >
          <Plug size={14} />
          Coming Soon
        </button>
      )}
    </div>
  );
}

// ============================================================
// DETAIL ROW
// ============================================================

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 text-[12px]">
      <span className="flex shrink-0 items-center gap-2 text-zinc-500">
        <Icon size={12} />
        {label}
      </span>

      <span className="max-w-[60%] truncate text-right text-zinc-700 dark:text-zinc-300">
        {value || "—"}
      </span>
    </div>
  );
}
