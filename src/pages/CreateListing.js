import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function CreateListing() {
  const [productname, setProductname] = useState("");
  const [price, setPrice] = useState("");
  const [catergory, setCatergory] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // base64 string
    };
    reader.readAsDataURL(file);
  };

  const handleCreate = async () => {
    try {
      await API.post("/api/products", {
        productname,
        price,
        catergory,
        image,
      });

      alert("Product created successfully");
      navigate("/marketplace");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.message || "Create product failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "50px",
      }}
    >
      <div
        style={{
          background: "white",
          width: "420px",
          padding: "30px",
          borderRadius: "22px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          border: "1px solid #e5e7eb",
        }}
      >
        <h2
          style={{
            marginTop: 0,
            marginBottom: "25px",
            fontSize: "32px",
            color: "#111827",
            textAlign: "center",
          }}
        >
          Create Listing
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <input
            type="text"
            placeholder="Product name"
            value={productname}
            onChange={(e) => setProductname(e.target.value)}
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
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
            type="text"
            placeholder="Category"
            value={catergory}
            onChange={(e) => setCatergory(e.target.value)}
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
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{
              padding: "10px",
              borderRadius: "14px",
              border: "1px solid #d1d5db",
              background: "#f9fafb",
            }}
          />

          {image && (
            <img
              src={image}
              alt="Preview"
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
                borderRadius: "14px",
                border: "1px solid #ddd",
              }}
            />
          )}

          <button
            onClick={handleCreate}
            style={{
              marginTop: "8px",
              padding: "14px",
              borderRadius: "14px",
              border: "none",
              background: "#1eea46",
              color: "black",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            }}
          >
            Post Listing
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateListing;