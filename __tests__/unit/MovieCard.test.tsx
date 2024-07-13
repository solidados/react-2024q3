import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, expect } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import * as apiClient from '../../src/services/apiClient';
import { detailedMovie, mockMovie } from './mocks/mockObjects';
import MovieCard from '../../src/components/main/ui/MovieCard';

describe('Movie Card Component', (): void => {
  beforeEach((): void => {
    vi.spyOn(apiClient.api, 'getMovieDetails').mockResolvedValue(detailedMovie);
  });

  afterEach((): void => {
    vi.resetAllMocks();
  });

  it('should render the relevant card data', (): void => {
    render(
      <Router>
        <MovieCard movie={mockMovie} />
      </Router>
    );

    expect(
      screen.getByText(mockMovie.Title && mockMovie.Year)
    ).toBeInTheDocument();
    // expect(screen.getByText(mockMovie.Year)).toBeInTheDocument();
  });

  it('should open detailed card component when clicked', async (): Promise<void> => {
    render(
      <Router>
        <MovieCard movie={mockMovie} />
      </Router>
    );

    fireEvent.click(screen.getByText(mockMovie.Title));

    await waitFor((): void => {
      expect(
        screen.getByText(detailedMovie.Title && detailedMovie.Plot)
      ).toBeInTheDocument();
      // expect(screen.getByText(movieDetails.Plot)).toBeInTheDocument();
    });
  });

  it('should trigger an additional API call to fetch detailed information when clicked', async (): Promise<void> => {
    const getMovieDetailsSpy = vi.spyOn(apiClient.api, 'getMovieDetails');

    render(
      <Router>
        <MovieCard movie={mockMovie} />
      </Router>
    );

    fireEvent.click(screen.getByText(mockMovie.Title));

    await waitFor((): void => {
      expect(getMovieDetailsSpy).toHaveBeenCalledWith(mockMovie.imdbID);
      expect(screen.getByText(detailedMovie.Title)).toBeInTheDocument();
    });
  });
});
