import { Catalog } from '@/shared/components/catalog/catalog';
import { PUBLIC_URL } from '@/shared/config/url.config';

import { Hero } from './hero/hero';
import { IProduct } from '@/features/product/types/product.interface';

interface HomeProps {
  products: IProduct[];
}

export function Home({ products }: HomeProps) {
  return (
    <>
      <Hero />
      <Catalog
        title="Хиты продаж"
        description="Самые популярные товары"
        linkTitle="Узнать больше"
        link={PUBLIC_URL.explorer()}
        products={products}
      />
    </>
  );
}
