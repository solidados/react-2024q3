import { FC, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ApiResponse, Movie } from '../../services/types/api.interface';
import { api } from '../../services/apiClient';
import { CustomError } from '../../services/errorHandler';
import MovieCard from './ui/MovieCard';
import Loader from './ui/Loader';

import './style.scss';

interface MainProps {
  search: string;
  page: number;
}

const Main: FC<MainProps> = ({ search, page: initialPage }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<CustomError | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchMovies = async (search: string, page: number): Promise<void> => {
    setIsLoading(true);
    try {
      const data: ApiResponse | undefined = await api.getMovies(search, page);

      if (data && data.Search) {
        setMovies(data.Search);
        const totalResults = parseInt(data.totalResults, 10);
        setTotalPages(Math.ceil(totalResults / 10));
        setError(null);
      } else {
        setMovies([]);
        setError(null);
      }
    } catch (error: unknown) {
      setError(new CustomError((error as Error).message, 404));
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextPage = (): void => {
    if (page < totalPages) {
      const nextPage: number = page + 1;
      setPage(nextPage);
      navigate(`/?search=${search}&page=${nextPage}`);
    }
  };

  const handlePreviousPage = (): void => {
    if (page > 1) {
      const previousPage: number = page - 1;
      setPage(previousPage);
      navigate(`/?search=${search}&page=${previousPage}`);
    }
  };

  useEffect((): void => {
    const query = new URLSearchParams(location.search).get('search') || search;
    const pageParam = new URLSearchParams(location.search).get('page');
    const pageNumber = pageParam ? parseInt(pageParam, 10) : initialPage;
    setPage(pageNumber);

    fetchMovies(query, pageNumber).catch((error): void => {
      setError(new CustomError(error.message, 500));
    });
  }, [search, location.search, initialPage]);

  const handleCardClick = (imdbID: string): void => {
    navigate(`/?search=${search}&page=${page}&details=${imdbID}`);
  };

  const handleCloseDetails = (): void => {
    navigate(`/?search=${search}&page=${page}`);
  };

  return (
    <main className="main">
      <div className="main-container">
        <div className="main-content">
          {error && <p>{error.message}</p>}
          {isLoading && <Loader />}
          {movies && movies.length > 0 ? (
            <>
              <div className="main-pagination">
                <button onClick={handlePreviousPage} disabled={page === 1}>
                  &#8701;
                </button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <button onClick={handleNextPage} disabled={page === totalPages}>
                  &#8702;
                </button>
              </div>
              <div className="main-wrapper">
                <div className="main-result">
                  {movies.map((movie: Movie) => (
                    <MovieCard
                      key={movie.imdbID}
                      movie={movie}
                      onClick={() => handleCardClick(movie.imdbID)}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <p>No movies found</p>
          )}
        </div>
        {location.search.includes('details=') && (
          <div className="details-section">
            <button className="close-details" onClick={handleCloseDetails}>
              &times;
            </button>
            <Outlet />
          </div>
        )}
      </div>
    </main>
  );
};

export default Main;
