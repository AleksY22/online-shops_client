'use client';

import { Button, Input } from '../../ui';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { PUBLIC_URL } from '@/shared/config/url.config';

export function SearchInput() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const router = useRouter();

  return (
    <div className="flex items-center relative">
      <Input
        placeholder="Поиск товаров"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="rounded-lg rounded-r-none focus-visible:ring-transparent pr-8"
      />
      <Button
        className="rounded-l-none bg-blue-500 hover:bg-blue-500/80"
        onClick={() =>
          router.push(PUBLIC_URL.explorer(`?searchTerm=${searchTerm}`))
        }
      >
        <Search className="size-4" />
      </Button>
    </div>
  );
}
