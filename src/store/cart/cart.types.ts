import type { ICartItem } from '@/features/cart/types/cart.interface';

export interface ICartInitialState {
  items: ICartItem[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IAddToCartPayload extends Omit<ICartItem, 'id'> {}

export interface IChangeQuantityPayload extends Pick<ICartItem, 'id'> {
  type: 'minus' | 'plus';
}
