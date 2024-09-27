import React, { useState } from 'react';
import Modal from '@/components/(ui)/Modal';
import { IoClose } from 'react-icons/io5';
import Image from 'next/image';
import { GearIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import {
  useExecuteTransaction,
  useFetchUserCreatedPositionById,
  useModifyLoopingPosition,
  useUpdateLoopingPositionEntry,
} from '@/server/api/looping-strategies';
import {
  TUserLoopingPosition,
  MarginType,
  TModifyPositionPayload,
} from '@/types/looping-positions';
import { assetNameToImage } from '@/constants/assetInfo';
import { useAccount } from 'wagmi';

interface ClosePositionModalProps {
  onClose: () => void;
  onSubmit: () => void;
  position: TUserLoopingPosition;
}

const ClosePositionModal = ({ onClose, onSubmit, position }: ClosePositionModalProps) => {
  const { address: userWalletAddress } = useAccount();
  const { data: positionData, isLoading, error } = useFetchUserCreatedPositionById(position.id);
  const { mutateAsync: modifyPosition } = useModifyLoopingPosition(position.id);
  const { mutateAsync: updatePositionInDb, isPending: isUpdatingPositionInDb } =
    useUpdateLoopingPositionEntry(position.id);
  const { mutateAsync: executeTransaction, isPending: isExecutingTransaction } =
    useExecuteTransaction();

  const [isClosing, setIsClosing] = useState(false);

  if (!positionData) return null;

  const getTokenByMarginType = (pair: string, marginType: MarginType): string => {
    const [baseToken, quoteToken] = pair.split('/');
    return marginType === 'base' ? baseToken : quoteToken;
  };

  const handleClosePosition = async () => {
    if (!userWalletAddress) return;

    setIsClosing(true);
    try {
      const closePositionPayload: TModifyPositionPayload = {
        modifyType: 'close',
      };
      const quoteDataResult = await modifyPosition(closePositionPayload);

      if (quoteDataResult?.txs.tx) {
        if (quoteDataResult.txs.approveTx) {
          await executeTransaction({
            to: quoteDataResult.txs.approveTx.to,
            data: quoteDataResult.txs.approveTx.data,
          });
        }

        await executeTransaction({
          to: quoteDataResult.txs.tx.to,
          data: quoteDataResult.txs.tx.data,
        });

        await updatePositionInDb({
          modifyType: 'close',
        });

        onSubmit(); // Notify parent component that the position has been closed
      }
    } catch (error) {
      console.error('Error closing position:', error);
    } finally {
      setIsClosing(false);
    }
  };

  const renderPairInfo = () => {
    const [baseToken, quoteToken] = positionData.Strategy.pair.split('/');
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center -space-x-1.5">
          <Image
            src={assetNameToImage(baseToken)}
            height={36}
            width={36}
            alt={baseToken}
            className="rounded-full"
          />
          <Image
            src={assetNameToImage(quoteToken)}
            height={36}
            width={36}
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
        <InfoItem label="Margin" value={`${positionData.marginAmount.toFixed(2)} ${marginToken}`} />
        <InfoItem label="Position Type" value={`${positionData.positionType}`} />
        <InfoItem label="Entry Price" value={positionData.entryPrice.toFixed(3)} />
        <InfoItem label="Liquidation Price" value={positionData.liquidationPrice.toFixed(2)} />
        <InfoItem
          label="Liquidation Buffer"
          value={`${positionData.liquidationBuffer.toFixed(2)}%`}
        />
        <InfoItem label="ROE" value={`${positionData.roe.toFixed(2)}%`} />
      </div>
    );
  };

  return (
    <Modal className="w-10/12 md:w-[600px] p-5 space-y-4">
      {isLoading && <div>Loading...</div>}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">{renderPairInfo()}</div>
        <div className="flex items-center gap-1 relative">
          <IoClose onClick={onClose} className="cursor-pointer text-lg" />
        </div>
      </div>
      <div>
        <div className="space-y-4 py-2">
          {renderPositionInfo()}
          <div className="flex items-center justify-between">
            <div className="text-gray-500">Current Price</div>
            <div>{positionData.currentPrice.toFixed(3)}</div>
          </div>

          <Button
            onClick={handleClosePosition}
            disabled={isClosing || isUpdatingPositionInDb || isExecutingTransaction}
            className="w-full bg-red-500 text-white py-2 capitalize flex justify-center">
            {isClosing || isUpdatingPositionInDb || isExecutingTransaction ? (
              <GearIcon className="animate-spin size-4" />
            ) : (
              'Close Position'
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex items-end justify-between">
    <div className="text-sm text-gray-400">{label}:</div>
    <div className="text-gray-50">{value}</div>
  </div>
);

export default ClosePositionModal;
