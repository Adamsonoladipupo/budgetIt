
import React from "react";
import styles from "./dashboard.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AddInflowModal from "../components/AddInflowModal";
import AddOutflowModal from "../components/AddOutflowModal";
import Logo from "../assets/logo.png"

const Dashboard = () => {
  const BASE_URL = "https://budgetit-backend.onrender.com";
  const [ dashboardData, setDashboardData] = useState(null);
  const [ loading , setLoading ] = useState(true);
  const [showInflowModal, setShowInflowModal] = useState(false);
  const [showOutflowModal, setShowOutflowModal] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("userEmail")

    if (!email) {
        console.error("No email found");
        return;
    }

    fetch(`${BASE_URL}/api/finance/dashboard/full?email=${email}`)
    .then((response) => {
      if(!response.ok){
        throw new Error ("Failed to fetch user data")
      }
      return response.json();
    })
    .then((data) => {
      console.log("Dashboard Data:", data);
      setDashboardData(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
    });

 }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (!dashboardData) return <p>No data found</p>;


  const deleteInflow = async (id) => {
    const email = localStorage.getItem("userEmail");

    try {
      const response = await fetch(
        `${BASE_URL}/api/finance/inflow/${id}?email=${email}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Failed to delete inflow");
      setDashboardData((before) => ({
        ...before,
        inflows: before.inflows.filter(item => item.id !== id),
        totalInflow: before.totalInflow - before.inflows.find(i => i.id === id).amount,
        balance: before.balance - before.inflows.find(i => i.id === id).amount
      }));

    } catch (error) {
      console.error(error);
    }
  };


  const deleteOutflow = async (id) => {
    const email = localStorage.getItem("userEmail");

    try {
      const response = await fetch(
        `${BASE_URL}/api/finance/outflow/${id}?email=${email}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Failed to delete outflow");

      setDashboardData((before) => ({
        ...before,
        outflows: before.outflows.filter(item => item.id !== id),
        totalOutflow: before.totalOutflow - before.outflows.find(i => i.id === id).amount,
        balance: before.balance + before.outflows.find(i => i.id === id).amount
      }));

    } catch (error) {
      console.error(error);
    }
  };

  const fetchDashboard = () => {
    const email = localStorage.getItem("userEmail");

    fetch(`${BASE_URL}/api/finance/dashboard/full?email=${email}`)
      .then(res => res.json())
      .then(data => setDashboardData(data));
  };


  return (
    <div className={styles.dashboard}>

      <aside className={styles.sidebar}>
        <span className={styles.logo}>
          <img src={Logo} alt="logo" />
          <h2 >BudgetIt</h2>
        </span>
        

        <div className={styles.profile}>
          <img src="https://avatars.githubusercontent.com/u/75829183?v=4&size=64" alt="user" />
          <h3>{dashboardData.name}</h3>
          <span className={styles.badge}>PREMIUM USER</span>
        </div>

        <nav className={styles.menu}>
            <ul>
                <li className={styles.active}><Link to="/dashboard">Dashboard</Link></li>
                <li><Link>Reports</Link></li>
            </ul>
        </nav>

        <div className={styles.bottom}>
            <ul>
                <li><Link>Settings</Link></li>
                <li><Link to="/signin">Log out</Link></li>
            </ul>
        </div>
      </aside>

      <main className={styles.main}>

        <div className={styles.topbar}>
          <input placeholder="Search Something..." />
        </div>

        <div className={styles.cards}>

          <div className={styles.balanceCard}>
            <h4>My Balance</h4>
            <h1>₦{dashboardData.balance}</h1>

            <div className={styles.actions}>
              <button className={styles.income} onClick={()=> setShowInflowModal(true)}>Add Income</button>
              <button className={styles.expense} onClick={() => setShowOutflowModal(true)}>Add Expense</button>
            </div>
          </div>

          <div className={styles.smallCard}>
            <h4>Total Inflow</h4>
            <h2>₦{dashboardData.totalInflow}</h2>
          </div>

          <div className={styles.smallCard}>
            <h4>Total Outflow</h4>
            <h2>₦{dashboardData.totalOutflow}</h2>
          </div>
        </div>

        <div className={`${styles.transactions} ${styles.inflowTrans}`}>
          <h3>Inflow History</h3>

          <div className={styles.tableHeader}>
            <span>TIME</span>
            <span>ACCOUNT</span>
            <span>TRANSACTION ID</span>
            <span>AMOUNT</span>
          </div>

          {dashboardData.inflows.map((item, index) => (
            <div className={styles.row} key={index}>
              <span>{item.createdAt}</span>
              <span>{item.name}</span>
              <span>{item.id}</span>
              <span>₦{item.amount}</span>
              <span><button className={styles.deleteButton} onClick={()=> deleteInflow(item.id)}>Delete</button></span>
            </div>
          ))}
        </div>

        <div className={`${styles.transactions} ${styles.outflowTrans}`}>
          <h3>Outflow History</h3>

          <div className={styles.tableHeader}>
            <span>TIME</span>
            <span>ACCOUNT</span>
            <span>TRANSACTION ID</span>
            <span>AMOUNT</span>
          </div>

          {dashboardData.outflows.map((item, index) => (
            <div className={styles.row} key={index}>
              <span>{item.createdAt}</span>
              <span>{item.name}</span>
              <span>{item.id}</span>
              <span>₦{item.amount}</span>
              <span><button className={styles.deleteButton} onClick={()=> deleteOutflow(item.id)}>Delete</button></span>
            </div>
          ))}
        </div>

      </main>

      <AddInflowModal
        isOpen={showInflowModal}
        onClose={() => setShowInflowModal(false)}
        onSuccess={fetchDashboard}
      />

      <AddOutflowModal
        isOpen={showOutflowModal}
        onClose={() => setShowOutflowModal(false)}
        onSuccess={fetchDashboard}
      />
    </div>
  );
};

export default Dashboard;

