"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Phone } from "lucide-react";
import CommonButton from "@/app/components/button/CommonButton";
import CommonInput from "@/app/components/input/CommonInput";
import Image from "next/image";

type SubscribePopupProps = {
    open: boolean;
    onClose: () => void;
};

export default function SubscribePopup({
    open,
    onClose,
}: SubscribePopupProps) {
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
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                </Transition.Child>

                {/* CONTAINER */}
                <div className="fixed inset-0 overflow-hidden">
                    <div className="flex h-full items-end sm:items-center justify-center">

                        {/* PANEL */}
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-full sm:translate-y-6 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-full sm:translate-y-6 sm:scale-95">
                            <Dialog.Panel
                                className="w-full sm:max-w-md bg-background rounded-t-2xl sm:rounded-2xl p-6 relative">
                                {/* CLOSE */}
                                <button
                                    onClick={onClose}
                                    className="absolute right-4 top-4 p-2 rounded-full hover:bg-foreground/10"
                                >
                                    <X size={18} />
                                </button>

                                {/* DRAG INDICATOR (Mobile only) */}
                                <div className="sm:hidden w-12 h-1 bg-foreground/20 rounded-full mx-auto mb-4" />

                                {/* LOGO */}
                                <div className="mb-4">
                                    <p className='font-times text-3xl'>Privora</p>
                                </div>

                                {/* CONTENT */}
                                <Dialog.Title className="text-lg font-medium mb-1">
                                    Subscribe & Enjoy
                                </Dialog.Title>

                                <p className="text-3xl font-bold text-brand mb-2">
                                    Get 10% OFF
                                </p>

                                <p className="text-sm text-foreground/70 mb-6">
                                    Join us & get 10% off on your purchase over ₹300.
                                    <br />
                                    <span className="text-xs">
                                        (Discount up to ₹500)
                                    </span>
                                </p>

                                <div className="space-y-4">
                                    <CommonInput
                                        placeholder="Enter your email"
                                        name="email"
                                        noMargin
                                    />

                                    {/* <div className="flex gap-3">
                                        <div className="flex items-center gap-2 border border-foreground/20 rounded-xl px-3">
                                        <Phone size={16} />
                                        <span className="text-sm">+91</span>
                                        </div>

                                        <CommonInput
                                        placeholder="Enter mobile number"
                                        name="mobile"
                                        type="tel"
                                        noMargin
                                        />
                                    </div> */}

                                    <CommonButton className="w-full mt-4" onClick={onClose}>
                                        Subscribe Now
                                    </CommonButton>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
