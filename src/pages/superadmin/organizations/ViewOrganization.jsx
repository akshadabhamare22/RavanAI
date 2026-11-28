
import React, { useCallback, useEffect, useState } from "react";
import {
    ArrowLeft,
    Building2,
    RefreshCw,
    Pencil,
    Save,
    X,
    Ban,
    CheckCircle2,
    Coins,
    History,
    Loader2,
    AlertCircle,
    Wallet,
    Users,
    Bot,
} from "lucide-react";
import Config from "../../../config/Config";

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
        const validationDetails = data?.error?.details?.fields;

        if (Array.isArray(validationDetails) && validationDetails.length) {
            throw new Error(
                validationDetails
                    .map((item) => {
                        const field =
                            item.loc?.[item.loc.length - 1] || "Field";

                        return `${field}: ${
                            item.msg || item.type || "Invalid value"
                        }`;
                    })
                    .join(" | ")
            );
        }

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
// Date Formatter
// =====================================================
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

// =====================================================
// Number Formatter
// =====================================================
const formatNumber = (value) => {
    const number = Number(value);

    return Number.isFinite(number)
        ? number.toLocaleString("en-IN")
        : "—";
};

// =====================================================
// Organization Status Badge
// =====================================================
const StatusBadge = ({ status }) => {
    const normalized = String(status || "").toLowerCase();

    const style =
        normalized === "active"
            ? "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20"
            : normalized === "suspended"
            ? "bg-red-50 text-red-700 ring-red-200 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20"
            : "bg-slate-100 text-slate-600 ring-slate-200 dark:bg-white/[0.06] dark:text-zinc-300 dark:ring-white/[0.1]";

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${style}`}
        >
            {status || "Unknown"}
        </span>
    );
};

// =====================================================
// Information Card
// =====================================================
const InfoCard = ({ icon: Icon, label, value }) => (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-300 dark:border-white/[0.08] dark:bg-[#0C0D10]">
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-zinc-400">
            <Icon size={17} />
            {label}
        </div>

        <p className="mt-2 break-words text-xl font-semibold text-slate-900 dark:text-zinc-100">
            {value ?? "—"}
        </p>
    </div>
);

// =====================================================
// Main View Organization Component
// =====================================================
export default function ViewOrganization({ organizationId, onBack }) {
    const [organization, setOrganization] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [transactionTotal, setTransactionTotal] = useState(0);

    const [loading, setLoading] = useState(true);
    const [transactionLoading, setTransactionLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const [editMode, setEditMode] = useState(false);

    const [editForm, setEditForm] = useState({
        name: "",
        email: "",
        phone: "",
        plan: "",
        max_concurrent_calls: "",
        max_agents: "",
        credits_per_minute: "",
    });

    const [suspendReason, setSuspendReason] = useState("");

    const [creditForm, setCreditForm] = useState({
        type: "grant",
        amount: "",
        description: "",
        reference: "",
    });

    const [transactionOffset, setTransactionOffset] = useState(0);
    const transactionLimit = 10;

    // =====================================================
    // Load Organization Details
    // GET /admin/organizations/{org_id}
    // =====================================================
    const loadOrganization = useCallback(async () => {
        if (!organizationId) return;

        setLoading(true);
        setError("");

        try {
            const data = await apiRequest(
                `/admin/organizations/${encodeURIComponent(organizationId)}`
            );

            setOrganization(data);

            setEditForm({
                name: data.name || "",
                email: data.email || "",
                phone: data.phone || "",
                plan: data.plan || "free",
                max_concurrent_calls: data.max_concurrent_calls ?? "",
                max_agents: data.max_agents ?? "",
                credits_per_minute: data.credits_per_minute ?? "",
            });
        } catch (err) {
            setError(
                err.message || "Unable to load organization details."
            );
        } finally {
            setLoading(false);
        }
    }, [organizationId]);

    // =====================================================
    // Load Credit Transactions
    // GET /admin/organizations/{org_id}/transactions
    // =====================================================
    const loadTransactions = useCallback(
        async (offset = transactionOffset) => {
            if (!organizationId) return;

            setTransactionLoading(true);

            try {
                const params = new URLSearchParams({
                    limit: String(transactionLimit),
                    offset: String(offset),
                });

                const data = await apiRequest(
                    `/admin/organizations/${encodeURIComponent(
                        organizationId
                    )}/transactions?${params.toString()}`
                );

                setTransactions(
                    Array.isArray(data.items) ? data.items : []
                );

                setTransactionTotal(Number(data.total || 0));
            } catch (err) {
                setError(
                    err.message || "Unable to load transactions."
                );

                setTransactions([]);
                setTransactionTotal(0);
            } finally {
                setTransactionLoading(false);
            }
        },
        [organizationId, transactionOffset]
    );

    // =====================================================
    // Initial API Calls
    // =====================================================
    useEffect(() => {
        loadOrganization();
    }, [loadOrganization]);

    useEffect(() => {
        loadTransactions();
    }, [loadTransactions]);

    // =====================================================
    // Edit Form Field Handler
    // =====================================================
    const updateEditField = (event) => {
        const { name, value } = event.target;

        setEditForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    // =====================================================
    // Update Organization
    // PATCH /admin/organizations/{org_id}
    // =====================================================
    const handleUpdate = async (event) => {
        event.preventDefault();

        if (!organizationId) return;

        setSaving(true);
        setError("");
        setMessage("");

        const payload = {
            name: editForm.name.trim(),
            email: editForm.email.trim(),
            phone: editForm.phone.trim() || null,
            plan: editForm.plan.trim(),
            max_concurrent_calls: Number(
                editForm.max_concurrent_calls
            ),
            max_agents: Number(editForm.max_agents),
            credits_per_minute: Number(editForm.credits_per_minute),
        };

        if (
            !payload.name ||
            !payload.email ||
            !payload.plan ||
            !Number.isFinite(payload.max_concurrent_calls) ||
            !Number.isFinite(payload.max_agents) ||
            !Number.isFinite(payload.credits_per_minute)
        ) {
            setError(
                "Please enter valid organization details and numeric limits."
            );

            setSaving(false);
            return;
        }

        try {
            await apiRequest(
                `/admin/organizations/${encodeURIComponent(organizationId)}`,
                {
                    method: "PATCH",
                    body: JSON.stringify(payload),
                }
            );

            setMessage("Organization updated successfully.");
            setEditMode(false);

            await loadOrganization();
        } catch (err) {
            setError(
                err.message || "Unable to update organization."
            );
        } finally {
            setSaving(false);
        }
    };

    // =====================================================
    // Suspend Organization
    // POST /admin/organizations/{org_id}/suspend
    // =====================================================
    const handleSuspend = async (event) => {
        event.preventDefault();

        if (!organizationId) return;

        if (!suspendReason.trim()) {
            setError("Please enter a reason for suspension.");
            return;
        }

        const confirmed = window.confirm(
            "Are you sure you want to suspend this organization?"
        );

        if (!confirmed) return;

        setSaving(true);
        setError("");
        setMessage("");

        try {
            await apiRequest(
                `/admin/organizations/${encodeURIComponent(
                    organizationId
                )}/suspend`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        reason: suspendReason.trim(),
                    }),
                }
            );

            setMessage("Organization suspended successfully.");
            setSuspendReason("");

            await loadOrganization();
        } catch (err) {
            setError(
                err.message || "Unable to suspend organization."
            );
        } finally {
            setSaving(false);
        }
    };

    // =====================================================
    // Activate Organization
    // POST /admin/organizations/{org_id}/activate
    // =====================================================
    const handleActivate = async () => {
        if (!organizationId) return;

        const confirmed = window.confirm(
            "Are you sure you want to activate this organization?"
        );

        if (!confirmed) return;

        setSaving(true);
        setError("");
        setMessage("");

        try {
            await apiRequest(
                `/admin/organizations/${encodeURIComponent(
                    organizationId
                )}/activate`,
                {
                    method: "POST",
                }
            );

            setMessage("Organization activated successfully.");

            await loadOrganization();
        } catch (err) {
            setError(
                err.message || "Unable to activate organization."
            );
        } finally {
            setSaving(false);
        }
    };

    // =====================================================
    // Credit Adjustment
    // POST /admin/organizations/{org_id}/credits
    // =====================================================
    const handleCreditAdjustment = async (event) => {
        event.preventDefault();

        if (!organizationId) return;

        const amount = Number(creditForm.amount);

        if (!Number.isFinite(amount) || amount === 0) {
            setError("Enter a valid non-zero credit amount.");
            return;
        }

        if (creditForm.type !== "adjustment" && amount < 0) {
            setError(
                "Negative amounts are allowed only for adjustment type."
            );
            return;
        }

        setSaving(true);
        setError("");
        setMessage("");

        const payload = {
            type: creditForm.type,
            amount,
            description: creditForm.description.trim() || null,
            reference: creditForm.reference.trim() || null,
        };

        try {
            await apiRequest(
                `/admin/organizations/${encodeURIComponent(
                    organizationId
                )}/credits`,
                {
                    method: "POST",
                    body: JSON.stringify(payload),
                }
            );

            setMessage(
                "Credit adjustment completed successfully."
            );

            setCreditForm({
                type: "grant",
                amount: "",
                description: "",
                reference: "",
            });

            await loadOrganization();

            // Refresh transactions from the first page.
            setTransactionOffset(0);
            await loadTransactions(0);
        } catch (err) {
            setError(
                err.message || "Unable to adjust credits."
            );
        } finally {
            setSaving(false);
        }
    };

    // =====================================================
    // Shared Input Styling
    // =====================================================
    const inputClass =
        "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#275982] focus:ring-2 focus:ring-blue-100 dark:border-white/[0.12] dark:bg-[#111216] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:ring-cyan-500/10";

    const labelClass =
        "text-sm font-medium text-slate-700 dark:text-zinc-300";

    const cardClass =
        "rounded-xl border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-white/[0.08] dark:bg-[#0C0D10]";

    const sectionHeaderClass =
        "border-b border-slate-200 px-5 py-4 dark:border-white/[0.08]";

    const secondaryButtonClass =
        "inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-white/[0.12] dark:bg-[#111216] dark:text-zinc-300 dark:hover:bg-white/[0.06]";

    // =====================================================
    // Loading State
    // =====================================================
    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center bg-slate-50 transition-colors dark:bg-[#08090B]">
                <div className="text-center text-slate-500 dark:text-zinc-400">
                    <RefreshCw
                        size={25}
                        className="mx-auto mb-3 animate-spin"
                    />
                    Loading organization details...
                </div>
            </div>
        );
    }

    // =====================================================
    // Organization Not Found
    // =====================================================
    if (!organization) {
        return (
            <div className="min-h-screen space-y-4 bg-slate-50 p-6 transition-colors dark:bg-[#08090B]">
                <button
                    onClick={onBack}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#275982] dark:text-blue-400"
                >
                    <ArrowLeft size={17} />
                    Back to organizations
                </button>

                <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
                    {error || "Organization could not be found."}
                </div>

                <button
                    onClick={loadOrganization}
                    className="rounded-lg bg-[#275982] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1e4869]"
                >
                    Retry
                </button>
            </div>
        );
    }

    const isSuspended =
        String(organization.status || "").toLowerCase() ===
        "suspended";

    const transactionPages = Math.max(
        1,
        Math.ceil(transactionTotal / transactionLimit)
    );

    // =====================================================
    // Main UI
    // =====================================================
    return (
        <div className="min-h-screen space-y-6 bg-slate-50 p-4 text-slate-900 transition-colors duration-300 dark:bg-[#08090B] dark:text-zinc-100 sm:p-6 lg:p-8">

            {/* Header */}
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div className="flex items-start gap-3">
                    <button
                        onClick={onBack}
                        className="mt-1 rounded-lg border border-slate-300 bg-white p-2.5 text-slate-600 transition hover:bg-slate-100 dark:border-white/[0.12] dark:bg-[#111216] dark:text-zinc-300 dark:hover:bg-white/[0.06]"
                        aria-label="Back"
                    >
                        <ArrowLeft size={19} />
                    </button>

                    <div>
                        <p className="text-sm text-slate-500 dark:text-zinc-400">
                            Superadmin / Organizations / Details
                        </p>

                        <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-zinc-50">
                            {organization.name}
                        </h1>

                        <div className="mt-2">
                            <StatusBadge status={organization.status} />
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={loadOrganization}
                        disabled={saving}
                        className={secondaryButtonClass}
                    >
                        <RefreshCw
                            size={16}
                            className={loading ? "animate-spin" : ""}
                        />
                        Refresh
                    </button>

                    {!editMode && (
                        <button
                            onClick={() => setEditMode(true)}
                            className="inline-flex items-center gap-2 rounded-lg bg-[#275982] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1e4869]"
                        >
                            <Pencil size={16} />
                            Edit Organization
                        </button>
                    )}
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
                    <AlertCircle
                        size={18}
                        className="mt-0.5 shrink-0"
                    />

                    <span className="flex-1">{error}</span>

                    <button
                        onClick={() => setError("")}
                        aria-label="Dismiss error"
                        className="transition hover:opacity-70"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            {/* Success Message */}
            {message && (
                <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <CheckCircle2 size={18} />

                    {message}

                    <button
                        onClick={() => setMessage("")}
                        className="ml-auto"
                        aria-label="Dismiss message"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            {/* Organization Statistics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <InfoCard
                    icon={Wallet}
                    label="Credit Balance"
                    value={formatNumber(organization.credit_balance)}
                />

                <InfoCard
                    icon={Users}
                    label="Maximum Concurrent Calls"
                    value={formatNumber(
                        organization.max_concurrent_calls
                    )}
                />

                <InfoCard
                    icon={Bot}
                    label="Maximum Agents"
                    value={formatNumber(organization.max_agents)}
                />

                <InfoCard
                    icon={Coins}
                    label="Credits Per Minute"
                    value={formatNumber(
                        organization.credits_per_minute
                    )}
                />
            </div>

            {/* Edit Organization Form */}
            {editMode ? (
                <section className={cardClass}>
                    <div className={sectionHeaderClass}>
                        <h2 className="font-semibold text-slate-900 dark:text-zinc-100">
                            Edit Organization
                        </h2>

                        <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
                            Update the fields supported by the organization update API.
                        </p>
                    </div>

                    <form
                        onSubmit={handleUpdate}
                        className="space-y-5 p-5"
                    >
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <label className={labelClass}>
                                    Organization Name
                                </label>

                                <input
                                    name="name"
                                    value={editForm.name}
                                    onChange={updateEditField}
                                    required
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={editForm.email}
                                    onChange={updateEditField}
                                    required
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Phone
                                </label>

                                <input
                                    name="phone"
                                    value={editForm.phone}
                                    onChange={updateEditField}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Plan
                                </label>

                                <input
                                    name="plan"
                                    value={editForm.plan}
                                    onChange={updateEditField}
                                    required
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Max Concurrent Calls
                                </label>

                                <input
                                    type="number"
                                    min="1"
                                    name="max_concurrent_calls"
                                    value={editForm.max_concurrent_calls}
                                    onChange={updateEditField}
                                    required
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Max Agents
                                </label>

                                <input
                                    type="number"
                                    min="1"
                                    name="max_agents"
                                    value={editForm.max_agents}
                                    onChange={updateEditField}
                                    required
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>
                                    Credits Per Minute
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    name="credits_per_minute"
                                    value={editForm.credits_per_minute}
                                    onChange={updateEditField}
                                    required
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-4 dark:border-white/[0.08]">
                            <button
                                type="button"
                                onClick={() => setEditMode(false)}
                                disabled={saving}
                                className={secondaryButtonClass}
                            >
                                <X size={16} />
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={saving}
                                className="inline-flex items-center gap-2 rounded-lg bg-[#275982] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1e4869] disabled:opacity-60"
                            >
                                {saving ? (
                                    <Loader2
                                        size={16}
                                        className="animate-spin"
                                    />
                                ) : (
                                    <Save size={16} />
                                )}
                                Save Changes
                            </button>
                        </div>
                    </form>
                </section>
            ) : (

                /* Organization Information */
                <section className={cardClass}>
                    <div className={sectionHeaderClass}>
                        <h2 className="font-semibold text-slate-900 dark:text-zinc-100">
                            Organization Information
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-5 p-5 sm:grid-cols-2 lg:grid-cols-3">
                        <div>
                            <p className="text-xs text-slate-500 dark:text-zinc-400">
                                Organization ID
                            </p>

                            <p className="mt-1 break-all text-sm font-medium text-slate-800 dark:text-zinc-200">
                                {organization.id || organizationId}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-slate-500 dark:text-zinc-400">
                                Organization Name
                            </p>

                            <p className="mt-1 text-sm font-medium text-slate-800 dark:text-zinc-200">
                                {organization.name || "—"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-slate-500 dark:text-zinc-400">
                                Email
                            </p>

                            <p className="mt-1 break-all text-sm font-medium text-slate-800 dark:text-zinc-200">
                                {organization.email || "—"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-slate-500 dark:text-zinc-400">
                                Phone
                            </p>

                            <p className="mt-1 text-sm font-medium text-slate-800 dark:text-zinc-200">
                                {organization.phone || "—"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-slate-500 dark:text-zinc-400">
                                Plan
                            </p>

                            <p className="mt-1 text-sm font-medium capitalize text-slate-800 dark:text-zinc-200">
                                {organization.plan || "—"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-slate-500 dark:text-zinc-400">
                                Status
                            </p>

                            <div className="mt-1">
                                <StatusBadge status={organization.status} />
                            </div>
                        </div>

                        <div>
                            <p className="text-xs text-slate-500 dark:text-zinc-400">
                                Created At
                            </p>

                            <p className="mt-1 text-sm font-medium text-slate-800 dark:text-zinc-200">
                                {formatDate(organization.created_at)}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-slate-500 dark:text-zinc-400">
                                Maximum Concurrent Calls
                            </p>

                            <p className="mt-1 text-sm font-medium text-slate-800 dark:text-zinc-200">
                                {formatNumber(
                                    organization.max_concurrent_calls
                                )}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-slate-500 dark:text-zinc-400">
                                Maximum Agents
                            </p>

                            <p className="mt-1 text-sm font-medium text-slate-800 dark:text-zinc-200">
                                {formatNumber(organization.max_agents)}
                            </p>
                        </div>

                        {organization.suspended_reason && (
                            <div className="sm:col-span-2 lg:col-span-3">
                                <p className="text-xs text-slate-500 dark:text-zinc-400">
                                    Suspension Reason
                                </p>

                                <p className="mt-1 text-sm font-medium text-red-700 dark:text-red-400">
                                    {organization.suspended_reason}
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Organization Status Management */}
            <section className={cardClass}>
                <div className={`flex items-center gap-3 ${sectionHeaderClass}`}>
                    <Ban
                        size={19}
                        className="text-slate-600 dark:text-zinc-400"
                    />

                    <div>
                        <h2 className="font-semibold text-slate-900 dark:text-zinc-100">
                            Organization Status Management
                        </h2>

                        <p className="text-xs text-slate-500 dark:text-zinc-400">
                            Activate or suspend this organization.
                        </p>
                    </div>
                </div>

                <div className="space-y-4 p-5">
                    {isSuspended ? (
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                                <p className="font-medium text-slate-800 dark:text-zinc-200">
                                    This organization is currently suspended.
                                </p>

                                <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
                                    Activate it to restore its access.
                                </p>
                            </div>

                            <button
                                onClick={handleActivate}
                                disabled={saving}
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
                            >
                                {saving ? (
                                    <Loader2
                                        size={16}
                                        className="animate-spin"
                                    />
                                ) : (
                                    <CheckCircle2 size={16} />
                                )}
                                Activate Organization
                            </button>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSuspend}
                            className="flex flex-col gap-3 sm:flex-row sm:items-end"
                        >
                            <div className="flex-1">
                                <label className={labelClass}>
                                    Reason for Suspension
                                </label>

                                <input
                                    value={suspendReason}
                                    onChange={(event) =>
                                        setSuspendReason(event.target.value)
                                    }
                                    placeholder="Enter reason for suspension"
                                    className={inputClass}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={saving}
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
                            >
                                {saving ? (
                                    <Loader2
                                        size={16}
                                        className="animate-spin"
                                    />
                                ) : (
                                    <Ban size={16} />
                                )}
                                Suspend Organization
                            </button>
                        </form>
                    )}
                </div>
            </section>

            {/* Credit Management */}
            <section className={cardClass}>
                <div className={`flex items-center gap-3 ${sectionHeaderClass}`}>
                    <Coins
                        size={19}
                        className="text-slate-600 dark:text-zinc-400"
                    />

                    <div>
                        <h2 className="font-semibold text-slate-900 dark:text-zinc-100">
                            Credit Management
                        </h2>

                        <p className="text-xs text-slate-500 dark:text-zinc-400">
                            Grant, purchase, refund or adjust organization credits.
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={handleCreditAdjustment}
                    className="p-5"
                >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <label className={labelClass}>
                                Transaction Type
                            </label>

                            <select
                                value={creditForm.type}
                                onChange={(event) =>
                                    setCreditForm((previous) => ({
                                        ...previous,
                                        type: event.target.value,
                                    }))
                                }
                                className={inputClass}
                            >
                                <option value="grant">Grant</option>
                                <option value="purchase">Purchase</option>
                                <option value="refund">Refund</option>
                                <option value="adjustment">Adjustment</option>
                            </select>
                        </div>

                        <div>
                            <label className={labelClass}>
                                Amount
                            </label>

                            <input
                                type="number"
                                step="0.01"
                                value={creditForm.amount}
                                onChange={(event) =>
                                    setCreditForm((previous) => ({
                                        ...previous,
                                        amount: event.target.value,
                                    }))
                                }
                                required
                                placeholder="Enter amount"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>
                                Description
                            </label>

                            <input
                                value={creditForm.description}
                                onChange={(event) =>
                                    setCreditForm((previous) => ({
                                        ...previous,
                                        description: event.target.value,
                                    }))
                                }
                                placeholder="Credit allocation"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>
                                Reference
                            </label>

                            <input
                                value={creditForm.reference}
                                onChange={(event) =>
                                    setCreditForm((previous) => ({
                                        ...previous,
                                        reference: event.target.value,
                                    }))
                                }
                                placeholder="Optional reference"
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="inline-flex items-center gap-2 rounded-lg bg-[#275982] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1e4869] disabled:opacity-60"
                        >
                            {saving ? (
                                <Loader2
                                    size={16}
                                    className="animate-spin"
                                />
                            ) : (
                                <Coins size={16} />
                            )}
                            Submit Credit Adjustment
                        </button>
                    </div>

                    <p className="mt-3 text-xs text-slate-500 dark:text-zinc-400">
                        Negative amounts are accepted only for the adjustment transaction type.
                    </p>
                </form>
            </section>

            {/* Credit Transactions */}
            <section className={`${cardClass} overflow-hidden`}>
                <div className={`flex flex-col justify-between gap-3 sm:flex-row sm:items-center ${sectionHeaderClass}`}>
                    <div className="flex items-center gap-3">
                        <History
                            size={19}
                            className="text-slate-600 dark:text-zinc-400"
                        />

                        <div>
                            <h2 className="font-semibold text-slate-900 dark:text-zinc-100">
                                Credit Transactions
                            </h2>

                            <p className="text-xs text-slate-500 dark:text-zinc-400">
                                {transactionTotal} transaction(s)
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            setTransactionOffset(0);
                            loadTransactions(0);
                        }}
                        disabled={transactionLoading}
                        className={secondaryButtonClass}
                    >
                        <RefreshCw
                            size={14}
                            className={
                                transactionLoading ? "animate-spin" : ""
                            }
                        />
                        Refresh Transactions
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[750px] text-left text-sm">
                        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-white/[0.03] dark:text-zinc-400">
                            <tr>
                                <th className="px-5 py-3 font-semibold">
                                    Date
                                </th>

                                <th className="px-5 py-3 font-semibold">
                                    Type
                                </th>

                                <th className="px-5 py-3 font-semibold">
                                    Amount
                                </th>

                                <th className="px-5 py-3 font-semibold">
                                    Balance After
                                </th>

                                <th className="px-5 py-3 font-semibold">
                                    Description
                                </th>

                                <th className="px-5 py-3 font-semibold">
                                    Reference
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">
                            {transactionLoading ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-5 py-10 text-center text-slate-500 dark:text-zinc-400"
                                    >
                                        <Loader2
                                            size={20}
                                            className="mx-auto mb-2 animate-spin"
                                        />
                                        Loading transactions...
                                    </td>
                                </tr>
                            ) : transactions.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-5 py-10 text-center text-slate-500 dark:text-zinc-400"
                                    >
                                        No transactions found.
                                    </td>
                                </tr>
                            ) : (
                                transactions.map((transaction, index) => (
                                    <tr
                                        key={
                                            transaction.id ||
                                            `${transaction.created_at}-${index}`
                                        }
                                        className="transition hover:bg-slate-50 dark:hover:bg-white/[0.03]"
                                    >
                                        <td className="px-5 py-4 text-slate-600 dark:text-zinc-400">
                                            {formatDate(transaction.created_at)}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium capitalize text-slate-700 dark:bg-white/[0.06] dark:text-zinc-300">
                                                {transaction.type || "—"}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4 font-semibold text-slate-800 dark:text-zinc-200">
                                            {formatNumber(transaction.amount)}
                                        </td>

                                        <td className="px-5 py-4 text-slate-700 dark:text-zinc-300">
                                            {formatNumber(
                                                transaction.balance_after
                                            )}
                                        </td>

                                        <td className="max-w-xs truncate px-5 py-4 text-slate-600 dark:text-zinc-400">
                                            {transaction.description || "—"}
                                        </td>

                                        <td className="px-5 py-4 text-slate-500 dark:text-zinc-400">
                                            {transaction.reference || "—"}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Transaction Pagination */}
                <div className="flex items-center justify-between border-t border-slate-200 px-5 py-3 dark:border-white/[0.08]">
                    <p className="text-xs text-slate-500 dark:text-zinc-400">
                        Page{" "}
                        {Math.floor(
                            transactionOffset / transactionLimit
                        ) + 1}{" "}
                        of {transactionPages}
                    </p>

                    <div className="flex gap-2">
                        <button
                            onClick={() =>
                                setTransactionOffset((current) =>
                                    Math.max(
                                        0,
                                        current - transactionLimit
                                    )
                                )
                            }
                            disabled={
                                transactionOffset === 0 ||
                                transactionLoading
                            }
                            className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40 dark:border-white/[0.12] dark:text-zinc-300 dark:hover:bg-white/[0.06]"
                        >
                            Previous
                        </button>

                        <button
                            onClick={() =>
                                setTransactionOffset((current) =>
                                    current + transactionLimit <
                                    transactionTotal
                                        ? current + transactionLimit
                                        : current
                                )
                            }
                            disabled={
                                transactionOffset + transactionLimit >=
                                    transactionTotal ||
                                transactionLoading
                            }
                            className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40 dark:border-white/[0.12] dark:text-zinc-300 dark:hover:bg-white/[0.06]"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
