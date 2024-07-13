import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, expect } from 'vitest';
import { Movie } from '../../src/services/types/api.interface';
import * as apiClient from '../../src/services/apiClient';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from '../../src/components/main';

const mockMovies: Movie[] = [
  { imdbID: '1', Title: 'Movie 1', Year: '2021', Poster: 'N/A', Type: '' },
  { imdbID: '2', Title: 'Movie 2', Year: '2022', Poster: 'N/A', Type: '' },
  { imdbID: '3', Title: 'Movie 3', Year: '2023', Poster: 'N/A', Type: '' },
  { imdbID: '4', Title: 'Movie 4', Year: '2024', Poster: 'N/A', Type: '' },
];

describe('Main Component', (): void => {
  beforeEach((): void => {
    vi.spyOn(apiClient.api, 'getMovies').mockResolvedValue({
      Search: mockMovies,
      totalResults: '4',
      Response: 'True',
    });
  });

  afterEach((): void => {
    vi.resetAllMocks();
  });

  it('should render the specified number of cards', async (): Promise<void> => {
    render(
      <Router>
        <Main search="test" page={1} />
      </Router>
    );

    await waitFor(() =>
      expect(screen.getAllByRole('img')).toHaveLength(mockMovies.length)
    );
  });

  it('should display an appropriate message if no cards are present', async (): Promise<void> => {
    vi.spyOn(apiClient.api, 'getMovies').mockResolvedValue({
      Search: [],
      totalResults: '0',
      Response: 'False',
    });

    render(
      <Router>
        <Main search="test" page={1} />
      </Router>
    );
    await screen.findByText('No movies found');
  });
});
