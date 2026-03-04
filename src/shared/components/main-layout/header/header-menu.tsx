'use client';

import { Button } from '../../ui';
import { Loader } from '../../ui/loader';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import {
  DASHBOARD_URL,
  PUBLIC_URL,
  STORE_URL,
} from '@/shared/config/url.config';
import { useProfile } from '@/shared/hooks/useProfile';

import { HeaderCart } from './header-cart';
import { CreateStoreModal } from '@/features/store/components/create-store-modal';

export function HeaderMenu() {
  const { user, isLoading } = useProfile();

  return (
    <div className="hidden items-center gap-x-4 ml-auto lg:flex md:flex">
      <HeaderCart />
      <Link href={PUBLIC_URL.explorer()}>
        <Button variant="ghost">Каталог</Button>
      </Link>
      {isLoading ? (
        <Loader size="sm" />
      ) : user ? (
        <>
          <Link href={DASHBOARD_URL.favorites()}>
            <Button variant="ghost">Избранное</Button>
          </Link>
          {user.stores.length ? (
            <Link href={STORE_URL.home(user.stores[0].id)}>
              <Button variant="ghost">Мои магазины</Button>
            </Link>
          ) : (
            <CreateStoreModal>
              <Button variant="ghost">Создать магазин</Button>
            </CreateStoreModal>
          )}
          <Link href={DASHBOARD_URL.home()}>
            <Image
              src={user.picture}
              alt={user.name}
              width={42}
              height={42}
              className="rounded-full"
            />
          </Link>
        </>
      ) : (
        <Link href={PUBLIC_URL.auth()}>
          <Button className=" bg-blue-500 hover:bg-blue-500/80">
            <LogOut className="size-4 mr-2" />
            Войти
          </Button>
        </Link>
      )}
    </div>
  );
}
