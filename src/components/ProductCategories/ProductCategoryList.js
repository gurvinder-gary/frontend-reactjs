import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCategories.module.scss';
import { deleteProductCategoryById } from '../../services/productCategoriesService';
import { useCategoryContext } from '../../context/CategoryContext';

const ProductCategoryList = () => {
  const { categories, loading, fetchCategories } = useCategoryContext();


  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteProductCategoryById(id);
        fetchCategories();
      } catch (error) {
        alert('Error deleting category');
      }
    }
  };

  if (loading) return <p>Loading...</p>;

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

          {categories.length === 0 &&
            <td className={styles.noRecord} colSpan={6}>No record found</td>
          }
        </tbody>
      </table>
    </div>
  );
};

export default ProductCategoryList;