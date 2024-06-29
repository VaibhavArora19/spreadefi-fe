import SupplyModal from '@/components/popups/SupplyModal/SupplyModal';
import { assetNameToImage } from '@/constants/assetInfo';
import { TStableCoinData } from '@/data/AssetsData';
import Image from 'next/image';
import React, { useState } from 'react';

const SupplyAssetItem = ({
  asset,
  itemType,
}: {
  asset: TStableCoinData;
  itemType: 'borrow' | 'supply';
}) => {
  const [showSupplyModal, setShowSupplyModal] = useState(false);
  return (
    <>
      <div className="flex items-center w-full p-3 rounded-md bg-[#242424]">
        <div className="flex gap-[6px] flex-[0.25]">
          <Image
            src={assetNameToImage(asset.tokenName)}
            height={22}
            width={25}
            alt={asset.tokenName}
            className="rounded-full"
          />
          <p>{asset.tokenName}</p>
        </div>
        <p className="flex-[0.25]">${asset.walletBalance.toLocaleString()}</p>
        <p className="flex-[0.25]">{asset.APY}%</p>
        <div className="flex gap-4 flex-[0.25]">
          {itemType === 'borrow' ? (
            <button className="bg-transparent text-white py-2  w-full text-xs rounded-md border border-white hover:bg-white hover:text-black">
              Borrow
            </button>
          ) : (
            <button
              onClick={(e) => {
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
          type="supply"
        />
      ) : null}
    </>
  );
};

export default SupplyAssetItem;
