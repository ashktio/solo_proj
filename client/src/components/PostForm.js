import React, { useState } from "react";
import FileBase64 from "react-file-base64";

const PostForm = (props) => {
  const { initialText, onSubmitProp, errors, loaded, setLoaded } = props;
  const [text, setText] = useState(initialText);
  const [image, setImage] = useState("");

  const submitHandler = (e) => {
    const userPost = {
      text,
      image,
    };
    e.preventDefault();
    onSubmitProp({ userPost });
    setText("");
    setImage("");
    setLoaded(!loaded);
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <h3>Hey, What do you have in Mind?</h3>
          <input
            type="text"
            className="form-control"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {errors && errors.text && (
            <p style={{ color: "red" }}>{errors.text.message}</p>
          )}
          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) => setImage({ image: base64 })}
          />
          <button
            style={{ margin: "5px" }}
            type="submit"
            className="btn btn-primary"
          >
            Add Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
