'use client';

import { useQuery } from '@tanstack/react-query';

import { Catalog } from '@/shared/components/catalog/catalog';

import {
  ProductGallery,
  ProductInfo,
  ProductReviews,
} from '@/features/product/components';
import { productService } from '@/features/product/services/product.service';
import { IProduct } from '@/features/product/types/product.interface';

interface ProductProps {
  initialProduct: IProduct;
  similarProducts: IProduct[];
  id?: string;
}

export function Product({
  initialProduct,
  similarProducts,
  id = '',
}: ProductProps) {
  const { data: product } = useQuery({
    queryKey: ['product', initialProduct.id],
    queryFn: () => productService.getById(id),
    initialData: initialProduct,
    enabled: !!id,
  });

  return (
    <div className="mx-auto max-w-7xl">
      <div className="space-y-7 px-4 py-10 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>
      </div>
      <ProductReviews product={product} />
      <Catalog title="Похожие товары" products={similarProducts} />
    </div>
  );
}
