import Image from 'next/image';
import Link from 'next/link';

import { PUBLIC_URL } from '@/shared/config/url.config';
import { formatPrice } from '@/shared/lib/format-price';

import { IProduct } from '@/features/product/types/product.interface';

interface ProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white flex flex-col">
      <div className="flex-[1_1_auto]">
        <Link href={PUBLIC_URL.product(product.id)}>
          <Image
            src={product.images[0]}
            alt={product.title}
            width={200}
            height={250}
            fill
            className="rounded-lg aspect-5/4 object-cover"
          />
        </Link>
      </div>
      <div>
        <h3 className="mt-4 font-semibold text-gray-700 line-clamp-1">
          {product.title}
        </h3>
        <Link
          href={PUBLIC_URL.category(product.category.id)}
          className="mt-1 text-sm text-gray-500"
        >
          {product.category.title}
        </Link>
        <p className="mt-1 font-medium text-sm text-gray-900">
          {formatPrice(product.price)}
        </p>
      </div>
    </div>
  );
}
