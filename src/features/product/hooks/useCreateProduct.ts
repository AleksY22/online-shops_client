'use client';

import { productService } from '../services/product.service';
import { IProductInput } from '../types/product.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import toast from 'react-hot-toast';

import { STORE_URL } from '@/shared/config/url.config';

export function useCreateProduct() {
  const params = useParams<{ storeId: string }>();

  const router = useRouter();

  const queryCllient = useQueryClient();

  const { mutate: createProduct, isPending: isLoadingCreate } = useMutation({
    mutationKey: ['create product'],
    mutationFn: (data: IProductInput) =>
      productService.create(params.storeId, data),
    onSuccess() {
      queryCllient.invalidateQueries({
        queryKey: ['get products for store dashboard'],
      });
      toast.success('Товар создан!');
      router.push(STORE_URL.products(params.storeId));
    },
    onError() {
      toast.error('Ошибка при создании товара!');
    },
  });

  return useMemo(
    () => ({
      createProduct,
      isLoadingCreate,
    }),
    [createProduct, isLoadingCreate],
  );
}
