import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Products.module.scss';
import { createProduct, getProductById, updateProductById } from '../../services/productsService';
import { useCategoryContext } from '../../context/CategoryContext';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories } = useCategoryContext();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: ''
  });

  useEffect(() => {
    if (id) fetchProduct();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await getProductById(id);
      setFormData(response);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateProductById(id, formData);
      } else {
        await createProduct(formData);
      }
      navigate('/products');
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div className={styles.productFormContainer}>
      <div className={styles.titleSection}>
        <h2>{id ? 'Edit Product' : 'Add Product'}</h2>
        <button className={styles.backButton} onClick={handleBackClick}>Back</button>
      </div>

      <form onSubmit={handleSubmit} className={styles.productForm}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />

        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">-- Select Category --</option>
          {categories
            .filter(cat => cat.status === 'active') // Show only active categories
            .map(cat => (
              <option key={cat._id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
        </select>
        
        <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock" required />
        <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL (optional)" />
        <button type="submit">{id ? 'Update' : 'Add'} Product</button>
      </form>
    </div>
  );
};

export default ProductForm;