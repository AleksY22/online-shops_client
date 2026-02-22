'use client';

import { DataTable } from '@/shared/components/data-table/data-table';
import DataTableLoading from '@/shared/components/data-table/data-table-loading';
import { Heading } from '@/shared/components/heading';
import { formatDate } from '@/shared/lib/format-date';

import {
  IReviewColumn,
  reviewColumns,
} from '@/features/review/components/review-columns';
import { useGetReviews } from '@/features/review/hooks/useGetReviews';

export function Reviews() {
  const { reviews, isLoading } = useGetReviews();

  const formattedReviews: IReviewColumn[] = reviews
    ? reviews.map((review) => ({
        id: review.id,
        createdAt: formatDate(review.createdAt),
        rating: Array.from({ length: review.rating })
          .map(() => '⭐')
          .join(' '),
        username: review.user.name,
      }))
    : [];

  return (
    <div className="p-6">
      {isLoading ? (
        <DataTableLoading />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <Heading
              title={`Отзывы (${reviews?.length})`}
              description="Все отзывы магазина"
            />
          </div>
          <div className="mt-3">
            <DataTable
              columns={reviewColumns}
              data={formattedReviews}
              filterKey="createdAt"
            />
          </div>
        </>
      )}
    </div>
  );
}
