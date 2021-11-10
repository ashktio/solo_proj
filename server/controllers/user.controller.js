const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { body } = req;

  try {
    const queriedUser = await User.findOne({ email: body.email });

    if (queriedUser) {
      res.status(400).json({ err: "Email already in use" });
      return;
    }
  } catch (error) {
    res.status(400).json(error);
  }

  const newUser = new User(body);

  try {
    const newUserObject = await newUser.save();
    res.json(newUserObject);
  } catch (error) {
    res.status(400).json(error);
  }
};

const login = async (req, res) => {
  const { body } = req;

  if (!body.email) {
    res.status(400).json({ err: "Please enter your email" });
    return;
  }

  let userQuery;
  try {
    userQuery = await User.findOne({ email: body.email });
  } catch (err) {
    res.status(400).json({
      err: "Something went wrong",
    });
  }

  // console.log("userQuery", userQuery);

  if (userQuery === null) {
    res.status(400).json({
      err: "We could not find your email. If you don't have an account, please register.",
    });
    return;
  }

  const passwordCheck = bcrypt.compareSync(body.password, userQuery.password);

  if (!passwordCheck) {
    res.status(400).json({ err: "email and/or password do not match" });
    return;
  }
  // console.log('it gets here----------------------------------')
  // user is verified as user of our app
  const userToken = jwt.sign({ id: userQuery._id }, process.env.SECRET_KEY);
  // console.log("token", userToken);
  res
    .cookie("usertoken", userToken, process.env.SECRET_KEY, {
      httpOnly: true,
      expires: new Date(Date.now() + 90000000),
    })
    .json({ message: "success login" });
};

const logout = (req, res) => {
  res.clearCookie("usertoken");
  res.status(200).json({ message: "logout successful!" });
};

const getOneUser = (req, res) => {
  User.findOne({ _id: req.user_id })
    .then((loggedUser) => res.json(loggedUser))
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  register,
  login,
  logout,
  getOneUser,
};
