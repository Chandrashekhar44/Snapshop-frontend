import axios, { AxiosRequestConfig } from "axios";
import { connectSocket } from "./socket";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    console.log("INTERCEPTOR ERROR:", error.response?.status);

    const originalRequest =
      error.config as CustomAxiosRequestConfig;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/api/auth/refresh-token"
    ) {
      console.log("TRYING REFRESH");

      originalRequest._retry = true;

      try {
        console.log("Calling refresh endpoint...");

        const refreshRes = await api.post(
          "/api/auth/refresh-token"
        );

        console.log("Refresh response:", refreshRes.status);

        const retryResponse = await api(originalRequest);

        console.log("Retry successful:", retryResponse.status);

        connectSocket();

        return retryResponse;
      } catch (err) {
        console.log("REFRESH FAILED:", err);

        window.location.href = "/sign-in";

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;