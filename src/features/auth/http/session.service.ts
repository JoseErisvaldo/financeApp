import axios, { type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../store/auth.store";
import type { RefreshResponse } from "../types/auth.types";

export type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

export const redirectToLogin = () => {
  if (typeof window !== "undefined" && window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

export const clearSession = () => {
  useAuthStore.getState().logout();
  redirectToLogin();
};

export const refreshSession = async () => {
  const { refreshToken, user, setAuth } = useAuthStore.getState();

  if (!refreshToken) {
    clearSession();
    throw new Error("No refresh token available");
  }

  try {
    const response = await axios.post<RefreshResponse>(
      `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
      { refreshToken },
      { withCredentials: true },
    );

    setAuth({
      user: response.data.data.user ?? user,
      accessToken: response.data.data.accessToken,
      refreshToken: response.data.data.refreshToken ?? refreshToken,
    });

    return response.data.data.accessToken;
  } catch (error) {
    clearSession();
    throw error;
  }
};
