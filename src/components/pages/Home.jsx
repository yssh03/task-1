import React, { useEffect } from "react";
import Header from "../header/Header";
import { Grid, Image } from "semantic-ui-react";
import sale from "../../assets/sale.png";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../header/Breadcrumb";

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
      {/* <div style={{ margin: "50px 10px" }}>
        <Grid>
          <Grid.Column width={6}>
            <Image src={sale} />
          </Grid.Column>
          <Grid.Column width={9}>
            <div style={{ marginTop: "100px", marginLeft: "30px" }}>
              <p
                className="ui header"
                style={{
                  fontSize: "50px",
                  textJustify: "inter-word",
                  verticalAlign: "middle",
                }}
              >
                Want to full your wardrobe with this amazing products???
              </p>
              <p style={{ fontSize: "30px" }}>Hurry up!!!</p>
              <button
                className="ui secondary button"
                style={{ marginTop: "20px", letterSpacing: "2px" }}
                onClick={()=> navigate("/product")}
              >
                Explore....
              </button>
            </div>
          </Grid.Column>
        </Grid>
      </div> */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 content-center">
        <div className="m-5">
          <img className=" w-full h-full" src={sale} alt="IMAGE" />
        </div>

        <div className="m-5 sm:my-20 xs:my-10 md:my-40 xl:my-60 lg:my-60 w-full">
          <p className="text-6xl my-5 font-bold ">
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
