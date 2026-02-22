import { IColor, IColorInput } from '../types/color.interface';

import { axiosWithAuth } from '@/shared/api/api.interceptors';
import { API_URL } from '@/shared/config/api.config';

import { ICategory } from '@/features/category/types/category.interface';

class ColorService {
  //=======================================
  async getByStore(storeId: string) {
    const { data } = await axiosWithAuth<IColor[]>({
      url: API_URL.colors(`by-storeId/${storeId}`),
      method: 'GET',
    });
    return data || [];
  }

  //========================================
  async getById(colorId: string) {
    const { data } = await axiosWithAuth<IColor>({
      url: API_URL.colors(`by-id/${colorId}`),
    });
    return data;
  }

  //==========================================
  async create(storeId: string, data: IColorInput) {
    const { data: createdColor } = await axiosWithAuth<IColor>({
      url: API_URL.colors(`${storeId}`),
      method: 'POST',
      data,
    });
    return createdColor;
  }

  //===========================================
  async update(colorId: string, data: IColorInput) {
    const { data: updatedColor } = await axiosWithAuth<IColor>({
      url: API_URL.colors(`${colorId}`),
      method: 'PUT',
      data,
    });
    return updatedColor;
  }

  //============================================
  async delete(colorId: string) {
    const { data: deletedColor } = await axiosWithAuth<ICategory>({
      url: API_URL.colors(`${colorId}`),
      method: 'DELETE',
    });

    return deletedColor;
  }
}

export const colorService = new ColorService();
