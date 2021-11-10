import React, { useState } from "react";
import axios from "axios";

const LikeForm = (props) => {
  const { loaded, setLoaded, postId } = props;
  const [like, setLike] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newLike = {
      like: like,
    };
    console.log(newLike.like);
    if (newLike.like == true) {
      try {
        const response = await axios.put(
          `http://localhost:8000/api/post/like/${postId}`,
          newLike,
          { withCredentials: true }
        );
        console.log(response);
        setLoaded(!loaded);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.put(
          `http://localhost:8000/api/post/unlike/${postId}`,
          newLike,
          { withCredentials: true }
        );
        console.log(response);
        setLoaded(!loaded);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <button
          style={{
            background: "none",
            border: "none",
            color: "#069",
            cursor: "pointer",
          }}
          onClick={(e) => setLike(!like)}
        >
          Like
        </button>
      </form>
    </div>
  );
};

export default LikeForm;
