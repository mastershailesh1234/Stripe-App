const Subscription = require("../models/subscriptionModel");
const User = require("../models/userModel");

exports.createBooking = async (req, res) => {
  console.log(req.body);
  try {
    const book = req.body;
    let booking = await Subscription.create({
      cancel: book.cancel,
      user: book.user,
      type: book.type,
    });
    await booking.save();
    const user = await User.findById(book.user).populate("history");
    console.log(user);
    user.history.push(booking._id);
    await user.save();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
exports.edit = async (req, res) => {
  console.log(req.params.id);
  try {
    await Subscription.findById(req.params.id).then((doc) => {
      doc["cancel"] = "yes";
      doc.save();
      return res.status(200).json({
        message: "Canceled successfully",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
