import React from 'react';
import MigrateBorrow from '../common/MigrateBorrow';
import { Action } from '@/types/strategy';

const BorrowSupplyModal = ({
  onClose,
  type,
}: {
  onClose: () => void;
  type: Action.BORROW_DEPOSIT | Action.BORROW_SUPPLY;
}) => {
  return <MigrateBorrow onClose={onClose} type={type} />;
};

export default BorrowSupplyModal;
