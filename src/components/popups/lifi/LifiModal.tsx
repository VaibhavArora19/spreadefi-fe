import { Action } from '@/types/strategy';
import { Route } from '@lifi/sdk';
import React from 'react';
import CommonActionModal from '../common/CommonActionModal';

type LifiModalProps = {
  onClose: () => void;
  onSubmit: () => void;
  marginAmount: number;
  selectedChain: number | null;
  selectedToken: string | null;
  route: Route | null;
  onChainChange: (chainId: number) => void;
  onTokenChange: (token: string) => void;
  onRouteChange: (route: Route) => void;
  entryPrice?: string;
  isFetchingLiFiQuote?: boolean;
};

const LifiModal: React.FC<LifiModalProps> = ({
  onClose,
  onSubmit,
  selectedChain,
  selectedToken,
  route,
  onChainChange,
  onTokenChange,
  onRouteChange,
  entryPrice,
  isFetchingLiFiQuote,
}) => {
  return (
    <CommonActionModal
      type={Action.DEPOSIT}
      onClose={onClose}
      onSubmit={onSubmit}
      lifi={{
        entryPrice,
        isFetchingLiFiQuote,
        selectedChain,
        selectedToken,
        route,
        onChainChange,
        onTokenChange,
        onRouteChange,
      }}
    />
  );
};

export default LifiModal;
