import MigrateActionsModal from '@/components/popups/MigrateModal/MigrateActionsModal';
import WithdrawModal from '@/components/popups/Withdraw/WithdrawModal';
import { useFetchTokenListForChain } from '@/hooks/useFetchTokenList';
import { transactionPayloadActions } from '@/redux/actions';
import { useExecuteTransactions } from '@/server/api/transactions';
import { TAsset } from '@/types/asset';
import { ethers } from 'ethers';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAccount } from 'wagmi';

type SupplyItemProps = {
  data: { asset: TAsset; currentATokenBalance: string };
};

const SupplyItem: React.FC<SupplyItemProps> = ({ data }) => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showMigrateModal, setShowMigrateModal] = useState(false);

  const { address } = useAccount();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const { execute } = useExecuteTransactions();
  const { fetchList } = useFetchTokenListForChain();

  const protocol = searchParams.get('protocol');
  const protocolChainId = searchParams.get('chain');

  const handleSupplySubmit = async () => {
    //!show modal here asking user to connect wallet
    if (!address) return;

    const data = await execute();
  };

  const migrateModalHandler = async () => {
    //! add some warning here
    if (!protocolChainId) return;

    const tokens = await fetchList(protocolChainId);
    const [filterFromToken] = tokens.filter(
      (token) =>
        ethers.utils.getAddress(token.address) === ethers.utils.getAddress(data.asset.assetAddress),
    );

    //!add some error here
    if (!filterFromToken) return;

    dispatch(transactionPayloadActions.setStrategyName((protocol + '-').trim()));
    dispatch(transactionPayloadActions.setFromChain(protocolChainId));
    dispatch(transactionPayloadActions.setFromToken(data.asset.assetAddress));
    dispatch(transactionPayloadActions.setFromTokenDecimals(filterFromToken.decimals));

    setShowMigrateModal(true);
  };

  const withdrawModalHandler = async () => {
    //! add some warning here
    if (!protocolChainId) return;

    const tokens = await fetchList(protocolChainId);
    const [filterFromToken] = tokens.filter(
      (token) =>
        ethers.utils.getAddress(token.address) === ethers.utils.getAddress(data.asset.assetAddress),
    );

    //!add some error here
    if (!filterFromToken) return;

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
          <Image src={'/assets/icons/tokens/eth.png'} height={22} width={25} alt="ETH" />
          <p>{data.asset.assetSymbol}</p>
        </div>
        <p className="flex-[0.21]">{data.currentATokenBalance.slice(0, 4)}</p>
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
            setShowWithdrawModal(false);
          }}
          onSubmit={handleSupplySubmit}
        />
      ) : null}

      {showMigrateModal ? (
        <MigrateActionsModal
          onClose={() => {
            dispatch(transactionPayloadActions.resetState());
            setShowMigrateModal(false);
          }}
        />
      ) : null}
    </>
  );
};

export default SupplyItem;
