import React, { useState } from "react";
import axios from "axios";
import { navigate, Link } from "@reach/router";
import { Button } from "react-bootstrap";
import {
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCol,
  MDBInput,
  MDBCardBody,
} from "mdbreact";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [errmsg, setErrmsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const regData = {
      firstName,
      lastName,
      email,
      birthDate,
      city,
      state,
      password,
      confirmPassword,
    };
    try {
      await axios.post("http://localhost:8000/api/register", regData);
      navigate("/login");
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.errors);
      setErrmsg(error.response.data.error);
      console.log(errmsg);
    }
  };
  // FIX VALIDATION ERROR MESSAGES
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
      <MDBRow
        style={{ display: "flex", justifyContent: "center", padding: "2%" }}
      >
        <MDBCol md="4">
          <MDBCard style={{ padding: "5%" }}>
            <MDBCardBody>
              <form onSubmit={handleSubmit}>
                <h2 className="text-uppercase text-center mb-5">
                  Welcome to Family Book
                </h2>
                <p>Register here!</p>
                <div className="grey-text text-left">
                  <MDBInput
                    label="Your first name"
                    icon="user"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                  >
                    {error && error.firstName && (
                      <p style={{ color: "red" }}>{error.firstName.message}</p>
                    )}
                  </MDBInput>
                  <MDBInput
                    label="Your last name"
                    icon="user"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                  >
                    {error && error.lastName && (
                      <p style={{ color: "red" }}>{error.lastName.message}</p>
                    )}
                  </MDBInput>

                  <MDBInput
                    label="Your email"
                    icon="envelope"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  >
                    {error && error.email && (
                      <p style={{ color: "red" }}>{error.email.message}</p>
                    )}
                    {errmsg && <p style={{ color: "red" }}>{errmsg}</p>}
                  </MDBInput>

                  <MDBInput
                    label="Your date of birth"
                    icon="calendar-alt"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  >
                    {error && error.birthDate && (
                      <p style={{ color: "red" }}>{error.birthDate.message}</p>
                    )}
                  </MDBInput>

                  <MDBRow>
                    <MDBCol md="6">
                      <MDBInput
                        label="Your city"
                        icon="city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      >
                        {error && error.city && (
                          <p style={{ color: "red" }}>{error.city.message}</p>
                        )}
                      </MDBInput>
                    </MDBCol>
                    <MDBCol md="6">
                      <MDBInput
                        className="text-uppercase"
                        label="Your state"
                        value={state}
                        icon="flag-usa"
                        onChange={(e) => setState(e.target.value)}
                        type="text"
                      >
                        {error && error.state && (
                          <p style={{ color: "red" }}>{error.state.message}</p>
                        )}
                      </MDBInput>
                    </MDBCol>
                  </MDBRow>
                  <MDBInput
                    label="Your password"
                    icon="lock"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  >
                    {error && error.password && (
                      <p style={{ color: "red" }}>{error.password.message}</p>
                    )}
                  </MDBInput>
                  <MDBInput
                    label="Confirm your password"
                    icon="exclamation-triangle"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="d-grid gap-2">
                  <Button
                    type="submit"
                    className="btn btn-success btn-block btn-lg text-body"
                  >
                    Register
                  </Button>
                </div>
                <p class="text-center text-muted mt-5 mb-0">
                  Have already an account?{" "}
                  <Link to="/login" className="fw-bold text-body">
                    <u>Login here</u>
                  </Link>
                </p>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Register;
