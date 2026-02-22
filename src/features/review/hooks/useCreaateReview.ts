'use client';

import { reviewService } from '../services/review.service';
import { IReviewInput } from '../types/review.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import toast from 'react-hot-toast';

export function useCreateReview(storeId: string) {
  const params = useParams<{ id: string }>();

  const queryClient = useQueryClient();

  const { mutate: createReview, isPending: isLoadingCreate } = useMutation({
    mutationKey: ['create review'],
    mutationFn: (data: IReviewInput) =>
      reviewService.create(params.id, storeId, data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['product'],
      });
      toast.success('Отзыв создан!');
    },
    onError() {
      toast.error('Ошибка при создании отзыва!');
    },
  });

  return useMemo(
    () => ({
      createReview,
      isLoadingCreate,
    }),
    [createReview, isLoadingCreate],
  );
}
