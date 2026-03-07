import { Menu } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';

import { MobileHeaderMenu } from './mobile-header-menu';

export function MobileHeaderSidebar() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden pr-4 hover:opacity-75">
        <Menu />
      </SheetTrigger>
      <SheetContent side="right" className="p-0 bg-white">
        <SheetHeader aria-describedby={undefined}>
          <SheetTitle aria-describedby={undefined} />
          <SheetDescription aria-describedby={undefined} />
        </SheetHeader>
        <MobileHeaderMenu />
      </SheetContent>
    </Sheet>
  );
}
