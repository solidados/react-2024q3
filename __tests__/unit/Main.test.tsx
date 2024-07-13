import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, expect } from 'vitest';
import * as apiClient from '../../src/services/apiClient';
import { mockMovies } from './mocks/mockObjects';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from '../../src/components/main';

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
    await waitFor((): void => {
      expect(screen.getByText('No movies found')).toBeInTheDocument();
    });
  });
});
