import axios from "axios";
import config from "../../../config/Config";

const API_URL = config.BASE_URL + "/phone-numbers";

const getAuthToken = () => {
    let token = localStorage.getItem("access_token");

    if (!token) {
        token = localStorage.getItem("token");
    }

    if (!token) {
        const authData = localStorage.getItem("ravanai_auth");

        if (authData) {
            try {
                const parsed = JSON.parse(authData);
                token =
                    parsed.access_token ||
                    parsed.token ||
                    (parsed.data && parsed.data.access_token) ||
                    "";
            } catch (error) {
                console.error("Unable to read authentication data:", error);
            }
        }
    }

    return token;
};

const getHeaders = () => {
    const token = getAuthToken();

    return {
        Authorization: token ? "Bearer " + token : "",
        "Content-Type": "application/json",
    };
};

const handleApiError = (error) => {
    if (error && error.response && error.response.data) {
        const data = error.response.data;

        if (typeof data.detail === "string") {
            return data.detail;
        }

        if (Array.isArray(data.detail)) {
            return data.detail
                .map((item) => item.msg)
                .join(", ");
        }

        if (typeof data.message === "string") {
            return data.message;
        }
    }

    if (error && error.message) {
        return error.message;
    }

    return "Something went wrong. Please try again.";
};

const phoneNumbersApi = {
    getAll: async(params = {}) => {
        try {
            const response = await axios.get(API_URL, {
                headers: getHeaders(),
                params: {
                    limit: 200,
                    offset: 0,
                    ...params,
                },
            });

            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },

    create: async(payload) => {
        try {
            const response = await axios.post(API_URL, payload, {
                headers: getHeaders(),
            });

            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },

    update: async(id, payload) => {
        try {
            const response = await axios.patch(
                API_URL + "/" + id,
                payload, {
                    headers: getHeaders(),
                }
            );

            return response.data;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },

    delete: async(id) => {
        try {
            await axios.delete(API_URL + "/" + id, {
                headers: getHeaders(),
            });

            return true;
        } catch (error) {
            throw new Error(handleApiError(error));
        }
    },
};

export default phoneNumbersApi;