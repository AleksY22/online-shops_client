import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { Store } from './store';

export const metadata: Metadata = {
  title: 'Управление магазином',
  ...NO_INDEX_PAGE,
};

export default function StorePage() {
  return <Store />;
}
