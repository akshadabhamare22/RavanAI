
import React, { useEffect, useState } from "react";
import { ArrowLeft, UserPlus, Loader2, AlertCircle } from "lucide-react";

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

const inputClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-[#275982] focus:ring-2 focus:ring-blue-100 dark:border-white/[0.12] dark:bg-[#111216] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:ring-cyan-500/10";

const labelClass = "text-sm font-medium text-slate-700 dark:text-zinc-300";

export default function CreateUser({ onCancel, onCreated }) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_country_code: "+91",
    phone_number: "",
    password: "",
    role: "user",
    client_id: "",
  });

  const [organizations, setOrganizations] = useState([]);
  const [organizationsLoading, setOrganizationsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrganizations = async () => {
      setOrganizationsLoading(true);

      try {
        const token = getAuthToken();

        const response = await fetch(
          `${Config.BASE_URL}/admin/organizations?limit=200&offset=0`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(await readError(response));
        }

        const data = await response.json();
        setOrganizations(Array.isArray(data.items) ? data.items : []);
      } catch (err) {
        setError(`Unable to load organizations: ${err.message}`);
      } finally {
        setOrganizationsLoading(false);
      }
    };

    loadOrganizations();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
      ...(name === "role" && value === "superadmin"
        ? { client_id: "" }
        : {}),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (form.password.length > 72) {
      setError("Password must not exceed 72 characters.");
      return;
    }

    if (form.role !== "superadmin" && !form.client_id) {
      setError("Please select an organization for this account.");
      return;
    }

    const payload = {
      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),
      email: form.email.trim().toLowerCase(),
      phone_country_code: form.phone_country_code.trim(),
      phone_number: form.phone_number.trim(),
      password: form.password,
      role: form.role,
      client_id: form.role === "superadmin" ? null : form.client_id,
    };

    setSubmitting(true);

    try {
      const token = getAuthToken();

      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      const response = await fetch(`${Config.BASE_URL}/users`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(await readError(response));
      }

      await response.json();
      onCreated?.();
    } catch (err) {
      setError(err.message || "Unable to create user.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 dark:bg-[#08090B]">
      <div className="mx-auto max-w-4xl space-y-6">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to Users
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
            Create Platform User
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
            Create a Superadmin, organization Admin or User account.
          </p>
        </div>

        {error && (
          <div className="flex gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
            <AlertCircle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl border border-slate-200 bg-white p-5 sm:p-7 dark:border-white/[0.08] dark:bg-[#0C0D10]"
        >
          <section>
            <h2 className="font-semibold text-slate-900 dark:text-zinc-100">
              Personal Information
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                First Name *
                <input
                  required
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  maxLength={100}
                  className={inputClass}
                  placeholder="Enter first name"
                />
              </label>

              <label className={labelClass}>
                Last Name *
                <input
                  required
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  maxLength={100}
                  className={inputClass}
                  placeholder="Enter last name"
                />
              </label>

              <label className={labelClass}>
                Email Address *
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="name@example.com"
                />
              </label>

              <div>
                <label className={labelClass}>Phone Number *</label>
                <div className="mt-1.5 flex gap-2">
                  <input
                    required
                    name="phone_country_code"
                    value={form.phone_country_code}
                    onChange={handleChange}
                    className={`${inputClass} mt-0 w-24`}
                    placeholder="+91"
                  />
                  <input
                    required
                    name="phone_number"
                    value={form.phone_number}
                    onChange={handleChange}
                    className={`${inputClass} mt-0 flex-1`}
                    placeholder="9876543210"
                  />
                </div>
              </div>

              <label className={`${labelClass} sm:col-span-2`}>
                Password *
                <input
                  required
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  minLength={8}
                  maxLength={72}
                  className={inputClass}
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                />
                <span className="mt-1 block text-xs font-normal text-slate-500 dark:text-zinc-500">
                  Password must be between 8 and 72 characters.
                </span>
              </label>
            </div>
          </section>

          <div className="border-t border-slate-200 dark:border-white/[0.08]" />

          <section>
            <h2 className="font-semibold text-slate-900 dark:text-zinc-100">
              Account Access
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                User Role *
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Superadmin</option>
                </select>
              </label>

              {form.role !== "superadmin" && (
                <label className={labelClass}>
                  Organization *
                  <select
                    name="client_id"
                    value={form.client_id}
                    onChange={handleChange}
                    required
                    disabled={organizationsLoading}
                    className={inputClass}
                  >
                    <option value="">
                      {organizationsLoading
                        ? "Loading organizations..."
                        : "Select organization"}
                    </option>
                    {organizations.map((organization) => (
                      <option key={organization.id} value={organization.id}>
                        {organization.name}
                      </option>
                    ))}
                  </select>
                  {!organizationsLoading && organizations.length === 0 && (
                    <span className="mt-1 block text-xs text-red-500">
                      No organizations were returned by the API.
                    </span>
                  )}
                </label>
              )}
            </div>

            {form.role === "superadmin" && (
              <p className="mt-3 rounded-lg bg-purple-50 p-3 text-sm text-purple-700 dark:bg-purple-500/10 dark:text-purple-300">
                This account will be created as a platform-level Superadmin
                without an organization.
              </p>
            )}
          </section>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 dark:border-white/[0.08] sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              disabled={submitting}
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-white/[0.12] dark:text-zinc-300 dark:hover:bg-white/[0.06]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting || organizationsLoading}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#275982] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1f496b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <UserPlus size={16} />
                  Create User
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
