import { useMemo, useState } from 'react';
import { AssetTableDummyData, LendingBorrowingDummyData, ValultDummyData } from "@/data/DummyData";

type UseFilterDataProps = {
  tab: string;
}

type UseFilterDataReturn = {
  chainFilters: string[];
  setChainFilters: React.Dispatch<React.SetStateAction<string[]>>;
  protocolFilters: string[];
  setProtocolFilters: React.Dispatch<React.SetStateAction<string[]>>;
  uniqueChains: string[];
  uniqueProtocols: string[];
  filteredData: any[]; 
}

export const useFilterData = ({ tab }: UseFilterDataProps): UseFilterDataReturn => {
  const [chainFilters, setChainFilters] = useState<string[]>([]);
  const [protocolFilters, setProtocolFilters] = useState<string[]>([]);

  const allChains = new Set([
    ...LendingBorrowingDummyData.flatMap(item => item.chains),
    ...ValultDummyData.flatMap(item => item.chains),
  ]);
  const uniqueChains = Array.from(allChains);

  const allProtocols = new Set([
    ...LendingBorrowingDummyData.flatMap(item => item.protocols),
    ...ValultDummyData.flatMap(item => item.protocols),
  ]);
  const uniqueProtocols = Array.from(allProtocols);

  const filteredData = useMemo(() => {
    const currentData = tab === 'lendBorrow' ? LendingBorrowingDummyData : ValultDummyData;
    return currentData.filter(item =>
      (chainFilters.length === 0 || item.chains.some(chain => chainFilters.includes(chain))) &&
      (protocolFilters.length === 0 || item.protocols.some(protocol => protocolFilters.includes(protocol)))
    );
  }, [chainFilters, protocolFilters, tab]);

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


export const useFilterDataAssetTable = (): UseFilterDataReturn => {
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
    const currentData = AssetTableDummyData;
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
