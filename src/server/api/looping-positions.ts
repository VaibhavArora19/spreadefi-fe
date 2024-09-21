import { axiosLoopingPositions } from '@/config';
import { LOOPING_POSITIONS } from '@/constants/query';
import { TApiResponse } from '@/types/api';
import { TLoopingPosition, TLoopingPositionsResponse } from '@/types/looping-positions';
import { useQuery } from '@tanstack/react-query';

export const useFetchLoopingPositions = () => {
  const fetchPositions = async () => {
    try {
      const { data } = await axiosLoopingPositions.get<TLoopingPositionsResponse>('/strategy');

      return data;
    } catch (error: any) {
      console.error('error: ', error);
    }
  };

  return useQuery({
    queryKey: [LOOPING_POSITIONS.FETCH],
    queryFn: fetchPositions,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
