import React, { useState } from "react";
import styles from "./modal.module.css";

const AddInflowModal = ({ isOpen, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    amount: "",
    type: ""
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = localStorage.getItem("userEmail");

    try {
      const response = await fetch("http://localhost:8080/api/finance/inflow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          email
        })
      });

      if (!response.ok) throw new Error("Failed to add inflow");

      onSuccess();
      onClose();  

    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Add Income</h2>

        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Income name" onChange={handleChange} required />
            <input name="amount" type="number" placeholder="Amount" onChange={handleChange} required />
            <select name="type" onChange={handleChange} required>
                <option value="">Select Income Type</option>
                <option value="SALARY">Salary</option>
                <option value="SIDE_HUSTLE">Side Hustle</option>
                <option value="GIFT">Gift</option>
            </select>

          <div className={styles.actions}>
            <button type="submit" className={styles.add}>Add</button>
            <button type="button" onClick={onClose} className={styles.cancel} >Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInflowModal;