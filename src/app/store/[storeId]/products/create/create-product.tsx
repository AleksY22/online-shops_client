'use client';

import { useGetCategories } from '@/features/category/hooks/useGetCategories';
import { useGetColors } from '@/features/color/hooks/useGetColors';
import { ProductForm } from '@/features/product/components/product-form';

export function CreateProduct() {
  const { categories } = useGetCategories();
  const { colors } = useGetColors();

  return <ProductForm categories={categories || []} colors={colors || []} />;
}
