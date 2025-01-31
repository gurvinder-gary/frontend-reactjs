import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Products.module.scss';
import { deleteProduct, getProducts } from '../../services/productsService';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(currentPage);
        setProducts(response.products);
        setTotalPages(response.totalPages);
        setTotalRecords(response.totalRecords);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);


  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(product => product._id !== id));
        setTotalRecords(totalRecords - 1);
      } catch (error) {
        alert('Error deleting product');
      }
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.productsContainer}>
      <h2>Products</h2>

      <div className={styles.topNav}>
        <h3>Total Records: {totalRecords}</h3>
        <Link to="/products/add" className={styles.addButton}>Add Product</Link>
      </div>
      
      <div className={styles.productList}>
        {products.map(product => (
          <div key={product._id} className={styles.productCard}>
            <img 
              src={product.image || '/images/default-product.jpg'} 
              alt={product.name} 
              onError={(e) => e.target.src = '/images/default-product.jpg'}
            />
            <h3>{product.name}</h3>
            <span>{product.description}</span>
            <span>Price: ${product.price}</span>
            <div className={styles.actions}>
              <Link to={`/products/edit/${product._id}`} className={styles.editButton}>Edit</Link>
              <button className={styles.deleteButton} onClick={() => handleDelete(product._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default ProductList;