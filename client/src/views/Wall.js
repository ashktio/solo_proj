import React from "react";
import PostList from "../components/PostList";
import Logout from "../components/Logout";
import WeatherApi from "../components/WeatherApi";
import Greeting from "../components/Greeting";

const Wall = () => {
  const messages = () => {
    alert("Feature coming soon...");
  };

  return (
    <div style={{ padding: "3%" }}>
      <div style={{ backgroundColor: "#fbfbfb" }}>
        <div style={{ textAlign: "right", marginRight: "10%", padding: "2%" }}>
          <button
            style={{
              background: "none",
              border: "none",
              color: "#069",
              cursor: "pointer",
            }}
            onClick={() => messages()}
          >
            Messages
          </button>
          <Logout />
        </div>
        <div style={{ marginLeft: "5%", display: "flex" }}>
          <div style={{ margin: "5px", width: "20%" }}>
            <Greeting />
          </div>
          <div
            style={{
              border: "2px solid black",
              margin: "5px",
              padding: "5%",
              width: "50%",
            }}
          >
            <PostList />
          </div>
          <div style={{ margin: "5px", padding: "5%", width: "25%" }}>
            <WeatherApi />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wall;
