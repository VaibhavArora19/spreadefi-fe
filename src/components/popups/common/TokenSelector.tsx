import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import TokenModal from './TokenModal';
import Image from 'next/image';
import { useTokensStore, useTransactionPayloadStore } from '@/redux/hooks';
import { Action } from '@/types/strategy';

const TokenSelector = ({
  setToken,
  type,
}: {
  setToken: (token: {
    tokenName: string;
    logo: string | undefined;
    balance: number;
    address: string;
    decimals: number;
  }) => void;
  type: Action;
}) => {
  const { fromToken, toToken } = useTransactionPayloadStore();
  const { tokens } = useTokensStore();
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState<{
    tokenName: string;
    logo: string | undefined;
    balance: number;
    address: string;
  } | null>(null);

  useEffect(() => {
    if (type === Action.WITHDRAW || type === Action.BORROW) {
      if (toToken !== '' && tokens.length !== 0) {
        const [token] = tokens.filter((t) => t.address === toToken);

        setSelectedToken({
          tokenName: token.name,
          logo: token.logoURI,
          balance: 0,
          address: token.address,
        });
      } else {
        setSelectedToken(null);
      }
    } else {
      if (fromToken !== '' && tokens.length !== 0) {
        const [token] = tokens.filter((t) => t.address === fromToken);

        setSelectedToken({
          tokenName: token.name,
          logo: token.logoURI,
          balance: 0,
          address: token.address,
        });
      } else {
        setSelectedToken(null);
      }
    }
  }, [fromToken, toToken, tokens]);

  const handleTokenSelect = (token: {
    tokenName: string;
    logo: string | undefined;
    balance: number;
    address: string;
    decimals: number;
  }) => {
    setToken(token);
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
              src={selectedToken.logo ? selectedToken.logo : ''}
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
          type={type}
        />
      ) : null}
    </>
  );
};

export default TokenSelector;
