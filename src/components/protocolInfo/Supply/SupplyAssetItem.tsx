import BorrowModal from '@/components/popups/Borrow/BorrowModal';
import SupplyModal from '@/components/popups/common/SupplyModal';
import { assetNameToImage } from '@/constants/assetInfo';
import { TStableCoinData } from '@/data/AssetsData';
import { TAsset } from '@/types/asset';
import Image from 'next/image';
import React, { useState } from 'react';

type SupplyAssetItemProps = { asset: TAsset; itemType: 'borrow' | 'supply' };

const SupplyAssetItem: React.FC<SupplyAssetItemProps> = ({
  asset,
  itemType,
}: {
  asset: any;
  itemType: 'borrow' | 'supply';
}) => {
  console.log(asset);
  const [showSupplyModal, setShowSupplyModal] = useState(false);
  const [showBorrowModal, setShowBorrowModal] = useState(false);
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
          ${asset?.walletBalance?.toLocaleString() || 0}
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
              onClick={() => {
                setShowBorrowModal(true);
              }}
              className="bg-transparent text-white py-2  w-full text-xs rounded-md border border-white hover:bg-white hover:text-black">
              Borrow
            </button>
          ) : (
            <button
              onClick={(e: any) => {
                e.stopPropagation();
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
            setShowSupplyModal(false);
          }}
        />
      ) : null}

      {showBorrowModal ? (
        <BorrowModal
          onClose={() => {
            setShowBorrowModal(false);
          }}
        />
      ) : null}
    </>
  );
};

export default SupplyAssetItem;
