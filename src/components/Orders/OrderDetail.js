import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './OrderDetail.module.scss';
import { getOrderDetailById } from '../../services/orderService';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchOrder();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await getOrderDetailById(id);
      setOrder(response);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  const handleBackClick = () => {
		navigate(-1);
	};
  
  if (!order) return <p>Loading order details...</p>;

  const totalAmount = order.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={styles.orderDetailContainer}>
      <div className={styles.topNav}>
        <h2>Order Details</h2>
        <button className={styles.backButton} onClick={handleBackClick}>Back</button>
      </div>
      <h3>Total: ${totalAmount.toFixed(2)}</h3>
      <div className={styles.orderItems}>
        {order.orderItems.map((item) => (
          <div key={item.product._id} className={styles.orderItem}>
            <img src={item.product.image || '/images/default-product.jpg'} alt={item.product.name} className={styles.productImage} />
            <div className={styles.productInfo}>
              <h4>{item.product.name}</h4>
              <p>{item.product.description}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ${item.price * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetail;
