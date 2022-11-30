import { useQuery, useQueryClient } from "react-query";
import { getUserSearch } from "./api/apiChat";

export const userSearch = (email: string) => {
  return useQuery(["userSearchChat"], () => getUserSearch(email), {
    enabled: false,
  });
};
