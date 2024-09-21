'use client';

import Modal from '@/components/(ui)/Modal';
import { Button } from '@/components/ui/button';
import { walletActions } from '@/redux/features/wallet-slice';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';

const ConnectWallet = () => {
  const { open } = useWeb3Modal();
  const dispatch = useDispatch();
  return (
    <Modal className="w-[500px] rounded-3xl p-12">
      <div>
        <Image
          src={'/assets/images/astronaut3.png'}
          height={200}
          width={200}
          alt="Connect Wallet"
          className="mx-auto mb-4"
        />

        <p className="text-2xl font-semibold text-center">Connect your wallet</p>
        <p className="text-sm text-[#707070] mt-2 mb-4 text-center">
          Invest securely and effortlessly by connecting your wallet on spreadefi
        </p>
        <Button
          onClick={async () => {
            const res = await open();

            dispatch(walletActions.setIsConnected(true));
          }}
          type="button"
          className="w-full text-black bg-white mt-4 py-6 capitalize rounded-xl">
          Connect
        </Button>
      </div>
    </Modal>
  );
};

export default ConnectWallet;
