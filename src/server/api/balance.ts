import { axiosScout } from '@/config';
import { BALANCES } from '@/constants/query';
import { useQuery } from '@tanstack/react-query';

export const useFetchWalletPortfolio = (address: string | undefined) => {
  const fetchWalletPortfolio = async () => {
    try {
      if (!address) return;

      const { data } = await axiosScout.get('/portfolio/' + address);

      console.log('data is', data);
      return data?.data;
    } catch (error: any) {
      console.error('error: ', error);
    }
  };

  return useQuery({
    queryKey: [BALANCES.PORTFOLIO],
    queryFn: fetchWalletPortfolio,
    enabled: !!address,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 600000, //10 minutes
  });
};

export const useFetchTokenBalance = (address: string | undefined) => {
  const fetchTokenBalance = async () => {
    try {
      if (!address) return;

      const { data } = await axiosScout.get('/balance/' + address);

      return data?.data;
    } catch (error: any) {
      console.error('error: ', error);
    }
  };

  return useQuery({
    queryKey: [BALANCES.BALANCE],
    queryFn: fetchTokenBalance,
    enabled: !!address,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 600000, //10 minutes
  });
};
