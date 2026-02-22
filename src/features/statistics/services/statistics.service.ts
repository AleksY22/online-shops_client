import {
  IMainStatistics,
  IMiddleStatistics,
} from '../types/statistics.interface';

import { axiosWithAuth } from '@/shared/api/api.interceptors';
import { API_URL } from '@/shared/config/api.config';

class StatisticsService {
  async getMain(storeId: string) {
    const { data } = await axiosWithAuth<IMainStatistics[]>({
      url: API_URL.statistics(`main/${storeId}`),
      method: 'GET',
    });

    return data;
  }

  async getMiddle(storeId: string) {
    const { data } = await axiosWithAuth<IMiddleStatistics>({
      url: API_URL.statistics(`middle/${storeId}`),
      method: 'GET',
    });

    return data;
  }
}

export const statisticsService = new StatisticsService();
