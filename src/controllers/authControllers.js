const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require("../model/authModel");

const login = expressAsyncHandler(async (req, res) => {
  const { credentials, password } = req.body;

  const user = await Auth.findOne({
    $or: [{ email: credentials }, { username: credentials }],
  });
  if (!user) {
    throw new Error("User does not exists.");
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Incorrect Password");
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "5d" }
  );

  res.status(200).json({
    user_id: user._id,
    username: user.username,
    email: user.email,
    token,
  });
});

const register = expressAsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const foundUser = await Auth.findOne({ $or: [{ email }, { username }] });
  if (foundUser) {
    throw new Error("username or email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userDetail = { username, email, password: hashedPassword.toString() };
  const user = await Auth.create(userDetail);

  if (!user) {
    throw new Error("Something went wrong. Cannot register user.");
  }

  res.status(200).json({ message: "User registered successfully" });
});

module.exports = { login, register };
