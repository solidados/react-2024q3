import { FC } from 'react';
import { Movie } from '../../../services/types/api.interface';

import './style.scss';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

const MovieCard: FC<MovieCardProps> = ({ movie, onClick }) => {
  const defaultPoster = '/logo-no-image.png';

  return (
    <div className="movie-card" onClick={onClick}>
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
    </div>
  );
};

export default MovieCard;
