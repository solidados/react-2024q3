import React, { ChangeEvent, FC, useState } from 'react';
import logo from '/logo-movie.png';
import './style.scss';

interface HeaderProps {
  onSearch: (search: string) => void;
}

const Header: FC<HeaderProps> = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(event.target.value);
  };

  const handleSearch = (): void => {
    const trimmedSearchValue: string = searchInput.trim();
    localStorage.setItem('movie', trimmedSearchValue);
    onSearch(trimmedSearchValue);
  };
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const throwError = (): void => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Test Error from Header');
  }

  return (
    <header className="header">
      <div className="header-container">
        <img src={logo} className="header-logo" alt="logo" />
        <button className="error-button" onClick={throwError}>
          Throw Error
        </button>
        <div className="header-search-bar">
          <input
            type="text"
            className={'header-search-input'}
            placeholder={'Search...'}
            value={searchInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button className="header-search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
