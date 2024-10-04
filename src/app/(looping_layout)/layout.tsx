'use client';
import { loopingStrategyActions } from '@/redux/actions';
import { useAppDispatch } from '@/redux/hooks';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

interface LoopingLayoutProps {
  children: React.ReactNode;
}

export default function LoopingLayout({ children }: LoopingLayoutProps) {
  const dispatch = useAppDispatch();
  const path = usePathname();
  const strategyHref = path.split('/')[2];

  dispatch(loopingStrategyActions.setStrategyHref(strategyHref));

  useEffect(() => {
    dispatch(loopingStrategyActions.setStrategyHref(strategyHref));
  }, [strategyHref]);

  return <div>{children}</div>;
}
