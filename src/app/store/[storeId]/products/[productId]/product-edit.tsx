'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { useGetCategories } from '@/features/category/hooks/useGetCategories';
import { useGetColors } from '@/features/color/hooks/useGetColors';
import { ProductForm } from '@/features/product/components/product-form';
import { productService } from '@/features/product/services/product.service';

export function ProductEdit() {
  const params = useParams<{ productId: string }>();

  const { data } = useQuery({
    queryKey: ['get product'],
    queryFn: () => productService.getById(params.productId),
  });

  const { categories } = useGetCategories();
  const { colors } = useGetColors();

  return (
    <ProductForm
      categories={categories || []}
      colors={colors || []}
      product={data}
    />
  );
}
