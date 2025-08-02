import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import useAuth from "../auth/useAuth";

const MonthWiseExpense = () => {
  const { user } = useAuth();
  const [monthWiseSummary, setMonthWiseSummary] = useState({});

  useEffect(() => {
    if (user) fetchPetrolLogs();
  }, [user]);

  const fetchPetrolLogs = async () => {
    const querySnapshot = await getDocs(
      collection(db, "users", user.uid, "petrolLogs")
    );
    const logs = [];
    querySnapshot.forEach((doc) => logs.push(doc.data()));
    calculateMonthWiseSummaries(logs);
  };

  const calculateMonthWiseSummaries = (logs) => {
    const monthWise = {};

    logs.forEach((log) => {
      const logDate = new Date(log.date);
      const monthKey =
        logDate.getFullYear() +
        "-" +
        String(logDate.getMonth() + 1).padStart(2, "0");

      if (!monthWise[monthKey]) {
        monthWise[monthKey] = { litres: 0, amount: 0 };
      }

      monthWise[monthKey].litres += parseFloat(log.litres || 0);
      monthWise[monthKey].amount += parseFloat(log.amount || 0);
    });

    // Sort months descending
    const sorted = Object.keys(monthWise)
      .sort((a, b) => (a < b ? 1 : -1))
      .reduce((acc, key) => {
        acc[key] = monthWise[key];
        return acc;
      }, {});

    setMonthWiseSummary(sorted);
  };

  const formatMonth = (key) => {
    const [year, month] = key.split("-");
    const monthNames = [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December"
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📅 Month-wise Expense</h2>

      {Object.keys(monthWiseSummary).length === 0 && (
        <p>📭 No data available.</p>
      )}

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Month</th>
            <th>Total Litres</th>
            <th>Total Amount ₹</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(monthWiseSummary).map(([month, totals], index) => (
            <tr key={month}>
              <td>{index + 1}</td>
              <td>{formatMonth(month)}</td>
              <td>{totals.litres.toFixed(2)}</td>
              <td>{totals.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonthWiseExpense;
