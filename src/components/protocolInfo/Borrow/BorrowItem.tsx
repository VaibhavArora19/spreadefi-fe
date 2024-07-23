import BorrowAndActionModal from '@/components/popups/Borrow&Action/BorrowAndActionModal';
import RepayModal from '@/components/popups/Repay/RepayModal';
import { networkConfig } from '@/config/network';
import { useFetchTokenListForChain } from '@/hooks/useFetchTokenList';
import { tokensActions, transactionPayloadActions, transactionsActions } from '@/redux/actions';
import { useExecuteTransactions } from '@/server/api/transactions';
import { TAsset } from '@/types/asset';
import { ethers } from 'ethers';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { erc20Abi } from 'viem';
import { useAccount } from 'wagmi';

type BorrowItemProps = {
  data: { asset: TAsset; currentVariableDebt: string };
};

const BorrowItem: React.FC<BorrowItemProps> = ({ data }) => {
  const [showBorrowActionModal, setShowBorrowActionModal] = useState(false);
  const [showRepayModal, setShowRepayModal] = useState(false);
  const [decimals, setDecimals] = useState('0');

  const { fetchList } = useFetchTokenListForChain();
  const { execute } = useExecuteTransactions();
  const { address } = useAccount();
  const dispatch = useDispatch();

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

  const borrowAndActionModalHandler = async () => {
    if (!data.asset.chainId) return;

    const tokens = await fetchList(data.asset.chainId);

    const [filterFromToken] = tokens.filter(
      (token) =>
        ethers.utils.getAddress(token.address) === ethers.utils.getAddress(data.asset.assetAddress),
    );

    if (!filterFromToken) return;

    dispatch(transactionPayloadActions.setStrategyName(data.asset.protocolName + '-'));
    dispatch(transactionPayloadActions.setFromChain(data.asset.chainId));
    dispatch(transactionPayloadActions.setFromToken(data.asset.assetAddress));
    dispatch(transactionPayloadActions.setFromTokenDecimals(filterFromToken.decimals));

    setShowBorrowActionModal(true);
  };

  const handleRepaySubmit = async () => {
    //!show modal here asking user to connect wallet
    if (!address) return;

    const data = await execute();
  };

  return (
    <div className="flex items-center">
      <div className="flex gap-[6px] flex-[0.21]">
        <Image src={'/assets/icons/tokens/cbeth.png'} height={22} width={25} alt="cbETH" />
        <p>{data.asset.assetSymbol}</p>
      </div>
      <p className="flex-[0.21]">
        {decimals !== '0'
          ? ethers.utils.formatUnits(data.currentVariableDebt, decimals).substring(0, 7)
          : 0}
      </p>
      <p className="flex-[0.18]">{data.asset.assetBorrowApy.toFixed(2)}%</p>
      <div className="flex gap-4 flex-[0.37]">
        <button
          onClick={() => {
            dispatch(transactionPayloadActions.setStrategyName(data.asset.protocolName));
            dispatch(transactionPayloadActions.setToToken(data.asset.assetAddress));
            dispatch(transactionPayloadActions.setToChain(data.asset.chainId));

            setShowRepayModal(true);
          }}
          className="bg-white text-black py-2 px-4 text-xs rounded-md hover:bg-gray-200">
          Repay
        </button>
        <button
          onClick={async () => {
            await borrowAndActionModalHandler();
          }}
          className="bg-transparent text-white py-2 w-[120px] text-xs rounded-md border border-white hover:bg-white hover:text-black">
          Borrow & Action
        </button>
      </div>

      {showBorrowActionModal ? (
        <BorrowAndActionModal
          onClose={() => {
            dispatch(transactionPayloadActions.resetState());
            dispatch(transactionsActions.resetState());
            dispatch(tokensActions.resetState());
            setShowBorrowActionModal(false);
          }}
        />
      ) : null}

      {showRepayModal ? (
        <RepayModal
          onClose={() => {
            dispatch(transactionPayloadActions.resetState());
            dispatch(transactionsActions.resetState());
            dispatch(tokensActions.resetState());
            setShowRepayModal(false);
          }}
          onSubmit={handleRepaySubmit}
        />
      ) : null}
    </div>
  );
};

export default BorrowItem;
