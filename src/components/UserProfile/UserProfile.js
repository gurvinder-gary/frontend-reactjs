import React, { useEffect, useState } from 'react';
import styles from './UserProfile.module.scss';
import { getUserProfile } from '../../services/usersService';
import withLoading from '../hoc/withLoading';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUser(profile);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) return;

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileWrapper}>
        <div className={styles.imageWrapper}>
          <img src={user.profileImage || 'https://keedag.sportskeeda.com/user-pic/373414-1713615484-200.jpg'} alt="User"  className={styles.profileImage}/>
        </div>

        <div className={styles.content}>
          <h1>{user.name}</h1>
          <p>Email: {user.email}</p>
          <p>Admin: {user.isAdmin ? 'Yes' : 'No'}</p>
        </div>
      </div>     
    </div>
  );
};

const UserProfileWithLoading = withLoading(UserProfile);

export default UserProfileWithLoading;
