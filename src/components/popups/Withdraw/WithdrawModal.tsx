import React from 'react';
import CommonActionModal from '../common/CommonActionModal';

const WithdrawModal = ({ onClose }: { onClose: () => void }) => {
  return <CommonActionModal type="withdraw" onClose={onClose} />;
};

export default WithdrawModal;
