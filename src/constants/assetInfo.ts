import { TAssetName } from '@/types/asset';

export const assetNameToImage = (name: TAssetName | string) => {
  // return '/assets/icons/tokens/wbtc.png';
  switch (name.toLowerCase()) {
    case TAssetName.WETH:
      return '/assets/icons/tokens/weth.png';
    case TAssetName.ETH:
      return '/assets/icons/tokens/eth.png';
    case TAssetName.EZETH:
      return '/assets/icons/tokens/ezeth.png';
    case TAssetName.RSETH:
      return '/assets/icons/tokens/rseth.png';
    case TAssetName.CBETH:
      return '/assets/icons/tokens/cbeth.png';
    case TAssetName.USDC:
      return '/assets/icons/tokens/usdc.png';
    case TAssetName.DAI:
      return '/assets/icons/tokens/dai.png';
    case TAssetName.USDT:
      return '/assets/icons/tokens/usdt.png';
    case TAssetName.WBTC:
      return '/assets/icons/tokens/wbtc.png';
    default:
      return '/assets/icons/tokens/wbtc.png';
  }
};
