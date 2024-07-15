import React from 'react';
import CommonActionModal from '../common/CommonActionModal';
import { Action } from '@/types/strategy';

const WithdrawModal = ({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) => {
  return <CommonActionModal type={Action.WITHDRAW} onClose={onClose} onSubmit={onSubmit} />;
};

export default WithdrawModal;
