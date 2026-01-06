"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, CheckCircle } from "lucide-react";
import CommonButton from "@/app/components/button/CommonButton";
import CommonInput from "@/app/components/input/CommonInput";
import { useSubscribe } from "@/hooks/use-subscription";
import { toast } from "sonner";

type SubscribePopupProps = {
  open: boolean;
  onClose: () => void;
};

export default function SubscribePopup({ open, onClose }: SubscribePopupProps) {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [couponCode, setCouponCode] = useState<string | null>(null);

  const subscribeMutation = useSubscribe();

  const handleSubscribe = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      const result = await subscribeMutation.mutateAsync({ email });
      setIsSuccess(true);
      setCouponCode(result.couponCode || null);
      toast.success(result.message);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to subscribe"
      );
    }
  };

  const handleClose = () => {
    setEmail("");
    setIsSuccess(false);
    setCouponCode(null);
    onClose();
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="flex h-full items-end sm:items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-full sm:translate-y-6 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-full sm:translate-y-6 sm:scale-95"
            >
              <Dialog.Panel className="w-full sm:max-w-md bg-background rounded-t-2xl sm:rounded-2xl p-6 relative">
                <button
                  onClick={handleClose}
                  className="absolute right-4 top-4 p-2 rounded-full hover:bg-foreground/10"
                >
                  <X size={18} />
                </button>

                <div className="sm:hidden w-12 h-1 bg-foreground/20 rounded-full mx-auto mb-4" />

                <div className="mb-4">
                  <p className="font-times text-3xl">Privora</p>
                </div>

                {isSuccess ? (
                  <div className="text-center py-4">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <Dialog.Title className="text-lg font-medium mb-2">
                      You&apos;re Subscribed!
                    </Dialog.Title>
                    <p className="text-sm text-foreground/70 mb-4">
                      Thank you for subscribing to our newsletter.
                    </p>
                    {couponCode && (
                      <div className="bg-brand/10 border border-brand rounded-lg p-4 mb-4">
                        <p className="text-sm text-foreground/70 mb-1">
                          Your discount code:
                        </p>
                        <p className="text-2xl font-bold text-brand">
                          {couponCode}
                        </p>
                      </div>
                    )}
                    <CommonButton onClick={handleClose}>
                      Start Shopping
                    </CommonButton>
                  </div>
                ) : (
                  <>
                    <Dialog.Title className="text-lg font-medium mb-1">
                      Subscribe & Enjoy
                    </Dialog.Title>

                    <p className="text-3xl font-bold text-brand mb-2">
                      Get 10% OFF
                    </p>

                    <p className="text-sm text-foreground/70 mb-6">
                      Join us & get 10% off on your purchase over ₹300.
                      <br />
                      <span className="text-xs">(Discount up to ₹500)</span>
                    </p>

                    <div className="space-y-4">
                      <CommonInput
                        placeholder="Enter your email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        noMargin
                      />

                      <CommonButton
                        className="w-full mt-4"
                        onClick={handleSubscribe}
                        disabled={subscribeMutation.isPending}
                      >
                        {subscribeMutation.isPending
                          ? "Subscribing..."
                          : "Subscribe Now"}
                      </CommonButton>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
