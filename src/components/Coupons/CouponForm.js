import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./CouponForm.module.scss";
import { saveNewCoupon, getCouponByCode, updateCouponByID } from "../../services/couponService";

const CouponForm = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!code;

  const [coupon, setCoupon] = useState({
    code: "",
    description: "",
    discount_type: "percentage",
    discount_value: "",
    expiry_date: "",
    is_active: true,
    max_usage: "",
    min_order_amount: "",
    usage_count: 0,
  });

  useEffect(() => {
    if (isEditMode) {
      fetchCoupon();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const fetchCoupon = async () => {
    try {
      const data = await getCouponByCode(code);
      setCoupon(data);
    } catch (error) {
      console.error("er", error)
      alert("Error fetching coupon details.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setCoupon((prevCoupon) => ({
      ...prevCoupon,
      [name]:
        name === "expiry_date"
          ? new Date(value).toISOString()
          : type === "number"
            ? Number(value)
            : value,
    }));
  };

  const handleRadioChange = (e) => {
    setCoupon((prevCoupon) => ({
      ...prevCoupon,
      is_active: e.target.value === "true",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateCouponByID(coupon.id, coupon);
        alert("Coupon updated successfully!");
      } else {
        await saveNewCoupon(coupon);
        alert("Coupon created successfully!");
      }
            
      navigate("/coupons");
    } catch (error) {
      let errorMsg = "Error saving coupon";
      
      if (isEditMode) {
        errorMsg = "Error updating coupon";
      }

      if (error?.response?.data?.error) {
        errorMsg = error?.response?.data?.error;
      }

      alert(errorMsg);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.couponFormContainer}>
      <div className={styles.titleSection}>
        <h2>{isEditMode ? "Edit Coupon" : "Add New Coupon"}</h2>
        <button className={styles.backButton} onClick={handleBackClick}>Back</button>
      </div>

      <form onSubmit={handleSubmit}>
        <label>Code:</label>
        <input type="text" name="code" value={coupon.code} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={coupon.description} onChange={handleChange} required />

        <label>Discount Type:</label>
        <select name="discount_type" value={coupon.discount_type} onChange={handleChange} required>
          <option value="flat">Flat</option>
          <option value="percentage">Percentage</option>
        </select>

        <label>Discount Value:</label>
        <input type="number" name="discount_value" value={coupon.discount_value} onChange={handleChange} required />

        <label>Expiry Date:</label>
        <input
          type="date"
          name="expiry_date"
          value={coupon.expiry_date ? coupon.expiry_date.split("T")[0] : ""}
          onChange={handleChange}
          required />

        <label>Min Order Amount:</label>
        <input type="number" name="min_order_amount" value={coupon.min_order_amount} onChange={handleChange} required />

        <label>Max Usage:</label>
        <input type="number" name="max_usage" value={coupon.max_usage} onChange={handleChange} required />

        <label>Status:</label>
        <div className={styles.radioGroup}>
          <label>
            <input type="radio" name="is_active" value="true" checked={coupon.is_active} onChange={handleRadioChange} />
            Active
          </label>
          <label>
            <input type="radio" name="is_active" value="false" checked={!coupon.is_active} onChange={handleRadioChange} />
            Inactive
          </label>
        </div>

        <button type="submit">{isEditMode ? "Update Coupon" : "Create Coupon"}</button>
      </form>
    </div>
  );
};

export default CouponForm;
