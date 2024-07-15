import { AppDispatch, RootState } from '@/types/redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useTransactionPayloadStore = () => useAppSelector((state) => state.transactionPayload);

export const useTransactionStore = () => useAppSelector((state) => state.transactions);

export const useTokensStore = () => useAppSelector((state) => state.tokens);
