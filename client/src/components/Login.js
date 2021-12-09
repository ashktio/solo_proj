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
      setErr(err.response.data.error);
    }
  };

  return (
    <MDBContainer
      fluid
      style={{
        height: "100%",
        position: "absolute",
        left: "0",
        overflow: "hidden",
        width: "100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: `url(https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&w=1000&q=80)`,
      }}
    >
      <MDBRow style={{ display: "flex", justifyContent: "center" }}>
        <MDBCol md="3">
          <MDBCard style={{ padding: "5%", marginTop: "10%" }}>
            <MDBCardBody>
              <MDBCardHeader className="form-header deep-blue-gradient rounded">
                <h3 className="my-3">
                  <MDBIcon icon="lock" /> Welcome! Login here:
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
