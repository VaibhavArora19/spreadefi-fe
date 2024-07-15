import { axiosScout } from '@/config/axios';
import { ASSETS } from '@/constants/query';
import { TApiResponse } from '@/types/api';
import { TAssetsResponse } from '@/types/asset';
import { useQuery } from '@tanstack/react-query';

export const useFetchAssets = () => {
  const fetchAssets = async () => {
    try {
      const { data } = await axiosScout.get<TApiResponse<TAssetsResponse[]>>('/asset');

      const lendingTableData = data.data.filter((asset) => asset.protocolType === 'Lending');

      const vaultTableData = data.data.filter((asset) => asset.protocolType === 'Yield');

      const loopingTableData = data.data.filter(
        (asset) => asset.protocolType === 'Looping',
      );

      return { lendingTableData, vaultTableData, loopingTableData };
    } catch (error: any) {
      console.error('error: ', error);
    }
  };

  return useQuery({
    queryKey: [ASSETS.FETCH],
    queryFn: fetchAssets,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

export const useFetchAssetBySymbol = (assetSymbol: string) => {
  const fetchAssetsBySymbol = async () => {
    try {
      const { data } = await axiosScout.get(`/asset/symbol/${assetSymbol}`);

      return data.data;
    } catch (error: any) {
      console.error('error: ', error);
    }
  };

  return useQuery({
    queryKey: [ASSETS.FETCH_BY_SYMBOL, assetSymbol],
    queryFn: fetchAssetsBySymbol,
    retry: 3,
    staleTime: Infinity,
  });
};
