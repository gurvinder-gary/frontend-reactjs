import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ProductCategories.module.scss';
import { addProductCategory, getProductCategoryById, updateProductCategoryById } from '../../services/productCategoriesService';

const ProductCategoryForm = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [category, setCategory] = useState({ name: '', description: '', status: 'active' });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (id) {
			const fetchCategory = async () => {
				try {
					const response = await getProductCategoryById(id);
					setCategory(response);
				} catch (err) {
					setError('Failed to fetch category');
				}
			};
			fetchCategory();
		}
	}, [id]);

	const handleBackClick = () => {
		navigate(-1);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCategory(prevState => ({ ...prevState, [name]: value }));
	};

	const generateSlug = (name) => {
		return name
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9\s]/g, '')
			.replace(/\s+/g, '-');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			if (id) {
				await updateProductCategoryById(id, category);
			} else {
				const newCategory = { ...category, slug: generateSlug(category.name) };
				await addProductCategory(newCategory);
			}

			navigate('/product-categories');
		} catch (err) {
			setError(err?.response?.data?.message || 'Failed to save category');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.formContainer}>
			<div className={styles.titleSection}>
				<h2>{id ? 'Edit' : 'Add'} Product Category</h2>
				<button className={styles.backButton} onClick={handleBackClick}>Back</button>
			</div>

			{error && <p className={styles.error}>{error}</p>}
			<form onSubmit={handleSubmit}>
				<div className={styles.formGroup}>
					<label>Name:</label>
					<input type="text" name="name" value={category.name} onChange={handleChange} required />
				</div>
				<div className={styles.formGroup}>
					<label>Description:</label>
					<textarea name="description" value={category.description} onChange={handleChange} />
				</div>
				<div className={styles.formGroup}>
					<label>Status:</label>
					<select name="status" value={category.status} onChange={handleChange}>
						<option value="active">Active</option>
						<option value="inactive">Inactive</option>
					</select>
				</div>
				<button type="submit" className={styles.submitButton} disabled={loading}>
					{loading ? 'Saving...' : 'Save Category'}
				</button>
			</form>
		</div>
	);
};

export default ProductCategoryForm;