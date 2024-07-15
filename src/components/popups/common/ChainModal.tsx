'use client';

import Modal from '@/components/(ui)/Modal';
import { chainList } from '@/constants/chainInfo';
import Image from 'next/image';
import React from 'react';
import { IoClose } from 'react-icons/io5';

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
  return (
    <Modal className="w-[500px] bg-[#111111] h-[450px] rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between p-6 bg-[#1e1e1e] w-full">
        <p className=" text-white text-base font-semibold">Select Chain</p>
        <IoClose onClick={onClose} size={18} className="cursor-pointer" />
      </div>

      <div className="flex flex-col space-y-2 p-2">
        {chainList.map((chain) => (
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
