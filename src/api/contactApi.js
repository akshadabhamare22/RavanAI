import axios from "axios";
import config from "../config/Config";

// Get access token from the existing login storage
const getAccessToken = () => {
  const directToken =
    localStorage.getItem("access_token") ||
    localStorage.getItem("accessToken");

  if (directToken) return directToken.trim();

  try {
    const authData = JSON.parse(
      localStorage.getItem("ravanai_auth") || "{}"
    );

    return String(authData.token || authData.access_token || "").trim();
  } catch (error) {
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

    requestConfig.headers.Authorization = `Bearer ${token}`;

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

// Contacts API
export const contactApi = {
  // GET: List Contacts  ->  /contacts   (search, limit up to 500, offset)
  async list(params = {}) {
    try {
      const { data } = await api.get("/contacts", {
        params: { limit: 500, offset: 0, ...params },
      });

      return data;
    } catch (error) {
      throw new Error(parseError(error, "Failed to load contacts."));
    }
  },
};

export default contactApi;