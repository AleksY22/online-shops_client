'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { DataTable } from '@/shared/components/data-table/data-table';
import DataTableLoading from '@/shared/components/data-table/data-table-loading';
import { Heading } from '@/shared/components/heading';
import { Button } from '@/shared/components/ui';
import { STORE_URL } from '@/shared/config/url.config';
import { formatPrice } from '@/shared/lib/format-price';

import {
  IProductColumn,
  productsColumns,
} from '@/features/product/components/product-columns';
import { useGetProducts } from '@/features/product/hooks/useGetProducts';

export function Products() {
  const params = useParams<{ storeId: string }>();

  const { products, isLoading } = useGetProducts();

  const formattedProducts: IProductColumn[] = products
    ? products.map((product) => ({
        id: product.id,
        title: product.title,
        price: formatPrice(product.price),
        category: product.category.title,
        color: product.color.value,
        storeId: product.storeId,
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
              title={`Товары (${products?.length})`}
              description="Все товары магазина"
            />
            <div className="buttons">
              <Link href={STORE_URL.productCreate(params.storeId)}>
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
              columns={productsColumns}
              data={formattedProducts}
              filterKey="title"
            />
          </div>
        </>
      )}
    </div>
  );
}
