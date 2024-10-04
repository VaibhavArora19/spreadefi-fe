'use client';

import { InfoItem } from '@/components/tables/LoopinStrategyTable/CreateLoopingPositionForm';
import { buttonVariants } from '@/components/ui/button';
import { assetNameToImage } from '@/constants/assetInfo';
import { chainList } from '@/constants/chainInfo';
import { protocolNameToImage } from '@/constants/prorocolInfo';
import { cn } from '@/lib/utils';
import { TLoopingStrategy } from '@/types/looping-strategy';
import { TProtocolName } from '@/types/protocol';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface LeveragedStakingProps {
  leveragedStakingData: TLoopingStrategy[];
}

const LeveragedStaking: React.FC<LeveragedStakingProps> = ({ leveragedStakingData }) => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 pt-5">
      {leveragedStakingData.map((strategy) => (
        <LeveragedStakingCard key={strategy.id} {...strategy} />
      ))}
    </div>
  );
};

export default LeveragedStaking;

const LeveragedStakingCard = ({
  id,
  pair,
  chain,
  market,
  swapMarket,
  positionType,
  maxLeverage,
  roe,
  currentPrice,
  liquidationPrice,
  liquidationBuffer,
  activeStatus,
}: Partial<TLoopingStrategy>) => {
  const [baseAsset, quoteAsset] = pair?.split('/') || [];

  const chainInfo = chainList.find((ch) => ch.shortName === chain);
  const marketImage = protocolNameToImage(market as TProtocolName);

  return (
    <div className="flex flex-col bg-[#1c1c1c] border border-[#373839] shadow-inner shadow-gray-900 text-gray-100 p-6 rounded-lg space-y-4">
      <div className="flex items-center justify-between w-full gap-1">
        <div className="flex items-center gap-1">
          <Image
            src={assetNameToImage(baseAsset)}
            height={20}
            width={20}
            alt={baseAsset}
            className="rounded-full"
          />
          <Image
            src={assetNameToImage(quoteAsset)}
            height={20}
            width={20}
            alt={quoteAsset}
            className="rounded-full"
          />
          <p className="ml-2 text-white">{pair}</p>
        </div>

        <div className="flex items-center gap-3 text-[#707070]">
          <div className="flex items-center gap-1">
            {marketImage ? (
              <Image src={marketImage} height={25} width={25} alt={market as string} />
            ) : (
              <div className="w-[25px] h-[25px] bg-gray-300 rounded-full flex items-center justify-center">
                {market?.charAt(0)}
              </div>
            )}
            <p className="text-sm text-gray-400">{market}</p>
          </div>
          <div className="text-gray-100">on</div>
          <div className="flex items-center gap-1">
            <Image src={chainInfo?.logo || ''} height={25} width={25} alt={chain as string} />
            <p className="text-sm text-gray-400">{chain}</p>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <InfoItem label="Position Type" value={positionType || 'N/A'} />
        <InfoItem label="Leverage" value={`${maxLeverage?.toFixed(2)}x`} />
        {!!roe && <InfoItem label="ROE" value={`${(roe * 100).toFixed(2)}%`} />}
        <InfoItem label="Current Price" value={currentPrice?.toFixed(2) || 'N/A'} />
        <InfoItem label="Liquidation Price" value={liquidationPrice?.toFixed(2) || 'N/A'} />
        <InfoItem label="Liquidation Buffer" value={`${liquidationBuffer?.toFixed(2)}%`} />
        <InfoItem label="Status" value={activeStatus ? 'Active' : 'Inactive'} />
      </div>
      <Link
        href={`/leveraged/${id}`}
        className={cn(
          buttonVariants({ variant: 'default' }),
          'w-full ml-auto bg-white text-black',
        )}>
        Create Position
      </Link>
      {/* <Link
        href={`/looping/${id}`}
        // onClick={() => router.push(`/looping/${row.original.id}`)}
        className={cn(
          buttonVariants({ variant: 'default' }),
          'w-full ml-auto bg-white text-black',
        )}>
        Create Position
      </Link> */}
    </div>
  );
};
