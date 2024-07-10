import React from 'react';
import CommonActionModal from '../common/CommonActionModal';

const BorrowModal = ({ onClose }: { onClose: () => void }) => {
  return <CommonActionModal type="borrow" onClose={onClose} />;
};

export default BorrowModal;
