"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Pencil } from "lucide-react";
import CommonButton from "@/app/components/button/CommonButton";
import CommonInput from "@/app/components/input/CommonInput";
import OTPInput from "react-otp-input";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function LoginToContinueModal({ open, onClose }: Props) {
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
    const [otp, setOtp] = useState("");

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* BACKDROP */}
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

        {/* MODAL / BOTTOM DRAWER */}
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
            <Dialog.Panel
              className="
                w-full md:max-w-md
                bg-[#fffaf2]
                rounded-t-3xl md:rounded-2xl
                p-6 md:p-8
              "
            >
              {/* HEADER */}
              <div className="flex items-center justify-between mb-6">
                <Dialog.Title className="text-lg font-medium">
                  {step === "mobile" ? "Login to Checkout" : "Verify OTP"}
                </Dialog.Title>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-foreground/10"
                >
                  <X size={18} />
                </button>
              </div>

              {/* STEP 1 – MOBILE */}
              {step === "mobile" && (
                <>
                  <p className="text-sm text-foreground/70 mb-6">
                    Enter your mobile number to continue checkout
                  </p>

                  <CommonInput
                    label="Mobile Number"
                    name="mobile"
                    placeholder="Enter your mobile number"
                    type="tel"
                  />

                  <CommonButton
                    className="mt-6"
                    onClick={() => setStep("otp")}
                  >
                    Continue
                  </CommonButton>
                </>
              )}

              {/* STEP 2 – OTP */}
              {step === "otp" && (
                <div className="">
                  <p className="text-sm text-center text-foreground/70 mb-6">
                    Enter the OTP sent to your mobile number
                  </p>

                  {/* MOBILE DISPLAY */}
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <span className="text-sm font-medium">
                      +91 98765 43210
                    </span>
                    <button className="p-2 rounded-full border border-foreground/20">
                      <Pencil size={14} />
                    </button>
                  </div>

                  {/* OTP INPUTS */}
                  <div className="flex justify-center gap-3 mb-4 otpInputWrap">
                    {/* {[...Array(4)].map((_, i) => (
                      <input
                        key={i}
                        maxLength={1}
                        className="
                          w-12 h-12 text-center text-lg
                          border border-foreground/20
                          rounded-lg
                          focus:outline-none focus:border-brand
                        "
                      />
                    ))} */}
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

                  <button className="block mx-auto text-sm underline mb-6">
                    Resend OTP
                  </button>

                  <CommonButton href="/checkout">
                    Verify OTP
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
