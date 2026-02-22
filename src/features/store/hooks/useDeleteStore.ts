'use client';

import { storeService } from '../services/store.service';
import { useMutation } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import toast from 'react-hot-toast';

import { STORE_URL } from '@/shared/config/url.config';

export function useDeleteStore() {
  const params = useParams<{ storeId: string }>();

  const router = useRouter();

  const { mutate: deleteStore, isPending: isLoadingDelete } = useMutation({
    mutationKey: ['delete store'],
    mutationFn: () => storeService.delete(params.storeId),
    onSuccess() {
      toast.success('Магазин удален!');
      router.push(STORE_URL.home());
    },
    onError() {
      toast.error('Ошибка при удалении магазина!');
    },
  });

  return useMemo(
    () => ({ deleteStore, isLoadingDelete }),
    [deleteStore, isLoadingDelete],
  );
}
