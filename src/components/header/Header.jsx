import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import {
  searchList,
  searchProduct,
  setProduct,
  updateSearchValue,
} from "../../redux/actions/productAction";
import "./Header.css";

function Header() {
  const dispatch = useDispatch();
  const location = useLocation();

  const allProducts = useSelector((state) => state.allProducts);
  const selectedCategory = useSelector(
    (state) => state.allProducts.selectedCategory
  );
  const searchProducts = useSelector((state) => state.allProducts.searchList);
  const cartProduct = useSelector((state) => state.handleCart);

  const [showLinks, setShowLinks] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isHidden, setIsHidden] = useState(false);

  const [tempArr, setTempArr] = useState([]);

  useEffect(() => {
    location.pathname === "/product" || location.pathname === "/product/cart"
      ? setShowSearch(true)
      : setShowSearch(false);
  }, [location.pathname]);

  console.log("header tempArr", tempArr);

  useEffect(() => {
    console.log("selectedCategory", selectedCategory);
    setTempArr(selectedCategory);
  }, [selectedCategory]);

  console.log("searchValue ", searchValue);

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   dispatch(searchProduct(e.target.value, tempArr, products));
  // };

  useEffect(() => {
    allProducts.searchValue === "" ? setIsHidden(false) : setIsHidden(true);
  }, [allProducts.searchValue]);

  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.value;
    dispatch(searchList(e.target.value, tempArr, allProducts.products));
    value === "" &&
      dispatch(
        searchProduct(allProducts.searchValue, tempArr, allProducts.products)
      );
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(
      searchProduct(allProducts.searchValue, tempArr, allProducts.products)
    );
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
            // <div className="navbar-rightside">
            //   <form>
            //     <input
            //       type="text"
            //       placeholder="Search..."
            //       value={searchValue}
            //       onChange={(e) => {
            //         handleSearch(e);
            //         setSearchValue(e.target.value);
            //       }}
            //     />
            //     <button type="submit" onClick={handleSearch}>
            //       <i aria-hidden="true" class="search icon"></i>
            //     </button>
            //   </form>
            // </div>
            <div className="navbar-rightside">
        <form>
          <input
            type="text"
            list="data"
            placeholder="Search..."
            value={allProducts.searchValue}
            onChange={(e) => {
              handleSearch(e);
              dispatch(updateSearchValue(e.target.value));
            }}
          />
          <button type="submit" onClick={handleClick}>
            <i aria-hidden="true" class="search icon"></i>
          </button>
        {isHidden && (
          <div className="">
            <datalist id="data"
            //  className="inline-block justify-start text-left w-1/4 h-5 border-solid mt-2 "
            >
              {searchProducts && searchProducts.length > 0 && 
                searchProducts.map((x) => (
                  <option
                  value={x.title}
                    // className="cursor-pointer z-auto border-solid p-2  border-r border-t font-bold border-l border-b  border-zinc-900"
                    onClick={() => dispatch(updateSearchValue(x.title))}
                  >
                    {/* {x.title} */}
                  </option>
                )
              // ) : (
              //   <option className="cursor-pointer flex justify-center border-solid p-2  border-2 font-bold text-lg border-zinc-900">
              //     Product not found :(
              //   </option>
              )}
            </datalist>
          </div>
        )}
        </form>
      </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
