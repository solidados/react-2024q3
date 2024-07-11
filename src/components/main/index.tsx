import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ApiResponse, Movie } from '../../services/types/api.interface';
import { api } from '../../services/apiClient';
import { CustomError } from '../../services/errorHandler';
import MovieCard from './ui/MovieCard';

import './style.scss';

interface MainProps {
  search: string;
}

const Main: FC<MainProps> = ({ search }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<CustomError | null>(null);
  const location = useLocation();

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
    const query = new URLSearchParams(location.search).get('search') || search;
    fetchMovies(query).catch((error): void => {
      setError(error as CustomError);
    });
  }, [search, location.search]);

  return (
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
  );
};

export default Main;
