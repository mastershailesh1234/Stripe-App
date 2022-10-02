const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { connectDB } = require("./config/db");
require("dotenv").config();

const app = express();

connectDB();
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use("/api/categories", require("./routers/categoryRouter"));
app.use("/api/users", require("./routers/userRouter"));
app.use("/api/book", require("./routers/bookingRoutes"));
app.use("/api/checkout", require("./routers/stripe"));
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});
