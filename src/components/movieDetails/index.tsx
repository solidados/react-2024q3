import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/apiClient';
import { MovieDetails } from '../../services/types/api.interface';
import Loader from '../main/ui/Loader';
import { CustomError } from '../../services/errorHandler';

const DetailedMovie = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);

  useEffect((): void => {
    const fetchMovieDetails = async (): Promise<void> => {
      if (imdbID) {
        const details = await api.getMovieDetails(imdbID);
        setMovie(details || null);
      }
    };

    fetchMovieDetails().catch((error): void => {
      throw new CustomError(error.message, 500);
    });
  }, [imdbID]);

  if (!movie) {
    return <Loader />;
  }

  return (
    <div>
      <h2>{movie.Title}</h2>
      <p>{movie.Plot}</p>
    </div>
  );
};

export default DetailedMovie;
