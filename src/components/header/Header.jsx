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
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const location = useLocation();

  const products = useSelector((state) => state.allProducts.products);
  const filterByCategoryProducts = useSelector(
    (state) => state.allProducts.filteredProductsByCategory
  );
  const cartProduct = useSelector((state) => state.handleCart);

  const temp = filterByCategoryProducts.map((item) => item.category);
  const tempArr = temp.filter((q, index) => temp.indexOf(q) === index);

  const tempFunc = (arr, data) => {
    const temp = [];
    if (arr.indexOf("men's clothing") !== -1) {
      const men = data.filter((x) => x.category === "men's clothing");
      temp.push(...men);
    }
    if (arr.indexOf("women's clothing") !== -1) {
      const women = data.filter((x) => x.category === "women's clothing");
      temp.push(...women);
    }
    if (arr.indexOf("jewelery") !== -1) {
      const jewelery = data.filter((x) => x.category === "jewelery");
      temp.push(...jewelery);
    }
    if (arr.indexOf("electronics") !== -1) {
      const electronic = data.filter((x) => x.category === "electronics");
      temp.push(...electronic);
    }
    return temp;
  };

  useEffect(() => {
    const arr = tempFunc(tempArr, products);
    // console.log("arr ", arr);
    // setData(arr);
  }, [tempArr]);
  

  useEffect(() => {
    location.pathname === "/product" || location.pathname === "/product/cart"
      ? setShowSearch(true)
      : setShowSearch(false);
  }, [location.pathname]);

  useEffect(() => {
    searchValue === "" && dispatch(setProduct(tempArr, products));
  }, [searchValue]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchProduct(searchValue, tempArr, products));
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
              <NavLink exact to="/product/cart">
                Cart ({cartProduct.length})
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
                    handleSearch(e);
                    setSearchValue(e.target.value);
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
