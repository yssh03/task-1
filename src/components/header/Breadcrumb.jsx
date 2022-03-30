import React from "react";
import { Link, useLocation } from "react-router-dom";

function Breadcrumb() {
  const location = useLocation();
  const { pathname } = location;
  const path = pathname.split("/").filter((item) => item);
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  return (
    <>
      <div>
        <div
          class="ui breadcrumb"
          style={{
            display: "flex",
            marginLeft: "20px",
            marginTop: "15px",
            fontSize: "15px",
          }}
        >
          {path.includes("home") && path.length === 1 ? (
            <div className="section" style={{ textDecoration: "none" }}></div>
          ) : (
            <div className="section" style={{ textDecoration: "none" }}>
              <Link style={{color:"black"}} to={"/home"}>Home</Link>
              <i
                aria-hidden="true"
                class="angle right icon"
                style={{ color: "black" }}
              ></i>
            </div>
          )}

          {path.map((route, index) => {
            const routeTo = `/${path.slice(0, index + 1).join("/")}`;
            const isLast = index === path.length - 1;

            return isLast ? (
              <div class="section" style={{ color: "black" }}>
                {capitalize(route)}
              </div>
            ) : (
              <div class="section">
                <Link style={{color:"black"}}  to={`${routeTo}`}>{capitalize(route)}</Link>
                <i
                  aria-hidden="true"
                  class="angle right icon"
                  style={{ color: "black" }}
                ></i>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Breadcrumb;
