import { axiosScout } from '@/config';
import { BALANCES } from '@/constants/query';
import { useQuery } from '@tanstack/react-query';

export const useFetchWalletPortfolio = (address: string) => {
  const fetchWalletPortfolio = async () => {
    try {
      const { data } = await axiosScout.get('/portfolio/' + address);

      return data?.data;
    } catch (error: any) {
      console.error('error: ', error);
    }
  };

  return useQuery({
    queryKey: [BALANCES.PORTFOLIO],
    queryFn: fetchWalletPortfolio,
    staleTime: 600000, //10 minutes
  });
};

export const useFetchTokenBalance = (address: string) => {
  const fetchTokenBalance = async () => {
    try {
      const { data } = await axiosScout.get('/balance/' + address);

      return data?.data;
    } catch (error: any) {
      console.error('error: ', error);
    }
  };

  return useQuery({
    queryKey: [BALANCES.BALANCE],
    queryFn: fetchTokenBalance,
    staleTime: 600000, //10 minutes
  });
};
