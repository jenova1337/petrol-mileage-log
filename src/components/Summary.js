// src/components/Summary.js
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Summary = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [bikes, setBikes] = useState([]);
  const [weeklySummary, setWeeklySummary] = useState({});
  const [monthlySummary, setMonthlySummary] = useState({});
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("petrolLogs")) || [];
    const storedBikes = JSON.parse(localStorage.getItem("bikes")) || [];
    setData(storedData);
    setBikes(storedBikes);
    calculateSummaries(storedData);
  }, []);

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

      if (logDate >= oneWeekAgo) {
        if (!weekly[log.bike]) weekly[log.bike] = { km: 0, amount: 0 };
        weekly[log.bike].km += km;
        weekly[log.bike].amount += amount;
      }

      if (logDate >= oneMonthAgo) {
        if (!monthly[log.bike]) monthly[log.bike] = { km: 0, amount: 0 };
        monthly[log.bike].km += km;
        monthly[log.bike].amount += amount;
      }
    });

    setWeeklySummary(weekly);
    setMonthlySummary(monthly);
  };

  const groupByBike = () => {
    const grouped = {};
    data.forEach((log, index) => {
      if (!grouped[log.bike]) grouped[log.bike] = [];
      grouped[log.bike].push({ ...log, index: index + 1 });
    });
    return grouped;
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Petrol Log Summary", 14, 20);

    Object.entries(groupByBike()).forEach(([bike, logs], i) => {
      doc.setFontSize(14);
      doc.text(`${bike}`, 14, 30 + i * 70);
      const rows = logs.map((log, idx) => [
        idx + 1,
        log.date,
        log.rate,
        log.amount,
        log.litres,
        log.km,
      ]);
      doc.autoTable({
        startY: 35 + i * 70,
        head: [["S.No", "Date", "Petrol ₹", "Amount ₹", "Litres", "Total KM"]],
        body: rows,
      });
    });

    doc.save("summary.pdf");
  };

  const bikeLogs = groupByBike();

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", color: "#333" }}>
      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          backgroundColor: "#ddd",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        🔙 Back to Dashboard
      </button>

      <h2 style={{ color: "#2c3e50" }}>📊 Summary</h2>
      {Object.keys(bikeLogs).length === 0 && <p>No data to show.</p>}

      {Object.entries(bikeLogs).map(([bike, logs]) => (
        <div key={bike} style={{ marginBottom: "30px" }}>
          <h3 style={{ color: "#2980b9" }}>{bike}</h3>
          <table
            style={{ borderCollapse: "collapse", width: "100%", marginBottom: "10px" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#ecf0f1" }}>
                <th style={cellStyle}>S.No</th>
                <th style={cellStyle}>Date</th>
                <th style={cellStyle}>Petrol ₹</th>
                <th style={cellStyle}>Amount ₹</th>
                <th style={cellStyle}>Litres</th>
                <th style={cellStyle}>Total KM</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, idx) => (
                <tr key={idx}>
                  <td style={cellStyle}>{idx + 1}</td>
                  <td style={cellStyle}>{log.date}</td>
                  <td style={cellStyle}>{log.rate}</td>
                  <td style={cellStyle}>{log.amount}</td>
                  <td style={cellStyle}>{log.litres}</td>
                  <td style={cellStyle}>{log.km}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <button onClick={downloadPDF} style={buttonStyle}>📥 Download PDF</button>

      <button
        onClick={() => setShowSummary(!showSummary)}
        style={{ ...buttonStyle, marginLeft: "10px" }}
      >
        {showSummary ? "Hide" : "Show"} Weekly & Monthly Summary
      </button>

      {showSummary && (
        <div style={{ marginTop: "20px" }}>
          <h4 style={{ color: "#16a085" }}>🗓️ Weekly Summary</h4>
          <ul>
            {Object.entries(weeklySummary).map(([bike, sum]) => (
              <li key={bike}>
                {bike} – KM: {sum.km} | ₹: {sum.amount}
              </li>
            ))}
          </ul>

          <h4 style={{ color: "#8e44ad" }}>📅 Monthly Summary</h4>
          <ul>
            {Object.entries(monthlySummary).map(([bike, sum]) => (
              <li key={bike}>
                {bike} – KM: {sum.km} | ₹: {sum.amount}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const cellStyle = {
  border: "1px solid #ccc",
  padding: "6px",
  textAlign: "center",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#3498db",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "10px",
};

export default Summary;
