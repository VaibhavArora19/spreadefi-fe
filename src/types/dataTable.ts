import { TProtocolName } from "./protocol";

export type TokenAPYInfo = {
    id: string;
    asset: string;
    baseAPY: string;
    boostedAPY: string;
    totalAPY: string;
    chains: string[];
    protocols: TProtocolName[];
  };
  