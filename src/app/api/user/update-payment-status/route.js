import { db } from "@/config/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId, planName, paymentStatus } = await req.json();

    if (!userId || !planName || !paymentStatus) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (paymentStatus !== "succeeded") {
      return NextResponse.json({ message: "Payment not completed" });
    }

    await db.user.update({
      where: { id: userId },
      data: {
        membershipPlan: planName,
        membershipStatus: "active",
        planUpdatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Payment status update error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
