import { TAssetName } from "@/types/asset";

export type TStableCoinData = {
    tokenName: string;
    walletBalance: number;
    APY: number;
}

export const StableCoinsSupplyData: TStableCoinData[] = [
    {
        tokenName: "USDC",
        walletBalance: 12232,
        APY: 12.2
    },
    {
        tokenName: "DAI",
        walletBalance: 12232,
        APY: 12.2
    },{
        tokenName: "USDT",
        walletBalance: 12232,
        APY: 12.2
    }
] 

export const ETHDerivativesSupplyData: TStableCoinData[] = [
    {
        tokenName: "ETH",
        walletBalance: 12232,
        APY: 12.2
    },
    {
        tokenName: "cbETH",
        walletBalance: 12232,
        APY: 12.2
    },{
        tokenName: "rsETH",
        walletBalance: 12232,
        APY: 12.2
    }
] 

export const BTCDerivativesSupplyData: TStableCoinData[] = [
    {
        tokenName: "WBTC",
        walletBalance: 12232,
        APY: 12.2
    },
] 

export const StableCoinsBorrowData: TStableCoinData[] = [
    {
        tokenName: "USDC",
        walletBalance: 12232,
        APY: 12.2
    },
    {
        tokenName: "DAI",
        walletBalance: 12232,
        APY: 12.2
    },{
        tokenName: "USDT",
        walletBalance: 12232,
        APY: 12.2
    }
] 

export const ETHDerivativesBorrowData: TStableCoinData[] = [
    {
        tokenName: "ETH",
        walletBalance: 12232,
        APY: 12.2
    },
    {
        tokenName: "cbETH",
        walletBalance: 12232,
        APY: 12.2
    },{
        tokenName: "rsETH",
        walletBalance: 12232,
        APY: 12.2
    }
] 

export const BTCDerivativesBorrowData: TStableCoinData[] = [
    {
        tokenName: "WBTC",
        walletBalance: 12232,
        APY: 12.2
    },
] 