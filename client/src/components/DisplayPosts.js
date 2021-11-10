import axios from "axios";
import React, { useEffect, useState } from "react";
import Logout from "./Logout";
const DisplayPosts = () => {
    const [posts, setPosts] = useState([]);
    const [commentTxt, setCommentTxt] = useState("");
    const [commentSubmitDummy, setCommentSubmitDummy] = useState(false);
    useEffect(() => {
        async function getData() {
        try {
            const response = await axios.get("http://localhost:8000/api/post", {
            withCredentials: true,
            });
            console.log(response);
            setPosts(response.data);
        } catch (error) {
            console.log(error.response);
        }
        }
        getData();
    }, [commentSubmitDummy]);

    const handleSubmitComment = async (e, postId) => {
        e.preventDefault();
        const newComment = {
        text: commentTxt,
        };
        try {
        const response = await axios.post(
            `http://localhost:8000/api/comment/${postId}`,
            newComment,
            { withCredentials: true }
        );
        console.log(response);
        setCommentTxt("")
        setCommentSubmitDummy(!commentSubmitDummy);
        } catch (error) {
        console.log(error);
        }
    };

    return (
        <div>
            <Logout />
        {posts &&
            console.log("here are the posts",posts),
            posts.map((post, index) => (
                console.log("pulling comment", post.comments),
            <div key={index}>
                <p>{post.text}</p>
                {post.user_id && (
                <p>
                    {console.log("this is me", post.user_id)}
                    <strong>BY:</strong> {post.user_id.firstName}{" "}
                    {post.user_id.lastName} <strong>ON</strong>{" "}
                    {post.createdAt.slice(0, 10)}
                </p>
                )}
                {post.comments &&

                post.comments.map((comment, index) => (
                    console.log("this one",comment),
                    <div key={index}>
                    <p>
                        {comment.user_id.firstName} {comment.user_id.lastName}{" "}
                        commented {comment.text}
                    </p>
                    </div>
                ))}
                <form onSubmit={(e) => handleSubmitComment(e, post._id)}>
                <h5>ADD COMMENT</h5>
                <input
                    name=""
                    id=""
                    onChange={(e) => setCommentTxt(e.target.value)}
                    cols="15"
                    rows="4"
                ></input>
                <button type="submit">Submit</button>
                </form>

                <hr />
            </div>
            ))}
        </div>
    );
};
export default DisplayPosts;