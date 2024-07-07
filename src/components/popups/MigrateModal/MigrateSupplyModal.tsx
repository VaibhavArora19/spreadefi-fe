import React from 'react';
import MigrateBorrow from '../common/MigrateBorrow';

const MigrateSupplyModal = ({ onClose }: { onClose: () => void }) => {
  return <MigrateBorrow onClose={onClose} type="migrate" />;
};

export default MigrateSupplyModal;
