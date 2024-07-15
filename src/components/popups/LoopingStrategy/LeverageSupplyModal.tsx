import React from 'react';
import SupplyModal from '../common/SupplyModal';

const LeverageSupplyModal = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: () => void;
}) => {
  return <SupplyModal onClose={onClose} onSubmit={onSubmit} />;
};

export default LeverageSupplyModal;
