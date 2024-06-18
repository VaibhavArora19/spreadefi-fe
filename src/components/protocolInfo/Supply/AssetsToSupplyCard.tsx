import React from 'react';
import AssetToSupplyItem from './AssetToSupplyItem';
import {
  BTCDerivativesSupplyData,
  ETHDerivativesSupplyData,
  StableCoinsSupplyData,
} from '@/data/AssetsData';

const AssetsToSupplyCard = () => {
  return (
    <div className="w-[50%] bg-[#111111] p-6 rounded-xl h-fit">
      <p className="mb-5 font-semibold border-b-[0.1px] pb-5 border-b-[#4343439e]">
        Assets to supply
      </p>
      <AssetToSupplyItem
        itemType="supply"
        assetsType="StableCoins"
        assetsList={StableCoinsSupplyData}
      />
      <AssetToSupplyItem
        itemType="supply"
        assetsType="ETH Derivatives"
        assetsList={ETHDerivativesSupplyData}
      />
      <AssetToSupplyItem
        itemType="supply"
        assetsType="BTC Derivatives"
        assetsList={BTCDerivativesSupplyData}
      />
    </div>
  );
};

export default AssetsToSupplyCard;
