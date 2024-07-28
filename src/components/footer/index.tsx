import logoGh from '/logo-github.png';
import logoRs from '/logo-rsschool.svg';
import './style.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <img src={logoGh} alt="logo-gh" className="footer-logo" />
        <img src={logoRs} alt="logo-rs" className="footer-logo" />
      </div>
    </footer>
  );
};

export default Footer;
