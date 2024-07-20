import React from 'react';
import SupplyModal from '../common/SupplyModal';
import { Action } from '@/types/strategy';

const LeverageSupplyModal = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: () => void;
}) => {
  return <SupplyModal onClose={onClose} onSubmit={onSubmit} type={Action.SUPPLY} />;
};

export default LeverageSupplyModal;
