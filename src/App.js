import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/login/LoginPage";
import AboutUs from "./components/pages/common/AboutUs";
import ContactUs from "./components/pages/common/ContactUs";
import Error404 from "./components/pages/common/Error404";
import Home from "./components/pages/common/Home";
import Product from "./components/pages/product/Product";
import ProductDetails from "./components/pages/product/ProductDetails";
import Cart from "./components/pages/product/Cart";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:productID" element={<ProductDetails />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/product/cart" element={<Cart />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
      {/* <Search /> */}
    </div>
  );
}

export default App;
