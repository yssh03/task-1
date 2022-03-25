import React from "react";
import { useLocation } from "react-router-dom";

function Breadcrumb() {
    const location = useLocation();
    const {pathname} = location;
    const path = pathname.split("/").filter((item) => item);
    console.log(path)
  return (
    <>
      <div class="ui breadcrumb">
        <a class="section">Home</a>
        <div class="divider">/</div>
        <a class="section">Registration</a>
        <div class="divider">/</div>
        <div class="active section">Personal Information</div>
      </div>
    </>
  );
}

export default Breadcrumb;
