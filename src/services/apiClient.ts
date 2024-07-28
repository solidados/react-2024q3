import { ApiResponse, MovieDetails } from './types/api.interface';
import { API_KEY, BASE_URL } from './constants';
import { CustomError, errorHandler } from './errorHandler';

const createApiClient = (apikey: string, baseUrl: string) => {
  const getMovies = async (
    search: string,
    page: number
  ): Promise<ApiResponse | undefined> => {
    const url: string = `${baseUrl}?s=${search}&apikey=${apikey}&page=${page}`;

    try {
      const response: Response = await fetch(url);

      if (!response.ok) {
        throw new CustomError('Request failed. No data found', 400);
      }

      return response.json();
    } catch (error: unknown) {
      throw errorHandler(error);
    }
  };

  const getMovieDetails = async (
    imdbID: string
  ): Promise<MovieDetails | undefined> => {
    const url: string = `${baseUrl}?i=${imdbID}&apikey=${apikey}`;

    try {
      const response: Response = await fetch(url);

      if (!response.ok) {
        throw new CustomError('Request failed. No data found', 400);
      }

      return response.json();
    } catch (error: unknown) {
      throw errorHandler(error);
    }
  };

  return {
    getMovies,
    getMovieDetails,
  };
};

export const api = createApiClient(API_KEY, BASE_URL);
