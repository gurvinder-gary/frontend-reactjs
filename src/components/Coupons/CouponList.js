import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './CouponList.module.scss';
import { getCouponsList, activateDeactivateCoupon } from '../../services/couponService';

const CouponList = () => {
  const [coupons, setCoupons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  useEffect(() => {
    fetchCoupons(currentPage);
  }, [currentPage]);

  const fetchCoupons = async (page) => {
    setLoading(true);

    try {
      const response = await getCouponsList(page, limit);
      setCoupons(response.coupons);
      setTotalPages(response.total_pages);
      setTotalRecords(response.total_records);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleActivateDeactivate = async (id, type) => {
    if (window.confirm(`Are you sure you want to ${type} this coupon?`)) {
      try {
        await activateDeactivateCoupon(id, type);
        setCoupons((prevCoupons) =>
          prevCoupons.map((coupon) =>
            coupon.id === id ? { ...coupon, is_active: type === "activate" } : coupon
          )
        );
      } catch (error) {
        alert('Error deactivating coupon');
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.couponContainer}>
      <h2>Coupons</h2>

      <div className={styles.topNav}>
        <h3>Total Records: {totalRecords}</h3>
        <Link to="/coupon/add" className={styles.addButton}>Add Coupon</Link>
      </div>

      <table className={styles.couponTable}>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Code</th>
            <th>Discount Type</th>
            <th>Discount Value</th>
            <th>Expiry</th>
            <th>Max Usage</th>
            <th>Usage Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon, index) => (
            <tr key={coupon.id}>
              <td>{index + 1}</td>
              <td>{coupon.code}</td>
              <td>{coupon.discount_type}</td>
              <td>{coupon.discount_value}</td>
              <td>{new Date(coupon.expiry_date).toLocaleDateString()}</td>
              <td>{coupon.max_usage}</td>
              <td>{coupon.usage_count}</td>
              <td className={styles.actionsBtns}>
                <Link to={`/coupon/edit/${coupon.code}`} className={styles.editButton}>Edit</Link>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleActivateDeactivate(coupon.id, coupon.is_active ? "deactivate" : "activate")}
                >
                  {coupon.is_active ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}

          {coupons.length === 0 && (
            <tr>
              <td className={styles.noRecord} colSpan={8}>No record found</td>
            </tr>
          )}
        </tbody>
      </table>

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

export default CouponList;
