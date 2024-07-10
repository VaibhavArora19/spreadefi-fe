import CommonActionModal from './CommonActionModal';

const SupplyModal = ({ onClose }: { onClose: () => void }) => {
  return <CommonActionModal onClose={onClose} type="supply" />;
};

export default SupplyModal;
