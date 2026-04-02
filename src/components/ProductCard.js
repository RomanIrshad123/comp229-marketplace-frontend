import React from "react";

function ProductCard({ product, onDelete }) {
  return (
    <div style={{
      background: "white",
      borderRadius: "10px",
      padding: "15px",
      width: "200px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>
      <div style={{
        height: "120px",
        background: "#ddd",
        borderRadius: "8px",
        marginBottom: "10px"
      }} />

      <h3>{product.name}</h3>
      <p style={{ fontWeight: "bold" }}>${product.price}</p>

      {onDelete && (
        <button
          onClick={() => onDelete(product._id)}
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "5px",
            borderRadius: "5px"
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
}

export default ProductCard;