'use client';

import { Action } from '@/types/strategy';
import CommonActionModal from './CommonActionModal';

const SupplyModal = ({
  onClose,
  onSubmit,
  type,
}: {
  onClose: () => void;
  onSubmit: () => void;
  type: Action.SUPPLY | Action.DEPOSIT;
}) => {
  return <CommonActionModal onClose={onClose} onSubmit={onSubmit} type={type} />;
};

export default SupplyModal;
