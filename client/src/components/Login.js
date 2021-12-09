import { navigate, Link } from "@reach/router";
import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBIcon,
  MDBCardHeader,
  MDBInput,
} from "mdbreact";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    const postData = { email, password };
    try {
      await axios.post("http://localhost:8000/api/login", postData, {
        withCredentials: true,
      });
      navigate("post/view-posts");
    } catch (err) {
      console.log(err.response);
      setErr(err.response.data.err);
    }
  };

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <MDBCard style={{ padding: "5%", marginTop: "5%" }}>
            <MDBCardBody>
              <MDBCardHeader className="form-header deep-blue-gradient rounded">
                <h3 className="my-3">
                  <MDBIcon icon="lock" /> Login:
                </h3>
              </MDBCardHeader>
              <form onSubmit={handleSubmit}>
                <div className="grey-text text-left">
                  <MDBInput
                    label="Type your email"
                    icon="envelope"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  >
                    {err && <p style={{ color: "red" }}>{err}</p>}
                  </MDBInput>
                  <MDBInput
                    label="Type your password"
                    icon="lock"
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="text-center mt-4">
                  <Button color="light-blue" className="mb-3" type="submit">
                    Login
                  </Button>
                </div>
              </form>
              <MDBModalFooter>
                <div className="font-weight-light">
                  <p>
                    Not a member? <Link to="/">Sign Up </Link>
                  </p>
                </div>
              </MDBModalFooter>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
