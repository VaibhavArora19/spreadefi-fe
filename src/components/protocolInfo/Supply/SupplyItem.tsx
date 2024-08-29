import MigrateActionsModal from '@/components/popups/MigrateModal/MigrateActionsModal';
import WithdrawModal from '@/components/popups/Withdraw/WithdrawModal';
import { networkConfig } from '@/config/network';
import { assetNameToImage } from '@/constants/assetInfo';
import { useFetchTokenListForChain } from '@/hooks/useFetchTokenList';
import { tokensActions, transactionPayloadActions, transactionsActions } from '@/redux/actions';
import { useExecuteTransactions } from '@/server/api/transactions';
import { TAsset } from '@/types/asset';
import { ethers } from 'ethers';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { erc20Abi } from 'viem';
import { useAccount } from 'wagmi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { walletActions } from '@/redux/features/wallet-slice';

type SupplyItemProps = {
  data: { asset: TAsset; currentATokenBalance: string };
};

const SupplyItem: React.FC<SupplyItemProps> = ({ data }) => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showMigrateModal, setShowMigrateModal] = useState(false);
  const [decimals, setDecimals] = useState('0');

  const { address } = useAccount();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const { execute } = useExecuteTransactions();
  const { fetchList } = useFetchTokenListForChain();

  const protocol = searchParams.get('protocol');
  const protocolChainId = searchParams.get('chain');

  useEffect(() => {
    if (!data.asset || !data.asset.chainId) return;

    async function getDecimals() {
      //@ts-ignore
      const provider = new ethers.providers.JsonRpcProvider(networkConfig[data.asset.chainId].rpc);

      const contract = new ethers.Contract(data.asset.assetAddress, erc20Abi, provider);

      const decimalPoints = await contract.decimals();

      setDecimals(decimalPoints.toString());
    }

    getDecimals();
  }, [data.asset]);

  const handleSupplySubmit = async () => {
    //!show modal here asking user to connect wallet
    if (!address) {
      dispatch(walletActions.setIsConnected(false));
      return;
    }

    const data = await execute();
  };

  const migrateModalHandler = async () => {
    //! add some warning here
    if (!protocolChainId) {
      toast.error('ChainId not found!');
      return;
    }

    const tokens = await fetchList(protocolChainId);
    const [filterFromToken] = tokens.filter(
      (token) =>
        ethers.utils.getAddress(token.address) === ethers.utils.getAddress(data.asset.assetAddress),
    );

    //!add some error here
    if (!filterFromToken) {
      toast.error('Some error occurred!');
      return;
    }

    dispatch(transactionPayloadActions.setStrategyName((protocol + '-').trim()));
    dispatch(transactionPayloadActions.setFromChain(protocolChainId));
    dispatch(transactionPayloadActions.setFromToken(data.asset.assetAddress));
    dispatch(transactionPayloadActions.setFromTokenDecimals(filterFromToken.decimals));

    setShowMigrateModal(true);
  };

  const withdrawModalHandler = async () => {
    //! add some warning here
    if (!protocolChainId) {
      toast.error('ChainId not found');
      return;
    }

    const tokens = await fetchList(protocolChainId);
    const [filterFromToken] = tokens.filter(
      (token) =>
        ethers.utils.getAddress(token.address) === ethers.utils.getAddress(data.asset.assetAddress),
    );

    //!add some error here
    if (!filterFromToken) {
      toast.error('Some error occurred!');
      return;
    }

    protocol && dispatch(transactionPayloadActions.setStrategyName(protocol));
    protocolChainId && dispatch(transactionPayloadActions.setFromChain(protocolChainId));
    dispatch(transactionPayloadActions.setFromToken(data.asset.assetAddress));
    dispatch(transactionPayloadActions.setFromTokenDecimals(filterFromToken.decimals));

    setShowWithdrawModal(true);
  };

  return (
    <>
      <div className="flex items-center w-full">
        <div className="flex gap-[6px] flex-[0.21]">
          <Image
            src={assetNameToImage(data.asset.assetSymbol)}
            height={22}
            width={25}
            alt={data.asset.assetSymbol}
          />
          <p>{data.asset.assetSymbol}</p>
        </div>
        <p className="flex-[0.21]">
          {decimals !== '0'
            ? ethers.utils.formatUnits(data.currentATokenBalance, decimals).substring(0, 8)
            : 0}
        </p>
        <p className="flex-[0.21]">{data.asset.assetSupplyApy.toFixed(2)}%</p>
        <div className="flex gap-4 flex-[0.35]">
          <button
            onClick={async () => {
              await withdrawModalHandler();
            }}
            className="bg-white text-black py-2 px-4 text-xs rounded-md hover:bg-gray-200">
            Withdraw
          </button>
          <button
            onClick={migrateModalHandler}
            className="bg-transparent text-white py-2  px-4 text-xs rounded-md border border-white hover:bg-white hover:text-black">
            Migrate
          </button>
        </div>
      </div>

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

      <ToastContainer theme="dark" />
    </>
  );
};

export default SupplyItem;
