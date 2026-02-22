import { IReview } from '../../review/types/review.interface';

import { ICategory } from '@/features/category/types/category.interface';
import { IColor } from '@/features/color/types/color.interface';

export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: ICategory;
  reviews: IReview[];
  color: IColor;
  storeId: string;
}

export interface IProductInput extends Omit<
  IProduct,
  'id' | 'reviews' | 'storeId' | 'category' | 'color'
> {
  categoryId: string;
  colorId: string;
}
