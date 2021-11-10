import React, { useEffect, useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import PostForm from "./PostForm";

const UpdatePost = (req, res) => {
  const { id } = req;
  const [post, setPost] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/post/" + id, { withCredentials: true })
      .then((res) => {
        setPost(res.data);
        setLoaded(!loaded);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateOnePost = (post) => {
    axios
      .put("http://localhost:8000/api/post/" + id, post, {
        withCredentials: true,
      })
      .then((res) => navigate("view-posts"))
      .catch((err) => {
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div>
      {loaded && (
        <PostForm
          onSubmitProp={updateOnePost}
          initialText={post.text}
          errors={errors}
          setLoaded={setLoaded}
          loaded={loaded}
        />
      )}
      {/* {loaded && (
        <form onSubmit={updateOnePost}>
          <div>
            <h3>Hey, Update your post!</h3>
            <input
              type="text"
              className="form-control"
              name="text"
              value={post.text}
              onChange={(e) => setPost(e.target.value)}
            />
            {errors && errors.text && (
              <p style={{ color: "red" }}>{errors.text.message}</p>
            )}
            <button
              style={{ margin: "5px" }}
              type="submit"
              className="btn btn-primary"
            >
              Edit Post
            </button>
            <hr />
          </div>
        </form>
      )} */}
    </div>
  );
};

export default UpdatePost;
