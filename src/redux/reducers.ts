/* import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';
import { api } from '../services/apiClient';
import { CustomError } from '../services/errorHandler';

export interface IMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface IMovieDetails extends IMovie {
  Genre: string;
  Rated: string;
  Plot: string;
  Country: string;
  Website: string;
}

export interface IMovieState {
  movies: IMovie[];
  movie: IMovieDetails | null;
  favorites: { [key: string]: IMovie };
  isLoading: boolean;
  error: CustomError | null;
}

const initialState: IMovieState = {
  movies: [],
  movie: null,
  favorites: {},
  isLoading: false,
  error: null,
};

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (params: { search: string; page: number }, thunkAPI) => {
    const { search, page } = params;
    try {
      const response = await api.getMovies(search, page);
      return response?.Search;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (imdbID: string, thunkAPI) => {
    try {
      const response = await api.getMovieDetails(imdbID);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies(state, action: PayloadAction<IMovie[]>): void {
      state.movies = action.payload;
    },
    setMovieDetails(state, action: PayloadAction<IMovieDetails>): void {
      state.movie = action.payload;
    },
    addFavorite(state, action: PayloadAction<IMovie>): void {
      const movie = action.payload;
      state.favorites[movie.imdbID] = movie;
    },
    removeFavorite(state, action: PayloadAction<string>) {
      const imdbID = action.payload;
      delete state.favorites[imdbID];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchMovies.fulfilled,
        (state, action: PayloadAction<IMovie[]>) => {
          state.isLoading = false;
          state.movies = action.payload || [];
        }
      )
      .addCase(fetchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error as CustomError;
      })
      .addCase(fetchMovieDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchMovieDetails.fulfilled,
        (state, action: PayloadAction<IMovieDetails | null>) => {
          state.isLoading = false;
          state.movie = action.payload;
        }
      )
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error as CustomError;
      });
  },
});

export const { setMovies, setMovieDetails, addFavorite, removeFavorite } =
  movieSlice.actions;

export default movieSlice.reducer;
 */
