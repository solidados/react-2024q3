import { FC, useEffect, useState } from 'react';
import { ApiResponse, Movie } from '../../services/types/api.interface';
import { api } from '../../services/apiClient';
import { CustomError } from '../../services/errorHandler';
import MovieCard from './ui/MovieCard';

import './style.scss';

interface MainProps {
  // movies: Movie[];
  // error: CustomError | null;
  search: string;
}

const Main: FC<MainProps> = ({ search }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<CustomError | null>(null);

  const fetchMovies = async (search: string): Promise<void> => {
    try {
      const data: ApiResponse | undefined = await api.getMovies(search);

      if (data && data.Search) {
        setMovies(data.Search);
        setError(null);
      } else {
        setMovies([]);
        setError(null);
      }
    } catch (error: unknown) {
      setError(error as CustomError);
    }
  };

  useEffect((): void => {
    // const search: string = localStorage.getItem('movie') || 'Star Trek';
    fetchMovies(search).catch((error): void => {
      setError(new CustomError(error));
    });
  }, [search]);

  return (
    <main className="main">
      <div className="main-container">
        {error && <p>{error.message}</p>}
        {movies && movies.length > 0 ? (
          <div className="main-result">
            {movies.map((movie: Movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </main>
  );
};

export default Main;
