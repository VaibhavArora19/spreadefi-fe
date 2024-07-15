import BorrowAndActionModal from '@/components/popups/Borrow&Action/BorrowAndActionModal';
import RepayModal from '@/components/popups/Repay/RepayModal';
import { transactionPayloadActions } from '@/redux/actions';
import { useExecuteTransactions } from '@/server/api/transactions';
import { TAsset } from '@/types/asset';
import Image from 'next/image';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAccount } from 'wagmi';

type BorrowItemProps = {
  data: { asset: TAsset; currentVariableDebt: string };
};

const BorrowItem: React.FC<BorrowItemProps> = ({ data }) => {
  const [showBorrowActionModal, setShowBorrowActionModal] = useState(false);
  const [showRepayModal, setShowRepayModal] = useState(false);
  const { address } = useAccount();
  const { execute } = useExecuteTransactions();
  const dispatch = useDispatch();

  const handleRepaySubmit = async () => {
    //!show modal here asking user to connect wallet
    if (!address) return;

    const data = await execute();
  };

  return (
    <div className="flex items-center">
      <div className="flex gap-[6px] flex-[0.21]">
        <Image src={'/assets/icons/tokens/cbeth.png'} height={22} width={25} alt="cbETH" />
        <p>{data.asset.assetSymbol}</p>
      </div>
      <p className="flex-[0.21]">{data.currentVariableDebt.slice(0, 4)}</p>
      <p className="flex-[0.18]">{data.asset.assetBorrowApy.toFixed(2)}%</p>
      <div className="flex gap-4 flex-[0.37]">
        <button
          onClick={() => {
            dispatch(transactionPayloadActions.setStrategyName(data.asset.protocolName));
            dispatch(transactionPayloadActions.setToToken(data.asset.assetAddress));
            dispatch(transactionPayloadActions.setToChain(data.asset.chainId));

            setShowRepayModal(true);
          }}
          className="bg-white text-black py-2 px-4 text-xs rounded-md hover:bg-gray-200">
          Repay
        </button>
        <button
          onClick={() => {
            setShowBorrowActionModal(true);
          }}
          className="bg-transparent text-white py-2 w-[120px] text-xs rounded-md border border-white hover:bg-white hover:text-black">
          Borrow & Action
        </button>
      </div>

      {showBorrowActionModal ? (
        <BorrowAndActionModal
          onClose={() => {
            setShowBorrowActionModal(false);
          }}
        />
      ) : null}

      {showRepayModal ? (
        <RepayModal
          onClose={() => {
            dispatch(transactionPayloadActions.resetState());
            setShowRepayModal(false);
          }}
          onSubmit={handleRepaySubmit}
        />
      ) : null}
    </div>
  );
};

export default BorrowItem;
