import { useMemo, useState } from 'react';
import { AssetTableDummyData } from '@/data/DummyData';
import { UseFilterDataReturn } from './useFilterData';

export const useFilterDataAssetTable = (
  assetData: any,
): UseFilterDataReturn => {
  const [chainFilters, setChainFilters] = useState<string[]>([]);
  const [protocolFilters, setProtocolFilters] = useState<string[]>([]);

  // Extract unique chainIds and protocolNames from your data
  const uniqueChains = useMemo(() => {
    const allChains = AssetTableDummyData.map((item) => item.chainId);
    return Array.from(new Set(allChains));
  }, []);

  const uniqueProtocols = useMemo(() => {
    const allProtocols = AssetTableDummyData.map((item) => item.protocolName);
    return Array.from(new Set(allProtocols));
  }, []);

  const filteredData = useMemo(() => {
    return AssetTableDummyData.filter(
      (item) =>
        (chainFilters.length === 0 || chainFilters.includes(item.chainId)) &&
        (protocolFilters.length === 0 || protocolFilters.includes(item.protocolName)),
    );
  }, [chainFilters, protocolFilters]);

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
