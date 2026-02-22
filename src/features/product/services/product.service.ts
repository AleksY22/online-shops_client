import {
  axiosClassic,
  axiosWithAuth,
} from '../../../shared/api/api.interceptors';
import { API_URL } from '../../../shared/config/api.config';
import { IProduct, IProductInput } from '../types/product.interface';

class ProductService {
  //============================================
  async getAll(searchTerm?: string | null) {
    const { data } = await axiosClassic<IProduct[]>({
      url: API_URL.products(),
      method: 'GET',
      params: searchTerm
        ? {
            searchTerm,
          }
        : {},
    });

    return data || null;
  }

  //=============================================
  async getByStore(storeId: string) {
    const { data } = await axiosWithAuth<IProduct[]>({
      url: API_URL.products(`by-storeId/${storeId}`),
      method: 'GET',
    });
    return data || [];
  }

  //==============================================
  async getById(productId: string) {
    const { data } = await axiosClassic<IProduct>({
      url: API_URL.products(`by-id/${productId}`),
      method: 'GET',
    });
    return data;
  }

  //==============================================
  async getByCategory(categoryId: string) {
    const { data } = await axiosClassic<IProduct[]>({
      url: API_URL.products(`by-category/${categoryId}`),
      method: 'GET',
    });
    return data;
  }

  //===============================================
  async getMostPopular() {
    const { data } = await axiosClassic<IProduct[]>({
      url: API_URL.products('most-popular'),
      method: 'GET',
    });
    return data;
  }

  //===============================================
  async getSimilar(similarId: string) {
    const { data } = await axiosClassic<IProduct[]>({
      url: API_URL.products(`similar/${similarId}`),
      method: 'GET',
    });
    return data;
  }

  //===============================================
  async create(storeId: string, data: IProductInput) {
    const { data: createdProduct } = await axiosWithAuth<IProduct>({
      url: API_URL.products(`${storeId}`),
      method: 'POST',
      data,
    });
    return createdProduct;
  }

  //===============================================
  async update(productId: string, data: IProductInput) {
    const { data: updatedProduct } = await axiosWithAuth<IProduct>({
      url: API_URL.products(`${productId}`),
      method: 'PUT',
      data,
    });
    return updatedProduct;
  }

  //==================================================
  async delete(productId: string) {
    const { data: deletedProduct } = await axiosWithAuth<IProduct>({
      url: API_URL.products(`${productId}`),
      method: 'DELETE',
    });
    return deletedProduct;
  }
}

export const productService = new ProductService();
