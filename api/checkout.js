import Stripe from "stripe";

export default async function handler(req, res) {
  try {
    const key = process.env.STRIPE_SECRET_KEY || "";

    const mode =
      key.startsWith("sk_live_")
        ? "LIVE"
        : key.startsWith("sk_test_")
        ? "TEST"
        : "UNKNOWN";

    res.status(200).json({
      mode,
      starts_with: key.slice(0, 10),
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}
