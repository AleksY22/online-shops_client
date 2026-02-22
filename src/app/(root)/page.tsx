import type { Metadata } from 'next';

import { Home } from './home';
import { productService } from '@/features/product/services/product.service';

export const metadata: Metadata = {
  title: 'Все магазины в одном месте',
};

export const revalidate = 60;

async function getProducts() {
  const data = (await productService.getMostPopular()).slice(0, 6);

  return data;
}

export default async function HomePage() {
  const data = await getProducts();
  return <Home products={data} />;
}
