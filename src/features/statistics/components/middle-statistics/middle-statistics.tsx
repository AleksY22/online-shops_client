import { LastUsers } from './last-users';
import { Overview } from './overview';
import { useGetStatistics } from '@/features/statistics/hooks/useGetStatistics';

export function MiddleStatistics() {
  const { middle } = useGetStatistics();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7 mt-6">
      {middle?.monthlySales.length || middle?.lastUsers.length ? (
        <>
          <div className="col-span-1 lg:col-span-3 xl:col-span-4">
            <Overview data={middle.monthlySales} />
          </div>
          <div className="col-span-1 lg:col-span-3">
            <LastUsers data={middle.lastUsers} />
          </div>
        </>
      ) : (
        <div>Статистические данные отсутствуют!</div>
      )}
    </div>
  );
}
