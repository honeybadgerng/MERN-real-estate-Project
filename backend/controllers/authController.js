const authController = require("express").Router();
const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register
authController.post("/register", async (req, res) => {
  try {
    const isExisting = await user.findOne({ email: req.body.email });
    if (isExisting) {
      throw new Error("Email already in use!");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await user.create({
      ...req.body,
      password,
      hashedPassword,
    });

    const { password, ...others } = newUser._doc;
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "4h",
    });
    return res.status(201).json({ others, token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// Login
authController.post("/login", async (req, res) => {
  try {
    const user = await user.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("Wrong credential");
    }
    const comparePass = await bcrypt.compare(req.body.password, user.password);
    if (!comparePass) {
      throw new Error("wrong credentials");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "4h",
    });
    const { password, ...others } = user._doc;

    return res.status(200).json({ others, password });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

module.exports = authController;
