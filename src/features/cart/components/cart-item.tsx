import { ICartItem } from '../types/cart.interface';
import Image from 'next/image';
import Link from 'next/link';

import { PUBLIC_URL } from '@/shared/config/url.config';
import { formatPrice } from '@/shared/lib/format-price';

import { CartActions } from './cart-actions';

interface CartItemProps {
  item: ICartItem;
}

export function CartItem({ item }: CartItemProps) {
  return (
    <div className="flex items-center mb-5">
      <Link
        href={PUBLIC_URL.product(item.product.id)}
        className="relative h-28 w-28 rounded-md overflow-hidden"
      >
        <Image
          src={item.product.images[0]}
          alt={item.product.title}
          fill
          className="object-cover"
        />
      </Link>
      <div className="ml-6">
        <h2 className="font-medium line-clamp-1">{item.product.title}</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {formatPrice(item.product.price)}
        </p>
        <CartActions item={item} />
      </div>
    </div>
  );
}
