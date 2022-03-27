import React from "react";
import Breadcrumb from "../header/Breadcrumb";
import Header from "../header/Header";

function ContactUs() {
  return (
    <>
      <Header />
      <Breadcrumb />
      <div>
        <p
          style={{
            display: "inline-block",
            justifyContent: "center",
            fontSize: "45px",
            fontWeight: "bold",
            border: "solid 2px",
            borderRadius: "10px",
            boxShadow: "2px 2px 8px grey",
            marginBottom: "15px",
            width: "50%",
          }}
        >
          want more?... contact us on
        </p>

        <div>
          <div
            style={{
              display: "inline-block",
              justifyContent: "center",
              marginTop: "20px",
              marginLeft: "50px",
            }}
          >
            <div
              class="ui icon message"
              style={{
                width: "80%",
              }}
            >
              <i aria-hidden="true" class="linkedin icon"></i>
              <div class="content">
                <div class="header" style={{ width: "50%" }}>
                  <a href="https://www.linkedin.com/in/yash-patel-a15a75221">
                    https://www.linkedin.com/in/yash-patel-a15a75221
                  </a>
                </div>
              </div>
            </div>

            <div
              class="ui icon message"
              style={{
                width: "80%",
              }}
            >
              <i aria-hidden="true" class="phone square icon"></i>
              <div class="content">
                <div class="header">+91 9586580504</div>
              </div>
            </div>

            <div
              class="ui icon message"
              style={{
                width: "80%",
              }}
            >
              <i aria-hidden="true" class="at icon"></i>
              <div class="content">
                <div class="header">yash.patel@drcsystems.in</div>
              </div>
            </div>

            <div
              class="ui icon message"
              style={{
                width: "80%",
              }}
            >
              <i aria-hidden="true" class=" address book icon"></i>
              <div class="content">
                <div class="header">Gift city, Gandhinagar</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
