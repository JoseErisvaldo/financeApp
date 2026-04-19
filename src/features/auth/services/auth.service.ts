import { api } from "../../../shared/api/api";
import type { LoginPayload, LoginResponse } from "../types/auth.types";

export const loginService = async (data: LoginPayload) => {
  const response = await api.post<LoginResponse>("/auth/login", data);
  return response.data;
};
