import { IPaymentResponse, OrderStatus } from '../types/order.interface';

import { axiosWithAuth } from '@/shared/api/api.interceptors';
import { API_URL } from '@/shared/config/api.config';

type TypeData = {
  status?: OrderStatus;
  items: {
    quantity: number;
    price: number;
    productId: string;
    storeId: string;
  }[];
};

class OrderService {
  //=============================================
  async checkout(data: TypeData) {
    return axiosWithAuth<IPaymentResponse>({
      url: API_URL.orders('place'),
      method: 'POST',
      data,
    });
  }
}

export const orderService = new OrderService();
