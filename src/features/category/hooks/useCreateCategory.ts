import { categoryService } from '../sevices/category.service';
import { ICategoryInput } from '../types/category.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import toast from 'react-hot-toast';

import { STORE_URL } from '@/shared/config/url.config';

export const useCreateCategory = () => {
  const params = useParams<{ storeId: string }>();
  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate: createCategory, isPending: isLoadingCreate } = useMutation({
    mutationKey: ['create category'],
    mutationFn: (data: ICategoryInput) =>
      categoryService.create(params.storeId, data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get categories for store dashboard'],
      });
      toast.success('Категоря создана успешно!');
      router.push(STORE_URL.categories(params.storeId));
    },
    onError() {
      toast.error('Ошибка при создании категории!');
    },
  });

  return useMemo(
    () => ({
      createCategory,
      isLoadingCreate,
    }),
    [createCategory, isLoadingCreate],
  );
};
