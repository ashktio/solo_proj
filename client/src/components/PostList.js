import axios from "axios";
import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import LikeForm from "./LikeForm";
import DeletePost from "./DeletePost";
import { Link, navigate } from "@reach/router";
import UpdatePost from "./UpdatePost";
import PostForm from "../components/PostForm";
import {
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCol,
  MDBInput,
  MDBCardBody,
} from "mdbreact";
import Button from "@restart/ui/esm/Button";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  // const [text, setText] = useState([]);
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({});

  const createPost = async (userPost) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/post",
        userPost,
        { withCredentials: true }
      );
      console.log("logging server response", response.data);
      // setText([...text, response.data]);
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
      <MDBCard>
        <MDBCardBody>
          <PostForm
            loaded={loaded}
            setLoaded={setLoaded}
            initialText=""
            onSubmitProp={createPost}
            errors={errors}
          />
        </MDBCardBody>
      </MDBCard>
      {posts &&
        posts
          .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
          .map((post, index) => (
            <MDBCard style={{ padding: "5%", marginTop: "5%" }}>
              <MDBCardBody>
                <div key={index}>
                  <div>
                    <p>
                      <strong>
                        {console.log("logging this out", post)}
                        {post.user_id.firstName} {post.user_id.lastName}
                      </strong>{" "}
                      posted: <strong> {post.text} </strong>
                    </p>
                    {post.image && (
                      <div className="card-image waves-effect waves-block waves-light">
                        {console.log(post.image)}
                        <img
                          className="activator"
                          style={{ width: "100%", height: "100%" }}
                          src={post.image.image}
                        />
                      </div>
                    )}

                    <p>
                      Date: {post.createdAt.slice(0, 10)} Time:{" "}
                      {post.createdAt.slice(11, 19)}{" "}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      padding: "5px",
                      marginLeft: "35%",
                    }}
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
                  {post.likes && (
                    <p>{post.likes.length} users like this post</p>
                  )}
                </div>
              </MDBCardBody>
            </MDBCard>
          ))}
    </div>
  );
};
export default PostList;
