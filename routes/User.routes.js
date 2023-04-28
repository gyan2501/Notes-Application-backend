const express = require("express");
const { UserModel } = require("../model/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

//get all users
userRouter.get("/", async (req, res) => {
  try {
    const user = await UserModel.find();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ err: err.message });
  }
});

// register
userRouter.post("/register", async (req, res) => {
  const { email, pass, name, age } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      const user = new UserModel({ email, pass: hash, name, age });
      await user.save();
      res.status(200).send({ msg: "New User has been registered!!" });
    });
  } catch (error) {
    res.status(400).send({ err: err.message });
  }
});

// login
userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });

    if (user) {
      bcrypt.compare(pass, user.pass, (err, result) => {
        if (err) {
          res.status(500).send({ err: err.message });
        } else if (result) {
          const token = jwt.sign({ authorId: user._id, author:user.name }, "masai"); // use environment variable for secret key
          res.status(200).send({ msg: "Login Successfull", token: token });
        } else {
          res.status(200).send({ msg: "Wrong Credentials!" });
        }
      });
    } else {
      res.status(200).send({ msg: "Wrong Credentials!" });
    }
  } catch (error) {
    res.status(400).send({ err: err.message });
  }
});

module.exports = {
  userRouter,
};
