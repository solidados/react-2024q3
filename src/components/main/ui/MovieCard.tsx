import React, { FC } from 'react';
import { Movie } from '../../../services/types/api.interface';
import { Link } from 'react-router-dom';

import './style.scss';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const defaultPoster = '/logo-no-image.png';

  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <div className="movie-card">
        <img
          src={
            movie.Poster && movie.Poster !== 'N/A'
              ? movie.Poster
              : defaultPoster
          }
          alt={movie.Title}
        />
        <div className="movie-card-descr">
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
