import React from 'react';
import MigrateBorrow from '../common/MigrateBorrow';

const BorrowSupplyModal = ({ onClose }: { onClose: () => void }) => {
  return <MigrateBorrow onClose={onClose} type="borrowAction" />;
};

export default BorrowSupplyModal;
