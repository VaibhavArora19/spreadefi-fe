import React, { useState } from 'react';
import TokenModal from './TokenModal';
import { TAssetName } from '@/types/asset';
import Image from 'next/image';

const TokenSelector = () => {
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState<{
    tokenName: TAssetName;
    logo: string;
    balance?: number;
  } | null>(null);

  const handleTokenSelect = (token: {
    tokenName: TAssetName;
    logo: string;
    balance?: number;
  }) => {
    setSelectedToken(token);
  };

  return (
    <>
      <div
        onClick={() => {
          setShowTokenModal(true);
        }}
        className=" text-xs bg-[#151515] p-2 w-[100px] rounded-md flex items-center gap-2 ">
        {selectedToken ? (
          <>
            <Image
              src={selectedToken.logo}
              alt={selectedToken.tokenName}
              height={15}
              width={15}
            />
            <span className="text-xs uppercase">{selectedToken.tokenName}</span>
          </>
        ) : (
          <p className="mx-auto">Token</p>
        )}
      </div>

      {showTokenModal ? (
        <TokenModal
          onSelect={handleTokenSelect}
          onClose={() => {
            setShowTokenModal(false);
          }}
        />
      ) : null}
    </>
  );
};

export default TokenSelector;
