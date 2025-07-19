import React, { useEffect, useState } from "react";

const Mileage = () => {
  const [mileageLogs, setMileageLogs] = useState([]);

  useEffect(() => {
    const reserves = JSON.parse(localStorage.getItem("reserveAlerts") || "[]");
    const petrols = JSON.parse(localStorage.getItem("petrolLogs") || "[]");

    const results = [];

    for (let i = 0; i < reserves.length - 1; i++) {
      const beforeReserve = reserves[i];
      const afterReserve = reserves[i + 1];

      const matchingPetrol = petrols.find((p) => {
        const pTime = new Date(p.date).getTime();
        const beforeTime = new Date(beforeReserve.date).getTime();
        const afterTime = new Date(afterReserve.date).getTime();
        return pTime > beforeTime && pTime < afterTime && p.bike === beforeReserve.bike;
      });

      if (matchingPetrol) {
        const mileage = (
          (Number(afterReserve.reserveKm) - Number(beforeReserve.reserveKm)) /
          Number(matchingPetrol.litres)
        ).toFixed(2);

        results.push({
          bike: beforeReserve.bike,
          fromKm: beforeReserve.reserveKm,
          toKm: afterReserve.reserveKm,
          litres: matchingPetrol.litres,
          mileage,
          petrolDate: matchingPetrol.date,
        });
      }
    }

    setMileageLogs(results);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>📊 Mileage Report</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Bike</th>
            <th>From KM</th>
            <th>To KM</th>
            <th>Litres</th>
            <th>Petrol Date</th>
            <th>KM/L</th>
          </tr>
        </thead>
        <tbody>
          {mileageLogs.map((log, index) => (
            <tr key={index}>
              <td>{log.bike}</td>
              <td>{log.fromKm}</td>
              <td>{log.toKm}</td>
              <td>{log.litres}</td>
              <td>{log.petrolDate}</td>
              <td><strong>{log.mileage}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
};

export default Mileage;
