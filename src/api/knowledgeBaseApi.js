import axios from "axios";
import config from "../config/Config";

const api = axios.create({
  baseURL: config.BASE_URL,
  headers: { Accept: "*/*" },
});

const parseError = (error, fallback) => {
  const detail = error?.response?.data?.detail ?? error?.response?.data?.message;
  if (Array.isArray(detail)) {
    return detail.map((item) => item?.msg || item?.message || String(item)).filter(Boolean).join(", ");
  }
  return detail || error?.message || fallback;
};

export const knowledgeBaseApi = {
  async list() {
    try {
      const { data } = await api.get("/knowledge-bases");
      return data;
    } catch (error) {
      throw new Error(parseError(error, "Failed to load knowledge bases."));
    }
  },

  async get(id) {
    try {
      const { data } = await api.get(`/knowledge-bases/${id}`);
      return data;
    } catch (error) {
      throw new Error(parseError(error, "Failed to load knowledge base."));
    }
  },

  async create(payload) {
    try {
      const { data } = await api.post("/knowledge-bases", payload, {
        headers: { "Content-Type": "application/json" },
      });
      return data;
    } catch (error) {
      throw new Error(parseError(error, "Failed to create knowledge base."));
    }
  },

  async update(id, payload) {
    try {
      const { data } = await api.patch(`/knowledge-bases/${id}`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      return data;
    } catch (error) {
      // Some FastAPI deployments expose PUT rather than PATCH. Do not silently
      // switch methods unless the backend explicitly rejects PATCH with 405.
      if (error?.response?.status === 405) {
        try {
          const { data } = await api.put(`/knowledge-bases/${id}`, payload, {
            headers: { "Content-Type": "application/json" },
          });
          return data;
        } catch (putError) {
          throw new Error(parseError(putError, "Failed to update knowledge base."));
        }
      }
      throw new Error(parseError(error, "Failed to update knowledge base."));
    }
  },

  async remove(id) {
    try {
      const { data } = await api.delete(`/knowledge-bases/${id}`);
      return data;
    } catch (error) {
      throw new Error(parseError(error, "Failed to delete knowledge base."));
    }
  },

  async listSources(knowledgeBaseId) {
    try {
      const { data } = await api.get(`/knowledge-bases/${knowledgeBaseId}/sources`);
      return data;
    } catch (error) {
      throw new Error(parseError(error, "Failed to load sources."));
    }
  },

  async getSource(knowledgeBaseId, sourceId) {
    try {
      const { data } = await api.get(`/knowledge-bases/${knowledgeBaseId}/sources/${sourceId}`);
      return data;
    } catch (error) {
      throw new Error(parseError(error, "Failed to load source."));
    }
  },

  async createSource(knowledgeBaseId, payload) {
    try {
      const { data } = await api.post(
        `/knowledge-bases/${knowledgeBaseId}/sources`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      return data;
    } catch (error) {
      throw new Error(parseError(error, "Failed to create source."));
    }
  },

  async uploadSource(knowledgeBaseId, file) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await api.post(
        `/knowledge-bases/${knowledgeBaseId}/sources/upload`,
        formData
      );
      return data;
    } catch (error) {
      throw new Error(parseError(error, "Failed to upload source file."));
    }
  },
};

export default knowledgeBaseApi;
