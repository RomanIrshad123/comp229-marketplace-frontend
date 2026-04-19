import React, { useState } from "react";
import API from "../services/api";

function CreateListing() {
  const [form, setForm] = useState({
    productname: "",
    price: "",
    catergory: "",
    description: "",
    image: "",
  });

  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/api/products", form);
      alert("Listing created successfully!");

      setForm({
        productname: "",
        price: "",
        catergory: "",
        description: "",
        image: "",
      });
      setPreview("");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Error creating listing");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #dbeafe, #bfdbfe, #93c5fd)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "white",
          borderRadius: "24px",
          padding: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "10px",
            fontSize: "30px",
            color: "#1e3a8a",
          }}
        >
          Create New Listing
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            marginBottom: "25px",
          }}
        >
          Add your product details and upload an image to post it on the marketplace.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="productname"
            placeholder="Product Name"
            value={form.productname}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="catergory"
            placeholder="Category"
            value={form.catergory}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            style={{
              ...inputStyle,
              resize: "none",
              paddingTop: "14px",
            }}
          />

          <label
            style={{
              display: "block",
              marginBottom: "10px",
              fontWeight: "bold",
              color: "#1f2937",
            }}
          >
            Upload Product Image
          </label>

          <div
            style={{
              border: "2px dashed #93c5fd",
              borderRadius: "16px",
              padding: "20px",
              textAlign: "center",
              marginBottom: "20px",
              background: "#eff6ff",
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ marginBottom: "10px" }}
            />
            <p style={{ color: "#6b7280", margin: 0 }}>
              Choose an image from your computer
            </p>
          </div>

          {preview && (
            <div style={{ marginBottom: "20px", textAlign: "center" }}>
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: "100%",
                  maxHeight: "280px",
                  objectFit: "cover",
                  borderRadius: "18px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                }}
              />
            </div>
          )}

          <button type="submit" style={buttonStyle}>
            Post Listing
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  marginBottom: "16px",
  borderRadius: "14px",
  border: "1px solid #d1d5db",
  outline: "none",
  fontSize: "15px",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "14px",
  background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 6px 16px rgba(37, 99, 235, 0.35)",
};

export default CreateListing;