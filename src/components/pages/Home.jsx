import React from "react";
import Header from "../header/Header";
import { Grid, Image } from "semantic-ui-react";
import sale from "../../assets/18924.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate()
  return (
    <>
      <Header />
      <div style={{ margin: "50px 10px" }}>
        <Grid>
          <Grid.Column width={6}>
            <Image src={sale} />
          </Grid.Column>
          <Grid.Column width={9}>
            <div style={{ marginTop: "100px", marginLeft: "30px" }}>
              <p
                class="ui header"
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
                class="ui secondary button"
                style={{ marginTop: "20px", letterSpacing: "2px" }}
                onClick={()=> navigate("/product")}
              >
                Explore....
              </button>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    </>
  );
}

export default Home;
