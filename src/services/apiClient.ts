import { ApiResponse } from './types/api.interface';
import { API_KEY, BASE_URL } from './constants';
import { errorHandler, CustomError } from './errorHandler';

class ApiClient {
  private readonly apikey: string;
  private readonly baseUrl: string;

  constructor(apikey: string, baseUrl: string) {
    this.apikey = apikey;
    this.baseUrl = baseUrl;
  }

  async getMovies(search: string): Promise<ApiResponse | undefined> {
    const url: string = `${this.baseUrl}?s=${search}&apikey=${this.apikey}`;

    try {
      const response: Response = await fetch(url);

      if (!response.ok) {
        throw new CustomError('Request failed. No data found');
      }

      return response.json();
    } catch (error: unknown) {
      throw errorHandler(error);
    }
  }
}

export const api = new ApiClient(API_KEY, BASE_URL);
