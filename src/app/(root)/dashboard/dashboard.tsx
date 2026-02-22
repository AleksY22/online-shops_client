'use client';

import { useMutation } from '@tanstack/react-query';
import { LogOut } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { DataTable } from '@/shared/components/data-table/data-table';
import { Button } from '@/shared/components/ui';
import { useProfile } from '@/shared/hooks/useProfile';
import { formatDate } from '@/shared/lib/format-date';
import { formatPrice } from '@/shared/lib/format-price';

import { saveTokenToStorage } from '@/features/auth/services/auth-token.service';
import { authService } from '@/features/auth/services/auth.service';
import {
  IOrderColumn,
  orderColumns,
} from '@/features/order/components/order-columns';
import { OrderStatus } from '@/features/order/types/order.interface';

export function Dashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');

    if (accessToken) {
      saveTokenToStorage(accessToken);
    }
  }, [searchParams]);

  const { user } = useProfile();

  const { mutate: logout } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess: () => router.push('/auth'),
  });

  if (!user) return null;

  const formattedOrders: IOrderColumn[] = user.orders.map((order) => ({
    createdAt: formatDate(order.createdAt),
    status: order.status === OrderStatus.PENDING ? 'В ожидании' : 'Оплачен',
    total: formatPrice(order.total),
  }));

  return (
    <div className="my-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Ваши заказы</h1>
        <Button variant="ghost" onClick={() => logout()}>
          <LogOut className="size-4 mr-2" />
          Выйти
        </Button>
      </div>
      <DataTable columns={orderColumns} data={formattedOrders} />
    </div>
  );
}
