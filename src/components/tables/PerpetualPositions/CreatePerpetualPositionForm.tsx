'use client';
import {
  ActionButtons,
  FinalQuote,
  LiquidationInfo,
  LoopingPositionHeader,
  PairInfoSkeleton,
  PositionDetails,
  StrategyInfo,
} from '@/components/create-new-position';
import LifiModal from '@/components/popups/lifi/LifiModal';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { LINEA_CHAIN_ID } from '@/constants';
import { chainList } from '@/constants/chainInfo';
import { executeLifiTransaction } from '@/helpers/execute';
import { useLoopingStrategyStore } from '@/redux/hooks';
import {
  useCreateLoopingPosition,
  useExecuteStrategyTransaction,
  useExecuteTransaction,
  useFetchLoopingStrategyById,
  useGetLoopingStrategyLifiQuote,
  useGetLoopingStrategyQuote,
} from '@/server/api/looping-strategies';
import {
  MarginType,
  PositionType,
  TCreatePositionPayload,
  TLifiQuoteData,
  TLoopingStrategyLiFiQuotePayload,
  TLoopingStrategyQuotePayload,
  TQuoteData,
} from '@/types/looping-strategy';
import { Route } from '@lifi/sdk';
import { AxiosError } from 'axios';
import { debounce } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useAccount, usePublicClient } from 'wagmi';

