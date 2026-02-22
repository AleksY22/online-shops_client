import type { PropsWithChildren } from 'react';

import { StoreLayout } from '@/features/store/components/store-layout';

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return <StoreLayout>{children}</StoreLayout>;
}
