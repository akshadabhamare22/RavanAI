// import axios from "axios";
// import config from "../../../config/Config";

// // Get access token from localStorage
// const getAccessToken = () => {
//     return (
//         localStorage.getItem("access_token") ||
//         localStorage.getItem("accessToken")
//     );
// };

// // Common headers for all API requests
// const getHeaders = () => {
//     const token = getAccessToken();

//     if (!token) {
//         throw new Error("Access token missing. Please login again.");
//     }

//     return {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: `
// Bearer $ { token.trim() }
// `,
//     };
// };

// // Agents API service
// const agentsApi = {
//     // GET: Fetch all agents
//     getAll: async() => {
//         const response = await axios.get(
//             `
// $ { config.BASE_URL }
// /agents`, {
//                 headers: getHeaders(),
//             }
//         );

//         return response.data;
//     },

//     // GET: Fetch a single agent by ID
//     getById: async(agentId) => {
//         if (!agentId) {
//             throw new Error("Agent ID is required.");
//         }

//         const response = await axios.get(
//             `${config.BASE_URL}/agents/${agentId}`, {
//                 headers: getHeaders(),
//             }
//         );

//         return response.data;
//     },

//     // PATCH: Update agent
//     update: async(agentId, payload) => {
//         if (!agentId) {
//             throw new Error("Agent ID is required.");
//         }

//         try {
//             const response = await axios.patch(
//                 `${config.BASE_URL}/agents/${agentId}`,
//                 payload, {
//                     headers: getHeaders(),
//                 }
//             );

//             return response.data;
//         } catch (error) {
//             console.error("Update Agent API Error:", {
//                 status: error.response ?
//                     error.response.status : null,
//                 response: error.response ?
//                     error.response.data : error.message,
//                 payload,
//             });

//             throw error;
//         }
//     },

//     // DELETE: Delete agent
//     delete: async(agentId) => {
//         if (!agentId) {
//             throw new Error("Agent ID is required.");
//         }

//         const response = await axios.delete(
//             `${config.BASE_URL}/agents/${agentId}`, {
//                 headers: getHeaders(),
//             }
//         );

//         return response.data;
//     },
// };

// export default agentsApi;


// import axios from "axios";
// import config from "../../../config/Config";

// var BASE_URL = config.BASE_URL;
// var AGENTS_URL = BASE_URL + "/agents";

// export function getAccessToken() {
//     var auth = {};

//     try {
//         auth = JSON.parse(localStorage.getItem("ravanai_auth") || "{}");
//     } catch (error) {
//         auth = {};
//     }

//     return (
//         localStorage.getItem("access_token") ||
//         localStorage.getItem("accessToken") ||
//         auth.token ||
//         auth.access_token ||
//         ""
//     );
// }

// var api = axios.create({
//     baseURL: BASE_URL,
//     timeout: 30000,
// });

// api.interceptors.request.use(function(request) {
//     var token = getAccessToken();

//     if (token) {
//         request.headers = request.headers || {};
//         request.headers.Authorization = "Bearer " + token;
//     }

//     return request;
// });

// export function getApiError(error) {
//     if (error && error.response && error.response.data) {
//         var detail = error.response.data.detail;

//         if (typeof detail === "string") {
//             return detail;
//         }

//         if (Array.isArray(detail)) {
//             return detail
//                 .map(function(item) {
//                     if (item && item.msg) {
//                         return item.msg;
//                     }

//                     return JSON.stringify(item);
//                 })
//                 .join(", ");
//         }

//         if (error.response.data.message) {
//             return error.response.data.message;
//         }
//     }

//     if (error && error.message) {
//         return error.message;
//     }

//     return "Something went wrong. Please try again.";
// }

// var agentsApi = {
//     getAll: async function(params) {
//         var response = await api.get(AGENTS_URL, {
//             params: params || {},
//         });

//         return response.data;
//     },

//     getById: async function(id) {
//         var response = await api.get(AGENTS_URL + "/" + id);
//         return response.data;
//     },

//     create: async function(payload) {
//         var response = await api.post(AGENTS_URL, payload);
//         return response.data;
//     },

