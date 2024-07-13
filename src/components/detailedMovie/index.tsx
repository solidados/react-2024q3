import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../services/apiClient';
import { MovieDetails } from '../../services/types/api.interface';
import { CustomError } from '../../services/errorHandler';

import './style.scss';
import Loader from '../main/ui/Loader';

const DetailedMovie = () => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const defaultPoster = '/logo-no-image.png';

  const movieId = searchParams.get('details');

  useEffect((): void => {
    const fetchMovieDetails = async (): Promise<void> => {
      setIsLoading(true);
      try {
        if (movieId) {
          const details = await api.getMovieDetails(movieId);
          setMovie(details || null);
        }
      } catch (error) {
        throw new CustomError((error as Error).message, 500);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails().catch((error): void => {
      throw new CustomError(error.message, 500);
    });
  }, [movieId]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {movie ? (
        <div className="detailed-overlay">
          <div className="detailed-movie">
            <div className="detailed-movie-poster">
              <img
                src={
                  movie.Poster && movie.Poster !== 'N/A'
                    ? movie.Poster
                    : defaultPoster
                }
                alt={movie.Title}
              />
            </div>
            <div className="detailed-movie-info">
              <h2>
                <strong>Name: </strong>
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
              <p className="detailed-movie-plot">
                <strong>Plot:</strong> {movie.Plot}
              </p>
              <p>
                <strong>Country:</strong> {movie.Country}
              </p>
              {movie.Website && (
                <p>
                  <strong>Website:</strong>{' '}
                  <a
                    href={movie.Website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    review
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Movie not found</p>
      )}
    </>
  );
};

export default DetailedMovie;
