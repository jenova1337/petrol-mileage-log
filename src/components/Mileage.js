import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Mileage = ({ user }) => {
  const [bikeId, setBikeId] = useState("");
  const [bikes, setBikes] = useState([]);
  const [rows, setRows] = useState([]);

  const parseDate = (v) =>
    v && v.seconds ? new Date(v.seconds * 1000) : new Date(v);

  const toNum = (val) => {
    const n = parseFloat(val);
    return isNaN(n) ? NaN : n;
  };

  const fetchBikes = async () => {
    const snap = await getDocs(collection(db, "users", user.uid, "bikes"));
    const arr = [];
    snap.forEach((doc) => arr.push({ id: doc.id, ...doc.data() }));
    setBikes(arr);
  };

  const fetchData = async (bikeId) => {
    const reservesSnap = await getDocs(
      collection(db, "users", user.uid, "bikes", bikeId, "reserves")
    );
    const petrolSnap = await getDocs(
      collection(db, "users", user.uid, "bikes", bikeId, "petrolLogs")
    );

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
      const logs = petrols.filter(
        (p) => parseDate(p.date) > parseDate(before.date) &&
               parseDate(p.date) < parseDate(after.date)
      );
      const petrol = logs.length > 0 ? logs[logs.length - 1] : null;

      let mileage = "-";
      let litresShow = petrol ? petrol.litres : "-";

      if (petrol) {
        const beforeKM = toNum(before.km);
        const afterKM = toNum(after.km);
        const litres = toNum(petrol.litres);

        if (!isNaN(beforeKM) && !isNaN(afterKM) && !isNaN(litres) && litres > 0) {
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
    if (user) fetchBikes();
  }, [user]);

  return (
    <div style={{ padding: 20 }}>
      <h3>📊 Mileage</h3>

      <select
        value={bikeId}
        onChange={(e) => {
          setBikeId(e.target.value);
          fetchData(e.target.value);
        }}
      >
        <option value="">Select Bike</option>
        {bikes.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>

      {rows.length === 0 ? (
        <p>No data yet.</p>
      ) : (
        <table border="1" cellPadding="6" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Before Reserve KM</th>
              <th>Petrol Poured (L)</th>
              <th>After Reserve KM</th>
              <th>Mileage</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
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
