import React, { useEffect, useState } from 'react';
import { getOrders, deleteOrderById } from '../../services/orderService';
import { useNavigate } from 'react-router-dom';
import styles from './OrderList.module.scss';

const OrderList = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 5;

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const fetchOrders = async (page) => {
    setLoading(true);

    try {
      const response = await getOrders(page, limit);
      setOrders(response.orders);
      setTotalPages(response.totalPages);
      setTotalRecords(response.totalRecords);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await deleteOrderById(id);
        fetchOrders(currentPage);
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={styles.orderListContainer}>
      <h2>Orders</h2>

      <div className={styles.topNav}>
        <h3>Total Orders: {totalRecords}</h3>
        <button className={styles.addButton} onClick={() => navigate('/order/add')}>Add Order</button>
      </div>

      <ul className={styles.orderList}>
        {orders.map((order) => (
          <li className={styles.orderItem} key={order._id}>
            <span>User Name: {order.user?.name}</span>
            <span>Total Price: ${order.totalPrice}</span>
            <span>Payment Method: {order.paymentMethod} </span>
            <span>Total Items: {order.orderItems.length} </span>
            <span>Address: {order.shippingAddress.city}, {order.shippingAddress.country}</span>
            <div className={styles.actionItems}>
              <button className={`${styles.buttons} ${styles.editBtn}`} onClick={() => navigate(`/order/detail/${order._id}`)}>Items</button>
              <button className={`${styles.buttons} ${styles.deleteButton}`} onClick={() => handleDelete(order._id)}>Delete</button>
            </div>

          </li>
        ))}
      </ul>

      {!loading && orders.length === 0 &&
        <div className={styles.noRecordFound}>Oops: No record found</div>
      }

      {totalPages > 0 && (
        <div className={styles.pagination}>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderList;
