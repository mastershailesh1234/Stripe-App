const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a Name"],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a Password"],
    },
    // lastTransaction: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "AllSubscriptions",
    // },
    history: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscription",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
