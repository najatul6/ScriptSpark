import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";
import useAuth from "./useAuth";

const useUser = () => {
  const secureAxios = useSecureAxios();
  const { user, loading } = useAuth();

  const { data: dbUser = null,refetch, isLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: [user?.email],
    queryFn: async () => {
      const res = await secureAxios.get(`/users/${user?.email}`);
      return res.data; 
    },
  });

  return [dbUser, refetch, isLoading]; 
};

export default useUser;