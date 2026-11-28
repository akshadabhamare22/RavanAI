
import React, { useState } from "react";
import {
    ArrowLeft,
    Building2,
    UserPlus,
    Save,
    Loader2,
    AlertCircle,
    CheckCircle2,
} from "lucide-react";
import Config from "../../../config/Config";

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

const CreateOrganization = ({ onBack, onSuccess }) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        plan: "free",
        initial_credits: "100",
        max_concurrent_calls: "5",
        max_agents: "10",
        credits_per_minute: "1",
        admin_email: "",
        admin_password: "",
        admin_first_name: "",
        admin_last_name: "",
        admin_phone_country_code: "+91",
        admin_phone_number: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const updateField = (event) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccessMessage("");

        const payload = {
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim() || null,
            plan: form.plan,
            initial_credits: Number(form.initial_credits),
            max_concurrent_calls: Number(form.max_concurrent_calls),
            max_agents: Number(form.max_agents),
            credits_per_minute: Number(form.credits_per_minute),
            admin_email: form.admin_email.trim(),
            admin_password: form.admin_password,
            admin_first_name: form.admin_first_name.trim(),
            admin_last_name: form.admin_last_name.trim(),
            admin_phone_country_code: form.admin_phone_country_code.trim(),
            admin_phone_number: form.admin_phone_number.trim(),
        };

        if (
            !payload.name ||
            !payload.email ||
            !payload.admin_email ||
            !payload.admin_password ||
            !payload.admin_first_name ||
            !payload.admin_last_name
        ) {
            setError("Please complete all required fields.");
            return;
        }

        if (
            !Number.isFinite(payload.initial_credits) ||
            !Number.isFinite(payload.max_concurrent_calls) ||
            !Number.isFinite(payload.max_agents) ||
            !Number.isFinite(payload.credits_per_minute)
        ) {
            setError("Please enter valid numeric values for credits and limits.");
            return;
        }

        if (
            payload.initial_credits < 0 ||
            payload.max_concurrent_calls < 1 ||
            payload.max_agents < 1 ||
            payload.credits_per_minute < 0
        ) {
            setError("Please check the credits and limit values.");
            return;
        }

        setLoading(true);

        try {
            const token = getToken();

            const response = await fetch(
                `${Config.BASE_URL}/admin/organizations`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                    body: JSON.stringify(payload),
                }
            );

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
                    `Organization creation failed (${response.status})`
                );
            }

            setSuccessMessage("Organization created successfully.");

            // Notify parent so it can refresh the organization list.
            if (onSuccess) {
                setTimeout(() => onSuccess(data), 700);
            }
        } catch (err) {
            setError(err.message || "Unable to create organization.");
        } finally {
            setLoading(false);
        }
    };

    // Light and dark theme input styling.
    const inputClass =
        "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#275982] focus:ring-2 focus:ring-blue-100 dark:border-white/[0.12] dark:bg-[#111216] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-[#4b91bd] dark:focus:ring-cyan-500/10";

    const labelClass =
        "text-sm font-medium text-slate-700 dark:text-zinc-300";

    const sectionClass =
        "overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-white/[0.08] dark:bg-[#0C0D10]";

    const sectionHeaderClass =
        "flex items-center gap-3 border-b border-slate-200 px-5 py-4 dark:border-white/[0.08]";

    const headingClass =
        "font-semibold text-slate-900 dark:text-zinc-100";

    const descriptionClass =
        "text-xs text-slate-500 dark:text-zinc-400";

    return (
        <div className="min-h-screen space-y-6 bg-slate-50 p-4 text-slate-900 transition-colors duration-300 dark:bg-[#08090B] dark:text-zinc-100 sm:p-6 lg:p-8">

            {/* Page Header */}
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={onBack}
                    className="rounded-lg border border-slate-300 bg-white p-2.5 text-slate-600 transition-colors hover:bg-slate-100 dark:border-white/[0.12] dark:bg-[#111216] dark:text-zinc-300 dark:hover:bg-white/[0.06]"
                    aria-label="Back to organizations"
                >
                    <ArrowLeft size={19} />
                </button>

                <div>
                    <p className="text-sm text-slate-500 dark:text-zinc-400">
                        Superadmin / Organizations / Create
                    </p>

                    <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-zinc-100">
                        Create Organization
                    </h1>

                    <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
                        Create a new organization and its administrator account.
                    </p>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {/* Success Message */}
            {successMessage && (
                <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <CheckCircle2 size={18} />
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Organization Information */}
                <section className={sectionClass}>
                    <div className={sectionHeaderClass}>
                        <div className="rounded-lg bg-blue-50 p-2 text-[#275982] dark:bg-blue-500/10 dark:text-blue-400">
                            <Building2 size={20} />
                        </div>

                        <div>
                            <h2 className={headingClass}>
                                Organization Information
                            </h2>

                            <p className={descriptionClass}>
                                Basic organization contact details.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
                        <div>
                            <label className={labelClass}>
                                Organization Name{" "}
                                <span className="text-red-500">*</span>
                            </label>

                            <input
                                name="name"
                                value={form.name}
                                onChange={updateField}
                                required
                                placeholder="Organization Name"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>
                                Organization Email{" "}
                                <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={updateField}
                                required
                                placeholder="contact@abc.com"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>
                                Organization Phone
                            </label>

                            <input
                                name="phone"
                                value={form.phone}
                                onChange={updateField}
                                placeholder="+919876543210"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>
                                Subscription Plan{" "}
                                <span className="text-red-500">*</span>
                            </label>

                            <select
                                name="plan"
                                value={form.plan}
                                onChange={updateField}
                                className={inputClass}
                            >
                                <option value="free">Free</option>
                                <option value="starter">Starter</option>
                                <option value="basic">Basic</option>
                                <option value="pro">Pro</option>
                                <option value="enterprise">Enterprise</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Credits and Limits */}
                <section className={sectionClass}>
                    <div className={sectionHeaderClass}>
                        <div className="rounded-lg bg-amber-50 p-2 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                            <Building2 size={20} />
                        </div>

                        <div>
                            <h2 className={headingClass}>
                                Credits & Organization Limits
                            </h2>

                            <p className={descriptionClass}>
                                Configure initial credits and usage limits.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <label className={labelClass}>
                                Initial Credits
                            </label>

                            <input
                                type="number"
                                min="0"
                                name="initial_credits"
                                value={form.initial_credits}
                                onChange={updateField}
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
                                value={form.max_concurrent_calls}
                                onChange={updateField}
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>
                                Maximum Agents
                            </label>

                            <input
                                type="number"
                                min="1"
                                name="max_agents"
                                value={form.max_agents}
                                onChange={updateField}
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
                                value={form.credits_per_minute}
                                onChange={updateField}
                                className={inputClass}
                            />
                        </div>
                    </div>
                </section>

                {/* Organization Administrator */}
                <section className={sectionClass}>
                    <div className={sectionHeaderClass}>
                        <div className="rounded-lg bg-violet-50 p-2 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400">
                            <UserPlus size={20} />
                        </div>

                        <div>
                            <h2 className={headingClass}>
                                Organization Administrator
                            </h2>

                            <p className={descriptionClass}>
                                Create the first admin login for this organization.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
                        <div>
                            <label className={labelClass}>
                                First Name{" "}
                                <span className="text-red-500">*</span>
                            </label>

                            <input
                                name="admin_first_name"
                                value={form.admin_first_name}
                                onChange={updateField}
                                required
                                placeholder="John"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>
                                Last Name{" "}
                                <span className="text-red-500">*</span>
                            </label>

                            <input
                                name="admin_last_name"
                                value={form.admin_last_name}
                                onChange={updateField}
                                required
                                placeholder="Doe"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>
                                Admin Email{" "}
                                <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="email"
                                name="admin_email"
                                value={form.admin_email}
                                onChange={updateField}
                                required
                                placeholder="admin@abc.com"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>
                                Admin Password{" "}
                                <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="password"
                                name="admin_password"
                                value={form.admin_password}
                                onChange={updateField}
                                required
                                minLength="8"
                                placeholder="Enter a strong password"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>
                                Phone Country Code
                            </label>

                            <input
                                name="admin_phone_country_code"
                                value={form.admin_phone_country_code}
                                onChange={updateField}
                                placeholder="+91"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>
                                Admin Phone Number
                            </label>

                            <input
                                name="admin_phone_number"
                                value={form.admin_phone_number}
                                onChange={updateField}
                                placeholder="9876543210"
                                className={inputClass}
                            />
                        </div>
                    </div>
                </section>

                {/* Form Actions */}
                <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={onBack}
                        disabled={loading}
                        className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50 dark:border-white/[0.12] dark:bg-[#111216] dark:text-zinc-300 dark:hover:bg-white/[0.06]"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#275982] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1e4869] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={17} className="animate-spin" />
                                Creating...
                            </>
                        ) : (
                            <>
                                <Save size={17} />
                                Create Organization
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateOrganization;
