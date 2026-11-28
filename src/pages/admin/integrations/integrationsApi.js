import axios from "axios";
import config from "../../../config/Config";

const integrationsApi = axios.create({
    baseURL: config.BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach the logged-in user's token.
integrationsApi.interceptors.request.use(
    function(request) {
        let token = localStorage.getItem("access_token");

        if (!token) {
            token = localStorage.getItem("token");
        }

        if (!token) {
            const savedAuth = localStorage.getItem("ravanai_auth");

            if (savedAuth) {
                try {
                    const parsedAuth = JSON.parse(savedAuth);
                    token = parsedAuth.access_token || parsedAuth.token;
                } catch (error) {
                    console.error("Unable to read saved authentication:", error);
                }
            }
        }

        if (token) {
            request.headers.Authorization = "Bearer " + token;
        }

        return request;
    },
    function(error) {
        return Promise.reject(error);
    }
);

const integrationsApiService = {
    // Get integrations for the logged-in client.
    getIntegrations: function(params) {
        return integrationsApi.get("/integrations", {
            params: params || {},
        });
    },

    // Connect Cal.com.
    connectCalcom: function(payload) {
        return integrationsApi.post("/integrations/calcom/connect", payload);
    },

    // Connect GoHighLevel.
    connectGhl: function(payload) {
        return integrationsApi.post("/integrations/ghl/connect", payload);
    },

    // Disconnect an integration.
    disconnectIntegration: function(integrationId) {
        return integrationsApi.delete("/integrations/" + integrationId);
    },

    // Cal.com event types.
    getCalcomEventTypes: function() {
        return integrationsApi.get("/integrations/calcom/event-types");
    },

    // Cal.com bookings.
    getCalcomBookings: function(status) {
        const params = {};

        if (status) {
            params.status = status;
        }

        return integrationsApi.get("/integrations/calcom/bookings", {
            params: params,
        });
    },

    // GoHighLevel calendars.
    getGhlCalendars: function() {
        return integrationsApi.get("/integrations/ghl/calendars");
    },

    // GoHighLevel appointments.
    getGhlAppointments: function(calendarId, from, to) {
        const params = {
            calendar_id: calendarId,
        };

        if (from) {
            params.from = from;
        }

        if (to) {
            params.to = to;
        }

        return integrationsApi.get("/integrations/ghl/appointments", {
            params: params,
        });
    },
};

// Common API error formatter.
export const getIntegrationApiError = function(error) {
    if (error && error.response && error.response.data) {
        const data = error.response.data;

        if (typeof data.detail === "string") {
            return data.detail;
        }

        if (Array.isArray(data.detail)) {
            return data.detail
                .map(function(item) {
                    return item.msg || "Validation error";
                })
                .join(", ");
        }

        if (data.message) {
            return data.message;
        }
    }

    if (error && error.message) {
        return error.message;
    }

    return "Something went wrong. Please try again.";
};

export default integrationsApiService;