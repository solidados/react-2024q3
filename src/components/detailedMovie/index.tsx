import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/apiClient';
import { MovieDetails } from '../../services/types/api.interface';
import { CustomError } from '../../services/errorHandler';
import Loader from '../main/ui/Loader';

import './style.scss';

const DetailedMovie = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<CustomError | null>(null);
  const defaultPoster = '/logo-no-image.png';

  useEffect((): void => {
    const fetchMovieDetails = async (): Promise<void> => {
      if (imdbID) {
        setIsLoading(true);
        try {
          const data = await api.getMovieDetails(imdbID);
          setMovie(data || null);
          setError(null);
        } catch (error: unknown) {
          setError(new CustomError((error as Error).message, 404));
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchMovieDetails().catch((error): void => {
      throw new CustomError(error.message, 500);
    });
  }, [imdbID]);

  if (isLoading) return <Loader />;
  if (error) return <p>{error.message}</p>;
  if (!movie) return <p>No movie details found</p>;

  return (
    <div className="movie-details">
      <div className="movie-details-poster">
        <img
          src={movie.Poster ? movie.Poster : defaultPoster}
          alt={movie.Title}
        />
      </div>
      <div className="movie-details-info">
        <h2>
          <strong>Year: </strong>
          {movie.Title}
        </h2>
        <p>
          <strong>Year:</strong> {movie.Year}
        </p>
        <p>
          <strong>Genre:</strong> {movie.Genre}
        </p>
        <p>
          <strong>Rated:</strong> {movie.Rated}
        </p>
        <p className="movie-details-plot">
          <strong>Plot:</strong> {movie.Plot}
        </p>
        <p>
          <strong>Country:</strong> {movie.Country}
        </p>
        <p>
          <strong>Website:</strong>{' '}
          <a href={movie.Website} rel="noopener noreferrer">
            Review
          </a>
        </p>
      </div>
    </div>
  );
};

export default DetailedMovie;
