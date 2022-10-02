const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const createError = (status, message) => {
  const err = new Error();
  err.status = status;
  err.message = message;
  return err;
};
const signToken = (data) => {
  return jwt.sign(data, process.env.JWT, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  console.log(user);
  const { _id } = user;
  const data = {
    _id,
  };
  console.log(user, data);
  const token = signToken(data);

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

exports.register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or email!"));

    const { password, ...otherDetails } = user._doc;
    createSendToken(otherDetails, 200, res);
  } catch (err) {
    next(err);
  }
};
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .populate({
        path: "history",
        populate: [
          {
            path: "type",
            model: "Category",
          },
        ],
      })
    if (user) {
      res.status(200).json({
        message: "All Users Fetched Successfully",
        data: user,
      });
    } else {
      res.status(400).json({
        message: "Fetching Users Failed",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
