'use client';

import { Button } from '../../../shared/components/ui';
import { useRouter } from 'next/navigation';
import { FaYandex } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { SERVER_URL } from '@/shared/config/api.config';

export function Social() {
  const router = useRouter();

  return (
    <div className="space-y-3 w-full mt-5">
      <Button
        className="w-full"
        variant="outline"
        onClick={() => router.push(`${SERVER_URL}/auth/google`)}
      >
        <FcGoogle className="size-5 mr-2" />
        Продолжить через Google
      </Button>
      <Button
        className="w-full"
        variant="outline"
        onClick={() => router.push(`${SERVER_URL}/auth/yandex`)}
      >
        <FaYandex color="#fc3f1d" className="size-5 mr-2" />
        Продолжить через Яндекс
      </Button>
    </div>
  );
}
