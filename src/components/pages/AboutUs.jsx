import React from "react";
import Header from "../header/Header";
import { Grid, Image } from "semantic-ui-react";

function AboutUs() {
  return (
    <>
      <Header />
      <div
        style={{
          display: "inline-block",
          justifyContent: "center",
          marginTop: "30px",

          width: "700px",
          margin: "20px 0px",
          paddingBottom: "20px",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "45px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
              border: "solid 2px",
              borderRadius: "10px",
              boxShadow: "2px 2px 8px grey",
              marginBottom: "15px",
            }}
          >
            Let me introduce my self
          </p>
        </div>
        <div>
          <p
            style={{
              fontSize: "30px",
              display: "inline-block",
              justifyContent: "center",
              textJustify: "inter-word",
              height: "100px",
              width: "500px",
            }}
          >
            Hello this is me{" "}
            <i>
              <b>Yash Patel!</b>
            </i>{" "}
            Currently working as{" "}
            <u>
              <i> Intern</i>
            </u>{" "}
            in
            <b> DRC Systems India.</b>
            <br />
            Its been 3 months ever since i joined this company. I got to know a
            lot of things from my mentors as well as colleuiges. <br />I built
            this website as a part of my tasks.
          </p>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
