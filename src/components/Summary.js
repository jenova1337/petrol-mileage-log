// Summary.js - React component
import React, { useEffect, useState } from "react";

const Summary = () => {
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

  const bikeLogs = groupByBike();

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Summary</h2>
      {Object.keys(bikeLogs).length === 0 && <p>No data to show.</p>}

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
                  <td>{log.date}</td>
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

      <button onClick={() => setShowSummary(!showSummary)}>
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

          <h4>📅 Monthly Summary</h4>
          <ul>
            {Object.entries(monthlySummary).map(([bike, sum]) => (
              <li key={bike}>
                {bike} – KM: {sum.km} | ₹: {sum.amount}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Summary;
