import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Mileage = ({ user }) => {
  const [mileageData, setMileageData] = useState([]);

  useEffect(() => {
    if (user) fetchData();
    // eslint-disable-next-line
  }, [user]);

  const parseDate = (dateValue) => {
    // Firebase stored date could be string or Timestamp
    if (!dateValue) return new Date();
    if (typeof dateValue === "string") return new Date(dateValue);
    if (dateValue.seconds) return new Date(dateValue.seconds * 1000);
    return new Date(dateValue);
  };

  const toNumber = (val) => {
    if (!val) return 0;
    return typeof val === "string" ? parseFloat(val) : val;
  };

  const fetchData = async () => {
    const reservesSnap = await getDocs(collection(db, "users", user.uid, "reserves"));
    const petrolSnap = await getDocs(collection(db, "users", user.uid, "petrolLogs"));

    const reservesArr = [];
    reservesSnap.forEach((doc) => reservesArr.push(doc.data()));
    reservesArr.sort((a, b) => parseDate(a.date) - parseDate(b.date));

    const petrolArr = [];
    petrolSnap.forEach((doc) => petrolArr.push(doc.data()));
    petrolArr.sort((a, b) => parseDate(a.date) - parseDate(b.date));

    const mileageResults = [];

    for (let i = 0; i < reservesArr.length - 1; i++) {
      const before = reservesArr[i];
      const after = reservesArr[i + 1];

      // find petrol entry between these reserves
      const petrolBetween = petrolArr
        .filter(
          (p) =>
            parseDate(p.date) > parseDate(before.date) &&
            parseDate(p.date) < parseDate(after.date)
        )
        .pop();

      if (before && after && petrolBetween) {
        const beforeKM = toNumber(before.km);
        const afterKM = toNumber(after.km);
        const litres = toNumber(petrolBetween.litres);

        if (litres > 0 && afterKM > beforeKM) {
          const distance = afterKM - beforeKM;
          const mileage = (distance / litres).toFixed(2);

          mileageResults.push({
            beforeKM,
            petrolLitres: litres,
            afterKM,
            mileage,
          });
        }
      }
    }

    setMileageData(mileageResults);
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
              <th>KM/Litre</th>
            </tr>
          </thead>
          <tbody>
            {mileageData.map((m, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{m.beforeKM}</td>
                <td>{m.petrolLitres}</td>
                <td>{m.afterKM}</td>
                <td>{m.mileage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>📭 Not enough data to calculate mileage.</p>
      )}
    </div>
  );
};

export default Mileage;
