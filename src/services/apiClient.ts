import { ApiResponse } from './types/api.interface';
import { API_KEY, BASE_URL } from './constants';
import { CustomError, errorHandler } from './errorHandler';

const createApiClient = (apikey: string, baseUrl: string) => {
  const getMovies = async (
    search: string
  ): Promise<ApiResponse | undefined> => {
    const url: string = `${baseUrl}?s=${search}&apikey=${apikey}`;

    try {
      const response: Response = await fetch(url);

      if (!response.ok) {
        throw new CustomError('Request failed. No data found');
      }

      return response.json();
    } catch (error: unknown) {
      throw errorHandler(error);
    }
  };

  return {
    getMovies,
  };
};

export const api = createApiClient(API_KEY, BASE_URL);
