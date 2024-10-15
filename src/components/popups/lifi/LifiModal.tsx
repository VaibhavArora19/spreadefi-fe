import { InfoItem } from '@/components/create-new-position';
import { tokensActions, transactionPayloadActions } from '@/redux/actions';
import { useAppDispatch, useTransactionPayloadStore } from '@/redux/hooks';
import { Action } from '@/types/strategy';
import { Route } from '@lifi/sdk';
import { IoClose } from 'react-icons/io5';
import { formatUnits } from 'viem';
import { useAccount, useSwitchChain } from 'wagmi';
import Modal from '../../(ui)/Modal';
import { Button } from '../../ui/button';
import ChainsSelector from '../common/ChainsSelector';
import TokenSelector from '../common/TokenSelector';

type LifiModalProps = {
  entryPrice?: string;
  selectedChain?: number | null;
  selectedToken?: string | null;
  route?: Route | null;
  onChainChange?: (chainId: number) => void;
  onTokenChange?: (token: string) => void;
  isLoading?: boolean;
  isFetchingLifiQuote?: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

type ChangeOptions = 'chain' | 'token';

const LifiModal: React.FC<LifiModalProps> = ({
  entryPrice,
  selectedChain,
  selectedToken,
  route,
  onChainChange,
  onTokenChange,
  onClose,
  onSubmit,
  isLoading,
  isFetchingLifiQuote,
}) => {
  const { address, chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const dispatch = useAppDispatch();

  const { fromChain, fromToken, fromTokenDecimals } = useTransactionPayloadStore();

  const changeHandler = async (
    option: ChangeOptions,
    value: string | { address: string; decimals: number },
  ) => {
    switch (option) {
      case 'chain':
        if (fromChain !== value) {
          dispatch(transactionPayloadActions.setFromToken(''));
          dispatch(transactionPayloadActions.setFromTokenDecimals(0));
          dispatch(tokensActions.setTokens([]));
        }
        dispatch(transactionPayloadActions.setFromChain(value as string));
        onChainChange?.(parseInt(value as string));
        break;

      case 'token':
        if (typeof value === 'string') return;
        dispatch(transactionPayloadActions.setFromToken(value.address));
        dispatch(transactionPayloadActions.setFromTokenDecimals(value.decimals));
        onTokenChange?.(value.address);
        break;
    }
  };

  const handleCloseLifiModal = () => {
    onClose();
    dispatch(transactionPayloadActions.setFromChain(''));
    dispatch(transactionPayloadActions.setFromToken(''));
    dispatch(transactionPayloadActions.setFromTokenDecimals(0));
    dispatch(tokensActions.setTokens([]));
  };

  return (
    <Modal className="w-[500px] p-5 ">
      <div className="flex justify-between items-center pb-2 border-b-[0.5px] border-[#272727] mb-4">
        <p className="font-medium mb-2 text-lg capitalize">Deposit Assets</p>
        <div className="relative">
          <IoClose onClick={handleCloseLifiModal} className="cursor-pointer text-lg" />
        </div>
      </div>

      <p className="text-xs text-[#707070] mb-1 ml-1">Amount</p>
      <div className="bg-[#1E1E1E] rounded-xl  flex items-start overflow-hidden justify-between">
        <div>
          <div>From amount:</div>
          <div>
            {route?.fromAmount && route.fromToken.decimals
              ? Number(formatUnits(BigInt(route.fromAmount), route.fromToken.decimals)).toFixed(5)
              : '-'}
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs p-4">
          <ChainsSelector
            setChain={(chain) => changeHandler('chain', chain.chainId.toString())}
            type={Action.DEPOSIT}
          />

          <TokenSelector
            setToken={(token) =>
              changeHandler('token', {
                address: token.address,
                decimals: token.decimals,
              })
            }
            type={Action.DEPOSIT}
          />
        </div>
      </div>

      <div className="pt-4">
        <InfoItem
          label="Entry Price"
          value={entryPrice ? Number(entryPrice).toFixed(5) : '-'}
          isLoading={isFetchingLifiQuote}
        />
      </div>

      <Button
        disabled={isLoading || isFetchingLifiQuote || !selectedChain || !selectedToken}
        className="w-full text-black bg-white mt-4 py-6 capitalize disabled:cursor-not-allowed"
        onClick={async () => {
          if (route?.fromChainId === chainId) {
            onSubmit();
          } else {
            await switchChainAsync({ chainId: route?.fromChainId! });
            onSubmit();
          }
        }}>
        {isFetchingLifiQuote
          ? 'Getting quote details...'
          : isLoading
          ? 'Executing transaction...'
          : 'Deposit'}
      </Button>
    </Modal>
  );
};
export default LifiModal;
