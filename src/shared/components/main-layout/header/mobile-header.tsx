'use client';

import { Button } from '../../ui';
import { Loader } from '../../ui/loader';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { DASHBOARD_URL, PUBLIC_URL } from '@/shared/config/url.config';
import { useProfile } from '@/shared/hooks/useProfile';

import { MobileHeaderSidebar } from './mobile-header-sidebar';
import { SearchInput } from './search-input';

export function MobileHeader() {
  const { user, isLoading } = useProfile();

  return (
    <div className="flex justify-between items-center p-5 gap-x-3 h-full bg-white border-b md:gap-x-2 lg:hidden">
      <MobileHeaderSidebar />

      <div className=" w-[50%]">
        <SearchInput />
      </div>
      {isLoading ? (
        <Loader size="sm" />
      ) : user ? (
        <>
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
