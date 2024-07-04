import React from 'react';
import AssetToSupplyItem from '../Supply/AssetToSupplyItem';
import {
  BTCDerivativesBorrowData,
  ETHDerivativesBorrowData,
  StableCoinsBorrowData,
} from '@/data/AssetsData';

const AssetsToBorrowCard = ({
  ethDerivatives,
  btcDerivatives,
  remaining,
}: any) => {
  return (
    <div className="w-[50%] bg-[#111111] p-6 rounded-xl h-fit">
      <p className="mb-5 font-semibold border-b-[0.1px] pb-5 border-b-[#4343439e]">
        Assets to borrow
      </p>
      <AssetToSupplyItem
        itemType="borrow"
        assetsType="StableCoins"
        assetsList={remaining}
      />
      <AssetToSupplyItem
        itemType="borrow"
        assetsType="ETH Derivatives"
        assetsList={ethDerivatives}
      />
      <AssetToSupplyItem
        itemType="borrow"
        assetsType="BTC Derivatives"
        assetsList={btcDerivatives}
      />
    </div>
  );
};

export default AssetsToBorrowCard;
