import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from '@/libs/api-libs';
import axios from 'axios';

// useData Hook
export const useData = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['data-domain'],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/domain`, {
          headers: {
            'x-api-key': 'R_DfwauR47lbvCj5KzIpefuKHqfJvFajId4uVK-BgW4',
          },
          withCredentials: true,
        });

        // Return response.data only if the request was successful
        return response.data;
      } catch (error) {
        console.error(error);

        // Throw the error to be handled by the caller
        throw error;
      }
    },
  });

  return {
    data,
    isLoading,
    refetch,
  };
};
