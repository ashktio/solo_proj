import { navigate } from "@reach/router";
import axios from "axios";
import React, { useState } from "react";

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
    <div style={{ margin: "0 auto" }}>
      <form
        style={{
          margin: "10px",
          display: "inline-block",
          alignItems: "space-between",
          width: "400px",
        }}
        onSubmit={handleSubmit}
      >
        <div
          style={{ height: "200px", margin: "10px", display: "inline-block" }}
        >
          <div style={{ textAlign: "left" }} className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {err && <h3 style={{ color: "red" }}>{err}</h3>}
          </div>

          <div style={{ textAlign: "left" }} className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={{ margin: "20px" }}>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
