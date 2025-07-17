import { CookieName } from "@/types/cookie-enum";
import axios, { type AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { useAuthStore } from "@/store/auth-store";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

const refreshAndRetryQueue: RetryQueueItem[] = [];
let isRefreshing = false;

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers["Authorization"] = `${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalConfig = error.config;

    if (error.response?.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const response = await axiosInstance.post("/auth/refresh-token");
          const { accessToken } = response.data;
          Cookies.set(CookieName.ACCESS_TOKEN, accessToken);
          useAuthStore.getState().setAccessToken(accessToken);

          refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
            config.headers["Authorization"] = accessToken;
            axiosInstance.request(config).then(resolve).catch(reject);
          });

          refreshAndRetryQueue.length = 0;
          return await axiosInstance(originalConfig);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve, reject) => {
        refreshAndRetryQueue.push({ config: originalConfig, resolve, reject });
      });
    }

    if (error.response?.status === 403) {
      console.log("Forbidden - logging out");
      // useAuthStore.getState().logout();
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
