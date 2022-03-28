import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import user from "../../assets/user.png";
import axiosInstance from "../AxiosUtils";

const initialValues = {
  empNo: "",
  password: "",
};

const LoginPage = () => {
  const [state, setState] = useState(initialValues);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = state;

    axiosInstance
      .post("/Login/Login", userData)

      .then((res) => {
        localStorage.setItem("token", res.data.data.tokenData);

        if (res.data) {
          navigate("/home");
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Wrong Credentials");
      });
  };

  return (
    <>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="black" textAlign="center">
            <Image src={user} color="teal" /> Log-in to your account
          </Header>
          <Form size="large">
            <Segment stacked style={{ borderColor: "rgb(201 202 203)" }}>
              <Form.Input
                fluid
                name="empNo"
                value={state.empNo}
                onChange={handleChange}
                icon="user"
                iconPosition="left"
                placeholder="Employee Number"
              />
              <Form.Input
                fluid
                icon="lock"
                name={"password"}
                onChange={handleChange}
                value={state.password}
                style={{ borderColor: "#ababab" }}
                iconPosition="left"
                placeholder="Password"
                type="password"
              />

              <Button color="black" fluid size="large" type="submit" onClick={handleSubmit}>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <a href="#">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>

    </>
  );
};

export default LoginPage;
