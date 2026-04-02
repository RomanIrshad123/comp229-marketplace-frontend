import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Marketplace from "./pages/Marketplace";
import CreateListing from "./pages/CreateListing";
import MyListings from "./pages/MyListings";
import Navbar from "./components/Navbar";
import { setAuthToken } from "./services/api";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setAuthToken(token);
  }, []);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/create" element={<CreateListing />} />
        <Route path="/my" element={<MyListings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;