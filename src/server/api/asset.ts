import { axiosScout } from '@/config/axios';
import { ASSETS } from '@/constants/query';
import { TApiResponse } from '@/types/api';
import { TAssetsResponse } from '@/types/asset';
import { useQuery } from '@tanstack/react-query';

export const useFetchAssets = () => {
  const fetchAssets = async () => {
    const { data } = await axiosScout.get<TApiResponse<TAssetsResponse[]>>(
      '/asset',
    );

    const lendingTableData = data.data.filter(
      (asset) => asset.protocolType === 'Lending',
    );

    const vaultTableData = data.data.filter(
      (asset) => asset.protocolType === 'Yield',
    );

    return { lendingTableData, vaultTableData };
  };

  return useQuery({
    queryKey: [ASSETS.FETCH],
    queryFn: fetchAssets,
    retry: 3,
  });
};
