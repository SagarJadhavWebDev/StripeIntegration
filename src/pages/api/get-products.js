// This is your test secret API key.
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { items } = req.body;

  const products = await stripe.products.list({
    limit: 3,
  });

  res.send({
    products: products,
  });
}
