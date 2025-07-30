import React from "react";

const Instructions = () => {
  const boxStyle = {
    border: "2px solid #81d4fa",
    borderRadius: "10px",
    backgroundColor: "#e1f5fe",
    padding: "15px",
    marginBottom: "20px",
    maxWidth: "800px",
    margin: "20px auto",
    lineHeight: "1.6",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📘 Instructions / வழிமுறைகள்</h2>

      {/* English Instructions */}
      <div style={boxStyle}>
        <h3>Instructions (English)</h3>
        <ul>
          <li>
            <strong>Profile:</strong> Fill in your details. You can edit your
            name, age, gender, mobile number and change password anytime.
          </li>
          <li>
            <strong>Add Bike:</strong> First, add your bikes in the Add Bike tab.
            Each bike will have its own logs.
          </li>
          <li>
            <strong>Reserve Alert:</strong> When your fuel goes to reserve,
            select the bike and note the KM.
          </li>
          <li>
            <strong>Petrol Pump:</strong> When filling petrol, select bike and
            enter rate (₹/litre), amount (₹), and KM.
          </li>
          <li>
            <strong>Mileage:</strong> Mileage is calculated automatically
            between two reserve entries using the latest petrol log in between.
            Select bike to view results.
          </li>
          <li>
            <strong>Summary:</strong> Shows all petrol fill logs bike-wise with
            totals. Weekly and monthly summaries are also shown.
          </li>
          <li>
            <strong>Data per Bike:</strong> All logs, mileage and summaries are
            separate for each bike.
          </li>
          <li>
            <strong>PDF:</strong> Petrol Pump and Summary tabs allow downloading
            logs as PDF.
          </li>
          <li>
            Use this Instructions tab anytime for guidance.
          </li>
        </ul>
      </div>

      {/* Tamil Instructions */}
      <div style={boxStyle}>
        <h3>வழிமுறைகள் (தமிழ்)</h3>
        <ul>
          <li>
            <strong>சுயவிவரம்:</strong> உங்கள் பெயர், வயது, பாலினம், கைபேசி
            எண் ஆகியவற்றை நிரப்பவும். தேவையான போது திருத்தவும், கடவுச்சொல்லை
            மாற்றவும்.
          </li>
          <li>
            <strong>பைக் சேர்க்கவும்:</strong> முதலில் "Add Bike" டேபில் உங்கள்
            பைக்குகளை சேர்க்கவும். ஒவ்வொரு பைக்கும் தனிப்பட்ட பதிவுகள் இருக்கும்.
          </li>
          <li>
            <strong>ரிசர்வ் அலர்ட்:</strong> பெட்ரோல் ரிசர்வ் ஆனவுடன் பைக்
            தேர்வு செய்து கிலோமீட்டரை பதிவு செய்யவும்.
          </li>
          <li>
            <strong>பெட்ரோல் பம்ப்:</strong> பெட்ரோல் போடும் போது பைக் தேர்வு
            செய்து விலை (₹/லிட்டர்), தொகை (₹) மற்றும் கிலோமீட்டரை பதிவு செய்யவும்.
          </li>
          <li>
            <strong>மைலேஜ்:</strong> இரண்டு ரிசர்வ் இடுகைகளுக்கு இடையில் உள்ள
            பெட்ரோல் பதிவை கொண்டு தானாகவே மைலேஜ் கணக்கிடப்படும். பைக் தேர்வு
            செய்து பார்க்கலாம்.
          </li>
          <li>
            <strong>சம்மரி:</strong> ஒவ்வொரு பைக்கிற்குமான பெட்ரோல் பதிவுகள்,
            மொத்தம், வார மற்றும் மாதச் சுருக்கங்கள் காட்டப்படும்.
          </li>
          <li>
            <strong>பைக் தனித்தனியாக:</strong> ஒவ்வொரு பைக்கும் தனிப்பட்ட
            பதிவுகள், மைலேஜ், சம்மரி இருக்கும்.
          </li>
          <li>
            <strong>PDF:</strong> பெட்ரோல் பம்ப் மற்றும் சம்மரி டேபில் PDF
            பதிவிறக்கம் செய்யலாம்.
          </li>
          <li>
            எப்போதும் உதவிக்காக இந்த "Instructions" டேபை பயன்படுத்தலாம்.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Instructions;
