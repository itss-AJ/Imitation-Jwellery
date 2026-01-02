"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { X } from "lucide-react";
import Link from "next/link";

const ORDER_PRODUCTS = [
    {
        title: "Gold Plated Jewelry Set",
        image: "/img/bracelet-img.webp",
        color: "Gold",
        size: "Free",
        qty: 1,
        price: "₹2,499",
    },
    {
        title: "Pearl Drop Earring",
        image: "/img/earring.webp",
        color: "White",
        size: "Free",
        qty: 1,
        price: "₹799",
    },
    {
        title: "Gold Chain Bracelet",
        image: "/img/bracelets.webp",
        color: "Gold",
        size: "Free",
        qty: 1,
        price: "₹599",
    },
];

export default function OrderProductsModal({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
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

                {/* PANEL */}
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
                w-full md:max-w-lg
                bg-background
                rounded-t-3xl md:rounded-2xl
                p-5 md:p-6
              "
                        >
                            {/* HEADER */}
                            <div className="flex items-center justify-between mb-4">
                                <Dialog.Title className="text-lg font-medium">
                                    Order Products
                                </Dialog.Title>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-foreground/10"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* PRODUCTS */}
                            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                                {ORDER_PRODUCTS.map((product, idx) => (
                                    <Link
                                        key={idx}
                                        href="/product-details"
                                        className="block"
                                        onClick={onClose} // optional: closes modal on navigation
                                    >
                                        <div
                                            className="
                                                border border-foreground/20 rounded-xl p-4
                                                flex gap-4 cursor-pointer
                                                transition hover:bg-foreground/5">
                                            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-foreground/10">
                                                <Image
                                                    src={product.image}
                                                    alt={product.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            <div className="flex-1 text-sm space-y-1">
                                                <p className="font-medium">
                                                    {product.title}
                                                </p>
                                                <p className="text-foreground/70">
                                                    Color: {product.color} · Size: {product.size} · Qty: {product.qty}
                                                </p>
                                                <p>
                                                    Price: <strong>{product.price}</strong>
                                                </p>
                                                <p className="text-xs text-foreground/60">
                                                    Seller: Privora
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}
