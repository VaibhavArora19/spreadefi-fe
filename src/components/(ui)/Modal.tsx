import React from 'react';
import Backdrop from './Backdrop';
import useLockBodyScroll from '@/hooks/useLockBodyScroll';

const Modal = ({
  children,
  className,
  onClose,
}: {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}) => {
  useLockBodyScroll(true);

  return (
    <>
      <Backdrop onClose={onClose} />
      <div
        className={`${className} fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-lg bg-[#151515] shadow-md z-20`}>
        {children}
      </div>
    </>
  );
};

export default Modal;
