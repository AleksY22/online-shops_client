'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { CategoryForm } from '@/features/category/components/category-form';
import { categoryService } from '@/features/category/sevices/category.service';

export function CategoryEdit() {
  const params = useParams<{ categoryId: string }>();

  const { data } = useQuery({
    queryKey: ['get category'],
    queryFn: () => categoryService.getById(params.categoryId),
  });

  return <CategoryForm category={data} />;
}
