'use client';

import Modal from '@/components/(ui)/Modal';
import { assetNameToImage } from '@/constants/assetInfo';
import { useFetchTokenList } from '@/hooks/useFetchTokenList';
import { TAssetName } from '@/types/asset';
import Image from 'next/image';
import React from 'react';
import { IoClose } from 'react-icons/io5';

type TokenItemProps = {
  token: {
    tokenName: string;
    logo: string | undefined;
    balance: number;
    address: string;
    decimals: number;
  };
  onClose: () => void;
  onSelect: (token: {
    tokenName: string;
    logo: string | undefined;
    balance: number;
    address: string;
    decimals: number;
  }) => void;
};

const TokenItem: React.FC<TokenItemProps> = ({ token, onClose, onSelect }) => {
  const handleClick = () => {
    onSelect(token);
    onClose();
  };
  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between py-5 px-3 w-full bg-[#252525] cursor-pointer hover:bg-[#313131] text-white rounded-md">
      <div className="flex items-center gap-2">
        <Image src={token.logo ? token.logo : ''} alt={token.tokenName} height={30} width={30} />
        <p className="font-semibold text-sm uppercase ">{token.tokenName}</p>
      </div>

      {token.balance ? (
        <div className="flex flex-col ">
          <p className="font-medium text-sm text-right">{token.balance}</p>
          <p className="text-xs text-[#707070] text-right mt-1">$12.34</p>
        </div>
      ) : null}
    </div>
  );
};

const TokenModal = ({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (token: {
    tokenName: string;
    logo: string | undefined;
    balance: number;
    address: string;
    decimals: number;
  }) => void;
}) => {
  const { data: tokens } = useFetchTokenList();

  return (
    <Modal className="w-[500px] bg-[#111111] h-[450px] rounded-2xl overflow-scroll">
      <div className="flex items-center justify-between p-6 bg-[#1e1e1e] w-full">
        <p className=" text-white text-base font-semibold">Select Token</p>
        <IoClose onClick={onClose} size={18} className="cursor-pointer" />
      </div>

      <div className="flex flex-col space-y-2 p-2 overflow-scroll">
        {tokens &&
          tokens.map((token) => (
            <TokenItem
              onSelect={onSelect}
              onClose={onClose}
              token={{
                tokenName: token.name,
                logo: token.logoURI,
                balance: 0,
                address: token.address,
                decimals: token.decimals,
              }}
              key={token.address}
            />
          ))}
      </div>
    </Modal>
  );
};

export default TokenModal;
