import Loader from '@/components/(ui)/Loader';
import Modal from '@/components/(ui)/Modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
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
import { ArrowRightIcon, GearIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useAccount } from 'wagmi';

interface ModifyPositionModalProps {
  onClose: () => void;
  onSubmit: () => void;
  position: TUserLoopingPosition;
}

const ModifyPositionModal = ({ onClose, onSubmit, position }: ModifyPositionModalProps) => {
  const { address: userWalletAddress } = useAccount();
  const { data: positionData, isLoading, error } = useFetchUserCreatedPositionById(position.id);
  const { mutateAsync: modifyPosition } = useModifyLoopingPosition(position.id);
  const { mutateAsync: updatePositionInDb, isPending: isUpdatingPositionInDb } =
    useUpdateLoopingPositionEntry(position.id);
  const { mutateAsync: executeTransaction, isPending: isExecutingTransaction } =
    useExecuteTransaction();

  const [modifyType, setModifyType] = useState<ModifyType>('add');

  const [leverage, setLeverage] = useState(position.leverage);
  const [orderSize, setOrderSize] = useState(0);
  const [quoteData, setQuoteData] = useState<TModifyPositionResponse | null>(null);

  useEffect(() => {
    if (positionData) {
      // setPositionType(positionData.positionType.toLowerCase() as PositionType);
      setLeverage(positionData.leverage);
      // setOrderSize(positionData.marginAmount);
    }
  }, [positionData]);

  if (!positionData) return null;

  const handleModifyTypeChange = (type: ModifyType) => {
    setModifyType(type);
  };

  const getTokenByMarginType = (pair: string, marginType: MarginType): string => {
    const [baseToken, quoteToken] = pair.split('/');
    return marginType === 'Base' ? baseToken : quoteToken;
  };

  const fetchLatestQuote = async () => {
    const payload: TModifyPositionPayload = {
      marginAmount: orderSize,
      modifyType: modifyType,
      leverage: leverage,
    };

    try {
      const quoteData = await modifyPosition(payload);
      if (quoteData) {
        setQuoteData(quoteData);
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const handleModifyPosition = async () => {
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

      await updatePositionInDb({
        modifyType: modifyType,
        totalMarginAmount: orderSize,
        leverage: leverage,
        newEntryPrice: quoteData.newEntryPrice!,
        newLiquidationPrice: quoteData.newLiquidationPrice!,
      });
    } catch (error) {
      console.error('Error creating position:', error);
    }
  };

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
      <div className="space-y-3 border-b border-gray-600 pb-3">
        <InfoItem
          label="Margin"
          value={`${positionData.marginAmount.toFixed(2)} ${marginToken}`}
          newValue={quoteData ? `${quoteData.totalMarginAmount?.toFixed(2)} ${marginToken}` : '-'}
        />
        {/* <InfoItem
          label="Size"
          value={`${(100 / positionData.leverage).toFixed(2)}%`}
          newValue={quoteData ? `${(100 / leverage).toFixed(2)}%` : '-'}
        /> */}
        <InfoItem
          label="Entry Price"
          value={positionData.entryPrice.toFixed(3)}
          newValue={quoteData ? quoteData.newEntryPrice?.toFixed(3) : '-'}
        />
        <InfoItem
          label="Liquidation Price"
          value={positionData.liquidationPrice.toFixed(2)}
          newValue={quoteData ? quoteData.newLiquidationPrice?.toFixed(2) : '-'}
        />
        <InfoItem
          label="Liquidation Buffer"
          value={`${positionData.liquidationBuffer.toFixed(2)}%`}
          newValue={quoteData ? `${quoteData.newLiquidationBuffer?.toFixed(2)}%` : '-'}
        />
        <InfoItem
          label="ROE"
          value={`${positionData.roe.toFixed(2)}%`}
          newValue={`${positionData.roe.toFixed(2)}%`}
        />
      </div>
    );
  };

  if (isLoading) {
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
            variant={'outline'}
            onClick={() => handleModifyTypeChange('add')}
            className={cn(
              modifyType === 'add' && 'bg-green-500 border-0',
              'w-full border-gray-600',
            )}>
            Add
          </Button>
          <Button
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
            <Label className="font-normal text-gray-400 text-sm">Order Size</Label>
            <div className="relative">
              <Input
                type="number"
                placeholder="Enter order size"
                value={orderSize}
                onChange={(e) => setOrderSize(parseFloat(e.target.value))}
                className="text-lg text-white bg-inherit border border-gray-700 rounded-md outline-none placeholder:text-gray-500 px-4 py-2 w-full overflow-hidden"
                onWheel={(e) => (e.target as HTMLInputElement).blur()}
              />
              <span className="text-gray-400 absolute right-3 top-1.5">
                {getTokenByMarginType(positionData.Strategy.pair, positionData.marginType)}
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Leverage</span>
              <span className="text-gray-300">{leverage.toFixed(2)}x</span>
            </div>
            <Slider
              value={[leverage]}
              onValueChange={(val) => setLeverage(val[0])}
              max={positionData.Strategy?.maxLeverage || 0}
              step={0.1}
              className="w-full cursor-pointer"
            />
          </div>
          <Button onClick={fetchLatestQuote} className="w-full">
            Fetch Latest Quote
          </Button>
          {renderPositionInfo()}
          <div className="flex items-center justify-between">
            <div className="text-gray-500">Current Price</div>
            <div>{positionData.currentPrice.toFixed(3)}</div>
          </div>

          <Button
            onClick={handleModifyPosition}
            disabled={isUpdatingPositionInDb || isExecutingTransaction}
            className="w-full text-black bg-white py-2 capitalize flex-[0.15]">
            {isUpdatingPositionInDb || isExecutingTransaction ? (
              <GearIcon className="animate-spin size-4" />
            ) : (
              'Modify Position'
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const InfoItem = ({
  label,
  value,
  newValue,
}: {
  label: string;
  value: string | number;
  newValue: string | number | undefined;
}) => (
  <div className="flex items-end justify-between">
    <div className="w-6/12 flex items-end justify-between">
      <div>
        <div className="text-sm text-gray-400">{label}:</div>
        <div className="text-gray-50">{value}</div>
      </div>
      <ArrowRightIcon className="size-5" />
    </div>
    <div className="text-gray-50">{newValue ? newValue : '-'}</div>
  </div>
);

export default ModifyPositionModal;
