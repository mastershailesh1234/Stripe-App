const express = require("express");
const router = express.Router();
const { login, register, getUser } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/getUser/:id", getUser);
module.exports = router;