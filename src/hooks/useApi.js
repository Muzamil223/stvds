import { useState, useCallback } from "react";
import axios from "axios";

const BASE = import.meta.env.VITE_API_URL;
export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const upload = useCallback(async (file, onProgress) => {
    setLoading(true); setError(null);
    try {
      const form = new FormData();
      form.append("video", file);
      const { data } = await axios.post(`${BASE}/upload`, form, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => onProgress?.(Math.round((e.loaded / e.total) * 100)),
      });
      return data;
    } catch (e) {
      setError(e.response?.data?.error || e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const process = useCallback(async (jobId) => {
    const { data } = await axios.post(`${BASE}/process/${jobId}`);
    return data;
  }, []);

  const pollStatus = useCallback(async (jobId) => {
    const { data } = await axios.get(`${BASE}/status/${jobId}`);
    return data;
  }, []);

  const getResults = useCallback(async (jobId) => {
    const { data } = await axios.get(`${BASE}/results/${jobId}`);
    return data;
  }, []);

  return { upload, process, pollStatus, getResults, loading, error };
}
