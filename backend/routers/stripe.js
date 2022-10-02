const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const Subscription = require("../models/subscriptionModel");
const User = require("../models/userModel");

function addDays(date, days) {
  const copy = new Date(Number(date))
  copy.setDate(date.getDate() + days)
  return copy
}

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        const register = async () => {
          const book = req.body;
          const add=30;
          if(book.type==="yearly"){
            add=365;
          }
          const date=new Date();
          const newdate = addDays(date, add);
          let booking = await Subscription.create({
            cancel: book.cancel,
            user: book.user,
            type: book.type,
            starttime:date,
            expirytime:newdate
          });
          await booking.save();
          const user = await User.findById(book.user).populate("history");
          console.log(user);
          user.history.push(booking._id);
          await user.save();
        };
        register();
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
