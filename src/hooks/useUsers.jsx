import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";
import useAuth from "./useAuth";

const useUsers = () => {
  const secureAxios = useSecureAxios();
  const { user } = useAuth();

  const {
    data: allUsers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await secureAxios.get("/allUsers");
      return res.data;
    },
  });
  return [allUsers, refetch, isLoading];
};

export default useUsers;