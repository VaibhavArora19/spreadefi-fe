import { useMemo, useState } from 'react';
import { UseFilterDataReturn } from './useFilterData';
import { TAssetTableItem, TLoopinStrategyTableItem } from '@/types/dataTable';

export type UseFilterDataAssetTableProps = {
  assetData: TAssetTableItem[] | TLoopinStrategyTableItem[];
};
export const useFilterDataAssetTable = ({
  assetData = [],
}: UseFilterDataAssetTableProps): UseFilterDataReturn => {
  const [chainFilters, setChainFilters] = useState<string[]>([]);
  const [protocolFilters, setProtocolFilters] = useState<string[]>([]);

  // Extract unique chainIds and protocolNames from your data
  const uniqueChains = useMemo(() => {
    const allChains = assetData.map((item) => item.chainId);
    return Array.from(new Set(allChains));
  }, [assetData]);

  const uniqueProtocols = useMemo(() => {
    const allProtocols = assetData.map((item) => item.protocolName);
    return Array.from(new Set(allProtocols));
  }, [assetData]);

  const filteredData = useMemo(() => {
    return assetData.filter(
      (item) =>
        (chainFilters.length === 0 || chainFilters.includes(item.chainId)) &&
        (protocolFilters.length === 0 || protocolFilters.includes(item.protocolName)),
    );
  }, [chainFilters, protocolFilters, assetData]);

  return {
    chainFilters,
    setChainFilters,
    protocolFilters,
    setProtocolFilters,
    uniqueChains,
    uniqueProtocols,
    filteredData,
  };
};
