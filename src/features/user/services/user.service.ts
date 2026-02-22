import { IUser } from '../types/user.interface';

import { axiosWithAuth } from '@/shared/api/api.interceptors';
import { API_URL } from '@/shared/config/api.config';

class UserService {
  //===========================================
  async getProfile() {
    const response = await axiosWithAuth<IUser>({
      url: API_URL.users('profile'),
      method: 'GET',
    });
    return response.data;
  }

  //===========================================
  async toggleFavorite(productId: string) {
    return await axiosWithAuth<IUser>({
      url: API_URL.users(`profile/favorites/${productId}`),
      method: 'PATCH',
    });
  }
}

export const userService = new UserService();
