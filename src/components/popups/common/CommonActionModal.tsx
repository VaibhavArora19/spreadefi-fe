import Modal from '../../(ui)/Modal';
import { Button } from '../../ui/button';

import { InfoItem } from '@/components/create-new-position';
import { Switch } from '@/components/ui/switch';
import { tokensActions, transactionPayloadActions } from '@/redux/actions';
import { useAppDispatch, useTransactionPayloadStore, useTransactionStore } from '@/redux/hooks';
import { useTransactionsBuilder } from '@/server/api/transactions';
import { Action } from '@/types/strategy';
import { TTransactionPayload } from '@/types/transaction';
import { Route } from '@lifi/sdk';
import { ethers } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { useCallback, useEffect, useState } from 'react';
import { IoMdSettings } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { useAccount, useSwitchChain } from 'wagmi';
import ChainsSelector from './ChainsSelector';
import Slippage from './Slippage';
import TokenSelector from './TokenSelector';
import TransactionOverview from './TransactionOverview';

type CommonActionModalProps = {
  type: Action.SUPPLY | Action.WITHDRAW | Action.REPAY | Action.BORROW | Action.DEPOSIT;
  onClose: () => void;
  onSubmit: () => void;
  lifi?: {
    entryPrice?: string;
    selectedChain?: number | null;
    selectedToken?: string | null;
    route?: Route | null;
    onChainChange?: (chainId: number) => void;
    onTokenChange?: (token: string) => void;
    onRouteChange?: (route: Route) => void;
    isFetchingLiFiQuote?: boolean;
  };
};

type ChangeOptions = 'amount' | 'chain' | 'token';

