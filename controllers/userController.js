const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(404).send("Invalid credentials");
    }
    const verifyPass = await bcrypt.compare(password, userFound.password);
    if (!verifyPass) {
      return res.status(400).send("Invalid credentials");
    }
    const token = jwt.sign(
      {
        userId: userFound._id,
      },
      process.env.JWT_SECRET_KEY
    );
    return res.send({
      msg: "Login successful",
      token,
      username: userFound.username,
      userEmail: userFound.email,
      profile: userFound.profile,
    });
  } catch (error) {
    res.status(404).send(error);
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password, profile } = req.body;
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(400).send("Email already exists");
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const user = await User({ username, email, password: hashedPass, profile });
    const result = await user.save();
    if (!result) {
      return res.status(400).send("Error registering user");
    }
    return res.send("User registered successfully");
  } catch (error) {
    res.status(404).send(error);
  }
};

const updateProfile = async (req, res) => {
  try {
    const { username, email, password, profile } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(
      { _id: req.token.userId },
      {
        username,
        email,
        password: hashedPass,
        profile,
      }
    );
    if (!user) {
      return res.status(400).send("Unable to update profile");
    }
    res.send("Profile updated successfully");
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = { login, register, updateProfile };
