import { useQuery } from "react-query";
import { getUserSearch } from "./api/apiChat";

//Obtener usuario por email
export const userSearch = (email: string) => {
  return useQuery(["userSearchChat"], () => getUserSearch(email), {
    enabled: false,
  });
};
