import axios from "axios";

const http = (token, fallback) => {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const instance = axios.create({
    headers,
    baseURL:
      import.meta.env.BACKEND_URL || "https://nervous-waders-cod.cyclic.app",
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      if (err.response.status === 401) {
        return Promise.reject(fallback(err.response.data.message));
      }
    }
  );

  return instance;
};
export default http;
