import React, { useState } from "react";
import styles from "./modal.module.css";

const AddOutflowModal = ({ isOpen, onClose, onSuccess }) => {
  const BASE_URL = "https://budgetit-backend.onrender.com";
  const [form, setForm] = useState({
    name: "",
    amount: "",
    type: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("userEmail");

    try {
      const response = await fetch(`${BASE_URL}/api/finance/outflow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          email
        })
      });

      if (!response.ok) throw new Error("Failed to add outflow");

      onSuccess();
      onClose();

    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Add Expense</h2>

        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Expense name" onChange={handleChange} required />
            <input name="amount" type="number" placeholder="Amount" onChange={handleChange} required />
            <select name="type" onChange={handleChange} required>
                <option value="">Select Expense Type</option>
                <option value="FIXED_EXPENSES">FIXED EXPENSES</option>
                <option value="VARIABLE_EXPENSES">VARIABLE EXPENSES</option>
            </select>

          <div className={styles.actions}>
            <button type="submit" className={styles.add}>Add</button>
            <button type="button" onClick={onClose} className={styles.cancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOutflowModal;