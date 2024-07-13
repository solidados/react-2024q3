import React, { FC, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Footer, Header, Main } from './components';
import ErrorComponent from './components/errorComponent';
import { CustomError } from './services/errorHandler';

const App: FC = () => {
  const [search, setSearch] = useState<string>('Star Trek');
  const [error, setError] = useState<CustomError | null>(null);

  const handleSearch = (search: string): void => {
    setSearch(search);
  };

  const handleReload = (): void => {
    setError(null);
  };

  return (
    <div className="wrapper">
      <Header onSearch={handleSearch} />
      <main className="main">
        <div className="main-container">
          <Routes>
            <Route path={'/'} element={<Main search={search} page={1} />} />
            <Route
              path={'*'}
              element={
                <ErrorComponent
                  error={new CustomError('Page not found', 404)}
                  onReload={handleReload}
                />
              }
            />
          </Routes>
        </div>
      </main>
      {error && <ErrorComponent error={error} onReload={handleReload} />}
      <Footer />
    </div>
  );
};

export default App;
