import React from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { OrderProvider } from "./redux/contexts/Cart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Home from "./pages/Home";

export const App = () => {
  return (
    <OrderProvider>
      <Router basename={"/"}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </Router>
    </OrderProvider>
  );
};

export default App;