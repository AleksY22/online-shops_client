import { IProduct } from '../types/product.interface';
import Link from 'next/link';

import { PUBLIC_URL } from '@/shared/config/url.config';
import { formatPrice } from '@/shared/lib/format-price';
import { getReviewWordWithEnding } from '@/shared/lib/get-review-word-with-ending';

import { AddToCartButton } from './add-to-cartButton';
import { FavoriteButton } from './favorite-button';

interface ProductInfoProps {
  product: IProduct;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const rating =
    Math.round(
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        product.reviews.length,
    ) || 0;

  return (
    <div className="mt-10 space-y-5 sm:mt-16 lg:mt-0">
      <h1 className="text-3xl font-bold">{product.title}</h1>
      <div className="text-2xl font-semibold">{formatPrice(product.price)}</div>
      <hr className="my-4" />
      <p className="text-muted-foreground text-sm">{product.description}</p>
      <hr className="my-4" />
      <div className="flex items-center gap-x-4">
        <h3 className="font-semibold">Цвет: </h3>
        <div
          className="size-6 rounded-full border border-gray-600"
          style={{ backgroundColor: product.color.value }}
        ></div>
      </div>
      <div className="flex items-center gap-x-4">
        <h3 className="font-semibold">Категория: </h3>
        <Link
          className="text-sm"
          href={PUBLIC_URL.category(product.category.id)}
        >
          {product.category.title}
        </Link>
      </div>
      <div className="flex items-center gap-x-4">
        <h3 className="font-semibold">Средний рейтинг: </h3>
        <div className="text-sm">
          ⭐ {rating.toFixed(1)} |{' '}
          {getReviewWordWithEnding(product.reviews.length)}
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex items-center gap-x-2">
        <AddToCartButton product={product} />
        <FavoriteButton product={product} />
      </div>
    </div>
  );
}
