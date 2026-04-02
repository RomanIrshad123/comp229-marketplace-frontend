import React, { useEffect, useState } from "react";
import API from "../services/api";

function Marketplace() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const filteredProducts = products.filter((p) => {
    const name = p.productname?.toLowerCase() || "";
    const catergory = p.catergory?.toLowerCase() || "";
    const query = search.toLowerCase();

    return name.includes(query) || catergory.includes(query);
  });

  return (
    <div>
      <h2 style={{ marginLeft: "20px" }}>Marketplace</h2>

      <div style={{ padding: "0 20px 20px 20px" }}>
        <input
          type="text"
          placeholder="Search by item or category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div
        style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 280px))",
        gap: "20px",
        padding: "20px",
        marginTop: "10px",
        }}
      >
        {filteredProducts.map((p) => (
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
            <p style={{ margin: "6px 0" }}>
              <strong>Category:</strong> {p.catergory}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marketplace;