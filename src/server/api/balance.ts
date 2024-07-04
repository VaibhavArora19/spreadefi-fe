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
  });
};

export const useFetchSpecificProtocolBalance = (
  address: string,
  protocolName: string,
  chainId: string,
) => {
  const fetchTokenBalance = async () => {
    try {
      const { data } = await axiosScout.get(
        '/balance/' + address + '/' + protocolName + '/' + chainId,
      );

      return data?.data;
    } catch (error: any) {
      console.error('error: ', error);
    }
  };

  return useQuery({
    queryKey: [BALANCES.BALANCE],
    queryFn: fetchTokenBalance,
  });
};
