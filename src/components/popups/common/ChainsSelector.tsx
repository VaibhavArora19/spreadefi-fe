import React, { useState } from 'react';
import ChainModal from './ChainModal';
import Image from 'next/image';

const ChainsSelector = () => {
  const [showChainModal, setShowChainModal] = useState(false);
  const [selectedChain, setSelectedChain] = useState<{
    chainId: number;
    chainName: string;
    logo: string;
    shortName: string;
  } | null>(null);

  const handleSelectChain = (chain: {
    chainId: number;
    chainName: string;
    logo: string;
    shortName: string;
  }) => {
    setSelectedChain(chain);
  };

  return (
    <>
      <div
        onClick={() => {
          setShowChainModal(true);
        }}
        className="text-xs bg-[#151515] p-2 w-[100px] rounded-md flex items-center gap-2">
        {selectedChain ? (
          <>
            <Image
              src={selectedChain.logo}
              alt={selectedChain.chainName}
              height={15}
              width={15}
            />
            <span className="text-xs">{selectedChain.shortName}</span>
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
