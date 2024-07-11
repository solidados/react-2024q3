import { FC, useState } from 'react';
import { Footer, Header, Main } from './components';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ErrorComponent from './components/errorComponent';

const App: FC = () => {
  const [search, setSearch] = useState<string>(
    localStorage.getItem('movie') || 'Star Trek'
  );
  const [error, setError] = useState<Error | null>(null);

  const handleSearch = (search: string): void => {
    setSearch(search);
  };

  const handleReload = (): void => {
    setError(null);
  };

  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header onSearch={handleSearch} />
        <main>
          <Routes>
            <Route path={'/'} element={<Main search={search} />} />
            <Route path={'*'} element={<Navigate to={'/'} replace />} />
          </Routes>
        </main>
        {error && <ErrorComponent error={error} onReload={handleReload} />}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
