import { useCart } from '../hooks/useCart';
import { ICartItem } from '../types/cart.interface';
import { Minus, Plus } from 'lucide-react';

import { Button } from '@/shared/components/ui';
import { useActions } from '@/shared/hooks/useActions';

interface CartItemProps {
  item: ICartItem;
}

export function CartActions({ item }: CartItemProps) {
  const { changeQuantity } = useActions();
  const { items } = useCart();

  const quantity = items.find((cartItem) => cartItem.id === item.id)?.quantity;

  return (
    <div className="flex items-center mt-1">
      <Button
        onClick={() => changeQuantity({ id: item.id, type: 'minus' })}
        variant="ghost"
        size="icon"
        disabled={quantity === 1}
        className="size-7"
      >
        <Minus className="size-4" />
      </Button>
      <input
        disabled
        readOnly
        value={quantity}
        className="w-10 text-center text-sm"
      />
      <Button
        onClick={() => changeQuantity({ id: item.id, type: 'plus' })}
        variant="ghost"
        size="icon"
        className="size-7"
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}
