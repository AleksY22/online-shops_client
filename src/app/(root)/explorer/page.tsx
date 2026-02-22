import type { Metadata } from 'next';

import { Explorer } from './explorer';
import { productService } from '@/features/product/services/product.service';

export const metadata: Metadata = {
  title: 'Каталог товаров',
};

export const revalidate = 60;

async function getProducts() {
  const data = await productService.getAll();

  return data;
}

export default async function ExplorerPage() {
  const data = await getProducts();

  return <Explorer products={data} />;
}
