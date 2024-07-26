import { FC } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import MovieList from './ui/MovieList';

import './style.scss';

interface MainProps {
  search: string;
  page: number;
}

const Main: FC<MainProps> = ({ search, page }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleCloseDetails = (): void => {
    navigate(-1);
    // navigate(`/?s=${search}&page=${page}`);
  };

  return (
    <main className="main">
      <div className="main-container">
        <MovieList search={search} page={page} />
        {location.pathname.includes('details') && (
          <div className="details-section" onClick={handleCloseDetails}>
            <button className="details-close" onClick={handleCloseDetails}>
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
