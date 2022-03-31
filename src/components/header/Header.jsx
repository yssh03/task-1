import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { searchProduct, setProduct } from "../../redux/actions/productAction";
import "./Header.css";

function Header() {
  const [showLinks, setShowLinks] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const products = useSelector((state) => state.allProducts.products);
  console.log("products", products);
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
    dispatch(searchProduct(searchValue, products));
  };

  return (
    <>
      <div>
        <div className="navbar">
          <div className="navbar-logo">
            {" "}
            <NavLink to={"/home"}>DUKAN</NavLink>
          </div>
          <div className="navbar-leftside">
            <div className="links" id={showLinks ? "hidden" : ""}>
              <NavLink activeClassName="active" to={"/product"}>
                Product
              </NavLink>
              <NavLink activeClassName="active" to={"/about"}>
                About Us
              </NavLink>
              <NavLink activeClassName="active" to={"/contact"}>
                Contact Us
              </NavLink>

              <NavLink
                to={"/login"}
                onClick={() => {
                  localStorage.removeItem("token");
                }}
              >
                Logout
              </NavLink>
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
                    dispatch(searchProduct(searchValue, products));
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
