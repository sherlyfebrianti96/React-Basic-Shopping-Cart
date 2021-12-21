import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProductsPage } from "./pages/Products";
import { ProductDetailPage } from "./pages/ProductDetail";
import { ShoppingCartPage } from "./pages/ShoppingCart";

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/shopping-cart" element={<ShoppingCartPage />} />
          <Route path="/products/:id/:color" element={<ProductDetailPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/products" element={<ProductsPage />} />
          {/* Default Page */}
          <Route path="/" element={<Navigate to="/products" />} />
          {/* 404 Page */}
          <Route path="*" element={<Navigate to="/products" />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
