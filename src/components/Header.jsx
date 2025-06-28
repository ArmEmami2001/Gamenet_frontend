import React from 'react';
import useAuth from '../context/useAuth';
import './Header.css';

const Header = () => {
  const { user, logoutUser } = useAuth();

  return (
    <header className="app-header">
      <div className="header-logo">
        <a href="/">GameNet</a>
      </div>
      <nav className="header-nav">
        {user && <button onClick={() => logoutUser()}>Logout</button>}
      </nav>
    </header>
  );
};

export default Header;
