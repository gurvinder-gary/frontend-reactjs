import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCategories.module.scss';
import { deleteProductCategoryById, getProductCategories } from '../../services/productCategoriesService';

const ProductCategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getProductCategories();
        setCategories(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteProductCategoryById(id);
        setCategories(categories.filter(category => category._id !== id));
      } catch (error) {
        alert('Error deleting category');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.categoryContainer}>
      <h2>Product Categories</h2>

			<div className={styles.topNav}>
        <h3>Total Records: {categories.length}</h3>
        <Link to="/product-category/add" className={styles.addButton}>Add Category</Link>
      </div>
			      
      <table className={styles.categoryTable}>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category._id}>
              <td>{index + 1}</td>
              <td>{category.name}</td>
              <td>{category.slug}</td>
              <td>{category.description}</td>
              <td>{category.status.toUpperCase()}</td>
              <td className={styles.actionsBtns}>
                <Link to={`/product-category/edit/${category._id}`} className={styles.editButton}>Edit</Link>
                <button className={styles.deleteButton} onClick={() => handleDelete(category._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductCategoryList;