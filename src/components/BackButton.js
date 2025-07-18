import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div style={{ marginBottom: "20px" }}>
      <button
        onClick={() => navigate("/dashboard")}
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          padding: "8px 16px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        ⬅️ Back to Dashboard
      </button>
    </div>
  );
};

export default BackButton;
