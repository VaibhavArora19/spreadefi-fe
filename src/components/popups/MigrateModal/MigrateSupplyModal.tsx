import React from 'react';
import MigrateBorrow from '../common/MigrateBorrow';
import { Action } from '@/types/strategy';

const MigrateSupplyModal = ({
  onClose,
  type,
}: {
  onClose: () => void;
  type: Action.WITHDRAW_DEPOSIT | Action.WITHDRAW_SUPPLY;
}) => {
  return <MigrateBorrow onClose={onClose} type={type} />;
};

export default MigrateSupplyModal;
