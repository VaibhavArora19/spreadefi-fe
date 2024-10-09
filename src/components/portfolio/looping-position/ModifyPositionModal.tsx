import Loader from '@/components/(ui)/Loader';
import Modal from '@/components/(ui)/Modal';
import ConnectWallet from '@/components/popups/Wallet/ConnectWallet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { assetNameToImage } from '@/constants/assetInfo';
import { cn } from '@/lib/utils';
import {
  useExecuteTransaction,
  useFetchUserCreatedPositionById,
  useModifyLoopingPosition,
  useUpdateLoopingPositionEntry,
} from '@/server/api/looping-strategies';
import {
  MarginType,
  ModifyType,
  TModifyPositionPayload,
  TModifyPositionResponse,
  TUserLoopingPosition,
} from '@/types/looping-strategy';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { debounce } from 'lodash';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { toast } from 'sonner';
import { useAccount } from 'wagmi';

interface ModifyPositionModalProps {
  onClose: () => void;
  onSubmit: () => void;
  position: TUserLoopingPosition;
}

const ModifyPositionModal = ({ onClose, onSubmit, position }: ModifyPositionModalProps) => {
  const [modifyType, setModifyType] = useState<ModifyType>('add');
  const [leverage, setLeverage] = useState(position.leverage);
  const [marginAmount, setMarginAmount] = useState<string>('');
  const [quoteData, setQuoteData] = useState<TModifyPositionResponse | null>(null);
  const [debouncedLeverage, setDebouncedLeverage] = useState(position.leverage);
  const [isInputModified, setIsInputModified] = useState(false);

  const { address: userWalletAddress } = useAccount();
  const {
    data: positionData,
    isLoading: isFetchingPositionDetails,
    error,
  } = useFetchUserCreatedPositionById(position.id);
  const {
    mutateAsync: modifyPosition,
    isPending: isFetchingLatestQuote,
    isError: isErrorFetchingLatestQuote,
  } = useModifyLoopingPosition(position.id);
  const { mutateAsync: updatePositionInDb, isPending: isUpdatingPositionInDb } =
    useUpdateLoopingPositionEntry(position.id);
  const { mutateAsync: executeTransaction, isPending: isExecutingTransaction } =
    useExecuteTransaction();

  const fetchLatestQuote = useCallback(async () => {
    if (!isInputModified) return;
    if (modifyType === 'remove' && parseFloat(marginAmount) > position?.marginAmount)
      return toast.error('Amount cannot be greater than current margin amount');
    if (modifyType === 'add' && parseFloat(marginAmount) <= 0)
      return toast.error('Amount cannot be zero');

    const marginAmountValue = marginAmount ? parseFloat(marginAmount) : 0;

    const payload: TModifyPositionPayload = {
      marginAmount: marginAmountValue <= 0 ? 0 : marginAmountValue,
      modifyType: modifyType,
      leverage: debouncedLeverage,
    };

    try {
      const quoteData = await modifyPosition(payload);
      if (quoteData) {
        setQuoteData(quoteData);
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
      toast.error('Error fetching quote');
    }
  }, [marginAmount, modifyType, debouncedLeverage, modifyPosition, position.marginAmount]);

  // debounce the fetchLatestQuote function
  const debouncedFetchQuote = useCallback(
    debounce(() => {
      fetchLatestQuote();
    }, 500),
    [fetchLatestQuote],
  );

  useEffect(() => {
    if (modifyType === 'remove') {
      setLeverage(position.leverage);
    }
    setQuoteData(null);
  }, [isErrorFetchingLatestQuote, leverage, marginAmount, modifyType]);

  const handleModifyTypeChange = (type: ModifyType) => {
    setModifyType(type);
    setIsInputModified(true);
  };

  const handleMarginAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setMarginAmount(value);
      setIsInputModified(true);
    }
  };

  const handleLeverageChange = (value: number[]) => {
    setLeverage(value[0]);
    setIsInputModified(true);
  };

  const handleModifyPosition = async () => {
    if (!quoteData || !userWalletAddress) return;

    const marginAmountValue = marginAmount ? parseFloat(marginAmount) : 0;

    try {
      if (quoteData.txs.approveTx && marginAmountValue > 0) {
        await executeTransaction({
          to: quoteData.txs.approveTx?.to,
          data: quoteData.txs.approveTx?.data,
        });
      }

      const txResult = await executeTransaction({
        to: quoteData.txs.tx.to,
        data: quoteData.txs.tx.data,
      });

      await updatePositionInDb({
        modifyType: modifyType,
        totalMarginAmount: quoteData.totalMarginAmount,
        leverage: leverage,
        newEntryPrice: quoteData.newEntryPrice!,
        newLiquidationPrice: quoteData.newLiquidationPrice!,
      });

      onSubmit();
    } catch (error) {
      console.error('Error modifying position:', error);
      toast.error('Failed to modify position');
    }
  };

  const getTokenByMarginType = (pair: string, marginType: MarginType): string => {
    const [baseToken, quoteToken] = pair.split('/');
    return marginType === 'Base' ? baseToken : quoteToken;
  };

  useEffect(() => {
    debouncedFetchQuote();
    return () => debouncedFetchQuote.cancel();
  }, [debouncedLeverage, marginAmount, modifyType, debouncedFetchQuote]);

  useEffect(() => {
    if (positionData) {
      setLeverage(positionData.leverage);
    }
  }, [positionData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedLeverage(leverage);
    }, 600);

    return () => clearTimeout(timer);
  }, [leverage]);

  if (!positionData) return <Loader />;

  const renderPairInfo = () => {
    const [baseToken, quoteToken] = positionData.Strategy.pair.split('/');
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center -space-x-1.5">
          <Image
            src={assetNameToImage(baseToken)}
            height={20}
            width={20}
            alt={baseToken}
            className="rounded-full"
          />
          <Image
            src={assetNameToImage(quoteToken)}
            height={20}
            width={20}
            alt={quoteToken}
            className="rounded-full"
          />
        </div>
        <p className="ml-2">{positionData.Strategy.pair}</p>
      </div>
    );
  };

  const renderPositionInfo = () => {
    const marginToken = getTokenByMarginType(positionData.Strategy.pair, positionData.marginType);
    return (
      <div className="space-y-5 pt-3">
        <div className="flex items-center justify-between pb-4 border-b border-gray-700">
          <div>Current Quote</div>
          <div>Latest Quote</div>
        </div>
        <div className="space-y-3 border-b border-gray-600 pb-3">
          <InfoItem
            isLoading={isFetchingLatestQuote}
            unit={marginToken}
            label="Margin"
            value={positionData.marginAmount.toFixed(5)}
            newValue={quoteData ? quoteData.totalMarginAmount?.toFixed(5)! : ''}
          />
          <InfoItem
            isLoading={isFetchingLatestQuote}
            label="Entry Price"
            value={positionData.entryPrice.toFixed(4)}
            newValue={quoteData ? quoteData.newEntryPrice?.toFixed(4)! : ''}
          />
          <InfoItem
            highlightValue
            isLoading={isFetchingLatestQuote}
            label="Liquidation Price"
            value={positionData.liquidationPrice.toFixed(2)}
            newValue={quoteData ? quoteData.newLiquidationPrice?.toFixed(4)! : ''}
          />
          <InfoItem
            highlightValue
            isLoading={isFetchingLatestQuote}
            unit="%"
            label="Liquidation Buffer"
            value={positionData.liquidationBuffer.toFixed(4)}
            newValue={quoteData ? quoteData.newLiquidationBuffer?.toFixed(4)! : ''}
          />
          {quoteData?.roe && (
            <InfoItem
              highlightValue
              isLoading={isFetchingLatestQuote}
              unit="%"
              label="ROE"
              value={positionData.roe.toFixed(4)}
              newValue={quoteData.roe.toFixed(4)}
            />
          )}
        </div>
      </div>
    );
  };

  if (isFetchingPositionDetails) {
    return <Loader />;
  }

  return (
    <Modal className="w-10/12 md:w-[600px] p-5 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">{renderPairInfo()}</div>
        <div className="flex items-center gap-1 relative">
          <IoClose onClick={onClose} className="cursor-pointer text-lg" />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 w-full mb-4">
          <Button
            disabled={isFetchingLatestQuote}
            variant={'outline'}
            onClick={() => handleModifyTypeChange('add')}
            className={cn(
              modifyType === 'add' && 'bg-green-500 border-0',
              'w-full border-gray-600',
            )}>
            Add
          </Button>
          <Button
            disabled={isFetchingLatestQuote}
            variant={'outline'}
            onClick={() => handleModifyTypeChange('remove')}
            className={cn(
              modifyType === 'remove' && 'bg-red-500 border-0',
              'w-full border-gray-600',
            )}>
            Remove
          </Button>
        </div>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label className="font-normal text-gray-400 text-sm">Amount</Label>
            <div className="relative">
              <Input
                disabled={isFetchingLatestQuote}
                type="number"
                placeholder="Enter amount"
                value={marginAmount || ''}
                // max={modifyType === 'remove' ? position.marginAmount : Infinity}
                onChange={handleMarginAmountChange}
                className="text-white bg-inherit border border-gray-700 rounded-md outline-none placeholder:text-gray-500 px-4 py-2 w-full overflow-hidden"
                onWheel={(e) => (e.target as HTMLInputElement).blur()}
              />
              <span className="text-gray-400 absolute right-3 top-1.5">
                {getTokenByMarginType(
                  positionData?.Strategy.pair || '',
                  positionData?.marginType || 'Base',
                )}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Leverage</span>
              <span className="text-gray-300">{leverage.toFixed(2)}x</span>
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="w-full">
                  <Slider
                    disabled={isFetchingLatestQuote || !marginAmount}
                    value={[leverage]}
                    onValueChange={handleLeverageChange}
                    min={modifyType === 'remove' ? 1 : position.leverage}
                    max={
                      modifyType === 'remove'
                        ? position.leverage
                        : positionData?.Strategy?.maxLeverage || 4.5
                    }
                    step={0.01}
                    className={cn(
                      isFetchingLatestQuote ? 'cursor-not-allowed' : 'cursor-pointer',
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
          {renderPositionInfo()}
          <div className="flex items-center justify-between">
            <div className="text-gray-500">Current Price</div>
            <div>{positionData?.currentPrice.toFixed(3)}</div>
          </div>

          {!!userWalletAddress ? (
            <Button
              onClick={handleModifyPosition}
              disabled={
                isUpdatingPositionInDb ||
                isExecutingTransaction ||
                isFetchingLatestQuote ||
                !quoteData
              }
              className="w-full text-black bg-white py-2 capitalize flex-[0.15]">
              {isUpdatingPositionInDb || isExecutingTransaction ? (
                <FaSpinner className="animate-spin size-4" />
              ) : (
                'Modify Position'
              )}
            </Button>
          ) : (
            <ConnectWallet />
          )}
        </div>
      </div>
    </Modal>
  );
};

interface InfoItemProps {
  label: string;
  value: string | number;
  newValue: string | number;
  isLoading?: boolean;
  unit?: string;
  highlightValue?: boolean;
}

const InfoItem = ({ label, value, newValue, unit, isLoading, highlightValue }: InfoItemProps) => {
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
      <div className="w-6/12 flex items-end justify-between">
        <div>
          <div className="text-sm text-gray-400">{label}:</div>
          <div className="text-gray-50">
            <span>
              {value} {unit && unit}
            </span>
          </div>
        </div>
        <ArrowRightIcon className="size-5" />
      </div>

      {isLoading ? (
        <div>
          <Skeleton className="h-5 w-14 rounded bg-[#2c2c2c]" />
        </div>
      ) : (
        <div className={cn(getValueColor(value), 'font-medium')}>
          {newValue ? (
            <span>
              {newValue} {unit && unit}
            </span>
          ) : (
            '-'
          )}
        </div>
      )}
    </div>
  );
};

export default ModifyPositionModal;
