import React from 'react';
import CommonActionModal from '../common/CommonActionModal';
import { Action } from '@/types/strategy';

const BorrowModal = ({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) => {
  return <CommonActionModal type={Action.BORROW} onClose={onClose} onSubmit={onSubmit} />;
};

export default BorrowModal;
