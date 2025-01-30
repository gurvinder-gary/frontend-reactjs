import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import UserProfile from './components/UserProfile/UserProfile';
import Header from './components/Header/Header';
// import ProductList from './components/Products/ProductList';
// import AddProduct from './components/Products/AddProduct';
// import EditProduct from './components/Products/EditProduct';
// import Orders from './components/Orders/Orders';
import Sidebar from './components/Sidebar/Sidebar';
import { AuthProvider, useAuth } from './context/AuthContext';

const Layout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route path="/" element={<Navigate to="/profile" />} />
            <Route path="/profile" element={<UserProfile />} />
            {/* <Route path="/products" element={<ProductList />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/products/edit/:id" element={<EditProduct />} />
            <Route path="/orders" element={<Orders />} /> */}
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
