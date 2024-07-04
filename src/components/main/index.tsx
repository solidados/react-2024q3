import { Component } from 'react';
import { ApiResponse, Movie } from '../../services/types/api.interface';
import { api } from '../../services/apiClient';
import { CustomError } from '../../services/errorHandler';

import './style.scss';

interface MainState {
  movies: Movie[];
  error: CustomError | null;
}

class Main extends Component<NonNullable<unknown>, MainState> {
  constructor(props: NonNullable<unknown>) {
    super(props);
    this.state = {
      movies: [],
      error: null,
    };
  }

  componentDidMount(): void {
    const search: string = localStorage.getItem('movie') || '';
    this.fetchMovies(search).catch((error): Promise<void> => {
      throw new CustomError(error);
    });
  }

  fetchMovies = async (search: string): Promise<void> => {
    try {
      const data: ApiResponse | undefined = await api.getMovies(search);

      if (data && data.Search) {
        this.setState({ movies: data.Search, error: null });
      } else {
        this.setState({ movies: [], error: null });
      }
    } catch (error: unknown) {
      this.setState({ error: error as CustomError });
    }
  };

  render() {
    const { movies, error } = this.state;
    return (
      <main className="main">
        <div className="main-container">
          {error && <p>{error.message}</p>}
          {movies && movies.length > 0 ? (
            <div className="main-result">
              {movies.map((movie: Movie) => (
                <div key={'movie.imdbID'} className="movie-card">
                  <img src={movie.Poster} alt={movie.Title} />
                  <h3>{movie.Title}</h3>
                  <p>{movie.Year}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No movies found</p>
          )}
        </div>
      </main>
    );
  }
}

export default Main;
