const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    text: {
        type: String,
        minLength: [1, "Please write someting to comment"]
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
},{ timestamps: true });

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
