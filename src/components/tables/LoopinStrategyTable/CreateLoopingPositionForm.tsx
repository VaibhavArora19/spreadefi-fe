'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  MarginType,
  PositionType,
  TCreatePositionPayload,
  TLoopingStrategy,
  TLoopingStrategyQuotePayload,
  TQuoteData,
} from '@/types/looping-positions';
import { assetNameToImage } from '@/constants/assetInfo';
import { chainList } from '@/constants/chainInfo';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  useCreateLoopingPosition,
  useExecuteStrategyTransaction,
  useGetLoopingStrategyQuote,
} from '@/server/api/looping-strategies';
import { useAccount } from 'wagmi';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CreateLoopingPositionFormProps {
  data: TLoopingStrategy;
}

const CreateLoopingPositionForm: React.FC<CreateLoopingPositionFormProps> = ({ data }) => {
  const {
    pair,
    id: strategyId,
    chain,
    market,
    currentPrice,
    liquidationPrice,
    liquidationBuffer,
    roe,
    maxLeverage,
  } = data;

  const { address: userWalletAddress } = useAccount();
  const [baseAsset, quoteAsset] = useMemo(() => pair.split('/'), [pair]);
  const chainInfo = useMemo(
    () => chainList.find((chainEntry) => chainEntry.shortName === chain),
    [chain],
  );

  const { mutateAsync: calculateQuote, isPending: isCalculatingQuote } =
    useGetLoopingStrategyQuote(strategyId);
  const { mutateAsync: createPosition, isPending: isCreatingPosition } = useCreateLoopingPosition();
  const { mutateAsync: executeTransaction, isPending: isExecutingTransaction } =
    useExecuteStrategyTransaction();

  const [amount, setAmount] = useState<number>(0);
  const [leverage, setLeverage] = useState<number>(0);
  const [positionType, setPositionType] = useState<PositionType>('Long');
  const [marginType, setMarginType] = useState<MarginType>('Base');
  const [quoteData, setQuoteData] = useState<TQuoteData | null>(null);

  useEffect(() => {
    handlePrepareTransaction();
  }, [amount, leverage, positionType, marginType]);

  const handlePrepareTransaction = () => {
    if (!userWalletAddress || amount === 0 || leverage === 0) return;

    const payload: TLoopingStrategyQuotePayload = {
      marginType,
      marginAmount: amount,
      positionType,
      leverage,
      userAddress: userWalletAddress,
    };

    calculateQuote(payload, {
      onSuccess: (data: TLoopingStrategy | undefined) => {
        if (data) {
          setQuoteData(data as unknown as TQuoteData);
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

      const txResult = await executeTransaction({
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
        marginAmount: amount,
        leverage,
        entryPrice: quoteData.entryPrice,
      };

      await createPosition(payload);
    } catch (error) {
      console.error('Error creating position:', error);
    }
  };

  return (
    <div className="space-y-4 mx-auto max-w-3xl">
      <div className="text-white text-lg font-semibold">Create new position for {pair}</div>

      <div className="bg-[#1E1E1E] w-full rounded-xl p-6 gap-5 flex-col flex items-start justify-normal">
        <div className="flex items-center gap-3 w-full">
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

        <div className="w-full space-y-5">
          <div className="space-y-1.5">
            <Label className="font-normal text-gray-400 text-sm">Amount</Label>
            <div className="relative">
              <div className="flex items-stretch w-full gap-2">
                <Input
                  value={amount}
                  onChange={(e) => setAmount(e.target.valueAsNumber)}
                  type="number"
                  placeholder="0.00"
                  className="w-full text-white bg-inherit border border-gray-700 rounded-md outline-none placeholder:text-gray-500 px-4 py-3 pl-12"
                />
                <Select
                  defaultValue={marginType}
                  value={marginType}
                  onValueChange={(value) => setMarginType(value as MarginType)}>
                  <SelectTrigger className="w-fit px-3 text-xs border border-gray-700 rounded-md outline-none">
                    <SelectValue placeholder="Margin Type" />
                  </SelectTrigger>
                  <SelectContent className="text-xs">
                    {pair.split('/').map((asset, idx) => (
                      <SelectItem key={asset} value={idx === 0 ? 'base' : 'quote'}>
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
              value={[leverage.toFixed(2) as unknown as number]}
              onValueChange={(val) => setLeverage(val[0])}
              max={maxLeverage || 0}
              step={1}
              className="w-full cursor-pointer"
            />
          </div>

          <div className="w-full">
            <InfoItem label="Mark Price" value={currentPrice.toFixed(2)} />
          </div>
        </div>

        <InfoSection title="Liquidation Info">
          <InfoItem label="Liquidation Price" value={liquidationPrice.toFixed(2)} />
          <InfoItem label="Current Price" value={currentPrice.toFixed(2)} />
          <InfoItem label="Liquidation Buffer" value={`${liquidationBuffer.toFixed(2)}%`} />
        </InfoSection>
      </div>

      <div className="bg-[#1E1E1E] col-span-full w-full rounded-xl p-6 flex items-start flex-col gap-4">
        <InfoSection title="Final Quote">
          {/* <InfoItem label="Value" value="3 ETH" /> */}
          <InfoItem
            label="Entry Price"
            value={quoteData?.entryPrice.toFixed(2) || currentPrice.toFixed(2)}
          />
          <InfoItem label="Leverage" value={`${leverage}x`} />
          <InfoItem label="ROE %" value={`${roe}%`} />
          <InfoItem label="YoY Return" value="0.197858 %" />
        </InfoSection>
      </div>

      <Button
        disabled={isCalculatingQuote || !quoteData || isCreatingPosition || isExecutingTransaction}
        onClick={handleCreatePosition}
        className="text-black bg-white w-full">
        {isCalculatingQuote
          ? 'Preparing Transaction...'
          : isExecutingTransaction
          ? 'Executing Transaction...'
          : isCreatingPosition
          ? 'Creating Position...'
          : 'Create Position'}
      </Button>
    </div>
  );
};

interface InfoSectionProps {
  title: string;
  children: React.ReactNode;
}

const InfoSection: React.FC<InfoSectionProps> = ({ title, children }) => (
  <div className="space-y-5 w-full flex flex-col">
    <div className="font-semibold pb-3 border-b border-gray-600">{title}</div>
    <div className="space-y-2">{children}</div>
  </div>
);

interface InfoItemProps {
  label: string;
  value: string | number;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <div className="flex items-end justify-between">
    <div className="text-sm text-gray-400">{label}</div>
    <div className="text-gray-50 font-medium">{value}</div>
  </div>
);

export default CreateLoopingPositionForm;
