import React, { useEffect, useState } from "react";
import API from "../services/api";

// Shows only the logged-in user's listings
function MyListings() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [editProductname, setEditProductname] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editCatergory, setEditCatergory] = useState("");
  const [editImage, setEditImage] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/api/products/my");
      setProducts(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const startEdit = (product) => {
    setEditingId(product._id);
    setEditProductname(product.productname);
    setEditPrice(product.price);
    setEditCatergory(product.catergory);
    setEditImage(product.image || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditProductname("");
    setEditPrice("");
    setEditCatergory("");
    setEditImage("");
  };

  const handleEditImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setEditImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const saveEdit = async (id) => {
    try {
      await API.put(`/api/products/${id}`, {
        productname: editProductname,
        price: editPrice,
        catergory: editCatergory,
        image: editImage,
      });

      alert("Listing updated");
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.message || "Update failed");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/api/products/${id}`);
      alert("Listing deleted");
      fetchProducts();
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    marginBottom: "10px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    boxSizing: "border-box",
    outline: "none",
  };

  const buttonStyle = {
    flex: 1,
    padding: "10px 14px",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "14px",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px", fontSize: "30px" }}>My Listings</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        {products.map((p) => (
          <div
            key={p._id}
            style={{
              background: "#fff",
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
              border: "1px solid #e5e7eb",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {editingId === p._id ? (
              <div style={{ padding: "16px" }}>
                {editImage ? (
                  <img
                    src={editImage}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                      borderRadius: "14px",
                      marginBottom: "14px",
                      display: "block",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "220px",
                      borderRadius: "14px",
                      background: "#e5e7eb",
                      marginBottom: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#666",
                      fontWeight: "bold",
                    }}
                  >
                    No Image
                  </div>
                )}

                <input
                  value={editProductname}
                  onChange={(e) => setEditProductname(e.target.value)}
                  placeholder="Product name"
                  style={inputStyle}
                />

                <input
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  placeholder="Price"
                  style={inputStyle}
                />

                <input
                  value={editCatergory}
                  onChange={(e) => setEditCatergory(e.target.value)}
                  placeholder="Category"
                  style={inputStyle}
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleEditImageUpload}
                  style={{ marginBottom: "14px" }}
                />

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => saveEdit(p._id)}
                    style={{
                      ...buttonStyle,
                      background: "#16a34a",
                      color: "white",
                    }}
                  >
                    Save
                  </button>

                  <button
                    onClick={cancelEdit}
                    style={{
                      ...buttonStyle,
                      background: "#6b7280",
                      color: "white",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.productname}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "220px",
                      background: "#e5e7eb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#666",
                      fontWeight: "bold",
                    }}
                  >
                    No Image
                  </div>
                )}

                <div style={{ padding: "16px" }}>
                  <h3
                    style={{
                      margin: "0 0 10px 0",
                      fontSize: "22px",
                      fontWeight: "bold",
                    }}
                  >
                    {p.productname}
                  </h3>

                  <p
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: "18px",
                      fontWeight: "600",
                    }}
                  >
                    Price: ${p.price}
                  </p>

                  <p
                    style={{
                      margin: "0 0 16px 0",
                      color: "#555",
                      fontSize: "15px",
                    }}
                  >
                    Category: {p.catergory}
                  </p>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => startEdit(p)}
                      style={{
                        ...buttonStyle,
                        background: "#2563eb",
                        color: "white",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(p._id)}
                      style={{
                        ...buttonStyle,
                        background: "#dc2626",
                        color: "white",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyListings;