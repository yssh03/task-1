import React, { useEffect } from "react";
import Header from "../../header/Header";
import sale from "../../../assets/sale.png";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../header/Breadcrumb";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
  }, [navigate, token]);

  return (
    <>
      <Header />
      <Breadcrumb />
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 content-center">
        <div className="m-5">
          <img className=" w-full h-full" src={sale} alt="IMAGE" />
        </div>

        <div className="m-5 sm:my-20 xs:my-10 md:my-40 xl:my-55 lg:my-55 w-full">
          <p className="text-6xl my-5 mx-6 font-bold ">
            Want to full your wardrobe with this amazing products???
          </p>
          <p className="text-4xl font-medium">Hurry up!!!</p>
          <button
            className="ui secondary button"
            style={{ marginTop: "20px", letterSpacing: "2px" }}
            onClick={() => navigate("/product")}
          >
            Explore....
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
