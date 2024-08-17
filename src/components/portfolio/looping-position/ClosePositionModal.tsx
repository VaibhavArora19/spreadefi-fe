import React from 'react';
import op from '../../../../public/assets/icons/chains/op.png';
import Modal from '@/components/(ui)/Modal';
import { IoClose } from 'react-icons/io5';
import Image from 'next/image';
import { Slider } from '@/components/ui/slider';
import { MdOutlineArrowRight } from 'react-icons/md';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';

const ClosePositionModal = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: () => void;
}) => {
  return (
    <Modal className="w-[500px] p-5 space-y-4">
      <div className="flex justify-between items-start pb-2 border-b-[0.5px] border-[#272727] mb-4">
        <div className="flex items-center gap-2">
          <div className="space-y-1">
            <div>wstETH</div>
            <div className="flex items-center gap-2">
              <Image className="w-4" src={op} alt="logo" />
              <div className="text-sm">Aave v3</div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 relative">
          <IoClose onClick={onClose} className="cursor-pointer text-lg" />
        </div>
      </div>
      <div>
        <div className="space-y-4 py-2">
          <div className="relative">
            <input
              type="number"
              placeholder="Order size"
              className="text-lg text-white bg-inherit border border-gray-700 rounded-md outline-none placeholder:text-gray-500 px-4 py-2 w-full overflow-hidden"
              onWheel={(e) => (e.target as HTMLInputElement).blur()}
            />
            <span className="text-gray-400 absolute right-4 top-2.5">wstETH</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Leverage</span>
              <span className="text-gray-300">2.4x</span>
            </div>
            <Slider defaultValue={[33]} max={100} step={1} className="w-full" />
          </div>
          <div className="border-b border-gray-600 pb-3 space-y-3">
            <div className="flex items-end justify-between">
              <div className="w-6/12 flex items-end justify-between">
                <div>
                  <div className="text-sm text-gray-400">Size:</div>
                  <div className="text-green-500">+0.054</div>
                </div>
                <ArrowRightIcon className="size-5" />
              </div>
              <div className="text-green-500">+0.054</div>
            </div>
            <div className="flex items-end justify-between">
              <div className="w-6/12 flex items-end justify-between">
                <div>
                  <div className="text-sm text-gray-400">Margin:</div>
                  <div className="text-gray-50">19.82%</div>
                </div>
                <ArrowRightIcon className="size-5" />
              </div>

              <div className="text-gray-50">
                19.82% <span className="text-sm text-gray-400">{`(5%)`}</span>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div className="w-6/12 flex items-end justify-between">
                <div>
                  <div className="text-sm text-gray-400">Entry Price:</div>
                  <div className="text-gray-50">1.121232</div>
                </div>
                <ArrowRightIcon className="size-5" />
              </div>
              <div className="text-gray-50">1.121232</div>
            </div>
            <div className="flex items-end justify-between">
              <div className="w-6/12 flex items-end justify-between">
                <div>
                  <div className="text-sm text-gray-400">Liquidation Price:</div>
                  <div className="text-gray-50">0.9121232</div>
                </div>
                <ArrowRightIcon className="size-5" />
              </div>

              <div className="text-gray-50">0.9121232</div>
            </div>
            <div className="flex items-end justify-between">
              <div className="w-6/12 flex items-end justify-between">
                <div>
                  <div className="text-sm text-gray-400">ROE:</div>
                  <div className="text-gray-50">+10.82%</div>
                </div>
                <ArrowRightIcon className="size-5" />
              </div>

              <div className="text-gray-50">19.80%</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-gray-500">Exit Price</div>
            <div>1.5454</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-gray-50">Slippage Tolerance</div>
            {/* todo: add edit option here */}
            <div>0.4%</div>
          </div>
          <Button className="w-full text-black bg-white py-2 capitalize flex-[0.15]">
            Close Position
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ClosePositionModal;
