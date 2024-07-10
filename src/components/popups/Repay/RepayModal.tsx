import React from 'react';
import CommonActionModal from '../common/CommonActionModal';

const RepayModal = ({ onClose }: { onClose: () => void }) => {
  return <CommonActionModal onClose={onClose} type="repay" />;
};

export default RepayModal;
