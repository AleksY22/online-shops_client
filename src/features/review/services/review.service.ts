import { axiosWithAuth } from '../../../shared/api/api.interceptors';
import { API_URL } from '../../../shared/config/api.config';
import { IReview, IReviewInput } from '../types/review.interface';

class ReviewService {
  //==========================================
  async getByStore(storeId: string) {
    const { data } = await axiosWithAuth<IReview[]>({
      url: API_URL.reviews(`by-storeId/${storeId}`),
      method: 'GET',
    });
    return data;
  }

  //==========================================
  async create(productId: string, storeId: string, data: IReviewInput) {
    const { data: createdReview } = await axiosWithAuth<IReview>({
      url: API_URL.reviews(`${productId}/${storeId}`),
      method: 'POST',
      data,
    });
    return createdReview;
  }

  //============================================
  async delete(reviewId: string) {
    const { data: deletedReview } = await axiosWithAuth<IReview>({
      url: API_URL.reviews(`${reviewId}`),
      method: 'DELETE',
    });
    return deletedReview;
  }
}

export const reviewService = new ReviewService();
