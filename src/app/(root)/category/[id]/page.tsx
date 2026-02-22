import { Metadata } from 'next';

import { Catalog } from '@/shared/components/catalog/catalog';

import { categoryService } from '@/features/category/sevices/category.service';
import { productService } from '@/features/product/services/product.service';

export const revalidate = 60;

async function getProducts(id: string) {
  const products = await productService.getByCategory(id);
  const category = await categoryService.getById(id);

  return { products, category };
}

//функция генерации метадынных
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { products, category } = await getProducts(id);
  return {
    title: category.title,
    description: category.description,
    openGraph: {
      images: [
        {
          url: products[0].images[0],
          width: 1000,
          height: 1000,
          alt: category.title,
        },
      ],
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { products, category } = await getProducts(id);

  return (
    <div className="my-6">
      <Catalog
        title={category.title}
        description={category.description}
        products={products}
      />
    </div>
  );
}
