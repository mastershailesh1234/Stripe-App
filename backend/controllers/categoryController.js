const Category = require("../models/categoryModel");

exports.createCategory = async (req, res) => {
  try {
    const {
      type,
      plantype,
      price,
      videoquality,
      resolution,
      device,
    } = req.body;
    const category = new Category({
      type,
      plantype,
      price,
      videoquality,
      resolution,
      device,
    });
    const c = await category.save();
    if (c) {
      return res.status(200).json({
        message: "Category Created Successfully",
        data: c,
      });
    } else {
      return res.status(400).json({
        message: "Category Creation Failed",
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

exports.getCategories = async (req, res) => {
  try {
    const rate = await Category.find();
    res.status(200).json({
      message: "Categories Fetched Successfully",
      data: rate,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
