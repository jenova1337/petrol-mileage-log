import React, { useEffect, useState } from "react";
import db from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../auth/useAuth";

const Mileage = () => {
  const { user } = useAuth();
  const [reserves, setReserves] = useState([]);
  const [petrols, setPetrols] = useState([]);
  const [mileageData, setMileageData] = useState([]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    const reservesSnap = await getDocs(collection(db, "users", user.uid, "reserves"));
    const petrolSnap = await getDocs(collection(db, "users", user.uid, "petrolLogs"));

    const reservesArr = [];
    reservesSnap.forEach((doc) => reservesArr.push(doc.data()));
    reservesArr.sort((a, b) => new Date(a.date) - new Date(b.date));

    const petrolArr = [];
    petrolSnap.forEach((doc) => petrolArr.push(doc.data()));
    petrolArr.sort((a, b) => new Date(a.date) - new Date(b.date));

    setReserves(reservesArr);
    setPetrols(petrolArr);

    const mileageResults = [];

    for (let i = 0; i < reservesArr.length - 1; i++) {
      const before = reservesArr[i];
      const after = reservesArr[i + 1];

      // Find latest petrol entry between two reserves
      const petrolBetween = petrolArr
        .filter(
          (p) =>
            new Date(p.date) > new Date(before.date) &&
            new Date(p.date) < new Date(after.date)
        )
        .pop();

      if (before && after && petrolBetween) {
        const distance = parseFloat(after.km) - parseFloat(before.km);
        const litres = parseFloat(petrolBetween.litres);
        const mileage = (distance / litres).toFixed(2);
        mileageResults.push({
          beforeKM: before.km,
          petrolLitres: litres,
          afterKM: after.km,
          mileage,
        });
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
      <button onClick={() => window.location.reload()} style={{ marginBottom: "10px" }}>
        🔙 Back to Dashboard
      </button>

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
        <p>📭 Not enough Reserve + Petrol entries to calculate mileage.</p>
      )}
    </div>
  );
};

export default Mileage;
