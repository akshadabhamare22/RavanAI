import axios from "axios";
import config from "../config/Config";

const campaignClient = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

// Get authentication token
const getToken = () => {
  const directToken = localStorage.getItem("access_token");

  if (directToken) return directToken;

  try {
    const auth = JSON.parse(
      localStorage.getItem("ravanai_auth") || "{}"
    );

    return auth.token || auth.access_token || null;
  } catch (error) {
    return null;
  }
};

// Attach token to every request
campaignClient.interceptors.request.use(
  (request) => {
    const token = getToken();

    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
  },
  (error) => Promise.reject(error)
);

const campaignApi = {
  list: (params = {}) =>
    campaignClient.get("/campaigns", { params }),

  stats: (params = {}) =>
    campaignClient.get("/campaigns/stats", { params }),

  get: (campaignId) =>
    campaignClient.get(`/campaigns/${campaignId}`),

  create: (payload) =>
    campaignClient.post("/campaigns", payload),

  update: (campaignId, payload) =>
    campaignClient.patch(`/campaigns/${campaignId}`, payload),

  remove: (campaignId) =>
    campaignClient.delete(`/campaigns/${campaignId}`),

  start: (campaignId) =>
    campaignClient.post(`/campaigns/${campaignId}/start`),

  pause: (campaignId) =>
    campaignClient.post(`/campaigns/${campaignId}/pause`),

  resume: (campaignId) =>
    campaignClient.post(`/campaigns/${campaignId}/resume`),

  listContacts: (campaignId, params = {}) =>
    campaignClient.get(`/campaigns/${campaignId}/contacts`, {
      params,
    }),

  addContacts: (campaignId, payload) =>
    campaignClient.post(
      `/campaigns/${campaignId}/contacts`,
      payload
    ),

  removeContact: (campaignId, contactId) =>
    campaignClient.delete(
      `/campaigns/${campaignId}/contacts/${contactId}`
    ),
};

export default campaignApi;