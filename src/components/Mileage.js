import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Mileage = ({ user }) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [user]);

  const parseDate = (dateValue) => {
    if (!dateValue) return new Date();
    if (typeof dateValue === "object" && dateValue.seconds) {
      return new Date(dateValue.seconds * 1000);
    }
    return new Date(dateValue);
  };

  const toNumber = (val) => {
    if (val === undefined || val === null || val === "") return NaN;
    const num = typeof val === "string" ? parseFloat(val) : Number(val);
    return isNaN(num) ? NaN : num;
  };

  const fetchData = async () => {
    const reservesSnap = await getDocs(collection(db, "users", user.uid, "reserves"));
    const petrolSnap = await getDocs(collection(db, "users", user.uid, "petrolLogs"));

    const reserves = [];
    reservesSnap.forEach((doc) => reserves.push(doc.data()));
    reserves.sort((a, b) => parseDate(a.date) - parseDate(b.date));

    const petrols = [];
    petrolSnap.forEach((doc) => petrols.push(doc.data()));
    petrols.sort((a, b) => parseDate(a.date) - parseDate(b.date));

    const tableRows = [];

    for (let i = 0; i < reserves.length - 1; i++) {
      const before = reserves[i];
      const after = reserves[i + 1];

      // Petrol between two reserves
      const petrolBetween = petrols
        .filter(
          (p) =>
            parseDate(p.date) > parseDate(before.date) &&
            parseDate(p.date) < parseDate(after.date)
        )
        .pop();

      // Always push raw data to table
      let mileage = "-";
      if (petrolBetween) {
        const beforeKM = toNumber(before.km);
        const afterKM = toNumber(after.km);
        const litres = toNumber(petrolBetween.litres);

        if (!isNaN(beforeKM) && !isNaN(afterKM) && !isNaN(litres) && litres > 0) {
          mileage = ((afterKM - beforeKM) / litres).toFixed(2);
        }
      }

      tableRows.push({
        beforeKM: before.km || "-",
        petrolLitres: petrolBetween ? petrolBetween.litres : "-",
        afterKM: after.km || "-",
        mileage,
      });
    }

    setRows(tableRows);
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
