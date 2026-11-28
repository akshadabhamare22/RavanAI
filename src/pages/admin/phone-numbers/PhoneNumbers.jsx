
import React, { useEffect, useState } from "react";
import {
  Phone,
  PhoneCall,
  Plus,
  Search,
  RefreshCw,
  Pencil,
  Trash2,
  X,
  Check,
  Loader2,
  AlertCircle,
  Smartphone,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

import phoneNumbersApi from "./phoneNumbersApi";

const PROVIDERS = [
  { id: "mock", name: "Mock" },
  { id: "twilio", name: "Twilio" },
  { id: "telnyx", name: "Telnyx" },
  { id: "indian-telephony", name: "Indian Telephony" },
  { id: "whatsapp", name: "WhatsApp" },
  { id: "custom", name: "Custom Provider" },
];

const initialForm = {
  number: "",
  label: "",
  provider: "mock",
  provider_number_id: "",
};

export default function PhoneNumbers() {
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const [showModal, setShowModal] = useState(false);
  const [editingNumber, setEditingNumber] = useState(null);

  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchPhoneNumbers = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {};

      if (activeFilter === "active") {
        params.is_active = true;
      }

      if (activeFilter === "inactive") {
        params.is_active = false;
      }

      const response = await phoneNumbersApi.getAll(params);

      const items = response.items || [];

      setPhoneNumbers(items);
      setTotal(
        typeof response.total === "number"
          ? response.total
          : items.length
      );
    } catch (err) {
      setError(err.message || "Unable to fetch phone numbers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhoneNumbers();
  }, [activeFilter]);

  const filteredNumbers = phoneNumbers.filter((item) => {
    const searchValue = search.toLowerCase();

    return (
      (item.number || "").toLowerCase().includes(searchValue) ||
      (item.label || "").toLowerCase().includes(searchValue) ||
      (item.provider || "").toLowerCase().includes(searchValue)
    );
  });

  const openCreateModal = () => {
    setEditingNumber(null);
    setForm(initialForm);
    setError("");
    setMessage("");
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingNumber(item);

    setForm({
      number: item.number || "",
      label: item.label || "",
      provider: item.provider || "mock",
      provider_number_id: item.provider_number_id || "",
    });

    setError("");
    setMessage("");
    setShowModal(true);
  };

  const closeModal = () => {
    if (submitting) return;

    setShowModal(false);
    setEditingNumber(null);
    setForm(initialForm);
    setError("");
  };

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!form.number.trim()) {
      setError("Phone number is required.");
      return;
    }

    const payload = {};

    if (editingNumber) {
      payload.label = form.label.trim() || null;
      payload.provider_number_id =
        form.provider_number_id.trim() || null;
    } else {
      payload.number = form.number.trim();
      payload.label = form.label.trim() || null;
      payload.provider = form.provider || "mock";
      payload.provider_number_id =
        form.provider_number_id.trim() || null;
    }

    try {
      setSubmitting(true);

      if (editingNumber) {
        await phoneNumbersApi.update(editingNumber.id, payload);
        setMessage("Phone number updated successfully.");
      } else {
        await phoneNumbersApi.create(payload);
        setMessage("Phone number added successfully.");
      }

      setShowModal(false);
      setEditingNumber(null);
      setForm(initialForm);

      await fetchPhoneNumbers();
    } catch (err) {
      setError(err.message || "Unable to save phone number.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (item) => {
    try {
      setError("");
      setMessage("");

      await phoneNumbersApi.update(item.id, {
        is_active: !item.is_active,
      });

      setMessage(
        item.is_active
          ? "Phone number deactivated successfully."
          : "Phone number activated successfully."
      );

      await fetchPhoneNumbers();
    } catch (err) {
      setError(err.message || "Unable to update phone number status.");
    }
  };

  const handleDelete = async (item) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete " + item.number + "?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setMessage("");

      await phoneNumbersApi.delete(item.id);

      setMessage("Phone number deleted successfully.");

      await fetchPhoneNumbers();
    } catch (err) {
      setError(err.message || "Unable to delete phone number.");
    }
  };

  const getProviderName = (providerId) => {
    const provider = PROVIDERS.find(
      (item) => item.id === providerId
    );

    return provider ? provider.name : providerId || "Mock";
  };

  return (
    <div className="min-h-screen bg-zinc-100 p-4 text-zinc-900 transition-colors duration-300 dark:bg-[#09090B] dark:text-zinc-100 sm:p-6">

      <div className="mx-auto max-w-[1600px]">

        {/* HEADER */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <PhoneCall size={20} />
              </div>

              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  Phone Numbers
                </h1>
                <p className="mt-0.5 text-xs text-zinc-500">
                  Manage your registered phone numbers
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={fetchPhoneNumbers}
              disabled={loading}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-4 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-50 dark:border-white/[0.08] dark:bg-[#151518] dark:text-zinc-300 dark:hover:bg-white/[0.05]"
            >
              <RefreshCw
                size={14}
                className={loading ? "animate-spin" : ""}
              />
              Refresh
            </button>

            <button
              onClick={openCreateModal}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-cyan-600 px-4 text-xs font-semibold text-white transition hover:bg-cyan-500"
            >
              <Plus size={15} />
              Add Phone Number
            </button>
          </div>
        </div>

        {/* NOTIFICATIONS */}
        {message && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-600 dark:text-emerald-400">
            <Check size={15} />
            {message}
            <button
              onClick={() => setMessage("")}
              className="ml-auto"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {error && !showModal && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-600 dark:text-red-400">
            <AlertCircle size={15} />
            {error}
            <button
              onClick={() => setError("")}
              className="ml-auto"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* SUMMARY */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-zinc-500">
                Total Phone Numbers
              </p>
              <Phone size={17} className="text-cyan-500" />
            </div>
            <h2 className="mt-3 text-2xl font-bold tabular-nums">
              {total}
            </h2>
          </div>

          <div className="rounded-xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-zinc-500">
                Active Numbers
              </p>
              <ToggleRight size={19} className="text-emerald-500" />
            </div>
            <h2 className="mt-3 text-2xl font-bold tabular-nums">
              {phoneNumbers.filter((item) => item.is_active).length}
            </h2>
          </div>

          <div className="rounded-xl border border-black/[0.06] bg-white p-5 dark:border-white/[0.08] dark:bg-[#101012]">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-zinc-500">
                Inactive Numbers
              </p>
              <ToggleLeft size={19} className="text-zinc-400" />
            </div>
            <h2 className="mt-3 text-2xl font-bold tabular-nums">
              {phoneNumbers.filter((item) => !item.is_active).length}
            </h2>
          </div>

        </div>

        {/* TABLE CONTAINER */}
        <div className="overflow-hidden rounded-xl border border-black/[0.06] bg-white dark:border-white/[0.08] dark:bg-[#101012]">

          {/* TABLE TOOLBAR */}
          <div className="flex flex-col gap-3 border-b border-black/[0.06] p-4 dark:border-white/[0.06] sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-sm font-semibold">
                Registered Numbers
              </h2>
              <p className="mt-1 text-[11px] text-zinc-500">
                View and manage configured phone numbers
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">

              <div className="relative">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search numbers..."
                  className="h-9 w-full rounded-lg border border-black/[0.08] bg-zinc-50 pl-9 pr-3 text-xs outline-none transition focus:border-cyan-500 sm:w-56 dark:border-white/[0.08] dark:bg-[#151518]"
                />
              </div>

              <select
                value={activeFilter}
                onChange={(event) => setActiveFilter(event.target.value)}
                className="h-9 rounded-lg border border-black/[0.08] bg-zinc-50 px-3 text-xs outline-none focus:border-cyan-500 dark:border-white/[0.08] dark:bg-[#151518]"
              >
                <option value="all">All Numbers</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">

            <table className="w-full min-w-[850px] text-left">

              <thead>
                <tr className="border-b border-black/[0.06] bg-zinc-50/70 dark:border-white/[0.06] dark:bg-white/[0.02]">
                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                    Phone Number
                  </th>
                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                    Label
                  </th>
                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                    Provider
                  </th>
                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                    Provider Number ID
                  </th>
                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                    Status
                  </th>
                  <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="py-16 text-center">
                      <Loader2
                        size={22}
                        className="mx-auto animate-spin text-cyan-500"
                      />
                      <p className="mt-3 text-xs text-zinc-500">
                        Loading phone numbers...
                      </p>
                    </td>
                  </tr>
                ) : filteredNumbers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-16 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-400 dark:bg-white/[0.04]">
                        <Smartphone size={22} />
                      </div>
                      <p className="mt-3 text-sm font-semibold">
                        No phone numbers found
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        Add a phone number to get started.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredNumbers.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-black/[0.05] transition hover:bg-zinc-50/70 dark:border-white/[0.05] dark:hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                            <Phone size={15} />
                          </div>
                          <span className="text-xs font-semibold">
                            {item.number}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-xs text-zinc-600 dark:text-zinc-400">
                        {item.label || "—"}
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-md border border-black/[0.06] bg-zinc-50 px-2.5 py-1 text-[11px] font-medium dark:border-white/[0.08] dark:bg-white/[0.03]">
                          {getProviderName(item.provider)}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-xs text-zinc-500">
                        {item.provider_number_id || "—"}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={
                            item.is_active
                              ? "inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400"
                              : "inline-flex items-center gap-1.5 rounded-full bg-zinc-500/10 px-2.5 py-1 text-[10px] font-semibold text-zinc-500"
                          }
                        >
                          <span
                            className={
                              item.is_active
                                ? "h-1.5 w-1.5 rounded-full bg-emerald-500"
                                : "h-1.5 w-1.5 rounded-full bg-zinc-400"
                            }
                          />
                          {item.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1.5">

                          <button
                            onClick={() => handleToggleStatus(item)}
                            title={item.is_active ? "Deactivate" : "Activate"}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-cyan-600 dark:hover:bg-white/[0.06]"
                          >
                            {item.is_active ? (
                              <ToggleRight size={17} />
                            ) : (
                              <ToggleLeft size={17} />
                            )}
                          </button>

                          <button
                            onClick={() => openEditModal(item)}
                            title="Edit"
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-cyan-600 dark:hover:bg-white/[0.06]"
                          >
                            <Pencil size={15} />
                          </button>

                          <button
                            onClick={() => handleDelete(item)}
                            title="Delete"
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-red-500/10 hover:text-red-500"
                          >
                            <Trash2 size={15} />
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>

          <div className="flex flex-col gap-2 border-t border-black/[0.06] px-5 py-3 text-[11px] text-zinc-500 dark:border-white/[0.06] sm:flex-row sm:items-center sm:justify-between">
            <span>
              Showing {filteredNumbers.length} of {total} phone numbers
            </span>
            <span>Maximum 200 records per request</span>
          </div>

        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-2xl dark:border-white/[0.08] dark:bg-[#141416]">

            <div className="flex items-center justify-between border-b border-black/[0.06] px-6 py-4 dark:border-white/[0.06]">
              <div>
                <h2 className="text-base font-bold">
                  {editingNumber ? "Edit Phone Number" : "Add Phone Number"}
                </h2>
                <p className="mt-1 text-[11px] text-zinc-500">
                  {editingNumber
                    ? "Update the supported phone number details"
                    : "Register a new phone number"}
                </p>
              </div>

              <button
                onClick={closeModal}
                disabled={submitting}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/[0.06]"
              >
                <X size={17} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">

              {error && (
                <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-600 dark:text-red-400">
                  <AlertCircle size={15} className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-4">

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="number"
                    value={form.number}
                    onChange={handleInputChange}
                    disabled={Boolean(editingNumber)}
                    placeholder="+919876543210"
                    required={!editingNumber}
                    className="h-10 w-full rounded-lg border border-black/[0.08] bg-zinc-50 px-3 text-sm outline-none transition focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/[0.08] dark:bg-[#0e0e10]"
                  />
                  <p className="mt-1 text-[10px] text-zinc-500">
                    Use country code, for example +919876543210.
                  </p>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    Label
                  </label>
                  <input
                    type="text"
                    name="label"
                    value={form.label}
                    onChange={handleInputChange}
                    maxLength={120}
                    placeholder="e.g. Support Number"
                    className="h-10 w-full rounded-lg border border-black/[0.08] bg-zinc-50 px-3 text-sm outline-none transition focus:border-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0e10]"
                  />
                </div>

                {!editingNumber && (
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                      Provider
                    </label>
                    <select
                      name="provider"
                      value={form.provider}
                      onChange={handleInputChange}
                      className="h-10 w-full rounded-lg border border-black/[0.08] bg-zinc-50 px-3 text-sm outline-none transition focus:border-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0e10]"
                    >
                      {PROVIDERS.map((provider) => (
                        <option key={provider.id} value={provider.id}>
                          {provider.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    Provider Number ID
                  </label>
                  <input
                    type="text"
                    name="provider_number_id"
                    value={form.provider_number_id}
                    onChange={handleInputChange}
                    maxLength={120}
                    placeholder="Enter provider number ID"
                    className="h-10 w-full rounded-lg border border-black/[0.08] bg-zinc-50 px-3 text-sm outline-none transition focus:border-cyan-500 dark:border-white/[0.08] dark:bg-[#0e0e10]"
                  />
                </div>

              </div>

              <div className="mt-7 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={submitting}
                  className="h-10 rounded-lg border border-black/[0.08] px-4 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-white/[0.08] dark:text-zinc-300 dark:hover:bg-white/[0.04]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-cyan-600 px-5 text-xs font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check size={14} />
                      {editingNumber ? "Save Changes" : "Add Number"}
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
