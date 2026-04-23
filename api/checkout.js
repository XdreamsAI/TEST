import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1TPLCT78WosZdp8Wv6WRzo0t', // 200€
          quantity: 1,
        },
        {
          price: 'price_1TPLCS78WosZdp8WZwEmUahe', // 19€/month
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 30,
      },
      success_url: 'https://test-ltiart-three-20.vercel.app/success',
      cancel_url: 'https://test-ltiart-three-20.vercel.app/cancel',
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}
