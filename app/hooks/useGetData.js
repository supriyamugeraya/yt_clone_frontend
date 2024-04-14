import { useQuery } from "react-query";
import axios from "axios";
import { config } from "../config/header.config";
import { useAuthStore } from "../store";

export const useGetData = (key, url, QueryConfig = {}, body = {}) => {
  const { token } = useAuthStore();
  const { data, error, isLoading, isFetched } = useQuery(
    key,
    async () => {
      console.log("Token ", token);
      return await axios.get(url, config(token));
    },
    {
      ...QueryConfig,
      queryHash: key,
    }
  );

  return { data: data?.data, error, isLoading, isFetched };
};
