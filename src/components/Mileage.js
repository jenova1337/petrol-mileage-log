import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

// Format date to Indian time (IST)
const formatDateToIST = (isoString) => {
  if (!isoString) return "-";
  const d = new Date(isoString);
  return d.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Mileage = ({ user }) => {
  const [bikes, setBikes] = useState([]);
  const [selectedBike, setSelectedBike] = useState("");
  const [rows, setRows] = useState([]);

  // Convert Firestore date to JS Date
  const parseDate = (val) => {
    if (!val) return new Date(0);
    if (typeof val === "object" && val.seconds) {
      return new Date(val.seconds * 1000);
    }
    return new Date(val);
  };

  // Convert value safely to number
  const toNum = (val) => {
    if (val === undefined || val === null || val === "") return NaN;
    const n = typeof val === "string" ? parseFloat(val) : Number(val);
    return isNaN(n) ? NaN : n;
  };

  // Load bikes initially
  useEffect(() => {
    const fetchBikes = async () => {
      const bikeSnap = await getDocs(collection(db, "users", user.uid, "bikes"));
      const bikeArr = [];
      bikeSnap.forEach((doc) => bikeArr.push(doc.data()));
      setBikes(bikeArr);
    };
    if (user) fetchBikes();
  }, [user]);

  const fetchMileageData = async (bikeName) => {
    if (!bikeName) {
      setRows([]);
      return;
    }

    const reservesSnap = await getDocs(
      collection(db, "users", user.uid, "reserves")
    );
    const petrolSnap = await getDocs(
      collection(db, "users", user.uid, "petrolLogs")
    );

    // Filter by bike
    const reserves = [];
    reservesSnap.forEach((doc) => {
      const data = doc.data();
      if (data.bike === bikeName) reserves.push(data);
    });
    reserves.sort((a, b) => parseDate(a.date) - parseDate(b.date));

    const petrols = [];
    petrolSnap.forEach((doc) => {
      const data = doc.data();
      if (data.bike === bikeName) petrols.push(data);
    });
    petrols.sort((a, b) => parseDate(a.date) - parseDate(b.date));

    const table = [];

    // Loop through reserve pairs
    for (let i = 0; i < reserves.length - 1; i++) {
      const before = reserves[i];
      const after = reserves[i + 1];

      // Petrol logs between these two reserve points
      const logsInBetween = petrols.filter(
        (p) =>
          parseDate(p.date) > parseDate(before.date) &&
          parseDate(p.date) < parseDate(after.date)
      );

      const petrolBetween =
        logsInBetween.length > 0
          ? logsInBetween[logsInBetween.length - 1]
          : null;

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

      // Push row data, include date column
      table.push({
        date: after.date,
        beforeKM: before.km || "-",
        petrolLitres: litresShow,
        afterKM: after.km || "-",
        mileage,
      });
    }

    setRows(table);
  };

  useEffect(() => {
    fetchMileageData(selectedBike);
    // eslint-disable-next-line
  }, [selectedBike]);

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h3>📊 Mileage Report</h3>

      <div
        style={{
          padding: 15,
          border: "2px solid #81d4fa",
          borderRadius: 10,
          backgroundColor: "#e1f5fe",
          marginBottom: 20,
        }}
      >
        <select
          value={selectedBike}
          onChange={(e) => setSelectedBike(e.target.value)}
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 6,
            marginBottom: 10,
          }}
        >
          <option value="">Select Bike</option>
          {bikes.map((b, i) => (
            <option key={i} value={b.name}>
              {b.name}
            </option>
          ))}
        </select>

        {selectedBike === "" ? (
          <p>ℹ️ Select a bike to view mileage logs.</p>
        ) : rows.length === 0 ? (
          <p>📭 Not enough Reserve + Petrol entries to calculate mileage.</p>
        ) : (
          <table
            border="1"
            cellPadding="6"
            style={{ borderCollapse: "collapse", width: "100%" }}
          >
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date</th>
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
                  <td>{formatDateToIST(r.date)}</td>
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
    </div>
  );
};

export default Mileage;
