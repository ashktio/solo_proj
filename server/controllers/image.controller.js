const Image = require("../models/image.model");
// const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const addImage = async (req, res) => {
  const { body } = req;
  console.log("logging the bodyt", body);
  let newImage = new Image(body);
  console.log(newImage);
  const decodedJwt = jwt.decode(req.cookies.usertoken, { complete: true });
  newImage.user_id = decodedJwt.payload.id;
  try {
    newPost = await newImage.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getImage = async (req, res) => {
  try {
    // const respo = await User.findOne({ _id: req.params.id });
    // console.log(respo.email);
    // const photo = await Image.findOne({ email: respo.email })
    //   .sort({ _id: -1 })
    //   .limit(1)
    //   .populate({
    //     path: "user_id",
    //     model: "User",
    //   });
    const photo = await Image.find({}).populate({
      path: "user_id",
      model: "User",
    });
    res.status(200).json(photo);
    // if (respo.email == photo.user_id.email) {
    //   console.log("sending this out", photo);
    //   res.status(200).json(photo);
    // } else {
    //   return;
    // }
    // console.log(photo.user_id.email);
    // res.status(200).json(photo);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteImage = async (req, res) => {
  try {
    const deleteAll = await Image.remove();
    res.json(deleteAll);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  addImage,
  getImage,
  deleteImage,
};
