import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "./Image";

const Greeting = () => {
  const [user, setUser] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [images, setImages] = useState();

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("http://localhost:8000/api/users", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/images/${user._id}`,
          {
            withCredentials: true,
          }
        );
        setImages(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [loaded]);

  return (
    <div>
      {user.createdAt && (
        <div style={{ textAlign: "left" }}>
          <h3>
            Hello {user.firstName} {user.lastName}{" "}
          </h3>
          <p>
            Lives in {user.city}, {user.state}
          </p>
          <p>Member since: {user.createdAt.slice(0, 10)}</p>
        </div>
      )}

      <div>
        {images &&
          images.map(
            (item) =>
              item.user_id._id == user._id && (
                <div
                  className="card"
                  key={item._id}
                  style={{ width: "90%", height: "50%" }}
                >
                  <div className="card-image waves-effect waves-block waves-light">
                    {console.log(images)}
                    <img
                      className="activator"
                      style={{ width: "100%", height: "100%" }}
                      src={item.image}
                    />
                  </div>
                </div>
              )
          )}
        <Image loaded={loaded} setLoaded={setLoaded} />
      </div>
    </div>
  );
};

export default Greeting;
