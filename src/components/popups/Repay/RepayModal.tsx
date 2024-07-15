import React from 'react';
import CommonActionModal from '../common/CommonActionModal';
import { Action } from '@/types/strategy';

const RepayModal = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: () => void;
}) => {
  return (
    <CommonActionModal
      onClose={onClose}
      onSubmit={onSubmit}
      type={Action.REPAY}
    />
  );
};

export default RepayModal;
