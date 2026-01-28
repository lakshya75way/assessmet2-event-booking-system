import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { storageService } from "../storage/storage.service";
import { notificationService } from "../notification/notification.service";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storageService.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.data) {
      const data = error.response.data as { message?: string; error?: string };
      const serverMessage = data?.message || data?.error;
      if (serverMessage) {
        error.message = serverMessage;
      }
    }

    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/login")
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = storageService.getRefreshToken();
        const response = await axios.post("/api/auth/refresh", {
          refreshToken,
        });
        const { token } = response.data;
        storageService.setToken(token);
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        storageService.clearAuth();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    if (error.code === "ERR_NETWORK") {
      notificationService.error(
        "Unable to connect to the server. Please check your internet connection or backend status.",
      );
    }

    return Promise.reject(error);
  },
);

export { apiClient };
