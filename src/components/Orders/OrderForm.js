import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './OrderForm.module.scss';
import { createNewOrder } from '../../services/orderService';
import { getAllProducts } from '../../services/productsService';

const OrderForm = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    user: '',
    orderItems: [],
    shippingAddress: {
      address: '',
      city: '',
      postalCode: '',
      country: '',
    },
    paymentMethod: 'Cash',
    isPaid: true,
    totalPrice: 0,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      shippingAddress: { ...formData.shippingAddress, [name]: value },
    });
  };

  const handleOrderItemChange = (index, field, value) => {
    const updatedItems = [...formData.orderItems];
    updatedItems[index][field] = value;
    
    if (field === 'product') {
      const selectedProduct = products.find(prod => prod._id === value);
      updatedItems[index] = { ...updatedItems[index], product: selectedProduct, price: selectedProduct.price };
    }
    
    if (field === 'quantity') {
      updatedItems[index].quantity = Number(value);
      updatedItems[index].price = updatedItems[index].product.price * updatedItems[index].quantity;
    }
    
    const totalPrice = updatedItems.reduce((acc, item) => acc + item.price, 0);
    setFormData({ ...formData, orderItems: updatedItems, totalPrice });
  };

  const addOrderItem = () => {
    setFormData({
      ...formData,
      orderItems: [...formData.orderItems, { product: '', quantity: 1, price: 0 }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      await createNewOrder(formData);
      navigate('/orders');
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className={styles.orderFormContainer}>
      <h2>Add Order</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Shipping Address</label>
          <input type="text" name="address" value={formData.shippingAddress.address} onChange={handleShippingChange} placeholder="Address" required />
          <input type="text" name="city" value={formData.shippingAddress.city} onChange={handleShippingChange} placeholder="City" required />
          <input type="text" name="postalCode" value={formData.shippingAddress.postalCode} onChange={handleShippingChange} placeholder="Postal Code" required />
          <input type="text" name="country" value={formData.shippingAddress.country} onChange={handleShippingChange} placeholder="Country" required />
        </div>

        <div className={styles.formGroup}>
          <label>Payment Method</label>
          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
            <option value="PayPal">Cash</option>
            <option value="CreditCard">PayPal</option>
            <option value="CreditCard">Credit Card</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Order Items</label>
          {formData.orderItems.map((item, index) => (
            <div key={index} className={styles.addOrder}>
              <select value={item.product._id || ''} onChange={(e) => handleOrderItemChange(index, 'product', e.target.value)} required>
                <option value="">Select Product</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>{product.name} - ${product.price}</option>
                ))}
              </select>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleOrderItemChange(index, 'quantity', e.target.value)}
                placeholder="Quantity"
                required
              />
            </div>
          ))}
          <button type="button" onClick={addOrderItem} className={styles.submitButton}>+ Add Item</button>
        </div>

        <button type="submit" className={styles.submitButton}>Create Order</button>
      </form>
    </div>
  );
};

export default OrderForm;
