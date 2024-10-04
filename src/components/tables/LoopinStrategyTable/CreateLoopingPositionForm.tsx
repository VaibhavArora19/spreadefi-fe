'use client';
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
import { Skeleton } from '@/components/ui/skeleton';
import { Slider } from '@/components/ui/slider';
import { assetNameToImage } from '@/constants/assetInfo';
import { chainList } from '@/constants/chainInfo';
import { cn } from '@/lib/utils';
import { useLoopingStrategyStore } from '@/redux/hooks';
import {
  useCreateLoopingPosition,
  useExecuteStrategyTransaction,
  useExecuteTransaction,
  useFetchLoopingStrategyById,
  useGetLoopingStrategyQuote,
} from '@/server/api/looping-strategies';
import {
  MarginType,
  PositionType,
  TCreatePositionPayload,
  TLoopingStrategyQuotePayload,
  TQuoteData,
} from '@/types/looping-strategy';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useAccount } from 'wagmi';

const CreateLoopingPositionForm: React.FC = () => {
  const router = useRouter();
  const { strategyHref } = useLoopingStrategyStore();
  const { address: userWalletAddress } = useAccount();

  const [marginAmount, setMarginAmount] = useState<number>(0);
  const [leverage, setLeverage] = useState<number>(1.2);
  const [positionType, setPositionType] = useState<PositionType>('Long');
  const [marginType, setMarginType] = useState<MarginType>('Base');
  const [quoteData, setQuoteData] = useState<TQuoteData | null>(null);

  const {
    data: strategyData,
    isLoading,
    isError,
  } = useFetchLoopingStrategyById({
    strategyId: strategyHref as string,
    positionType,
    leverage,
  });

  const {
    pair = '',
    id: strategyId = '',
    chain = '',
    market = '',
    currentPrice = 0,
    liquidationPrice = 0,
    liquidationBuffer = 0,
    roe = 0,
    maxLeverage = 0,
    apr = 0,
    apy = 0,
    liquidationThreshold,
    borrowingRate,
    lendingRate,
    interestRate,
  } = strategyData ?? {};

  const [baseAsset, quoteAsset] = useMemo(() => pair.split('/'), [pair]);
  const chainInfo = useMemo(
    () => chainList.find((chainEntry) => chainEntry.shortName === chain),
    [chain],
  );

  const { mutateAsync: calculateQuote, isPending: isCalculatingQuote } =
    useGetLoopingStrategyQuote(strategyId);
  const { mutateAsync: createPosition, isPending: isCreatingPosition } = useCreateLoopingPosition();
  const { mutateAsync: executeStrategyTransaction, isPending: isExecutingStrategyTransaction } =
    useExecuteStrategyTransaction();
  const { mutateAsync: executeTransaction, isPending: isExecutingTransaction } =
    useExecuteTransaction();

  const handlePrepareTransaction = () => {
    if (!userWalletAddress) {
      return toast.error('Please connect your wallet first');
    }
    if (marginAmount === 0 || leverage === 0) {
      return toast.error('Please enter margin and leverage to get latest quote details');
    }

    const payload: TLoopingStrategyQuotePayload = {
      marginType,
      marginAmount: marginAmount,
      positionType,
      leverage,
      userAddress: userWalletAddress,
    };

    calculateQuote(payload, {
      onSuccess: (data: TQuoteData | undefined) => {
        if (data) {
          setQuoteData(data);
        }
      },
    });
  };

  const handleCreatePosition = async () => {
    if (!quoteData || !userWalletAddress) return;

    try {
      if (quoteData.txs.approveTx) {
        await executeTransaction({
          to: quoteData.txs.approveTx?.to,
          data: quoteData.txs.approveTx?.data,
        });
      }

      const txResult = await executeStrategyTransaction({
        to: quoteData.txs.tx.to,
        data: quoteData.txs.tx.data,
      });

      const tokenId = Number(txResult.tokenId);
      const proxyAddress = txResult.proxyAddress;

      const payload: TCreatePositionPayload = {
        userAddress: userWalletAddress,
        tokenId,
        proxyAddress,
        strategyId,
        marginType,
        positionType,
        marginAmount: marginAmount,
        leverage,
        entryPrice: quoteData.entryPrice,
      };

      await createPosition(payload);
    } catch (error) {
      console.error('Error creating position:', error);
    }
  };

  if (isError) {
    return <div>Error loading strategy data</div>;
  }

  return (
    <div className="space-y-4 mx-auto max-w-3xl">
      <LoopingPositionHeader pair={pair} />
      <StrategyInfo
        pair={pair}
        chain={chain}
        market={market}
        chainInfo={chainInfo}
        positionType={positionType}
        setPositionType={setPositionType}
      />
      <div className="bg-[#1E1E1E] col-span-full w-full rounded-xl p-6 flex items-start flex-col gap-4">
        <PositionDetails
          marginAmount={marginAmount}
          setMarginAmount={setMarginAmount}
          marginType={marginType}
          setMarginType={setMarginType}
          leverage={leverage}
          setLeverage={setLeverage}
          maxLeverage={maxLeverage!}
          pair={pair}
          currentPrice={currentPrice}
          isLoading={isLoading}
        />
        <LiquidationInfo
          liquidationPrice={liquidationPrice}
          liquidationBuffer={liquidationBuffer}
          liquidationThreshold={liquidationThreshold!}
          currentPrice={currentPrice}
          isLoading={isLoading}
        />
      </div>
      <FinalQuote
        quoteData={quoteData}
        leverage={leverage}
        apr={apr}
        apy={apy}
        roe={roe}
        borrowingRate={borrowingRate}
        lendingRate={lendingRate}
        interestRate={interestRate}
        isLoading={isLoading}
      />
      <ActionButtons
        handlePrepareTransaction={handlePrepareTransaction}
        handleCreatePosition={handleCreatePosition}
        isCalculatingQuote={isCalculatingQuote}
        isCreatingPosition={isCreatingPosition}
        isExecutingTransaction={isExecutingStrategyTransaction || isExecutingTransaction}
        quoteData={quoteData}
      />
    </div>
  );
};

