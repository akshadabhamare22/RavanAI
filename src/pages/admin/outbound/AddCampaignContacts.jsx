import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Search, Loader2, Users } from "lucide-react";
import { api, campaignApi, getApiError } from "./Outboundcalls";

// ============================================================
// ADD CONTACTS TO A CAMPAIGN
// GET  /contacts                          -> contacts you can pick from
// POST /campaigns/{campaign_id}/contacts  -> body: { contact_ids: [...] }
// ============================================================

export default function AddCampaignContacts({
  campaignId,
  existingContactIds = [],
  onClose,
  onAdded,
}) {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ----------------------------------------------------------
  // GET contacts
  // ----------------------------------------------------------
  useEffect(() => {
    let active = true;

    const loadContacts = async () => {
      try {
        setLoading(true);
        setError("");

        const { data } = await api.get("/contacts", {
          params: { limit: 500, offset: 0 },
        });

        if (active) {
          setContacts(Array.isArray(data?.items) ? data.items : []);
        }
      } catch (err) {
        if (active) setError(getApiError(err, "Failed to load contacts."));
      } finally {
        if (active) setLoading(false);
      }
    };

    loadContacts();

    return () => {
      active = false;
    };
  }, []);

  // Contacts that are not already inside this campaign
  const availableContacts = useMemo(() => {
    const existing = new Set(existingContactIds);
    return contacts.filter((contact) => !existing.has(contact.id));
  }, [contacts, existingContactIds]);

  const filteredContacts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return availableContacts;

    return availableContacts.filter(
      (contact) =>
        (contact.name || "").toLowerCase().includes(query) ||
        (contact.phone || "").toLowerCase().includes(query) ||
        (contact.email || "").toLowerCase().includes(query)
    );
  }, [availableContacts, search]);

  const allFilteredSelected =
    filteredContacts.length > 0 &&
    filteredContacts.every((contact) => selected.includes(contact.id));

  const toggleContact = (contactId) => {
    setSelected((current) =>
      current.includes(contactId)
        ? current.filter((id) => id !== contactId)
        : [...current, contactId]
    );
  };

  const toggleAll = () => {
    const ids = filteredContacts.map((contact) => contact.id);

    setSelected((current) =>
      allFilteredSelected
        ? current.filter((id) => !ids.includes(id))
        : Array.from(new Set([...current, ...ids]))
    );
  };

  // ----------------------------------------------------------
  // POST add contacts
  // ----------------------------------------------------------
  const handleAdd = async () => {
    if (selected.length === 0 || saving) return;

    try {
      setSaving(true);
      setError("");

      const response = await campaignApi.addContacts(campaignId, {
        contact_ids: selected,
      });

      // { added, already_in_campaign, not_found }
      if (onAdded) onAdded(response?.data);
      if (onClose) onClose();
    } catch (err) {
      setError(getApiError(err, "Failed to add contacts."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={saving ? undefined : onClose}
      />

      <div className="relative flex max-h-[90vh] w-full max-w-[640px] flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-2xl dark:border-white/[0.08] dark:bg-[#101012]">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-black/[0.06] px-6 py-5 dark:border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/25 bg-cyan-500/[0.06]">
              <Users size={17} className="text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Add Contacts
              </h3>
              <p className="mt-0.5 text-[12px] text-zinc-500">
                Select the contacts this campaign should call
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-md p-1 text-zinc-500 transition hover:bg-black/[0.05] hover:text-zinc-800 disabled:opacity-50 dark:hover:bg-white/[0.06] dark:hover:text-zinc-200"
            aria-label="Close"
          >
            <X size={17} />
          </button>
        </div>

        {/* Search */}
        <div className="border-b border-black/[0.06] px-6 py-3 dark:border-white/[0.06]">
          <div className="flex h-10 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 dark:border-white/[0.08] dark:bg-[#0e0f12]">
            <Search size={14} className="text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone or email..."
              className="min-w-0 flex-1 bg-transparent text-[13px] text-zinc-800 outline-none placeholder:text-zinc-500 dark:text-zinc-200"
            />
          </div>

          {filteredContacts.length > 0 && (
            <label className="mt-3 flex cursor-pointer items-center gap-2 text-[12px] text-zinc-600 dark:text-zinc-400">
              <input
                type="checkbox"
                checked={allFilteredSelected}
                onChange={toggleAll}
                className="h-4 w-4 accent-cyan-500"
              />
              Select all ({filteredContacts.length})
            </label>
          )}
        </div>

        {/* List */}
        <div className="min-h-[200px] flex-1 overflow-y-auto px-6 py-4">
          {loading ? (
            <div className="flex min-h-[180px] items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Loader2 size={25} className="animate-spin text-cyan-500" />
                <p className="text-sm text-zinc-500">Loading contacts...</p>
              </div>
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="flex min-h-[180px] flex-col items-center justify-center text-center">
              <p className="text-[13px] text-zinc-500">
                {contacts.length === 0
                  ? "No contacts found."
                  : availableContacts.length === 0
                    ? "All your contacts are already in this campaign."
                    : "No contacts match your search."}
              </p>

              {contacts.length === 0 && (
                <button
                  type="button"
                  onClick={() => navigate("/contacts")}
                  className="mt-3 text-[13px] font-medium text-cyan-600 hover:underline dark:text-cyan-400"
                >
                  Go to Contacts
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredContacts.map((contact) => {
                const isSelected = selected.includes(contact.id);

                return (
                  <label
                    key={contact.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition ${
                      isSelected
                        ? "border-cyan-500/50 bg-cyan-500/[0.04]"
                        : "border-black/[0.06] bg-white hover:border-cyan-500/30 dark:border-white/[0.08] dark:bg-white/[0.02]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleContact(contact.id)}
                      className="h-4 w-4 accent-cyan-500"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
                        {contact.name || contact.phone}
                      </p>
                      <p className="mt-0.5 truncate text-[11px] text-zinc-500">
                        {contact.name ? contact.phone : ""}
                        {contact.email
                          ? `${contact.name ? " • " : ""}${contact.email}`
                          : ""}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mx-6 mb-3 rounded-lg border border-red-500/20 bg-red-500/[0.06] px-3 py-2.5">
            <p className="text-xs font-medium text-red-600 dark:text-red-400">
              {error}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-black/[0.06] px-6 py-4 dark:border-white/[0.06]">
          <p className="text-[12px] text-zinc-500">
            {selected.length} selected
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-black/[0.04] disabled:opacity-50 dark:text-zinc-300 dark:hover:bg-white/[0.05]"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleAdd}
              disabled={selected.length === 0 || saving}
              className="inline-flex min-w-[120px] items-center justify-center gap-2 rounded-lg bg-cyan-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-cyan-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-cyan-400 dark:text-slate-950"
            >
              {saving ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Adding...
                </>
              ) : (
                `Add ${selected.length || ""} Contact${selected.length === 1 ? "" : "s"}`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}