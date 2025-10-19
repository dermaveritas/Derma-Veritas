import { db } from "@/config/db";
import { doc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const { userId, planName, paymentStatus, paymentDetails } = body;

    if (!userId || !planName || !paymentStatus) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (paymentStatus !== "succeeded") {
      return NextResponse.json({ message: "Payment not completed" });
    }

    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      membershipPlan: planName,
      membershipStatus: "active",
      planUpdatedAt: new Date().toISOString(),
      membershipPaymentInfo: {
        monthlyPrice: paymentDetails?.monthlyPrice || 0,
        stripeCustomerId: paymentDetails?.stripeCustomerId || null,
        stripeSessionId: paymentDetails?.stripeSessionId || null,
        stripeSubscriptionId: paymentDetails?.stripeSubscriptionId || null,
        subscriptionStarted: new Date().toISOString(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
