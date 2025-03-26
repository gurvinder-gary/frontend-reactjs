import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./GiftcardForm.module.scss";
import { saveNewGiftCard, getGiftCardByCode, updateGiftCardByCode } from "../../services/giftcardService";

const GiftCardForm = () => {
  const navigate = useNavigate();
  const { code } = useParams();
  const isEditMode = !!code;
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    code: "",
    value: "",
    is_active: true
  });


  useEffect(() => {
    if (isEditMode) {
      fetchGiftCard();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const fetchGiftCard = async () => {
    try {
      const data = await getGiftCardByCode(code);
      setFormData(data);
    } catch (error) {
      console.error("er", error)
      alert("Error fetching coupon details.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
          if (isEditMode) {
            await updateGiftCardByCode(formData.code, formData);
            alert("Coupon updated successfully!");
          } else {
            await saveNewGiftCard(formData);
            alert("Gift card created successfully!");
          }
                
          navigate("/gift-cards");
        } catch (error) {
          let errorMsg = "Error saving gift card";
          
          if (isEditMode) {
            errorMsg = "Error updating gift card";
          }
          
          if (error?.response?.data?.detail) {
            errorMsg = error?.response?.data?.detail;
          }
    
          alert(errorMsg);
        }
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };
  
  return (
    <div className={styles.formContainer}>
      <div className={styles.titleSection}>
        <h2>{isEditMode ? "Edit Gift Card" : "Add Gift Card"}</h2>
        <button className={styles.backButton} onClick={handleBackButtonClick}>Back</button>
      </div>
      
      <form onSubmit={handleSubmit} className={styles.giftcardForm}>
        <div className={styles.formGroup}>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>Code:</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
            disabled={isEditMode} // Disable code field in edit mode
          />
        </div>

        <div className={styles.formGroup}>
          <label>Value:</label>
          <input type="number" name="value" value={formData.value} onChange={handleChange} required />
        </div>

        <button type="submit" className={styles.submitButton}>
          {formData.code ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default GiftCardForm;
