import { TAsset } from './asset';
import { TProtocolName } from './protocol';

export type TAssetBalance = {
  asset: TAsset;
  protocol: TProtocolName;
  chainId: string;
  currentATokenBalance: string;
  currentStableDebt: string;
  currentVariableDebt: string;
};

export type TFormattedAssetBalance = {
  assets: TFormattedAsset[];
  protocol: TProtocolName;
  chainId: string;
};

export type TLendingAsset = {
  currentATokenBalance: string;
  currentStableDebt: string;
  currentVariableDebt: string;
};

export type TYieldAsset = {
  balance: number;
  balanceUSD: number;
};

export type TFormattedAsset = {
  asset: TAsset;
} & (TLendingAsset | TYieldAsset);
