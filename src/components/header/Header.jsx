import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { searchProduct, setProduct } from "../../redux/actions/productAction";
// import { searchProductReducer } from "../../redux/reducer/productReducer";
import "./Header.css";

function Header() {
  const [showLinks, setShowLinks] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const products = useSelector((state) => state.allProducts.products);
  // console.log(products);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    location.pathname === "/product" ||
    location.pathname === "/product/product-details"
      ? setShowSearch(true)
      : setShowSearch(false);
  }, [location.pathname]);

  useEffect(() => {
    searchValue === "" && dispatch(setProduct(products));
  }, [searchValue]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchValue);
    dispatch(searchProduct(searchValue, products));
  };

  return (
    <>
      <div>
        <div className="navbar">
          <div className="navbar-logo">
            <p>LOGO</p>
          </div>
          <div className="navbar-leftside">
            <div className="links" id={showLinks ? "hidden" : ""}>
              <a className="home" href="/home">
                Home
              </a>
              <a className="products" href="/product">
                Products
              </a>
              <a className="about" href="/about">
                About Us
              </a>
              <a className="contact" href="/contact">
                Contact Us
              </a>
            </div>
            <button onClick={() => setShowLinks(!showLinks)}>
              <i aria-hidden="true" class="bars icon"></i>
            </button>
          </div>
          {showSearch && (
            <div className="navbar-rightside">
              <form>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    dispatch(searchProduct(searchValue, products))
                  }}
                />
                <button type="submit" onClick={handleSearch}>
                  <i aria-hidden="true" class="search icon"></i>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
