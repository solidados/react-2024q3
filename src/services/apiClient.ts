import { ApiResponse } from './types/api.interface';
import { API_KEY, BASE_URL } from './constants';
import { CustomError, errorHandler } from './errorHandler';

const createApiClient = (apikey: string, baseUrl: string) => {
  const getMovies = async (
    search: string,
    page: number = 1
  ): Promise<ApiResponse | undefined> => {
    const url: string = `${baseUrl}?s=${search}&apikey=${apikey}&page=${page}`;

    try {
      const response: Response = await fetch(url);

      if (!response.ok) {
        throw new CustomError('Request failed. No data found', 400);
      }

      return response.json();
    } catch (error: unknown) {
      throw errorHandler(error, (error as CustomError).code);
    }
  };

  return {
    getMovies,
  };
};

export const api = createApiClient(API_KEY, BASE_URL);
