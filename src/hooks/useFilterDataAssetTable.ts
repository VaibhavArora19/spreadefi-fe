import { useMemo, useState } from 'react';
import { AssetTableDummyData } from '@/data/DummyData';
import { UseFilterDataReturn } from './useFilterData';

export const useFilterDataAssetTable = (
  assetData: any,
): UseFilterDataReturn => {
  const [chainFilters, setChainFilters] = useState<string[]>([]);
  const [protocolFilters, setProtocolFilters] = useState<string[]>([]);

  const allChains = new Set([
    ...AssetTableDummyData.flatMap((item) => item.chainIds),
  ]);
  const uniqueChains = Array.from(allChains);

  const allProtocols = new Set([
    ...AssetTableDummyData.flatMap((item) => item.protocols),
  ]);
  const uniqueProtocols = Array.from(allProtocols);

  const filteredData = useMemo(() => {
    const currentData = AssetTableDummyData;
    return currentData.filter(
      (item) =>
        (chainFilters.length === 0 ||
          item.chainIds.some((chain) => chainFilters.includes(chain))) &&
        (protocolFilters.length === 0 ||
          item.protocols.some((protocol) =>
            protocolFilters.includes(protocol),
          )),
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
