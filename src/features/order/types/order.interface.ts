import { ICartItem } from '../../cart/types/cart.interface';
import { IUser } from '../../user/types/user.interface';

interface IAmount {
  value: string;
  currency: string;
}

interface IRecipient {
  account_id: string;
  gateway_id: string;
}

interface IPaymentMethod {
  type: string;
  id: string;
  saved: boolean;
}

interface IConfirmation {
  type: string;
  return_url: string;
  confirmation_url: string;
}

export interface IPaymentResponse {
  id: string;
  status: string;
  amount: IAmount;
  recipient: IRecipient;
  payment_method: IPaymentMethod;
  ceated_at: Date;
  confirmation: IConfirmation;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  SUCCEEDING = 'SUCCEEDING',
}

export interface IOrder {
  id: string;
  createAt: string;
  items: ICartItem[];
  status: OrderStatus;
  user: IUser;
  total: number;
}
