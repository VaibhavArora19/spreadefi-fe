'use client';
import CreateLoopingPositionForm from '@/components/tables/LoopinStrategyTable/CreateLoopingPositionForm';

export default function LoopingStrategyPage() {
  // const { strategyId } = useParams();
  // const searchParams = useSearchParams();
  // const isLeveraged = searchParams.get('leveraged') === 'true';

  return (
    <div>
      <CreateLoopingPositionForm />
    </div>
  );
}
