'use client';
import { chainList } from '@/constants/chainInfo';
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
import React, { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useAccount } from 'wagmi';
import {
  ActionButtons,
  FinalQuote,
  LiquidationInfo,
  LoopingPositionHeader,
  PositionDetails,
  StrategyInfo,
} from './CreateLoopingPositionForm';

const CreateLeveragedPositionForm: React.FC = () => {
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
        hideChangePositionType
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
        isExecutingTransaction={isExecutingTransaction || isExecutingStrategyTransaction}
        quoteData={quoteData}
      />
    </div>
  );
};

export default CreateLeveragedPositionForm;
