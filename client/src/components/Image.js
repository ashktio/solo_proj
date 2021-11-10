import React, { useState, useEffect } from "react";
import axios from "axios";
import FileBase64 from "react-file-base64";

const Image = (props) => {
  const { loaded, setLoaded } = props;
  const [image, setImage] = useState("");

  const uploadImage = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/upload/", image, {
        withCredentials: true,
      });
      setImage("");
      setLoaded(!loaded);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={uploadImage}>
        <div style={{ textAlign: "left", width: "90%", height: "50%" }}>
          <p>Upload your photos here</p>
          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) => setImage({ image: base64 })}
          />
          <button>submit</button>
        </div>
      </form>
    </div>
  );
};

export default Image;
