const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    text: {
      type: String,
      minLength: [1, "Please write someting to post"],
    },
    image: {
      image: {
        type: String,
      },
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
