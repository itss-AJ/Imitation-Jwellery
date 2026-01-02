"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { X } from "lucide-react";
import CommonButton from "@/app/components/button/CommonButton";
import Link from "next/link";

type CartDrawerProps = {
    open: boolean;
    onClose: () => void;
};

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
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

                {/* DRAWER */}
                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 flex justify-end">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="ease-in duration-200"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <Dialog.Panel className="w-full max-w-5xl bg-background shadow-xl flex">
                                {/* LEFT: YOU MAY ALSO LIKE */}
                                <div className="hidden md:block w-1/2 border-r border-foreground/20 p-6 overflow-y-auto">
                                    <h3 className="font-times text-lg mb-5">
                                        YOU MAY ALSO LIKE
                                    </h3>

                                    <div className="space-y-6">
                                        <SuggestedProduct
                                            title="Black Heart Pendant Necklace"
                                            price="₹899.00"
                                            image="/img/pendant_old.webp"
                                        />
                                        <SuggestedProduct
                                            title="Abstract White & Gold Earrings"
                                            price="₹299.00"
                                            image="/img/bracelets.webp"
                                        />
                                        <SuggestedProduct
                                            title="Butterfly Chain Anklet"
                                            price="₹799.00"
                                            image="/img/bracelet-img.webp"
                                        />
                                    </div>
                                </div>

                                {/* RIGHT: CART */}
                                <div className="w-full md:w-1/2  p-4 md:p-6 flex flex-col">
                                    {/* HEADER */}
                                    <div className="flex items-center justify-between mb-5">
                                        <h3 className="text-lg font-medium">
                                            Cart <span className="ml-1 text-sm">(3)</span>
                                        </h3>
                                        <button onClick={onClose}>
                                            <X />
                                        </button>
                                    </div>

                                    {/* CART ITEMS */}
                                    <div className="flex-1 overflow-y-auto space-y-6">
                                        <CartItem
                                            title="Gold Plated Large Oval Shape Hoop Earring"
                                            price="₹199.00"
                                            image="/img/bracelet-img.webp"
                                        />
                                        <CartItem
                                            title="Nail & Hoop Earring"
                                            price="₹799.00"
                                            image="/img/necklace.webp"
                                        />
                                        <CartItem
                                            title="Gold Plated Drop Hoop Earring"
                                            price="₹199.00"
                                            image="/img/bracelets.webp"
                                        />
                                    </div>

                                    {/* FOOTER */}
                                    <div className="border-t border-foreground/20 pt-5 mt-5">
                                        <div className="flex justify-between mb-4">
                                            <span className="font-medium">Total:</span>
                                            <span className="font-medium">₹1,197.00</span>
                                        </div>

                                        <p className="text-xs text-foreground/60 mb-4">
                                            Taxes and shipping calculated at checkout
                                        </p>

                                        <CommonButton href="/checkout">CHECK OUT</CommonButton>

                                        <Link href='/cart' className="mt-4 commonLink flex justify-center mx-auto">
                                            VIEW CART
                                        </Link>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

function SuggestedProduct({
    title,
    price,
    image,
}: {
    title: string;
    price: string;
    image: string;
}) {
    return (
        <div className="flex gap-4">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                <Image src={image} alt={title} fill className="object-cover" />
            </div>

            <div>
                <p className="text-sm font-medium">{title}</p>
                <p className="text-sm text-foreground/70">{price}</p>
                <Link href="#" className="mt-1 commonLink">
                    + Add to Cart
                </Link>
            </div>
        </div>
    );
}

function CartItem({
    title,
    price,
    image,
}: {
    title: string;
    price: string;
    image: string;
}) {
    return (
        <div className="flex gap-4">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-foreground/10">
                <Image src={image} alt={title} fill className="object-cover" />
            </div>

            <div className="flex-1">
                <p className="text-sm font-medium">{title}</p>
                <p className="text-sm text-foreground/70">{price} x 1</p>

                <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-foreground/20 rounded-full overflow-hidden">
                        <button className="px-4 py-2 text-foreground">-</button>
                        <span className="px-4 text-foreground">1</span>
                        <button className="px-4 py-2 text-foreground">+</button>
                    </div>
                </div>
            </div>

            <button className="text-sm commonLink">
                Remove
            </button>
        </div>
    );
}