//     update: async function(id, payload) {
//         var response = await api.patch(AGENTS_URL + "/" + id, payload);
//         return response.data;
//     },

//     updateStatus: async function(id, status) {
//         var response = await api.patch(
//             AGENTS_URL + "/" + id + "/status", {
//                 status: status,
//             }
//         );

//         return response.data;
//     },

//     delete: async function(id) {
//         var response = await api.delete(AGENTS_URL + "/" + id);
//         return response.data;
//     },

//     getModels: async function() {
//         var response = await api.get("/models");
//         return response.data;
//     },

//     getVoices: async function(modelId) {
//         var response = await api.get(
//             "/models/" + encodeURIComponent(modelId) + "/voices"
//         );

//         return response.data;
//     },

//     createSession: async function(payload) {
//         var response = await api.post("/sessions", payload);
//         return response.data;
//     },

//     getSession: async function(sessionId) {
//         var response = await api.get(
//             "/sessions/" + encodeURIComponent(sessionId)
//         );

//         return response.data;
//     },

//     endSession: async function(sessionId) {
//         var response = await api.delete(
//             "/sessions/" + encodeURIComponent(sessionId)
//         );

//         return response.data;
//     },
// };

// export default agentsApi;

// import axios from "axios";
// import config from "../../../config/Config";

// var BASE_URL = config.BASE_URL;
// var AGENTS_URL = BASE_URL + "/agents";

// // ------------------------------------
// // ACCESS TOKEN
// // ------------------------------------

// export function getAccessToken() {
//     var auth = {};

//     try {
//         auth = JSON.parse(
//             localStorage.getItem("ravanai_auth") || "{}"
//         );
//     } catch (error) {
//         auth = {};
//     }

//     return (
//         localStorage.getItem("access_token") ||
//         localStorage.getItem("accessToken") ||
//         auth.token ||
//         auth.access_token ||
//         ""
//     );
// }

// // ------------------------------------
// // AXIOS INSTANCE
// // ------------------------------------

// var api = axios.create({
//     baseURL: BASE_URL,
//     timeout: 30000,
// });

// // ------------------------------------
// // REQUEST INTERCEPTOR
// // ------------------------------------

// api.interceptors.request.use(function(request) {
//     var token = getAccessToken();

//     if (token) {
//         request.headers = request.headers || {};
//         request.headers.Authorization = "Bearer " + token;
//     }

//     return request;
// });

// // ------------------------------------
// // API ERROR HANDLER
// // ------------------------------------

// export function getApiError(error) {
//     var response = error && error.response ?
//         error.response :
//         null;

//     var responseData = response && response.data ?
//         response.data :
//         null;

//     if (responseData) {
//         // Backend format:
//         // { error: { message: "..." }, detail: "..." }

//         if (
//             responseData.error &&
//             typeof responseData.error.message === "string"
//         ) {
//             return responseData.error.message;
//         }

//         if (typeof responseData.detail === "string") {
//             return responseData.detail;
//         }

//         if (Array.isArray(responseData.detail)) {
//             return responseData.detail.map(function(item) {
//                 var field = "";

//                 if (item && Array.isArray(item.loc)) {
//                     field = item.loc
//                         .filter(function(part) {
//                             return part !== "body";
//                         })
//                         .join(".");
//                 }

//                 var message = item && item.msg ?
//                     item.msg :
//                     "Invalid value";

//                 return field ?
//                     field + ": " + message :
//                     message;
//             }).join("; ");
//         }

//         if (typeof responseData.message === "string") {
//             return responseData.message;
//         }

//         if (
//             responseData.error &&
//             typeof responseData.error === "string"
//         ) {
//             return responseData.error;
//         }
//     }

//     if (response && response.status === 401) {
//         return "Session expired. Please log in again.";
//     }

//     if (response && response.status === 403) {
//         return "You do not have permission to perform this action.";
//     }

//     if (response && response.status === 404) {
//         return "Requested resource was not found.";
//     }

