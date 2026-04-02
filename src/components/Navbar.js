import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const linkStyle = {
    textDecoration: "none",
    background: "#1eea46",
    color: "black",
    padding: "10px 18px",
    borderRadius: "14px",
    fontWeight: "700",
    display: "inline-block",
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 28px",
        background: "black",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
  <img
    src="/logo.png"
    alt="TradeSphere Logo"
    style={{
      width: "60px",
      height: "60px",
      objectFit: "contain",
      display: "block",
      background: "white",
      borderRadius: "12px",
      padding: "4px",
    }}
  />
  <h2
    style={{
      color: "#1eea46",
      margin: 0,
      fontSize: "24px",
      fontWeight: "800",
    }}
  >
    TradeSphere
  </h2>
</div>

      <div style={{ display: "flex", gap: "12px" }}>
        <Link to="/marketplace" style={linkStyle}>Home</Link>

        {token ? (
          <>
            <Link to="/create" style={linkStyle}>Sell</Link>
            <Link to="/my" style={linkStyle}>My Listings</Link>
            <button
              onClick={logout}
              style={{
                background: "#0f172a",
                color: "white",
                border: "none",
                padding: "10px 18px",
                borderRadius: "14px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;