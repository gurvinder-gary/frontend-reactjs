import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGiftCardsList, deleteGiftCard } from "../../services/giftcardService";
import styles from "./GiftcardList.module.scss";

const GiftCardList = () => {
  const [giftCards, setGiftCards] = useState([]);

  useEffect(() => {
    fetchGiftCards();
  }, []);

  const fetchGiftCards = async () => {
    try {
      const data = await getGiftCardsList();
      setGiftCards(data);
    } catch (error) {
      console.error("Error fetching gift cards", error);
    }
  };

  const handleDelete = async (code) => {
    if (window.confirm("Are you sure you want to delete this gift card?")) {
      try {
        await deleteGiftCard(code);
        fetchGiftCards();
      } catch (error) {
        console.error("Error deleting gift card", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2>Gift Cards List</h2>

      <div className={styles.topNav}>
        <h3>Total Records: {giftCards.length}</h3>
        <Link to="/gift-cards/add" className={styles.addButton}>Add Gift card</Link>
      </div>

      <table className={styles.giftcardTable}>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Name</th>
            <th>Description</th>
            <th>Code</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {giftCards.map((giftCard, index) => {
            return (
              <tr key={giftCard.code}>
                <td>{index + 1}</td>
                <td>{giftCard.name}</td>
                <td>{giftCard.description || "N/A"}</td>
                <td>{giftCard.code}</td>
                <td>${giftCard.value.toFixed(2)}</td>
                <td className={styles.actionButtons}>
                  <Link to={`/gift-cards/edit/${giftCard.code}`} className={styles.editBtn}>Edit</Link>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(giftCard.code)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GiftCardList;
