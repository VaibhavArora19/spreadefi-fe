'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import aave from '../../../../public/assets/icons/protocols/aave.png';
import op from '../../../../public/assets/icons/chains/op.png';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FaEdit } from 'react-icons/fa';
import ModifyLeverageModal from './ModifyLeverageModal';
import { useState } from 'react';
import ClosePositionModal from './ClosePositionModal';
import IncreaseDecreaseModal from './IncreaseDecreaseModal';

const LoopingPositionTable = () => {
  const [showModifyLeverageModal, setShowModifyLeverageModal] = useState(false);
  const [showClosePositionModal, setShowClosePositionModal] = useState(false);
  const [showIncreaseDecreaseModal, setShowIncreaseDecreaseModal] = useState(false);

  function handleModifyLeverageModal() {
    setShowModifyLeverageModal((prev) => !prev);
  }

  function handleClosePositionModal() {
    setShowClosePositionModal((prev) => !prev);
  }

  function handleIncreaseDecreaseModal() {
    setShowIncreaseDecreaseModal((prev) => !prev);
  }

  return (
    <>
      <Table className="w-full">
        <TableHeader>
          <TableRow className="border-b border-[#1e1e1e] ">
            <TableHead className={`font-light text-[#939393]`}>Symbol</TableHead>
            <TableHead className={`font-light text-[#939393]`}>Amount Invested</TableHead>
            <TableHead className={`font-light text-[#939393]`}>Value</TableHead>
            <TableHead className={`font-light text-[#939393]`}>ROE</TableHead>
            <TableHead className={`font-light text-[#939393]`}>Liq. Buffer</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-none">
          <TableRow className="border-none cursor-pointer hover:bg-[#131313]">
            <TableCell className="py-4 max-w-[120px] font-light">
              <div className="flex items-center gap-2">
                <Image className="w-10" src={aave} alt="logo" />
                <div className="space-y-1">
                  <div>wstETH on Aave v3</div>
                  <div className="flex items-center gap-2">
                    <div>OP Mainnet</div>
                    <Image className="w-4" src={op} alt="logo" />
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell className="py-4 max-w-[120px] font-light">0.0015 ETH</TableCell>
            <TableCell className="py-4 max-w-[120px] font-light">0.0015 ETH</TableCell>
            <TableCell className="py-4 max-w-[120px] font-light">0.0015 ETH</TableCell>
            <TableCell className="py-4 max-w-[120px] font-light">0.0015 ETH</TableCell>
            <TableCell className="py-4 max-w-[120px] font-light">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto border-none bg-[#27272A]">
                    Edit <FaEdit className="ml-2 h-4 w-4 cursor-pointer" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleModifyLeverageModal} className="capitalize">
                    Modify Leverage
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleIncreaseDecreaseModal} className="capitalize">
                    Increase/Decrease
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleClosePositionModal} className="capitalize">
                    Close position
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {showModifyLeverageModal && (
        <ModifyLeverageModal
          onSubmit={() => console.log('a')}
          onClose={() => setShowModifyLeverageModal(false)}
        />
      )}
      {showIncreaseDecreaseModal && (
        <IncreaseDecreaseModal
          onSubmit={() => console.log('a')}
          onClose={() => setShowIncreaseDecreaseModal(false)}
        />
      )}
      {showClosePositionModal && (
        <ClosePositionModal
          onClose={() => setShowClosePositionModal(false)}
          onSubmit={() => console.log('a')}
        />
      )}
    </>
  );
};

export default LoopingPositionTable;
