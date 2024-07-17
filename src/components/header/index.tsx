import React, { Component } from 'react';
import logo from '/logo-movie.png';
import './style.scss';

interface HeaderProps {
  onSearch: (search: string) => void;
}

interface HeaderState {
  searchInput: string;
  hasError: boolean;
}

class Header extends Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      searchInput: '',
      hasError: false,
    };
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchInput: e.target.value });
  };

  handleSearch = (): void => {
    const trimmedSearchValue: string = this.state.searchInput.trim();
    localStorage.setItem('movie', trimmedSearchValue);
    this.props.onSearch(trimmedSearchValue);
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  };

  throwError = (): void => {
    this.setState({ hasError: true });
  };

  render() {
    // TODO: remove when not needed
    if (this.state.hasError) {
      throw new Error('Test error from Header');
    }

    return (
      <header className="header">
        <div className="header-container">
          <img src={logo} className="header-logo" alt="logo" />
          <button className="error-button" onClick={this.throwError}>
            Throw Error
          </button>
          <div className="header-search-bar">
            <input
              type="text"
              className={'header-search-input'}
              placeholder={'Search...'}
              value={this.state.searchInput}
              onChange={this.handleInputChange}
              onKeyDown={this.handleKeyDown}
            />
            <button
              className="header-search-button"
              onClick={this.handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
