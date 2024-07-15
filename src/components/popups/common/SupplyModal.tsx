import { Action } from '@/types/strategy';
import CommonActionModal from './CommonActionModal';

const SupplyModal = ({
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
      type={Action.SUPPLY}
    />
  );
};

export default SupplyModal;
