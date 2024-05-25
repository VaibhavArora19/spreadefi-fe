import { axiosScout } from '@/config/axios';
import { ASSETS } from '@/constants/query';
import { useQuery } from '@tanstack/react-query';

export const useFetchAssets = () => {
  const fetchAssets = async () => {
    const { data } = await axiosScout.get('/asset');

    return data;
  };

  return useQuery({
    queryKey: [ASSETS],
    queryFn: fetchAssets,
    retry: 3,
  });
};
