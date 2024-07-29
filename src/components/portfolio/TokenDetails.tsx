import Image from 'next/image';
import { Button } from '../ui/button';
import { assetNameToImage } from '@/constants/assetInfo';
import { TFormattedAsset } from '@/types/balance';
import { useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { networkConfig } from '@/config/network';
import { erc20Abi } from 'viem';

interface TokenDetailsProps {
  tokens?: TFormattedAsset[];
  type: 'Supplied' | 'Borrowed';
  actionType?: 'vault' | 'lendBorrow';
}

export const TokenDetails: React.FC<TokenDetailsProps> = ({ tokens, type, actionType }) => {
  const [decimals, setDecimals] = useState<Array<string>>([]);

  const getDecimals = useCallback(async () => {
    if (!tokens) return;

    const tokensDecimals: Array<Promise<string>> = [];

    tokens?.forEach((token) => {
      const provider = new ethers.providers.JsonRpcProvider(
        //@ts-ignore
        networkConfig[token.asset.chainId].rpc,
      );
      const contract = new ethers.Contract(token.asset.assetAddress, erc20Abi, provider);

      const tokenDecimals = contract.decimals();

      tokensDecimals.push(tokenDecimals);
    });

    const decimalArray = await Promise.all(tokensDecimals);

    setDecimals(decimalArray);
  }, [tokens]);

  useEffect(() => {
    if (!tokens) return;

    getDecimals();
  }, [tokens, getDecimals]);

  return (
    <div className="bg-[#464646] rounded-lg overflow-hidden">
      <div className="flex p-3 bg-[#2c2c2c] text-sm text-[#707070]">
        <p className="flex-[0.25]">{type}</p>
        <p className="flex-[0.33] text-center">Amount</p>
        <p className="flex-[0.33] text-center">USD Value</p>
        {actionType === 'vault' ? <p className="flex-[0.19] text-[#2c2c2c]">.</p> : null}
      </div>
      {tokens &&
        tokens.map((token, index) => (
          <div key={index} className="flex p-3 bg-[#404040] m-1 rounded-md items-center">
            <div className="flex items-center flex-[0.25] gap-2">
              <Image
                src={assetNameToImage(token.asset.assetSymbol)}
                height={30}
                width={30}
                alt="Token Icon"
                className="rounded-full"
              />
              <p>{token.asset.assetSymbol}</p>
            </div>
            <p className="flex-[0.33] text-center">
              {type == 'Borrowed'
                ? decimals[index]
                  ? ethers.utils.formatUnits(
                      BigInt(token.currentStableDebt) + BigInt(token.currentVariableDebt),
                      decimals[index],
                    )
                  : 0
                : decimals[index]
                ? ethers.utils
                    .formatUnits(token.currentATokenBalance, decimals[index])
                    .substring(0, 7)
                : 0}
            </p>
            <p className="flex-[0.33] text-center">{' -'}</p>

            {actionType === 'vault' ? (
              <Button className=" text-black bg-white py-2 capitalize flex-[0.15]">Supply</Button>
            ) : null}
          </div>
        ))}
    </div>
  );
};
