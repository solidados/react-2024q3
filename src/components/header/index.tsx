import { Component } from 'react';
import logo from '/logo-movie.png';
import './style.scss';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="header-container">
          <img src={logo} className="header-logo" alt="logo" />
          <div className="header-search-bar">
            <input
              type="text"
              className={'header-search-input'}
              placeholder={'Search...'}
            />
            <button className="header-search-button">Search</button>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
