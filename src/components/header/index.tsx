import { Component } from 'react';
import './style.scss';

class Header extends Component {
  state = {};

  render() {
    return (
      <header className="header">
        <div className="header-container">
          <div className="header-logo">Logo</div>
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