const CommonActionModal: React.FC<CommonActionModalProps> = ({ type, onClose, onSubmit, lifi }) => {
  const [transactionPayload, setTransactionPayload] = useState<TTransactionPayload | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [tab, setTab] = useState('auto');
  const { isLoading } = useTransactionStore();

  const { address, chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const dispatch = useAppDispatch();

  const {
    strategyName,
    fromAmount,
    fromToken,
    fromChain,
    fromTokenDecimals,
    toToken,
    toChain,
    receiveGasOnDestination,
    slippage,
  } = useTransactionPayloadStore();

  const { data } = useTransactionsBuilder(transactionPayload);

  const prepareTransactionPayload = useCallback(() => {
    if (
      strategyName === '' ||
      !address ||
      !fromAmount ||
      !fromToken ||
      !fromChain ||
      !toToken ||
      !toChain
    )
      return;

    const payload: TTransactionPayload = {
      strategyName,
      action: type,
      txDetails: {
        fromAmount: ethers.utils.parseUnits(fromAmount, fromTokenDecimals).toString(),
        fromToken: fromToken as string,
        fromChain: fromChain as string,
        toToken,
        toChain,
        fromAddress: address,
        toAddress: address,
        receiveGasOnDestination,
      },
    };

    if (slippage !== 0 && tab === 'custom') payload.txDetails.slippage = slippage;

    setTransactionPayload(payload);
  }, [
    fromAmount,
    fromTokenDecimals,
    fromToken,
    fromChain,
    toToken,
    toChain,
    address,
    strategyName,
    type,
    receiveGasOnDestination,
    tab,
    slippage,
  ]);

  useEffect(() => {
    const debouncedFunction = setTimeout(() => {
      prepareTransactionPayload();
    }, 1500);

    return () => clearTimeout(debouncedFunction);
  }, [fromAmount, fromToken, fromChain, toToken, toChain, slippage, tab, receiveGasOnDestination]);

  const changeHandler = async (
    option: ChangeOptions,
    value: string | { address: string; decimals: number },
  ) => {
    switch (option) {
      case 'amount':
        dispatch(transactionPayloadActions.setFromAmount(value));
        break;

      case 'chain':
        if (type === Action.WITHDRAW || type === Action.BORROW) {
          if (toChain !== value) {
            dispatch(transactionPayloadActions.setToToken(''));
            dispatch(tokensActions.setTokens([]));
          }
          dispatch(transactionPayloadActions.setToChain(value));
        } else {
          if (fromChain !== value) {
            dispatch(transactionPayloadActions.setFromToken(''));
            dispatch(transactionPayloadActions.setFromTokenDecimals(0));
            dispatch(tokensActions.setTokens([]));
          }
          dispatch(transactionPayloadActions.setFromChain(value));
        }
        lifi?.onChainChange?.(parseInt(value as string));
        break;

      case 'token':
        if (typeof value === 'string') return;

        if (type === Action.WITHDRAW || type === Action.BORROW) {
          dispatch(transactionPayloadActions.setToToken(value.address));
        } else {
          dispatch(transactionPayloadActions.setFromToken(value.address));
          dispatch(transactionPayloadActions.setFromTokenDecimals(value.decimals));
        }
        lifi?.onTokenChange?.(value.address);
        break;
    }
  };

  return (
    <Modal className="w-[500px] p-5 ">
      <div className="flex justify-between items-center pb-2 border-b-[0.5px] border-[#272727] mb-4">
        <p className="font-medium mb-2 text-lg capitalize">{type} Assets</p>
        <div className="flex items-center gap-1 relative">
          {!lifi && (
            <IoMdSettings
              onClick={(e) => {
                e.stopPropagation();
                setShowSettings(!showSettings);
              }}
              className="cursor-pointer text-lg"
            />
          )}
          <IoClose onClick={onClose} className="cursor-pointer text-lg" />
        </div>
      </div>

      <p className="text-xs text-[#707070] mb-1 ml-1">Amount</p>
      <div className="bg-[#1E1E1E] rounded-xl  flex items-start overflow-hidden justify-between">
        <input
          disabled={!!lifi}
          type="number"
          placeholder="0.0"
          className="text-3xl  text-white bg-inherit border-none outline-none placeholder:text-gray-500 p-4 w-[200px] overflow-hidden"
          value={
            !!lifi?.route?.fromAmount
              ? Number(
                  formatUnits(lifi?.route?.fromAmount, lifi?.route?.fromToken.decimals),
                ).toFixed(2)
              : fromAmount
          }
          onChange={(e) => changeHandler('amount', e.target.value)}
          onWheel={(e) => (e.target as HTMLInputElement).blur()}
        />
        <div className="flex items-center gap-4 text-xs p-4">
          <ChainsSelector
            setChain={(chain) => changeHandler('chain', chain.chainId.toString())}
            type={type}
          />

          <TokenSelector
            setToken={(token) =>
              changeHandler('token', {
                address: token.address,
                decimals: token.decimals,
              })
            }
            type={type}
          />
        </div>
      </div>

      {!lifi && (
        <div className="flex items-center gap-2 mt-2">
          <p className="bg-[#282828] text-white p-2 rounded-md w-fit cursor-pointer text-center flex-[0.25] hover:bg-[#111]">
            25%
          </p>
          <p className="bg-[#282828] text-white p-2 rounded-md w-fit cursor-pointer text-center flex-[0.25] hover:bg-[#111]">
            50%
          </p>
          <p className="bg-[#282828] text-white p-2 rounded-md w-fit cursor-pointer text-center flex-[0.25] hover:bg-[#111]">
            75%
          </p>
          <p className="bg-[#282828] text-white p-2 rounded-md w-fit cursor-pointer text-center flex-[0.25] hover:bg-[#111]">
            100%
          </p>
        </div>
      )}

      {!lifi ? (
        <TransactionOverview />
      ) : (
        <div className="pt-4">
          <InfoItem
            label="Entry Price"
            value={lifi.entryPrice ? lifi.entryPrice : '-'}
            isLoading={lifi.isFetchingLiFiQuote}
          />
        </div>
      )}

      {/* @Vaibhav add proper values */}
      {!lifi && (
        <div className="bg-[#1E1E1E] w-full mt-3 rounded-xl p-4 flex items-center justify-between">
          <p className="text-sm">Arrival on gas</p>
          <Switch
            onCheckedChange={(checked) => {
              dispatch(transactionPayloadActions.setReceiveGasOnDestination(checked));
            }}
            checked={receiveGasOnDestination}
          />
        </div>
      )}

      {!lifi ? (
        <Button
          disabled={isLoading}
          className="w-full text-black bg-white mt-4 py-6 capitalize disabled:cursor-not-allowed"
          onClick={() => {
            onSubmit();
          }}>
          {type}
        </Button>
      ) : (
        <Button
          disabled={lifi?.isFetchingLiFiQuote}
          className="w-full text-black bg-white mt-4 py-6 capitalize disabled:cursor-not-allowed"
          onClick={async () => {
            if (lifi?.route?.fromChainId === chainId) {
              onSubmit();
            } else {
              await switchChainAsync({ chainId: lifi?.route?.fromChainId! });
              onSubmit();
            }
          }}>
          {lifi?.isFetchingLiFiQuote ? 'Getting quote details...' : type}
        </Button>
      )}

      {showSettings && <Slippage setTab={setTab} tab={tab} />}
    </Modal>
  );
};

export default CommonActionModal;
