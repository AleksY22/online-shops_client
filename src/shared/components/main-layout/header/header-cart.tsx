import { Heading } from '../../heading';
import { Button } from '../../ui';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../../ui/sheet';
import { useRouter } from 'next/navigation';

import { PUBLIC_URL } from '@/shared/config/url.config';
import { useProfile } from '@/shared/hooks/useProfile';
import { formatPrice } from '@/shared/lib/format-price';

import { CartItem } from '@/features/cart/components/cart-item';
import { useCart } from '@/features/cart/hooks/useCart';
import { useCheckout } from '@/features/cart/hooks/useCheckout';

export function HeaderCart() {
  const router = useRouter();

  const { createPayment, isLoadingCreate } = useCheckout();

  const { user } = useProfile();

  const { items, total } = useCart();

  const handleClick = () => {
    if (user) {
      createPayment();
    } else {
      router.push(PUBLIC_URL.auth());
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">Корзина</Button>
      </SheetTrigger>
      <SheetContent
        aria-describedby={undefined}
        className="h-full flex flex-col p-3"
      >
        <SheetTitle aria-describedby={undefined} />
        <Heading title="Корзина товаров" className="text-xl mb-1" />
        <div className="flex flex-col w-full flex-1">
          {items.length ? (
            items.map((item) => <CartItem item={item} key={item.id} />)
          ) : (
            <div className="text-sm text-muted-foreground">Корзина пустая!</div>
          )}
        </div>
        {items.length ? (
          <>
            <div className="text-lg font-medium">
              Итого к оплате: {formatPrice(total)}
            </div>
            <Button
              onClick={handleClick}
              disabled={isLoadingCreate}
              className="bg-blue-500 hover:bg-blue-500/80 w-full"
            >
              Перейти к оплате
            </Button>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
