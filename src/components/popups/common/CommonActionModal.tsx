import Image from 'next/image';
import Modal from '../../(ui)/Modal';
import { Button } from '../../ui/button';

import { IoClose } from 'react-icons/io5';
import TransactionOverview from './TransactionOverview';
import TokenSelector from './TokenSelector';
import ChainsSelector from './ChainsSelector';
import { useAppDispatch, useTransactionPayloadStore } from '@/redux/hooks';
import { tokensActions, transactionPayloadActions } from '@/redux/actions';
import { TTransactionPayload } from '@/types/transaction';
import { Action } from '@/types/strategy';
import { useAccount, useCall } from 'wagmi';
import { useTransactionsBuilder } from '@/server/api/transactions';
import { useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers';

type CommonActionModalProps = {
  type: Action.SUPPLY | Action.WITHDRAW | Action.REPAY | Action.BORROW;
  onClose: () => void;
  onSubmit: () => void;
};

type ChangeOptions = 'amount' | 'chain' | 'token';

const CommonActionModal: React.FC<CommonActionModalProps> = ({ type, onClose, onSubmit }) => {
  const [transactionPayload, setTransactionPayload] = useState<TTransactionPayload | null>(null);

  const { address } = useAccount();
  const dispatch = useAppDispatch();

  const { strategyName, fromAmount, fromToken, fromChain, fromTokenDecimals, toToken, toChain } =
    useTransactionPayloadStore();

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
      },
    };

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
  ]);

  useEffect(() => {
    const debouncedFunction = setTimeout(() => {
      prepareTransactionPayload();
    }, 5000);

    return () => clearTimeout(debouncedFunction);
  }, [fromAmount, fromToken, fromChain, toToken, toChain]);

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
          //* in case of withdraw the value selected by user will be toChain i.e. chain on which user wants his funds back
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

        break;

      case 'token':
        if (typeof value === 'string') return;

        if (type === Action.WITHDRAW || type === Action.BORROW) {
          dispatch(transactionPayloadActions.setToToken(value.address));
        } else {
          dispatch(transactionPayloadActions.setFromToken(value.address));
          dispatch(transactionPayloadActions.setFromTokenDecimals(value.decimals));
        }
        break;
    }
  };

  return (
    <Modal className="w-[500px] p-5 ">
      <div className="flex justify-between items-center">
        <p className="font-medium mb-2 text-lg capitalize">{type} Assets</p>
        <IoClose className="cursor-pointer text-lg" onClick={onClose} />
      </div>

      <div className="flex items-center gap-1 flex-wrap text-xs text-[#a8a8a8]  pb-4 border-b-[0.5px] border-[#272727] mb-4">
        <p className="capitalize ">{type}</p>
        <Image src={'/assets/icons/tokens/weth.png'} height={20} width={20} alt="WETH" />
        <p>WETH on</p>
        <Image src={'/assets/icons/protocols/aave.png'} height={20} width={20} alt="WETH" />
        AAVE from any chain using any token!
      </div>

      <p className="text-xs text-[#707070] mb-1 ml-1">Amount</p>
      <div className="bg-[#1E1E1E] rounded-xl  flex items-start overflow-hidden justify-between">
        <input
          type="number"
          placeholder="0.0"
          className="text-3xl  text-white bg-inherit border-none outline-none placeholder:text-gray-500 p-4 w-[200px] overflow-hidden"
          value={fromAmount}
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

      <TransactionOverview />

      <Button
        className="w-full text-black bg-white mt-4 py-6 capitalize"
        onClick={() => {
          onSubmit();
        }}>
        {type}
      </Button>
    </Modal>
  );
};

export default CommonActionModal;
