import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "../types/auth.types";

type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setAuth: (data: {
    user: AuthState["user"];
    accessToken: string;
    refreshToken: string;
  }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      setAuth: ({ user, accessToken, refreshToken }) =>
        set({ user, accessToken, refreshToken, isAuthenticated: true }),

      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
        useAuthStore.persist.clearStorage();
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
