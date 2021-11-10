const Post = require("../models/post.model");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const createPost = async (req, res) => {
  const { body } = req;
  let newPost = new Post(body);
  const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true });
  // console.log(decodedJwt);
  newPost.user_id = decodedJwt.payload.id;
  // console.log(newPost);
  try {
    newPost = await newPost.save();
    res.json(newPost);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find()
      .populate({
        path: "user_id",
        model: "User",
      })
      .populate({
        path: "comments",
        model: "Comment",
        populate: {
          path: "user_id",
          model: "User",
        },
      })
      .exec();
    res.json(allPosts);
    // console.log("from back end", allPosts)
  } catch (error) {
    res.status(400).json(error);
  }
};

const getOnePost = async (req, res) => {
  try {
    const thisPost = await Post.findOne({ _id: req.params.id })
      .populate({
        path: "user_id",
        model: "User",
      })
      .populate({
        path: "comments",
        model: "Comment",
        populate: {
          path: "user_id",
          model: "User",
        },
      })
      .exec();
    res.json(thisPost);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.updateOne({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(updatedPost);
    console.log("updating a post", updatedPost);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deletePost = async (req, res) => {
  try {
    const deleteOne = await Post.deleteOne({ _id: req.params.id });
    res.json(deleteOne);
  } catch (err) {
    res.status(400).json(err);
  }
};

const likePost = async (req, res) => {
  const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true });
  try {
    let result = await Post.findByIdAndUpdate(
      req.params.id,
      { $push: { likes: decodedJwt.payload.id } },
      { new: true }
    );
    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};
const unlikePost = async (req, res) => {
  const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true });
  try {
    let result = await Post.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: decodedJwt.payload.id } },
      { new: true }
    );
    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};
module.exports = {
  createPost,
  getAllPosts,
  getOnePost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
};
