import React, { useEffect, useState } from "react";

const Mileage = () => {
  const [mileageData, setMileageData] = useState([]);

  useEffect(() => {
    const reserves = JSON.parse(localStorage.getItem("reserveLog")) || [];
    const petrols = JSON.parse(localStorage.getItem("petrolLog")) || [];

    const sequences = [];
    let firstReserve = null;
    let petrolEntry = null;
    let secondReserve = null;

    for (let i = 0; i < reserves.length; i++) {
      const res = reserves[i];

      if (!firstReserve) {
        firstReserve = res;
      } else if (firstReserve && !petrolEntry) {
        // Find the latest petrol entry between the two reserves
        petrolEntry = petrols.find((p) => {
          return (
            new Date(p.date) > new Date(firstReserve.date) &&
            (!secondReserve || new Date(p.date) < new Date(res.date))
          );
        });
        secondReserve = res;

        if (firstReserve && petrolEntry && secondReserve) {
          const kmDiff =
            parseFloat(secondReserve.km) - parseFloat(firstReserve.km);
          const litres = parseFloat(petrolEntry.litres);
          const mileage = litres > 0 ? (kmDiff / litres).toFixed(2) : "N/A";

          sequences.push({
            beforeReserveKm: firstReserve.km,
            litres: petrolEntry.litres,
            afterReserveKm: secondReserve.km,
            mileage,
            date: secondReserve.date,
          });

          // Shift the window
          firstReserve = secondReserve;
          petrolEntry = null;
          secondReserve = null;
        }
      }
    }

    setMileageData(sequences);
  }, []);

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 700,
        margin: "auto",
        background: "#f9f9f9",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>📊 Mileage Report</h2>

      {mileageData.length === 0 ? (
        <p style={{ textAlign: "center" }}>No valid Reserve → Petrol → Reserve sequence found.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#eee" }}>
              <th style={cellStyle}>Before Reserve KM</th>
              <th style={cellStyle}>Petrol Poured (Litres)</th>
              <th style={cellStyle}>After Reserve KM</th>
              <th style={cellStyle}>Mileage (km/l)</th>
              <th style={cellStyle}>Date</th>
            </tr>
          </thead>
          <tbody>
            {mileageData.map((entry, index) => (
              <tr key={index}>
                <td style={cellStyle}>{entry.beforeReserveKm}</td>
                <td style={cellStyle}>{entry.litres}</td>
                <td style={cellStyle}>{entry.afterReserveKm}</td>
                <td style={cellStyle}>{entry.mileage}</td>
                <td style={cellStyle}>{entry.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const cellStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "center",
};

export default Mileage;
