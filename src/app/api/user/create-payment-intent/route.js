import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { planName, userId } = await req.json();

    if (!planName || !userId) {
      return NextResponse.json(
        { error: "Missing planName or userId" },
        { status: 400 }
      );
    }

    const planPrices = {
      "Veritas Glow": 8000,
      "Veritas Sculpt": 16000,
      "Veritas Prestige": 29900,
    };

    const amount = planPrices[planName];
    if (!amount) {
      return NextResponse.json({ error: "Invalid plan name" }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "gbp",
      metadata: { userId, planName },
      description: `Membership purchase: ${planName}`,
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