//     if (response && response.status === 409) {
//         return "This agent already exists or conflicts with existing data.";
//     }

//     if (error && error.message) {
//         return error.message;
//     }

//     return "Something went wrong. Please try again.";
// }

// // ------------------------------------
// // AGENTS API
// // ------------------------------------

// var agentsApi = {

//     // GET ALL AGENTS
//     getAll: async function(params) {
//         var response = await api.get(AGENTS_URL, {
//             params: params || {},
//         });

//         return response.data;
//     },

//     // GET AGENT DETAILS
//     getById: async function(agentId) {
//         var response = await api.get(
//             AGENTS_URL + "/" + encodeURIComponent(agentId)
//         );

//         return response.data;
//     },

//     // CREATE AGENT
//     create: async function(payload) {
//         var response = await api.post(
//             AGENTS_URL,
//             payload
//         );

//         return response.data;
//     },

//     // UPDATE AGENT
//     update: async function(id, payload) {
//         var response = await api.patch(
//             AGENTS_URL + "/" + encodeURIComponent(id),
//             payload
//         );

//         return response.data;
//     },

//     // ACTIVATE / DEACTIVATE AGENT
//     updateStatus: async function(id, status) {
//         var response = await api.patch(
//             AGENTS_URL + "/" + encodeURIComponent(id) + "/status", {
//                 status: status,
//             }
//         );

//         return response.data;
//     },

//     // DELETE AGENT
//     delete: async function(id) {
//         var response = await api.delete(
//             AGENTS_URL + "/" + encodeURIComponent(id)
//         );

//         return response.data;
//     },

//     // GET AVAILABLE MODELS
//     getModels: async function() {
//         var response = await api.get("/models");

//         return response.data;
//     },

//     // GET VOICES FOR MODEL
//     getVoices: async function(modelId) {
//         var response = await api.get(
//             "/models/" + encodeURIComponent(modelId) + "/voices"
//         );

//         return response.data;
//     },

//     // CREATE SESSION
//     createSession: async function(payload) {
//         var response = await api.post(
//             "/sessions",
//             payload
//         );

//         return response.data;
//     },

//     // GET SESSION
//     getSession: async function(sessionId) {
//         var response = await api.get(
//             "/sessions/" + encodeURIComponent(sessionId)
//         );

//         return response.data;
//     },

//     // END SESSION
//     endSession: async function(sessionId) {
//         var response = await api.delete(
//             "/sessions/" + encodeURIComponent(sessionId)
//         );

//         return response.data;
//     },
// };

// export default agentsApi;

import axios from "axios";
import config from "../../../config/Config";

var BASE_URL = config.BASE_URL;
var AGENTS_URL = BASE_URL + "/agents";

// ------------------------------------
// ACCESS TOKEN
// ------------------------------------

export function getAccessToken() {
    var auth = {};

    try {
        auth = JSON.parse(
            localStorage.getItem("ravanai_auth") || "{}"
        );
    } catch (error) {
        auth = {};
    }

    return (
        localStorage.getItem("access_token") ||
        localStorage.getItem("accessToken") ||
        auth.token ||
        auth.access_token ||
        ""
    );
}

// ------------------------------------
// AXIOS INSTANCE
// ------------------------------------

var api = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
});

// ------------------------------------
// REQUEST INTERCEPTOR
// ------------------------------------

api.interceptors.request.use(function(request) {
    var token = getAccessToken();

    if (token) {
        request.headers = request.headers || {};
        request.headers.Authorization = "Bearer " + token;
    }

    return request;
});

// ------------------------------------
// API ERROR HANDLER
// ------------------------------------

