import axios, { type AxiosInstance } from "axios";
import { useAuthStore } from "../store/auth.store";
import {
  clearSession,
  refreshSession,
  type RetryableRequestConfig,
} from "./session.service";

const canRetryUnauthorizedRequest = (
  request?: RetryableRequestConfig,
): request is RetryableRequestConfig => {
  return (
    !!request && !request._retry && !request.url?.includes("/auth/refresh")
  );
};

const attachAccessToken = (config: RetryableRequestConfig) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

const retryWithFreshToken = async (
  api: AxiosInstance,
  request: RetryableRequestConfig,
) => {
  request._retry = true;

  const newAccessToken = await refreshSession();
  request.headers.Authorization = `Bearer ${newAccessToken}`;

  return api(request);
};

const handleUnauthorizedError = async (api: AxiosInstance, error: unknown) => {
  if (!axios.isAxiosError(error) || error.response?.status !== 401) {
    return Promise.reject(error);
  }

  const request = error.config as RetryableRequestConfig | undefined;

  if (!canRetryUnauthorizedRequest(request)) {
    clearSession();
    return Promise.reject(error);
  }

  try {
    return await retryWithFreshToken(api, request);
  } catch (refreshError) {
    return Promise.reject(refreshError);
  }
};

export const configureAuthInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use(
    (config) => attachAccessToken(config as RetryableRequestConfig),
    (error) => Promise.reject(error),
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => handleUnauthorizedError(api, error),
  );
};
