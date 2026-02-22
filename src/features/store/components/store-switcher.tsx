'use client';

import { IStore } from '../types/store.interface';
import { ChevronsUpDown, Plus, StoreIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/shared/components/ui';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/shared/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';
import { STORE_URL } from '@/shared/config/url.config';

import { CreateStoreModal } from './create-store-modal';

interface StoreSwitcherProps {
  items: IStore[];
}

export function StoreSwitcher({ items }: StoreSwitcherProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const onStoreSelect = (storeId: string) => {
    setIsOpen(false);
    router.push(STORE_URL.home(storeId));
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          className="w-52"
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={isOpen}
          aria-label="Выберете магазин"
        >
          <StoreIcon className="mr-2 size-4" />
          Текущий магазин
          <ChevronsUpDown className="ml-auto size-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Найти магазин..." />
            <CommandEmpty>Ничего не найдено</CommandEmpty>
            <CommandGroup heading="Магазины">
              {items.map((store) => (
                <CommandItem
                  className="text-sm"
                  key={store.id}
                  onSelect={() => onStoreSelect(store.id)}
                >
                  <StoreIcon className="mr-2 size-4" />
                  <div className="line-clamp-1">{store.title}</div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CreateStoreModal>
                <CommandItem>
                  <Plus className="mr-2 size-4" />
                  Создать магазин
                </CommandItem>
              </CreateStoreModal>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
