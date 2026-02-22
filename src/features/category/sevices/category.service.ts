import { ICategory, ICategoryInput } from '../types/category.interface';

import { axiosClassic, axiosWithAuth } from '@/shared/api/api.interceptors';
import { API_URL } from '@/shared/config/api.config';

class CategoryService {
  //===============================================
  async getByStore(storeId: string) {
    const { data } = await axiosWithAuth<ICategory[]>({
      url: API_URL.categories(`by-storeId/${storeId}`),
      method: 'GET',
    });
    return data;
  }

  //================================================
  async getById(categoryId: string) {
    const { data } = await axiosClassic<ICategory>({
      url: API_URL.categories(`by-id/${categoryId}`),
      method: 'GET',
    });
    return data;
  }

  //================================================
  async create(storeId: string, data: ICategoryInput) {
    const { data: createdCategory } = await axiosWithAuth<ICategory>({
      url: API_URL.categories(`${storeId}`),
      method: 'POST',
      data,
    });
    return createdCategory;
  }

  //================================================
  async update(categoryId: string, data: ICategoryInput) {
    const { data: updatedCategory } = await axiosWithAuth<ICategory>({
      url: API_URL.categories(`${categoryId}`),
      method: 'PUT',
      data,
    });
    return updatedCategory;
  }

  //=================================================
  async delete(categoryId: string) {
    const { data: deletedCategory } = await axiosWithAuth<ICategory>({
      url: API_URL.categories(`${categoryId}`),
      method: 'DELETE',
    });
    return deletedCategory;
  }
}

export const categoryService = new CategoryService();
