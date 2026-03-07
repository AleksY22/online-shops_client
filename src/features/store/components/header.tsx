'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Loader } from '@/shared/components/ui/loader';
import { DASHBOARD_URL } from '@/shared/config/url.config';
import { useProfile } from '@/shared/hooks/useProfile';

import { MobileSidebar } from './mobile-sidebar';
import { StoreSwitcher } from './store-switcher';

export function Header() {
  const { user, isLoading } = useProfile();

  return (
    <div className="p-6 gap-x-4 h-full flex items-center bg-white border-b">
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        {isLoading ? (
          <Loader size="sm" />
        ) : (
          user && (
            <>
              <StoreSwitcher items={user.stores} />
              <Link href={DASHBOARD_URL.home()}>
                <Image
                  className="rounded-full"
                  src={user.picture}
                  alt={user.name}
                  width={42}
                  height={42}
                  loading="eager"
                />
              </Link>
            </>
          )
        )}
      </div>
    </div>
  );
}
