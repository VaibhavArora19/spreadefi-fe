export const networkConfig = {
  '42161': {
    rpc: process.env.NEXT_PUBLIC_ARB_RPC,
    Aave: {
      poolAddress: '0x794a61358D6845594F94dc1DB02A252b5b4814aD',
    },
  },
  '8453': {
    rpc: process.env.NEXT_PUBLIC_BASE_RPC,
    Aave: {
      poolAddress: '0xA238Dd80C259a72e81d7e4664a9801593F98d1c5',
    },
    Seamless: {
      poolAddress: '0x8F44Fd754285aa6A2b8B9B97739B79746e0475a7',
    },
  },

  '10': {
    rpc: process.env.NEXT_PUBLIC_OP_RPC,
    Aave: {
      poolAddress: '0x794a61358D6845594F94dc1DB02A252b5b4814aD',
    },
  },
  '59144': {
    rpc: process.env.NEXT_PUBLIC_LINEA_RPC,
    Linea: {
      poolAddress: '0x2f9bB73a8e98793e26Cb2F6C4ad037BDf1C6B269',
    },
  },
};
