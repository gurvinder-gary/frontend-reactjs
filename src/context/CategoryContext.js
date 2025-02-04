import { createContext, useState, useEffect, useContext } from 'react';
import { getProductCategories } from '../services/productCategoriesService';

// Create Context
const CategoryContext = createContext();

export const useCategoryContext = () => useContext(CategoryContext);

// Context Provider
export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getProductCategories();
      setCategories(response);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CategoryContext.Provider value={{ categories, loading, fetchCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};
