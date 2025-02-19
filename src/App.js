import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import UserProfile from './components/UserProfile/UserProfile';
import Header from './components/Header/Header';
import ProductList from './components/Products/ProductList';
import ProductForm from './components/Products/ProductForm';
import Sidebar from './components/Sidebar/Sidebar';
import { AuthProvider, useAuth } from './context/AuthContext';
import ChangePassword from './components/ChangePassword/ChangePassword';
import ProductCategoryList from './components/ProductCategories/ProductCategoryList';
import ProductCategoryForm from './components/ProductCategories/ProductCategoryForm';
import { CategoryProvider } from './context/CategoryContext';
import OrderList from './components/Orders/OrderList';
import OrderForm from './components/Orders/OrderForm';
import OrderDetail from './components/Orders/OrderDetail';
import CouponList from './components/Coupons/CouponList';

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
        {/* <CategoryProvider> */}
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
            <Route path="/change-password" element={<ChangePassword />} />

            <Route
              element={
                <CategoryProvider>
                  <Outlet />
                </CategoryProvider>
              }
            >
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/add" element={<ProductForm />} />
              <Route path="/products/edit/:id" element={<ProductForm />} />
              <Route path="/product-categories" element={<ProductCategoryList />} />
              <Route path="/product-category/add" element={<ProductCategoryForm />} />
              <Route path="/product-category/edit/:id" element={<ProductCategoryForm />} />
            </Route>

            <Route path="/orders" element={<OrderList />} />
            <Route path="/order/add" element={<OrderForm />} />
            <Route path="/order/detail/:id" element={<OrderDetail />} />

            <Route path="/coupons" element={<CouponList />} />
          </Route>
        </Routes>
        {/* </CategoryProvider> */}
      </AuthProvider>
    </Router>
  );
};

export default App;
