'use client';
import CreateLeveragedPositionForm from '@/components/tables/LoopinStrategyTable/CreateLeveragedPositionForm';

export default function LeveragedStrategyPage() {
  // const { strategyId } = useParams();
  // const searchParams = useSearchParams();
  // const isLeveraged = searchParams.get('leveraged') === 'true';

  // const { data: regularStrategyData, isLoading: isRegularLoading } = useFetchLoopingStrategyById(
  //   strategyId as string,
  //   'Long',
  // );

  // const { data: leveragedStrategyData, isLoading: isLeveragedLoading } =
  //   useFetchLoopingStrategyById(strategyId as string, 'Long');

  // if ((isRegularLoading && !isLeveraged) || (isLeveragedLoading && isLeveraged)) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <CreateLeveragedPositionForm />
    </div>
  );
}
