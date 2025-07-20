import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";
import { useAuth } from "../auth/useAuth";

const Summary = () => {
  const { user } = useAuth();
  const [log, setLog] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      if (!user?.uid) return;
      const querySnapshot = await getDocs(
        collection(db, "users", user.uid, "petrolLogs")
      );
      const logs = [];
      querySnapshot.forEach((doc) => logs.push(doc.data()));
      setLog(logs);
    };
    fetchLogs();
  }, [user]);

  const totalAmount = log.reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);

  return (
    <div style={{
      padding: "20px",
      backgroundColor: "#fff3e0",
      border: "2px solid #ffb74d",
      borderRadius: "10px",
      maxWidth: "900px",
      margin: "auto",
    }}>
      <h3>📈 Summary</h3>
      {log.length === 0 ? (
        <p>📭 No petrol logs found.</p>
      ) : (
        <>
          <table border="1" cellPadding="6" style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date</th>
                <th>Bike</th>
                <th>Rate ₹</th>
                <th>Amount ₹</th>
                <th>Litres</th>
              </tr>
            </thead>
            <tbody>
              {log.map((entry, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{entry.date}</td>
                  <td>{entry.bike}</td>
                  <td>{entry.rate}</td>
                  <td>{entry.amount}</td>
                  <td>{entry.litres}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ marginTop: "10px" }}>
            <strong>💰 Total Petrol ₹:</strong> ₹{totalAmount.toFixed(2)}
          </p>
        </>
      )}
    </div>
  );
};

export default Summary;
