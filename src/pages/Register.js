import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await API.post("/api/auth/signup", { email, password });
      alert(res.data.message || "Registered successfully");
      navigate("/");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 90px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          background: "white",
          width: "420px",
          padding: "32px",
          borderRadius: "24px",
          boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
          border: "1px solid #e5e7eb",
          textAlign: "center",
        }}
      >
        <img
  src="/logo.png"
  alt="TradeSphere Logo"
  style={{
    width: "110px",
    height: "110px",
    objectFit: "contain",
    marginBottom: "14px",
  }}
/>

        <h2
          style={{
            marginTop: 0,
            marginBottom: "22px",
            fontSize: "34px",
            color: "#111827",
          }}
        >
          Register
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "14px 16px",
              borderRadius: "14px",
              border: "1px solid #d1d5db",
              outline: "none",
              fontSize: "16px",
              background: "#f9fafb",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "14px 16px",
              borderRadius: "14px",
              border: "1px solid #d1d5db",
              outline: "none",
              fontSize: "16px",
              background: "#f9fafb",
            }}
          />

          <button
            onClick={handleRegister}
            style={{
              padding: "14px",
              borderRadius: "14px",
              border: "none",
              background: "#1eea46",
              color: "black",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
