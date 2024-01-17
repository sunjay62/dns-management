import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from '@/libs/api-libs';
import axios from 'axios';

// useData Hook
export const useData = (id) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['data-domain', id], // Include id in the queryKey
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/record?id=${id}`, {
          headers: {
            'x-api-key': 'R_DfwauR47lbvCj5KzIpefuKHqfJvFajId4uVK-BgW4',
          },
          withCredentials: true,
        });

        // console.log(response);

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
