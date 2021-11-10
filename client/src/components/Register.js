import React, { useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import Login from "./Login";
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
      navigate("post/view-posts");
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.errors);
      setErrmsg(error.response.data.err);
      console.log(errmsg);
    }
    // Login()
  };

  return (
    <div style={{ margin: "0 auto" }}>
      <form
        style={{
          margin: "10px",
          display: "inline-block",
          alignItems: "space-between",
        }}
        onSubmit={handleSubmit}
      >
        <div style={{ margin: "10px", display: "inline-block" }}>
          <div style={{ textAlign: "left" }} className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {error && error.firstName && (
              <p style={{ color: "red" }}>{error.firstName.message}</p>
            )}
          </div>

          <div style={{ textAlign: "left" }} className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && error.email && (
              <p style={{ color: "red" }}>{error.email.message}</p>
            )}
            {errmsg && <p style={{ color: "red" }}>{errmsg}</p>}
          </div>

          <div style={{ textAlign: "left" }} className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            {error && error.city && (
              <p style={{ color: "red" }}>{error.city.message}</p>
            )}
          </div>

          <div style={{ textAlign: "left" }} className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && error.password && (
              <p style={{ color: "red" }}>{error.password.message}</p>
            )}
          </div>
        </div>

        <div style={{ margin: "10px", display: "inline-block" }}>
          <div style={{ textAlign: "left" }} className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {error && error.lastName && (
              <p style={{ color: "red" }}>{error.lastName.message}</p>
            )}
          </div>

          <div style={{ textAlign: "left" }} className="form-group">
            <label htmlFor="birthDate">Date of Birth:</label>
            <input
              type="date"
              className="form-control"
              name="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
            {error && error.birthDate && (
              <p style={{ color: "red" }}>{error.birthDate.message}</p>
            )}
          </div>

          <div style={{ textAlign: "left" }} className="form-group">
            <label htmlFor="state">State:</label>
            <input
              type="text"
              className="form-control"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            {error && error.state && (
              <p style={{ color: "red" }}>{error.state.message}</p>
            )}
          </div>

          <div style={{ textAlign: "left" }} className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && error.confirmPassword && (
              <p style={{ color: "red" }}>{error.confirmPassword.message}</p>
            )}
          </div>
        </div>

        <div style={{ margin: "20px" }}>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
