import { useQuery } from "@tanstack/react-query";
import { getProfileService } from "../service/get-profile.service";

export default function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfileService,
  });
}
