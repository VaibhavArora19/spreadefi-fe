import Image from 'next/image';
import { Button } from '../ui/button';
import { assetNameToImage } from '@/constants/assetInfo';
import { TFormattedAsset, TLendingAsset, TYieldAsset } from '@/types/balance';
import { useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { networkConfig } from '@/config/network';
import { erc20Abi } from 'viem';
import MigrateActionsModal from '../popups/MigrateModal/MigrateActionsModal';
import WithdrawModal from '../popups/Withdraw/WithdrawModal';
import { tokensActions, transactionPayloadActions, transactionsActions } from '@/redux/actions';
import { useDispatch } from 'react-redux';
import { useFetchTokenListForChain } from '@/hooks/useFetchTokenList';
import { toast, ToastContainer } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import { walletActions } from '@/redux/features/wallet-slice';
import { useExecuteTransactions } from '@/server/api/transactions';
import { useAccount } from 'wagmi';
import 'react-toastify/dist/ReactToastify.css';

interface TokenDetailsProps {
  protocolName: string;
  chain: string;
  tokens?: TFormattedAsset[];
  type: 'Supplied' | 'Borrowed';
  actionType?: 'vault' | 'lendBorrow';
}

export const TokenDetails: React.FC<TokenDetailsProps> = ({
  protocolName,
  chain,
  tokens,
  type,
  actionType,
}) => {
  const [decimals, setDecimals] = useState<Array<string>>([]);
  const [showMigrateModal, setShowMigrateModal] = useState<boolean>(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false);

  const { address } = useAccount();
  const dispatch = useDispatch();
  const { fetchList } = useFetchTokenListForChain();
  const { execute } = useExecuteTransactions();
  const searchParams = useSearchParams();

  const data: any = {}; // @vaibhav

  const getDecimals = useCallback(async () => {
    if (!tokens) return;

    const tokensDecimals: Array<Promise<string>> = [];

    tokens?.forEach((token) => {
      const provider = new ethers.providers.JsonRpcProvider(
        //@ts-ignore
        networkConfig[token.asset.chainId].rpc,
      );
      const contract = new ethers.Contract(token.asset.assetAddress, erc20Abi, provider);

      const tokenDecimals = contract.decimals();

      tokensDecimals.push(tokenDecimals);
    });

    const decimalArray = await Promise.all(tokensDecimals);

    setDecimals(decimalArray);
  }, [tokens]);

  const migrateModalHandler = async (token: any) => {
    //! add some warning here
    if (!chain) {
      toast.error('ChainId not found!');
      return;
    }

    dispatch(transactionPayloadActions.setStrategyName((protocolName + '-').trim()));
    dispatch(transactionPayloadActions.setFromChain(chain));
    dispatch(transactionPayloadActions.setFromToken(token.asset.assetAddress));
    dispatch(transactionPayloadActions.setFromTokenDecimals(token.asset.assetDecimals));

    setShowMigrateModal(true);
  };

  const withdrawModalHandler = async (token: any) => {
    //! add some warning here
    if (!chain) {
      toast.error('ChainId not found');
      return;
    }
    protocolName && dispatch(transactionPayloadActions.setStrategyName(protocolName));
    chain && dispatch(transactionPayloadActions.setFromChain(chain));
    dispatch(transactionPayloadActions.setFromToken(token.asset.assetAddress));
    dispatch(transactionPayloadActions.setFromTokenDecimals(token.asset.assetDecimals));

    setShowWithdrawModal(true);
  };

  const handleSupplySubmit = async () => {
    //!show modal here asking user to connect wallet
    if (!address) {
      dispatch(walletActions.setIsConnected(false));
      return;
    }

    const data = await execute();
  };

  useEffect(() => {
    if (!tokens) return;

    getDecimals();
  }, [tokens, getDecimals]);

  return (
    <div className="bg-[#464646] rounded-lg overflow-hidden">
      <div className="flex p-3 bg-[#2c2c2c] text-sm text-[#707070]">
        <p className="flex-[0.25]">{type}</p>
        <p className="flex-[0.33] text-center">Amount</p>
        <p className="flex-[0.33] text-center">USD Value</p>
        {actionType === 'vault' ? <p className="flex-[0.30] text-[#2c2c2c]">.</p> : null}
      </div>
      {tokens &&
        tokens.map((token, index) => (
          <div key={index} className="flex p-3 bg-[#404040] m-1 rounded-md items-center">
            <div className="flex items-center flex-[0.25] gap-2">
              <Image
                src={assetNameToImage(token.asset.assetSymbol, token.asset.protocolName)}
                height={30}
                width={30}
                alt="Token Icon"
                className="rounded-full"
              />
              <p>{token.asset.assetSymbol}</p>
            </div>
            <p className="flex-[0.33] text-center">
              {type == 'Borrowed'
                ? decimals[index]
                  ? ethers.utils.formatUnits(
                      BigInt((token as TFormattedAsset & TLendingAsset).currentStableDebt) +
                        BigInt((token as TFormattedAsset & TLendingAsset).currentVariableDebt),
                      decimals[index],
                    )
                  : 0
                : decimals[index]
                ? (token as TFormattedAsset & TLendingAsset).currentATokenBalance
                  ? ethers.utils
                      .formatUnits(
                        (token as TFormattedAsset & TLendingAsset).currentATokenBalance,
                        decimals[index],
                      )
                      .substring(0, 7)
                  : '-'
                : 0}
            </p>
            <p className="flex-[0.33] text-center">
              {(token as TFormattedAsset & TYieldAsset)?.balanceUSD}
            </p>

            {actionType === 'vault' ? (
              <div className="flex items-center gap-3 self-end">
                <Button
                  onClick={async () => {
                    await migrateModalHandler(token);
                  }}
                  className=" text-black bg-white py-2 capitalize flex-[0.15]">
                  Migrate
                </Button>
                <Button
                  onClick={async () => {
                    await withdrawModalHandler(token);
                  }}
                  className=" text-black bg-white py-2 capitalize flex-[0.15]">
                  Withdraw
                </Button>
              </div>
            ) : null}
          </div>
        ))}

      {showMigrateModal ? (
        <MigrateActionsModal
          onClose={() => {
            dispatch(transactionPayloadActions.resetState());
            dispatch(transactionsActions.resetState());
            dispatch(tokensActions.resetState());
            setShowMigrateModal(false);
          }}
        />
      ) : null}

      {showWithdrawModal ? (
        <WithdrawModal
          onClose={() => {
            dispatch(transactionPayloadActions.resetState());
            dispatch(transactionsActions.resetState());
            dispatch(tokensActions.resetState());
            setShowWithdrawModal(false);
          }}
          onSubmit={handleSupplySubmit}
        />
      ) : null}

      <ToastContainer theme="dark" />
    </div>
  );
};
