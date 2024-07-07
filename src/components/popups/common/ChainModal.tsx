'use client';

import Modal from '@/components/(ui)/Modal';
import Image from 'next/image';
import React from 'react';

type ChainItemProps = {
  chain: {
    chainId: number;
    chainName: string;
    logo: string;
    shortName: string;
  };
  onClose: () => void;
  onSelect: (chain: {
    chainId: number;
    chainName: string;
    logo: string;
    shortName: string;
  }) => void;
};

const ChainItem: React.FC<ChainItemProps> = ({ chain, onClose, onSelect }) => {
  const handleClick = () => {
    onSelect(chain);
    onClose();
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-4 py-5 px-3 w-full bg-[#252525] cursor-pointer hover:bg-[#313131] text-white rounded-md">
      <Image src={chain.logo} alt={chain.chainName} height={30} width={30} />
      <p className="font-semibold text-sm">{chain.chainName}</p>
    </div>
  );
};

type ChainModalProps = {
  onClose: () => void;
  onSelect: (chain: {
    chainId: number;
    chainName: string;
    logo: string;
    shortName: string;
  }) => void;
};

const ChainModal: React.FC<ChainModalProps> = ({ onClose, onSelect }) => {
  const chains = [
    {
      chainId: 123,
      chainName: 'Arbitrum One',
      shortName: 'Arbitrum',
      logo: '/assets/icons/chains/arbitrum.png',
    },
    {
      chainId: 137,
      chainName: 'Base Mainnet',
      shortName: 'Base',
      logo: '/assets/icons/chains/base.png',
    },
    {
      chainId: 11,
      chainName: 'OP Mainnet',
      shortName: 'Optimism',
      logo: '/assets/icons/chains/op.png',
    },
  ];

  return (
    <Modal className="w-[500px] bg-[#111111] h-[450px] rounded-2xl overflow-hidden">
      <p className="p-6 bg-[#1e1e1e] text-white text-base font-semibold">
        Select Chains
      </p>

      <div className="flex flex-col space-y-2 p-2">
        {chains.map((chain) => (
          <ChainItem
            onClose={onClose}
            onSelect={onSelect}
            chain={chain}
            key={chain.chainName}
          />
        ))}
      </div>
    </Modal>
  );
};

export default ChainModal;
