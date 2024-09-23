'use client';
import { useFetchLoopingStrategyById } from '@/server/api/looping-strategies';
import React from 'react';
import { usePathname } from 'next/navigation';
import CreateLoopingPositionForm from '@/components/tables/LoopinStrategyTable/CreateLoopingPositionForm';
import { TLoopingStrategy } from '@/types/looping-positions';

export default function LoopingStrategyPage() {
  const path = usePathname();
  const strategyId = path.split('/')[2];
  const triggerQuery = !!strategyId;
  const { data, isLoading, isError } = useFetchLoopingStrategyById(strategyId, triggerQuery);

  if (isError) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CreateLoopingPositionForm data={data as TLoopingStrategy} />
    </div>
  );
}