export default function CreatePerpetualPositionForm() {
  const publicClient = usePublicClient();
  const { strategyHref } = useLoopingStrategyStore();
  const { address: userWalletAddress, chainId } = useAccount();
  const previousParamsRef = useRef<string>('');
  const [marginAmount, setMarginAmount] = useState<number>(0);
  const [leverage, setLeverage] = useState<number>(1.2);
  const [positionType, setPositionType] = useState<PositionType>('Long');
  const [marginType, setMarginType] = useState<MarginType>('Base');
  const [quoteData, setQuoteData] = useState<TQuoteData | null>(null);
  const [lifiQuoteData, setLiFiQuoteData] = useState<TLifiQuoteData | null>(null);
  const [showLifiModal, setShowLifiModal] = useState(false);
  const [selectedChain, setSelectedChain] = useState<number | null>(null);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [lifiRoute, setLifiRoute] = useState<Route | null>(null);

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

  const chainInfo = useMemo(
    () => chainList.find((chainEntry) => chainEntry.shortName === chain),
    [chain],
  );

  const { mutateAsync: calculateQuote, isPending: isCalculatingQuote } =
    useGetLoopingStrategyQuote(strategyHref);
  const { mutateAsync: calculateLiFiQuote, isPending: isCalculatingLiFiQuote } =
    useGetLoopingStrategyLifiQuote(strategyHref);
  const { mutateAsync: createPosition, isPending: isCreatingPosition } = useCreateLoopingPosition();
  const { mutateAsync: executeStrategyTransaction, isPending: isExecutingStrategyTransaction } =
    useExecuteStrategyTransaction();
  const { mutateAsync: executeTransaction, isPending: isExecutingTransaction } =
    useExecuteTransaction();

  const fetchQuote = useCallback(async () => {
    if (!userWalletAddress || marginAmount === 0 || leverage === 0 || !strategyId) return;

    const payload: TLoopingStrategyQuotePayload = {
      marginType,
      marginAmount: marginAmount,
      positionType,
      leverage,
      userAddress: userWalletAddress as `0x${string}`,
    };

    const paramsString = JSON.stringify(payload);
    if (paramsString === previousParamsRef.current) return;
    previousParamsRef.current = paramsString;

    try {
      const data = await calculateQuote(payload);
      if (data) {
        setQuoteData(data);
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
      if (error instanceof AxiosError && error.response) {
        toast.error(`Failed to fetch quote: ${error.response.data.error}`);
      } else {
        console.log('Unknown error');
      }
    }
  }, [
    marginAmount,
    leverage,
    marginType,
    positionType,
    userWalletAddress,
    calculateQuote,
    strategyId,
  ]);

  const fetchLiFiQuote = useCallback(async () => {
    if (!userWalletAddress || marginAmount === 0 || leverage === 0 || !strategyId) return;

    if (!selectedChain || !selectedToken) {
      return;
    }

    const payload: TLoopingStrategyLiFiQuotePayload = {
      fromChain: selectedChain.toString(),
      toChain: LINEA_CHAIN_ID.toString(),
      fromToken: selectedToken,
      marginType,
      marginAmount,
      positionType,
      leverage,
      userAddress: userWalletAddress,
    };

    const paramsString = JSON.stringify(payload);
    if (paramsString === previousParamsRef.current) return;
    previousParamsRef.current = paramsString;

    try {
      const data = await calculateLiFiQuote(payload);
      if (data) {
        setLiFiQuoteData(data);
      }
    } catch (error) {
      console.error('Error fetching LiFi quote:', error);
      if (error instanceof AxiosError && error.response) {
        toast.error(`Failed to fetch LiFi quote: ${error.response.data.error}`);
      } else {
        console.log('Unknown error');
      }
    }
  }, [
    marginAmount,
    leverage,
    marginType,
    positionType,
    userWalletAddress,
    calculateLiFiQuote,
    strategyId,
    selectedChain,
    selectedToken,
  ]);

  const debouncedFetchQuote = useMemo(() => debounce(fetchQuote, 500), [fetchQuote]);
  const debouncedFetchLiFiQuote = useMemo(() => debounce(fetchLiFiQuote, 500), [fetchLiFiQuote]);

  useEffect(() => {
    if (chainId === LINEA_CHAIN_ID) {
      debouncedFetchQuote();
      return () => debouncedFetchQuote.cancel();
    }
  }, [marginAmount, leverage, marginType, positionType, debouncedFetchQuote, strategyId, chainId]);

  useEffect(() => {
    if (chainId !== LINEA_CHAIN_ID && selectedChain && selectedToken) {
      debouncedFetchLiFiQuote();
      return () => debouncedFetchLiFiQuote.cancel();
    }
  }, [
    marginAmount,
    leverage,
    marginType,
    positionType,
    debouncedFetchLiFiQuote,
    strategyId,
    selectedChain,
    selectedToken,
    chainId,
  ]);

  const handleCreatePosition = async () => {
    if (!quoteData || !userWalletAddress) return;

    try {
      let approveTxHash;

      if (quoteData.txs.approveTx) {
        const approveTxResult = await executeTransaction({
          to: quoteData.txs.approveTx?.to,
          data: quoteData.txs.approveTx?.data,
          isWethTransaction:
            quoteData.txs.approveTx.to === '0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f',
          marginAmount: marginAmount,
        });
        approveTxHash = approveTxResult.receipt.transactionHash;

        // wait for the approve transaction to be confirmed
        await publicClient?.waitForTransactionReceipt({ hash: approveTxHash });
        toast.success('Approval transaction confirmed');
      }

      const txResult = await executeStrategyTransaction({
        to: quoteData.txs.tx.to,
        data: quoteData.txs.tx.data,
      });

      // wait for the main transaction to be confirmed
      await publicClient?.waitForTransactionReceipt({ hash: txResult.receipt.transactionHash });
      toast.success('Main transaction confirmed');

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

      // update the db with the new position
      await createPosition(payload);
      toast.success('Position created successfully');
    } catch (error) {
      toast.error('Error creating position');
      console.error('Error creating position:', error);
    }
  };

  const handleLifiSubmit = async () => {
    if (!userWalletAddress) return;
    if (!lifiQuoteData?.lifiRoute) return;

    if (!selectedChain || !selectedToken) {
      toast.error('Please select a chain and token');
      return;
    }
    try {
      const lifiResponse = await executeLifiTransaction(selectedChain, lifiQuoteData?.lifiRoute);

      // todo: save position to db
      // await createPosition(payload);
      // toast.success('Position created successfully');
    } catch (error) {
      toast.error('Error executing Lifi transaction');
      console.error('Error executing Lifi transaction:', error);
    }
  };

  if (isError) {
    return <div>Error loading strategy data</div>;
  }

  return (
    <div className="space-y-4 mx-auto max-w-3xl">
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/6 bg-[#2c2c2c] rounded-xl" />
          <PairInfoSkeleton />
        </div>
      ) : (
        <div className="space-y-4">
          <LoopingPositionHeader pair={pair} />
          <StrategyInfo
            pair={pair}
            chain={chain}
            market={market}
            chainInfo={chainInfo}
            positionType={positionType}
            setPositionType={setPositionType}
          />
        </div>
      )}

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
          isLoading={isLoading || isCalculatingQuote || isCalculatingLiFiQuote}
          positionType={positionType}
          setPositionType={setPositionType}
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
        quoteData={chainId === LINEA_CHAIN_ID ? quoteData : lifiQuoteData}
        leverage={leverage}
        apr={apr}
        apy={apy}
        roe={roe}
        borrowingRate={borrowingRate}
        lendingRate={lendingRate}
        interestRate={interestRate}
        isLoading={isLoading || isCalculatingQuote || isCalculatingLiFiQuote}
      />
      {chainId === LINEA_CHAIN_ID ? (
        <ActionButtons
          handleCreatePosition={handleCreatePosition}
          isCalculatingQuote={isCalculatingQuote}
          isCreatingPosition={isCreatingPosition}
          isExecutingTransaction={isExecutingStrategyTransaction || isExecutingTransaction}
          quoteData={quoteData}
        />
      ) : (
        <Button
          disabled={isCalculatingLiFiQuote || !marginAmount}
          onClick={() => setShowLifiModal(true)}
          className="text-black bg-white w-full">
          Create Position Using LiFi
        </Button>
      )}
      {showLifiModal && (
        <LifiModal
          onClose={() => setShowLifiModal(false)}
          onSubmit={handleLifiSubmit}
          marginAmount={marginAmount}
          selectedChain={selectedChain}
          selectedToken={selectedToken}
          route={lifiQuoteData?.lifiRoute || null}
          onChainChange={setSelectedChain}
          onTokenChange={setSelectedToken}
          onRouteChange={setLifiRoute}
          isFetchingLiFiQuote={isCalculatingLiFiQuote}
          entryPrice={lifiQuoteData?.quote.entryPrice.toString() || '-'}
        />
      )}
    </div>
  );
}
