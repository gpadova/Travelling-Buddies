import { useQuery } from "@tanstack/react-query";
import { getSession } from "../http/auth";

export function useUserSession() {
  return useQuery({
    queryKey: ["user-session"],
    queryFn: getSession,
  });
}
