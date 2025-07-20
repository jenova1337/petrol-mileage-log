import React from "react";

const Instructions = () => {
  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <h2>📘 Instructions / வழிமுறைகள்</h2>
      <ul style={{ lineHeight: "1.8" }}>
        <li>
          ➡️ <strong>Add Bike:</strong> First, add your bikes in the Add Bike tab. <br />
          ➡️ <strong>பைக் சேர்க்கவும்:</strong> முதலில் உங்கள் பைக்குகளை "Add Bike" டேபில் சேர்க்கவும்.
        </li>
        <li>
          🔔 <strong>Reserve Alert:</strong> When fuel goes to reserve, note the KM in the Reserve Alert tab. <br />
          🔔 <strong>ரிசர்வ் அலர்ட்:</strong> பெட்ரோல் ரிசர்வ் ஆகும் போது கிலோமீட்டரை "Reserve Alert" டேபில் பதிவு செய்யவும்.
        </li>
        <li>
          ⛽ <strong>Petrol Pump:</strong> When filling petrol, enter rate, amount, and KM. <br />
          ⛽ <strong>பெட்ரோல் பம்ப்:</strong> பெட்ரோல் போடும் போது விலை, தொகை, மற்றும் கிலோமீட்டரை பதிவு செய்யவும்.
        </li>
        <li>
          📊 <strong>Mileage:</strong> Calculated automatically between two reserve entries using one petrol fill. <br />
          📊 <strong>மைலேஜ்:</strong> இரண்டு ரிசர்வ் இடுகைகளுக்கு இடையில் ஒரு பெட்ரோல் பதிவு கொண்டு கணக்கிடப்படும்.
        </li>
        <li>
          📈 <strong>Summary:</strong> View all logs and totals per bike (Weekly, Monthly). <br />
          📈 <strong>சம்மரி:</strong> ஒவ்வொரு பைக்கிற்குமான பதிவுகள் மற்றும் மொத்தங்களை (வார, மாதம்) காணலாம்.
        </li>
        <li>
          📘 <strong>Help:</strong> Use this Instructions tab for guidance any time. <br />
          📘 <strong>உதவி:</strong> எப்போது வேண்டுமானாலும் இந்த "Instructions" டேபை உதவிக்காகப் பயன்படுத்தவும்.
        </li>
      </ul>
    </div>
  );
};

export default Instructions;
