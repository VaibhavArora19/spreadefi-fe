import Image from 'next/image';
import Modal from '../../(ui)/Modal';
import { Button } from '../../ui/button';
import ChainsSelector from './ChainsSelector';
import TokenSelector from './TokenSelector';
import TransactionOverview from './TransactionOverview';
import { IoClose } from 'react-icons/io5';

type SupplyModalProps = {
  type: 'supply' | 'withdraw';
  onClose: () => void;
};

const SupplyModal: React.FC<SupplyModalProps> = ({ type, onClose }) => {
  return (
    <Modal className="w-[500px] p-5 ">
      <div className="flex justify-between items-center">
        <p className="font-medium mb-2 text-lg capitalize">{type} Assets</p>
        <IoClose className="cursor-pointer text-lg" onClick={onClose} />
      </div>

      <div className="flex items-center gap-1 flex-wrap text-xs text-[#a8a8a8]  pb-4 border-b-[0.5px] border-[#272727] mb-4">
        <p className="capitalize ">{type}</p>
        <Image
          src={'/assets/icons/tokens/weth.png'}
          height={20}
          width={20}
          alt="WETH"
        />
        <p>WETH on</p>
        <Image
          src={'/assets/icons/protocols/aave.png'}
          height={20}
          width={20}
          alt="WETH"
        />
        AAVE from any chain using any token!
      </div>

      <p className="text-xs text-[#707070] mb-1 ml-1">Amount</p>
      <div className="bg-[#1E1E1E] rounded-xl  flex items-start overflow-hidden justify-between">
        <input
          type="number"
          placeholder="0.0"
          className="text-3xl  text-white bg-inherit border-none outline-none placeholder:text-gray-500 p-4 w-[250px] overflow-hidden"
          onWheel={(e) => (e.target as HTMLInputElement).blur()}
        />
        <div className="flex items-center gap-4 text-xs p-4">
          <ChainsSelector />

          <TokenSelector />
        </div>
      </div>

      <TransactionOverview />

      <Button className="w-full text-black bg-white mt-4 py-6 capitalize">
        {type}
      </Button>
    </Modal>
  );
};

export default SupplyModal;
