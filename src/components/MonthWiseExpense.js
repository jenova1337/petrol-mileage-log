import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import useAuth from "../auth/useAuth";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

  const downloadMonthWisePDF = () => {
    if (Object.keys(monthWiseSummary).length === 0) {
      alert("No data to download!");
      return;
    }

    const doc = new jsPDF();
    doc.text("Month-wise Petrol Expense", 14, 10);

    const rows = Object.entries(monthWiseSummary).map(([month, totals], index) => [
      index + 1,
      formatMonth(month),
      totals.litres.toFixed(2),
      totals.amount.toFixed(2),
    ]);

    autoTable(doc, {
      startY: 20,
      head: [["S.No", "Month", "Total Litres", "Total Amount ₹"]],
      body: rows,
      theme: "grid",
    });

    doc.save("MonthWiseExpense.pdf");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📅 Month-wise Expense</h2>

      {Object.keys(monthWiseSummary).length === 0 && (
        <p>📭 No data available.</p>
      )}

      {Object.keys(monthWiseSummary).length > 0 && (
        <>
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

          <button
            onClick={downloadMonthWisePDF}
            style={{ marginTop: "15px", padding: "8px" }}
          >
            📄 Download PDF
          </button>
        </>
      )}
    </div>
  );
};

export default MonthWiseExpense;
