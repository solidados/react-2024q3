import { Component } from 'react';
import logoGh from '/logo-github.png';
import logoRs from '/logo-rsschool.svg';
import './style.scss';

class Footer extends Component {
  render() {
    return (
      <header className="footer">
        <div className="footer-container">
          <img src={logoGh} alt="logo-gh" className="footer-logo" />
          <img src={logoRs} alt="logo-rs" className="footer-logo" />
        </div>
      </header>
    );
  }
}

export default Footer;
