import React from 'react';
import AssetToSupplyItem from '../Supply/AssetToSupplyItem';
import {
  BTCDerivativesBorrowData,
  ETHDerivativesBorrowData,
  StableCoinsBorrowData,
} from '@/data/AssetsData';

const AssetsToBorrowCard = () => {
  return (
    <div className="w-[50%] bg-[#111111] p-6 rounded-xl h-fit">
      <p className="mb-5 font-semibold border-b-[0.1px] pb-5 border-b-[#4343439e]">
        Assets to borrow
      </p>
      <AssetToSupplyItem
        itemType="borrow"
        assetsType="StableCoins"
        assetsList={StableCoinsBorrowData}
      />
      <AssetToSupplyItem
        itemType="borrow"
        assetsType="ETH Derivatives"
        assetsList={ETHDerivativesBorrowData}
      />
      <AssetToSupplyItem
        itemType="borrow"
        assetsType="BTC Derivatives"
        assetsList={BTCDerivativesBorrowData}
      />
    </div>
  );
};

export default AssetsToBorrowCard;
