"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "@/store/FirebaseAuthProvider";

export default function LoginModal({ isOpen, onClose }) {
  const { user } = useAuth();

  // Close modal if user is logged in
  useEffect(() => {
    if (user && isOpen) {
      onClose(false);
    }
  }, [user, isOpen, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-4">
          <div className="mx-auto">
            <Image
              src="/logo_black.png"
              alt="DermaVeritas Logo"
              width={60}
              height={60}
              className="mx-auto"
            />
          </div>
          <h2 className="text-2xl font-semibold text-center text-gray-900">
            Sign Up to Book Your Consultation
          </h2>
          <p className="text-gray-600 text-center text-sm">
            Create an account to book your consultation and access exclusive benefits.
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">Quick Sign Up</h4>
                <p className="text-sm text-gray-600">
                  Create your account in less than 2 minutes
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">
                  Track Your Journey
                </h4>
                <p className="text-sm text-gray-600">
                  Access your treatment history and upcoming appointments
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">
                  Exclusive Benefits
                </h4>
                <p className="text-sm text-gray-600">
                  Get access to special offers and our referral program
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Link href="/login" className="w-full block">
              <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg">
                Sign In
              </Button>
            </Link>
            <div className="text-center">
              <span className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/login"
                  className="text-gray-900 hover:underline font-medium"
                >
                  Sign Up
                </Link>
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
