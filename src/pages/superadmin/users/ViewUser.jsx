
import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Save,
  Loader2,
  User,
  Mail,
  Phone,
  Building2,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

import Config from "../../../config/Config";

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

const getCurrentUserId = () => {
  try {
    const auth = JSON.parse(localStorage.getItem("ravanai_auth") || "{}");
    const user = auth.user || JSON.parse(localStorage.getItem("ravanai_user") || "null");
    return user?.id || "";
  } catch {
    return "";
  }
};

const readError = async (response) => {
  try {
    const data = await response.json();

    if (typeof data.detail === "string") return data.detail;
    if (Array.isArray(data.detail)) {
      return data.detail.map((item) => item.msg).join(", ");
    }

    return data.message || "Request failed.";
  } catch {
    return `Request failed (${response.status}).`;
  }
};

const DetailCard = ({ icon: Icon, label, value }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-white/[0.08] dark:bg-[#111216]">
    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-zinc-400">
      <Icon size={15} />
      {label}
    </div>
    <p className="mt-2 break-words text-sm font-semibold text-slate-900 dark:text-zinc-100">
      {value || "—"}
    </p>
  </div>
);

export default function ViewUser({ user, onBack, onUpdated }) {
  const currentUserId = getCurrentUserId();
  const isOwnAccount = Boolean(currentUserId && currentUserId === user.id);

  const [role, setRole] = useState(user.role || "user");
  const [isActive, setIsActive] = useState(Boolean(user.is_active));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setRole(user.role || "user");
    setIsActive(Boolean(user.is_active));
    setError("");
    setSuccess("");
  }, [user]);

  const handleSave = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (isOwnAccount) {
      setError("You cannot update your own role or account status.");
      return;
    }

    const payload = {};

    if (role !== user.role) payload.role = role;
    if (isActive !== Boolean(user.is_active)) payload.is_active = isActive;

    if (Object.keys(payload).length === 0) {
      setError("No changes to save.");
      return;
    }

    setSaving(true);

    try {
      const token = getAuthToken();

      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      const response = await fetch(
        `${Config.BASE_URL}/users/${encodeURIComponent(user.id)}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(await readError(response));
      }

      const updatedUser = await response.json();
      setSuccess("User updated successfully.");
      onUpdated?.(updatedUser);
    } catch (err) {
      setError(err.message || "Unable to update user.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 dark:bg-[#08090B]">
      <div className="mx-auto max-w-5xl space-y-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to Users
        </button>

        <div>
          <p className="text-sm text-slate-500 dark:text-zinc-400">
            Platform Management / Users / User Details
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-zinc-100">
            User Details
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
            View account information and manage access permissions.
          </p>
        </div>

        {error && (
          <div className="flex gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
            <AlertCircle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
            {success}
          </div>
        )}

        <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-7 dark:border-white/[0.08] dark:bg-[#0C0D10]">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 dark:border-white/[0.08] sm:flex-row sm:items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#275982]/10 text-[#275982] dark:bg-blue-500/10 dark:text-blue-300">
              <User size={26} />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-100">
                {user.full_name ||
                  `${user.first_name || ""} ${user.last_name || ""}`}
              </h2>
              <p className="mt-1 break-all text-sm text-slate-500 dark:text-zinc-400">
                {user.email}
              </p>
            </div>

            <span
              className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                user.is_active
                  ? "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20"
                  : "bg-red-50 text-red-700 ring-red-200 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20"
              }`}
            >
              {user.is_active ? "Active Account" : "Inactive Account"}
            </span>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailCard
              icon={User}
              label="First Name"
              value={user.first_name}
            />
            <DetailCard
              icon={User}
              label="Last Name"
              value={user.last_name}
            />
            <DetailCard
              icon={Mail}
              label="Email Address"
              value={user.email}
            />
            <DetailCard
              icon={Phone}
              label="Phone Number"
              value={`${user.phone_country_code || ""} ${user.phone_number || ""}`}
            />
            <DetailCard
              icon={Building2}
              label="Organization"
              value={user.organization_name}
            />
            <DetailCard
              icon={ShieldCheck}
              label="User ID"
              value={user.id}
            />
            <DetailCard
              icon={Building2}
              label="Organization ID"
              value={user.client_id}
            />
            <DetailCard
              icon={User}
              label="Referral Source"
              value={user.referral_source}
            />
          </div>
        </div>

        <form
          onSubmit={handleSave}
          className="rounded-xl border border-slate-200 bg-white p-5 sm:p-7 dark:border-white/[0.08] dark:bg-[#0C0D10]"
        >
          <div className="border-b border-slate-200 pb-4 dark:border-white/[0.08]">
            <h2 className="font-semibold text-slate-900 dark:text-zinc-100">
              Manage Account Access
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
              Change the user's role or activate/deactivate the account.
            </p>
          </div>

          {isOwnAccount && (
            <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300">
              You are viewing your own account. The backend does not allow you
              to change your own role or active status here.
            </p>
          )}

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">
              Role
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={isOwnAccount}
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-[#275982] disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/[0.12] dark:bg-[#111216] dark:text-zinc-100"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Superadmin</option>
              </select>
            </label>

            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-zinc-300">
                Account Status
              </p>

              <label className="mt-1.5 flex min-h-[43px] items-center gap-3 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 dark:border-white/[0.12] dark:bg-[#111216] dark:text-zinc-200">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  disabled={isOwnAccount}
                  className="h-4 w-4 accent-[#275982] disabled:cursor-not-allowed"
                />
                {isActive ? "Account is active" : "Account is inactive"}
              </label>
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 dark:border-white/[0.08] sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onBack}
              disabled={saving}
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-white/[0.12] dark:text-zinc-300 dark:hover:bg-white/[0.06]"
            >
              Back
            </button>

            <button
              type="submit"
              disabled={saving || isOwnAccount}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#275982] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1f496b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
