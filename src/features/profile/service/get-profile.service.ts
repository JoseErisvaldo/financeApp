import { api } from "@/shared/api/api";
import type { ProfileResponse } from "../types/profile.types";

export const getProfileService = async () => {
  const response = await api.get<ProfileResponse>("/users/me");
  return response.data.data;
};
