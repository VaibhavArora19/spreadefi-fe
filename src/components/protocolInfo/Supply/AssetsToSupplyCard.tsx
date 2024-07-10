import React from 'react';
import AssetToSupplyItem from './AssetToSupplyItem';
import { TAsset, TBalance } from '@/types/asset';

type AssetsToSupplyProps = {
  ethDerivatives: TAsset[];
  btcDerivatives: TAsset[];
  remaining: TAsset[];
  balances: TBalance;
};
const AssetsToSupplyCard: React.FC<AssetsToSupplyProps> = ({
  ethDerivatives,
  btcDerivatives,
  remaining,
  balances,
}) => {
  return (
    <div className="w-[50%] bg-[#111111] p-6 rounded-xl h-fit">
      <p className="mb-5 font-semibold border-b-[0.1px] pb-5 border-b-[#4343439e]">
        Assets to supply
      </p>
      <AssetToSupplyItem
        itemType="supply"
        assetsType="StableCoins"
        assetsList={remaining}
        balances={balances}
      />
      <AssetToSupplyItem
        itemType="supply"
        assetsType="ETH Derivatives"
        assetsList={ethDerivatives}
        balances={balances}
      />
      <AssetToSupplyItem
        itemType="supply"
        assetsType="BTC Derivatives"
        assetsList={btcDerivatives}
        balances={balances}
      />
    </div>
  );
};

export default AssetsToSupplyCard;
