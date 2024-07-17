import { TAssetName } from '@/types/asset';

export const assetNameToImage = (name: TAssetName | string) => {
  switch (name.toLowerCase()) {
    case TAssetName.WETH:
      return '/assets/icons/tokens/weth.png';
    case TAssetName.WSTETH:
      return '/assets/icons/tokens/wsteth.png';
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
    case TAssetName.USDCE:
      return '/assets/icons/tokens/usdc.png';
    case TAssetName.DAI:
      return '/assets/icons/tokens/dai.png';
    case TAssetName.USDT:
      return '/assets/icons/tokens/usdt.png';
    case TAssetName.WBTC:
      return '/assets/icons/tokens/wbtc.png';
    case TAssetName.ARB:
      return '/assets/icons/chains/arbitrum.png';
    case TAssetName.DEGEN:
      return '/assets/icons/tokens/degen.png';
    case TAssetName.RETH:
      return '/assets/icons/tokens/reth.png';
    case TAssetName.FRAX:
      return '/assets/icons/tokens/frax.png';
    case TAssetName.FRXETH:
      return '/assets/icons/tokens/frxeth.webp';
    case TAssetName.LINK:
      return '/assets/icons/tokens/link.png';
    case TAssetName.LUSD:
      return '/assets/icons/tokens/lusd.png';
    case TAssetName.OP:
      return '/assets/icons/chains/op.png';
    case TAssetName.SEAM:
      return '/assets/icons/tokens/seam.png';
    case TAssetName.USDBC:
      return '/assets/icons/tokens/usdbc.png';
    default:
      return '/assets/icons/tokens/wbtc.png';
  }
};
