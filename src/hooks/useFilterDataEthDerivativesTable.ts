import { useMemo, useState } from 'react';
import { AssetTableDummyData, EthDerivativesDummyData } from '@/data/DummyData';
import { UseFilterDataReturn } from './useFilterData';

export const useFilterDataEthDerivativesTable = (): UseFilterDataReturn => {
  const [chainFilters, setChainFilters] = useState<string[]>([]);
  const [protocolFilters, setProtocolFilters] = useState<string[]>([]);

  const allChains = new Set([
    ...AssetTableDummyData.flatMap((item) => item.chainId),
  ]);
  const uniqueChains = Array.from(allChains);

  const allProtocols = new Set([
    ...AssetTableDummyData.flatMap((item) => item.protocolName),
  ]);
  const uniqueProtocols = Array.from(allProtocols);

  const filteredData = useMemo(() => {
    const currentData = EthDerivativesDummyData;
    return currentData.filter(
      (item) =>
        (chainFilters.length === 0 || chainFilters.includes(item.chainId)) &&
        (protocolFilters.length === 0 ||
          protocolFilters.includes(item.protocolName)),
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
