import { IProduct } from '@/features/product/types/product.interface';

export interface ICartItem {
  id: number;
  product: IProduct;
  quantity: number;
  price: number;
}
