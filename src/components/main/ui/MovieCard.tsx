import { Component } from 'react';
import { Movie } from '../../../services/types/api.interface';

import './style.scss';

interface MovieCardProps {
  movie: Movie;
}

class MovieCard extends Component<MovieCardProps> {
  render() {
    const { movie } = this.props;
    const defaultPoster = '/logo-no-image.png';

    return (
      <div key={movie.imdbID} className="movie-card">
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
    );
  }
}

export default MovieCard;
