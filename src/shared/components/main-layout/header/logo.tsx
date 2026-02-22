import Image from 'next/image';
import Link from 'next/link';

import { PUBLIC_URL } from '@/shared/config/url.config';
import { SITE_NAME } from '@/shared/constants/seo.constants';

export function Logo() {
  return (
    <Link
      href={PUBLIC_URL.home()}
      className="flex items-center gap-x-3 hover:opacity-75 transition-opacity"
    >
      <Image src="/images/logo.svg" alt={SITE_NAME} width={30} height={30} />
      <div className="text-2xl font-bold text-blue-600">{SITE_NAME}</div>
    </Link>
  );
}