export const LoopingPositionHeader: React.FC<{ pair: string }> = ({ pair }) => {
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

export const StrategyInfo: React.FC<{
  pair: string;
  chain: string;
  market: string;
  chainInfo: any;
  positionType: PositionType;
  setPositionType: (type: PositionType) => void;
  hideChangePositionType?: boolean;
}> = ({
  pair,
  chain,
  market,
  chainInfo,
  positionType,
  setPositionType,
  hideChangePositionType,
}) => {
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
    </div>
  );
};

export const PositionDetails: React.FC<{
  marginAmount: number;
  setMarginAmount: (amount: number) => void;
  marginType: MarginType;
  setMarginType: (type: MarginType) => void;
  leverage: number;
  setLeverage: (leverage: number) => void;
  maxLeverage: number;
  pair: string;
  currentPrice: number;
  isLoading: boolean;
}> = ({
  marginAmount,
  setMarginAmount,
  marginType,
  setMarginType,
  leverage,
  setLeverage,
  maxLeverage,
  pair,
  currentPrice,
  isLoading,
}) => {
  return (
    <div className="w-full space-y-5">
      <div className="space-y-1.5">
        <Label className="font-normal text-gray-400 text-sm">Amount</Label>
        <div className="relative">
          <div className="flex items-stretch w-full gap-2">
            <Input
              value={marginAmount}
              onChange={(e) => setMarginAmount(e.target.valueAsNumber)}
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
          <div className="text-sm">{leverage.toFixed(2)}x</div>
        </div>
        <Slider
          min={1}
          value={[leverage]}
          onValueChange={(val) => setLeverage(val[0])}
          max={maxLeverage || 0}
          step={0.05}
          className="w-full cursor-pointer"
        />
      </div>
      <InfoItem label="Mark Price" value={currentPrice.toFixed(2)} isLoading={isLoading} />
    </div>
  );
};

export const LiquidationInfo: React.FC<{
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

export const FinalQuote: React.FC<{
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

export const ActionButtons: React.FC<{
  handlePrepareTransaction: () => void;
  handleCreatePosition: () => void;
  isCalculatingQuote: boolean;
  isCreatingPosition: boolean;
  isExecutingTransaction: boolean;
  quoteData: TQuoteData | null;
}> = ({
  handlePrepareTransaction,
  handleCreatePosition,
  isCalculatingQuote,
  isCreatingPosition,
  isExecutingTransaction,
  quoteData,
}) => {
  return (
    <>
      <Button
        disabled={isCalculatingQuote || isCreatingPosition || isExecutingTransaction}
        onClick={handlePrepareTransaction}
        className="w-full border-gray-600 text-gray-400"
        variant={'outline'}>
        {isCalculatingQuote ? 'Preparing Transaction...' : 'Get Position Quote'}
      </Button>
      <Button
        disabled={isCalculatingQuote || !quoteData || isCreatingPosition || isExecutingTransaction}
        onClick={handleCreatePosition}
        className="text-black bg-white w-full">
        {isExecutingTransaction
          ? 'Executing Transaction...'
          : isCreatingPosition
          ? 'Creating Position...'
          : 'Create Position'}
      </Button>
    </>
  );
};

interface InfoSectionProps {
  title: string;
  children: React.ReactNode;
}

export const InfoSection: React.FC<InfoSectionProps> = ({ title, children }) => (
  <div className="space-y-5 w-full flex flex-col">
    <div className="font-semibold pb-3 border-b border-gray-600">{title}</div>
    <div className="space-y-2">{children}</div>
  </div>
);

interface InfoItemProps {
  label: string;
  value: string | number;
  isLoading: boolean;
  unit?: string;
  highlightValue?: boolean;
}

export const InfoItem: React.FC<InfoItemProps> = ({
  label,
  value,
  unit,
  isLoading,
  highlightValue,
}) => {
  const getValueColor = (val: string | number) => {
    if (highlightValue) {
      const numValue = typeof val === 'string' ? parseFloat(val) : val;
      if (isNaN(numValue)) return 'text-white'; // Default color for non-numeric values
      return numValue < 0 ? 'text-red-500' : 'text-green-500';
    }
    return 'text-gray-300';
  };

  return (
    <div className="flex items-end justify-between">
      <div className="text-sm text-gray-400">{label}</div>
      {isLoading ? (
        <div>
          <Skeleton className="h-5 w-14 rounded bg-gray-700" />
        </div>
      ) : (
        <div className={cn(getValueColor(value), 'font-medium')}>
          {value} {unit && unit}
        </div>
      )}
    </div>
  );
};

export default CreateLoopingPositionForm;
