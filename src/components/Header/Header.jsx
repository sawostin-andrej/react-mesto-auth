import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../images/logo.svg";

export default function Header({ loggedIn, email, onLogout }) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleAuthClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="логотип"
      />
      <div 
        className="header__info">
        {loggedIn && <div className="header__email">{email}</div>} 
        {loggedIn ? (<Link className="header__auth header__auth_exit" to="/sign-in" onClick={onLogout}>Выйти</Link>
        ) : (
          <>
            {isMenuOpen ? (
              <Link className="header__auth" to="/sign-in" onClick={handleAuthClick}>{" "}Войти</Link>
            ) : (
              <Link className="header__auth" to="/sign-up" onClick={handleAuthClick}>Регистрация</Link>
            )}
          </>
        )}
      </div>
    </header>
  );
}