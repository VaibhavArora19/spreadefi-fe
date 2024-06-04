import { TtokenName } from "@/types/tokens";

export const tokenNameToImage = (name: TtokenName) => {
    switch (name.toLowerCase()){
        case TtokenName.WETH : 
            return "/assets/icons/tokens/weth.png";
        case TtokenName.ETH: 
            return "/assets/icons/tokens/eth.png";
        case TtokenName.EZETH: 
            return "/assets/icons/tokens/ezeth.png";
        case TtokenName.RSETH: 
            return "/assets/icons/tokens/rseth.png";
        case TtokenName.CBETH: 
            return "/assets/icons/tokens/cbeth.png";
        default: 
            return "";
    }
}