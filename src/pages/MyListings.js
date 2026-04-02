import React, { useEffect, useState } from "react";
import API from "../services/api";

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
      await API.put(`/products/${id}`, {
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
      await API.delete(`/products/${id}`);
      alert("Listing deleted");
      fetchProducts();
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div>
      <h2 style={{ marginLeft: "20px" }}>My Listings</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 280px))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {products.map((p) => (
          <div
            key={p._id}
            style={{
              background: "white",
              borderRadius: "18px",
              padding: "18px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
              border: "1px solid #ddd",
              width: "250px",
            }}
          >
            {editingId === p._id ? (
              <>
                {editImage ? (
                  <img
                    src={editImage}
                    alt="Preview"
                    style={{
                      width: "100%",
                      aspectRatio: "1 / 1",
                      objectFit: "cover",
                      borderRadius: "14px",
                      marginBottom: "14px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "1 / 1",
                      borderRadius: "14px",
                      background: "#e5e7eb",
                      marginBottom: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#6b7280",
                      fontWeight: "600",
                    }}
                  >
                    No Image
                  </div>
                )}

                <input
                  value={editProductname}
                  onChange={(e) => setEditProductname(e.target.value)}
                  placeholder="Product name"
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "10px",
                    border: "1px solid #ccc",
                    boxSizing: "border-box",
                  }}
                />

                <input
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  placeholder="Price"
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "10px",
                    border: "1px solid #ccc",
                    boxSizing: "border-box",
                  }}
                />

                <input
                  value={editCatergory}
                  onChange={(e) => setEditCatergory(e.target.value)}
                  placeholder="Category"
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "10px",
                    border: "1px solid #ccc",
                    boxSizing: "border-box",
                  }}
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleEditImageUpload}
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "12px",
                    borderRadius: "10px",
                    border: "1px solid #ccc",
                    background: "#f9fafb",
                    boxSizing: "border-box",
                  }}
                />

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <button
                    onClick={() => saveEdit(p._id)}
                    style={{
                      background: "#1877f2",
                      color: "white",
                      border: "none",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Save
                  </button>

                  <button
                    onClick={cancelEdit}
                    style={{
                      background: "#ddd",
                      border: "none",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.productname}
                    style={{
                      width: "100%",
                      aspectRatio: "1 / 1",
                      objectFit: "cover",
                      borderRadius: "14px",
                      marginBottom: "14px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "1 / 1",
                      borderRadius: "14px",
                      background: "#e5e7eb",
                      marginBottom: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#6b7280",
                      fontWeight: "600",
                    }}
                  >
                    No Image
                  </div>
                )}

                <h3 style={{ marginBottom: "10px" }}>{p.productname}</h3>
                <p style={{ margin: "6px 0" }}>
                  <strong>Price:</strong> ${p.price}
                </p>
                <p style={{ margin: "6px 0 14px 0" }}>
                  <strong>Category:</strong> {p.catergory}
                </p>

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <button
                    onClick={() => startEdit(p)}
                    style={{
                      background: "#1877f2",
                      color: "white",
                      border: "none",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(p._id)}
                    style={{
                      background: "#e53935",
                      color: "white",
                      border: "none",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
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