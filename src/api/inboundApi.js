
import axios from "axios";
import config from "../config/Config";

// Get access token from the existing login storage
const getAccessToken = () => {
  const directToken = localStorage.getItem("access_token");

  if (directToken) {
    return directToken;
  }

  try {
    const authData = JSON.parse(
      localStorage.getItem("ravanai_auth") || "{}"
    );

    return authData.token || authData.access_token || "";
  } catch (error) {
    console.error("Failed to read authentication data:", error);
    return "";
  }
};

// Axios instance
const api = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Attach authentication token to every request
api.interceptors.request.use(
  (requestConfig) => {
    const token = getAccessToken();

    if (!token) {
      throw new Error("Access token missing. Please login again.");
    }

    requestConfig.headers.Authorization = `Bearer ${token.trim()}`;

    return requestConfig;
  },
  (error) => Promise.reject(error)
);

// Common error handler
const parseError = (error, fallback) => {
  const detail =
    error?.response?.data?.detail ??
    error?.response?.data?.message;

  if (Array.isArray(detail)) {
    return detail
      .map((item) => item?.msg || item?.message || String(item))
      .filter(Boolean)
      .join(", ");
  }

  return detail || error?.message || fallback;
};

// Inbound Routes API
export const inboundApi = {
  // GET: List Inbound Routes
  async list(params = {}) {
    try {
      const { data } = await api.get("/inbound/routes", {
        params,
      });

      return data;
    } catch (error) {
      throw new Error(
        parseError(error, "Failed to load inbound routes.")
      );
    }
  },

  // GET: Get Inbound Route by ID
  async get(routeId) {
    try {
      const { data } = await api.get(
        `/inbound/routes/${routeId}`
      );

      return data;
    } catch (error) {
      throw new Error(
        parseError(error, "Failed to load inbound route.")
      );
    }
  },

  // POST: Create Inbound Route
  async create(payload) {
    try {
      const { data } = await api.post(
        "/inbound/routes",
        payload
      );

      return data;
    } catch (error) {
      throw new Error(
        parseError(error, "Failed to create inbound route.")
      );
    }
  },

  // PATCH: Update Inbound Route
  async update(routeId, payload) {
    try {
      const { data } = await api.patch(
        `/inbound/routes/${routeId}`,
        payload
      );

      return data;
    } catch (error) {
      throw new Error(
        parseError(error, "Failed to update inbound route.")
      );
    }
  },

  // DELETE: Delete Inbound Route
  async remove(routeId) {
    try {
      const { data } = await api.delete(
        `/inbound/routes/${routeId}`
      );

      return data;
    } catch (error) {
      throw new Error(
        parseError(error, "Failed to delete inbound route.")
      );
    }
  },
};

export default inboundApi;
