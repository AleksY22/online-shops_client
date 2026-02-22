import { storeService } from '../services/store.service';
import { IStoreCreate } from '../types/store.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import toast from 'react-hot-toast';

import { STORE_URL } from '@/shared/config/url.config';

export function useCreateStore() {
  const router = useRouter();

  const queryCllient = useQueryClient();

  const { mutate: createStore, isPending: isLoadingCreate } = useMutation({
    mutationKey: ['create store'],
    mutationFn: (data: IStoreCreate) => storeService.create(data),
    onSuccess(store) {
      queryCllient.invalidateQueries({
        queryKey: ['profile'],
      });
      toast.success('Магазин создан!');
      router.push(STORE_URL.home(store.id));
    },
    onError() {
      toast.error('Ошибка при создании магазина!');
    },
  });

  return useMemo(
    () => ({ createStore, isLoadingCreate }),
    [createStore, isLoadingCreate],
  );
}
