import { IProduct } from '../types/product.interface';

import { Button } from '@/shared/components/ui';
import { useActions } from '@/shared/hooks/useActions';

import { useCart } from '@/features/cart/hooks/useCart';

interface AddToCartButtonProps {
  product: IProduct;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart, removeFromCart } = useActions();

  const { items } = useCart();

  const currentElement = items.find(
    (cartItem) => cartItem.product.id === product.id,
  );
  return (
    <Button
      onClick={() =>
        currentElement
          ? removeFromCart({ id: currentElement.id })
          : addToCart({ product, quantity: 1, price: product.price })
      }
      size="lg"
      className="w-full bg-blue-500 hover:bg-blue-500/80"
    >
      {currentElement ? 'Удалить из корзины' : 'Добавить в корзину'}
    </Button>
  );
}
