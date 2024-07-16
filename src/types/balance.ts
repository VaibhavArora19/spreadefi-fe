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

export type TFormattedAsset = {
  asset: TAsset;
  currentATokenBalance: string;
  currentStableDebt: string;
  currentVariableDebt: string;
};
