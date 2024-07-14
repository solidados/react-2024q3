import { FC } from 'react';
import { Movie } from '../../../services/types/api.interface';

import './style.scss';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const defaultPoster = '/logo-no-image.png';

  return (
    <Link to={`/details/${movie.imdbID}`} className="movie-card">
      <img
        src={
          movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : defaultPoster
        }
        alt={movie.Title}
      />
      <div className="movie-card-descr">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
