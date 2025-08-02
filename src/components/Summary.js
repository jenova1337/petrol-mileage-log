import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import useAuth from "../auth/useAuth"; // Get current logged in user

const Summary = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [weeklySummary, setWeeklySummary] = useState({});
  const [monthlySummary, setMonthlySummary] = useState({});
  const [monthWiseSummary, setMonthWiseSummary] = useState({}); // NEW
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (user) fetchPetrolLogs();
  }, [user]);

  const fetchPetrolLogs = async () => {
    const querySnapshot = await getDocs(
      collection(db, "users", user.uid, "petrolLogs")
    );
    const logs = [];
    querySnapshot.forEach((doc) => logs.push(doc.data()));
    setData(logs);
    calculateSummaries(logs);
    calculateMonthWiseSummaries(logs);
  };

  const calculateSummaries = (logs) => {
    const now = new Date();
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(now.getDate() - 7);
    const oneMonthAgo = new Date(now);
    oneMonthAgo.setMonth(now.getMonth() - 1);

    const weekly = {};
    const monthly = {};

    logs.forEach((log) => {
      const logDate = new Date(log.date);
      const km = parseFloat(log.km || 0);
      const amount = parseFloat(log.amount || 0);

      // Weekly
      if (logDate >= oneWeekAgo) {
        if (!weekly[log.bike]) weekly[log.bike] = { km: 0, amount: 0 };
        weekly[log.bike].km += km;
        weekly[log.bike].amount += amount;
      }

      // Monthly (last 30 days)
      if (logDate >= oneMonthAgo) {
        if (!monthly[log.bike]) monthly[log.bike] = { km: 0, amount: 0 };
        monthly[log.bike].km += km;
        monthly[log.bike].amount += amount;
      }
    });

    setWeeklySummary(weekly);
    setMonthlySummary(monthly);
  };

  // NEW: month-wise totals grouped by YYYY-MM
  const calculateMonthWiseSummaries = (logs) => {
    const monthWise = {};

    logs.forEach((log) => {
      const logDate = new Date(log.date);
      const monthKey =
        logDate.getFullYear() +
        "-" +
        String(logDate.getMonth() + 1).padStart(2, "0");

      if (!monthWise[monthKey]) monthWise[monthKey] = {};

      if (!monthWise[monthKey][log.bike]) {
        monthWise[monthKey][log.bike] = { litres: 0, amount: 0 };
      }

      monthWise[monthKey][log.bike].litres += parseFloat(log.litres || 0);
      monthWise[monthKey][log.bike].amount += parseFloat(log.amount || 0);
    });

    setMonthWiseSummary(monthWise);
  };

  const groupByBike = () => {
    const grouped = {};
    data.forEach((log, index) => {
      if (!grouped[log.bike]) grouped[log.bike] = [];
      grouped[log.bike].push({ ...log, index: index + 1 });
    });
    return grouped;
  };

  const downloadSummaryPDF = () => {
    if (!data || data.length === 0) {
      alert("No summary data to download!");
      return;
    }

    const doc = new jsPDF();
    doc.text("Petrol Usage Summary", 14, 10);

    let finalY = 20;
    const grouped = groupByBike();

    Object.entries(grouped).forEach(([bike, logs]) => {
      doc.text(`Bike: ${bike}`, 14, finalY);
      finalY += 5;

      const rows = logs.map((log, index) => [
        index + 1,
        new Date(log.date).toLocaleDateString("en-GB"),
        log.rate,
        log.amount,
        log.litres,
        log.km,
      ]);

      autoTable(doc, {
        startY: finalY,
        head: [["S.No", "Date", "Rate ₹", "Amount ₹", "Litres", "KM"]],
        body: rows,
        theme: "grid",
      });

      finalY = doc.lastAutoTable.finalY + 10;
    });

    doc.save("SummaryLog.pdf");
  };

  // NEW: Download Month-wise Summary PDF
  const downloadMonthWisePDF = () => {
    if (!monthWiseSummary || Object.keys(monthWiseSummary).length === 0) {
      alert("No month-wise data to download!");
      return;
    }

    const doc = new jsPDF();
    doc.text("Month-wise Petrol Totals", 14, 10);

    let finalY = 20;
    const rows = [];

    Object.entries(monthWiseSummary).forEach(([month, bikes]) => {
      Object.entries(bikes).forEach(([bike, sum]) => {
        rows.push([month, bike, sum.litres.toFixed(2), sum.amount.toFixed(2)]);
      });
    });

    autoTable(doc, {
      startY: finalY,
      head: [["Month", "Bike", "Litres", "Amount ₹"]],
      body: rows,
      theme: "grid",
    });

    doc.save("MonthWiseSummary.pdf");
  };

  const bikeLogs = groupByBike();

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Summary</h2>

      {Object.keys(bikeLogs).length === 0 && <p>📭 No data to show.</p>}

      {Object.entries(bikeLogs).map(([bike, logs]) => (
        <div key={bike} style={{ marginBottom: "30px" }}>
          <h3>{bike}</h3>
          <table border="1" cellPadding="6">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Petrol ₹</th>
                <th>Amount ₹</th>
                <th>Litres</th>
                <th>Total KM</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{new Date(log.date).toLocaleDateString("en-GB")}</td>
                  <td>{log.rate}</td>
                  <td>{log.amount}</td>
                  <td>{log.litres}</td>
                  <td>{log.km}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <button
        onClick={() => setShowSummary(!showSummary)}
        style={{ marginTop: 10 }}
      >
        {showSummary ? "Hide" : "Show"} Weekly & Monthly Summary
      </button>

      {showSummary && (
        <>
          <h4>🗓️ Weekly Summary</h4>
          <ul>
            {Object.entries(weeklySummary).map(([bike, sum]) => (
              <li key={bike}>
                {bike} – KM: {sum.km} | ₹: {sum.amount}
              </li>
            ))}
          </ul>

          <h4>📅 Monthly Summary (last 30 days)</h4>
          <ul>
            {Object.entries(monthlySummary).map(([bike, sum]) => (
              <li key={bike}>
                {bike} – KM: {sum.km} | ₹: {sum.amount}
              </li>
            ))}
          </ul>

          {/* NEW: Month-wise Totals */}
          <div
            style={{
              border: "2px solid #000",
              padding: "10px",
              marginTop: "20px",
            }}
          >
            <h4>📅 Month-wise Totals</h4>
            <table border="1" cellPadding="6">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Bike</th>
                  <th>Total Litres</th>
                  <th>Total Amount ₹</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(monthWiseSummary).map(([month, bikes]) =>
                  Object.entries(bikes).map(([bike, sum], idx) => (
                    <tr key={month + bike}>
                      <td>{month}</td>
                      <td>{bike}</td>
                      <td>{sum.litres.toFixed(2)}</td>
                      <td>{sum.amount.toFixed(2)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <button onClick={downloadMonthWisePDF} style={{ marginTop: 10 }}>
              📄 Download Month-wise Summary PDF
            </button>
          </div>
        </>
      )}

      <button onClick={downloadSummaryPDF} style={{ marginTop: 10 }}>
        📄 Download Detailed Summary PDF
      </button>
    </div>
  );
};

export default Summary;
