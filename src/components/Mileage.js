import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Mileage = ({ user }) => {
  const [mileageData, setMileageData] = useState([]);

  // Helper: convert Firebase date field to JS Date
  const parseDate = (val) => {
    if (!val) return new Date(0);
    if (typeof val === "string") return new Date(val);
    if (typeof val === "object" && val.seconds) {
      return new Date(val.seconds * 1000);
    }
    return new Date(val);
  };

  // Helper: ensure numeric conversion
  const toNum = (val) => {
    if (val === undefined || val === null) return 0;
    return isNaN(Number(val)) ? 0 : Number(val);
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [user]);

  const fetchData = async () => {
    const reservesSnap = await getDocs(
      collection(db, "users", user.uid, "reserves")
    );
    const petrolSnap = await getDocs(
      collection(db, "users", user.uid, "petrolLogs")
    );

    // Prepare arrays
    const reservesArr = [];
    reservesSnap.forEach((doc) => reservesArr.push(doc.data()));
    reservesArr.sort((a, b) => parseDate(a.date) - parseDate(b.date));

    const petrolArr = [];
    petrolSnap.forEach((doc) => petrolArr.push(doc.data()));
    petrolArr.sort((a, b) => parseDate(a.date) - parseDate(b.date));

    const results = [];

    // Loop over reserve entries
    for (let i = 0; i < reservesArr.length - 1; i++) {
      const before = reservesArr[i];
      const after = reservesArr[i + 1];

      // find petrol entries between before.date and after.date
      const between = petrolArr.filter(
        (p) =>
          parseDate(p.date) > parseDate(before.date) &&
          parseDate(p.date) < parseDate(after.date)
      );

      if (between.length === 0) continue;

      // Use the last petrol entry between these reserves
      const petrol = between[between.length - 1];

      const beforeKM = toNum(before.km);
      const afterKM = toNum(after.km);
      const litres = toNum(petrol.litres);

      if (litres > 0 && afterKM > beforeKM) {
        const distance = afterKM - beforeKM;
        const mileage = (distance / litres).toFixed(2);

        results.push({
          beforeKM,
          petrolLitres: litres,
          afterKM,
          mileage,
        });
      }
    }

    setMileageData(results);
  };

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
      {mileageData.length > 0 ? (
        <table border="1" cellPadding="6" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Before Reserve KM</th>
              <th>Petrol Poured (L)</th>
              <th>After Reserve KM</th>
              <th>Mileage (KM/L)</th>
            </tr>
          </thead>
          <tbody>
            {mileageData.map((row, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{row.beforeKM}</td>
                <td>{row.petrolLitres}</td>
                <td>{row.afterKM}</td>
                <td>{row.mileage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>📭 Not enough data (Reserve → Petrol → Reserve) to calculate mileage.</p>
      )}
    </div>
  );
};

export default Mileage;
