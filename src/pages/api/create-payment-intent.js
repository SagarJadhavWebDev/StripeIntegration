// This is your test secret API key.
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { items } = req.body;
  console.log(items?.price);
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: items?.price,
    currency: "inr",
    payment_method: "pm_card_visa",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
