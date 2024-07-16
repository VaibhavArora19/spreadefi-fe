import BorrowModal from '@/components/popups/Borrow/BorrowModal';
import SupplyModal from '@/components/popups/common/SupplyModal';
import { assetNameToImage } from '@/constants/assetInfo';
import { useFetchTokenList, useFetchTokenListForChain } from '@/hooks/useFetchTokenList';
import { transactionPayloadActions } from '@/redux/actions';
import { useExecuteTransactions } from '@/server/api/transactions';
import { Action } from '@/types/strategy';
import { ethers } from 'ethers';
import { TAsset, TBalance } from '@/types/asset';
import Image from 'next/image';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAccount } from 'wagmi';

type SupplyAssetItemProps = {
  asset: TAsset;
  itemType: 'borrow' | 'supply';
  balances: TBalance;
};

const SupplyAssetItem: React.FC<SupplyAssetItemProps> = ({ asset, itemType, balances }) => {
  const [showSupplyModal, setShowSupplyModal] = useState(false);
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const { execute } = useExecuteTransactions();
  const { fetchList } = useFetchTokenListForChain();
  const dispatch = useDispatch();
  const { address } = useAccount();

  const handleSupplyOrBorrowSubmit = async () => {
    //!show modal here asking user to connect wallet
    if (!address) return;

    const data = await execute();
  };

  const borrowModalHandler = async () => {
    //!add some warning here
    if (!asset.chainId) return;

    const tokens = await fetchList(asset.chainId);
    const [filterFromToken] = tokens.filter(
      (token) =>
        ethers.utils.getAddress(token.address) === ethers.utils.getAddress(asset.assetAddress),
    );

    //!add some error here
    if (!filterFromToken) return;

    dispatch(transactionPayloadActions.setStrategyName(asset.protocolName));
    dispatch(transactionPayloadActions.setFromChain(asset.chainId));
    dispatch(transactionPayloadActions.setFromToken(asset.assetAddress));
    dispatch(transactionPayloadActions.setFromTokenDecimals(filterFromToken.decimals));

    setShowBorrowModal(true);
  };

  return (
    <>
      <div className="flex items-center w-full p-3 rounded-md bg-[#242424]">
        <div className="flex gap-[6px] flex-[0.25]">
          <Image
            src={assetNameToImage(asset?.assetSymbol)}
            height={22}
            width={25}
            alt={asset?.assetSymbol}
            className="rounded-full"
          />
          <p>{asset?.assetSymbol}</p>
        </div>
        <p className="flex-[0.25]">
          {balances[asset.assetAddress.trim().toLowerCase()]?.price || '$0'}
        </p>
        <p className="flex-[0.25]">
          {itemType === 'borrow'
            ? asset.assetBorrowApy.toFixed(2)
            : asset.assetSupplyApy.toFixed(2)}
          %
        </p>
        <div className="flex gap-4 flex-[0.25]">
          {itemType === 'borrow' ? (
            <button
              onClick={async () => {
                await borrowModalHandler();
              }}
              className="bg-transparent text-white py-2  w-full text-xs rounded-md border border-white hover:bg-white hover:text-black">
              Borrow
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(transactionPayloadActions.setStrategyName(asset.protocolName));
                dispatch(transactionPayloadActions.setToChain(asset.chainId));
                dispatch(transactionPayloadActions.setToToken(asset.assetAddress));
                setShowSupplyModal(true);
              }}
              className="bg-transparent text-white py-2  w-full text-xs rounded-md border border-white hover:bg-white hover:text-black">
              Supply
            </button>
          )}
        </div>
      </div>

      {showSupplyModal ? (
        <SupplyModal
          onClose={() => {
            dispatch(transactionPayloadActions.resetState());
            setShowSupplyModal(false);
          }}
          onSubmit={handleSupplyOrBorrowSubmit}
        />
      ) : null}

      {showBorrowModal ? (
        <BorrowModal
          onClose={() => {
            dispatch(transactionPayloadActions.resetState());
            setShowBorrowModal(false);
          }}
          onSubmit={handleSupplyOrBorrowSubmit}
        />
      ) : null}
    </>
  );
};

export default SupplyAssetItem;
