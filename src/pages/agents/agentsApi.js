import axios from "axios";
import config from "../../config/Config";

// Get access token from localStorage
const getAccessToken = () => {
    return (
        localStorage.getItem("access_token") ||
        localStorage.getItem("accessToken")
    );
};

// Common headers for all API requests
const getHeaders = () => {
    const token = getAccessToken();

    if (!token) {
        throw new Error("Access token missing. Please login again.");
    }

    return {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `
Bearer $ { token.trim() }
`,
    };
};

// Agents API service
const agentsApi = {
    // GET: Fetch all agents
    getAll: async() => {
        const response = await axios.get(
            `
$ { config.BASE_URL }
/agents`, {
                headers: getHeaders(),
            }
        );

        return response.data;
    },

    // GET: Fetch a single agent by ID
    getById: async(agentId) => {
        if (!agentId) {
            throw new Error("Agent ID is required.");
        }

        const response = await axios.get(
            `${config.BASE_URL}/agents/${agentId}`, {
                headers: getHeaders(),
            }
        );

        return response.data;
    },

    // PATCH: Update agent
    update: async(agentId, payload) => {
        if (!agentId) {
            throw new Error("Agent ID is required.");
        }

        try {
            const response = await axios.patch(
                `${config.BASE_URL}/agents/${agentId}`,
                payload, {
                    headers: getHeaders(),
                }
            );

            return response.data;
        } catch (error) {
            console.error("Update Agent API Error:", {
                status: error.response ?
                    error.response.status : null,
                response: error.response ?
                    error.response.data : error.message,
                payload,
            });

            throw error;
        }
    },

    // DELETE: Delete agent
    delete: async(agentId) => {
        if (!agentId) {
            throw new Error("Agent ID is required.");
        }

        const response = await axios.delete(
            `${config.BASE_URL}/agents/${agentId}`, {
                headers: getHeaders(),
            }
        );

        return response.data;
    },
};

export default agentsApi;