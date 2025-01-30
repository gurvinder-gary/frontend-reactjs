import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Dashboard</h2>
      <nav className={styles.nav}>
        <NavLink to="/profile" className={({ isActive }) => isActive ? styles.active : ''}>Profile</NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? styles.active : ''}>Products</NavLink>
        <NavLink to="/orders" className={({ isActive }) => isActive ? styles.active : ''}>Orders</NavLink>
        <NavLink to="/change-password" className={({ isActive }) => isActive ? styles.active : ''}>Change Password</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;