'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { DataTable } from '@/shared/components/data-table/data-table';
import DataTableLoading from '@/shared/components/data-table/data-table-loading';
import { Heading } from '@/shared/components/heading';
import { Button } from '@/shared/components/ui';
import { STORE_URL } from '@/shared/config/url.config';
import { formatDate } from '@/shared/lib/format-date';

import { categoryColumns } from '@/features/category/components/category-columns';
import { useGetCategories } from '@/features/category/hooks/useGetCategories';
import { ICategory } from '@/features/category/types/category.interface';

export function Categories() {
  const params = useParams<{ storeId: string }>();

  const { categories, isLoading } = useGetCategories();

  const formattedCategories: ICategory[] = categories
    ? categories.map((category) => ({
        id: category.id,
        createdAt: formatDate(category.createdAt),
        title: category.title,
        description: category.description,
        storeId: category.storeId,
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
              title={`Категории (${categories?.length})`}
              description="Все категории магазина"
            />
            <div className="buttons">
              <Link href={STORE_URL.categoryCreate(params.storeId)}>
                <Button
                  variant="default"
                  className="bg-blue-500 hover:bg-blue-500/80"
                >
                  <Plus />
                  Создать
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-3">
            <DataTable
              columns={categoryColumns}
              data={formattedCategories}
              filterKey="title"
            />
          </div>
        </>
      )}
    </div>
  );
}
