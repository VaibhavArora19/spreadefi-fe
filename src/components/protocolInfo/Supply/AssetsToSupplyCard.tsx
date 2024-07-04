import React from 'react';
import AssetToSupplyItem from './AssetToSupplyItem';
import {
  BTCDerivativesSupplyData,
  ETHDerivativesSupplyData,
  StableCoinsSupplyData,
} from '@/data/AssetsData';

const AssetsToSupplyCard = ({
  ethDerivatives,
  btcDerivatives,
  remaining,
}: any) => {
  return (
    <div className="w-[50%] bg-[#111111] p-6 rounded-xl h-fit">
      <p className="mb-5 font-semibold border-b-[0.1px] pb-5 border-b-[#4343439e]">
        Assets to supply
      </p>
      <AssetToSupplyItem
        itemType="supply"
        assetsType="StableCoins"
        assetsList={remaining}
      />
      <AssetToSupplyItem
        itemType="supply"
        assetsType="ETH Derivatives"
        assetsList={ethDerivatives}
      />
      <AssetToSupplyItem
        itemType="supply"
        assetsType="BTC Derivatives"
        assetsList={btcDerivatives}
      />
    </div>
  );
};

export default AssetsToSupplyCard;
