import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
}

const initialState: IMovieState = {
  movies: [],
  movie: null,
  favorites: {},
};

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
});

export const { setMovies, setMovieDetails, addFavorite, removeFavorite } =
  movieSlice.actions;

export default movieSlice.reducer;
