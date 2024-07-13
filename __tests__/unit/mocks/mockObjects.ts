import {
  DetailedMovie,
  Movie,
} from '../../../src/services/types/api.interface';

export const mockMovies: Movie[] = [
  { imdbID: '1', Title: 'Movie 1', Year: '2021', Poster: 'N/A', Type: '' },
  { imdbID: '2', Title: 'Movie 2', Year: '2022', Poster: 'N/A', Type: '' },
  { imdbID: '3', Title: 'Movie 3', Year: '2023', Poster: 'N/A', Type: '' },
  { imdbID: '4', Title: 'Movie 4', Year: '2024', Poster: 'N/A', Type: '' },
];

export const mockMovie: Movie = {
  imdbID: '1',
  Title: 'Movie 1',
  Year: '2021',
  Poster: 'N/A',
  Type: 'movie',
};

export const detailedMovie: DetailedMovie = {
  Title: 'Movie 1',
  Year: '2021',
  Rated: 'PG',
  Released: '01 Jan 2021',
  Runtime: '120 min',
  Genre: 'Action',
  Director: 'Director 1',
  Writer: 'Writer 1',
  Actors: 'Actor 1, Actor 2',
  Plot: 'Plot of the movie',
  Language: 'English',
  Country: 'USA',
  Awards: 'None',
  Poster: 'N/A',
  Ratings: [],
  Metascore: 'N/A',
  imdbRating: '7.0',
  imdbVotes: '1000',
  imdbID: '1',
  Type: 'movie',
  DVD: 'N/A',
  BoxOffice: 'N/A',
  Production: 'N/A',
  Website: 'N/A',
  Response: 'True',
};
