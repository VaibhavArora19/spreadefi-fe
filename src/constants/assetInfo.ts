import { TAssetName } from '@/types/asset';

export const assetNameToImage = (name: TAssetName) => {
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

    default:
      return '';
  }
};
