import React, { useState } from 'react';
import ChainModal from './ChainModal';
import Image from 'next/image';
import { useTransactionPayloadStore } from '@/redux/hooks';
import { CHAIN_CONFIG } from '@/constants/chainInfo';
import { Action } from '@/types/strategy';

type TChain = {
  chainId: number;
  chainName: string;
  logo: string;
  shortName: string;
};

type TProps = {
  setChain: (chain: TChain) => void;
  type: Action;
};

const ChainsSelector = ({ setChain, type }: TProps) => {
  const [showChainModal, setShowChainModal] = useState(false);
  const { fromChain, toChain } = useTransactionPayloadStore();

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
        {(type === Action.WITHDRAW ? toChain !== '' : fromChain !== '') ? (
          <>
            <Image
              src={
                type === Action.WITHDRAW
                  ? CHAIN_CONFIG[toChain].chainImageUrl
                  : CHAIN_CONFIG[fromChain].chainImageUrl
              }
              alt={
                type === Action.WITHDRAW
                  ? CHAIN_CONFIG[toChain].chainName
                  : CHAIN_CONFIG[fromChain].chainName
              }
              height={15}
              width={15}
            />
            <span className="text-xs">
              {type === Action.WITHDRAW
                ? CHAIN_CONFIG[toChain].chainName
                : CHAIN_CONFIG[fromChain].chainName}
            </span>
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
