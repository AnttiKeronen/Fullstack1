
//https://www.geeksforgeeks.org/html/what-is-axios/ helped me with axios

import axios from "axios";
const api = axios.create({ baseURL: "/" });
api.interceptors.request.use((config) => {  // Automatically adds JWT token
  const raw = localStorage.getItem("auth");
  if (raw) {
    try {
      const { token } = JSON.parse(raw);
      if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch {
    }
  }
  return config;
});
export default api;
