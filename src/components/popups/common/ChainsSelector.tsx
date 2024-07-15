import React, { useState } from 'react';
import ChainModal from './ChainModal';
import Image from 'next/image';
import { useTransactionPayloadStore } from '@/redux/hooks';
import { CHAIN_CONFIG } from '@/constants/chainInfo';

type TChain = {
  chainId: number;
  chainName: string;
  logo: string;
  shortName: string;
};

type TProps = {
  setChain: (chain: TChain) => void;
};

const ChainsSelector = ({ setChain }: TProps) => {
  const [showChainModal, setShowChainModal] = useState(false);
  const { fromChain } = useTransactionPayloadStore();

  const handleSelectChain = (chain: TChain) => {
    setChain(chain);
  };

  return (
    <>
      <div
        onClick={() => {
          setShowChainModal(true);
        }}
        className="text-xs bg-[#151515] p-2 w-[100px] rounded-md flex items-center gap-2">
        {fromChain !== '' ? (
          <>
            <Image
              src={CHAIN_CONFIG[fromChain].chainImageUrl}
              alt={CHAIN_CONFIG[fromChain].chainName}
              height={15}
              width={15}
            />
            <span className="text-xs">{CHAIN_CONFIG[fromChain].chainName}</span>
          </>
        ) : (
          <p className="mx-auto">Chain</p>
        )}
      </div>

      {showChainModal ? (
        <ChainModal
          onClose={() => {
            setShowChainModal(false);
          }}
          onSelect={handleSelectChain}
        />
      ) : null}
    </>
  );
};

export default ChainsSelector;
