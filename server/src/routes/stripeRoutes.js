const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", (req, res) => {
  console.log(process.env.STRIPE_KEY);
  try {
    stripe.charges.create(
      {
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "INR",
      },
      (stripeError, stripeResponse) => {
        if (stripeError) {
          console.log(stripeError);
          return res.status(500).json({ message: stripeError.message });
        } else {
          console.log(stripeResponse);
          return res.status(200).json(stripeResponse);
        }
      }
    );
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
module.exports = router;
