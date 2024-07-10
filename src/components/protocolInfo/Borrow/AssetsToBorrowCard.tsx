import React from 'react';
import AssetToSupplyItem from '../Supply/AssetToSupplyItem';
import { TAsset, TBalance } from '@/types/asset';

type AssetsToBorrowCardProps = {
  ethDerivatives: TAsset[];
  btcDerivatives: TAsset[];
  remaining: TAsset[];
  balances: TBalance;
};

const AssetsToBorrowCard: React.FC<AssetsToBorrowCardProps> = ({
  ethDerivatives,
  btcDerivatives,
  remaining,
  balances,
}) => {
  return (
    <div className="w-[50%] bg-[#111111] p-6 rounded-xl h-fit">
      <p className="mb-5 font-semibold border-b-[0.1px] pb-5 border-b-[#4343439e]">
        Assets to borrow
      </p>
      <AssetToSupplyItem
        itemType="borrow"
        assetsType="StableCoins"
        assetsList={remaining}
        balances={balances}
      />
      <AssetToSupplyItem
        itemType="borrow"
        assetsType="ETH Derivatives"
        assetsList={ethDerivatives}
        balances={balances}
      />
      <AssetToSupplyItem
        itemType="borrow"
        assetsType="BTC Derivatives"
        assetsList={btcDerivatives}
        balances={balances}
      />
    </div>
  );
};

export default AssetsToBorrowCard;
