import { Metadata } from 'next';

import { Auth } from './auth';

export const metadata: Metadata = {
  title: 'Авторизация',
};

export default function AuthPage() {
  return <Auth />;
}
