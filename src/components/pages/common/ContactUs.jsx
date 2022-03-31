import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../header/Breadcrumb";
import Header from "../../header/Header";

function ContactUs() {
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
      <div style={{marginTop: "30px"}}>
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
              className="ui icon message"
              style={{
                width: "80%",
              }}
            >
              <i aria-hidden="true" className="linkedin icon"></i>
              <div className="content">
                <div className="header" style={{ width: "50%" }}>
                  <a href="https://www.linkedin.com/in/yash-patel-a15a75221">
                    https://www.linkedin.com/in/yash-patel-a15a75221
                  </a>
                </div>
              </div>
            </div>

            <div
              className="ui icon message"
              style={{
                width: "80%",
              }}
            >
              <i aria-hidden="true" className="phone square icon"></i>
              <div className="content">
                <div className="header">+91 9586580504</div>
              </div>
            </div>

            <div
              className="ui icon message"
              style={{
                width: "80%",
              }}
            >
              <i aria-hidden="true" className="at icon"></i>
              <div className="content">
                <div className="header">yash.patel@drcsystems.in</div>
              </div>
            </div>

            <div
              className="ui icon message"
              style={{
                width: "80%",
              }}
            >
              <i aria-hidden="true" className=" address book icon"></i>
              <div className="content">
                <div className="header">Gift city, Gandhinagar</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
