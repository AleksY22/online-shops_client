import { Card, CardContent } from '../ui';
import { Loader } from '../ui/loader';
import { Skeleton } from '../ui/skeleton';
import { FC } from 'react';

const DataTableLoading: FC = () => {
  return (
    <div className="mx-auto w-full">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-8 w-72 mt-6" />
      <Card className="mt-6">
        <CardContent>
          <div className="h-130 w-full flex items-center justify-center">
            <Loader />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataTableLoading;
