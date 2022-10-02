const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    type:{
      type:String
    },
    plantype: {
      type: String,
    },
    price: {
      type: Number,
    },
    videoquality: {
      type: String,
    },
    resolution: {
      type: String,
    },
    device: [
      {
        type: String,
      },
    ],
  },
);

module.exports = mongoose.model("Category", categorySchema);
