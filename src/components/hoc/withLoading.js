import React, { useState, useEffect } from 'react';

const withLoading = (WrappedComponent) => {
  return (props) => {
    const overlayStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '48px',
      fontWeight: 'bold',
      color: 'white',
      zIndex: 1000,
    };
    
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), 500); // Simulate loading
      return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
      return <div style={overlayStyle}>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withLoading;
