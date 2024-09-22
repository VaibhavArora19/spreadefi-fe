import { axiosLoopingPositions } from '@/config';
import { LOOPING_STRATEGY } from '@/constants/query';
import { TLoopingStrategy } from '@/types/looping-positions';
import { useQuery } from '@tanstack/react-query';

export const useFetchLoopingStrategies = () => {
  const fetchPositions = async () => {
    try {
      const { data } = await axiosLoopingPositions.get<TLoopingStrategy[]>('/strategy');

      return data;
    } catch (error: any) {
      console.error('error: ', error);
    }
  };

  return useQuery({
    queryKey: [LOOPING_STRATEGY.FETCH],
    queryFn: fetchPositions,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
