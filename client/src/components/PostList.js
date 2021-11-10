import axios from "axios";
import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import LikeForm from "./LikeForm";
import DeletePost from "./DeletePost";
import { Link, navigate } from "@reach/router";
import UpdatePost from "./UpdatePost";
import PostForm from "../components/PostForm";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [text, setText] = useState([]);
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({});

  const createPost = async (newPost) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/post",
        newPost,
        { withCredentials: true }
      );
      // console.log(response.data);
      setText([...text, response.data]);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data.errors);
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("http://localhost:8000/api/post", {
          withCredentials: true,
        });
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [loaded]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users", { withCredentials: true })
      .then((res) => {
        // console.log(res);
        setUser(res.data);
      })
      .catch((err) => console.log(err.response));
  }, []);
  console.log("who ever is in session", user._id);

  return (
    <div>
      <div>
        <PostForm
          loaded={loaded}
          setLoaded={setLoaded}
          initialText=""
          onSubmitProp={createPost}
          errors={errors}
        />
      </div>
      {posts &&
        posts
          .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
          .map((post, index) => (
            <div key={index}>
              <div>
                <p>
                  <strong>
                    {post.user_id.firstName} {post.user_id.lastName}
                  </strong>{" "}
                  posted: <strong> {post.text} </strong>
                </p>
                <p>
                  Date: {post.createdAt.slice(0, 10)} Time:{" "}
                  {post.createdAt.slice(11, 19)}{" "}
                </p>
              </div>

              <div
                style={{ display: "flex", padding: "5px", marginLeft: "35%" }}
              >
                {post.user_id._id == user._id && (
                  <div>
                    <DeletePost
                      id={post._id}
                      loaded={loaded}
                      setLoaded={setLoaded}
                    />
                    <Link to={`/post/${post._id}`}>edit</Link>
                  </div>
                )}
                <LikeForm
                  loaded={loaded}
                  setLoaded={setLoaded}
                  postId={post._id}
                  post={post}
                  userId={user._id}
                />
              </div>
              <div>
                <CommentForm
                  loaded={loaded}
                  setLoaded={setLoaded}
                  postId={post._id}
                />
              </div>
              {post.comments &&
                post.comments.map(
                  (comment, index) => (
                    console.log("this one", comment),
                    (
                      <div key={index}>
                        <p>
                          <strong>
                            {comment.user_id.firstName}{" "}
                            {comment.user_id.lastName}
                          </strong>{" "}
                          commented <strong>{comment.text} </strong> at -{" "}
                          {comment.createdAt.slice(11, 19)}{" "}
                        </p>
                      </div>
                    )
                  )
                )}
              {post.likes && <p>{post.likes.length} users like this post</p>}
              <hr />
            </div>
          ))}
    </div>
  );
};
export default PostList;
