'use client';

import ConnectWallet from '@/components/popups/Wallet/ConnectWallet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { assetNameToImage } from '@/constants/assetInfo';
import { cn } from '@/lib/utils';
import { MarginType, PositionType, TQuoteData } from '@/types/looping-strategy';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { debounce } from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Skeleton } from '../ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface InfoSectionProps {
  title: string;
  children: React.ReactNode;
}

interface InfoItemProps {
  label: string;
  value: string | number;
  isLoading?: boolean;
  unit?: string;
  highlightValue?: boolean;
}

const LoopingPositionHeader: React.FC<{ pair: string }> = ({ pair }) => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-3">
      <div onClick={() => router.push('/')} className="cursor-pointer">
        <ArrowLeftIcon className="size-4" />
      </div>
      <div className="text-white text-lg font-semibold">Create new position for {pair}</div>
    </div>
  );
};

const StrategyInfo: React.FC<{
  pair: string;
  chain: string;
  market: string;
  chainInfo: any;
  positionType: PositionType;
  setPositionType: (type: PositionType) => void;
}> = ({ pair, chain, market, chainInfo, positionType, setPositionType }) => {
  const [baseAsset, quoteAsset] = pair.split('/');

  return (
    <div className="bg-[#1E1E1E] w-full rounded-xl p-6 gap-5 flex-col flex items-start justify-normal">
      <div className="flex items-center gap-3 w-full">
        {baseAsset && quoteAsset && (
          <div className="flex items-center -space-x-1.5">
            <Image
              src={assetNameToImage(baseAsset)}
              height={40}
              width={40}
              alt={baseAsset}
              className="rounded-full"
            />
            <Image
              src={assetNameToImage(quoteAsset)}
              height={40}
              width={40}
              alt={quoteAsset}
              className="rounded-full"
            />
          </div>
        )}
        <div className="space-y-1">
          <p>
            {pair} on {market}
          </p>
          <div className="flex items-center gap-1">
            <p className="text-sm text-gray-400">{chain}</p>
            {chainInfo?.logo && (
              <Image
                className="hover:scale-110"
                src={chainInfo.logo}
                height={25}
                width={25}
                alt={chain}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const PositionDetails: React.FC<{
  marginAmount: number;
  setMarginAmount: (amount: number) => void;
  marginType: MarginType;
  setMarginType: (type: MarginType) => void;
  leverage: number;
  setPositionType: (type: PositionType) => void;
  positionType: PositionType;
  setLeverage: (leverage: number) => void;
  maxLeverage: number;
  pair: string;
  currentPrice: number;
  isLoading: boolean;
  hideChangePositionType?: boolean;
}> = ({
  marginAmount,
  setMarginAmount,
  marginType,
  setMarginType,
  leverage,
  setLeverage,
  positionType,
  setPositionType,
  maxLeverage,
  pair,
  currentPrice,
  isLoading,
  hideChangePositionType,
}) => {
  const [localLeverage, setLocalLeverage] = useState(leverage);

  const debouncedSetLeverage = useCallback(
    debounce((value: number) => {
      setLeverage(value);
    }, 1000),
    [setLeverage],
  );

  const handleLeverageChange = useCallback(
    (value: number[]) => {
      const newLeverage = value[0];
      setLocalLeverage(newLeverage);
      debouncedSetLeverage(newLeverage);
    },
    [debouncedSetLeverage],
  );

  useEffect(() => {
    setLocalLeverage(leverage);
  }, [leverage]);

  return (
    <div className="w-full space-y-5">
      {!hideChangePositionType && (
        <div className="flex items-center gap-2 w-full">
          <Button
            variant={'outline'}
            onClick={() => setPositionType('Long')}
            className={cn(
              positionType === 'Long' && 'bg-green-500 border-0',
              'w-full border-gray-600',
            )}>
            Long
          </Button>
          <Button
            variant={'outline'}
            onClick={() => setPositionType('Short')}
            className={cn(
              positionType === 'Short' && 'bg-red-500 border-0',
              'w-full border-gray-600',
            )}>
            Short
          </Button>
        </div>
      )}
      <div className="space-y-1.5">
        <Label className="font-normal text-gray-400 text-sm">Amount</Label>
        <div className="relative">
          <div className="flex items-stretch w-full gap-2">
            <Input
              disabled={isLoading}
              value={marginAmount}
              onChange={(e) => setMarginAmount(e.target.valueAsNumber)}
              onWheel={(e) => (e.target as HTMLInputElement).blur()}
              type="number"
              placeholder="0.00"
              className="w-full text-white bg-inherit border border-gray-700 rounded-md outline-none placeholder:text-gray-500 px-4 py-3 pl-12"
            />
            <Select
              value={marginType}
              onValueChange={(value) => setMarginType(value as MarginType)}>
              <SelectTrigger className="w-fit px-3 text-xs border border-gray-700 rounded-md outline-none">
                <SelectValue placeholder="Margin Type" />
              </SelectTrigger>
              <SelectContent className="text-xs">
                {pair.split('/').map((asset, idx) => (
                  <SelectItem key={asset} value={idx === 0 ? 'Base' : 'Quote'}>
                    {asset}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            size="sm"
            className="absolute left-2 top-1 w-fit p-1.5 h-auto text-xs hover:text-gray-400">
            Max
          </Button>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="font-normal text-gray-400 text-sm">Leverage</Label>
          <div className="text-sm">{localLeverage.toFixed(2)}x</div>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="w-full">
              <Slider
                disabled={isLoading || !marginAmount}
                min={1}
                value={[localLeverage]}
                onValueChange={handleLeverageChange}
                max={maxLeverage || 0}
                step={0.05}
                className={cn(
                  isLoading || !marginAmount ? 'cursor-not-allowed hover:' : 'cursor-pointer',
                  'w-full',
                )}
              />
            </TooltipTrigger>
            {!marginAmount && (
              <TooltipContent side="bottom">
                <p className="text-sm text-gray-300">
                  Enter margin amount first to modify leverage
                </p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
      <InfoItem label="Mark Price" value={currentPrice.toFixed(2)} isLoading={isLoading} />
    </div>
  );
};

const LiquidationInfo: React.FC<{
  liquidationPrice: number;
  liquidationBuffer: number;
  liquidationThreshold?: number;
  currentPrice: number;
  isLoading: boolean;
}> = ({ liquidationPrice, liquidationBuffer, liquidationThreshold, currentPrice, isLoading }) => {
  return (
    <InfoSection title="Liquidation Info">
      <InfoItem label="Mark Price" value={currentPrice.toFixed(4)} isLoading={isLoading} />
      <InfoItem
        label="Liquidation Price"
        value={liquidationPrice.toFixed(4)}
        isLoading={isLoading}
      />
      {liquidationThreshold && (
        <InfoItem
          label="Liquidation Threshold"
          value={liquidationThreshold.toFixed(4)}
          isLoading={isLoading}
        />
      )}
      <InfoItem
        label="Liquidation Buffer"
        value={liquidationBuffer.toFixed(4)}
        unit="%"
        highlightValue
        isLoading={isLoading}
      />
    </InfoSection>
  );
};

const FinalQuote: React.FC<{
  quoteData: TQuoteData | null;
  leverage: number;
  apr: number;
  apy: number;
  roe: number;
  borrowingRate?: number;
  lendingRate?: number;
  interestRate?: number;
  isLoading: boolean;
}> = ({
  quoteData,
  leverage,
  apr,
  apy,
  roe,
  borrowingRate,
  lendingRate,
  interestRate,
  isLoading,
}) => {
  return (
    <div className="bg-[#1E1E1E] col-span-full w-full rounded-xl p-6 flex items-start flex-col gap-4">
      <InfoSection title="Final Quote">
        <InfoItem
          label="Entry Price"
          value={quoteData?.entryPrice.toFixed(4) || '-'}
          isLoading={isLoading}
        />
        {borrowingRate && (
          <InfoItem label="Borrowing Rate" value={borrowingRate.toFixed(4)} isLoading={isLoading} />
        )}
        {lendingRate && (
          <InfoItem label="Lending Rate" value={lendingRate.toFixed(4)} isLoading={isLoading} />
        )}
        <InfoItem label="Leverage" value={leverage} unit="x" isLoading={isLoading} />
        <InfoItem
          label="APR %"
          value={apr.toFixed(2)}
          unit="%"
          isLoading={isLoading}
          highlightValue
        />
        <InfoItem
          label="APY %"
          value={apy.toFixed(2)}
          unit="%"
          isLoading={isLoading}
          highlightValue
        />
        <InfoItem
          label="ROE %"
          value={roe.toFixed(2)}
          unit="%"
          isLoading={isLoading}
          highlightValue
        />
        {interestRate && (
          <InfoItem
            label="Interest Rate"
            value={interestRate.toFixed(4)}
            unit="%"
            highlightValue
            isLoading={isLoading}
          />
        )}
      </InfoSection>
    </div>
  );
};

const ActionButtons: React.FC<{
  handleCreatePosition: () => void;
  isCreatingPosition: boolean;
  isExecutingTransaction: boolean;
  quoteData: TQuoteData | null;
  isCalculatingQuote: boolean;
}> = ({
  handleCreatePosition,
  isCreatingPosition,
  isExecutingTransaction,
  quoteData,
  isCalculatingQuote,
}) => {
  const { address: userWalletAddress } = useAccount();

  return (
    <>
      {!!userWalletAddress ? (
        <Button
          disabled={
            isCalculatingQuote || !quoteData || isCreatingPosition || isExecutingTransaction
          }
          onClick={handleCreatePosition}
          className="text-black bg-white w-full">
          {isExecutingTransaction
            ? 'Executing Transaction...'
            : isCreatingPosition
            ? 'Creating Position...'
            : 'Create Position'}
        </Button>
      ) : (
        <ConnectWallet />
      )}
    </>
  );
};

const InfoSection: React.FC<InfoSectionProps> = ({ title, children }) => (
  <div className="space-y-5 w-full flex flex-col">
    <div className="font-semibold pb-3 border-b border-gray-600">{title}</div>
    <div className="space-y-2">{children}</div>
  </div>
);

const InfoItem: React.FC<InfoItemProps> = ({ label, value, unit, isLoading, highlightValue }) => {
  const getValueColor = (val: string | number) => {
    if (highlightValue) {
      const numValue = typeof val === 'string' ? parseFloat(val) : val;
      if (isNaN(numValue)) return 'text-white';
      return numValue < 0 ? 'text-red-500' : 'text-green-500';
    }
    return 'text-gray-300';
  };

  return (
    <div className="flex items-end justify-between">
      <div className="text-sm text-gray-400">{label}</div>
      {isLoading ? (
        <div>
          <Skeleton className="h-5 w-14 rounded bg-[#2c2c2c]" />
        </div>
      ) : (
        <div className={cn(getValueColor(value), 'font-medium')}>
          {value} {unit && unit}
        </div>
      )}
    </div>
  );
};

const PairInfoSkeleton: React.FC = () => (
  <div className="bg-[#1E1E1E] w-full rounded-xl p-6 gap-5 flex-col flex items-start justify-normal">
    <div className="flex items-center gap-3 w-full">
      <div className="flex items-center -space-x-1.5">
        <Skeleton className="bg-[#2c2c2c] rounded-full size-10" />
        <Skeleton className="bg-[#2c2c2c] rounded-full size-10" />
      </div>
      <div className="space-y-2 w-full">
        <Skeleton className="bg-[#2c2c2c] w-3/6 rounded-full h-6" />
        <Skeleton className="bg-[#2c2c2c] w-2/6 rounded-full h-6" />
      </div>
    </div>
  </div>
);

export {
  ActionButtons,
  FinalQuote,
  InfoItem,
  InfoSection,
  LiquidationInfo,
  LoopingPositionHeader,
  PairInfoSkeleton,
  PositionDetails,
  StrategyInfo,
};
