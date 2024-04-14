import { API } from "../config/url.config";
import { useQueryConfig } from "../config/useQuery.config";
import { useAuthStore } from "../store";
import { useGetData } from "./useGetData";

const useCached = (key) => {
  const { token } = useAuthStore();
  const { data: cached } = useGetData(
    key,
    `${process.env.NEXT_PUBLIC_URL}/${API.isAuthenticated}?token=${token}`,
    useQueryConfig
  );
  return { cached };
};
export { useCached };
