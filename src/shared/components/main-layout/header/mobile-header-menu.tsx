import { Button } from '../../ui';
import { SheetClose } from '../../ui/sheet';
import Link from 'next/link';

import {
  DASHBOARD_URL,
  PUBLIC_URL,
  STORE_URL,
} from '@/shared/config/url.config';
import { useProfile } from '@/shared/hooks/useProfile';

import { HeaderCart } from './header-cart';
import { LogoMobile } from './logo-mobile';
import { CreateStoreModal } from '@/features/store/components/create-store-modal';

export function MobileHeaderMenu() {
  const { user } = useProfile();

  return (
    <div className="flex flex-col items-center">
      <div className="p-2">
        <LogoMobile />
      </div>

      <HeaderCart />

      <SheetClose asChild>
        <Link href={PUBLIC_URL.explorer()}>
          <Button variant="ghost">Каталог</Button>
        </Link>
      </SheetClose>

      {user ? (
        <>
          <SheetClose asChild>
            <Link href={DASHBOARD_URL.favorites()}>
              <Button variant="ghost">Избранное</Button>
            </Link>
          </SheetClose>

          {user?.stores?.length ? (
            <SheetClose asChild>
              <Link href={STORE_URL.home(user.stores[0].id)}>
                <Button variant="ghost">Мои магазины</Button>
              </Link>
            </SheetClose>
          ) : (
            <CreateStoreModal>
              <Button variant="ghost">Создать магазин</Button>
            </CreateStoreModal>
          )}
        </>
      ) : null}
    </div>
  );
}