export function getApiError(error) {
    var response = error && error.response ?
        error.response :
        null;

    var responseData = response && response.data ?
        response.data :
        null;

    if (responseData) {
        // Backend format:
        // { error: { message: "..." }, detail: "..." }

        if (
            responseData.error &&
            typeof responseData.error.message === "string"
        ) {
            return responseData.error.message;
        }

        if (typeof responseData.detail === "string") {
            return responseData.detail;
        }

        if (Array.isArray(responseData.detail)) {
            return responseData.detail.map(function(item) {
                var field = "";

                if (item && Array.isArray(item.loc)) {
                    field = item.loc
                        .filter(function(part) {
                            return part !== "body";
                        })
                        .join(".");
                }

                var message = item && item.msg ?
                    item.msg :
                    "Invalid value";

                return field ?
                    field + ": " + message :
                    message;
            }).join("; ");
        }

        if (typeof responseData.message === "string") {
            return responseData.message;
        }

        if (
            responseData.error &&
            typeof responseData.error === "string"
        ) {
            return responseData.error;
        }
    }

    if (response && response.status === 401) {
        return "Session expired. Please log in again.";
    }

    if (response && response.status === 403) {
        return "You do not have permission to perform this action.";
    }

    if (response && response.status === 404) {
        return "Requested resource was not found.";
    }

    if (response && response.status === 409) {
        return "This agent already exists or conflicts with existing data.";
    }

    if (error && error.message) {
        return error.message;
    }

    return "Something went wrong. Please try again.";
}

// ------------------------------------
// AGENTS API
// ------------------------------------

var agentsApi = {

    // GET ALL AGENTS
    getAll: async function(params) {
        var response = await api.get(AGENTS_URL, {
            params: params || {},
        });

        return response.data;
    },

    // GET AGENT DETAILS
    getById: async function(agentId) {
        var response = await api.get(
            AGENTS_URL + "/" + encodeURIComponent(agentId)
        );

        return response.data;
    },

    // CREATE AGENT
    create: async function(payload) {
        var response = await api.post(
            AGENTS_URL,
            payload
        );

        return response.data;
    },

    // UPDATE AGENT
    update: async function(id, payload) {
        var response = await api.patch(
            AGENTS_URL + "/" + encodeURIComponent(id),
            payload
        );

        return response.data;
    },

    // ACTIVATE / DEACTIVATE AGENT
    updateStatus: async function(id, status) {
        var response = await api.patch(
            AGENTS_URL + "/" + encodeURIComponent(id) + "/status", {
                status: status,
            }
        );

        return response.data;
    },

    // DELETE AGENT
    delete: async function(id) {
        var response = await api.delete(
            AGENTS_URL + "/" + encodeURIComponent(id)
        );

        return response.data;
    },

    // GET AVAILABLE MODELS
    getModels: async function() {
        var response = await api.get("/models");

        return response.data;
    },

    // GET VOICES FOR MODEL
    getVoices: async function(modelId) {
        var response = await api.get(
            "/models/" + encodeURIComponent(modelId) + "/voices"
        );

        return response.data;
    },

    // Combined catalog and optional server-side voice filters.
    getCatalog: async function() {
        var response = await api.get("/catalog");
        return response.data;
    },

    getCatalogVoices: async function(params) {
        var response = await api.get("/catalog/voices", { params: params || {} });
        return response.data;
    },

    getCatalogAccents: async function(params) {
        var response = await api.get("/catalog/accents", { params: params || {} });
        return response.data;
    },

    // Authenticated binary WAV response; caller owns playback and URL cleanup.
    getVoicePreview: async function(voiceId, options = {}) {
        if (!voiceId) throw new Error("Voice ID is required.");
        if (!getAccessToken()) throw new Error("Please login again.");
        var response = await api.get(
            "/catalog/voices/" + encodeURIComponent(voiceId) + "/preview", {
                headers: { Accept: "audio/wav" },
                responseType: "blob",
                signal: options.signal,
                timeout: 45000,
            }
        );
        return response.data;
    },

    // CREATE SESSION
    createSession: async function(payload) {
        var response = await api.post(
            "/sessions",
            payload
        );

        return response.data;
    },

    // GET SESSION
    getSession: async function(sessionId) {
        var response = await api.get(
            "/sessions/" + encodeURIComponent(sessionId)
        );

        return response.data;
    },

    // END SESSION
    endSession: async function(sessionId) {
        var response = await api.delete(
            "/sessions/" + encodeURIComponent(sessionId)
        );

        return response.data;
    },
};

export default agentsApi;