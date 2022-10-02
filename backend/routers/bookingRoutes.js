const express = require("express");
const router = express.Router();
const { createBooking,edit } = require("../controllers/subscription");

router.post("/create", createBooking);
router.put("/edit/:id",edit)
module.exports = router;
