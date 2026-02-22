import { categoryService } from '../sevices/category.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import toast from 'react-hot-toast';

import { STORE_URL } from '@/shared/config/url.config';

export const useDeleteCategory = () => {
  const params = useParams<{ storeId: string; categoryId: string }>();
  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate: deleteCategory, isPending: isLoadingDelete } = useMutation({
    mutationKey: ['delete category'],
    mutationFn: () => categoryService.delete(params.categoryId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get categories for store dashboard'],
      });
      toast.success('Категория удалена успешно!');
      router.push(STORE_URL.categories(params.storeId));
    },
    onError() {
      toast.error('Ошибка при удалении категории!');
    },
  });

  return useMemo(
    () => ({
      deleteCategory,
      isLoadingDelete,
    }),
    [deleteCategory, isLoadingDelete],
  );
};
