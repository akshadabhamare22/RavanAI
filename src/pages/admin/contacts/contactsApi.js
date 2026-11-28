import axios from "axios";
import config from "../../../config/Config"; // adjust the relative path if your folder depth differs

const getToken = () =>
  localStorage.getItem("access_token") || localStorage.getItem("accessToken");

const client = axios.create({ baseURL: config.BASE_URL });

client.interceptors.request.use((request) => {
  const token = getToken();
  if (token) request.headers.Authorization = `Bearer ${token}`;
  request.headers.Accept = "application/json";
  return request;
});

// ------------------------------------------------------------
// Errors
// ------------------------------------------------------------
export const getApiError = (error, fallback = "Something went wrong. Please try again.") => {
  const data = error?.response?.data;
  const detail = data?.detail;
  if (Array.isArray(detail)) {
    return detail
      .map((item) => {
        const field = Array.isArray(item?.loc)
          ? item.loc.filter((p) => p !== "body").join(".")
          : "Field";
        return `${field || "Field"}: ${item?.msg || "Invalid value"}`;
      })
      .join("; ");
  }
  if (typeof detail === "string") return detail;
  if (typeof data?.message === "string") return data.message;
  if (typeof error?.message === "string") return error.message;
  return fallback;
};

// ------------------------------------------------------------
// Same phone rules as the backend (app/schemas/contact.py)
// Returns the normalized phone, or throws an Error with the reason.
// ------------------------------------------------------------
export const normalizePhone = (value) => {
  const v = String(value ?? "")
    .trim()
    .replace(/[\s\-()]/g, "");
  if (!v) throw new Error("phone is required");
  const digits = v.startsWith("+") ? v.slice(1) : v;
  if (!/^\d+$/.test(digits)) throw new Error("phone must contain only digits and an optional leading +");
  if (digits.length < 6 || digits.length > 20) throw new Error("phone length looks wrong");
  return v.startsWith("+") ? `+${digits}` : digits;
};

// ------------------------------------------------------------
// Contacts API
// ------------------------------------------------------------
const contactsApi = {
  // GET /contacts?search=&limit=&offset=  ->  { total, items }
  async getAll({ search = "", limit = 25, offset = 0 } = {}) {
    const params = { limit, offset };
    if (search.trim()) params.search = search.trim();
    const { data } = await client.get("/contacts", { params });
    return data;
  },

  // POST /contacts  { phone, name?, email?, attributes? }
  async create(body) {
    const { data } = await client.post("/contacts", body);
    return data;
  },

  // POST /contacts/bulk  { contacts: [...] }  ->  { total, items }
  async bulkCreate(contacts) {
    const { data } = await client.post("/contacts/bulk", { contacts });
    return data;
  },

  // PATCH /contacts/{id}  { name?, email?, attributes? }   (phone cannot be changed)
  async update(id, body) {
    const { data } = await client.patch(`/contacts/${id}`, body);
    return data;
  },

  // DELETE /contacts/{id}  -> 204
  async remove(id) {
    await client.delete(`/contacts/${id}`);
  },

  // POST /contacts/bulk-delete  { ids }  ->  { deleted }
  async bulkDelete(ids) {
    const { data } = await client.post("/contacts/bulk-delete", { ids });
    return data;
  },

  // ---- extras ----
  async getStats(id) {
    const { data } = await client.get(`/contacts/${id}/stats`);
    return data;
  },
  async getActivities(id) {
    const { data } = await client.get(`/contacts/${id}/activities`);
    return data;
  },
  async getCalls(id, { limit = 50, offset = 0 } = {}) {
    const { data } = await client.get(`/contacts/${id}/calls`, { params: { limit, offset } });
    return data;
  },
  async getCampaigns(id) {
    const { data } = await client.get(`/contacts/${id}/campaigns`);
    return data;
  },
  async getNotes(id) {
    const { data } = await client.get(`/contacts/${id}/notes`);
    return data;
  },
  async addNote(id, body) {
    const { data } = await client.post(`/contacts/${id}/notes`, { body });
    return data;
  },
  async deleteNote(id, noteId) {
    await client.delete(`/contacts/${id}/notes/${noteId}`);
  },
};

export default contactsApi;
