import React from "react";

// ProductCard component is used to show one product
function ProductCard({ product, onDelete }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "10px",
        padding: "15px",
        width: "200px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)", // adds a soft shadow around the card
      }}
    >
     { /*Box for product image */}
      <div
        style={{
          height: "120px",
          background: "#ddd",
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      />

     { /*Product name */} 
      <h3>{product.name}</h3>

    { /*Show product price */}
      <p style={{ fontWeight: "bold" }}>${product.price}</p>

    {/* {Show delete button*/}
      {onDelete && (
        <button
          onClick={() => onDelete(product._id)} // sends the product id when delete is clicked
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
}

// Export ProductCard so other files can use it
export default ProductCard;