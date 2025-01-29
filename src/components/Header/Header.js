import React from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './Header.module.scss';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Welcome, {user?.name || 'User'} </h1>
      <button className={styles.logoutButton} onClick={logout}>
        Logout
      </button>
    </header>
  );
};

export default Header;
