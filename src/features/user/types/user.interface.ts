import { IOrder } from '../../order/types/order.interface';
import { IProduct } from '../../product/types/product.interface';
import { IStore } from '../../store/types/store.interface';

export interface IUser {
  id: string;
  name: string;
  email: string;
  picture: string;
  favorites: IProduct[];
  orders: IOrder[];
  stores: IStore[];
}
