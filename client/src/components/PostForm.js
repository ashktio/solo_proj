import React, { useState } from "react";

const PostForm = (props) => {
  const { initialText, onSubmitProp, errors, loaded, setLoaded } = props;
  const [text, setText] = useState(initialText);

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmitProp({ text });
    setText("");
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
          <button
            style={{ margin: "5px" }}
            type="submit"
            className="btn btn-primary"
          >
            Add Post
          </button>
          <hr />
        </div>
      </form>
    </div>
  );
};

export default PostForm;
