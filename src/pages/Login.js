import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Invalid email or password");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0f2fe, #dbeafe, #f0f9ff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "rgba(255,255,255,0.95)",
          borderRadius: "28px",
          padding: "35px",
          boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <img
            src="/logo.png"
            alt="TradeSphere Logo"
            style={{
              width: "90px",
              height: "90px",
              objectFit: "contain",
              marginBottom: "10px",
            }}
          />
          <h2
            style={{
              margin: "0",
              fontSize: "34px",
              color: "#0f172a",
            }}
          >
            Welcome Back
          </h2>
          <p
            style={{
              marginTop: "10px",
              color: "#64748b",
              fontSize: "15px",
              lineHeight: "1.5",
            }}
          >
            Sign in to continue exploring marketplace items, manage your listings,
            and connect with buyers and sellers.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label style={labelStyle}>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Sign In
          </button>
        </form>

        <div
          style={{
            marginTop: "22px",
            textAlign: "center",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          Don’t have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#2563eb",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Create one here
          </Link>
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "600",
  color: "#1e293b",
  fontSize: "14px",
};

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  marginBottom: "18px",
  borderRadius: "14px",
  border: "1px solid #cbd5e1",
  outline: "none",
  fontSize: "15px",
  boxSizing: "border-box",
  background: "#f8fafc",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "14px",
  background: "linear-gradient(90deg, #22c55e, #16a34a)",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "8px",
  boxShadow: "0 8px 18px rgba(34,197,94,0.25)",
};

export default Login;