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

import { colorColumns } from '@/features/color/components/color-columns';
import { useGetColors } from '@/features/color/hooks/useGetColors';
import { IColor } from '@/features/color/types/color.interface';

export function Colors() {
  const params = useParams<{ storeId: string }>();

  const { colors, isLoading } = useGetColors();

  const formattedColors: IColor[] = colors
    ? colors.map((color) => ({
        id: color.id,
        createdAt: formatDate(color.createdAt),
        name: color.name,
        value: color.value,
        storeId: color.storeId,
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
              title={`Цвета (${colors?.length})`}
              description="Все цвета магазина"
            />
            <div className="buttons">
              <Link href={STORE_URL.colorCreate(params.storeId)}>
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
              columns={colorColumns}
              data={formattedColors}
              filterKey="name"
            />
          </div>
        </>
      )}
    </div>
  );
}
