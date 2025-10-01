import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { referralCode, isAdmin } = await request.json();

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    if (!referralCode) {
      return NextResponse.json(
        { error: "Referral code is required" },
        { status: 400 }
      );
    }

    // Check if referral code is already in use
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("referralCode", "==", referralCode));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return NextResponse.json(
        { error: "Referral code is already in use" },
        { status: 400 }
      );
    }

    // Update user's referral code
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {
      referralCode,
      updatedAt: new Date(),
    });

    return NextResponse.json({
      message: "Referral code updated successfully",
      referralCode,
    });
  } catch (error) {
    console.error("Error updating referral code:", error);
    return NextResponse.json(
      { error: "Failed to update referral code" },
      { status: 500 }
    );
  }
}
