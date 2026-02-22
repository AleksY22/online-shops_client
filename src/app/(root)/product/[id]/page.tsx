import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Product } from './product';
import { productService } from '@/features/product/services/product.service';

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await productService.getAll();
  const paths = products.map((product) => {
    return {
      params: { id: product.id },
    };
  });
  return paths;
}

async function getProducts(id: string) {
  try {
    const product = await productService.getById(id);
    const similarProducts = await productService.getSimilar(id);
    return { product, similarProducts };
  } catch {
    return notFound();
  }
}

//функция генерации метадынных
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { product } = await getProducts(id);
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      images: [
        {
          url: product.images[0],
          width: 1000,
          height: 1000,
          alt: product.title,
        },
      ],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { product, similarProducts } = await getProducts(id);

  return (
    <Product
      initialProduct={product}
      similarProducts={similarProducts}
      id={id}
    />
  );
}
