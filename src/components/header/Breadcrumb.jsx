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
           {path.map((route, index) => {
            const routeTo = `/${path.slice(0, index + 1).join("/")}`;
            const isLast = index === path.length - 1;

            return isLast ? (
              <a class="section" style={{ color: "black" }}>
                {capitalize(route)}
              </a>
            ) : (
              <a class="section">
                <Link to={`${routeTo}`}>{capitalize(route)}</Link>
                <i
                  aria-hidden="true"
                  class="angle right icon"
                  style={{ color: "black" }}
                ></i>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Breadcrumb;
