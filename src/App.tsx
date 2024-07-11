import { FC, useState } from 'react';
import { Footer, Header, Main } from './components';

const App: FC = () => {
  const [search, setSearch] = useState<string>(
    localStorage.getItem('movie') || 'Star Trek'
  );

  const handleSearch = (search: string): void => {
    setSearch(search);
  };
  return (
    <div className="wrapper">
      <Header onSearch={handleSearch} />
      <Main search={search} />
      <Footer />
    </div>
  );
};

export default App;
