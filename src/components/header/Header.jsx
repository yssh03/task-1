import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, Icon, Menu, Segment } from "semantic-ui-react";
import productLogo from "../../assets/product.png";
import "./Header.css";

const sections = [
  { key: "home", content: "Home", link: true },
  { key: "search", content: "Search", active: true },
];

function Header() {
  const [activeItem, setActiveItem] = useState("Home");
  const [showLinks, setShowLinks] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const {productID} = useParams()

  const navigate = useNavigate();
  useEffect(() => {
    location.pathname === "/product" || location.pathname === `/product/${productID}` ? setShowSearch(true) : setShowSearch(false)

     
  }, [location.pathname])
  
  // const handleItemClick = (args) => {
  //   setActiveItem(args);
  //   if (args === "Home") navigate("/home");
  //   if (args === "Products") navigate("/product");
  //   if (args === "About Us") navigate("/about");
  //   if (args === "Contact Us") navigate("/contact");
  // };

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
              <input type="text" placeholder="Search..." />
              <button>
                <i aria-hidden="true" class="search icon"></i>
              </button>
            </div>
          )}
          {/* <div className="navbar-rightside">
            <a href="/login" className="logout">
              Log Out
            </a> 
          </div> */}
        </div>
        {/* <Menu color="teal" size="large">
          <Menu.Item>
            <img alt="logo" src={productLogo} />
          </Menu.Item>
          <div className="navbar-links">
            <Menu.Item
              name="Home"
              active={activeItem === "Home"}
              onClick={() => {
                handleItemClick("Home");
                //   navigate("/home");
              }}
            >
              Home
            </Menu.Item>
          </div>

          <div className="navbar-links">
            <Menu.Item
              name="Products"
              active={activeItem === "Products"}
              onClick={() => {
                // setActiveItem("Products")
                handleItemClick("Products");
                //   navigate("/product");
              }}
            >
              Products
            </Menu.Item>
          </div>

          <div className="navbar-links">
            <Menu.Item
              name="About Us"
              active={activeItem === "About Us"}
              onClick={() => {
                handleItemClick("About Us");
                //   navigate("/about");
              }}
            >
              About Us
            </Menu.Item>
          </div>

          <div className="navbar-links">
            <Menu.Item
              name="Contact Us"
              active={activeItem === "Contact Us"}
              onClick={() => {
                handleItemClick("Contact Us");
                //   navigate("/contact");
              }}
            >
              Contact Us
            </Menu.Item>
          </div>

          <div className="navbar-links">
            <Menu.Item
              position="right"
              onClick={() => {
                navigate("/login");
                localStorage.removeItem("token");
              }}
            >
              Logout
            </Menu.Item>
          </div>
        </Menu> */}
        {/* <div className="breadcrumb">
          <Breadcrumb size={"large"}>
            <Breadcrumb.Section
              link
              href="/home"
              className="breadcrumb-section"
            >
              {activeItem}
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
          </Breadcrumb>
        </div> */}
      </div>
    </>
  );
}

export default Header;
