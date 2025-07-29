import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Mileage = ({ user }) => {
  const [rows, setRows] = useState([]);

  // Convert Firestore date (string or timestamp) to JS Date
  const parseDate = (value) => {
    if (!value) return new Date(0);
    if (typeof value === "object" && value.seconds) {
      return new Date(value.seconds * 1000);
    }
    return new Date(value);
  };

  // Convert to number safely
  const toNum = (val) => {
    if (val === undefined || val === null || val === "") return NaN;
    const n = typeof val === "string" ? parseFloat(val) : Number(val);
    return isNaN(n) ? NaN : n;
  };

  const fetchData = async () => {
    // Fetch reserves and petrol logs
    const reservesSnap = await getDocs(collection(db, "users", user.uid, "reserves"));
    const petrolSnap = await getDocs(collection(db, "users", user.uid, "petrolLogs"));

    const reserves = [];
    reservesSnap.forEach((doc) => reserves.push(doc.data()));
    reserves.sort((a, b) => parseDate(a.date) - parseDate(b.date));

    const petrols = [];
    petrolSnap.forEach((doc) => petrols.push(doc.data()));
    petrols.sort((a, b) => parseDate(a.date) - parseDate(b.date));

    const table = [];

    for (let i = 0; i < reserves.length - 1; i++) {
      const before = reserves[i];
      const after = reserves[i + 1];

      // All petrol entries between these two reserve points
      const logsInBetween = petrols.filter(
        (p) =>
          parseDate(p.date) > parseDate(before.date) &&
          parseDate(p.date) < parseDate(after.date)
      );

      // Use the latest petrol entry between these reserves
      const petrolBetween =
        logsInBetween.length > 0 ? logsInBetween[logsInBetween.length - 1] : null;

      let mileage = "-";
      let litresShow = "-";

      if (petrolBetween) {
        // Show litres directly
        litresShow = petrolBetween.litres ?? "-";

        // Convert to numbers for calculation
        const beforeKM = toNum(before.km);
        const afterKM = toNum(after.km);
        const litres = toNum(petrolBetween.litres);

        if (
          !isNaN(beforeKM) &&
          !isNaN(afterKM) &&
          !isNaN(litres) &&
          litres > 0 &&
          afterKM > beforeKM
        ) {
          mileage = ((afterKM - beforeKM) / litres).toFixed(2);
        }
      }

      table.push({
        beforeKM: before.km || "-",
        petrolLitres: litresShow,
        afterKM: after.km || "-",
        mileage,
      });
    }

    setRows(table);
  };

  useEffect(() => {
    if (user) fetchData();
    // eslint-disable-next-line
  }, [user]);

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#e1f5fe",
        border: "2px solid #81d4fa",
        borderRadius: "10px",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      <h3>📊 Mileage Report</h3>
      {rows.length > 0 ? (
        <table border="1" cellPadding="6" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Before Reserve KM</th>
              <th>Petrol Poured (L)</th>
              <th>After Reserve KM</th>
              <th>KM/Litre</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{r.beforeKM}</td>
                <td>{r.petrolLitres}</td>
                <td>{r.afterKM}</td>
                <td>{r.mileage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>📭 No Reserve + Petrol entries found.</p>
      )}
    </div>
  );
};

export default Mileage;
