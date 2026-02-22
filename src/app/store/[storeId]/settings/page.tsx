import { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

import { Settings } from './settings';

export const metadata: Metadata = {
  title: 'Настройки магазина',
  ...NO_INDEX_PAGE,
};

export default function SettingsPage() {
  return <Settings />;
}
