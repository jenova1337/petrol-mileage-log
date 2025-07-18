import React from "react";
import { useNavigate } from "react-router-dom";

const Instructions = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px", lineHeight: "1.7" }}>
      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginBottom: "20px",
          backgroundColor: "#007bff",
          color: "#fff",
          padding: "8px 20px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
        }}
      >
        ⬅️ Back to Dashboard
      </button>

      <h2>📖 Instructions / வழிமுறைகள்</h2>

      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h3>🔧 Usage Guide (English)</h3>
        <ul>
          <li>
            <strong>Reserve Entry:</strong> When your bike reaches reserve,
            immediately add the KM in the <strong>Reserve Alert</strong> tab.
          </li>
          <li>
            <strong>Petrol Fill Entry:</strong> After pouring petrol, add the
            details (₹ rate, amount, KM) in the <strong>Petrol Pump</strong> tab.
          </li>
          <li>
            <strong>Next Reserve:</strong> When reserve comes again, add that in{" "}
            <strong>Reserve Alert</strong>.
          </li>
          <li>
            <strong>Mileage:</strong> Only if the correct sequence{" "}
            <strong>Reserve → Petrol → Reserve</strong> is entered, your mileage
            will be calculated correctly.
          </li>
        </ul>

        <h3 style={{ marginTop: "25px" }}>🔤 தமிழில் வழிமுறைகள்</h3>
        <ul>
          <li>
            <strong>ரிசர்வ் (Reserve):</strong> உங்கள் பைக்கில் ரிசர்வ் வந்த உடனே,{" "}
            <strong>Reserve Alert</strong> பகுதியில் அந்த கிலோமீட்டரை சேர்க்கவும்.
          </li>
          <li>
            <strong>பெட்ரோல் ஊட்டம்:</strong> பெட்ரோல் ஊட்டியவுடன்,{" "}
            <strong>Petrol Pump</strong> பகுதியில் விலை (₹), அளவு (₹), தற்போது உள்ள
            கி.மீ ஆகியவற்றை உள்ளிடவும்.
          </li>
          <li>
            <strong>அடுத்த ரிசர்வ்:</strong> மீண்டும் ரிசர்வ் வந்ததும், அதை{" "}
            <strong>Reserve Alert</strong> பகுதியில் சேர்க்கவும்.
          </li>
          <li>
            <strong>மைலேஜ் கணக்கீடு:</strong>{" "}
            <strong>Reserve → Petrol → Reserve</strong> என்கிற வரிசை சரியாக
            இருந்தால்தான், மைலேஜ் துல்லியமாக கணிக்கப்படும்.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Instructions;
