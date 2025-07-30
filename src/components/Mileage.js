import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Mileage = ({ user }) => {
  const [rows, setRows] = useState([]);
  const [bikes, setBikes] = useState([]);
  const [selectedBike, setSelectedBike] = useState("");

  const parseDate = (value) => {
    if (!value) return new Date(0);
    if (typeof value === "object" && value.seconds) {
      return new Date(value.seconds * 1000);
    }
    return new Date(value);
  };

  const toNum = (val) => {
    if (val === undefined || val === null || val === "") return NaN;
    const n = typeof val === "string" ? parseFloat(val) : Number(val);
    return isNaN(n) ? NaN : n;
  };

  const fetchData = async () => {
    // fetch bike list
    const bikesSnap = await getDocs(collection(db, "users", user.uid, "bikes"));
    const bikeArr = [];
    bikesSnap.forEach((doc) => bikeArr.push(doc.data()));
    setBikes(bikeArr);

    // fetch reserves & petrol logs
    const reservesSnap = await getDocs(collection(db, "users", user.uid, "reserves"));
    const petrolSnap = await getDocs(collection(db, "users", user.uid, "petrolLogs"));

    const reserves = [];
    reservesSnap.forEach((doc) => reserves.push(doc.data()));
    reserves.sort((a, b) => parseDate(a.date) - parseDate(b.date));

    const petrols = [];
    petrolSnap.forEach((doc) => petrols.push(doc.data()));
    petrols.sort((a, b) => parseDate(a.date) - parseDate(b.date));

    // group data by bike for later filtering
    const groupedRows = {};

    bikeArr.forEach((b) => {
      const bikeName = b.name;
      const rFiltered = reserves.filter((r) => r.bike === bikeName);
      const pFiltered = petrols.filter((p) => p.bike === bikeName);

      const table = [];
      for (let i = 0; i < rFiltered.length - 1; i++) {
        const before = rFiltered[i];
        const after = rFiltered[i + 1];

        const logsInBetween = pFiltered.filter(
          (p) =>
            parseDate(p.date) > parseDate(before.date) &&
            parseDate(p.date) < parseDate(after.date)
        );

        const petrolBetween =
          logsInBetween.length > 0 ? logsInBetween[logsInBetween.length - 1] : null;

        let mileage = "-";
        let litresShow = "-";

        if (petrolBetween) {
          litresShow = petrolBetween.litres ?? "-";

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

      groupedRows[bikeName] = table;
    });

    setRows(groupedRows);
  };

  useEffect(() => {
    if (user) fetchData();
    // eslint-disable-next-line
  }, [user]);

  const currentRows = selectedBike ? rows[selectedBike] || [] : [];

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

      <select
        value={selectedBike}
        onChange={(e) => setSelectedBike(e.target.value)}
        style={{ marginBottom: "15px" }}
      >
        <option value="">Select Bike</option>
        {bikes.map((b, i) => (
          <option key={i} value={b.name}>
            {b.name}
          </option>
        ))}
      </select>

      {!selectedBike ? (
        <p>Select a bike to see mileage.</p>
      ) : currentRows.length === 0 ? (
        <p>No mileage data for this bike.</p>
      ) : (
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
            {currentRows.map((r, idx) => (
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
      )}
    </div>
  );
};

export default Mileage;
