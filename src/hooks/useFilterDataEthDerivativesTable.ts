import { useMemo, useState } from 'react';
import { AssetTableDummyData, EthDerivativesDummyData, } from "@/data/DummyData";
import { UseFilterDataReturn } from './useFilterData';

export const useFilterDataEthDerivativesTable = (): UseFilterDataReturn => {
    const [chainFilters, setChainFilters] = useState<string[]>([]);
    const [protocolFilters, setProtocolFilters] = useState<string[]>([]);
  
    const allChains = new Set([
      ...AssetTableDummyData.flatMap(item => item.chains),
    ]);
    const uniqueChains = Array.from(allChains);
  
    const allProtocols = new Set([
      ...AssetTableDummyData.flatMap(item => item.protocols),
    ]);
    const uniqueProtocols = Array.from(allProtocols);
  
    const filteredData = useMemo(() => {
      const currentData = EthDerivativesDummyData;
      return currentData.filter(item =>
        (chainFilters.length === 0 || item.chains.some(chain => chainFilters.includes(chain))) &&
        (protocolFilters.length === 0 || item.protocols.some(protocol => protocolFilters.includes(protocol)))
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