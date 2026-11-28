import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Plus, Search, RefreshCw, Users, Pencil, Trash2, Upload, Loader2,
  AlertCircle, X, ChevronLeft, ChevronRight,
} from "lucide-react";
import { toast } from "react-toastify";

import ThemeToggle from "../../../components/ThemeToggle";
import contactsApi, { getApiError } from "./contactsApi";
import {
  ContactFormModal,
  ConfirmDeleteModal,
  ImportContactsModal,
  ContactDrawer,
  fmtDate,
} from "./ContactsParts";

const PAGE_SIZE = 25;

const Contacts = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);

  const [selected, setSelected] = useState(() => new Set());

  const [formState, setFormState] = useState(null); // { contact | null }
  const [importOpen, setImportOpen] = useState(false);
  const [drawerContact, setDrawerContact] = useState(null);
  const [confirm, setConfirm] = useState(null); // { ids, message }
  const [deleting, setDeleting] = useState(false);

  const requestRef = useRef(0);

  // Debounce the search box -> server-side search
  useEffect(() => {
    const t = setTimeout(() => {
      setQuery(searchInput);
      setPage(0);
    }, 350);
    return () => clearTimeout(t);
  }, [searchInput]);

  const fetchContacts = useCallback(
    async (showLoader = true) => {
      const requestId = ++requestRef.current;
      if (showLoader) setLoading(true);
      setError("");
      try {
        const data = await contactsApi.getAll({
          search: query,
          limit: PAGE_SIZE,
          offset: page * PAGE_SIZE,
        });
        if (requestId !== requestRef.current) return; // a newer request is in flight

        // Deleted the last row of the last page -> step back
        if (data.items.length === 0 && data.total > 0 && page > 0) {
          setPage(Math.max(0, Math.ceil(data.total / PAGE_SIZE) - 1));
          return;
        }
        setItems(data.items || []);
        setTotal(data.total || 0);
      } catch (err) {
        if (requestId !== requestRef.current) return;
        const message = getApiError(err);
        setError(message);
        toast.error(message);
      } finally {
        if (requestId === requestRef.current) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    },
    [query, page]
  );

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // Selection is per-page; clear it when the page or search changes
  useEffect(() => {
    setSelected(new Set());
  }, [page, query]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchContacts(false);
  };

  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const allOnPageSelected = items.length > 0 && items.every((c) => selected.has(c.id));

  const toggleAll = () => {
    setSelected(allOnPageSelected ? new Set() : new Set(items.map((c) => c.id)));
  };
  const toggleOne = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSaved = (saved) => {
    const wasEdit = Boolean(formState?.contact);
    setFormState(null);
    if (wasEdit) {
      setItems((prev) => prev.map((c) => (c.id === saved.id ? saved : c)));
      setDrawerContact((cur) => (cur && cur.id === saved.id ? saved : cur));
    } else if (page !== 0) {
      setPage(0);
    } else {
      fetchContacts(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!confirm) return;
    setDeleting(true);
    try {
      if (confirm.ids.length === 1) {
        await contactsApi.remove(confirm.ids[0]);
        toast.success("Contact deleted");
      } else {
        const res = await contactsApi.bulkDelete(confirm.ids);
        toast.success(`${res.deleted} contact${res.deleted === 1 ? "" : "s"} deleted`);
      }
      setDrawerContact((cur) => (cur && confirm.ids.includes(cur.id) ? null : cur));
      setSelected(new Set());
      setConfirm(null);
      fetchContacts(false);
    } catch (err) {
      toast.error(getApiError(err));
    } finally {
      setDeleting(false);
    }
  };

  const askDeleteOne = (contact) =>
    setConfirm({
      ids: [contact.id],
      message: `Delete ${contact.name || contact.phone}? Their notes will be removed too. Past call records are kept.`,
    });

  const askDeleteSelected = () =>
    setConfirm({
      ids: Array.from(selected),
      message: `Delete ${selected.size} selected contact${selected.size === 1 ? "" : "s"}? This cannot be undone.`,
    });

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-5 text-zinc-900 dark:bg-[#08090B] dark:text-zinc-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        {/* HEADER */}
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <Users size={21} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">Contacts</h1>
              <p className="mt-0.5 text-xs text-zinc-500">People your campaigns and agents call</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <ThemeToggle />
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex h-10 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 text-xs font-semibold hover:bg-zinc-50 disabled:opacity-50 dark:border-white/10 dark:bg-[#111315] dark:hover:bg-white/5"
            >
              <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
              Refresh
            </button>
            <button
              onClick={() => setImportOpen(true)}
              className="flex h-10 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 text-xs font-semibold hover:bg-zinc-50 dark:border-white/10 dark:bg-[#111315] dark:hover:bg-white/5"
            >
              <Upload size={14} />
              Import
            </button>
            <button
              onClick={() => setFormState({ contact: null })}
              className="flex h-10 items-center gap-2 rounded-lg bg-cyan-500 px-4 text-xs font-semibold text-white transition hover:bg-cyan-400"
            >
              <Plus size={15} />
              Add Contact
            </button>
          </div>
        </div>

        {/* SEARCH + BULK BAR */}
        <div className="mb-5 flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-3 dark:border-white/[0.07] dark:bg-[#111315] sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by name or phone..."
              className="h-10 w-full rounded-lg border border-zinc-200 bg-zinc-50 pl-9 pr-9 text-xs outline-none focus:border-cyan-500 dark:border-white/10 dark:bg-[#0b0c0e]"
            />
            {searchInput && (
              <button onClick={() => setSearchInput("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
                <X size={14} />
              </button>
            )}
          </div>

          {selected.size > 0 && (
            <button
              onClick={askDeleteSelected}
              className="flex h-10 items-center gap-2 rounded-lg border border-red-500/20 px-3 text-xs font-semibold text-red-500 hover:bg-red-500/5"
            >
              <Trash2 size={13} /> Delete {selected.size} selected
            </button>
          )}

          <p className="text-xs text-zinc-500">
            {total} contact{total === 1 ? "" : "s"}
          </p>
        </div>

        {error && (
          <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-500">
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        {/* TABLE */}
        {loading ? (
          <div className="flex min-h-[280px] items-center justify-center gap-2 text-sm text-zinc-500">
            <Loader2 size={18} className="animate-spin" />
            Loading contacts...
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-300 px-5 py-16 text-center dark:border-white/10">
            <Users size={32} className="mx-auto mb-3 text-zinc-400" />
            <h3 className="text-sm font-semibold">No contacts found</h3>
            <p className="mt-1 text-xs text-zinc-500">
              {query ? "Try another search term." : "Add a contact or import a CSV to get started."}
            </p>
            {!query && (
              <div className="mt-4 flex justify-center gap-2">
                <button onClick={() => setImportOpen(true)} className="rounded-lg border border-zinc-200 px-4 py-2.5 text-xs font-semibold dark:border-white/10">
                  Import CSV
                </button>
                <button onClick={() => setFormState({ contact: null })} className="rounded-lg bg-cyan-500 px-4 py-2.5 text-xs font-semibold text-white">
                  Add Contact
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white dark:border-white/[0.07] dark:bg-[#111315]">
            <table className="w-full min-w-[760px] text-left text-xs">
              <thead className="border-b border-zinc-100 text-[11px] uppercase tracking-wide text-zinc-500 dark:border-white/[0.06]">
                <tr>
                  <th className="w-10 px-4 py-3">
                    <input type="checkbox" checked={allOnPageSelected} onChange={toggleAll} className="accent-cyan-500" />
                  </th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Phone</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Added</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setDrawerContact(c)}
                    className="cursor-pointer border-b border-zinc-100 last:border-0 hover:bg-zinc-50 dark:border-white/[0.05] dark:hover:bg-white/[0.03]"
                  >
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" checked={selected.has(c.id)} onChange={() => toggleOne(c.id)} className="accent-cyan-500" />
                    </td>
                    <td className="px-4 py-3 font-semibold">{c.name || <span className="font-normal text-zinc-400">Unnamed</span>}</td>
                    <td className="px-4 py-3 tabular-nums">{c.phone}</td>
                    <td className="px-4 py-3 text-zinc-500">{c.email || "—"}</td>
                    <td className="px-4 py-3 text-zinc-500">{fmtDate(c.created_at)}</td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end gap-2">
                        <button
                          title="Edit"
                          onClick={() => setFormState({ contact: c })}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 hover:bg-zinc-50 dark:border-white/10 dark:hover:bg-white/5"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          title="Delete"
                          onClick={() => askDeleteOne(c)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/20 text-red-500 hover:bg-red-500/5"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION */}
        {!loading && total > PAGE_SIZE && (
          <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
            <span>
              {page * PAGE_SIZE + 1}–{Math.min(total, (page + 1) * PAGE_SIZE)} of {total}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 disabled:opacity-40 dark:border-white/10"
              >
                <ChevronLeft size={14} />
              </button>
              <span>Page {page + 1} / {pageCount}</span>
              <button
                onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                disabled={page >= pageCount - 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 disabled:opacity-40 dark:border-white/10"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {formState && (
        <ContactFormModal
          contact={formState.contact}
          onClose={() => setFormState(null)}
          onSaved={handleSaved}
        />
      )}

      {importOpen && (
        <ImportContactsModal
          onClose={() => setImportOpen(false)}
          onImported={() => {
            if (page !== 0) setPage(0);
            else fetchContacts(false);
          }}
        />
      )}

      {drawerContact && (
        <ContactDrawer
          contact={drawerContact}
          onClose={() => setDrawerContact(null)}
          onEdit={(c) => setFormState({ contact: c })}
          onDelete={askDeleteOne}
        />
      )}

      {confirm && (
        <ConfirmDeleteModal
          title="Delete contact"
          message={confirm.message}
          loading={deleting}
          onClose={() => !deleting && setConfirm(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

export default Contacts;
