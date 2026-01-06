"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Pencil } from "lucide-react";
import CommonButton from "@/app/components/button/CommonButton";
import CommonInput from "@/app/components/input/CommonInput";
import OTPInput from "react-otp-input";
import { useRequestOtp, useVerifyOtp, useUserProfile } from "@/hooks/use-auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  onClose: () => void;
  redirectTo?: string;
};

export default function LoginToContinueModal({
  open,
  onClose,
  redirectTo = "/checkout",
}: Props) {
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { data: user } = useUserProfile();
  const requestOtpMutation = useRequestOtp();
  const verifyOtpMutation = useVerifyOtp();

  const isLoggedIn = !!user && !!user._id && user._id !== "guest";

  const handleRequestOtp = async () => {
    if (!mobile || mobile.length < 10) {
      toast.error("Please enter a valid mobile number");
      return;
    }

    setIsLoading(true);
    try {
      await requestOtpMutation.mutateAsync(mobile);
      setStep("otp");
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
      onClose();
      router.push(redirectTo);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "OTP verification failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditNumber = () => {
    setStep("mobile");
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

  const handleContinueAsLoggedIn = () => {
    onClose();
    router.push(redirectTo);
  };

  const resetAndClose = () => {
    setStep("mobile");
    setMobile("");
    setOtp("");
    onClose();
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={resetAndClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-end md:items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="translate-y-full md:scale-95 md:opacity-0"
            enterTo="translate-y-0 md:scale-100 md:opacity-100"
            leave="ease-in duration-200"
            leaveFrom="translate-y-0 md:scale-100 md:opacity-100"
            leaveTo="translate-y-full md:scale-95 md:opacity-0"
          >
            <Dialog.Panel className="w-full md:max-w-md bg-[#fffaf2] rounded-t-3xl md:rounded-2xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <Dialog.Title className="text-lg font-medium">
                  {isLoggedIn
                    ? "Continue to Checkout"
                    : step === "mobile"
                      ? "Login to Checkout"
                      : "Verify OTP"}
                </Dialog.Title>

                <button
                  onClick={resetAndClose}
                  className="p-2 rounded-full hover:bg-foreground/10"
                >
                  <X size={18} />
                </button>
              </div>

              {isLoggedIn ? (
                <>
                  <p className="text-sm text-foreground/70 mb-6">
                    You&apos;re logged in as{" "}
                    <strong>{user.fullName || user.mobile}</strong>
                  </p>
                  <CommonButton onClick={handleContinueAsLoggedIn}>
                    Continue to Checkout
                  </CommonButton>
                </>
              ) : step === "mobile" ? (
                <>
                  <p className="text-sm text-foreground/70 mb-6">
                    Enter your mobile number to continue checkout
                  </p>

                  <CommonInput
                    label="Mobile Number"
                    name="mobile"
                    placeholder="Enter your mobile number"
                    type="tel"
                    value={mobile}
                    onChange={(e) =>
                      setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    maxLength={10}
                  />

                  <CommonButton
                    className="mt-6"
                    onClick={handleRequestOtp}
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Continue"}
                  </CommonButton>
                </>
              ) : (
                <div>
                  <p className="text-sm text-center text-foreground/70 mb-6">
                    Enter the OTP sent to your mobile number
                  </p>

                  <div className="flex items-center justify-center gap-2 mb-6">
                    <span className="text-sm font-medium">+91 {mobile}</span>
                    <button
                      onClick={handleEditNumber}
                      className="p-2 rounded-full border border-foreground/20"
                    >
                      <Pencil size={14} />
                    </button>
                  </div>

                  <div className="flex justify-center gap-3 mb-4 otpInputWrap">
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
                  </div>

                  <button
                    onClick={handleResendOtp}
                    disabled={isLoading}
                    className="block mx-auto text-sm underline mb-6 disabled:opacity-50"
                  >
                    Resend OTP
                  </button>

                  <CommonButton onClick={handleVerifyOtp} disabled={isLoading}>
                    {isLoading ? "Verifying..." : "Verify OTP"}
                  </CommonButton>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
