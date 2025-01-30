import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Signup.module.scss';
import { registerUser } from '../../services/usersService';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [successErrorMsg, setSuccessErrorMsg] = useState({
    status: '',
    message: ''
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    image: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessErrorMsg({
      status: '',
      message: ''
    });

    if (!validateForm()) return;

    setLoading(true);

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('name', formData.name);
    formDataToSubmit.append('email', formData.email);
    formDataToSubmit.append('password', formData.password);
    formDataToSubmit.append('profileImage', formData.image);
   
    try {
      const response = await registerUser(formDataToSubmit);

      if (response?.email) {
        setSuccessErrorMsg({
          status: 'success',
          message: 'User account has been created'
        });

        setTimeout(() => {
          navigate('/login');
        }, 1500);
        
      } else {
        setSuccessErrorMsg({
          status: 'failure',
          message: 'Some error occur while creating account'
        });
      }     
    } catch (error) {
      console.error('Error occurred during signup:', error);
      setSuccessErrorMsg({
        status: 'failure',
        message: 'Some error occur while creating account'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.signupPage}>
      <div className={styles.container}>
        {
          (successErrorMsg && successErrorMsg.status !== "") &&
          <p className={`${successErrorMsg.status === "success"} ? ${styles.success} : ${styles.failure}`}>{successErrorMsg.message}</p>
        }
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className={styles.error}>{errors.password}</span>}

          <input type="file" name="image" accept="image/*" onChange={handleChange} />
          {errors.image && <span className={styles.error}>{errors.image}</span>}

          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Register'}
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
