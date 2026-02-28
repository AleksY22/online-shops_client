import { axiosClassic, axiosWithAuth } from '@/shared/api/api.interceptors';
import { API_URL } from '@/shared/config/api.config';

import {
  removeTokenFromStorage,
  saveTokenToStorage,
} from './auth-token.service';
import { IAuthForm, IAuthResponse } from '@/features/auth/types/auth.interface';

class AuthService {
  //===============================================
  async main(type: 'login' | 'register', data: IAuthForm) {
    const response = await axiosWithAuth<IAuthResponse>({
      url: API_URL.auth(`${type}`),
      method: 'POST',
      data,
    });

    if (response.data.accessToken)
      saveTokenToStorage(response.data.accessToken);

    return response;
  }

  //=================================================
  async getNewTokens() {
    const response = await axiosClassic<IAuthResponse>({
      url: API_URL.auth('login/access-token'),
      method: 'POST',
    });

    if (response.data.accessToken)
      saveTokenToStorage(response.data.accessToken);

    return response;
  }

  //=================================================
  async logout() {
    const response = await axiosClassic<boolean>({
      url: API_URL.auth('logout'),
      method: 'POST',
    });

    if (response.data) removeTokenFromStorage();

    return response;
  }
}

export const authService = new AuthService();
