const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    cancel: {
      type: String,
      default: "No",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    starttime: {
      type: String,
    },
    expirytime: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
