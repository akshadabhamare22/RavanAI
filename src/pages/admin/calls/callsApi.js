import axios from "axios";
import config from "../../../config/Config";

const api = axios.create({
    baseURL: config.BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// --------------------------------------------------
// AUTH TOKEN
// --------------------------------------------------

api.interceptors.request.use(
    (request) => {
        let token =
            localStorage.getItem("access_token") ||
            localStorage.getItem("token");

        if (!token) {
            try {
                const authData = JSON.parse(
                    localStorage.getItem("ravanai_auth") || "{}"
                );

                token =
                    authData.access_token ||
                    authData.token ||
                    authData.accessToken;
            } catch (error) {
                console.error("Unable to read authentication data:", error);
            }
        }

        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
        }

        return request;
    },
    (error) => Promise.reject(error)
);

// --------------------------------------------------
// ERROR HANDLER
// --------------------------------------------------


export const getCallsApiError = (error) => {
    var response = error && error.response;
    var data = response && response.data;
    var detail = data && data.detail;

    if (typeof detail === "string") {
        return detail;
    }

    if (Array.isArray(detail)) {
        return detail
            .map(function(item) {
                return (item && item.msg) || "Validation error";
            })
            .join(", ");
    }

    return (
        (data && data.message) ||
        (error && error.message) ||
        "Something went wrong. Please try again."
    );
};


// --------------------------------------------------
// CALLS API
// --------------------------------------------------

const callsApi = {
    // GET ALL CALLS
    getAll: async(params = {}) => {
        const response = await api.get("/calls", { params });
        return response.data;
    },

    // GET AGENTS FOR FILTER
    getAgents: async(params = {}) => {
        const response = await api.get("/agents", { params });
        return response.data;
    },

    // GET CALL DETAILS
    getById: async(callId) => {
        const response = await api.get(
            `/calls/${encodeURIComponent(callId)}`
        );

        return response.data;
    },

    // DOWNLOAD TRANSCRIPT
    downloadTranscript: async(callId, format = "txt") => {
        const response = await api.get(
            `/calls/${encodeURIComponent(callId)}/transcript`, {
                params: { format },
                responseType: "blob",
            }
        );

        return response.data;
    },

    // EXPORT CSV
    exportCsv: async(params = {}) => {
        const response = await api.get("/calls/export", {
            params,
            responseType: "blob",
        });

        return response.data;
    },

    // ANALYZE CALL
    analyze: async(callId) => {
        const response = await api.post(
            `/calls/${encodeURIComponent(callId)}/analyze`
        );

        return response.data;
    },
};

export default callsApi;