"use client";

import Image from "next/image";
import CommonHeading from "@/app/components/CommonHeading";
import CommonInput from "@/app/components/input/CommonInput";
import CommonButton from "@/app/components/button/CommonButton";
import { CheckCircle } from "lucide-react";

export default function CheckoutPage() {
    return (
        <div className="checkoutPage gradientBg">
            <section className="px-3 md:px-8 lg:px-10 py-8 md:py-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* ================= LEFT CONTENT ================= */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* HEADER */}
                        <CommonHeading
                            level={1}
                            title="Checkout"
                            noMargin
                            className="text-left"
                        />

                        {/* ================= SHIPPING ADDRESS ================= */}
                        <div className="border border-foreground/20 rounded-2xl p-3 md:p-6">
                            <p className="font-medium mb-4">Ship to</p>

                            <div className="space-y-4">
                                <AddressRadio
                                    checked
                                    title="Eye User"
                                    address="Ludhiana Railway Station, Kamla Nehru Market, Old Ludhiana"
                                    meta="141008, Punjab, India"
                                />

                                <AddressRadio
                                    title="John Cena"
                                    address="New Delhi Railway Station, Retiring Rooms, Ajmeri Gate"
                                    meta="110055, Delhi, India"
                                />

                                <button className="text-sm text-brand underline">
                                    + Use a different address
                                </button>
                            </div>
                        </div>

                        {/* ================= SHIPPING METHOD ================= */}
                        <div className="border border-foreground/20 rounded-2xl p-3 md:p-6">
                            <p className="font-medium mb-4">Shipping Method</p>

                            <div className="flex items-center justify-between bg-foreground/5 px-4 py-3 rounded-xl">
                                <span className="text-sm">Standard Delivery</span>
                                <span className="text-sm font-medium">FREE</span>
                            </div>
                        </div>

                        {/* ================= PAYMENT ================= */}
                        <div className="border border-foreground/20 rounded-2xl p-3 md:p-6">
                            <p className="font-medium mb-1">Payment</p>
                            <p className="text-xs text-foreground/60 mb-4">
                                All transactions are secure and encrypted.
                            </p>

                            <div className="border border-brand rounded-xl p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium">
                                        PhonePe Payment Gateway (UPI, Cards & NetBanking)
                                    </p>
                                    <CheckCircle className="text-brand" size={18} />
                                </div>

                                <div className="bg-foreground/5 rounded-lg h-32 flex items-center justify-center text-sm text-foreground/60">
                                    You will be redirected to PhonePe to complete payment securely.
                                </div>
                            </div>
                        </div>

                        {/* ================= BILLING ADDRESS ================= */}
                        <div className="border border-foreground/20 rounded-2xl p-3 md:p-6">
                            <p className="font-medium mb-4">Billing Address</p>

                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-sm">
                                    <input type="radio" defaultChecked className="accent-brand" />
                                    Same as shipping address
                                </label>

                                <label className="flex items-center gap-2 text-sm">
                                    <input type="radio" className="accent-brand" />
                                    Use a different billing address
                                </label>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <CommonInput noMargin placeholder="First name" name="firstName" />
                                    <CommonInput noMargin placeholder="Last name" name="lastName" />
                                </div>

                                <CommonInput noMargin placeholder="Address" name="address" />
                                <CommonInput noMargin placeholder="Apartment, suite, etc. (optional)" name="apt" />

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <CommonInput noMargin placeholder="City" name="city" />
                                    <CommonInput noMargin placeholder="State" name="state" />
                                    <CommonInput noMargin placeholder="PIN code" name="pin" />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <CommonButton className="w-full max-w-fit mx-auto flex">
                                Pay Now
                            </CommonButton>
                        </div>
                    </div>

                    {/* ================= RIGHT SUMMARY ================= */}
                    <div className="lg:col-span-1">
                        <div className="lg:sticky lg:top-24 border border-foreground/20 rounded-2xl p-3 md:p-6 space-y-6">

                            {/* CART ITEMS */}
                            <div className="space-y-4">
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

                            {/* DISCOUNT */}
                            <div className="flex gap-2">
                                <CommonInput placeholder="Discount code" name="discount" />
                                <CommonButton variant="secondaryBtn" className="w-fit max-w-fit h-fit">
                                    Apply
                                </CommonButton>
                            </div>

                            {/* TOTAL */}
                            <div className="space-y-2 text-sm">
                                <Row label="Subtotal · 3 items" value="₹1,197.00" />
                                <Row label="Shipping" value="FREE" />
                                <div className="border-t pt-3 flex justify-between font-medium text-base">
                                    <span>Total</span>
                                    <span>₹1,197.00</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}

/* ================= SUB COMPONENTS ================= */

function AddressRadio({
    title,
    address,
    meta,
    checked,
}: {
    title: string;
    address: string;
    meta: string;
    checked?: boolean;
}) {
    return (
        <label className={`block border rounded-xl p-4 cursor-pointer ${checked ? "border-brand bg-brand/5" : "border-foreground/20"}`}>
            <div className="flex items-start gap-3">
                <input type="radio" className="w-3.5 h-3.5 accent-brand mt-1" />
                <div>
                    <p className="text-sm font-medium">{title}</p>
                    <p className="text-sm text-foreground/70">{address}</p>
                    <p className="text-xs text-foreground/60">{meta}</p>
                </div>
            </div>
        </label>
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
            <div className="relative w-14 h-14 bg-foreground/10">
                <Image src={image} alt={title} fill className="object-cover rounded-lg" />
                <span className="w-5 h-5 flex items-center justify-center bg-brand text-xs text-background p-2 rounded-full absolute -top-1.5 -right-1.5">4</span>
            </div>
            <div className="flex-1">
                <p className="text-sm">{title}</p>
                <p className="text-sm text-foreground/70">{price}</p>
            </div>
        </div>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between">
            <span>{label}</span>
            <span>{value}</span>
        </div>
    );
}
