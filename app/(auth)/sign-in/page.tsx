"use client";

import CommonButton from "@/app/components/button/CommonButton";
import CommonInput from "@/app/components/input/CommonInput";
import Link from "next/link";
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { Edit2 } from "lucide-react";
import LoginBackground from "./LoginBackground";
import { useRequestOtp, useVerifyOtp } from "@/hooks/use-auth";
import { toast } from "sonner";

export default function SignIn() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const requestOtpMutation = useRequestOtp();
  const verifyOtpMutation = useVerifyOtp();

  const handleRequestOtp = async () => {
    if (!mobile || mobile.length < 10) {
      toast.error("Please enter a valid mobile number");
      return;
    }

    setIsLoading(true);
    try {
      await requestOtpMutation.mutateAsync(mobile);
      setShowOtp(true);
      toast.success("OTP sent to your mobile number");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send OTP"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 4) {
      toast.error("Please enter a valid OTP");
      return;
    }

    setIsLoading(true);
    try {
      await verifyOtpMutation.mutateAsync({ mobile, otp });
      toast.success("Login successful!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "OTP verification failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditNumber = () => {
    setShowOtp(false);
    setOtp("");
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      await requestOtpMutation.mutateAsync(mobile);
      toast.success("OTP resent successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to resend OTP"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative z-10 py-20 px-10 min-h-screen flex items-center justify-center authPageWrap">
      <LoginBackground />
      <div className="signInCard bg-background p-8 w-96 flex flex-col items-center justify-center gap-8">
        <h1 className="font-times text-3xl text-center">Privora</h1>

        <div className="flex flex-col gap-1 w-full">
          {showOtp ? (
            <>
              <h6 className="w-full text-lg text-foreground text-center font-medium">
                Verify OTP
              </h6>
              <p className="text-sm text-foreground text-center">
                Enter the OTP sent to your mobile number
              </p>
            </>
          ) : (
            <>
              <h6 className="w-full text-lg text-foreground text-center font-medium">
                Welcome Back
              </h6>
              <p className="text-sm text-foreground text-center">
                Sign in to view your orders, wishlist, and exclusive offers.
              </p>
            </>
          )}
        </div>

        <div className="w-full">
          {!showOtp && (
            <CommonInput
              label="Mobile Number"
              name="mobile"
              type="tel"
              placeholder="Enter your mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
              maxLength={10}
            />
          )}

          {showOtp && (
            <div className="otpInputWrap">
              <div className="flex items-center justify-center gap-2 mb-4 text-sm">
                <p className="flex items-center gap-1">
                  +91
                  <span>{mobile}</span>
                </p>
                <CommonButton variant="iconBtn" onClick={handleEditNumber}>
                  <Edit2 size={20} />
                </CommonButton>
              </div>

              <h6 className="text-sm text-center mb-4">
                Enter OTP sent to your mobile number
              </h6>

              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span> </span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="w-12 h-12 border border-gray-300 rounded text-center"
                  />
                )}
              />

              <p className="text-sm mt-4 text-center">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isLoading}
                  className="commonLink disabled:opacity-50"
                >
                  Resend
                </button>
              </p>
            </div>
          )}
        </div>

        <CommonButton
          variant="primaryBtn"
          onClick={showOtp ? handleVerifyOtp : handleRequestOtp}
          disabled={isLoading}
        >
          {isLoading ? "Please wait..." : showOtp ? "Verify OTP" : "Continue"}
        </CommonButton>

        <p className="text-sm flex items-center gap-1 flex-wrap justify-center">
          Don&apos;t have an account?
          <Link href="#" className="commonLink">
            Create Account
          </Link>
        </p>
      </div>
    </section>
  );
}
